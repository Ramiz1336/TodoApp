import { useRef, memo, useContext } from "react";
import { Emoji } from "emoji-picker-react";
import { CheckRounded, PushPinRounded, Link, DragIndicatorRounded } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import type { Task, UUID } from "../../types/user";
import { recurrenceSummary } from "../RecurrenceConfig";
import {
  TaskContainer,
  TaskColorIndicator,
  EmojiContainer,
  TaskInfo,
  Pinned,
  RecurrencePill,
  DueDatePill,
  TaskHeader,
  TaskName,
  TaskDescription,
  TaskMetaRow,
  RecurrenceProgress,
  RingAlarm,
  StyledRadio,
  RadioChecked,
  RadioUnchecked,
  TaskCategoriesContainer,
  TaskSideMeta,
  SharedByContainer,
  TaskActionsContainer,
  DragHandle,
  MockupStatusWrap,
  MockupStatusLabel,
  MockupCheckbox,
} from "./tasks.styled";
import { RenderTaskDescription } from "./RenderTaskDescription";
import { CategoryBadge } from "..";
import { UserContext } from "../../contexts/UserContext";
import { TaskContext } from "../../contexts/TaskContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getAppNow } from "../../utils/testingDate";
import { isTaskScheduledOnDate } from "../../utils/taskSchedule";
import { applyTaskCompletion } from "../../utils/taskRecurrence";

interface TaskItemProps {
  task: Task;
  features?: {
    enableLinks?: boolean;
    enableGlow?: boolean;
    enableSelection?: boolean;
    enableMoveMode?: boolean;
    fullDescription?: boolean;
  };
  selection?: {
    selectedIds?: UUID[];
    onSelect?: (taskId: UUID) => void;
    onDeselect?: (taskId: UUID) => void;
  };
  onContextMenu?: (e: React.MouseEvent<Element>) => void;
  actions?: React.ReactNode;
  blur?: boolean;
  textHighlighter?: (text: string) => React.ReactNode;
}

export const TaskItem = memo(
  ({
    task,
    features = {},
    selection,
    onContextMenu,
    actions,
    blur,
    textHighlighter = (text) => text,
  }: TaskItemProps & { draggingId?: string; draggingHeight?: number }) => {
    const { user, setUser } = useContext(UserContext);
    const { settings } = user;
    const { moveMode, handleOpenCompletionDialog } = useContext(TaskContext);

    // dnd-kit sortable logic
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: task.id,
      disabled: !moveMode,
    });

    const itemRef = useRef<HTMLDivElement>(null);

    const {
      enableLinks = true,
      enableGlow = settings.enableGlow,
      enableSelection = false,
      enableMoveMode = false,
    } = features;

    const { selectedIds = [], onSelect, onDeselect } = selection || {};

    const isSelected = selectedIds.includes(task.id);

    const handleSelectChange = (taskId: UUID) => {
      if (isSelected) {
        onDeselect?.(taskId);
      } else {
        onSelect?.(taskId);
      }
    };

    const handleToggleDone = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (task.done) {
        setUser((prevUser) => {
          const updatedTasks = prevUser.tasks.map((t) =>
            t.id === task.id ? applyTaskCompletion(t) : t,
          );
          return { ...prevUser, tasks: updatedTasks };
        });
      } else {
        if (handleOpenCompletionDialog) {
          handleOpenCompletionDialog(task.id);
        } else {
          setUser((prevUser) => {
            const updatedTasks = prevUser.tasks.map((t) =>
              t.id === task.id ? applyTaskCompletion(t) : t,
            );
            return { ...prevUser, tasks: updatedTasks };
          });
        }
      }
    };

    if (!task) {
      return null;
    }

    const formatDeadlineBadge = (deadline: Date | string) => {
      const appNow = getAppNow();
      const today = new Date(appNow).setHours(0, 0, 0, 0);
      const tomorrow = new Date(appNow);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStart = tomorrow.setHours(0, 0, 0, 0);

      const d = new Date(deadline).setHours(0, 0, 0, 0);
      if (d < today) return { label: "Overdue", isUrgent: true };
      if (d === today) return { label: "Due today", isUrgent: true };
      if (d === tomorrowStart) return { label: "Due tomorrow", isUrgent: false };
      return {
        label: `Due ${new Date(deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
        isUrgent: false,
      };
    };

    return (
      <TaskContainer
        ref={(node) => {
          setNodeRef(node);
          itemRef.current = node;
        }}
        id={task.id}
        onContextMenu={onContextMenu}
        backgroundColor={task.color}
        glow={enableGlow && !moveMode}
        done={task.done}
        blur={blur}
        isDragging={isDragging}
        data-testid="task-container"
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          opacity: isDragging ? 0.5 : 1,
          cursor: undefined,
        }}
        {...attributes}
      >
        {enableMoveMode && moveMode && (
          <DragHandle {...listeners}>
            <DragIndicatorRounded sx={{ mr: "4px", ml: "-8px" }} />
          </DragHandle>
        )}

        {enableSelection && selectedIds.length > 0 && (
          <StyledRadio
            clr={task.color}
            checked={isSelected}
            icon={<RadioUnchecked />}
            checkedIcon={<RadioChecked />}
            onChange={() => handleSelectChange(task.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelectChange(task.id);
              }
            }}
            tabIndex={0}
            role="checkbox"
            aria-checked={isSelected}
          />
        )}

        {/* Left colored dot as shown in the approved mockup */}
        <TaskColorIndicator color={task.color} />

        {task.emoji && (
          <EmojiContainer clr={task.color}>
            <Emoji size={22} unified={task.emoji || ""} emojiStyle={user.emojisStyle} lazyLoad />
          </EmojiContainer>
        )}

        <TaskInfo translate="no">
          <TaskHeader>
            <TaskName done={task.done}>{textHighlighter(task.name)}</TaskName>
          </TaskHeader>

          {task.description && (
            <TaskDescription done={task.done}>
              <RenderTaskDescription
                task={task}
                textHighlighter={textHighlighter}
                enableLinks={enableLinks}
                fullDescription={features.fullDescription}
              />
            </TaskDescription>
          )}

          {(task.pinned ||
            task.recurrence ||
            task.deadline ||
            (settings.enableCategories && task.category && task.category.length > 0)) && (
            <TaskMetaRow translate="yes">
              {settings.enableCategories && task.category && (
                <TaskCategoriesContainer>
                  {task.category.map((category) => (
                    <CategoryBadge
                      key={category.id}
                      category={category}
                      sx={{
                        boxShadow: "none",
                        height: "22px",
                        fontSize: "11px",
                        "& .MuiChip-label": { px: "8px" },
                      }}
                    />
                  ))}
                </TaskCategoriesContainer>
              )}

              {task.recurrence && (
                <RecurrencePill clr={task.color}>
                  {task.recurrence === "daily"
                    ? "Daily"
                    : task.recurrence === "weekly"
                      ? "Weekly"
                      : task.recurrence === "monthly"
                        ? "Monthly"
                        : recurrenceSummary(
                            task.recurrence,
                            task.recurrenceDays,
                            task.recurrenceCount,
                          )}
                </RecurrencePill>
              )}

              {task.deadline && (
                <Tooltip
                  title={
                    moveMode && enableMoveMode
                      ? ""
                      : new Intl.DateTimeFormat(navigator.language, {
                          dateStyle: "full",
                          timeStyle: "medium",
                        }).format(new Date(task.deadline))
                  }
                  placement="bottom-start"
                >
                  <span>
                    <DueDatePill
                      isUrgent={formatDeadlineBadge(task.deadline).isUrgent && !task.done}
                    >
                      <RingAlarm
                        sx={{ fontSize: 13 }}
                        animate={getAppNow() > new Date(task.deadline) && !task.done}
                      />
                      {formatDeadlineBadge(task.deadline).label}
                    </DueDatePill>
                  </span>
                </Tooltip>
              )}

              {task.pinned && (
                <Pinned>
                  <PushPinRounded sx={{ fontSize: 13, transform: "rotate(45deg)" }} />
                </Pinned>
              )}
            </TaskMetaRow>
          )}

          {task.sharedBy && (
            <SharedByContainer translate="yes">
              <Link sx={{ fontSize: 14 }} /> Shared by{" "}
              <span translate={task.sharedBy === "User" ? "yes" : "no"}>{task.sharedBy}</span>
            </SharedByContainer>
          )}
        </TaskInfo>

        <TaskActionsContainer>
          <TaskSideMeta>
            {task.recurrence &&
              (task.recurrence === "weekly" || task.recurrence === "monthly") &&
              (task.recurrenceCount ?? 1) > 1 &&
              !(task.recurrence === "weekly" && isTaskScheduledOnDate(task, getAppNow())) && (
                <RecurrenceProgress
                  aria-label={`${task.recurrenceCompletedCount ?? 0} of ${task.recurrenceCount} completed`}
                >
                  {Math.min(task.recurrenceCompletedCount ?? 0, task.recurrenceCount ?? 1)}/
                  {task.recurrenceCount}
                </RecurrenceProgress>
              )}
          </TaskSideMeta>

          {/* Exact Mockup Status Indicator (DONE / PENDING + Styled Checkbox) */}
          <MockupStatusWrap onClick={handleToggleDone}>
            <MockupStatusLabel done={task.done}>{task.done ? "DONE" : "PENDING"}</MockupStatusLabel>
            <MockupCheckbox done={task.done} color={task.color}>
              {task.done && <CheckRounded sx={{ fontSize: 16 }} />}
            </MockupCheckbox>
          </MockupStatusWrap>

          {actions}
        </TaskActionsContainer>
      </TaskContainer>
    );
  },
);
