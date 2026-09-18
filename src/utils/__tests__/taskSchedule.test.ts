import { describe, expect, it } from "vitest";
import type { Task } from "../../types/user";
import { isTaskScheduledOnDate, isWeeklyTaskVisibleOnDate } from "../taskSchedule";

const weeklyTask = (done = false): Task =>
  ({
    id: "weekly-task" as Task["id"],
    done,
    pinned: false,
    name: "Weekend reset",
    color: "#ffffff",
    date: new Date("2026-09-12T09:00:00"),
    recurrence: "weekly",
    recurrenceDays: [0, 6],
    recurrenceCount: 1,
    recurrenceCompletedCount: done ? 1 : 0,
  }) as Task;

describe("weekly task scheduling", () => {
  it("schedules a weekly task on each selected weekday", () => {
    const task = weeklyTask();

    expect(isTaskScheduledOnDate(task, new Date("2026-09-12T09:00:00"))).toBe(true);
    expect(isTaskScheduledOnDate(task, new Date("2026-09-13T09:00:00"))).toBe(true);
  });

  it("keeps an unfinished weekly task visible between selected weekdays", () => {
    expect(isWeeklyTaskVisibleOnDate(weeklyTask(), new Date("2026-09-11T09:00:00"))).toBe(true);
  });

  it("hides a one-completion weekly task after it is completed", () => {
    expect(isWeeklyTaskVisibleOnDate(weeklyTask(true), new Date("2026-09-13T09:00:00"))).toBe(
      false,
    );
  });
});
