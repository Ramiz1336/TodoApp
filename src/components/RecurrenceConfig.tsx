import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { RepeatRounded } from "@mui/icons-material";
import {
  Box,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Task } from "../types/user";
import { getAppNow, localDateKey } from "../utils/testingDate";

type RecurrenceFrequency = "daily" | "weekly" | "monthly";

interface RecurrenceConfigProps {
  task: Partial<Pick<Task, "recurrence" | "recurrenceDays" | "recurrenceCount">>;
  onChange: (
    patch: Partial<
      Pick<Task, "recurrence" | "recurrenceDays" | "recurrenceCount" | "lastResetDate" | "deadline">
    >,
  ) => void;
  fontColor?: string;
}

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getLocalDate = () => {
  const now = getAppNow();
  return localDateKey(now);
};

export const RecurrenceConfig = ({ task, onChange }: RecurrenceConfigProps) => {
  const theme = useTheme();
  const { recurrence, recurrenceDays = [], recurrenceCount = 1 } = task;

  const handleFrequencyChange = (freq: RecurrenceFrequency) => {
    const now = getAppNow();
    onChange({
      recurrence: freq,
      recurrenceDays: freq === "weekly" ? [now.getDay()] : [],
      recurrenceCount: freq === "weekly" || freq === "monthly" ? 1 : undefined,
      lastResetDate: getLocalDate(),
      deadline: undefined,
    });
  };

  const toggleDay = (day: number) => {
    const next = recurrenceDays.includes(day)
      ? recurrenceDays.filter((d) => d !== day)
      : [...recurrenceDays, day].sort((a, b) => a - b);
    onChange({ recurrenceDays: next });
  };

  return (
    <RecurrenceWrapper>
      {/* Frequency selector styled as pill tabs */}
      <Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            color: "var(--text-muted)",
            fontSize: "12px",
            mb: 0.8,
            display: "block",
            letterSpacing: "0.2px",
          }}
        >
          FREQUENCY
        </Typography>
        <ToggleButtonGroup
          value={recurrence ?? "daily"}
          exclusive
          onChange={(_, val) => val && handleFrequencyChange(val as RecurrenceFrequency)}
          size="small"
          fullWidth
          sx={{
            gap: "8px",
            "& .MuiToggleButtonGroup-grouped": {
              border: "1.5px solid var(--border-grid) !important",
              borderRadius: "999px !important",
              textTransform: "capitalize",
              fontWeight: 600,
              fontSize: "13px",
              py: 0.7,
              color: "var(--text-dark)",
              "&.Mui-selected": {
                backgroundColor: `${theme.primary || "#7851bf"} !important`,
                borderColor: `${theme.primary || "#7851bf"} !important`,
                color: "#ffffff !important",
              },
            },
          }}
        >
          {(["daily", "weekly", "monthly"] as RecurrenceFrequency[]).map((f) => (
            <ToggleButton key={f} value={f}>
              {f}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Daily and weekly: 7-column weekday picker matching Tracked calendar grid */}
      {(recurrence === "daily" || recurrence === "weekly") && (
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: "var(--text-muted)",
              fontSize: "12px",
              mb: 0.8,
              display: "block",
              letterSpacing: "0.2px",
            }}
          >
            {recurrence === "daily" ? "SPECIFIC DAYS (OPTIONAL)" : "DAYS OF THE WEEK"}
          </Typography>
          <WeekdayGrid>
            {WEEK_DAYS.map((label, idx) => {
              const isSelected = recurrenceDays.includes(idx);
              return (
                <DayButton
                  key={idx}
                  selected={isSelected}
                  onClick={() => toggleDay(idx)}
                  type="button"
                >
                  {label}
                </DayButton>
              );
            })}
          </WeekdayGrid>
        </Box>
      )}

      {/* Target count for weekly */}
      {recurrence === "weekly" && (
        <Box>
          <TextField
            select
            fullWidth
            label="Completions per week"
            size="small"
            value={recurrenceCount}
            onChange={(event) => onChange({ recurrenceCount: Number(event.target.value) })}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          >
            {Array.from({ length: 12 }, (_, index) => index + 1).map((count) => (
              <MenuItem key={count} value={count}>
                {countLabel(count)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}

      {/* Target count for monthly */}
      {recurrence === "monthly" && (
        <Box>
          <TextField
            select
            fullWidth
            label="Completions per month"
            size="small"
            value={recurrenceCount}
            onChange={(event) => onChange({ recurrenceCount: Number(event.target.value) })}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          >
            {Array.from({ length: 12 }, (_, index) => index + 1).map((count) => (
              <MenuItem key={count} value={count}>
                {countLabel(count)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}

      {/* Summary badge */}
      {recurrence && (
        <SummaryBadge>
          <RepeatRounded sx={{ fontSize: 16, opacity: 0.8 }} />
          <span>{recurrenceSummary(recurrence, recurrenceDays, recurrenceCount)}</span>
        </SummaryBadge>
      )}
    </RecurrenceWrapper>
  );
};

export const recurrenceSummary = (
  recurrence: "daily" | "weekly" | "monthly",
  days: number[] = [],
  count = 1,
): string => {
  if (recurrence === "daily") {
    if (days.length === 0) return "Repeats every day";
    const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return `Repeats every ${days
      .map((d) => names[d] ?? "")
      .filter(Boolean)
      .join(", ")}`;
  }
  if (recurrence === "weekly") {
    return days.length === 0
      ? "Choose days for the week"
      : `${countLabel(count)} a week on ${days.map((day) => WEEK_DAYS[day]).join(", ")}`;
  }
  if (recurrence === "monthly") {
    return `${countLabel(count)} a month`;
  }
  return "";
};

const countLabel = (count: number): string => {
  if (count === 1) return "Once";
  if (count === 2) return "Twice";
  return `${count} times`;
};

const RecurrenceWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const WeekdayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 6px;
  width: 100%;
  box-sizing: border-box;
`;

const DayButton = styled.button<{ selected: boolean }>`
  border: 1px solid
    ${({ selected, theme }) =>
      selected
        ? theme.primary || "#7851bf"
        : theme.darkmode
          ? "rgba(255,255,255,0.12)"
          : "#cbd5e1"};
  background-color: ${({ selected, theme }) =>
    selected ? theme.primary || "#7851bf" : theme.darkmode ? "rgba(255,255,255,0.05)" : "#ffffff"};
  color: ${({ selected, theme }) =>
    selected ? "#ffffff" : theme.darkmode ? "#f8fafc" : "#17243a"};
  border-radius: 10px;
  height: 36px;
  font-family: "Poppins", sans-serif;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ selected, theme }) =>
      selected ? theme.primary || "#7851bf" : "rgba(120, 81, 191, 0.1)"};
  }

  @media (max-width: 360px) {
    font-size: 10px;
    height: 32px;
  }
`;

const SummaryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 10px;
  background-color: ${({ theme }) =>
    theme.darkmode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)"};
  color: var(--text-dark);
  font-size: 12.5px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
`;
