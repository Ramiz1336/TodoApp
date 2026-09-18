import { Task } from "../types/user";

export const isTaskScheduledOnDate = (task: Task, date: Date): boolean => {
  if (task.recurrence === "daily") {
    return !task.recurrenceDays?.length || task.recurrenceDays.includes(date.getDay());
  }

  if (task.recurrence === "weekly") {
    return !task.recurrenceDays?.length || task.recurrenceDays.includes(date.getDay());
  }

  return task.recurrence === "monthly";
};

/** Weekly tasks remain available all week until their quota is met. */
export const isWeeklyTaskVisibleOnDate = (task: Task, date: Date): boolean =>
  task.recurrence === "weekly" && !task.done && Boolean(date);

/** Weekly and monthly quota work is never part of a daily completion denominator. */
export const isCountedInDailyPerformance = (task: Task): boolean =>
  task.recurrence !== "weekly" && task.recurrence !== "monthly";

export const getScheduledRecurringTasks = (tasks: Task[], date: Date): Task[] =>
  tasks.filter((task) => task.recurrence && isTaskScheduledOnDate(task, date));
