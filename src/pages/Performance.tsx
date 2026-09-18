import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowBackRounded,
  CheckCircleRounded,
  CloseRounded,
  ImageRounded,
  QueryStatsRounded,
  RadioButtonUncheckedRounded,
  ExpandMoreRounded,
  ChatBubbleOutlineRounded,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  MenuItem,
  Popover,
  Select,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { UserContext } from "../contexts/UserContext";
import { isCountedInDailyPerformance, isTaskScheduledOnDate } from "../utils/taskSchedule";
import { getAppNow, localDateKey } from "../utils/testingDate";
import type { PerformanceRecord, Task } from "../types/user";
import { getTaskCompletionPhoto } from "../utils/taskCompletionPhotoStorage";
import { TestingDateControl } from "../components/TestingDateControl";
import { CustomDialogTitle } from "../components/DialogTitle";

type ViewMode = "day" | "week" | "month";
type RangeItem = { key: string; label: string; start: Date; end: Date; days: DayStat[] };
type DayStat = {
  key: string;
  label: string;
  shortLabel: string;
  completed: PerformanceRecord[];
  planned: Task[];
  percentage: number;
};

interface RecordDetailDialogProps {
  records: PerformanceRecord[];
  label: string;
  open: boolean;
  onClose: () => void;
  onOpenPhoto: (photoSrc: string) => void;
}

const RecordDetailDialog = ({
  records,
  label,
  open,
  onClose,
  onOpenPhoto,
}: RecordDetailDialogProps) => {
  const [photos, setPhotos] = useState<Record<string, string | null>>({});

  useEffect(() => {
    if (!open) return;
    records.forEach((record) => {
      if (record.completionPhotoId && !(record.completionPhotoId in photos)) {
        getTaskCompletionPhoto(record.completionPhotoId).then((photo) =>
          setPhotos((prev) => ({ ...prev, [record.completionPhotoId!]: photo })),
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, records]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          padding: "8px",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <CustomDialogTitle
        title={label}
        subTitle={`${records.length} completion${records.length === 1 ? "" : "s"} recorded`}
        icon={<QueryStatsRounded />}
        onClose={onClose}
      />
      <DialogContent sx={{ px: 2, py: 1.5 }}>
        {records.length === 0 ? (
          <EmptyStateText>No completions recorded in this period.</EmptyStateText>
        ) : (
          <RecordsList>
            {records.map((record) => (
              <RecordCard key={record.id}>
                <RecordIndicator color={record.color} />
                <RecordInfo>
                  <RecordTitle>{record.taskName}</RecordTitle>
                  <RecordTime>
                    {new Date(record.completedAt).toLocaleTimeString(navigator.language, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" · "}
                    {new Date(record.completedAt).toLocaleDateString(navigator.language, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </RecordTime>
                  {record.comment && (
                    <RecordComment>
                      <ChatBubbleOutlineRounded sx={{ fontSize: 13 }} />
                      <span>&ldquo;{record.comment}&rdquo;</span>
                    </RecordComment>
                  )}
                </RecordInfo>
                {record.completionPhotoId &&
                  (photos[record.completionPhotoId] ? (
                    <CompletionThumbnail
                      src={photos[record.completionPhotoId]!}
                      alt={record.taskName}
                      onClick={() => onOpenPhoto(photos[record.completionPhotoId!]!)}
                      title="Click to view full photo"
                    />
                  ) : (
                    <PhotoPlaceholder>
                      <ImageRounded sx={{ fontSize: 20 }} />
                    </PhotoPlaceholder>
                  ))}
              </RecordCard>
            ))}
          </RecordsList>
        )}
      </DialogContent>
    </Dialog>
  );
};

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const addDays = (date: Date, amount: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
};
const endOfDay = (date: Date) => addDays(startOfDay(date), 1);
const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(navigator.language, options).format(date);

const formatHeaderDate = (d: Date): string => {
  const dayName = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const dayNum = d.getDate();
  const monthName = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const year = d.getFullYear();
  return `${dayName}  /  ${dayNum}  ${monthName}  ${year}`;
};

const Performance = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const [mode, setMode] = useState<ViewMode>("day");
  const [selectedKey, setSelectedKey] = useState<string>();
  const [detailDayKey, setDetailDayKey] = useState<string>();
  const [dialogRecords, setDialogRecords] = useState<{
    records: PerformanceRecord[];
    label: string;
  } | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [testDateAnchor, setTestDateAnchor] = useState<HTMLElement | null>(null);
  const [detailPhotos, setDetailPhotos] = useState<Record<string, string | null>>({});

  const now = getAppNow();
  const records = useMemo(() => user.performanceRecords ?? [], [user.performanceRecords]);

  const getDayStat = useCallback(
    (date: Date): DayStat => {
      const key = localDateKey(date);
      const weeklyTaskIds = new Set(
        user.tasks.filter((task) => task.recurrence === "weekly").map((task) => task.id),
      );
      const completed = records.filter(
        (record) => record.date === key && !weeklyTaskIds.has(record.taskId),
      );
      const planned = user.tasks.filter((task) => {
        if (!isCountedInDailyPerformance(task)) return false;
        if (startOfDay(date) > startOfDay(now)) return false;
        if (new Date(task.date) > endOfDay(date)) return false;
        if (task.recurrence) return isTaskScheduledOnDate(task, date);
        if (task.deadline) return localDateKey(new Date(task.deadline)) === key;
        return localDateKey(new Date(task.date)) === key;
      });
      const completedIds = new Set(completed.map((record) => record.taskId));
      const completedCount = Math.min(completed.length, planned.length || completed.length);

      return {
        key,
        label: formatDate(date, { weekday: "long", month: "long", day: "numeric" }),
        shortLabel: formatDate(date, { weekday: "short", month: "short", day: "numeric" }),
        completed,
        planned: planned.filter((task) => !completedIds.has(task.id)),
        percentage: planned.length
          ? Math.round((completedCount / planned.length) * 100)
          : completed.length
            ? 100
            : 0,
      };
    },
    [now, records, user.tasks],
  );

  const ranges = useMemo<RangeItem[]>(() => {
    const createDays = (start: Date, count: number) =>
      Array.from({ length: count }, (_, index) => getDayStat(addDays(start, index)));
    if (mode === "day") {
      return Array.from({ length: 14 }, (_, index) => {
        const date = addDays(now, -index);
        const day = getDayStat(date);
        return { key: day.key, label: day.label, start: date, end: date, days: [day] };
      });
    }
    if (mode === "week") {
      const currentWeekStart = addDays(startOfDay(now), -now.getDay());
      return Array.from({ length: 8 }, (_, index) => {
        const start = addDays(currentWeekStart, -index * 7);
        const days = createDays(start, 7);
        return {
          key: localDateKey(start),
          label: `${formatDate(start, { month: "short", day: "numeric" })} - ${formatDate(addDays(start, 6), { month: "short", day: "numeric" })}`,
          start,
          end: addDays(start, 6),
          days,
        };
      });
    }
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    return Array.from({ length: 12 }, (_, index) => {
      const start = new Date(monthStart.getFullYear(), monthStart.getMonth() - index, 1);
      const nextMonth = new Date(start.getFullYear(), start.getMonth() + 1, 1);
      const days = createDays(
        start,
        Math.round((nextMonth.getTime() - start.getTime()) / 86400000),
      );
      return {
        key: `${start.getFullYear()}-${start.getMonth()}`,
        label: formatDate(start, { month: "long", year: "numeric" }),
        start,
        end: addDays(nextMonth, -1),
        days,
      };
    });
  }, [getDayStat, mode, now]);

  const selected = ranges.find((range) => range.key === selectedKey) ?? ranges[0];
  const visibleRanges = ranges.slice(0, 4);
  const detailDay = selected.days.find((day) => day.key === detailDayKey);
  const detailDays = detailDay ? [detailDay] : selected.days;

  const summary = selected.days.reduce(
    (result, day) => ({
      completed: result.completed + day.completed.length,
      planned: result.planned + day.planned.length + day.completed.length,
    }),
    { completed: 0, planned: 0 },
  );
  const summaryPercentage = summary.planned
    ? Math.round((summary.completed / summary.planned) * 100)
    : 0;

  // Load photos for completed items in detail view
  useEffect(() => {
    detailDays
      .flatMap((day) => day.completed)
      .forEach((record) => {
        if (record.completionPhotoId && !(record.completionPhotoId in detailPhotos)) {
          getTaskCompletionPhoto(record.completionPhotoId).then((photo) =>
            setDetailPhotos((prev) => ({ ...prev, [record.completionPhotoId!]: photo })),
          );
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailDays]);

  return (
    <PageContainer>
      {/* Lightbox Dialog */}
      <Dialog
        open={!!lightboxSrc}
        onClose={() => setLightboxSrc(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            overflow: "hidden",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(12px)",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
          <Typography
            fontWeight={700}
            color="#f8fafc"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <ImageRounded sx={{ fontSize: 20, color: theme.primary }} /> Completion Photo
          </Typography>
          <IconButton onClick={() => setLightboxSrc(null)} sx={{ color: "#94a3b8" }}>
            <CloseRounded />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 0, display: "flex", justifyContent: "center", background: "#000" }}>
          {lightboxSrc && (
            <img
              src={lightboxSrc}
              alt="Completion verification"
              style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain" }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Detail Records Modal */}
      <RecordDetailDialog
        open={!!dialogRecords}
        records={dialogRecords?.records ?? []}
        label={dialogRecords?.label ?? ""}
        onClose={() => setDialogRecords(null)}
        onOpenPhoto={(src) => setLightboxSrc(src)}
      />

      {/* Header & Navigation */}
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
          PaperProps={{
            sx: {
              p: 2,
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            },
          }}
        >
          <TestingDateControl />
        </Popover>
      </TopBar>

      <TitleSection>
        <PageTitle>Performance</PageTitle>
        <PageSubtitle>
          Your progress, over time. A record of what got done and what still needs attention.
        </PageSubtitle>
      </TitleSection>

      <AccentLine color={theme.primary} />

      {/* Period Controls */}
      <ControlsRow>
        <ModePillGroup>
          <ModeTab
            active={mode === "day"}
            onClick={() => {
              setMode("day");
              setSelectedKey(undefined);
              setDetailDayKey(undefined);
            }}
          >
            Days
          </ModeTab>
          <ModeTab
            active={mode === "week"}
            onClick={() => {
              setMode("week");
              setSelectedKey(undefined);
              setDetailDayKey(undefined);
            }}
          >
            Weeks
          </ModeTab>
          <ModeTab
            active={mode === "month"}
            onClick={() => {
              setMode("month");
              setSelectedKey(undefined);
              setDetailDayKey(undefined);
            }}
          >
            Months
          </ModeTab>
        </ModePillGroup>

        <SelectWrapper>
          <FormControl size="small" fullWidth>
            <Select
              value={selected.key}
              onChange={(event) => {
                setSelectedKey(event.target.value);
                setDetailDayKey(undefined);
              }}
              IconComponent={ExpandMoreRounded}
              sx={{
                borderRadius: "14px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                backgroundColor: "var(--bg-card)",
                color: "var(--text-dark)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border-card)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--text-muted)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.primary,
                },
                "& .MuiSelect-icon": {
                  color: "var(--text-muted)",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: "16px",
                    maxHeight: 320,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    border: "1px solid var(--border-card)",
                    backgroundColor: "var(--bg-card)",
                    backdropFilter: "blur(12px)",
                  },
                },
              }}
            >
              {ranges.map((range, index) => (
                <MenuItem
                  key={range.key}
                  value={range.key}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "13px",
                    fontWeight: selected.key === range.key ? 700 : 500,
                    py: 1,
                  }}
                >
                  {index === 0 ? `Current · ${range.label}` : range.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </SelectWrapper>
      </ControlsRow>

      {/* Primary Summary Hero Card */}
      <HeroCard>
        <HeroStatBox>
          <HeroPercentage>{summaryPercentage}%</HeroPercentage>
          <HeroBadge>
            {mode === "day" ? "Day Rate" : mode === "week" ? "Week Rate" : "Month Rate"}
          </HeroBadge>
        </HeroStatBox>

        <HeroDetailsBox>
          <HeroLabel>{selected.label}</HeroLabel>
          <HeroCountText>
            <strong>{summary.completed}</strong> completed out of <strong>{summary.planned}</strong>{" "}
            planned
          </HeroCountText>
          <HeroProgressTrack>
            <HeroProgressFill value={summaryPercentage} color={theme.primary} />
          </HeroProgressTrack>
          <HeroMotivationText>
            {summaryPercentage === 100 && summary.planned > 0
              ? "🌟 Perfect! All scheduled tasks completed!"
              : summaryPercentage >= 75
                ? "🔥 Outstanding momentum! Keep it going!"
                : summaryPercentage >= 50
                  ? "💪 Halfway through, great consistency!"
                  : summary.planned === 0
                    ? "✨ No scheduled tasks for this period."
                    : "🎯 Keep focused and complete today's goals!"}
          </HeroMotivationText>
        </HeroDetailsBox>
      </HeroCard>

      {/* Main Grid: Recent Periods & Detail Breakdown */}
      <ContentGrid>
        {/* Left Column: Recent Periods */}
        <RangeSection>
          <SectionHeader>
            <SectionTitle>{mode === "day" ? "Recent days" : `Recent ${mode}s`}</SectionTitle>
            <Chip
              label="4 shown"
              size="small"
              sx={{
                fontSize: "11px",
                fontWeight: 600,
                borderRadius: "8px",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                color: "var(--text-muted)",
              }}
            />
          </SectionHeader>

          <RangeListWrap>
            {visibleRanges.map((range, index) => {
              const completed = range.days.reduce((total, day) => total + day.completed.length, 0);
              const planned = range.days.reduce(
                (total, day) => total + day.planned.length + day.completed.length,
                0,
              );
              const percentage = planned ? Math.round((completed / planned) * 100) : 0;
              const allRecords = range.days.flatMap((day) => day.completed);
              const isSelected = selected.key === range.key;

              return (
                <RangeCard
                  key={range.key}
                  selected={isSelected}
                  primaryColor={theme.primary}
                  onClick={() => {
                    setSelectedKey(range.key);
                    setDetailDayKey(undefined);
                    if (allRecords.length > 0 && (mode === "day" || mode === "week")) {
                      setDialogRecords({
                        records: allRecords,
                        label: index === 0 ? `Current · ${range.label}` : range.label,
                      });
                    }
                  }}
                >
                  <RangeCardMeta>
                    <RangeCardTitle>
                      {index === 0 ? `Current · ${range.label}` : range.label}
                    </RangeCardTitle>
                    <RangeCardSub>
                      {completed} completed · {Math.max(planned - completed, 0)} missed
                    </RangeCardSub>
                  </RangeCardMeta>

                  <RangeCardStat>
                    <RangePercent selected={isSelected} primaryColor={theme.primary}>
                      {percentage}%
                    </RangePercent>
                    <RangeProgressBarTrack>
                      <RangeProgressBarFill value={percentage} color={theme.primary} />
                    </RangeProgressBarTrack>
                  </RangeCardStat>
                </RangeCard>
              );
            })}
          </RangeListWrap>
        </RangeSection>

        {/* Right Column: Detail Panel */}
        <DetailCard>
          <DetailHeader>
            <DetailTitle>{detailDay?.label ?? selected.label}</DetailTitle>
            <DetailSubtitle>Completed and missed tasks in this period</DetailSubtitle>
          </DetailHeader>

          {/* Day Strip for multi-day periods */}
          {selected.days.length > 1 && (
            <DayStrip>
              {selected.days.map((day) => {
                const isSelected = day.key === (detailDay?.key ?? selected.days[0].key);
                const parts = day.shortLabel.split(", ");
                const weekday = parts[0] || day.shortLabel.slice(0, 3);
                const dayDate = parts[1] || "";

                return (
                  <DayButton
                    key={day.key}
                    selected={isSelected}
                    primaryColor={theme.primary}
                    onClick={() => setDetailDayKey(day.key)}
                  >
                    <DayWeekday selected={isSelected}>{weekday}</DayWeekday>
                    <DayDateNumber selected={isSelected}>{dayDate}</DayDateNumber>
                    <DayPercentageBadge selected={isSelected} primaryColor={theme.primary}>
                      {day.percentage}%
                    </DayPercentageBadge>
                  </DayButton>
                );
              })}
            </DayStrip>
          )}

          {/* Completed Tasks List */}
          <SectionSubhead>
            <CheckCircleRounded sx={{ color: "#22c55e", fontSize: 18 }} />
            <span>Completed</span>
            <SubheadCountChip
              label={detailDays.reduce((total, day) => total + day.completed.length, 0)}
              size="small"
              colorStyle="green"
            />
          </SectionSubhead>

          {detailDays.flatMap((day) => day.completed).length > 0 ? (
            <TaskListWrap>
              {detailDays
                .flatMap((day) => day.completed)
                .map((record) => (
                  <TaskCard key={record.id}>
                    <TaskColorIndicator color={record.color || theme.primary} />
                    <TaskCardContent>
                      <TaskCardName>{record.taskName}</TaskCardName>
                      <TaskCardMeta>
                        {new Date(record.completedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {" · "}
                        {record.date}
                      </TaskCardMeta>
                      {record.comment && (
                        <CommentBubble>
                          <ChatBubbleOutlineRounded sx={{ fontSize: 13 }} />
                          <span>&ldquo;{record.comment}&rdquo;</span>
                        </CommentBubble>
                      )}
                    </TaskCardContent>
                    {record.completionPhotoId &&
                      (detailPhotos[record.completionPhotoId] ? (
                        <CompletionThumbnail
                          src={detailPhotos[record.completionPhotoId]!}
                          alt={record.taskName}
                          onClick={() => setLightboxSrc(detailPhotos[record.completionPhotoId!]!)}
                          title="Click to zoom completion photo"
                        />
                      ) : (
                        <PhotoPlaceholder>
                          <ImageRounded sx={{ fontSize: 18 }} />
                        </PhotoPlaceholder>
                      ))}
                  </TaskCard>
                ))}
            </TaskListWrap>
          ) : (
            <EmptyBox>No completions recorded in this period.</EmptyBox>
          )}

          {/* Missed Tasks List */}
          <SectionSubhead marginTop="20px">
            <RadioButtonUncheckedRounded sx={{ color: "#94a3b8", fontSize: 18 }} />
            <span>Missed</span>
            <SubheadCountChip
              label={detailDays.reduce((total, day) => total + day.planned.length, 0)}
              size="small"
              colorStyle="gray"
            />
          </SectionSubhead>

          {detailDays.flatMap((day) => day.planned).length > 0 ? (
            <TaskListWrap>
              {detailDays
                .flatMap((day) => day.planned)
                .map((task) => (
                  <TaskCard key={`${task.id}-${selected.key}`} missed>
                    <TaskMissedDot />
                    <TaskCardContent>
                      <TaskCardName>{task.name}</TaskCardName>
                      <TaskCardMeta>Needs attention</TaskCardMeta>
                    </TaskCardContent>
                    <MissedBadge>Missed</MissedBadge>
                  </TaskCard>
                ))}
            </TaskListWrap>
          ) : (
            <EmptyBox>No missed tasks in this period. Great job!</EmptyBox>
          )}
        </DetailCard>
      </ContentGrid>
    </PageContainer>
  );
};

/* --- Styled Components --- */

const PageContainer = styled.main`
  --bg-card: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.04)" : "#ffffff")};
  --border-card: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0")};
  --border-subtle: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.05)" : "#f1f5f9")};
  --text-dark: ${({ theme }) => (theme.darkmode ? "#f8fafc" : "#0f172a")};
  --text-muted: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#475569")};
  --text-subtle: ${({ theme }) => (theme.darkmode ? "#cbd5e1" : "#64748b")};
  --card-hover: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.07)" : "#f8fafc")};

  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 12px 16px 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: "Poppins", sans-serif;

  @media (min-width: 1025px) {
    max-width: 820px;
    margin: 36px auto 80px;
    padding: 36px 40px 60px;
    background: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.04)" : "#ffffff")};
    border-radius: 20px;
    box-shadow: ${({ theme }) =>
      theme.darkmode ? "0 4px 32px rgba(0, 0, 0, 0.4)" : "0 4px 32px rgba(100, 110, 140, 0.12)"};
    border: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0")};
    position: relative;
  }
`;

const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
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
  font-size: 14px;
  font-weight: 600;
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
  padding: 4px 8px;
  border-radius: 6px;
  margin-left: auto;
  margin-right: 56px;
  transition: background 0.15s;
  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
  @media (max-width: 1024px) {
    margin-right: 52px;
  }
`;

const TitleSection = styled.div`
  margin-bottom: 16px;
`;

const PageTitle = styled.h1`
  font-size: clamp(26px, 5vw, 32px);
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

const AccentLine = styled.div<{ color: string }>`
  width: 100%;
  height: 2px;
  background-color: ${({ color }) => color || "#7851bf"};
  margin-bottom: 20px;
  border-radius: 1px;
`;

const ControlsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
`;

const ModePillGroup = styled.div`
  display: inline-flex;
  align-items: center;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 999px;
  padding: 4px;
  gap: 4px;
`;

const ModeTab = styled.button<{ active: boolean }>`
  border: none;
  background: ${({ active, theme }) => (active ? theme.primary : "transparent")};
  color: ${({ active }) => (active ? "#ffffff" : "var(--text-dark)")};
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ active, theme }) => (active ? `0 2px 8px ${theme.primary}40` : "none")};

  &:hover {
    color: ${({ active }) => (active ? "#ffffff" : "var(--text-dark)")};
    opacity: ${({ active }) => (active ? 1 : 0.8)};
  }
`;

const SelectWrapper = styled.div`
  min-width: 190px;
  flex: 1;
  max-width: 240px;

  @media (max-width: 600px) {
    max-width: 100%;
    min-width: 100%;
  }
`;

const HeroCard = styled.section`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 22px 24px;
  border-radius: 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  margin-bottom: 24px;
  transition: all 0.2s ease;

  @media (max-width: 580px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    padding: 18px;
  }
`;

const HeroStatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 110px;
  padding: 12px 16px;
  border-radius: 14px;
  background: ${({ theme }) =>
    theme.darkmode ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)"};
  border: 1px solid var(--border-card);
`;

const HeroPercentage = styled.div`
  font-size: clamp(34px, 5vw, 42px);
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
  line-height: 1;
  letter-spacing: -1px;
`;

const HeroBadge = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  margin-top: 6px;
`;

const HeroDetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

const HeroLabel = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeroCountText = styled.div`
  font-size: 13px;
  color: var(--text-subtle);
  margin-bottom: 10px;

  & strong {
    color: var(--text-dark);
  }
`;

const HeroProgressTrack = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0")};
  overflow: hidden;
  margin-bottom: 8px;
`;

const HeroProgressFill = styled.div<{ value: number; color: string }>`
  width: ${({ value }) => Math.min(Math.max(value, 0), 100)}%;
  height: 100%;
  border-radius: 999px;
  background: ${({ color }) => color};
  transition: width 0.4s ease;
`;

const HeroMotivationText = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.4fr);
  gap: 20px;
  min-width: 0;

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const RangeSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
`;

const SectionTitle = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
`;

const RangeListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RangeCard = styled.button<{ selected: boolean; primaryColor: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 14px;
  background: ${({ selected, primaryColor }) =>
    selected ? `${primaryColor}12` : "var(--bg-card)"};
  border: 1px solid
    ${({ selected, primaryColor }) => (selected ? primaryColor : "var(--border-card)")};
  color: inherit;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: ${({ selected, primaryColor }) =>
      selected ? `${primaryColor}1a` : "var(--card-hover)"};
    transform: translateY(-1px);
  }
`;

const RangeCardMeta = styled.div`
  min-width: 0;
  flex: 1;
`;

const RangeCardTitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--text-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RangeCardSub = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 11.5px;
  color: var(--text-muted);
  margin-top: 2px;
`;

const RangeCardStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 76px;
`;

const RangePercent = styled.span<{ selected: boolean; primaryColor: string }>`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: ${({ selected, primaryColor }) => (selected ? primaryColor : "var(--text-dark)")};
  margin-bottom: 4px;
`;

const RangeProgressBarTrack = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 999px;
  background: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0")};
  overflow: hidden;
`;

const RangeProgressBarFill = styled.div<{ value: number; color: string }>`
  width: ${({ value }) => Math.min(Math.max(value, 0), 100)}%;
  height: 100%;
  border-radius: 999px;
  background: ${({ color }) => color};
`;

const DetailCard = styled.section`
  display: flex;
  flex-direction: column;
  padding: 22px;
  border-radius: 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  min-width: 0;
`;

const DetailHeader = styled.div`
  margin-bottom: 14px;
`;

const DetailTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0 0 3px 0;
`;

const DetailSubtitle = styled.p`
  font-size: 12.5px;
  color: var(--text-muted);
  margin: 0;
`;

const DayStrip = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 12px;
  margin-bottom: 14px;
  border-bottom: 1px solid var(--border-card);

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => `${theme.primary}66 transparent`};
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `${theme.primary}66`};
    border-radius: 4px;
  }
`;

const DayButton = styled.button<{ selected: boolean; primaryColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 62px;
  padding: 8px 6px;
  border-radius: 12px;
  border: 1px solid
    ${({ selected, primaryColor }) => (selected ? primaryColor : "var(--border-card)")};
  background: ${({ selected, primaryColor }) => (selected ? primaryColor : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ selected, primaryColor }) => (selected ? primaryColor : "var(--card-hover)")};
  }
`;

const DayWeekday = styled.span<{ selected: boolean }>`
  font-family: "Poppins", sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ selected }) => (selected ? "#ffffff" : "var(--text-dark)")};
`;

const DayDateNumber = styled.span<{ selected: boolean }>`
  font-family: "Poppins", sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: ${({ selected }) => (selected ? "rgba(255, 255, 255, 0.8)" : "var(--text-muted)")};
  margin-bottom: 4px;
`;

const DayPercentageBadge = styled.span<{ selected: boolean; primaryColor: string }>`
  font-family: "Poppins", sans-serif;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
  background: ${({ selected, primaryColor }) =>
    selected ? "rgba(255, 255, 255, 0.25)" : `${primaryColor}15`};
  color: ${({ selected, primaryColor }) => (selected ? "#ffffff" : primaryColor)};
`;

const SectionSubhead = styled.div<{ marginTop?: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: ${({ marginTop }) => (marginTop ? `${marginTop} 0 10px` : "12px 0 10px")};
  font-size: 13.5px;
  font-weight: 700;
  color: var(--text-dark);
`;

const SubheadCountChip = styled(Chip)<{ colorStyle: "green" | "gray" }>`
  height: 20px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 6px;
  background-color: ${({ colorStyle }) =>
    colorStyle === "green" ? "rgba(34, 197, 94, 0.15)" : "rgba(148, 163, 184, 0.15)"};
  color: ${({ colorStyle }) => (colorStyle === "green" ? "#22c55e" : "#94a3b8")};
`;

const TaskListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TaskCard = styled.div<{ missed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  transition: all 0.15s ease;

  &:hover {
    background: var(--card-hover);
  }
`;

const TaskColorIndicator = styled.span<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  flex-shrink: 0;
`;

const TaskMissedDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid #94a3b8;
  flex-shrink: 0;
`;

const TaskCardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

const TaskCardName = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TaskCardMeta = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 11px;
  color: var(--text-muted);
`;

const CommentBubble = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  font-style: italic;
  color: var(--text-subtle);
  margin-top: 3px;
`;

const MissedBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
`;

const CompletionThumbnail = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
  cursor: pointer;
  border: 1px solid var(--border-card);
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const PhotoPlaceholder = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.04);
  color: var(--text-muted);
  flex-shrink: 0;
`;

const EmptyBox = styled.div`
  font-size: 12.5px;
  color: var(--text-muted);
  padding: 14px;
  text-align: center;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px dashed var(--border-card);
  margin: 4px 0 12px;
`;

const RecordsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RecordCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
`;

const RecordIndicator = styled.span<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
  flex-shrink: 0;
`;

const RecordInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const RecordTitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RecordTime = styled.div`
  font-size: 11.5px;
  color: var(--text-muted);
  margin-top: 1px;
`;

const RecordComment = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-style: italic;
  color: var(--text-subtle);
  margin-top: 4px;
`;

const EmptyStateText = styled.p`
  color: var(--text-muted);
  text-align: center;
  padding: 20px 0;
  font-size: 13.5px;
`;

export default Performance;
