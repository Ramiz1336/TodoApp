import type { PerformanceRecord, User } from "../types/user";
import { isCountedInDailyPerformance, isTaskScheduledOnDate } from "./taskSchedule";
import { localDateKey } from "./testingDate";

export interface ReportMonthOption {
  key: string;
  label: string;
  year: number;
  month: number;
}

export interface ReportStats {
  totalPlanned: number;
  totalCompleted: number;
  totalMissed: number;
  completionRate: number;
  habitCount: number;
  commentsCount: number;
}

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const endOfDay = (date: Date) => {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + 1);
  return next;
};

/**
 * Returns available months from recorded data and scheduled tasks
 */
export const getAvailableReportMonths = (user: User, now: Date): ReportMonthOption[] => {
  const dates = new Set<string>();

  // Add current month
  dates.add(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`);

  // Add all months from performance records
  (user.performanceRecords ?? []).forEach((rec) => {
    if (rec.date && rec.date.length >= 7) {
      dates.add(rec.date.slice(0, 7));
    }
  });

  // Add all months from user tasks
  (user.tasks ?? []).forEach((t) => {
    if (t.date) {
      const d = new Date(t.date);
      if (!isNaN(d.getTime())) {
        dates.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
      }
    }
    if (t.deadline) {
      const d = new Date(t.deadline);
      if (!isNaN(d.getTime())) {
        dates.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
      }
    }
  });

  const sorted = Array.from(dates).sort().reverse();

  return sorted.map((key) => {
    const [y, m] = key.split("-").map(Number);
    const dateObj = new Date(y, m - 1, 1);
    const label = dateObj.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    return { key, label, year: y, month: m - 1 };
  });
};

/**
 * Computes high-level summary statistics for a given month or all-time
 */
export const computeReportStats = (
  user: User,
  monthKey: string | "all",
  now: Date,
): ReportStats => {
  const records = user.performanceRecords ?? [];
  const tasks = user.tasks ?? [];

  const filterRecord = (rec: PerformanceRecord) => {
    if (monthKey === "all") return true;
    return rec.date.startsWith(monthKey);
  };

  const filteredRecords = records.filter(filterRecord);
  const totalCompleted = filteredRecords.length;
  const commentsCount = filteredRecords.filter((r) =>
    Boolean(r.comment && r.comment.trim()),
  ).length;
  const habitCount = tasks.filter((t) => t.tracked || t.recurrence === "daily").length;

  let totalPlanned = 0;

  if (monthKey === "all") {
    // Collect all planned occurrences
    totalPlanned = Math.max(totalCompleted, tasks.length);
  } else {
    const [y, m] = monthKey.split("-").map(Number);
    const daysInMonth = new Date(y, m, 0).getDate();
    const todayKey = localDateKey(now);

    const weeklyTaskIds = new Set(
      tasks.filter((task) => task.recurrence === "weekly").map((task) => task.id),
    );

    let plannedCount = 0;
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(y, m - 1, day);
      const key = localDateKey(date);
      if (key > todayKey) continue; // Don't count future days as missed

      const plannedForDay = tasks.filter((task) => {
        if (!isCountedInDailyPerformance(task)) return false;
        if (startOfDay(date) > startOfDay(now)) return false;
        if (new Date(task.date) > endOfDay(date)) return false;
        if (task.recurrence) return isTaskScheduledOnDate(task, date);
        if (task.deadline) return localDateKey(new Date(task.deadline)) === key;
        return localDateKey(new Date(task.date)) === key;
      });

      plannedCount += plannedForDay.length;
    }

    const nonWeeklyRecords = filteredRecords.filter((r) => !weeklyTaskIds.has(r.taskId));
    totalPlanned = Math.max(plannedCount, nonWeeklyRecords.length);
  }

  const totalMissed = Math.max(totalPlanned - totalCompleted, 0);
  const completionRate =
    totalPlanned > 0
      ? Math.round((totalCompleted / totalPlanned) * 100)
      : totalCompleted > 0
        ? 100
        : 0;

  return {
    totalPlanned,
    totalCompleted,
    totalMissed,
    completionRate,
    habitCount,
    commentsCount,
  };
};

/**
 * Calculates current and longest streaks for a task's completion keys
 */
const getStreaks = (datesSet: Set<string>, todayKey: string) => {
  let currentStreak = 0;
  const cursor = new Date(`${todayKey}T00:00:00`);
  while (true) {
    const key = localDateKey(cursor);
    if (!datesSet.has(key)) break;
    currentStreak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  if (datesSet.size === 0) return { currentStreak, longestStreak: 0 };

  const sorted = Array.from(datesSet).sort();
  let longestStreak = 1;
  let running = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(`${sorted[i - 1]}T00:00:00`);
    const curr = new Date(`${sorted[i]}T00:00:00`);
    const diff = Math.round((curr.getTime() - prev.getTime()) / 86400000);
    if (diff === 1) {
      running++;
      longestStreak = Math.max(longestStreak, running);
    } else {
      running = 1;
    }
  }

  return { currentStreak, longestStreak };
};

/**
 * Generates an exhaustive, structured text report ready for AI analysis
 */
export const generateAIReport = (user: User, monthKey: string | "all", now: Date): string => {
  const records = user.performanceRecords ?? [];
  const tasks = user.tasks ?? [];
  const stats = computeReportStats(user, monthKey, now);

  const monthLabel =
    monthKey === "all"
      ? "All Recorded History"
      : new Date(
          Number(monthKey.split("-")[0]),
          Number(monthKey.split("-")[1]) - 1,
          1,
        ).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });

  const lines: string[] = [];

  // Title & Header
  lines.push("================================================================================");
  lines.push("                       AI PRODUCTIVITY & TASK PERFORMANCE REPORT                ");
  lines.push("================================================================================");
  lines.push(
    `Generated: ${now.toISOString().replace("T", " ").slice(0, 19)} (Local: ${now.toLocaleString()})`,
  );
  lines.push(`User: ${user.name || "User"}`);
  lines.push(`Scope: ${monthLabel}`);
  lines.push("");

  // Executive Summary
  lines.push("--------------------------------------------------------------------------------");
  lines.push("1. EXECUTIVE SUMMARY");
  lines.push("--------------------------------------------------------------------------------");
  lines.push(`* Overall Completion Rate : ${stats.completionRate}%`);
  lines.push(`* Total Planned Tasks     : ${stats.totalPlanned}`);
  lines.push(`* Total Completed Records : ${stats.totalCompleted}`);
  lines.push(`* Total Missed Tasks      : ${stats.totalMissed}`);
  lines.push(`* Active Daily Habits     : ${stats.habitCount}`);
  lines.push(`* Reflections / Comments  : ${stats.commentsCount} logged`);
  lines.push("");

  // Habit & Recurring Task Performance
  lines.push("--------------------------------------------------------------------------------");
  lines.push("2. HABIT & RECURRING TASK CONSISTENCY");
  lines.push("--------------------------------------------------------------------------------");

  const recurringTasks = tasks.filter((t) => t.recurrence || t.tracked);
  if (recurringTasks.length === 0) {
    lines.push("No recurring tasks or tracked habits configured.");
  } else {
    const todayKey = localDateKey(now);
    recurringTasks.forEach((task, idx) => {
      const taskRecords = records.filter((r) => r.taskId === task.id);
      const monthTaskRecords =
        monthKey === "all" ? taskRecords : taskRecords.filter((r) => r.date.startsWith(monthKey));

      const datesSet = new Set(taskRecords.map((r) => r.date));
      const { currentStreak, longestStreak } = getStreaks(datesSet, todayKey);

      lines.push(`${idx + 1}. [${task.tracked ? "HABIT" : "RECURRING"}] "${task.name}"`);
      lines.push(`   - Frequency: ${task.recurrence || "daily"}`);
      lines.push(`   - Completed in this period: ${monthTaskRecords.length} times`);
      lines.push(
        `   - Current Streak: ${currentStreak} day(s) | Longest Streak: ${longestStreak} day(s)`,
      );
      if (task.description) {
        lines.push(`   - Notes: ${task.description}`);
      }
      lines.push("");
    });
  }

  // Monthly & Weekly Breakdown
  lines.push("--------------------------------------------------------------------------------");
  lines.push("3. WEEKLY BREAKDOWN");
  lines.push("--------------------------------------------------------------------------------");

  const filteredRecords =
    monthKey === "all" ? records : records.filter((r) => r.date.startsWith(monthKey));

  if (filteredRecords.length === 0) {
    lines.push("No completions recorded in this period.");
  } else {
    // Group records by week (Sunday to Saturday)
    const recordsByWeek: Record<string, PerformanceRecord[]> = {};

    filteredRecords.forEach((rec) => {
      const d = new Date(`${rec.date}T00:00:00`);
      const sunday = new Date(d);
      sunday.setDate(d.getDate() - d.getDay());
      const saturday = new Date(sunday);
      saturday.setDate(sunday.getDate() + 6);

      const weekLabel = `${sunday.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${saturday.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
      if (!recordsByWeek[weekLabel]) {
        recordsByWeek[weekLabel] = [];
      }
      recordsByWeek[weekLabel].push(rec);
    });

    Object.entries(recordsByWeek).forEach(([weekLabel, weekRecords], idx) => {
      lines.push(`[Week ${idx + 1}] ${weekLabel}`);
      lines.push(`Total completions: ${weekRecords.length}`);
      weekRecords.forEach((r) => {
        const timeStr = new Date(r.completedAt).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const commentPart = r.comment ? ` | Reflection: "${r.comment}"` : "";
        const photoPart = r.completionPhotoId ? " [Photo Verified]" : "";
        lines.push(`  * ${r.date} ${timeStr} - "${r.taskName}"${photoPart}${commentPart}`);
      });
      lines.push("");
    });
  }

  // Detailed Day-By-Day Logs
  lines.push("--------------------------------------------------------------------------------");
  lines.push("4. DAY-BY-DAY LOGS (COMPLETED & MISSED)");
  lines.push("--------------------------------------------------------------------------------");

  if (monthKey !== "all") {
    const [y, m] = monthKey.split("-").map(Number);
    const daysInMonth = new Date(y, m, 0).getDate();
    const todayKey = localDateKey(now);

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(y, m - 1, day);
      const key = localDateKey(date);
      if (key > todayKey) continue;

      const dayCompleted = filteredRecords.filter((r) => r.date === key);
      const dayPlanned = tasks.filter((task) => {
        if (!isCountedInDailyPerformance(task)) return false;
        if (startOfDay(date) > startOfDay(now)) return false;
        if (new Date(task.date) > endOfDay(date)) return false;
        if (task.recurrence) return isTaskScheduledOnDate(task, date);
        if (task.deadline) return localDateKey(new Date(task.deadline)) === key;
        return localDateKey(new Date(task.date)) === key;
      });

      const completedIds = new Set(dayCompleted.map((r) => r.taskId));
      const dayMissed = dayPlanned.filter((t) => !completedIds.has(t.id));

      if (dayCompleted.length > 0 || dayMissed.length > 0) {
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        lines.push(`Date: ${key} (${dayName})`);
        if (dayCompleted.length > 0) {
          lines.push(`  Completed (${dayCompleted.length}):`);
          dayCompleted.forEach((r) => {
            const timeStr = new Date(r.completedAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });
            const c = r.comment ? ` (Note: "${r.comment}")` : "";
            lines.push(`    - [DONE] ${r.taskName} at ${timeStr}${c}`);
          });
        }
        if (dayMissed.length > 0) {
          lines.push(`  Missed (${dayMissed.length}):`);
          dayMissed.forEach((t) => {
            lines.push(`    - [MISSED] ${t.name}${t.description ? ` (${t.description})` : ""}`);
          });
        }
        lines.push("");
      }
    }
  } else {
    // For all-time, list recent completions
    filteredRecords.slice(0, 50).forEach((r) => {
      const commentPart = r.comment ? ` (Note: "${r.comment}")` : "";
      lines.push(`* ${r.date} - [DONE] ${r.taskName}${commentPart}`);
    });
    if (filteredRecords.length > 50) {
      lines.push(`... and ${filteredRecords.length - 50} more records.`);
    }
    lines.push("");
  }

  // All User Comments & Reflection Logs
  lines.push("--------------------------------------------------------------------------------");
  lines.push("5. USER REFLECTIONS & TASK COMMENTS LOG");
  lines.push("--------------------------------------------------------------------------------");
  const commentedRecords = filteredRecords.filter((r) => Boolean(r.comment && r.comment.trim()));
  if (commentedRecords.length === 0) {
    lines.push("No reflections or comments were attached to completions in this period.");
  } else {
    lines.push(
      `Found ${commentedRecords.length} reflections logged by user during task completion:`,
    );
    commentedRecords.forEach((r, idx) => {
      lines.push(
        `${idx + 1}. [${r.date}] Task: "${r.taskName}" -> Reflection: "${r.comment?.trim()}"`,
      );
    });
  }
  lines.push("");

  // Tailored AI Prompt for Analysis
  lines.push("================================================================================");
  lines.push("6. RECOMMENDED PROMPT TO FEED TO YOUR AI ASSISTANT");
  lines.push("================================================================================");
  lines.push("Paste the following prompt along with this report into ChatGPT, Claude, or Gemini:");
  lines.push("");
  lines.push(
    `"Act as an expert executive productivity coach and behavioral psychologist. Below is my actual task execution, habit, and reflection report for ${monthLabel}.`,
  );
  lines.push("Please perform a deep-dive analysis of my performance and tell me:");
  lines.push(
    "1. WHERE & WHEN AM I DROPPING OFF? Identify the specific days of the week, times, or cycles where missed tasks cluster.",
  );
  lines.push(
    "2. ROOT CAUSE ANALYSIS: Correlate my missed tasks with the reflections/comments I logged. What cognitive or logistical friction is causing me to miss tasks?",
  );
  lines.push(
    "3. HABIT STRENGTH: Assess the resilience of my daily habits and suggest how to protect my streaks.",
  );
  lines.push(
    '4. CONCRETE ACTION PLAN: Give me 3 high-impact, realistic system changes I should adopt next month to boost my completion rate and eliminate recurring bottlenecks."',
  );
  lines.push("================================================================================");

  return lines.join("\n");
};
