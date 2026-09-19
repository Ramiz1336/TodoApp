import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  AccessTimeRounded,
  AddPhotoAlternateRounded,
  CameraswitchRounded,
  CheckRounded,
  CloseRounded,
  DeleteOutlineRounded,
  PhotoCameraRounded,
  TaskAltRounded,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Emoji } from "emoji-picker-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
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

  // Live Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setIsCameraLoading(false);
  };

  const startCamera = async (mode: "user" | "environment" = facingMode) => {
    stopCamera();
    setIsCameraLoading(true);
    setCompletionPhotoError(null);

    // If browser doesn't support getUserMedia, directly trigger native camera input
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsCameraLoading(false);
      nativeCameraInputRef.current?.click();
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      console.warn("In-app live camera not available or permission denied:", err);
      stopCamera();
      // Graceful fallback to native device camera app
      if (nativeCameraInputRef.current) {
        nativeCameraInputRef.current.click();
      } else {
        setCompletionPhotoError(
          "Camera access is not available. Please allow camera permissions or upload a photo from files.",
        );
      }
    } finally {
      setIsCameraLoading(false);
    }
  };

  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [isCameraActive]);

  useEffect(() => {
    if (completionDialogOpen) {
      setCompletionPhoto(null);
      setCompletionPhotoError(null);
      setCompletionComment("");
      setIsCameraActive(false);
    } else {
      stopCamera();
    }
  }, [completionDialogOpen]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const selectedTask = useMemo(() => {
    return tasks.find((task) => task.id === selectedTaskId) || ({} as Task);
  }, [selectedTaskId, tasks]);

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      const canvas = document.createElement("canvas");
      const videoWidth = video.videoWidth || 640;
      const videoHeight = video.videoHeight || 480;
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (facingMode === "user") {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      stopCamera();
      setCompletionPhoto(dataUrl);
      setCompletionPhotoError(null);
    } catch (err) {
      console.error("Capture photo error:", err);
      setCompletionPhotoError("Failed to capture photo from camera. Please try again.");
    }
  };

  const handleFlipCamera = () => {
    const nextMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

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
      stopCamera();
      setCompletionPhoto(await fileToBase64(file));
      setCompletionPhotoError(null);
    } catch {
      setCompletionPhotoError("The photo could not be read. Please try another image.");
    }
  };

  const finishTask = async () => {
    if (!selectedTaskId) return;

    setIsSavingCompletion(true);
    try {
      let completionPhotoId: string | undefined = undefined;
      if (completionPhoto) {
        completionPhotoId = await saveTaskCompletionPhoto(completionPhoto);
      }

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
      stopCamera();
      setCompletionDialogOpen(false);
      setCompletionPhoto(null);
      setCompletionPhotoError(null);
      setCompletionComment("");
    } catch (error) {
      console.error("Failed to save task completion:", error);
      setCompletionPhotoError("Failed to save task completion. Please try again.");
    } finally {
      setIsSavingCompletion(false);
    }
  };

  const handleClose = () => {
    if (!isSavingCompletion) {
      stopCamera();
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

        {/* Live Camera Viewfinder OR Attached Photo Preview OR Selection Buttons */}
        {isCameraActive ? (
          <LiveCameraContainer>
            <LiveCameraVideo
              ref={videoRef}
              autoPlay
              playsInline
              muted
              isMirrored={facingMode === "user"}
            />
            <CameraTopBar>
              <CameraLiveBadge>
                <CameraPulsingDot /> Live Camera
              </CameraLiveBadge>
              <CameraControlsRow>
                <CameraIconButton onClick={handleFlipCamera} title="Flip camera">
                  <CameraswitchRounded sx={{ fontSize: 19 }} />
                </CameraIconButton>
                <CameraIconButton onClick={stopCamera} title="Close camera">
                  <CloseRounded sx={{ fontSize: 19 }} />
                </CameraIconButton>
              </CameraControlsRow>
            </CameraTopBar>

            <CameraBottomBar>
              <ShutterButton onClick={capturePhoto} title="Take photo">
                <ShutterInnerCircle />
              </ShutterButton>
              <SwitchToNativeBtn onClick={() => nativeCameraInputRef.current?.click()}>
                Use device camera app
              </SwitchToNativeBtn>
            </CameraBottomBar>
          </LiveCameraContainer>
        ) : completionPhoto ? (
          <PhotoPreviewWrapper>
            <PreviewImage src={completionPhoto} alt="Completion proof preview" />
            <PreviewTopBadge>
              <CheckRounded sx={{ fontSize: 14 }} /> Photo Attached
            </PreviewTopBadge>
            <PreviewActionsRow>
              <PreviewActionButton onClick={() => startCamera("environment")}>
                <PhotoCameraRounded sx={{ fontSize: 15 }} /> Retake
              </PreviewActionButton>
              <PreviewActionButton onClick={() => galleryInputRef.current?.click()}>
                <AddPhotoAlternateRounded sx={{ fontSize: 15 }} /> Choose File
              </PreviewActionButton>
              <PreviewActionButton
                danger
                onClick={() => {
                  setCompletionPhoto(null);
                  setCompletionPhotoError(null);
                }}
              >
                <DeleteOutlineRounded sx={{ fontSize: 15 }} /> Remove
              </PreviewActionButton>
            </PreviewActionsRow>
          </PhotoPreviewWrapper>
        ) : (
          <PhotoOptionsCard>
            <PhotoSectionLabel>
              Add Photo Proof <OptionalTag>(Optional)</OptionalTag>
            </PhotoSectionLabel>

            <PhotoButtonsGrid>
              <PhotoActionButton
                onClick={() => startCamera("environment")}
                disabled={isCameraLoading}
              >
                <PhotoActionIconWrap clr={theme.primary || "#7851bf"}>
                  {isCameraLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <PhotoCameraRounded sx={{ fontSize: 24 }} />
                  )}
                </PhotoActionIconWrap>
                <PhotoActionTextWrap>
                  <PhotoActionTitle>Take Photo</PhotoActionTitle>
                  <PhotoActionSubtitle>Use Camera</PhotoActionSubtitle>
                </PhotoActionTextWrap>
              </PhotoActionButton>

              <PhotoActionButton onClick={() => galleryInputRef.current?.click()}>
                <PhotoActionIconWrap clr="#3b82f6">
                  <AddPhotoAlternateRounded sx={{ fontSize: 24 }} />
                </PhotoActionIconWrap>
                <PhotoActionTextWrap>
                  <PhotoActionTitle>Upload</PhotoActionTitle>
                  <PhotoActionSubtitle>Gallery / Files</PhotoActionSubtitle>
                </PhotoActionTextWrap>
              </PhotoActionButton>
            </PhotoButtonsGrid>
          </PhotoOptionsCard>
        )}

        {/* Hidden File Inputs */}
        <input
          ref={nativeCameraInputRef}
          hidden
          accept="image/*"
          capture="environment"
          type="file"
          onChange={handleCompletionPhoto}
        />
        <input
          ref={galleryInputRef}
          hidden
          accept="image/png,image/jpeg,image/webp"
          type="file"
          onChange={handleCompletionPhoto}
        />

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
          onClick={finishTask}
          disabled={isSavingCompletion || isCameraActive}
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

/* Photo Options Card */
const PhotoOptionsCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  border-radius: 18px;
  background-color: ${({ theme }) =>
    theme.darkmode ? "rgba(255, 255, 255, 0.03)" : "rgba(241, 245, 249, 0.8)"};
  border: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0")};
  box-sizing: border-box;
`;

const PhotoSectionLabel = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  color: ${({ theme }) => (theme.darkmode ? "#cbd5e1" : "#475569")};
  display: flex;
  align-items: center;
  gap: 6px;
`;

const OptionalTag = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#64748b")};
`;

const PhotoButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
`;

const PhotoActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 14px;
  background-color: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.05)" : "#ffffff")};
  border: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.1)" : "#cbd5e1")};
  color: ${({ theme }) => (theme.darkmode ? "#f8fafc" : "#0f172a")};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  text-align: left;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.primary || "#7851bf"};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PhotoActionIconWrap = styled.div<{ clr: string }>`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ clr }) => clr}18;
  color: ${({ clr }) => clr};
  flex-shrink: 0;
`;

const PhotoActionTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const PhotoActionTitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
`;

const PhotoActionSubtitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 11px;
  color: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#64748b")};
  margin-top: 2px;
`;

/* Live Camera Viewfinder */
const LiveCameraContainer = styled.div`
  position: relative;
  width: 100%;
  height: 260px;
  border-radius: 18px;
  overflow: hidden;
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
`;

const LiveCameraVideo = styled.video<{ isMirrored?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: ${({ isMirrored }) => (isMirrored ? "scaleX(-1)" : "none")};
`;

const CameraTopBar = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;

const CameraLiveBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

const CameraPulsingDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #ef4444;
  box-shadow: 0 0 8px #ef4444;
`;

const CameraControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CameraIconButton = styled(IconButton)`
  background-color: rgba(0, 0, 0, 0.55);
  color: #ffffff;
  backdrop-filter: blur(8px);
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.15);

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const CameraBottomBar = styled.div`
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 10;
`;

const ShutterButton = styled.button`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 3.5px solid #ffffff;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  outline: none;
  transition: transform 0.15s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);

  &:active {
    transform: scale(0.92);
  }
`;

const ShutterInnerCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #ffffff;
  transition: background-color 0.15s;

  &:hover {
    background: #f1f5f9;
  }
`;

const SwitchToNativeBtn = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-family: "Poppins", sans-serif;
  font-size: 11px;
  text-decoration: underline;
  cursor: pointer;
  padding: 2px 6px;

  &:hover {
    color: #ffffff;
  }
`;

/* Photo Preview Wrapper */
const PhotoPreviewWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.12)" : "#e2e8f0")};
  background-color: #0f172a;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
`;

const PreviewImage = styled.img`
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  display: block;
`;

const PreviewTopBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 999px;
  background-color: rgba(16, 185, 129, 0.9);
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-size: 11.5px;
  font-weight: 600;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
`;

const PreviewActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px 10px;
  background-color: ${({ theme }) => (theme.darkmode ? "rgba(15, 23, 42, 0.9)" : "#ffffff")};
  border-top: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0")};
`;

const PreviewActionButton = styled.button<{ danger?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 999px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
  background-color: ${({ danger, theme }) =>
    danger ? "rgba(239, 68, 68, 0.12)" : theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#f1f5f9"};
  color: ${({ danger, theme }) => (danger ? "#ef4444" : theme.darkmode ? "#cbd5e1" : "#334155")};
  border: 1px solid
    ${({ danger, theme }) =>
      danger
        ? "rgba(239, 68, 68, 0.25)"
        : theme.darkmode
          ? "rgba(255, 255, 255, 0.12)"
          : "#cbd5e1"};

  &:hover {
    background-color: ${({ danger }) => (danger ? "#ef4444" : "#e2e8f0")};
    color: ${({ danger }) => (danger ? "#ffffff" : "inherit")};
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
