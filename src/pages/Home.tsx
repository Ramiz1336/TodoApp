import { useContext, useMemo, lazy, Suspense, useEffect, useState } from "react";
import {
  AddButton,
  Offline,
  ProgressSectionWrapper,
  ProgressHeaderRow,
  ProgressTitle,
  ProgressCountText,
  ProgressBarTrack,
  ProgressBarFill,
  ProgressSubtitle,
  ProgressCloseBtn,
  HomeContainer,
  HomeTopBar,
  HomeMenuBtn,
  HomeDateDisplay,
  HomeTitleSection,
  HomePageTitle,
  HomePageSubtitle,
  HomeAccentLine,
} from "../styles";

import { Box, Button, CircularProgress, Popover, Tooltip } from "@mui/material";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import {
  AddRounded,
  ArrowBackRounded,
  CloseRounded,
  UndoRounded,
  WifiOff,
} from "@mui/icons-material";
import { UserContext } from "../contexts/UserContext";
import { useResponsiveDisplay } from "../hooks/useResponsiveDisplay";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils";
import { TestingDateControl } from "../components/TestingDateControl";
import { getAppNow, getTestingDate } from "../utils/testingDate";
import { getScheduledRecurringTasks, isCountedInDailyPerformance } from "../utils/taskSchedule";

const TasksList = lazy(() =>
  import("../components/tasks/TasksList").then((module) => ({ default: module.TasksList })),
);

const formatHomeHeaderDate = (d: Date): string => {
  const dayName = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const dayNum = d.getDate();
  const monthName = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const year = d.getFullYear();
  return `${dayName}  /  ${dayNum}  ${monthName}  ${year}`;
};

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const { tasks, settings, name } = user;

  const isOnline = useOnlineStatus();
  const n = useNavigate();
  const isMobile = useResponsiveDisplay();
  const [testDateAnchor, setTestDateAnchor] = useState<HTMLElement | null>(null);

  useEffect(() => {
    document.title = "Todo App";
  }, []);

  // Calculate these values only when tasks change
  const taskStats = useMemo(() => {
    const appNow = getAppNow();
    const scheduledTasks = getScheduledRecurringTasks(tasks, appNow).filter(
      isCountedInDailyPerformance,
    );
    const completedCount = scheduledTasks.filter((task) => task.done).length;
    const completedPercentage =
      scheduledTasks.length > 0 ? (completedCount / scheduledTasks.length) * 100 : 0;

    const today = new Date(appNow).setHours(0, 0, 0, 0);
    const dueTodayTasks = tasks.filter((task) => {
      if (task.deadline) {
        const taskDeadline = new Date(task.deadline).setHours(0, 0, 0, 0);
        return taskDeadline === today && !task.done;
      }
      return false;
    });

    const taskNamesDueToday = dueTodayTasks.map((task) => task.name);

    return {
      completedTasksCount: completedCount,
      scheduledTasksCount: scheduledTasks.length,
      completedTaskPercentage: completedPercentage,
      tasksWithDeadlineTodayCount: dueTodayTasks.length,
      tasksDueTodayNames: taskNamesDueToday,
    };
  }, [tasks]);

  // Memoize time-based greeting
  const timeGreeting = useMemo(() => {
    const currentHour = getAppNow().getHours();
    if (currentHour < 12 && currentHour >= 5) {
      return "Good morning";
    } else if (currentHour < 18 && currentHour >= 12) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }, []);

  // Memoize task completion text
  const taskCompletionText = useMemo(() => {
    const percentage = taskStats.completedTaskPercentage;
    switch (true) {
      case percentage === 0:
        return "No tasks completed yet. Keep going!";
      case percentage === 100:
        return "Congratulations! All tasks completed!";
      case percentage >= 75:
        return "Almost there!";
      case percentage >= 50:
        return "You're halfway there! Keep it up!";
      case percentage >= 25:
        return "You're making good progress.";
      default:
        return "You're just getting started.";
    }
  }, [taskStats.completedTaskPercentage]);

  const updateShowProgressBar = (value: boolean) => {
    setUser((prevUser) => ({
      ...prevUser,
      settings: {
        ...prevUser.settings,
        showProgressBar: value,
      },
    }));
  };

  const appNow = getAppNow();
  const roundedPercent = Math.round(taskStats.completedTaskPercentage);

  const handleOpenMenu = () => {
    const sidebarTrigger = document.querySelector<HTMLButtonElement>(
      'button[aria-label="Sidebar"]',
    );
    if (sidebarTrigger) {
      sidebarTrigger.click();
    }
  };

  return (
    <HomeContainer>
      <HomeTopBar>
        <HomeMenuBtn onClick={handleOpenMenu} aria-label="Open Menu">
          <ArrowBackRounded sx={{ fontSize: 18 }} />
          <span>Menu</span>
        </HomeMenuBtn>

        <HomeDateDisplay
          onClick={(e) => setTestDateAnchor(e.currentTarget)}
          title="Click to adjust test date"
        >
          {getTestingDate() ? "TEST • " : ""}
          {formatHomeHeaderDate(appNow)}
        </HomeDateDisplay>

        <Popover
          open={Boolean(testDateAnchor)}
          anchorEl={testDateAnchor}
          onClose={() => setTestDateAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{ sx: { p: 2, borderRadius: 3, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" } }}
        >
          <TestingDateControl />
        </Popover>
      </HomeTopBar>

      <HomeTitleSection>
        <HomePageTitle>Tasks</HomePageTitle>
        <HomePageSubtitle>
          {timeGreeting}
          {name && (
            <span translate="no">
              , <span>{name}</span>
            </span>
          )}
          .
        </HomePageSubtitle>
      </HomeTitleSection>

      <HomeAccentLine />

      {!isOnline && (
        <Offline>
          <WifiOff /> You're offline but you can use the app!
        </Offline>
      )}

      {taskStats.scheduledTasksCount > 0 && settings.showProgressBar && (
        <ProgressSectionWrapper>
          <ProgressCloseBtn
            size="small"
            onClick={() => {
              updateShowProgressBar(false);
              showToast(
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  Progress bar hidden. You can enable it in settings.
                  <Button
                    variant="contained"
                    sx={{ p: "12px 32px" }}
                    onClick={() => updateShowProgressBar(true)}
                    startIcon={<UndoRounded />}
                  >
                    Undo
                  </Button>
                </span>,
              );
            }}
          >
            <CloseRounded sx={{ fontSize: 16 }} />
          </ProgressCloseBtn>

          <ProgressHeaderRow>
            <ProgressTitle>Today's Progress</ProgressTitle>
            <ProgressCountText>
              {taskStats.completedTasksCount} / {taskStats.scheduledTasksCount} done
            </ProgressCountText>
          </ProgressHeaderRow>

          <ProgressBarTrack>
            <ProgressBarFill percentage={roundedPercent}>
              {roundedPercent >= 10 ? `${roundedPercent}%` : ""}
            </ProgressBarFill>
          </ProgressBarTrack>

          <ProgressSubtitle>{taskCompletionText}</ProgressSubtitle>
        </ProgressSectionWrapper>
      )}

      <Suspense
        fallback={
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ py: 6 }}>
            <CircularProgress />
          </Box>
        }
      >
        <TasksList />
      </Suspense>

      {!isMobile && (
        <Tooltip title={tasks.length > 0 ? "Add New Task" : "Add Task"} placement="left">
          <AddButton
            animate={tasks.length === 0}
            glow={settings.enableGlow}
            onClick={() => n("add")}
            aria-label="Add Task"
          >
            <AddRounded style={{ fontSize: "44px" }} />
          </AddButton>
        </Tooltip>
      )}
    </HomeContainer>
  );
};

export default Home;
