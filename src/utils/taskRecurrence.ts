import { Task } from "../types/user";

export const applyTaskCompletion = (task: Task): Task => {
  if (task.recurrence !== "weekly" && task.recurrence !== "monthly") {
    return { ...task, done: !task.done, lastSave: new Date() };
  }

  const required = Math.max(1, task.recurrenceCount ?? 1);
  const completed = task.recurrenceCompletedCount ?? (task.done ? required : 0);
  const nextCompleted = task.done ? Math.max(0, completed - 1) : Math.min(required, completed + 1);

  return {
    ...task,
    done: nextCompleted >= required,
    recurrenceCompletedCount: nextCompleted,
    lastSave: new Date(),
  };
};

export const completeTask = (task: Task): Task => {
  if (task.done) return task;
  return applyTaskCompletion(task);
};
