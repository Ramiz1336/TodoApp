import type { EmojiStyle } from "emoji-picker-react";

/**
 * Represents a universally unique identifier.
 */
export type UUID = ReturnType<typeof crypto.randomUUID>;

export type DarkModeOptions = "system" | "auto" | "light" | "dark";

/**
 * Represents a user in the application.
 */
export interface User {
  name: string | null;
  createdAt: Date;
  /**
   * must be a URL starting with "https://" or a local file reference in the form "LOCAL_FILE_" + UUID
   */
  profilePicture: string | null;
  emojisStyle: EmojiStyle;
  tasks: Task[];
  /** Immutable completion events used by the performance dashboard. */
  performanceRecords: PerformanceRecord[];
  /**
   * Stores the IDs of tasks that were deleted locally.
   * Used to ensure deletions are synced correctly across devices.
   */
  deletedTasks: UUID[];
  categories: Category[];
  deletedCategories: UUID[];
  favoriteCategories: UUID[];
  colorList: string[];
  settings: AppSettings;
  theme: "system" | (string & {});
  darkmode: DarkModeOptions;
  lastSyncedAt?: Date;
  /** Progress on Striver DSA sheet (completed and starred question IDs) */
  dsaProgress?: DsaProgress;
}

export interface DsaProgress {
  solvedProblemIds: string[];
  starredProblemIds: string[];
}

export interface PerformanceRecord {
  id: UUID;
  taskId: UUID;
  taskName: string;
  date: string;
  completedAt: Date;
  color: string;
  completionPhotoId?: string;
  comment?: string;
}

/**
 * Represents a task in the application.
 */
export interface Task {
  id: UUID;
  done: boolean;
  pinned: boolean;
  name: string;
  description?: string;
  emoji?: string;
  color: string;
  /**
   * created at date
   */
  date: Date;
  deadline?: Date;
  category?: Category[];
  lastSave?: Date;
  sharedBy?: string;
  /**
   * Optional numeric position for drag-and-drop (for p2p sync)
   */
  position?: number;
  /**
   * Recurrence frequency.
   */
  recurrence?: "daily" | "weekly" | "monthly";
  /** For daily: days of week to run (0=Sun...6=Sat), empty = every day. */
  recurrenceDays?: number[];
  /** For monthly: number of completions required during the month. */
  recurrenceCount?: number;
  /** Monthly completions recorded in the current month. */
  recurrenceCompletedCount?: number;
  /**
   * The date the recurring task was last reset (date string YYYY-MM-DD).
   */
  lastResetDate?: string;
  tracked?: boolean;
}

/**
 * Represents a category in the application.
 */
export interface Category {
  id: UUID;
  name: string;
  emoji?: string;
  color: string;
  lastSave?: Date;
}

/**
 * Represents application settings for the user.
 */
export interface AppSettings {
  enableCategories: boolean;
  doneToBottom: boolean;
  enableGlow: boolean;
  simpleEmojiPicker: boolean;
  enableReadAloud: boolean;
  appBadge: boolean;
  showProgressBar: boolean;
  /**
   * Voice property in the format 'name::lang' to ensure uniqueness on macOS/iOS,
   * where multiple voices can share the same name.
   */
  voice: `${string}::${string}`;
  voiceVolume: number;
  sortOption: SortOption;
  reduceMotion: ReduceMotionOption;
}

export type SortOption = "dateCreated" | "dueDate" | "alphabetical" | "custom";
export type ReduceMotionOption = "system" | "on" | "off";
