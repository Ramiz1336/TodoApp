import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowBackRounded,
  AutoAwesomeRounded,
  CheckRounded,
  ContentCopyRounded,
  DownloadRounded,
  ExpandMoreRounded,
  InsertDriveFileRounded,
  QueryStatsRounded,
  ChatBubbleOutlineRounded,
  CheckCircleRounded,
  RadioButtonUncheckedRounded,
  EventRepeatRounded,
} from "@mui/icons-material";
import { Chip, FormControl, MenuItem, Popover, Select } from "@mui/material";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { UserContext } from "../contexts/UserContext";
import { getAppNow } from "../utils/testingDate";
import { showToast } from "../utils";
import { TestingDateControl } from "../components/TestingDateControl";
import {
  computeReportStats,
  generateAIReport,
  getAvailableReportMonths,
} from "../utils/exportReport";

const formatHeaderDate = (d: Date): string => {
  const dayName = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const dayNum = d.getDate();
  const monthName = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const year = d.getFullYear();
  return `${dayName}  /  ${dayNum}  ${monthName}  ${year}`;
};

const Export = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const now = getAppNow();

  const [testDateAnchor, setTestDateAnchor] = useState<HTMLElement | null>(null);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  const availableMonths = useMemo(() => getAvailableReportMonths(user, now), [user, now]);
  const defaultMonth = availableMonths[0]?.key || "all";
  const [selectedMonth, setSelectedMonth] = useState<string>(defaultMonth);

  const stats = useMemo(
    () => computeReportStats(user, selectedMonth, now),
    [user, selectedMonth, now],
  );

  const generatedReport = useMemo(
    () => generateAIReport(user, selectedMonth, now),
    [user, selectedMonth, now],
  );

  const monthLabel = useMemo(() => {
    if (selectedMonth === "all") return "All History";
    const found = availableMonths.find((m) => m.key === selectedMonth);
    return found ? found.label : selectedMonth;
  }, [selectedMonth, availableMonths]);

  const handleCopyReport = async () => {
    try {
      await navigator.clipboard.writeText(generatedReport);
      setCopiedReport(true);
      showToast("Report copied to clipboard! Ready to paste into your AI.", { type: "success" });
      setTimeout(() => setCopiedReport(false), 3000);
    } catch {
      showToast("Failed to copy to clipboard.", { type: "error" });
    }
  };

  const handleCopyPromptOnly = async () => {
    const promptText = `Act as an expert executive productivity coach and behavioral psychologist. Below is my actual task execution, habit, and reflection report for ${monthLabel}.
Please perform a deep-dive analysis of my performance and tell me:
1. WHERE & WHEN AM I DROPPING OFF? Identify the specific days of the week, times, or cycles where missed tasks cluster.
2. ROOT CAUSE ANALYSIS: Correlate my missed tasks with the reflections/comments I logged. What cognitive or logistical friction is causing me to miss tasks?
3. HABIT STRENGTH: Assess the resilience of my daily habits and suggest how to protect my streaks.
4. CONCRETE ACTION PLAN: Give me 3 high-impact, realistic system changes I should adopt next month to boost my completion rate and eliminate recurring bottlenecks.`;

    try {
      await navigator.clipboard.writeText(promptText);
      setCopiedPrompt(true);
      showToast("AI prompt copied to clipboard!", { type: "success" });
      setTimeout(() => setCopiedPrompt(false), 3000);
    } catch {
      showToast("Failed to copy prompt.", { type: "error" });
    }
  };

  const handleDownloadFile = (format: "txt" | "md") => {
    const filename = `productivity-report-${selectedMonth}.${format}`;
    const blob = new Blob([generatedReport], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`, { type: "success" });
  };

  return (
    <PageContainer>
      {/* Top Bar Navigation & Test Date */}
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

      {/* Header */}
      <TitleSection>
        <PageTitleWrap>
          <PageTitle>Export AI Report</PageTitle>
          <AiBadge>
            <AutoAwesomeRounded sx={{ fontSize: 14 }} />
            AI Ready
          </AiBadge>
        </PageTitleWrap>
        <PageSubtitle>
          Export comprehensive monthly logs, daily habits, reflections, and missed tasks formatted
          specifically to feed into an AI coach.
        </PageSubtitle>
      </TitleSection>

      <AccentLine color={theme.primary} />

      {/* Controls Bar */}
      <ControlsCard>
        <MonthSelectGroup>
          <MonthLabel>Report Period:</MonthLabel>
          <FormControl size="small" sx={{ minWidth: 200, flex: 1 }}>
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              IconComponent={ExpandMoreRounded}
              sx={{
                borderRadius: "12px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "13.5px",
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
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: "14px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    border: "1px solid var(--border-card)",
                    backgroundColor: "var(--bg-card)",
                    backdropFilter: "blur(12px)",
                  },
                },
              }}
            >
              {availableMonths.map((m, idx) => (
                <MenuItem
                  key={m.key}
                  value={m.key}
                  sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", py: 1 }}
                >
                  {idx === 0 ? `Current · ${m.label}` : m.label}
                </MenuItem>
              ))}
              <MenuItem
                value="all"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "13px",
                  py: 1,
                  borderTop: "1px solid var(--border-card)",
                }}
              >
                All Recorded History
              </MenuItem>
            </Select>
          </FormControl>
        </MonthSelectGroup>
      </ControlsCard>

      {/* Stats Summary Grid */}
      <MetricsGrid>
        <MetricCard>
          <MetricIconWrap color={theme.primary}>
            <QueryStatsRounded sx={{ fontSize: 20 }} />
          </MetricIconWrap>
          <MetricInfo>
            <MetricValue color={theme.primary}>{stats.completionRate}%</MetricValue>
            <MetricLabel>Completion Rate</MetricLabel>
          </MetricInfo>
        </MetricCard>

        <MetricCard>
          <MetricIconWrap color="#22c55e">
            <CheckCircleRounded sx={{ fontSize: 20 }} />
          </MetricIconWrap>
          <MetricInfo>
            <MetricValue>{stats.totalCompleted}</MetricValue>
            <MetricLabel>Completed Tasks</MetricLabel>
          </MetricInfo>
        </MetricCard>

        <MetricCard>
          <MetricIconWrap color="#ef4444">
            <RadioButtonUncheckedRounded sx={{ fontSize: 20 }} />
          </MetricIconWrap>
          <MetricInfo>
            <MetricValue>{stats.totalMissed}</MetricValue>
            <MetricLabel>Missed Tasks</MetricLabel>
          </MetricInfo>
        </MetricCard>

        <MetricCard>
          <MetricIconWrap color="#3b82f6">
            <EventRepeatRounded sx={{ fontSize: 20 }} />
          </MetricIconWrap>
          <MetricInfo>
            <MetricValue>{stats.habitCount}</MetricValue>
            <MetricLabel>Daily Habits</MetricLabel>
          </MetricInfo>
        </MetricCard>

        <MetricCard>
          <MetricIconWrap color="#eab308">
            <ChatBubbleOutlineRounded sx={{ fontSize: 20 }} />
          </MetricIconWrap>
          <MetricInfo>
            <MetricValue>{stats.commentsCount}</MetricValue>
            <MetricLabel>Reflections Logged</MetricLabel>
          </MetricInfo>
        </MetricCard>
      </MetricsGrid>

      {/* Action Toolbar */}
      <ActionToolbar>
        <PrimaryButton
          onClick={handleCopyReport}
          primaryColor={theme.primary}
          copied={copiedReport}
        >
          {copiedReport ? (
            <>
              <CheckRounded sx={{ fontSize: 18 }} />
              <span>Copied Report!</span>
            </>
          ) : (
            <>
              <ContentCopyRounded sx={{ fontSize: 18 }} />
              <span>Copy Full Report</span>
            </>
          )}
        </PrimaryButton>

        <SecondaryButton onClick={() => handleDownloadFile("txt")}>
          <DownloadRounded sx={{ fontSize: 18 }} />
          <span>Download .txt</span>
        </SecondaryButton>

        <SecondaryButton onClick={() => handleDownloadFile("md")}>
          <InsertDriveFileRounded sx={{ fontSize: 18 }} />
          <span>Download .md</span>
        </SecondaryButton>
      </ActionToolbar>

      {/* AI Coach Guidance Card */}
      <AiGuideCard>
        <AiGuideHeader>
          <AutoAwesomeRounded sx={{ color: theme.primary, fontSize: 22 }} />
          <AiGuideTitle>How to use this with your AI assistant</AiGuideTitle>
        </AiGuideHeader>
        <AiGuideBody>
          Copy the report above and paste it directly into <strong>ChatGPT</strong>,{" "}
          <strong>Claude</strong>, or <strong>Gemini</strong>. The structured report already
          includes weekly trends, completion timings, missed patterns, user reflection quotes, and a
          built-in diagnostic prompt instructing the AI on how to uncover your productivity
          bottlenecks.
        </AiGuideBody>
        <AiGuideFooter>
          <PromptCopyBtn onClick={handleCopyPromptOnly}>
            {copiedPrompt ? (
              <>
                <CheckRounded sx={{ fontSize: 16 }} />
                <span>Prompt Copied!</span>
              </>
            ) : (
              <>
                <ContentCopyRounded sx={{ fontSize: 16 }} />
                <span>Copy AI Analysis Prompt Only</span>
              </>
            )}
          </PromptCopyBtn>
        </AiGuideFooter>
      </AiGuideCard>

      {/* Live Preview Box */}
      <PreviewSection>
        <PreviewHeader>
          <PreviewTitleWrap>
            <InsertDriveFileRounded sx={{ fontSize: 18, color: "var(--text-muted)" }} />
            <PreviewTitle>
              Report Preview ({selectedMonth === "all" ? "All History" : selectedMonth})
            </PreviewTitle>
          </PreviewTitleWrap>
          <Chip
            label={`${generatedReport.split("\n").length} lines · ${(new Blob([generatedReport]).size / 1024).toFixed(1)} KB`}
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
        </PreviewHeader>

        <PreviewBox>
          <pre>{generatedReport}</pre>
        </PreviewBox>
      </PreviewSection>
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

const PageTitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
  flex-wrap: wrap;
`;

const PageTitle = styled.h1`
  font-size: clamp(26px, 5vw, 32px);
  font-weight: 800;
  color: var(--text-dark);
  letter-spacing: -0.5px;
  margin: 0;
  line-height: 1.15;
`;

const AiBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, #7851bf 0%, #ec4899 100%);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(120, 81, 191, 0.3);
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

const ControlsCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  border-radius: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const MonthSelectGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 260px;
`;

const MonthLabel = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-dark);
  white-space: nowrap;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
  margin-bottom: 22px;
`;

const MetricCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
`;

const MetricIconWrap = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${({ color }) => `${color}18`};
  color: ${({ color }) => color};
  flex-shrink: 0;
`;

const MetricInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const MetricValue = styled.div<{ color?: string }>`
  font-size: 17px;
  font-weight: 800;
  color: ${({ color, theme }) => color || (theme.darkmode ? "#f8fafc" : "#0f172a")};
  line-height: 1.2;
`;

const MetricLabel = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActionToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button<{ primaryColor: string; copied: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  background: ${({ primaryColor, copied }) => (copied ? "#16a34a" : primaryColor)};
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px ${({ primaryColor }) => `${primaryColor}40`};

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 12px;
  border: 1px solid var(--border-card);
  background: var(--bg-card);
  color: var(--text-dark);
  font-family: "Poppins", sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--card-hover);
    border-color: var(--text-muted);
    transform: translateY(-1px);
  }
`;

const AiGuideCard = styled.section`
  padding: 18px 20px;
  border-radius: 16px;
  background: ${({ theme }) =>
    theme.darkmode ? "rgba(120, 81, 191, 0.08)" : "rgba(120, 81, 191, 0.04)"};
  border: 1px solid ${({ theme }) => `${theme.primary}30`};
  margin-bottom: 24px;
`;

const AiGuideHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const AiGuideTitle = styled.h3`
  font-size: 14.5px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
`;

const AiGuideBody = styled.p`
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--text-subtle);
  margin: 0 0 12px 0;

  & strong {
    color: var(--text-dark);
  }
`;

const AiGuideFooter = styled.div`
  display: flex;
  align-items: center;
`;

const PromptCopyBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid var(--border-card);
  background: var(--bg-card);
  color: var(--text-dark);
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--card-hover);
  }
`;

const PreviewSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PreviewTitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PreviewTitle = styled.h2`
  font-size: 14.5px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
`;

const PreviewBox = styled.div`
  border-radius: 14px;
  background: ${({ theme }) => (theme.darkmode ? "rgba(0, 0, 0, 0.4)" : "#f8fafc")};
  border: 1px solid var(--border-card);
  padding: 16px;
  max-height: 480px;
  overflow-y: auto;
  overflow-x: auto;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => `${theme.primary}66 transparent`};
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `${theme.primary}66`};
    border-radius: 6px;
  }

  & pre {
    font-family: "Consolas", "Monaco", "Courier New", monospace;
    font-size: 12px;
    line-height: 1.5;
    color: var(--text-dark);
    margin: 0;
    white-space: pre;
  }
`;

export default Export;
