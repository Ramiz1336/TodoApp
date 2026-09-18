import styled from "@emotion/styled";
import { Alarm, RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import { Checkbox, IconButton, TextField, css } from "@mui/material";
import { ring, scale } from "../../styles/keyframes.styled";
import { reduceMotion } from "../../styles/reduceMotion.styled";

interface TaskComponentProps {
  backgroundColor: string;
  done: boolean;
  glow?: boolean;
  blur?: boolean;
  isDragging?: boolean;
}

/* Exact Card match to mockup: White rounded container, subtle border, left color dot */
export const TaskContainer = styled.div<TaskComponentProps>`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-radius: 16px;
  margin-top: 10px;
  background-color: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.05)" : "#ffffff")};
  color: ${({ theme }) => (theme.darkmode ? "#f8fafc" : "#0f172a")};
  border: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.12)" : "#cbd5e1")};
  box-shadow: ${({ theme }) =>
    theme.darkmode ? "0 2px 10px rgba(0,0,0,0.2)" : "0 2px 6px rgba(15, 23, 42, 0.04)"};
  opacity: ${({ done }) => (done ? 0.8 : 1)};
  transition: all 0.2s ease;
  filter: ${({ blur }) => (blur ? "blur(2px) opacity(75%)" : "none")};
  position: relative;
  box-sizing: border-box;

  &:hover {
    box-shadow: ${({ theme }) =>
      theme.darkmode ? "0 4px 14px rgba(0,0,0,0.3)" : "0 4px 12px rgba(15, 23, 42, 0.08)"};
  }

  ${({ theme }) => reduceMotion(theme)}

  @media (max-width: 768px) {
    padding: 12px 14px;
    margin-top: 8px;
  }
`;

/* Colored indicator dot as seen in mockup */
export const TaskColorIndicator = styled.span<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color || "#7851bf"};
  margin-right: 12px;
  flex-shrink: 0;
`;

/* Circular emoji container with matching soft translucent background */
export const EmojiContainer = styled.span<{ clr: string }>`
  text-decoration: none;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ clr, theme }) =>
    clr ? `${clr}22` : theme.darkmode ? "rgba(255,255,255,0.08)" : "#f1f5f9"};
  font-size: 22px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`;

export const TaskCategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 6px;
  justify-content: left;
  align-items: center;
`;

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

export const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const TaskName = styled.h3<{ done: boolean }>`
  font-size: 15.5px;
  font-weight: 700;
  color: ${({ theme }) => (theme.darkmode ? "#f8fafc" : "#0f172a")};
  margin: 0;
  word-break: break-word;
  white-space: pre-line;
  line-height: 1.3;
`;

export const TaskDate = styled.p`
  margin: 0 6px;
  text-align: right;
  margin-left: auto;
  font-size: 12px;
  font-style: italic;
  font-weight: 400;
  color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#596987")};
`;

export const TaskDescription = styled.div<{ done: boolean }>`
  margin: 2px 0 0 0;
  font-size: 13px;
  color: ${({ theme }) => (theme.darkmode ? "#cbd5e1" : "#64748b")};
  text-decoration: ${({ done }) => (done ? "line-through" : "none")};
  word-break: break-word;
`;

export const NoTasks = styled.div`
  text-align: center;
  margin-top: 40px;
  opacity: 0.85;
  font-size: 16px;
  color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#596987")};
  & span {
    font-weight: bold;
    color: ${({ theme }) => theme.primary};
  }
`;

export const TaskNotFound = styled.div`
  text-align: center;
  font-size: 16px;
  opacity: 0.9;
  margin-top: 24px;
  color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#596987")};
`;

export const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Pinned = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  font-weight: 600;
  color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#475569")};
`;

export const RecurrencePill = styled.span<{ clr?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 9px;
  border-radius: 999px;
  background-color: ${({ clr, theme }) => clr || theme.primary || "#7851bf"};
  color: #ffffff;
  text-transform: capitalize;
`;

export const DueDatePill = styled.span<{ isUrgent?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 9px;
  border-radius: 999px;
  background-color: ${({ isUrgent, theme }) =>
    isUrgent ? "#dc2626" : theme.darkmode ? "rgba(255,255,255,0.1)" : "#e2e8f0"};
  color: ${({ isUrgent, theme }) =>
    isUrgent ? "#ffffff" : theme.darkmode ? "#f8fafc" : "#334155"};
`;

export const TaskMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 8px;
  margin-top: 5px;
`;

export const TimeLeft = styled.span<{ done: boolean }>`
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#64748b")};
  cursor: pointer;
`;

export const SharedByContainer = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#64748b")};
  margin-top: 2px;
`;

export const DragHandle = styled.div`
  cursor: grab;
  display: flex;
  align-items: center;
  touch-action: none;
  color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#64748b")};
`;

export const TaskActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-radius: 12px;
  margin-bottom: 12px;
  background: ${({ theme }) => (theme.darkmode ? "rgba(255,255,255,0.06)" : "#f1f5f9")};
  border: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255,255,255,0.12)" : "#cbd5e1")};
`;

const radioIconStyles = css`
  color: inherit;
  font-size: 22px;
`;

export const StyledRadio = styled(Checkbox)<{ clr: string }>`
  margin-left: -4px;
  margin-right: 4px;
  color: ${({ clr, theme }) => clr || theme.primary} !important;
  &.Mui-checked {
    color: ${({ clr, theme }) => clr || theme.primary} !important;
  }
  ${({ theme }) => reduceMotion(theme)}
`;

export const RadioChecked = styled(RadioButtonChecked)`
  ${radioIconStyles}
  animation: ${scale} 0.2s ease;
`;

export const RadioUnchecked = styled(RadioButtonUnchecked)`
  ${radioIconStyles}
  ${({ theme }) => reduceMotion(theme)}
`;

/* Exact Mockup Completion Indicator (PENDING / DONE badge and checkbox) */
export const MockupStatusWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  padding: 4px 6px;
  border-radius: 8px;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => (theme.darkmode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)")};
  }
`;

export const MockupStatusLabel = styled.span<{ done: boolean }>`
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${({ done, theme }) =>
    done ? theme.primary || "#7851bf" : theme.darkmode ? "#94a3b8" : "#1e293b"};
`;

export const MockupCheckbox = styled.div<{ done: boolean; color?: string }>`
  width: 22px;
  height: 22px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ done, color, theme }) =>
    done ? color || theme.primary || "#7851bf" : "transparent"};
  border: 1.5px solid
    ${({ done, color, theme }) =>
      done ? color || theme.primary || "#7851bf" : theme.darkmode ? "#64748b" : "#475569"};
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s;
  box-sizing: border-box;
  &:hover {
    transform: scale(1.06);
  }
`;

export const CategoriesListContainer = styled.div`
  position: sticky;
  background: transparent;
  backdrop-filter: blur(24px);
  z-index: 2;
  top: 0;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  padding: 4px 0 12px 0;
  margin: 4px 0 14px 0;

  /* Hide scrollbar for a clean chip row look */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media print {
    display: none;
  }
`;

export const HighlightedText = styled.span`
  background-color: #6829ef;
  color: #fff;
  padding: 1px 3px;
  border-radius: 4px;
  font-weight: bold;
`;

export const SearchInput = styled(TextField)`
  border-radius: 999px;
  transition: 0.3s all;
  width: 100%;

  & .MuiOutlinedInput-root {
    padding: 2px 16px;
    border-radius: 999px;
    transition: 0.3s all;
    background: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0")};
    color: ${({ theme }) => (theme.darkmode ? "#f8fafc" : "#0f172a")};

    & .MuiSvgIcon-root {
      color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#64748b")};
    }

    &.Mui-focused {
      background: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.12)" : "#e2e8f0")};
      box-shadow: 0 0 0 2px rgba(120, 81, 191, 0.25);
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }

  @media print {
    display: none;
  }
`;

export const SearchClear = styled(IconButton)`
  animation: ${scale} 0.3s ease;
`;

const ringAnimation = "2s 0.5s ease-in-out infinite";

export const RingAlarm = styled(Alarm)<{ animate?: boolean }>`
  color: #ef4444;
  font-size: 15px;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${ring} ${ringAnimation};
    `}
  ${({ theme }) => reduceMotion(theme)}
`;

export const TaskActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 8px;
  flex-shrink: 0;
  @media print {
    display: none;
  }
`;

export const RecurrenceProgress = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 600;
  opacity: 0.85;
  color: ${({ theme }) => (theme.darkmode ? "#cbd5e1" : "#64748b")};
`;

export const TaskSideMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;
