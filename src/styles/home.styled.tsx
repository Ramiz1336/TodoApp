import styled from "@emotion/styled";
import { fadeIn, pulseAnimation, scale } from "./keyframes.styled";
import { Button, css, IconButton } from "@mui/material";
import { getFontColor } from "../utils";
import { reduceMotion } from ".";

/* --- Tracked & Mockup Matched Home Styling --- */

export const HomeContainer = styled.main`
  --bg-grid: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.05)" : "#ffffff")};
  --border-grid: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.12)" : "#cbd5e1")};
  --border-divider: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0")};
  --text-dark: ${({ theme }) => (theme.darkmode ? "#f8fafc" : "#0f172a")};
  --text-muted: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#475569")};
  --text-subtle: ${({ theme }) => (theme.darkmode ? "#cbd5e1" : "#64748b")};

  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 12px 16px 36px;
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

export const HomeTopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
`;

export const HomeMenuBtn = styled.button`
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

export const HomeDateDisplay = styled.div`
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
    background: rgba(0, 0, 0, 0.05);
  }
  @media (max-width: 1024px) {
    margin-right: 52px;
  }
`;

export const HomeTitleSection = styled.div`
  margin-bottom: 8px;
`;

export const HomePageTitle = styled.h1`
  font-size: clamp(28px, 6vw, 36px);
  font-weight: 800;
  color: var(--text-dark);
  letter-spacing: -0.5px;
  margin: 0 0 4px 0;
  line-height: 1.15;
`;

export const HomePageSubtitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: var(--text-subtle);
  margin: 0;
  line-height: 1.4;
`;

export const HomeAccentLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.primary || "#7851bf"};
  margin-top: 12px;
  margin-bottom: 22px;
`;

/* Exact Mockup Today's Progress Bar */
export const ProgressSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
`;

export const ProgressHeaderRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-right: 28px;
`;

export const ProgressTitle = styled.h2`
  font-size: 17px;
  font-weight: 800;
  color: var(--text-dark);
  margin: 0;
`;

export const ProgressCountText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.12)" : "#dce3ed")};
  border-radius: 999px;
  overflow: hidden;
  position: relative;
  margin-bottom: 8px;
`;

export const ProgressBarFill = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${({ percentage }) => (percentage > 0 ? Math.min(Math.max(percentage, 0), 100) : 0)}%;
  background-color: ${({ theme }) => theme.primary || "#7851bf"};
  border-radius: 999px;
  transition: width 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: ${({ percentage }) => (percentage > 10 ? "10px" : "0")};
  box-sizing: border-box;
  font-size: 11.5px;
  font-weight: 700;
  color: #ffffff;
  opacity: ${({ percentage }) => (percentage > 0 ? 1 : 0)};
`;

export const ProgressSubtitle = styled.p`
  font-size: 13.5px;
  font-style: italic;
  color: var(--text-muted);
  margin: 0;
`;

export const ProgressCloseBtn = styled(IconButton)`
  position: absolute;
  top: -4px;
  right: 0px;
  opacity: 0.45;
  padding: 4px;
  color: var(--text-muted);
  &:hover {
    opacity: 1;
  }
`;

/* Backward compatible placeholders */
export const TasksCountContainer = styled.div`
  width: 100%;
`;
export const TasksCount = styled.div<{ glow: boolean }>`
  width: 100%;
`;
export const TaskCountClose = styled(IconButton)``;
export const TaskCountTextContainer = styled.div``;
export const TaskCountHeader = styled.h4``;
export const TaskCompletionText = styled.p``;
export const ProgressPercentageContainer = styled.div``;
export const StyledProgress = styled.div``;
export const GreetingHeader = styled.div``;

export const AddButton = styled(Button)<{ animate?: boolean; glow: boolean }>`
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 24px;
  width: 72px;
  height: 72px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => getFontColor(theme.primary)};
  right: 24px;
  box-shadow: ${({ glow, theme }) => (glow ? `0px 0px 32px -8px ${theme.primary}` : "none")};
  transition:
    background-color 0.3s,
    backdrop-filter 0.3s,
    box-shadow 0.3s;

  &:hover {
    box-shadow: none;
    background-color: ${({ theme }) => theme.primary};
    backdrop-filter: blur(6px);
  }

  animation: ${scale} 0.5s;
  ${({ animate, theme }) =>
    animate &&
    css`
      animation: ${pulseAnimation(theme.primary, 14)} 1.2s infinite;
    `}

  ${({ theme }) => reduceMotion(theme)}

  @media (min-width: 1025px) {
    bottom: 36px;
    right: calc((100vw - 620px) / 2 + 24px);
  }

  @media print {
    display: none;
  }
`;

export const Offline = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  text-shadow: 0 0 8px #ffffff56;
  margin-top: 10px;
  margin-bottom: 10px;
  opacity: 0.8;
  animation: ${fadeIn} 0.5s ease;
`;
