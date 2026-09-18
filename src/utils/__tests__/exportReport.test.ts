import { describe, expect, it } from "vitest";
import { computeReportStats, generateAIReport, getAvailableReportMonths } from "../exportReport";
import type { User, Task, PerformanceRecord, UUID } from "../../types/user";

describe("exportReport utils", () => {
  const mockNow = new Date("2026-09-19T10:00:00Z");

  const mockTasks: Task[] = [
    {
      id: "task-1" as unknown as UUID,
      name: "Morning Run",
      color: "#7851bf",
      done: true,
      pinned: false,
      date: new Date("2026-09-01T08:00:00Z"),
      recurrence: "daily",
      tracked: true,
    },
    {
      id: "task-2" as unknown as UUID,
      name: "Team Sync",
      color: "#22c55e",
      done: false,
      pinned: false,
      date: new Date("2026-09-10T14:00:00Z"),
    },
  ];

  const mockRecords: PerformanceRecord[] = [
    {
      id: "rec-1" as unknown as UUID,
      taskId: "task-1" as unknown as UUID,
      taskName: "Morning Run",
      date: "2026-09-01",
      completedAt: new Date("2026-09-01T08:30:00Z"),
      color: "#7851bf",
      comment: "Ran 5km with great pace",
    },
    {
      id: "rec-2" as unknown as UUID,
      taskId: "task-1" as unknown as UUID,
      taskName: "Morning Run",
      date: "2026-09-02",
      completedAt: new Date("2026-09-02T08:45:00Z"),
      color: "#7851bf",
      comment: "Legs felt tired",
    },
  ];

  const mockUser: User = {
    name: "Stark",
    createdAt: new Date(),
    profilePicture: null,
    emojisStyle: "apple" as unknown as User["emojisStyle"],
    tasks: mockTasks,
    categories: [],
    theme: "purple",
    darkmode: "auto",
    settings: {
      enableCategories: true,
      doneToBottom: false,
      enableGlow: true,
      simpleEmojiPicker: false,
      enableReadAloud: false,
      voice: "Microsoft Mark - English (United States)::en-US",
      voiceVolume: 0.6,
      appBadge: false,
      showProgressBar: true,
      sortOption: "dateCreated",
      reduceMotion: "system",
    },
    performanceRecords: mockRecords,
    deletedTasks: [],
    deletedCategories: [],
    favoriteCategories: [],
    colorList: [],
  };

  it("extracts available report months correctly", () => {
    const months = getAvailableReportMonths(mockUser, mockNow);
    expect(months.length).toBeGreaterThan(0);
    expect(months[0].key).toBe("2026-09");
  });

  it("computes stats for a specific month correctly", () => {
    const stats = computeReportStats(mockUser, "2026-09", mockNow);
    expect(stats.totalCompleted).toBe(2);
    expect(stats.habitCount).toBe(1);
    expect(stats.commentsCount).toBe(2);
    expect(stats.completionRate).toBeGreaterThan(0);
  });

  it("generates markdown AI report with prompt", () => {
    const report = generateAIReport(mockUser, "2026-09", mockNow);
    expect(report).toContain("AI PRODUCTIVITY & TASK PERFORMANCE REPORT");
    expect(report).toContain("Morning Run");
    expect(report).toContain("Ran 5km with great pace");
    expect(report).toContain("RECOMMENDED PROMPT TO FEED TO YOUR AI ASSISTANT");
  });
});
