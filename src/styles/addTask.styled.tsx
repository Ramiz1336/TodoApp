import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";

export const AddTaskContainer = styled.main`
  --bg-grid: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.05)" : "#ffffff")};
  --border-grid: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.12)" : "#cbd5e1")};
  --border-divider: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0")};
  --text-dark: ${({ theme }) => (theme.darkmode ? "#f8fafc" : "#0f172a")};
  --text-muted: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#475569")};
  --text-subtle: ${({ theme }) => (theme.darkmode ? "#cbd5e1" : "#64748b")};

  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 12px 16px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: "Poppins", sans-serif;

  @media (min-width: 1025px) {
    max-width: 620px;
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

export const Container = AddTaskContainer;

export const AddTaskTopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
`;

export const AddTaskBackBtn = styled.button`
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

export const AddTaskDateDisplay = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-left: auto;
  margin-right: 56px;
  @media (max-width: 1024px) {
    margin-right: 52px;
  }
`;

export const AddTaskTitleSection = styled.div`
  margin-bottom: 8px;
`;

export const AddTaskPageTitle = styled.h1`
  font-size: clamp(28px, 6vw, 36px);
  font-weight: 800;
  color: var(--text-dark);
  letter-spacing: -0.5px;
  margin: 0 0 4px 0;
  line-height: 1.15;
`;

export const AddTaskPageSubtitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: var(--text-subtle);
  margin: 0;
  line-height: 1.4;
`;

export const AddTaskAccentLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.primary || "#7851bf"};
  margin-top: 12px;
  margin-bottom: 20px;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  box-sizing: border-box;
`;

/* Unified Recurrence Card */
export const RecurringCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) =>
    theme.darkmode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.02)"};
  border: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0")};
  overflow: hidden;
  transition: all 0.25s ease;
`;

export const RecurringHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;

  & .MuiFormControlLabel-root {
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-left: 0;
    margin-right: 0;
  }

  & .MuiTypography-root {
    font-size: 14.5px;
    font-weight: 600;
    color: var(--text-dark);
    font-family: "Poppins", sans-serif;
  }
`;

export const RecurringBody = styled.div`
  padding: 14px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.06)" : "#edf2f7")};
`;

export const TrackedSubRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 12px;
  background-color: ${({ theme }) =>
    theme.darkmode ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)"};
  border: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.06)" : "#edf2f7")};

  & .MuiFormControlLabel-root {
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-left: 0;
    margin-right: 0;
  }

  & .MuiTypography-root {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--text-dark);
    font-family: "Poppins", sans-serif;
  }
`;

export const SwitchCardRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-radius: 14px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) =>
    theme.darkmode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.02)"};
  border: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0")};

  & .MuiFormControlLabel-root {
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-left: 0;
    margin-right: 0;
  }

  & .MuiTypography-root {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-dark);
    font-family: "Poppins", sans-serif;
  }
`;

export const StyledInput = styled(TextField)<{ helpercolor?: string; hidetext?: boolean }>`
  margin: 0;
  width: 100%;

  & .MuiOutlinedInput-root {
    border-radius: 14px;
    transition: 0.2s all ease;
    width: 100%;
    background-color: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.05)" : "#ffffff")};
    color: ${({ theme, hidetext }) =>
      hidetext ? "transparent" : theme.darkmode ? "#f8fafc" : "#0f172a"};

    & .MuiOutlinedInput-notchedOutline {
      border: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.12)" : "#cbd5e1")} !important;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.primary || "#7851bf"} !important;
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 1.5px solid ${({ theme }) => theme.primary || "#7851bf"} !important;
      box-shadow: 0 0 0 3px ${({ theme }) => (theme.primary || "#7851bf") + "25"};
    }
  }

  .MuiInputLabel-root {
    color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#64748b")};
    &.Mui-focused {
      color: ${({ theme }) => theme.primary || "#7851bf"};
    }
  }

  .MuiFormHelperText-root {
    color: ${({ helpercolor, theme }) => helpercolor || (theme.darkmode ? "#94a3b8" : "#64748b")};
    opacity: 0.85;
    font-size: 11px;
    margin-left: 4px;
  }
`;

export const AddTaskButton = styled(Button)`
  margin-top: 8px;
  border: none;
  padding: 14px 24px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.primary || "#7851bf"};
  color: #ffffff;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  width: 100%;
  text-transform: none;
  letter-spacing: 0.3px;
  box-shadow: 0 4px 14px ${({ theme }) => (theme.primary || "#7851bf") + "40"};

  &:hover {
    background-color: ${({ theme }) => theme.primary || "#7851bf"};
    box-shadow: 0 6px 20px ${({ theme }) => (theme.primary || "#7851bf") + "60"};
    transform: translateY(-1px);
  }

  &:disabled {
    box-shadow: none;
    cursor: not-allowed;
    opacity: 0.5;
    background-color: ${({ theme }) => (theme.darkmode ? "#334155" : "#cbd5e1")};
    color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#64748b")};
  }
`;

export const EmojiPickerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
`;
