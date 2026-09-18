import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  AccessTimeRounded,
  AddAPhotoRounded,
  CheckRounded,
  TaskAltRounded,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { Emoji } from "emoji-picker-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { CustomDialogTitle, TaskIcon } from "..";
import { TaskContext } from "../../contexts/TaskContext";
import { UserContext } from "../../contexts/UserContext";
import { Task } from "../../types/user";
import {
  fileToBase64,
  recordTaskCompletion,
  saveTaskCompletionPhoto,
  showToast,
  validateImageFile,
} from "../../utils";
import { applyTaskCompletion } from "../../utils/taskRecurrence";
import { isTaskScheduledOnDate } from "../../utils/taskSchedule";
import { getAppNow } from "../../utils/testingDate";

const formatCompletionDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

export const CompleteTaskDialog = () => {
  const { user, setUser } = useContext(UserContext);
  const { tasks } = user;
  const { selectedTaskId, completionDialogOpen, setCompletionDialogOpen } = useContext(TaskContext);

  const theme = useTheme();

  const [completionPhoto, setCompletionPhoto] = useState<string | null>(null);
  const [completionPhotoError, setCompletionPhotoError] = useState<string | null>(null);
  const [completionComment, setCompletionComment] = useState("");
  const [isSavingCompletion, setIsSavingCompletion] = useState(false);

  useEffect(() => {
    if (completionDialogOpen) {
      setCompletionPhoto(null);
      setCompletionPhotoError(null);
      setCompletionComment("");
    }
  }, [completionDialogOpen]);

  const selectedTask = useMemo(() => {
    return tasks.find((task) => task.id === selectedTaskId) || ({} as Task);
  }, [selectedTaskId, tasks]);

  const handleCompletionPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setCompletionPhotoError(validationError);
      return;
    }

    try {
      setCompletionPhoto(await fileToBase64(file));
      setCompletionPhotoError(null);
    } catch {
      setCompletionPhotoError("The photo could not be read. Please try another image.");
    }
  };

  const finishTask = async (photo: string) => {
    if (!selectedTaskId) return;

    setIsSavingCompletion(true);
    try {
      const completionPhotoId = await saveTaskCompletionPhoto(photo);
      const updatedTasks = tasks.map((task) => {
        if (task.id === selectedTaskId) {
          return applyTaskCompletion(task);
        }
        return task;
      });
      setUser((prevUser) => {
        const updatedUser = { ...prevUser, tasks: updatedTasks };
        return recordTaskCompletion(
          updatedUser,
          selectedTask,
          getAppNow(),
          completionPhotoId,
          completionComment.trim() || undefined,
        );
      });

      const currentTasks = updatedTasks.filter(
        (task) => !task.recurrence || isTaskScheduledOnDate(task, getAppNow()),
      );
      const allTasksDone = currentTasks.length > 0 && currentTasks.every((task) => task.done);

      if (allTasksDone) {
        showToast(
          <div>
            <b>All tasks done</b>
            <br />
            <span>You've checked off all your todos. Well done!</span>
          </div>,
          {
            icon: (
              <div style={{ margin: "-6px 4px -6px -6px" }}>
                <TaskIcon variant="success" scale={0.18} />
              </div>
            ),
          },
        );
      }
      setCompletionDialogOpen(false);
      setCompletionPhoto(null);
      setCompletionPhotoError(null);
      setCompletionComment("");
    } catch (error) {
      console.error("Failed to save task completion photo:", error);
      setCompletionPhotoError("The photo could not be saved. Please try again.");
    } finally {
      setIsSavingCompletion(false);
    }
  };

  const handleClose = () => {
    if (!isSavingCompletion) {
      setCompletionDialogOpen(false);
    }
  };

  return (
    <StyledDialog open={completionDialogOpen} onClose={handleClose} fullWidth maxWidth="xs">
      <CustomDialogTitle
        title="Complete Task"
        subTitle="Attach proof and notes to record completion"
        icon={<TaskAltRounded sx={{ color: theme.primary || "#7851bf", fontSize: 28 }} />}
        onClose={handleClose}
      />

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "14px", pt: 1 }}>
        {/* Task Summary Card */}
        <TaskInfoCard>
          <TaskDot color={selectedTask.color} />
          {selectedTask.emoji && (
            <Emoji size={20} unified={selectedTask.emoji} emojiStyle={user.emojisStyle} lazyLoad />
          )}
          <TaskDetails>
            <TaskTitle>{selectedTask.name || "Task"}</TaskTitle>
            <TimeBadge>
              <AccessTimeRounded sx={{ fontSize: 13 }} />
              {formatCompletionDate(getAppNow())}
            </TimeBadge>
          </TaskDetails>
        </TaskInfoCard>

        {/* Photo Proof Upload Area */}
        {completionPhoto ? (
          <PhotoPreviewWrapper>
            <PreviewImage src={completionPhoto} alt="Completion proof preview" />
            <ChangePhotoButton>
              <AddAPhotoRounded sx={{ fontSize: 15 }} />
              Change
              <input
                hidden
                accept="image/png,image/jpeg,image/webp"
                type="file"
                onChange={handleCompletionPhoto}
              />
            </ChangePhotoButton>
          </PhotoPreviewWrapper>
        ) : (
          <PhotoDropzone>
            <PhotoIconCircle>
              <AddAPhotoRounded sx={{ fontSize: 22 }} />
            </PhotoIconCircle>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "13.5px",
                color: "var(--text-dark, inherit)",
              }}
            >
              Add Completion Photo Proof
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "11.5px",
                color: "var(--text-muted, #94a3b8)",
              }}
            >
              PNG, JPG, or WebP up to 10MB
            </Typography>
            <input
              hidden
              accept="image/png,image/jpeg,image/webp"
              type="file"
              onChange={handleCompletionPhoto}
            />
          </PhotoDropzone>
        )}

        {completionPhotoError && (
          <Typography color="error" variant="caption" sx={{ mt: -0.5, px: 0.5 }}>
            {completionPhotoError}
          </Typography>
        )}

        {/* Optional Comment Input */}
        <StyledCommentInput
          label="Notes or comment (optional)"
          placeholder="How did it go? Any notes..."
          multiline
          minRows={2}
          maxRows={4}
          value={completionComment}
          onChange={(e) => setCompletionComment(e.target.value)}
          inputProps={{ maxLength: 300 }}
          helperText={completionComment.length > 0 ? `${completionComment.length}/300` : undefined}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 0.5, gap: 1 }}>
        <CancelButton onClick={handleClose} disabled={isSavingCompletion}>
          Cancel
        </CancelButton>
        <SubmitButton
          startIcon={
            isSavingCompletion ? <CircularProgress size={16} color="inherit" /> : <CheckRounded />
          }
          onClick={() => completionPhoto && finishTask(completionPhoto)}
          disabled={!completionPhoto || isSavingCompletion}
        >
          {isSavingCompletion ? "Saving..." : "Complete Task"}
        </SubmitButton>
      </DialogActions>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    border-radius: 24px;
    padding: 8px 6px 14px;
    background-color: ${({ theme }) => (theme.darkmode ? "#1e293b" : "#ffffff")};
    border: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0")};
    box-shadow: ${({ theme }) =>
      theme.darkmode ? "0 20px 60px rgba(0, 0, 0, 0.6)" : "0 20px 60px rgba(100, 110, 140, 0.2)"};
  }
`;

const TaskInfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 16px;
  background-color: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.04)" : "#f8fafc")};
  border: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0")};
  width: 100%;
  box-sizing: border-box;
`;

const TaskDot = styled.div<{ color?: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color, theme }) => color || theme.primary || "#7851bf"};
  flex-shrink: 0;
`;

const TaskDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
`;

const TaskTitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => (theme.darkmode ? "#f8fafc" : "#0f172a")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TimeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: "Poppins", sans-serif;
  font-size: 11.5px;
  font-weight: 500;
  color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#64748b")};
`;

const PhotoDropzone = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px 16px;
  border-radius: 16px;
  border: 2px dashed ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.16)" : "#cbd5e1")};
  background-color: ${({ theme }) =>
    theme.darkmode ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.01)"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary || "#7851bf"};
    background-color: ${({ theme }) =>
      theme.darkmode ? "rgba(120, 81, 191, 0.08)" : "rgba(120, 81, 191, 0.04)"};
  }
`;

const PhotoIconCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => (theme.primary || "#7851bf") + "18"};
  color: ${({ theme }) => theme.primary || "#7851bf"};
`;

const PhotoPreviewWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.12)" : "#e2e8f0")};
  max-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
`;

const PreviewImage = styled.img`
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  display: block;
`;

const ChangePhotoButton = styled.label`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 12px;
  padding: 5px 14px;
  background-color: rgba(15, 23, 42, 0.75);
  color: #ffffff;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(15, 23, 42, 0.9);
  }
`;

const StyledCommentInput = styled(TextField)`
  width: 100%;
  & .MuiOutlinedInput-root {
    border-radius: 14px;
    background-color: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.04)" : "#ffffff")};
    color: ${({ theme }) => (theme.darkmode ? "#f8fafc" : "#0f172a")};

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
    color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#64748b")};
    font-size: 11px;
    margin-left: 4px;
  }
`;

const SubmitButton = styled(Button)`
  border-radius: 999px;
  padding: 10px 24px;
  font-size: 14.5px;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0.2px;
  background-color: ${({ theme }) => theme.primary || "#7851bf"};
  color: #ffffff;
  box-shadow: 0 4px 14px ${({ theme }) => (theme.primary || "#7851bf") + "40"};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary || "#7851bf"};
    box-shadow: 0 6px 20px ${({ theme }) => (theme.primary || "#7851bf") + "60"};
    transform: translateY(-1px);
  }

  &:disabled {
    box-shadow: none;
    opacity: 0.5;
    background-color: ${({ theme }) => (theme.darkmode ? "#334155" : "#cbd5e1")};
    color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#64748b")};
  }
`;

const CancelButton = styled(Button)`
  border-radius: 999px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  text-transform: none;
  color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#64748b")};

  &:hover {
    background-color: ${({ theme }) =>
      theme.darkmode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)"};
  }
`;
