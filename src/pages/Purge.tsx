import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomDialogTitle } from "../components";
import { UserContext } from "../contexts/UserContext";
import { Checkbox, Dialog, DialogActions, DialogContent, Popover } from "@mui/material";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { Emoji } from "emoji-picker-react";
import type { Task, UUID } from "../types/user";
import { useStorageState } from "../hooks/useStorageState";
import {
  ArrowBackRounded,
  CheckRounded,
  DeleteForeverRounded,
  DeleteSweepRounded,
  DoneAllRounded,
} from "@mui/icons-material";
import { showToast } from "../utils";
import { TestingDateControl } from "../components/TestingDateControl";
import { getAppNow } from "../utils/testingDate";

const formatHeaderDate = (d: Date): string => {
  const dayName = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const dayNum = d.getDate();
  const monthName = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const year = d.getFullYear();
  return `${dayName}  /  ${dayNum}  ${monthName}  ${year}`;
};

type FilterMode = "all" | "done" | "pending";

const Purge = () => {
  const { user, setUser } = useContext(UserContext);
  const { tasks } = user;
  const navigate = useNavigate();
  const theme = useTheme();
  const now = getAppNow();

  const [testDateAnchor, setTestDateAnchor] = useState<HTMLElement | null>(null);
  const [filterMode, setFilterMode] = useState<FilterMode>("all");

  const [selectedTasks, setSelectedTasks] = useStorageState<UUID[]>(
    [],
    "tasksToPurge",
    "sessionStorage",
  );

  const [deleteAllDialog, setDeleteAllDialog] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Todo App - Purge tasks";
  }, []);

  const doneTasks = useMemo(() => tasks.filter((task) => task.done), [tasks]);
  const notDoneTasks = useMemo(() => tasks.filter((task) => !task.done), [tasks]);

  const displayedTasks = useMemo(() => {
    if (filterMode === "done") return doneTasks;
    if (filterMode === "pending") return notDoneTasks;
    return tasks;
  }, [filterMode, doneTasks, notDoneTasks, tasks]);

  const selectedNamesList = useMemo(
    () =>
      new Intl.ListFormat("en", {
        style: "long",
        type: "conjunction",
      }).format(
        selectedTasks.map((taskId) => {
          const selectedTask = user.tasks.find((task) => task.id === taskId);
          return selectedTask ? selectedTask.name : "";
        }),
      ),
    [selectedTasks, user.tasks],
  );

  const handleTaskClick = (taskId: UUID) => {
    setSelectedTasks((prevSelectedTasks) => {
      if (prevSelectedTasks.includes(taskId)) {
        return prevSelectedTasks.filter((id) => id !== taskId);
      } else {
        return [...prevSelectedTasks, taskId];
      }
    });
  };

  const handleSelectAllDisplayed = () => {
    const displayedIds = displayedTasks.map((t) => t.id);
    const allSelected = displayedIds.every((id) => selectedTasks.includes(id));
    if (allSelected) {
      setSelectedTasks((prev) => prev.filter((id) => !displayedIds.includes(id)));
    } else {
      setSelectedTasks((prev) => Array.from(new Set([...prev, ...displayedIds])));
    }
  };

  const purgeTasks = (tasksToPurgeList: Task[]) => {
    const purgeIds = new Set(tasksToPurgeList.map((t) => t.id));
    const updatedTasks = user.tasks.filter((task) => !purgeIds.has(task.id));
    const purgedTaskIds = Array.from(purgeIds);

    setSelectedTasks((prev) => prev.filter((id) => !purgeIds.has(id)));
    setUser((prevUser) => ({
      ...prevUser,
      tasks: updatedTasks,
      deletedTasks: [
        ...(prevUser.deletedTasks || []),
        ...purgedTaskIds.filter((id) => !prevUser.deletedTasks?.includes(id)),
      ],
    }));
  };

  const handlePurgeSelected = () => {
    const tasksToPurge = tasks.filter((task: Task) => selectedTasks.includes(task.id));
    purgeTasks(tasksToPurge);
    showToast(
      <div>
        Purged selected tasks: <b translate="no">{selectedNamesList}</b>
      </div>,
    );
  };

  const handlePurgeDone = () => {
    purgeTasks(doneTasks);
    showToast(`Purged all ${doneTasks.length} done tasks.`);
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
        <PageTitle>Purge Tasks</PageTitle>
        <PageSubtitle>
          Permanently remove completed or unwanted tasks from your workspace.
        </PageSubtitle>
      </TitleSection>

      <AccentLine color="#ef4444" />

      {/* Quick Actions Grid */}
      <QuickActionsGrid>
        <QuickActionCard
          onClick={handlePurgeDone}
          disabled={doneTasks.length === 0}
          title={doneTasks.length === 0 ? "No done tasks to purge" : "Purge all done tasks"}
        >
          <QuickActionIconWrap color="#22c55e">
            <DoneAllRounded sx={{ fontSize: 20 }} />
          </QuickActionIconWrap>
          <QuickActionInfo>
            <QuickActionTitle>Purge Done Tasks</QuickActionTitle>
            <QuickActionSub>{doneTasks.length} completed tasks ready to purge</QuickActionSub>
          </QuickActionInfo>
        </QuickActionCard>

        <QuickActionCard
          onClick={() => setDeleteAllDialog(true)}
          disabled={tasks.length === 0}
          isDanger
          title={tasks.length === 0 ? "No tasks to purge" : "Purge all tasks"}
        >
          <QuickActionIconWrap color="#ef4444">
            <DeleteForeverRounded sx={{ fontSize: 20 }} />
          </QuickActionIconWrap>
          <QuickActionInfo>
            <QuickActionTitle>Purge All Tasks</QuickActionTitle>
            <QuickActionSub>{tasks.length} total tasks in workspace</QuickActionSub>
          </QuickActionInfo>
        </QuickActionCard>
      </QuickActionsGrid>

      {/* Filter Tabs & Selection Bar */}
      <ControlsRow>
        <FilterPillGroup>
          <FilterTab active={filterMode === "all"} onClick={() => setFilterMode("all")}>
            All ({tasks.length})
          </FilterTab>
          <FilterTab active={filterMode === "done"} onClick={() => setFilterMode("done")}>
            Done ({doneTasks.length})
          </FilterTab>
          <FilterTab active={filterMode === "pending"} onClick={() => setFilterMode("pending")}>
            Pending ({notDoneTasks.length})
          </FilterTab>
        </FilterPillGroup>

        {displayedTasks.length > 0 && (
          <SelectAllBtn onClick={handleSelectAllDisplayed}>
            {displayedTasks.every((t) => selectedTasks.includes(t.id)) ? (
              <>
                <CheckRounded sx={{ fontSize: 16 }} />
                <span>Deselect All</span>
              </>
            ) : (
              <span>Select All</span>
            )}
          </SelectAllBtn>
        )}
      </ControlsRow>

      {/* Task List */}
      {displayedTasks.length > 0 ? (
        <TasksListWrap>
          {displayedTasks.map((task) => {
            const isSelected = selectedTasks.includes(task.id);
            return (
              <TaskCard
                key={task.id}
                selected={isSelected}
                onClick={() => handleTaskClick(task.id)}
              >
                <TaskColorBar color={task.color || theme.primary} />
                <Checkbox
                  checked={isSelected}
                  sx={{
                    p: 0.5,
                    color: "var(--text-muted)",
                    "&.Mui-checked": {
                      color: "#ef4444",
                    },
                  }}
                />
                <TaskEmojiWrap>
                  <Emoji size={20} unified={task.emoji || ""} emojiStyle={user.emojisStyle} />
                </TaskEmojiWrap>
                <TaskInfo>
                  <TaskName done={task.done}>{task.name}</TaskName>
                </TaskInfo>
                <TaskStatusChip done={task.done}>{task.done ? "Done" : "Pending"}</TaskStatusChip>
              </TaskCard>
            );
          })}
        </TasksListWrap>
      ) : (
        <EmptyBox>
          {tasks.length === 0
            ? "You don't have any tasks in your workspace."
            : `No ${filterMode} tasks to display.`}
        </EmptyBox>
      )}

      {/* Sticky Bottom Purge Button */}
      {selectedTasks.length > 0 && (
        <StickyBottomBar>
          <PurgeSelectedBtn onClick={handlePurgeSelected}>
            <DeleteSweepRounded sx={{ fontSize: 20 }} />
            <span>
              Purge {selectedTasks.length} Selected Task{selectedTasks.length === 1 ? "" : "s"}
            </span>
          </PurgeSelectedBtn>
        </StickyBottomBar>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={deleteAllDialog}
        onClose={() => setDeleteAllDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            padding: "8px",
            maxWidth: "420px",
          },
        }}
      >
        <CustomDialogTitle
          title="Purge All Tasks?"
          subTitle="This will permanently delete all tasks from your workspace."
          onClose={() => setDeleteAllDialog(false)}
          icon={<DeleteForeverRounded sx={{ color: "#ef4444" }} />}
        />
        <DialogContent sx={{ px: 2, py: 1.5, fontSize: "13.5px", color: "var(--text-muted)" }}>
          Are you sure you want to delete all <strong>{tasks.length}</strong> tasks? This action
          cannot be undone.
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
          <CancelBtn onClick={() => setDeleteAllDialog(false)}>Cancel</CancelBtn>
          <ConfirmDeleteBtn
            onClick={() => {
              purgeTasks(tasks);
              setDeleteAllDialog(false);
              showToast("Purged all tasks");
            }}
          >
            <DeleteForeverRounded sx={{ fontSize: 18 }} /> &nbsp; Purge All
          </ConfirmDeleteBtn>
        </DialogActions>
      </Dialog>
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
  padding: 12px 16px 100px;
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
  background-color: ${({ color }) => color || "#ef4444"};
  margin-bottom: 20px;
  border-radius: 1px;
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
`;

const QuickActionCard = styled.button<{ isDanger?: boolean; disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  text-align: left;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--card-hover);
    border-color: ${({ isDanger }) => (isDanger ? "#ef4444" : "var(--text-muted)")};
    transform: translateY(-1px);
  }
`;

const QuickActionIconWrap = styled.div<{ color: string }>`
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

const QuickActionInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const QuickActionTitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--text-dark);
`;

const QuickActionSub = styled.div`
  font-size: 11.5px;
  color: var(--text-muted);
  margin-top: 1px;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  gap: 10px;
  flex-wrap: wrap;
`;

const FilterPillGroup = styled.div`
  display: inline-flex;
  align-items: center;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 999px;
  padding: 3px;
  gap: 2px;
`;

const FilterTab = styled.button<{ active: boolean }>`
  border: none;
  background: ${({ active, theme }) => (active ? theme.primary : "transparent")};
  color: ${({ active }) => (active ? "#ffffff" : "var(--text-dark)")};
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ active }) => (active ? "#ffffff" : "var(--text-dark)")};
  }
`;

const SelectAllBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: 1px solid var(--border-card);
  padding: 5px 12px;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: var(--text-dark);
    border-color: var(--text-muted);
  }
`;

const TasksListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 30px;
`;

const TaskCard = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 12px;
  background: ${({ selected }) => (selected ? "rgba(239, 68, 68, 0.08)" : "var(--bg-card)")};
  border: 1px solid ${({ selected }) => (selected ? "#ef4444" : "var(--border-card)")};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ selected }) => (selected ? "#ef4444" : "var(--text-muted)")};
  }
`;

const TaskColorBar = styled.div<{ color: string }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: ${({ color }) => color};
`;

const TaskEmojiWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
`;

const TaskInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const TaskName = styled.div<{ done?: boolean }>`
  font-family: "Poppins", sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  color: ${({ done }) => (done ? "var(--text-muted)" : "var(--text-dark)")};
  text-decoration: ${({ done }) => (done ? "line-through" : "none")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TaskStatusChip = styled.span<{ done?: boolean }>`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  background: ${({ done }) => (done ? "rgba(34, 197, 94, 0.12)" : "rgba(148, 163, 184, 0.12)")};
  color: ${({ done }) => (done ? "#22c55e" : "var(--text-muted)")};
`;

const StickyBottomBar = styled.div`
  position: sticky;
  bottom: 20px;
  display: flex;
  justify-content: center;
  z-index: 10;
  margin-top: 10px;
`;

const PurgeSelectedBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  border-radius: 999px;
  border: none;
  background: #ef4444;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
  transition: all 0.2s ease;

  &:hover {
    background: #dc2626;
    transform: translateY(-2px);
  }
`;

const EmptyBox = styled.div`
  font-size: 13px;
  color: var(--text-muted);
  padding: 24px;
  text-align: center;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px dashed var(--border-card);
  margin: 12px 0 24px;
`;

const CancelBtn = styled.button`
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid var(--border-card);
  background: transparent;
  color: var(--text-dark);
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

const ConfirmDeleteBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 10px;
  border: none;
  background: #ef4444;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #dc2626;
  }
`;

export default Purge;
