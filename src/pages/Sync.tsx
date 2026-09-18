import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  AccessTimeRounded,
  ArrowBackRounded,
  CheckCircleRounded,
  DevicesRounded,
  QrCodeRounded,
  QrCodeScannerRounded,
  RestartAltRounded,
  SyncProblemRounded,
  WifiOffRounded,
  WifiTetheringRounded,
} from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Popover,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import QRCode from "react-qr-code";
import QRCodeScannerDialog from "../components/QRCodeScannerDialog";
import { UserContext } from "../contexts/UserContext";
import { useResponsiveDisplay } from "../hooks/useResponsiveDisplay";
import { usePeerSync } from "../hooks/usePeerSync";
import type { OtherDataSyncOption, SyncStatus } from "../types/sync";
import { showToast, timeAgo } from "../utils";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { TestingDateControl } from "../components/TestingDateControl";
import { getAppNow } from "../utils/testingDate";

const formatHeaderDate = (d: Date): string => {
  const dayName = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const dayNum = d.getDate();
  const monthName = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const year = d.getFullYear();
  return `${dayName}  /  ${dayNum}  ${monthName}  ${year}`;
};

export default function Sync() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const now = getAppNow();

  const [testDateAnchor, setTestDateAnchor] = useState<HTMLElement | null>(null);
  const isMobile = useResponsiveDisplay();
  const isOnline = useOnlineStatus();
  const [scannerOpen, setScannerOpen] = useState<boolean>(false);

  const {
    mode,
    setMode,
    hostPeerId,
    syncStatus,
    startHost,
    connectToHost,
    otherDataSyncOption,
    setOtherDataSyncOption,
    otherDataSource,
    resetAll,
  } = usePeerSync();

  const otherDataSyncOptionRef = useRef(otherDataSyncOption);

  useEffect(() => {
    otherDataSyncOptionRef.current = otherDataSyncOption;
  }, [otherDataSyncOption]);

  useEffect(() => {
    document.title = "Todo App - Sync Data";
  }, []);

  const handleScan = (text: string | null) => {
    if (!text) return;
    setScannerOpen(false);
    try {
      const scannedId = text.trim();
      setMode("scan");
      connectToHost(scannedId);
    } catch (err) {
      showToast("Failed to scan QR Code", { type: "error" });
      console.error("Error scanning QR Code:", err);
    }
  };

  const getOtherDataSourceLabel = (src: OtherDataSyncOption | null) => {
    if (!src) return null;

    if (src === "this_device") {
      return mode === "display" ? "This Device" : "Host Device";
    }

    if (src === "other_device") {
      return mode === "display" ? "Other Device" : "This Device";
    }

    return null;
  };

  const isSuccess = syncStatus.severity === "success";
  const isError = syncStatus.severity === "error";

  return (
    <PageContainer>
      {/* Top Bar Header */}
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
        <PageTitle>Sync Devices</PageTitle>
        <PageSubtitle>
          Direct peer-to-peer sync between your devices without any cloud storage.
        </PageSubtitle>
      </TitleSection>

      <AccentLine color={theme.primary} />

      {/* Main Content */}
      {!mode && (
        <CardSection>
          <IntroBox>
            <IntroIconWrap primaryColor={theme.primary}>
              <DevicesRounded sx={{ fontSize: 32 }} />
            </IntroIconWrap>
            <IntroTitle>Local Peer-to-Peer Data Transfer</IntroTitle>
            <IntroBody>
              Securely sync your tasks, categories, and settings between your phone, tablet, and
              computer. Data travels directly through an encrypted peer connection without being
              stored on external servers.
            </IntroBody>

            {user.lastSyncedAt && (
              <Tooltip
                title={new Intl.DateTimeFormat(navigator.language, {
                  dateStyle: "long",
                  timeStyle: "medium",
                }).format(new Date(user.lastSyncedAt))}
                placement="top"
              >
                <LastSyncedChip>
                  <AccessTimeRounded sx={{ fontSize: 15 }} />
                  <span>Last synced {timeAgo(new Date(user.lastSyncedAt))}</span>
                </LastSyncedChip>
              </Tooltip>
            )}

            {!isOnline && (
              <Alert
                icon={<WifiOffRounded />}
                severity="error"
                sx={{ textAlign: "left", mt: 2, borderRadius: "12px" }}
              >
                <AlertTitle>Offline</AlertTitle>
                Both devices must be online to initiate a peer-to-peer handshake.
              </Alert>
            )}
          </IntroBox>

          <ModeCardsGrid>
            <ModeOptionCard
              disabled={!isOnline}
              primaryColor={theme.primary}
              onClick={() => {
                setOtherDataSyncOption("this_device");
                setMode("display");
                startHost();
              }}
            >
              <ModeOptionIconWrap primaryColor={theme.primary}>
                <QrCodeRounded sx={{ fontSize: 28 }} />
              </ModeOptionIconWrap>
              <ModeOptionTitle>Display QR Code</ModeOptionTitle>
              <ModeOptionDesc>
                Share your tasks from this device by generating a sync code.
              </ModeOptionDesc>
            </ModeOptionCard>

            <ModeOptionCard
              disabled={!isOnline}
              primaryColor={theme.primary}
              onClick={() => setScannerOpen(true)}
            >
              <ModeOptionIconWrap primaryColor={theme.primary}>
                <QrCodeScannerRounded sx={{ fontSize: 28 }} />
              </ModeOptionIconWrap>
              <ModeOptionTitle>Scan QR Code</ModeOptionTitle>
              <ModeOptionDesc>
                Use your camera to scan a QR code from your other device.
              </ModeOptionDesc>
            </ModeOptionCard>
          </ModeCardsGrid>
        </CardSection>
      )}

      {/* Host Mode Display */}
      {mode === "display" && (
        <CardSection>
          <ModeBadge>
            <WifiTetheringRounded sx={{ fontSize: 18 }} /> Host Mode
          </ModeBadge>

          {hostPeerId ? (
            isSuccess ? (
              <SyncSuccessScreen
                syncStatus={syncStatus}
                otherDataSource={otherDataSource}
                getOtherDataSourceLabel={getOtherDataSourceLabel}
                resetAll={resetAll}
              />
            ) : (
              <SyncContentStack>
                <QrContainer>
                  <QRCode
                    value={hostPeerId}
                    size={240}
                    style={{ backgroundColor: "white", borderRadius: "12px", padding: "10px" }}
                  />
                </QrContainer>
                <InstructionText>
                  Scan this QR code with your other device to start syncing.
                </InstructionText>

                <SettingsSection>
                  <SettingsLabel>Sync Preferences</SettingsLabel>
                  <FormControl>
                    <RadioGroup
                      row={!isMobile}
                      value={otherDataSyncOption}
                      onChange={(e) =>
                        setOtherDataSyncOption(e.target.value as OtherDataSyncOption)
                      }
                    >
                      <FormControlLabel
                        value="this_device"
                        control={
                          <Radio
                            sx={{ color: theme.primary, "&.Mui-checked": { color: theme.primary } }}
                          />
                        }
                        label={<RadioText>This Device Wins</RadioText>}
                      />
                      <FormControlLabel
                        value="other_device"
                        control={
                          <Radio
                            sx={{ color: theme.primary, "&.Mui-checked": { color: theme.primary } }}
                          />
                        }
                        label={<RadioText>Other Device Wins</RadioText>}
                      />
                      <FormControlLabel
                        value="no_sync"
                        control={
                          <Radio
                            sx={{ color: theme.primary, "&.Mui-checked": { color: theme.primary } }}
                          />
                        }
                        label={<RadioText>Don't Sync Settings</RadioText>}
                      />
                    </RadioGroup>
                  </FormControl>
                  <SubtextNote>Tasks and categories are merged automatically.</SubtextNote>
                </SettingsSection>

                <SyncStatusAlert syncStatus={syncStatus} />

                <ResetBtn onClick={resetAll} isError={isError}>
                  {isError ? (
                    <>Try Again</>
                  ) : (
                    <>
                      <RestartAltRounded sx={{ fontSize: 18 }} /> &nbsp; Cancel / Reset
                    </>
                  )}
                </ResetBtn>
              </SyncContentStack>
            )
          ) : (
            <LoadingBox>
              <CircularProgress size={28} sx={{ color: theme.primary }} />
              <LoadingText>Initializing peer connection...</LoadingText>
            </LoadingBox>
          )}
        </CardSection>
      )}

      {/* Scan Mode Display */}
      {mode === "scan" && (
        <CardSection>
          <ModeBadge>
            <QrCodeScannerRounded sx={{ fontSize: 18 }} /> Client Mode
          </ModeBadge>

          {isSuccess ? (
            <SyncSuccessScreen
              syncStatus={syncStatus}
              otherDataSource={otherDataSource}
              getOtherDataSourceLabel={getOtherDataSourceLabel}
              resetAll={resetAll}
            />
          ) : (
            <SyncContentStack>
              <SyncStatusAlert syncStatus={syncStatus} />
              {(syncStatus.message === "Connecting to host..." ||
                syncStatus.message === "Connected, sending your data...") && (
                <LoadingBox>
                  <CircularProgress size={28} sx={{ color: theme.primary }} />
                  <LoadingText>{syncStatus.message}</LoadingText>
                </LoadingBox>
              )}
              <ResetBtn onClick={resetAll} isError={isError}>
                {isError ? (
                  <>Try Again</>
                ) : (
                  <>
                    <RestartAltRounded sx={{ fontSize: 18 }} /> &nbsp; Cancel / Reset
                  </>
                )}
              </ResetBtn>
            </SyncContentStack>
          )}
        </CardSection>
      )}

      {/* Camera QR Scanner Dialog */}
      <QRCodeScannerDialog
        subTitle="Scan the host QR code to sync."
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScan={(result) => {
          if (result && result[0]?.rawValue) handleScan(result[0].rawValue);
        }}
        onError={(err) => {
          console.error("QR scan error:", err);
          showToast("Error scanning QR code.", { type: "error" });
          setScannerOpen(false);
        }}
      />
    </PageContainer>
  );
}

export function SyncSuccessScreen({
  syncStatus,
  otherDataSource,
  getOtherDataSourceLabel,
  resetAll,
}: {
  syncStatus: SyncStatus;
  otherDataSource: OtherDataSyncOption | null;
  getOtherDataSourceLabel: (src: OtherDataSyncOption | null) => string | null;
  resetAll: () => void;
}) {
  return (
    <SuccessStack>
      <SuccessIconWrap>
        <CheckCircleRounded sx={{ fontSize: 44, color: "#22c55e" }} />
      </SuccessIconWrap>
      <SuccessTitle>Sync Complete!</SuccessTitle>
      <SuccessBody>{syncStatus.message || "Your devices are now in sync."}</SuccessBody>
      {otherDataSource && (
        <SyncDataSourceBadge>
          Applied settings from: <strong>{getOtherDataSourceLabel(otherDataSource)}</strong>
        </SyncDataSourceBadge>
      )}
      <ResetBtn onClick={resetAll} style={{ marginTop: 16 }}>
        Done
      </ResetBtn>
    </SuccessStack>
  );
}

export const SyncStatusAlert = ({ syncStatus }: { syncStatus: SyncStatus }) => {
  if (!syncStatus.message) return null;

  return (
    <StatusAlertWrap severity={syncStatus.severity}>
      {syncStatus.severity === "error" && <SyncProblemRounded sx={{ fontSize: 18 }} />}
      {syncStatus.severity === "success" && <CheckCircleRounded sx={{ fontSize: 18 }} />}
      <span>{syncStatus.message}</span>
    </StatusAlertWrap>
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
    max-width: 680px;
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
  margin-bottom: 24px;
  border-radius: 1px;
`;

const CardSection = styled.section`
  padding: 24px;
  border-radius: 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const IntroBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const IntroIconWrap = styled.div<{ primaryColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${({ primaryColor }) => `${primaryColor}18`};
  color: ${({ primaryColor }) => primaryColor};
  margin-bottom: 12px;
`;

const IntroTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0 0 6px 0;
`;

const IntroBody = styled.p`
  font-size: 13px;
  color: var(--text-subtle);
  line-height: 1.5;
  margin: 0 0 14px 0;
  max-width: 480px;
`;

const LastSyncedChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  padding: 4px 12px;
  border-radius: 999px;
`;

const ModeCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
`;

const ModeOptionCard = styled.button<{ primaryColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 20px;
  border-radius: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${({ primaryColor }) => primaryColor};
    background: var(--card-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ModeOptionIconWrap = styled.div<{ primaryColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${({ primaryColor }) => `${primaryColor}14`};
  color: ${({ primaryColor }) => primaryColor};
  margin-bottom: 12px;
`;

const ModeOptionTitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 4px;
`;

const ModeOptionDesc = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.4;
`;

const ModeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 6px;
`;

const SyncContentStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const QrContainer = styled.div`
  padding: 12px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid var(--border-card);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

const InstructionText = styled.div`
  font-size: 13px;
  color: var(--text-muted);
  text-align: center;
`;

const SettingsSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 14px;
  padding: 14px;
  box-sizing: border-box;
`;

const SettingsLabel = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
`;

const RadioText = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-dark);
`;

const SubtextNote = styled.div`
  font-size: 11.5px;
  color: var(--text-muted);
  margin-top: 6px;
`;

const ResetBtn = styled.button<{ isError?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  border-radius: 12px;
  border: 1px solid ${({ isError }) => (isError ? "#ef4444" : "var(--border-card)")};
  background: ${({ isError }) => (isError ? "#ef4444" : "var(--bg-card)")};
  color: ${({ isError }) => (isError ? "#ffffff" : "var(--text-dark)")};
  font-family: "Poppins", sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ isError }) => (isError ? "#dc2626" : "var(--card-hover)")};
    border-color: var(--text-muted);
  }
`;

const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 36px 0;
`;

const LoadingText = styled.div`
  font-size: 13.5px;
  color: var(--text-muted);
`;

const SuccessStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 0;
`;

const SuccessIconWrap = styled.div`
  margin-bottom: 8px;
`;

const SuccessTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: var(--text-dark);
  margin: 0 0 6px 0;
`;

const SuccessBody = styled.p`
  font-size: 13px;
  color: var(--text-muted);
  margin: 0 0 12px 0;
`;

const SyncDataSourceBadge = styled.div`
  font-size: 12px;
  color: var(--text-dark);
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.25);
  padding: 6px 14px;
  border-radius: 999px;
  margin-bottom: 12px;
`;

const StatusAlertWrap = styled.div<{ severity?: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 12.5px;
  background: ${({ severity }) =>
    severity === "error"
      ? "rgba(239, 68, 68, 0.1)"
      : severity === "success"
        ? "rgba(34, 197, 94, 0.1)"
        : "rgba(0, 0, 0, 0.04)"};
  color: ${({ severity }) =>
    severity === "error" ? "#ef4444" : severity === "success" ? "#22c55e" : "var(--text-dark)"};
`;
