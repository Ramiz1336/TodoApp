import { useEffect } from "react";
import { defaultUser } from "../constants/defaultUser";
import { useStorageState } from "../hooks/useStorageState";
import { Task, User } from "../types/user";
import { generateUUID } from "../utils";
import { UserContext } from "./UserContext";
import { getAppNow, localDateKey } from "../utils/testingDate";

const DEMO_TASKS_SEEDED_KEY = "todoapp-demo-tasks-seeded";

const localWeekKey = (date: Date): string => {
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - date.getDay());
  return localDateKey(weekStart);
};

const shouldReset = (task: Task): boolean => {
  if (!task.recurrence) return false;

  const now = getAppNow();
  const today = localDateKey(now);
  const todayWeekday = now.getDay(); // 0=Sun, 6=Sat

  if (task.lastResetDate === today) return false;

  if (task.recurrence === "daily") {
    // No specific days = every day
    if (!task.recurrenceDays || task.recurrenceDays.length === 0) return true;
    return task.recurrenceDays.includes(todayWeekday);
  }

  if (task.recurrence === "weekly") {
    if (!task.lastResetDate) return false;
    return localWeekKey(new Date(`${task.lastResetDate}T00:00:00`)) !== localWeekKey(now);
  }

  if (task.recurrence === "monthly") {
    if (!task.lastResetDate) return false;
    const lastReset = new Date(`${task.lastResetDate}T00:00:00`);
    return lastReset.getFullYear() !== now.getFullYear() || lastReset.getMonth() !== now.getMonth();
  }

  return false;
};

const resetDueTasks = (user: User): User => {
  const today = localDateKey(getAppNow());
  const tasks = user.tasks.map((task) =>
    shouldReset(task)
      ? {
          ...task,
          done: false,
          recurrenceCompletedCount:
            task.recurrence === "weekly" || task.recurrence === "monthly"
              ? 0
              : task.recurrenceCompletedCount,
          lastResetDate: today,
        }
      : task,
  );

  return tasks.every((task, index) => task === user.tasks[index]) ? user : { ...user, tasks };
};

const createDemoTasks = (): Task[] => {
  const now = getAppNow();
  const today = localDateKey(now);

  return [
    {
      id: generateUUID(),
      done: false,
      pinned: false,
      name: "Review today's priorities",
      description: "A regular task to demonstrate the standard task flow.",
      emoji: "1f4dd",
      color: "#7ACCFA",
      date: now,
    },
    {
      id: generateUUID(),
      done: false,
      pinned: false,
      name: "Daily stretch",
      description: "Repeats every day with no weekday restriction.",
      emoji: "1f938",
      color: "#3DFF7F",
      date: now,
      recurrence: "daily",
      recurrenceDays: [],
      lastResetDate: today,
    },
    {
      id: generateUUID(),
      done: false,
      pinned: false,
      name: "Study session",
      description: "Repeats on selected weekdays.",
      emoji: "1f4da",
      color: "#C6A7FF",
      date: now,
      recurrence: "daily",
      recurrenceDays: [1, 3, 5],
      lastResetDate: today,
    },
    {
      id: generateUUID(),
      done: false,
      pinned: false,
      name: "Weekend home reset",
      description: "One completion across Saturday and Sunday.",
      emoji: "1f3e0",
      color: "#53E45D",
      date: now,
      recurrence: "weekly",
      recurrenceDays: [0, 6],
      recurrenceCount: 1,
      recurrenceCompletedCount: 0,
      lastResetDate: today,
    },
    {
      id: generateUUID(),
      done: false,
      pinned: false,
      name: "Monthly budget check",
      description: "Complete twice during each calendar month.",
      emoji: "1f4b0",
      color: "#FF9518",
      date: now,
      recurrence: "monthly",
      recurrenceCount: 2,
      recurrenceCompletedCount: 0,
      lastResetDate: today,
    },
  ];
};

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useStorageState<User>(defaultUser, "user");

  useEffect(() => {
    setUser((prev) => {
      let nextTasks = prev.tasks;
      let seededDemoTasks = false;
      if (localStorage.getItem(DEMO_TASKS_SEEDED_KEY) !== "true" && prev.tasks.length === 0) {
        nextTasks = createDemoTasks();
        seededDemoTasks = true;
        localStorage.setItem(DEMO_TASKS_SEEDED_KEY, "true");
      }

      const updatedUser = resetDueTasks({ ...prev, tasks: nextTasks });
      const tasks = updatedUser.tasks;

      if (!seededDemoTasks && tasks.every((task, index) => task === nextTasks[index])) {
        return prev;
      }

      return updatedUser;
    });
  }, [setUser]);

  useEffect(() => {
    const resetTasks = () => setUser(resetDueTasks);
    resetTasks();
    const intervalId = window.setInterval(resetTasks, 60_000);
    return () => window.clearInterval(intervalId);
  }, [setUser]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
