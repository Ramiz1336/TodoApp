import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { Emoji } from "emoji-picker-react";
import {
  ArrowBackRounded,
  CheckRounded,
  ContentPasteRounded,
  FileDownloadRounded,
  FileUploadRounded,
  LinkRounded,
  PhonelinkRounded,
  QrCodeScannerRounded,
} from "@mui/icons-material";
import { Popover } from "@mui/material";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { Category, Task, UUID } from "../types/user";
import { exportTasksToJson, isHexColor, showToast, systemInfo } from "../utils";
import {
  CATEGORY_NAME_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  TASK_NAME_MAX_LENGTH,
} from "../constants";
import { UserContext } from "../contexts/UserContext";
import { useStorageState } from "../hooks/useStorageState";
import QRCodeScannerDialog from "../components/QRCodeScannerDialog";
import { TestingDateControl } from "../components/TestingDateControl";
import { getAppNow } from "../utils/testingDate";

const formatHeaderDate = (d: Date): string => {
  const dayName = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const dayNum = d.getDate();
  const monthName = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const year = d.getFullYear();
  return `${dayName}  /  ${dayNum}  ${monthName}  ${year}`;
};

const Transfer = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const now = getAppNow();

  const [testDateAnchor, setTestDateAnchor] = useState<HTMLElement | null>(null);

  const [selectedTasks, setSelectedTasks] = useStorageState<UUID[]>(
    [],
    "tasksToExport",
    "sessionStorage",
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.title = "Todo App - Transfer tasks";
  }, []);

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [user.createdAt]);

  const handleTaskClick = (taskId: UUID) => {
    setSelectedTasks((prevSelectedTasks) => {
      if (prevSelectedTasks.includes(taskId)) {
        return prevSelectedTasks.filter((id) => id !== taskId);
      } else {
        return [...prevSelectedTasks, taskId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === user.tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(user.tasks.map((t) => t.id));
    }
  };

  const handleExport = () => {
    const tasksToExport = user.tasks.filter((task) => selectedTasks.includes(task.id));
    exportTasksToJson(tasksToExport);
    showToast(
      `Exported ${tasksToExport.length} selected task${tasksToExport.length === 1 ? "" : "s"}.`,
    );
  };

  const handleExportAll = () => {
    if (user.tasks.length === 0) {
      showToast("No tasks to export", { type: "error" });
      return;
    }
    exportTasksToJson(user.tasks);
    showToast(`Exported all tasks (${user.tasks.length})`);
  };

  const handleImport = useCallback(
    (taskFile: File) => {
      const file = taskFile;

      if (file) {
        const isJsonFile =
          file.type === "application/json" || file.name.toLowerCase().endsWith(".json");
        if (!isJsonFile) {
          showToast("Please select a valid JSON backup file.", { type: "error" });
          return;
        }

        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          try {
            const importedTasks = JSON.parse(e.target?.result as string) as Task[];

            if (!Array.isArray(importedTasks)) {
              showToast("Imported file has an invalid structure.", { type: "error" });
              return;
            }

            const invalidTasks = importedTasks.filter((task) => {
              const isInvalid =
                (task.name && task.name.length > TASK_NAME_MAX_LENGTH) ||
                (task.description && task.description.length > DESCRIPTION_MAX_LENGTH) ||
                (task.category &&
                  task.category.some((cat) => cat.name.length > CATEGORY_NAME_MAX_LENGTH));

              return isInvalid;
            });

            if (invalidTasks.length > 0) {
              showToast("Some tasks exceed character limits and could not be imported.", {
                type: "error",
              });
              return;
            }

            const isCategoryColorValid = (category: Category) =>
              category.color && isHexColor(category.color);

            const hasInvalidColors = importedTasks.some((task) => {
              return (
                (task.color && !isHexColor(task.color)) ||
                (task.category && !task.category.every((cat) => isCategoryColorValid(cat)))
              );
            });

            if (hasInvalidColors) {
              showToast("Imported file contains tasks with invalid color formats.", {
                type: "error",
              });
              return;
            }

            const maxFileSize = 6 * 1024 * 1024;
            if (file.size > maxFileSize) {
              showToast("File size exceeds the 6MB limit.", { type: "error" });
              return;
            }

            const updatedCategories = user.categories.slice();

            importedTasks.forEach((task) => {
              if (task.category) {
                task.category.forEach((importedCat) => {
                  const existingCategory = updatedCategories.find(
                    (cat) => cat.id === importedCat.id,
                  );

                  if (!existingCategory) {
                    updatedCategories.push(importedCat);
                  } else {
                    Object.assign(existingCategory, importedCat);
                  }
                });
              }
            });

            setUser((prevUser) => ({
              ...prevUser,
              categories: updatedCategories,
            }));

            const mergedTasks = [...user.tasks, ...importedTasks];
            const uniqueTasks = mergedTasks.reduce((acc, task) => {
              const existingTask = acc.find((t) => t.id === task.id);
              if (existingTask) {
                return acc.map((t) => (t.id === task.id ? task : t));
              } else {
                return [...acc, task];
              }
            }, [] as Task[]);

            setUser((prevUser) => ({ ...prevUser, tasks: uniqueTasks }));
            showToast(`Successfully imported ${importedTasks.length} task(s)!`, {
              type: "success",
            });

            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          } catch (error) {
            console.error("Error parsing JSON file:", error);
            showToast("Failed to parse JSON file.", { type: "error" });
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }
        };

        reader.readAsText(file);
      }
    },
    [user.categories, user.tasks, setUser],
  );

  const handleImportFromLink = async (): Promise<void> => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.startsWith(`${location.protocol}//${location.hostname}`)) {
        window.open(text, "_self");
      } else {
        showToast("Clipboard does not contain a valid task share link.", { type: "error" });
      }
    } catch (err) {
      console.error("Failed to read clipboard:", err);
      showToast("Could not access clipboard.", { type: "error" });
    }
  };

  const handleImportFromQRCode = (qrCodeData: string) => {
    try {
      if (qrCodeData.startsWith(`${location.protocol}//${location.hostname}`)) {
        const url = new URL(qrCodeData);
        navigate(url.pathname + url.search);
      } else {
        showToast("Scanned QR Code is not a valid task share link.", { type: "error" });
      }
    } catch (error) {
      console.error("Error processing QR Code:", error);
      showToast("Invalid QR Code data.", { type: "error" });
    }
  };

  const handleImportFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const importedTasks = JSON.parse(text) as Task[];
      if (!Array.isArray(importedTasks)) {
        showToast("Clipboard does not contain a valid JSON task array.", { type: "error" });
        return;
      }
      const mergedTasks = [...user.tasks, ...importedTasks];
      const uniqueTasks = mergedTasks.reduce((acc, task) => {
        const existingTask = acc.find((t) => t.id === task.id);
        if (existingTask) {
          return acc.map((t) => (t.id === task.id ? task : t));
        } else {
          return [...acc, task];
        }
      }, [] as Task[]);

      setUser((prev) => ({ ...prev, tasks: uniqueTasks }));
      showToast(`Imported ${importedTasks.length} tasks from clipboard!`, { type: "success" });
    } catch {
      showToast("No valid JSON tasks found in clipboard.", { type: "error" });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImport(e.dataTransfer.files[0]);
    }
  };

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
        <PageTitle>Transfer & Backup</PageTitle>
        <PageSubtitle>
          Export your tasks to JSON or import tasks from backup files, clipboard, and QR links.
        </PageSubtitle>
      </TitleSection>

      <AccentLine color={theme.primary} />

      {/* Quick Sync Banner */}
      <SyncBanner to="/sync">
        <PhonelinkRounded sx={{ color: theme.primary, fontSize: 24 }} />
        <SyncBannerText>
          <strong>Looking for live device sync?</strong>
          <span>Sync tasks directly between devices over local peer connection →</span>
        </SyncBannerText>
      </SyncBanner>

      {/* Export Section */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>Export Tasks to JSON</SectionTitle>
          {user.tasks.length > 0 && (
            <SelectAllBtn onClick={handleSelectAll}>
              {selectedTasks.length === user.tasks.length ? (
                <>
                  <CheckRounded sx={{ fontSize: 15 }} />
                  <span>Deselect All</span>
                </>
              ) : (
                <span>Select All ({user.tasks.length})</span>
              )}
            </SelectAllBtn>
          )}
        </SectionHeader>

        {user.tasks.length > 0 ? (
          <TasksListScroll>
            {user.tasks.map((task) => {
              const isSelected = selectedTasks.includes(task.id);
              return (
                <TaskSelectCard
                  key={task.id}
                  selected={isSelected}
                  onClick={() => handleTaskClick(task.id)}
                >
                  <TaskColorIndicator color={task.color || theme.primary} />
                  <Checkbox
                    checked={isSelected}
                    sx={{
                      p: 0.5,
                      color: "var(--text-muted)",
                      "&.Mui-checked": {
                        color: theme.primary,
                      },
                    }}
                  />
                  <TaskEmojiWrap>
                    <Emoji size={20} unified={task.emoji || ""} emojiStyle={user.emojisStyle} />
                  </TaskEmojiWrap>
                  <TaskName>{task.name}</TaskName>
                </TaskSelectCard>
              );
            })}
          </TasksListScroll>
        ) : (
          <EmptyBox>You don't have any tasks in your workspace to export.</EmptyBox>
        )}

        <ButtonRow>
          <PrimaryActionBtn
            onClick={handleExport}
            disabled={selectedTasks.length === 0}
            primaryColor={theme.primary}
          >
            <FileDownloadRounded sx={{ fontSize: 18 }} />
            <span>Export Selected {selectedTasks.length > 0 && `(${selectedTasks.length})`}</span>
          </PrimaryActionBtn>

          <SecondaryActionBtn onClick={handleExportAll} disabled={user.tasks.length === 0}>
            <FileDownloadRounded sx={{ fontSize: 18 }} />
            <span>Export All Tasks</span>
          </SecondaryActionBtn>
        </ButtonRow>
      </SectionCard>

      {/* Import Section */}
      <SectionCard style={{ marginTop: 24 }}>
        <SectionTitle>Import Tasks</SectionTitle>
        <SectionSubtitle>
          Restore tasks from a JSON backup file or transfer from another device.
        </SectionSubtitle>

        {systemInfo.os !== "Android" && systemInfo.os !== "iOS" && (
          <DropZoneBox
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            isDragging={isDragging}
            primaryColor={theme.primary}
          >
            <FileUploadRounded sx={{ fontSize: 32, color: theme.primary, mb: 1 }} />
            <DropZoneText>Drag & drop your JSON backup file here</DropZoneText>
            <DropZoneSub>or click &ldquo;Select JSON File&rdquo; below</DropZoneSub>
          </DropZoneBox>
        )}

        <ButtonRow>
          <FileSelectLabel primaryColor={theme.primary}>
            <FileUploadRounded sx={{ fontSize: 18 }} />
            <span>Select JSON File</span>
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImport(e.target.files[0]);
                }
              }}
            />
          </FileSelectLabel>

          <SecondaryActionBtn onClick={handleImportFromClipboard}>
            <ContentPasteRounded sx={{ fontSize: 18 }} />
            <span>Import from Clipboard</span>
          </SecondaryActionBtn>
        </ButtonRow>

        <DividerLine />

        <SectionSubtitle style={{ marginBottom: 12 }}>Share link & QR code import:</SectionSubtitle>
        <ButtonRow>
          <SecondaryActionBtn onClick={() => setIsScannerOpen(true)}>
            <QrCodeScannerRounded sx={{ fontSize: 18 }} />
            <span>Scan QR Code</span>
          </SecondaryActionBtn>

          <SecondaryActionBtn onClick={handleImportFromLink}>
            <LinkRounded sx={{ fontSize: 18 }} />
            <span>Paste Share Link</span>
          </SecondaryActionBtn>
        </ButtonRow>
      </SectionCard>

      {/* QR Code Scanner Dialog */}
      <QRCodeScannerDialog
        subTitle="Import task by scanning a QR code"
        open={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScan={(result) => {
          showToast("QR Code scanned successfully!");
          setIsScannerOpen(false);
          if (result[0]?.rawValue) {
            handleImportFromQRCode(result[0].rawValue);
          }
        }}
      />
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
  margin-bottom: 20px;
  border-radius: 1px;
`;

const SyncBanner = styled(Link)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: 16px;
  background: ${({ theme }) =>
    theme.darkmode ? "rgba(120, 81, 191, 0.12)" : "rgba(120, 81, 191, 0.06)"};
  border: 1px solid ${({ theme }) => `${theme.primary}30`};
  text-decoration: none;
  color: inherit;
  margin-bottom: 24px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SyncBannerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 12.5px;

  & strong {
    font-size: 13.5px;
    color: var(--text-dark);
  }

  & span {
    color: var(--text-muted);
  }
`;

const SectionCard = styled.section`
  padding: 22px;
  border-radius: 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
`;

const SectionSubtitle = styled.p`
  font-size: 12.5px;
  color: var(--text-muted);
  margin: 0;
`;

const SelectAllBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: 1px solid var(--border-card);
  padding: 4px 10px;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: var(--text-dark);
    border-color: var(--text-muted);
  }
`;

const TasksListScroll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 280px;
  overflow-y: auto;
  padding-right: 4px;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => `${theme.primary}66 transparent`};
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `${theme.primary}66`};
    border-radius: 6px;
  }
`;

const TaskSelectCard = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 12px;
  background: ${({ selected, theme }) => (selected ? `${theme.primary}12` : "var(--bg-card)")};
  border: 1px solid ${({ selected, theme }) => (selected ? theme.primary : "var(--border-card)")};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ selected, theme }) => (selected ? `${theme.primary}18` : "var(--card-hover)")};
  }
`;

const TaskColorIndicator = styled.div<{ color: string }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: ${({ color }) => color};
`;

const TaskEmojiWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
`;

const TaskName = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const PrimaryActionBtn = styled.button<{ primaryColor: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 12px;
  border: none;
  background: ${({ primaryColor }) => primaryColor};
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px ${({ primaryColor }) => `${primaryColor}40`};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const SecondaryActionBtn = styled.button`
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
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--card-hover);
    border-color: var(--text-muted);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FileSelectLabel = styled.label<{ primaryColor: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
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

const DropZoneBox = styled.div<{ isDragging: boolean; primaryColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 20px;
  border-radius: 16px;
  border: 2px dashed
    ${({ isDragging, primaryColor }) => (isDragging ? primaryColor : "var(--border-card)")};
  background: ${({ isDragging, primaryColor }) =>
    isDragging ? `${primaryColor}10` : "rgba(0, 0, 0, 0.02)"};
  cursor: pointer;
  transition: all 0.2s ease;
`;

const DropZoneText = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-dark);
`;

const DropZoneSub = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
`;

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background: var(--border-card);
  margin: 4px 0;
`;

const EmptyBox = styled.div`
  font-size: 13px;
  color: var(--text-muted);
  padding: 20px;
  text-align: center;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px dashed var(--border-card);
`;

export default Transfer;
