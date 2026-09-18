import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowBackRounded,
  KeyboardArrowDownRounded,
  CheckRounded,
  AddRounded,
} from "@mui/icons-material";
import { Menu, MenuItem, Popover, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { UserContext } from "../contexts/UserContext";
import { getAppNow, localDateKey } from "../utils/testingDate";
import { TestingDateControl } from "../components/TestingDateControl";
import { generateUUID } from "../utils/generateUUID";
import type { PerformanceRecord, Task, UUID } from "../types/user";

const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_LETTERS = ["S", "M", "T", "W", "T", "F", "S"];
const ALL_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const NUMBER_WORDS: Record<number, string> = {
  0: "Zero",
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
};

type HeatCell = {
  date: Date;
  key: string;
  done: boolean;
  isToday: boolean;
  isFuture: boolean;
};

const getHeatmapGridDays = (now: Date): Date[] => {
  const currentSunday = new Date(now);
  currentSunday.setHours(0, 0, 0, 0);
  currentSunday.setDate(now.getDate() - now.getDay());

  const startSunday = new Date(currentSunday);
  startSunday.setDate(currentSunday.getDate() - 12 * 7);

  const days: Date[] = [];
  const cursor = new Date(startSunday);
  for (let i = 0; i < 13 * 7; i++) {
    days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
};

const getWeekDates = (weekOffset: number, now: Date): Date[] => {
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - now.getDay() + weekOffset * 7);
  sunday.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return d;
  });
};

const countCompletionsInWeek = (
  taskId: string,
  records: PerformanceRecord[],
  dates: Date[],
): number => {
  const keys = new Set(dates.map(localDateKey));
  return records.filter((r) => r.taskId === taskId && keys.has(r.date)).length;
};

const getCurrentStreak = (completedKeys: Set<string>, today: string): number => {
  let streak = 0;
  const cursor = new Date(`${today}T00:00:00`);
  while (true) {
    const key = localDateKey(cursor);
    if (!completedKeys.has(key)) break;
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};

const getLongestStreak = (completedKeys: Set<string>): number => {
  if (completedKeys.size === 0) return 0;
  const sorted = Array.from(completedKeys).sort();
  let longest = 1;
  let current = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(`${sorted[i - 1]}T00:00:00`);
    const curr = new Date(`${sorted[i]}T00:00:00`);
    const diff = Math.round((curr.getTime() - prev.getTime()) / 86400000);
    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }
  return longest;
};

const formatHeaderDate = (d: Date): string => {
  const dayName = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const dayNum = d.getDate();
  const monthName = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const year = d.getFullYear();
  return `${dayName}  /  ${dayNum}  ${monthName}  ${year}`;
};

const formatWeekRange = (dates: Date[]): string => {
  if (dates.length === 0) return "";
  const first = dates[0];
  const last = dates[dates.length - 1];
  const month = last.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  return `${first.getDate()}–${last.getDate()} ${month}`;
};

const formatDateRange90 = (start: Date, end: Date): string => {
  const startDay = start.getDate();
  const startMonth = start.toLocaleDateString("en-US", { month: "long" });
  const endDay = end.getDate();
  const endMonth = end.toLocaleDateString("en-US", { month: "long" });
  const endYear = end.getFullYear();
  return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${endYear}`;
};

const Tracked = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const records = useMemo(() => user.performanceRecords ?? [], [user.performanceRecords]);

  const trackedTasks = useMemo(
    () => user.tasks.filter((t) => t.tracked && t.recurrence === "daily"),
    [user.tasks],
  );

  const [selectedId, setSelectedId] = useState<UUID | string>(() => trackedTasks[0]?.id ?? "");

  const activeTaskId = selectedId || (trackedTasks[0]?.id ?? "demo-read-20-min");
  const isDemo = trackedTasks.length === 0;
  const selectedTask: { id: UUID | string; name: string; color: string } = useMemo(() => {
    const found = trackedTasks.find((t) => t.id === activeTaskId);
    if (found) return found;
    if (trackedTasks[0]) return trackedTasks[0];
    return {
      id: "demo-read-20-min",
      name: "Read 20 minutes",
      color: "#7851bf",
    };
  }, [trackedTasks, activeTaskId]);

  const now = useMemo(() => getAppNow(), []);
  const today = localDateKey(now);
  const thisWeekDates = useMemo(() => getWeekDates(0, now), [now]);
  const lastWeekDates = useMemo(() => getWeekDates(-1, now), [now]);

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [testDateAnchor, setTestDateAnchor] = useState<HTMLElement | null>(null);

  const completedKeys = useMemo(() => {
    if (isDemo) {
      const demoKeys = new Set<string>();
      thisWeekDates.forEach((d, idx) => {
        if (idx !== 3 && idx !== 6) {
          demoKeys.add(localDateKey(d));
        }
      });
      lastWeekDates.forEach((d, idx) => {
        if ([0, 1, 4, 5].includes(idx)) {
          demoKeys.add(localDateKey(d));
        }
      });
      const allDays = getHeatmapGridDays(now);
      allDays.forEach((d) => {
        const k = localDateKey(d);
        if (k < localDateKey(lastWeekDates[0])) {
          const dayIndex = d.getDay();
          const dayNum = d.getDate();
          if ((dayNum * 5 + dayIndex * 3) % 4 !== 0) {
            demoKeys.add(k);
          }
        }
      });
      return demoKeys;
    }
    return new Set(records.filter((r) => r.taskId === selectedTask.id).map((r) => r.date));
  }, [isDemo, records, selectedTask.id, thisWeekDates, lastWeekDates, now]);

  const thisWeekCount = useMemo(
    () =>
      countCompletionsInWeek(
        selectedTask.id,
        isDemo
          ? Array.from(completedKeys).map(
              (k) => ({ taskId: selectedTask.id, date: k }) as PerformanceRecord,
            )
          : records,
        thisWeekDates,
      ),
    [selectedTask.id, isDemo, completedKeys, records, thisWeekDates],
  );

  const lastWeekCount = useMemo(
    () =>
      countCompletionsInWeek(
        selectedTask.id,
        isDemo
          ? Array.from(completedKeys).map(
              (k) => ({ taskId: selectedTask.id, date: k }) as PerformanceRecord,
            )
          : records,
        lastWeekDates,
      ),
    [selectedTask.id, isDemo, completedKeys, records, lastWeekDates],
  );

  const currentStreak = useMemo(
    () => getCurrentStreak(completedKeys, today),
    [completedKeys, today],
  );
  const longestStreak = useMemo(() => getLongestStreak(completedKeys), [completedKeys]);

  const heatmapGridDays = useMemo(() => getHeatmapGridDays(now), [now]);

  const heatmapCells = useMemo(
    (): HeatCell[] =>
      heatmapGridDays.map((date) => {
        const key = localDateKey(date);
        return {
          date,
          key,
          done: completedKeys.has(key),
          isToday: key === today,
          isFuture: key > today,
        };
      }),
    [heatmapGridDays, completedKeys, today],
  );

  const heatmapWeeks = useMemo(() => {
    const weeks: HeatCell[][] = [];
    for (let i = 0; i < heatmapCells.length; i += 7) {
      weeks.push(heatmapCells.slice(i, i + 7));
    }
    return weeks;
  }, [heatmapCells]);

  const monthLabels = useMemo(() => {
    let lastSeenMonth = -1;
    return heatmapWeeks.map((week, index) => {
      const firstDay = week[0].date;
      const lastDay = week[6].date;
      const firstMonth = firstDay.getMonth();
      const lastMonth = lastDay.getMonth();

      if (index === 0) {
        lastSeenMonth = firstMonth;
        return ALL_MONTHS[firstMonth];
      }

      if (firstMonth !== lastMonth && lastMonth !== lastSeenMonth) {
        lastSeenMonth = lastMonth;
        return ALL_MONTHS[lastMonth];
      }

      if (firstMonth !== lastSeenMonth) {
        lastSeenMonth = firstMonth;
        return ALL_MONTHS[firstMonth];
      }

      return "";
    });
  }, [heatmapWeeks]);

  const range90Start = heatmapGridDays[0];
  const range90End = now;

  const handleToggleDay = (date: Date) => {
    const key = localDateKey(date);
    if (key > today) return;

    if (isDemo) {
      const newTaskId = generateUUID();
      const newTask: Task = {
        id: newTaskId,
        name: "Read 20 minutes",
        color: "#7851bf",
        done: key === today ? !completedKeys.has(key) : false,
        pinned: false,
        date: new Date(),
        recurrence: "daily",
        tracked: true,
      };

      const isAlreadyDone = completedKeys.has(key);
      const remainingDemoKeys = Array.from(completedKeys).filter((k) => k !== key);
      const activeKeys = isAlreadyDone ? remainingDemoKeys : [...remainingDemoKeys, key];

      const demoRecords: PerformanceRecord[] = activeKeys.map((k) => ({
        id: generateUUID(),
        taskId: newTask.id,
        taskName: newTask.name,
        date: k,
        completedAt: new Date(`${k}T12:00:00`),
        color: newTask.color,
      }));

      setUser((prev) => ({
        ...prev,
        tasks: [...prev.tasks, newTask],
        performanceRecords: [...(prev.performanceRecords ?? []), ...demoRecords],
      }));
      setSelectedId(newTaskId);
      return;
    }

    const isAlreadyDone = completedKeys.has(key);
    setUser((prev) => {
      let updatedRecords: PerformanceRecord[];
      if (isAlreadyDone) {
        updatedRecords = (prev.performanceRecords ?? []).filter(
          (r) => !(r.taskId === selectedTask.id && r.date === key),
        );
      } else {
        const record: PerformanceRecord = {
          id: generateUUID(),
          taskId: selectedTask.id as UUID,
          taskName: selectedTask.name,
          date: key,
          completedAt: date,
          color: selectedTask.color,
        };
        updatedRecords = [...(prev.performanceRecords ?? []), record];
      }

      let updatedTasks = prev.tasks;
      if (key === today) {
        updatedTasks = prev.tasks.map((t) =>
          t.id === selectedTask.id ? { ...t, done: !isAlreadyDone } : t,
        );
      }

      return {
        ...prev,
        tasks: updatedTasks,
        performanceRecords: updatedRecords,
      };
    });
  };

  const handleCreateSampleHabit = () => {
    const newTaskId = generateUUID();
    const newTask: Task = {
      id: newTaskId,
      name: "Read 20 minutes",
      color: "#7851bf",
      done: completedKeys.has(today),
      pinned: false,
      date: new Date(),
      recurrence: "daily",
      tracked: true,
    };

    const demoRecords: PerformanceRecord[] = Array.from(completedKeys).map((k) => ({
      id: generateUUID(),
      taskId: newTask.id,
      taskName: newTask.name,
      date: k,
      completedAt: new Date(`${k}T12:00:00`),
      color: newTask.color,
    }));

    setUser((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
      performanceRecords: [...(prev.performanceRecords ?? []), ...demoRecords],
    }));
    setSelectedId(newTaskId);
    setMenuAnchor(null);
  };

  const progressSentence = useMemo(() => {
    const countWord = NUMBER_WORDS[thisWeekCount] ?? thisWeekCount.toString();
    const daysMarked =
      thisWeekCount === 0
        ? "No days marked this week."
        : `${countWord} day${thisWeekCount === 1 ? "" : "s"} marked.`;

    if (thisWeekCount > lastWeekCount) {
      const diff = thisWeekCount - lastWeekCount;
      const diffWord = NUMBER_WORDS[diff]?.toLowerCase() ?? diff.toString();
      return `${daysMarked} ${diffWord.charAt(0).toUpperCase() + diffWord.slice(1)} more than last week.`;
    }
    if (thisWeekCount < lastWeekCount) {
      const diff = lastWeekCount - thisWeekCount;
      const diffWord = NUMBER_WORDS[diff]?.toLowerCase() ?? diff.toString();
      return `${daysMarked} ${diffWord.charAt(0).toUpperCase() + diffWord.slice(1)} less than last week.`;
    }
    return `${daysMarked} Same as last week.`;
  }, [thisWeekCount, lastWeekCount]);

  const isTodayDone = completedKeys.has(today);

  return (
    <PageContainer>
      <TopBar>
        <BackBtn onClick={() => navigate("/")} aria-label="Back to Tasks">
          <ArrowBackRounded sx={{ fontSize: 18 }} />
          <span>Tasks</span>
        </BackBtn>

        <DateDisplay
          onClick={(e) => setTestDateAnchor(e.currentTarget)}
          title="Click to adjust test date"
        >
          {formatHeaderDate(now)}
        </DateDisplay>

        <Popover
          open={Boolean(testDateAnchor)}
          anchorEl={testDateAnchor}
          onClose={() => setTestDateAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{ sx: { p: 2, borderRadius: 3, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" } }}
        >
          <TestingDateControl />
        </Popover>
      </TopBar>

      <TitleSection>
        <PageTitle>Tracking</PageTitle>
        <PageSubtitle>Small actions. A record that adds up.</PageSubtitle>
      </TitleSection>

      <HabitSelectorRow onClick={(e) => setMenuAnchor(e.currentTarget)}>
        <HabitColorBox color={selectedTask.color} />
        <HabitTextWrap>
          <HabitEyebrow>Daily habit</HabitEyebrow>
          <HabitName>{selectedTask.name}</HabitName>
        </HabitTextWrap>
        <KeyboardArrowDownRounded sx={{ fontSize: 24, color: "var(--text-dark)", ml: "auto" }} />
      </HabitSelectorRow>

      <AccentUnderline color={selectedTask.color} />

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            minWidth: 240,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            mt: 1,
          },
        }}
      >
        {trackedTasks.map((t) => (
          <MenuItem
            key={t.id}
            selected={t.id === selectedTask.id}
            onClick={() => {
              setSelectedId(t.id);
              setMenuAnchor(null);
            }}
            sx={{ gap: 1.5, py: 1.2 }}
          >
            <HabitColorBox color={t.color} />
            <Typography variant="body1" fontWeight={t.id === selectedTask.id ? 700 : 500}>
              {t.name}
            </Typography>
          </MenuItem>
        ))}

        {isDemo && (
          <MenuItem onClick={handleCreateSampleHabit} sx={{ gap: 1.5, py: 1.2 }}>
            <AddRounded sx={{ fontSize: 18, color: "#7851bf" }} />
            <Typography variant="body2" fontWeight={600} color="#7851bf">
              Save &quot;Read 20 minutes&quot; habit
            </Typography>
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            navigate("/add");
          }}
          sx={{ gap: 1.5, py: 1.2, borderTop: "1px solid #e2e8f0" }}
        >
          <AddRounded sx={{ fontSize: 18 }} />
          <Typography variant="body2">Create daily habit...</Typography>
        </MenuItem>
      </Menu>

      <SectionHeader>
        <SectionTitle>This week</SectionTitle>
        <DateRangeText>{formatWeekRange(thisWeekDates)}</DateRangeText>
      </SectionHeader>

      <WeekCalendarGrid>
        {thisWeekDates.map((date) => {
          const key = localDateKey(date);
          const done = completedKeys.has(key);
          const isToday = key === today;
          const isFuture = key > today;
          const dayNum = date.getDate();
          const dayName = DAYS_SHORT[date.getDay()];

          return (
            <WeekDayCol key={key} onClick={() => handleToggleDay(date)}>
              <DayNameText isToday={isToday}>{dayName}</DayNameText>
              <DayNumText isToday={isToday}>{dayNum}</DayNumText>
              <DayBoxWrap>
                {isToday && <DayTodayOutline />}
                <DayStatusBox done={done} isFuture={isFuture} color={selectedTask.color}>
                  {done ? (
                    <CheckRounded
                      sx={{
                        fontSize: "clamp(13px, 3.8vw, 17px)",
                        stroke: "currentColor",
                        strokeWidth: 1,
                      }}
                    />
                  ) : isFuture ? null : (
                    <DashText>–</DashText>
                  )}
                </DayStatusBox>
              </DayBoxWrap>
            </WeekDayCol>
          );
        })}
      </WeekCalendarGrid>

      <ProgressText>{progressSentence}</ProgressText>

      <WeeklyStatsRow>
        <StatCol>
          <StatValueWrap>
            <StatNumber>{thisWeekCount}</StatNumber>
            <StatTotal>/ 7</StatTotal>
          </StatValueWrap>
          <StatLabel>This week</StatLabel>
        </StatCol>

        <VerticalDivider />

        <StatCol>
          <StatValueWrap>
            <StatNumber>{lastWeekCount}</StatNumber>
            <StatTotal>/ 7</StatTotal>
          </StatValueWrap>
          <StatLabel>Previous week</StatLabel>
        </StatCol>
      </WeeklyStatsRow>

      <SectionDivider />

      <SectionHeader>
        <SectionTitle>Your record</SectionTitle>
        <DateRangeText>90 DAYS</DateRangeText>
      </SectionHeader>
      <Subtitle90>{formatDateRange90(range90Start, range90End)}</Subtitle90>

      <LegendRow>
        <LegendItem>
          <LegendSwatch color={selectedTask.color} />
          <span>Completed</span>
        </LegendItem>
        <LegendItem>
          <LegendSwatch color="var(--cell-uncompleted)" />
          <span>Not completed</span>
        </LegendItem>
      </LegendRow>

      <HeatmapMatrixWrapper>
        <MonthLabelsRow>
          <DayLettersSpacer />
          <MonthGrid>
            {monthLabels.map((m, idx) => (
              <MonthColCell key={idx}>{m && <MonthText>{m}</MonthText>}</MonthColCell>
            ))}
          </MonthGrid>
        </MonthLabelsRow>

        <HeatmapBody>
          <DayLettersCol>
            {DAY_LETTERS.map((letter, idx) => (
              <DayLetterCell key={idx}>{letter}</DayLetterCell>
            ))}
          </DayLettersCol>

          <HeatmapColumnsWrap>
            {heatmapWeeks.map((week, wi) => (
              <HeatmapWeekCol key={wi}>
                {week.map((cell) => (
                  <HeatCellWrap key={cell.key} isToday={cell.isToday}>
                    {cell.isToday && <HeatTodayOutline />}
                    <HeatCellSquare
                      done={cell.done}
                      isFuture={cell.isFuture}
                      color={selectedTask.color}
                      title={`${cell.key}${cell.done ? " • Completed" : cell.isFuture ? " • Upcoming" : " • Missed"}`}
                      onClick={() => handleToggleDay(cell.date)}
                    />
                  </HeatCellWrap>
                ))}
              </HeatmapWeekCol>
            ))}
          </HeatmapColumnsWrap>
        </HeatmapBody>
      </HeatmapMatrixWrapper>

      <MatrixCaption>
        Outlined square: today · {isTodayDone ? "completed" : "pending"}
      </MatrixCaption>

      <SectionDivider />

      <StreaksRow>
        <StreakCol>
          <StreakLabel>Current run</StreakLabel>
          <StreakValueWrap>
            <StreakNumber>{currentStreak}</StreakNumber>
            <StreakUnit>days</StreakUnit>
          </StreakValueWrap>
        </StreakCol>

        <StreakCol>
          <StreakLabel>Personal best</StreakLabel>
          <StreakValueWrap>
            <StreakNumber>{longestStreak}</StreakNumber>
            <StreakUnit>days</StreakUnit>
          </StreakValueWrap>
        </StreakCol>
      </StreaksRow>

      <SectionDivider />

      <FooterNote>Updates when you complete this habit in Tasks.</FooterNote>
    </PageContainer>
  );
};

/* --- Styled Components --- */

const PageContainer = styled.main`
  --bg-grid: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.05)" : "#ffffff")};
  --border-grid: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.12)" : "#cbd5e1")};
  --border-divider: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0")};
  --text-dark: ${({ theme }) => (theme.darkmode ? "#f8fafc" : "#17243a")};
  --text-muted: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#596987")};
  --text-subtle: ${({ theme }) => (theme.darkmode ? "#cbd5e1" : "#64748b")};
  --cell-uncompleted: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.1)" : "#dbe2eb")};
  --today-outline: ${({ theme }) => (theme.darkmode ? "#ffffff" : "#17243a")};

  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 8px 0 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: "Poppins", sans-serif;

  @media (min-width: 1025px) {
    max-width: 580px;
    padding: 36px 40px 60px;
    background: ${({ theme }) => (theme.darkmode ? "rgba(255,255,255,0.04)" : "#ffffff")};
    border-radius: 20px;
    box-shadow: ${({ theme }) =>
      theme.darkmode ? "0 2px 24px rgba(0,0,0,0.35)" : "0 2px 24px rgba(100,110,140,0.12)"};
    max-width: 620px;
    margin: 0;
    padding: 24px 0 80px;
  }
`;

const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
`;

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--text-dark);
  font-family: "Poppins", sans-serif;
  font-size: 13.5px;
  font-weight: 500;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }
`;

const DateDisplay = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
  margin-left: auto;
  margin-right: 56px;
  transition: background 0.2s;
  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
  @media (max-width: 1024px) {
    margin-right: 52px;
  }
`;

const TitleSection = styled.div`
  margin-bottom: 22px;
`;

const PageTitle = styled.h1`
  font-size: clamp(26px, 6vw, 32px);
  font-weight: 800;
  color: var(--text-dark);
  letter-spacing: -0.5px;
  margin: 0 0 6px 0;
  line-height: 1.15;
`;

const PageSubtitle = styled.p`
  font-size: 13.5px;
  font-weight: 400;
  color: var(--text-subtle);
  margin: 0;
  line-height: 1.4;
`;

const HabitSelectorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 2px 0;
  user-select: none;
`;

const HabitColorBox = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${({ color }) => color || "#7851bf"};
  flex-shrink: 0;
`;

const HabitTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
`;

const HabitEyebrow = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
  line-height: 1.2;
`;

const HabitName = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-dark);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AccentUnderline = styled.div<{ color: string }>`
  width: 100%;
  height: 2px;
  background-color: ${({ color }) => color || "#7851bf"};
  margin-top: 10px;
  margin-bottom: 22px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
`;

const DateRangeText = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--text-subtle);
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const Subtitle90 = styled.p`
  font-size: 12px;
  color: var(--text-muted);
  margin: -6px 0 12px 0;
`;

const WeekCalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  background-color: var(--bg-grid);
  border: 1px solid var(--border-grid);
  border-radius: 6px;
  box-sizing: border-box;
  margin-bottom: 14px;
  overflow: hidden;
`;

const WeekDayCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 12px;
  border-right: 1px solid var(--border-grid);
  cursor: pointer;
  user-select: none;
  min-width: 0;
  &:last-child {
    border-right: none;
  }
`;

const DayNameText = styled.span<{ isToday: boolean }>`
  font-size: 10.5px;
  font-weight: ${({ isToday }) => (isToday ? 700 : 500)};
  color: ${({ isToday }) => (isToday ? "var(--text-dark)" : "var(--text-muted)")};
  margin-bottom: 2px;
`;

const DayNumText = styled.span<{ isToday: boolean }>`
  font-size: clamp(14px, 4vw, 16px);
  font-weight: ${({ isToday }) => (isToday ? 700 : 500)};
  color: var(--text-dark);
  margin-bottom: 8px;
`;

const DayBoxWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(24px, 7vw, 32px);
  height: clamp(24px, 7vw, 32px);
`;

const DayTodayOutline = styled.div`
  position: absolute;
  inset: -3px;
  border: 2px solid var(--today-outline);
  border-radius: 6px;
  pointer-events: none;
`;

const DayStatusBox = styled.div<{ done: boolean; isFuture: boolean; color: string }>`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ done, isFuture, color }) =>
    done ? color : isFuture ? "transparent" : "var(--cell-uncompleted)"};
  border: ${({ isFuture }) => (isFuture ? "1.5px dashed #a0aec0" : "none")};
  color: ${({ done }) => (done ? "#ffffff" : "var(--text-muted)")};
  box-sizing: border-box;
`;

const DashText = styled.span`
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
`;

const ProgressText = styled.p`
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text-dark);
  margin: 0 0 16px 0;
`;

const WeeklyStatsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StatCol = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StatValueWrap = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

const StatNumber = styled.span`
  font-size: clamp(26px, 6.5vw, 32px);
  font-weight: 700;
  color: var(--text-dark);
  line-height: 1.1;
`;

const StatTotal = styled.span`
  font-size: 18px;
  font-weight: 400;
  color: var(--text-muted);
`;

const StatLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  margin-top: 2px;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 44px;
  background-color: var(--border-divider);
  margin: 0 16px;
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--border-divider);
  margin: 20px 0;
`;

const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--text-muted);
`;

const LegendSwatch = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 1px;
  background-color: ${({ color }) => color};
`;

const HeatmapMatrixWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`;

const MonthLabelsRow = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

const DayLettersSpacer = styled.div`
  width: 14px;
  flex-shrink: 0;
  margin-right: 6px;
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(13, minmax(0, 1fr));
  gap: 4px;
  flex: 1;
`;

const MonthColCell = styled.div`
  position: relative;
  height: 14px;
  width: 100%;
`;

const MonthText = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  font-size: 10px;
  color: var(--text-muted);
  white-space: nowrap;
  pointer-events: none;
`;

const HeatmapBody = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;
`;

const DayLettersCol = styled.div`
  display: grid;
  grid-template-rows: repeat(7, minmax(0, 1fr));
  gap: 4px;
  width: 14px;
  flex-shrink: 0;
`;

const DayLetterCell = styled.div`
  font-size: 10px;
  font-weight: 500;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeatmapColumnsWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(13, minmax(0, 1fr));
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

const HeatmapWeekCol = styled.div`
  display: grid;
  grid-template-rows: repeat(7, minmax(0, 1fr));
  gap: 4px;
  min-width: 0;
`;

const HeatCellWrap = styled.div<{ isToday: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
`;

const HeatTodayOutline = styled.div`
  position: absolute;
  inset: -1.5px;
  border: 1.5px solid var(--today-outline);
  border-radius: 4px;
  pointer-events: none;
`;

const HeatCellSquare = styled.div<{ done: boolean; isFuture: boolean; color: string }>`
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background-color: ${({ done, isFuture, color }) =>
    done ? color : isFuture ? "transparent" : "var(--cell-uncompleted)"};
  border: ${({ isFuture }) => (isFuture ? "1px dashed #a0aec0" : "none")};
  box-sizing: border-box;
  cursor: pointer;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.8;
  }
`;

const MatrixCaption = styled.p`
  font-family: monospace;
  font-size: 11px;
  color: var(--text-muted);
  margin: 12px 0 0 0;
  letter-spacing: -0.2px;
`;

const StreaksRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StreakCol = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StreakLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  margin-bottom: 2px;
`;

const StreakValueWrap = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
`;

const StreakNumber = styled.span`
  font-size: clamp(24px, 6vw, 28px);
  font-weight: 700;
  color: var(--text-dark);
  line-height: 1.1;
`;

const StreakUnit = styled.span`
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text-dark);
`;

const FooterNote = styled.p`
  font-size: 11.5px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.4;
`;

export default Tracked;
