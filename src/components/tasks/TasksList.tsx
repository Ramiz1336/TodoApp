import { useTheme } from "@emotion/react";
import {
  CancelRounded,
  Close,
  Delete,
  DoneAll,
  Search,
  RadioButtonChecked,
  MoreHoriz,
  MoveUpRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCallback, useContext, useEffect, useMemo, useState, memo, useRef } from "react";
import { CustomDialogTitle, EditTask, TaskItem } from "..";
import { TaskContext } from "../../contexts/TaskContext";
import { UserContext } from "../../contexts/UserContext";
import { useResponsiveDisplay } from "../../hooks/useResponsiveDisplay";
import { useStorageState } from "../../hooks/useStorageState";
import { DialogBtn } from "../../styles";
import { ColorPalette } from "../../theme/themeConfig";
import type { Category, Task, UUID } from "../../types/user";
import { getFontColor, recordTaskCompletions, showToast } from "../../utils";
import {
  NoTasks,
  RingAlarm,
  SearchClear,
  SearchInput,
  TaskActionContainer,
  TasksContainer,
  CategoriesListContainer,
  TaskNotFound,
} from "./tasks.styled";
import { TaskMenu } from "./TaskMenu";
import { TaskIcon } from "../TaskIcon";
import { useToasterStore } from "react-hot-toast";
import { TaskSort } from "./TaskSort";
import { getAppNow } from "../../utils/testingDate";
import { completeTask } from "../../utils/taskRecurrence";
import { isTaskScheduledOnDate, isWeeklyTaskVisibleOnDate } from "../../utils/taskSchedule";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  DragOverlay,
  MeasuringStrategy,
  DragStartEvent,
  useSensors,
  useSensor,
  TouchSensor,
  MouseSensor,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";
import DisabledThemeProvider from "../../contexts/DisabledThemeProvider";

const TaskMenuButton = memo(
  ({
    onClick,
    open = false,
  }: {
    task?: Task;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    open?: boolean;
  }) => (
    <IconButton
      id="task-menu-button"
      aria-label="Task Menu"
      aria-controls="task-menu"
      aria-haspopup="true"
      aria-expanded={open}
      onClick={onClick}
      sx={{ color: "inherit", opacity: 0.65, "&:hover": { opacity: 1 }, p: "4px" }}
    >
      <MoreHoriz sx={{ fontSize: 22 }} />
    </IconButton>
  ),
);

export const TasksList: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const {
    selectedTaskId,
    setSelectedTaskId,
    anchorEl,
    setAnchorEl,
    setAnchorPosition,
    search,
    setSearch,
    highlightMatchingText,
    multipleSelectedTasks,
    setMultipleSelectedTasks,
    handleSelectTask,
    editModalOpen,
    setEditModalOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    sortOption,
    moveMode,
    setMoveMode,
  } = useContext(TaskContext);
  const open = Boolean(anchorEl);

  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const [deleteSelectedOpen, setDeleteSelectedOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[] | undefined>(undefined);
  const [selectedCatId, setSelectedCatId] = useStorageState<UUID | undefined>(
    undefined,
    "selectedCategory",
    "sessionStorage",
  );
  const [categoryCounts, setCategoryCounts] = useState<{
    [categoryId: UUID]: number;
  }>({});
  const [activeDragId, setActiveDragId] = useState<UniqueIdentifier | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const isMobile = useResponsiveDisplay();
  const theme = useTheme();
  const { toasts } = useToasterStore();

  const listFormat = useMemo(
    () =>
      new Intl.ListFormat("en-US", {
        style: "long",
        type: "conjunction",
      }),
    [],
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>, taskId: UUID) => {
    const target = event.target as HTMLElement;
    if (target.closest("#task-description-link")) {
      return;
    }

    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);

    setAnchorPosition({
      top: event.clientY,
      left: event.clientX,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const reorderTasks = useCallback(
    (tasks: Task[]): Task[] => {
      let pinnedTasks = tasks.filter((task) => task.pinned);
      let unpinnedTasks = tasks.filter((task) => !task.pinned);

      if (selectedCatId !== undefined) {
        const categoryFilter = (task: Task) =>
          task.category?.some((category) => category.id === selectedCatId) ?? false;
        unpinnedTasks = unpinnedTasks.filter(categoryFilter);
        pinnedTasks = pinnedTasks.filter(categoryFilter);
      }

      const searchLower = search.toLowerCase();
      const searchFilter = (task: Task) =>
        task.name.toLowerCase().includes(searchLower) ||
        (task.description && task.description.toLowerCase().includes(searchLower));
      unpinnedTasks = unpinnedTasks.filter(searchFilter);
      pinnedTasks = pinnedTasks.filter(searchFilter);

      const sortTasks = (tasks: Task[]) => {
        switch (sortOption) {
          case "dateCreated":
            return [...tasks].sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            );
          case "dueDate":
            return [...tasks].sort((a, b) => {
              if (!a.deadline) return 1;
              if (!b.deadline) return -1;
              return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
            });
          case "alphabetical":
            return [...tasks].sort((a, b) => a.name.localeCompare(b.name));
          case "custom":
            return [...tasks].sort((a, b) => {
              if (a.position != null && b.position != null) return a.position - b.position;
              if (a.position == null && b.position != null) return 1;
              if (a.position != null && b.position == null) return -1;
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            });

          default:
            return tasks;
        }
      };

      unpinnedTasks = sortTasks(unpinnedTasks);
      pinnedTasks = sortTasks(pinnedTasks);

      if (user.settings?.doneToBottom) {
        const doneTasks = unpinnedTasks.filter((task) => task.done);
        const notDoneTasks = unpinnedTasks.filter((task) => !task.done);
        return [...pinnedTasks, ...notDoneTasks, ...doneTasks];
      }

      return [...pinnedTasks, ...unpinnedTasks];
    },
    [search, selectedCatId, user.settings?.doneToBottom, sortOption],
  );

  const orderedTasks = useMemo(() => reorderTasks(user.tasks), [user.tasks, reorderTasks]);

  const confirmDeleteTask = () => {
    if (!selectedTaskId) {
      return;
    }
    setUser((prevUser) => ({
      ...prevUser,
      tasks: prevUser.tasks.filter((task) => task.id !== selectedTaskId),
      deletedTasks: (prevUser.deletedTasks ?? []).includes(selectedTaskId)
        ? (prevUser.deletedTasks ?? [])
        : [...(prevUser.deletedTasks ?? []), selectedTaskId],
    }));
    setDeleteDialogOpen(false);
    showToast(
      <div>
        Deleted Task - <b translate="no">{taskToDelete?.name}</b>
      </div>,
    );
    setTaskToDelete(null);
  };

  useEffect(() => {
    if (selectedTaskId && deleteDialogOpen) {
      const task = user.tasks.find((t) => t.id === selectedTaskId);
      setTaskToDelete(task || null);
    }
  }, [selectedTaskId, deleteDialogOpen, user.tasks]);

  const cancelDeleteTask = () => {
    setDeleteDialogOpen(false);
  };

  const handleMarkSelectedAsDone = () => {
    setUser((prevUser) => {
      const selectedTasks = prevUser.tasks.filter((task) =>
        multipleSelectedTasks.includes(task.id),
      );
      const updatedTasks = prevUser.tasks.map((task) =>
        multipleSelectedTasks.includes(task.id) ? completeTask(task) : task,
      );
      return recordTaskCompletions(
        { ...prevUser, tasks: updatedTasks },
        selectedTasks.filter((task) => !task.done),
      );
    });
    setMultipleSelectedTasks([]);
  };

  const handleDeleteSelected = () => setDeleteSelectedOpen(true);

  useEffect(() => {
    const tasks: Task[] = orderedTasks;
    const uniqueCategories: Category[] = [];

    tasks.forEach((task) => {
      if (task.category) {
        task.category.forEach((category) => {
          if (!uniqueCategories.some((c) => c.id === category.id)) {
            uniqueCategories.push(category);
          }
        });
      }
    });

    const counts: { [categoryId: UUID]: number } = {};
    uniqueCategories.forEach((category) => {
      const categoryTasks = tasks.filter((task) =>
        task.category?.some((cat) => cat.id === category.id),
      );
      counts[category.id] = categoryTasks.length;
    });

    uniqueCategories.sort((a, b) => {
      const countA = counts[a.id] || 0;
      const countB = counts[b.id] || 0;

      if (countB !== countA) {
        return countB - countA;
      }

      return (a.name || "").localeCompare(b.name || "");
    });

    setCategories(uniqueCategories);
    setCategoryCounts(counts);
  }, [user.tasks, search, setCategories, setCategoryCounts, orderedTasks]);

  const checkOverdueTasks = useCallback(
    (tasks: Task[]) => {
      if (location.pathname === "/share") {
        return;
      }

      const overdueTasks = tasks.filter(
        (task) => task.deadline && getAppNow() > new Date(task.deadline) && !task.done,
      );

      if (overdueTasks.length > 0) {
        const taskNames = overdueTasks.map((task) => task.name);

        showToast(
          <div translate="no" style={{ wordBreak: "break-word" }}>
            <b translate="yes">Overdue task{overdueTasks.length > 1 && "s"}: </b>
            {listFormat.format(taskNames)}
          </div>,
          {
            id: "overdue-tasks",
            type: "error",
            disableVibrate: true,
            preventDuplicate: true,
            visibleToasts: toasts,
            duration: 3400,
            icon: <RingAlarm animate sx={{ color: ColorPalette.red }} />,
            style: {
              borderColor: ColorPalette.red,
              boxShadow: user.settings.enableGlow ? `0 0 18px -8px ${ColorPalette.red}` : "none",
            },
          },
        );
      }
    },
    [listFormat, toasts, user.settings.enableGlow],
  );

  useEffect(() => {
    checkOverdueTasks(user.tasks);
  }, []);

  const dndKitSensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const allTasksInCustomOrder = [...user.tasks].sort((a, b) => {
      if (a.position != null && b.position != null) return a.position - b.position;
      if (a.position == null && b.position != null) return 1;
      if (a.position != null && b.position == null) return -1;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    const oldIndex = allTasksInCustomOrder.findIndex((task) => task.id === active.id);
    const newIndex = allTasksInCustomOrder.findIndex((task) => task.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newOrdered = arrayMove(allTasksInCustomOrder, oldIndex, newIndex);
    const updatedTasks = user.tasks.map((task) => {
      const idx = newOrdered.findIndex((t) => t.id === task.id);
      return idx !== -1 ? { ...task, position: idx, lastSave: new Date() } : task;
    });
    setUser((prevUser) => ({
      ...prevUser,
      tasks: updatedTasks,
    }));
    requestAnimationFrame(() => {
      setActiveDragId(null);
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  };

  const renderTask = (task: Task) => (
    <TaskItem
      key={task.id}
      task={task}
      features={{
        enableLinks: true,
        enableGlow: user.settings.enableGlow,
        enableSelection: true,
        enableMoveMode: true,
      }}
      selection={{
        selectedIds: multipleSelectedTasks,
        onSelect: handleSelectTask,
        onDeselect: (taskId) =>
          setMultipleSelectedTasks((prevTasks) => prevTasks.filter((id) => id !== taskId)),
      }}
      onContextMenu={(e: React.MouseEvent<Element>) => {
        handleClick(e as unknown as React.MouseEvent<HTMLElement>, task.id);
      }}
      actions={
        <TaskMenuButton
          task={task}
          open={open && selectedTaskId === task.id}
          onClick={(event) => handleClick(event, task.id)}
        />
      }
      blur={selectedTaskId !== task.id && open && !isMobile}
      textHighlighter={highlightMatchingText}
    />
  );

  const renderSection = (title: string, sectionTasks: Task[]) =>
    sectionTasks.length > 0 ? (
      <Box key={title} sx={{ mt: 2.5 }}>
        <Typography
          component="h2"
          sx={{
            fontWeight: 800,
            fontSize: "18px",
            mb: 1.2,
            color: "var(--text-dark)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {title} {title === "Pinned" ? "📌" : ""}
        </Typography>
        {sectionTasks.map(renderTask)}
      </Box>
    ) : null;

  const currentWeekday = getAppNow().getDay();
  const pinnedTasks = orderedTasks.filter((task) => task.pinned && !task.done);
  const activeDailyTasks = orderedTasks.filter((task) => {
    if (task.done || task.recurrence === "monthly" || task.pinned) {
      return false;
    }

    if (task.recurrence === "weekly") {
      return isTaskScheduledOnDate(task, getAppNow());
    }

    if (task.recurrence !== "daily" || !task.recurrenceDays?.length) {
      return true;
    }

    return task.recurrenceDays.includes(currentWeekday);
  });
  const activeWeeklyTasks = orderedTasks.filter(
    (task) =>
      !task.pinned &&
      isWeeklyTaskVisibleOnDate(task, getAppNow()) &&
      !isTaskScheduledOnDate(task, getAppNow()),
  );
  const activeMonthlyTasks = orderedTasks.filter(
    (task) => !task.pinned && !task.done && task.recurrence === "monthly",
  );
  const completedTasks = orderedTasks.filter((task) => task.done && task.recurrence !== "weekly");

  return (
    <>
      <TaskMenu />
      <TasksContainer style={{ marginTop: "4px" }}>
        {/* Categories Chip Row with exact mockup look: All is filled purple, others are clean pill outlines */}
        {user.settings.enableCategories && (
          <CategoriesListContainer>
            <Button
              onClick={() => setSelectedCatId(undefined)}
              sx={{
                borderRadius: "999px",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 600,
                px: 2.2,
                py: 0.6,
                minHeight: "36px",
                backgroundColor:
                  selectedCatId === undefined
                    ? theme.primary || "#7851bf"
                    : theme.darkmode
                      ? "rgba(255,255,255,0.05)"
                      : "#ffffff",
                color:
                  selectedCatId === undefined ? "#ffffff" : theme.darkmode ? "#f8fafc" : "#1e293b",
                border: "1.5px solid",
                borderColor:
                  selectedCatId === undefined
                    ? theme.primary || "#7851bf"
                    : theme.darkmode
                      ? "rgba(255,255,255,0.2)"
                      : "#1e293b",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor:
                    selectedCatId === undefined
                      ? theme.primary || "#7851bf"
                      : "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              All
            </Button>
            {categories?.map((cat) => {
              const isSelected = selectedCatId === cat.id;
              return (
                <Button
                  key={cat.id}
                  onClick={() => setSelectedCatId(isSelected ? undefined : cat.id)}
                  sx={{
                    borderRadius: "999px",
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                    px: 2.2,
                    py: 0.6,
                    minHeight: "36px",
                    backgroundColor: isSelected
                      ? theme.primary || "#7851bf"
                      : theme.darkmode
                        ? "rgba(255,255,255,0.05)"
                        : "#ffffff",
                    color: isSelected ? "#ffffff" : theme.darkmode ? "#f8fafc" : "#1e293b",
                    border: "1.5px solid",
                    borderColor: isSelected
                      ? theme.primary || "#7851bf"
                      : theme.darkmode
                        ? "rgba(255,255,255,0.2)"
                        : "#1e293b",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: isSelected
                        ? theme.primary || "#7851bf"
                        : "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  {cat.name}
                  {categoryCounts[cat.id] != null && categoryCounts[cat.id] > 0 && (
                    <span style={{ fontSize: "11px", opacity: 0.8, marginLeft: "4px" }}>
                      ({categoryCounts[cat.id]})
                    </span>
                  )}
                </Button>
              );
            })}
          </CategoriesListContainer>
        )}

        {multipleSelectedTasks.length > 0 && (
          <TaskActionContainer>
            <div>
              <h3>
                <RadioButtonChecked /> &nbsp; Selected {multipleSelectedTasks.length} task
                {multipleSelectedTasks.length > 1 ? "s" : ""}
              </h3>
              <span translate="no" style={{ fontSize: "14px", opacity: 0.8 }}>
                {listFormat.format(
                  multipleSelectedTasks
                    .map((taskId) => user.tasks.find((task) => task.id === taskId)?.name)
                    .filter((taskName) => taskName !== undefined) as string[],
                )}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Tooltip title="Mark selected as done">
                <IconButton
                  sx={{ color: getFontColor(theme.secondary) }}
                  size="large"
                  onClick={handleMarkSelectedAsDone}
                >
                  <DoneAll />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete selected">
                <IconButton color="error" size="large" onClick={handleDeleteSelected}>
                  <Delete />
                </IconButton>
              </Tooltip>
              <Tooltip sx={{ color: getFontColor(theme.secondary) }} title="Cancel">
                <IconButton size="large" onClick={() => setMultipleSelectedTasks([])}>
                  <CancelRounded />
                </IconButton>
              </Tooltip>
            </div>
          </TaskActionContainer>
        )}

        {moveMode && (
          <TaskActionContainer>
            <div>
              <h3>
                <MoveUpRounded /> &nbsp; Move Mode Enabled
              </h3>
              <span>Organize tasks by dragging and dropping.</span>
            </div>
            <Button variant="contained" onClick={() => setMoveMode(false)}>
              Done
            </Button>
          </TaskActionContainer>
        )}

        {/* Task Sections */}
        {user.tasks.length !== 0 ? (
          moveMode ? (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              modifiers={[restrictToVerticalAxis, restrictToParentElement]}
              measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
              sensors={dndKitSensors}
            >
              <SortableContext
                items={orderedTasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}
              >
                {orderedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    features={{
                      enableLinks: true,
                      enableGlow: user.settings.enableGlow,
                      enableSelection: true,
                      enableMoveMode: true,
                    }}
                    selection={{
                      selectedIds: multipleSelectedTasks,
                      onSelect: handleSelectTask,
                      onDeselect: (taskId) =>
                        setMultipleSelectedTasks((prevTasks) =>
                          prevTasks.filter((id) => id !== taskId),
                        ),
                    }}
                    onContextMenu={(e: React.MouseEvent<Element>) => {
                      handleClick(e as unknown as React.MouseEvent<HTMLElement>, task.id);
                    }}
                    actions={
                      <TaskMenuButton
                        task={task}
                        open={open && selectedTaskId === task.id}
                        onClick={(event) => handleClick(event, task.id)}
                      />
                    }
                    blur={selectedTaskId !== task.id && open && !isMobile}
                  />
                ))}
              </SortableContext>
              <DragOverlay
                dropAnimation={{
                  duration: 250,
                  easing: "ease-in-out",
                }}
              >
                {activeDragId ? (
                  <TaskItem
                    task={orderedTasks.find((t) => t.id === activeDragId)!}
                    features={{
                      enableLinks: true,
                      enableGlow: user.settings.enableGlow,
                      enableSelection: false,
                      enableMoveMode: true,
                    }}
                    blur={false}
                    actions={
                      <TaskMenuButton
                        task={orderedTasks.find((t) => t.id === activeDragId)!}
                        open={false}
                        onClick={(event) =>
                          handleClick(event, orderedTasks.find((t) => t.id === activeDragId)!.id)
                        }
                      />
                    }
                  />
                ) : null}
              </DragOverlay>
            </DndContext>
          ) : (
            <>
              {renderSection("Pinned", pinnedTasks)}
              {renderSection("Daily", activeDailyTasks)}
              {renderSection("Weekly", activeWeeklyTasks)}
              {renderSection("Monthly", activeMonthlyTasks)}
              {renderSection("Completed", completedTasks)}
            </>
          )
        ) : (
          <NoTasks>
            <span>You don't have any tasks yet</span>
            <br />
            Click on the <span>+</span> button to add one
          </NoTasks>
        )}

        {search && orderedTasks.length === 0 && user.tasks.length > 0 ? (
          <TaskNotFound>
            <b>No tasks found</b>
            <br />
            Try searching with different keywords.
            <div style={{ marginTop: "14px" }}>
              <TaskIcon scale={0.8} />
            </div>
          </TaskNotFound>
        ) : null}

        {/* Search Bar at the bottom of the list matching exact mockup: pill input with search icon + Showing X tasks */}
        {user.tasks.length > 0 && (
          <Box sx={{ mt: 4, mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <DisabledThemeProvider>
                <SearchInput
                  inputRef={searchRef}
                  color="primary"
                  placeholder="Search tasks..."
                  autoComplete="off"
                  value={search}
                  disabled={moveMode}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: "var(--text-muted)", fontSize: 22 }} />
                        </InputAdornment>
                      ),
                      endAdornment: search ? (
                        <InputAdornment position="end">
                          <SearchClear
                            color={
                              orderedTasks.length === 0 && user.tasks.length > 0
                                ? "error"
                                : "default"
                            }
                            onClick={() => setSearch("")}
                          >
                            <Close
                              sx={{
                                color:
                                  orderedTasks.length === 0 && user.tasks.length > 0
                                    ? `${ColorPalette.red} !important`
                                    : "var(--text-muted)",
                                fontSize: 18,
                              }}
                            />
                          </SearchClear>
                        </InputAdornment>
                      ) : undefined,
                    },
                  }}
                />
                <TaskSort />
              </DisabledThemeProvider>
            </Box>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "13px",
                color: "var(--text-muted)",
                mt: 1.5,
              }}
            >
              Showing {orderedTasks.length} task{orderedTasks.length !== 1 ? "s" : ""}
            </Typography>
          </Box>
        )}

        <EditTask
          open={editModalOpen}
          task={user.tasks.find((task) => task.id === selectedTaskId)}
          onClose={() => setEditModalOpen(false)}
        />
      </TasksContainer>
      <Dialog open={deleteDialogOpen} onClose={cancelDeleteTask}>
        <CustomDialogTitle
          title="Delete Task"
          subTitle="Are you sure you want to delete this task?"
          onClose={cancelDeleteTask}
          icon={<Delete />}
        />
        <DialogContent>
          {taskToDelete && (
            <TaskItem
              task={taskToDelete}
              features={{
                enableGlow: false,
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <DialogBtn onClick={cancelDeleteTask} color="primary">
            Cancel
          </DialogBtn>
          <DialogBtn onClick={confirmDeleteTask} color="error">
            Delete
          </DialogBtn>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteSelectedOpen} onClose={() => setDeleteSelectedOpen(false)}>
        <CustomDialogTitle
          title="Delete Selected Tasks"
          subTitle="Are you sure you want to delete selected tasks?"
          onClose={() => setDeleteSelectedOpen(false)}
          icon={<Delete />}
        />
        <DialogActions>
          <DialogBtn onClick={() => setDeleteSelectedOpen(false)} color="primary">
            Cancel
          </DialogBtn>
          <DialogBtn
            onClick={() => {
              setUser((prevUser) => ({
                ...prevUser,
                tasks: prevUser.tasks.filter((task) => !multipleSelectedTasks.includes(task.id)),
                deletedTasks: [...(prevUser.deletedTasks ?? []), ...multipleSelectedTasks],
              }));
              setMultipleSelectedTasks([]);
              setDeleteSelectedOpen(false);
              showToast(
                <div>
                  Deleted <b>{multipleSelectedTasks.length}</b> tasks
                </div>,
              );
            }}
            color="error"
          >
            Delete
          </DialogBtn>
        </DialogActions>
      </Dialog>
    </>
  );
};
