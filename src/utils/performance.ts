import type { PerformanceRecord, Task, User } from "../types/user";
import { generateUUID } from "./generateUUID";
import { getAppNow, localDateKey } from "./testingDate";

export const recordTaskCompletion = (
  user: User,
  task: Task,
  completedAt = getAppNow(),
  completionPhotoId?: string,
  comment?: string,
): User => {
  const date = localDateKey(completedAt);
  const alreadyRecorded = user.performanceRecords.some(
    (record) => record.taskId === task.id && record.date === date,
  );

  if (alreadyRecorded) return user;

  const record: PerformanceRecord = {
    id: generateUUID(),
    taskId: task.id,
    taskName: task.name,
    date,
    completedAt,
    color: task.color,
    completionPhotoId,
    comment,
  };

  return { ...user, performanceRecords: [...user.performanceRecords, record] };
};

export const recordTaskCompletions = (user: User, tasks: Task[], completedAt = getAppNow()): User =>
  tasks.reduce((nextUser, task) => recordTaskCompletion(nextUser, task, completedAt), user);
