import { Category, Task } from "../types/user";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddTaskButton,
  AddTaskContainer,
  AddTaskTopBar,
  AddTaskBackBtn,
  AddTaskDateDisplay,
  AddTaskTitleSection,
  AddTaskPageTitle,
  AddTaskPageSubtitle,
  AddTaskAccentLine,
  FormSection,
  RecurringCard,
  RecurringHeaderRow,
  RecurringBody,
  TrackedSubRow,
  StyledInput,
  EmojiPickerWrapper,
} from "../styles";
import { AddTaskRounded, ArrowBackRounded, CancelRounded } from "@mui/icons-material";
import { FormControlLabel, IconButton, InputAdornment, Switch, Tooltip } from "@mui/material";
import { RecurrenceConfig } from "../components/RecurrenceConfig";
import { DESCRIPTION_MAX_LENGTH, TASK_NAME_MAX_LENGTH } from "../constants";
import { ColorPicker, CustomEmojiPicker } from "../components";
import { UserContext } from "../contexts/UserContext";
import { useStorageState } from "../hooks/useStorageState";
import { useTheme } from "@emotion/react";
import { generateUUID, getFontColor, isDark, showToast } from "../utils";
import { ColorPalette } from "../theme/themeConfig";
import InputThemeProvider from "../contexts/InputThemeProvider";
import { CategorySelect } from "../components/CategorySelect";
import { useToasterStore } from "react-hot-toast";
import { getAppNow, localDateKey } from "../utils/testingDate";

const formatAddTaskHeaderDate = (d: Date): string => {
  const dayName = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const dayNum = d.getDate();
  const monthName = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const year = d.getFullYear();
  return `${dayName}  /  ${dayNum}  ${monthName}  ${year}`;
};

const AddTask = () => {
  const { user, setUser } = useContext(UserContext);
  const theme = useTheme();
  const [name, setName] = useStorageState<string>("", "name", "sessionStorage");
  const [emoji, setEmoji] = useStorageState<string | null>(null, "emoji", "sessionStorage");
  const [color, setColor] = useStorageState<string>(theme.primary, "color", "sessionStorage");
  const [description, setDescription] = useStorageState<string>(
    "",
    "description",
    "sessionStorage",
  );
  const [deadline, setDeadline] = useStorageState<string>("", "deadline", "sessionStorage");
  const [nameError, setNameError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useStorageState<Category[]>(
    [],
    "categories",
    "sessionStorage",
  );

  const [isDeadlineFocused, setIsDeadlineFocused] = useState<boolean>(false);
  const [isRecurring, setIsRecurring] = useStorageState<boolean>(
    false,
    "isRecurring",
    "sessionStorage",
  );
  const [recurrence, setRecurrence] = useStorageState<Task["recurrence"]>(
    "daily",
    "recurrence",
    "sessionStorage",
  );
  const [recurrenceDays, setRecurrenceDays] = useStorageState<number[]>(
    [],
    "recurrenceDays",
    "sessionStorage",
  );
  const [recurrenceCount, setRecurrenceCount] = useStorageState<number | undefined>(
    undefined,
    "recurrenceCount",
    "sessionStorage",
  );
  const [isTracked, setIsTracked] = useStorageState<boolean>(false, "isTracked", "sessionStorage");

  const handleRecurringChange = (checked: boolean) => {
    setIsRecurring(checked);
    if (checked) {
      setRecurrence("daily");
      setRecurrenceDays([]);
      setDeadline("");
      sessionStorage.removeItem("deadline");
    } else {
      setRecurrence(undefined);
      setRecurrenceDays([]);
      setRecurrenceCount(undefined);
      setIsTracked(false);
    }
  };

  const n = useNavigate();
  const { toasts } = useToasterStore();

  useEffect(() => {
    document.title = "Todo App - Add Task";
  }, []);

  useEffect(() => {
    if (name.length > TASK_NAME_MAX_LENGTH) {
      setNameError(`Name should be less than or equal to ${TASK_NAME_MAX_LENGTH} characters`);
    } else {
      setNameError("");
    }
    if (description.length > DESCRIPTION_MAX_LENGTH) {
      setDescriptionError(
        `Description should be less than or equal to ${DESCRIPTION_MAX_LENGTH} characters`,
      );
    } else {
      setDescriptionError("");
    }
  }, [description.length, name.length]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    if (newName.length > TASK_NAME_MAX_LENGTH) {
      setNameError(`Name should be less than or equal to ${TASK_NAME_MAX_LENGTH} characters`);
    } else {
      setNameError("");
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
    if (newDescription.length > DESCRIPTION_MAX_LENGTH) {
      setDescriptionError(
        `Description should be less than or equal to ${DESCRIPTION_MAX_LENGTH} characters`,
      );
    } else {
      setDescriptionError("");
    }
  };

  const handleDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(event.target.value);
  };

  const handleAddTask = () => {
    if (name === "") {
      showToast("Task name is required.", {
        type: "error",
        id: "task-name-required",
        preventDuplicate: true,
        visibleToasts: toasts,
      });
      return;
    }

    if (nameError !== "" || descriptionError !== "") {
      return; // Do not add the task if the name or description exceeds the maximum length
    }

    const today = localDateKey(getAppNow());
    const newTask: Task = {
      id: generateUUID(),
      done: false,
      pinned: false,
      name,
      description: description !== "" ? description : undefined,
      emoji: emoji ? emoji : undefined,
      color,
      date: new Date(),
      deadline: !isRecurring && deadline !== "" ? new Date(deadline) : undefined,
      category: selectedCategories ? selectedCategories : [],
      recurrence: isRecurring ? recurrence : undefined,
      recurrenceDays: isRecurring ? recurrenceDays : undefined,
      recurrenceCount:
        isRecurring && (recurrence === "weekly" || recurrence === "monthly")
          ? (recurrenceCount ?? 1)
          : undefined,
      recurrenceCompletedCount:
        isRecurring && (recurrence === "weekly" || recurrence === "monthly") ? 0 : undefined,
      tracked: isRecurring && recurrence === "daily" ? isTracked : undefined,
      lastResetDate: isRecurring ? today : undefined,
    };

    setUser((prevUser) => ({
      ...prevUser,
      tasks: [...prevUser.tasks, newTask],
    }));

    n("/");

    showToast(
      <div>
        Added task - <b>{newTask.name}</b>
      </div>,
      {
        icon: <AddTaskRounded />,
      },
    );

    const itemsToRemove = [
      "name",
      "color",
      "description",
      "emoji",
      "deadline",
      "categories",
      "isRecurring",
      "recurrence",
      "recurrenceDays",
      "recurrenceCount",
      "recurrenceTime",
      "isTracked",
    ];
    itemsToRemove.map((item) => sessionStorage.removeItem(item));
  };

  return (
    <AddTaskContainer>
      <AddTaskTopBar>
        <AddTaskBackBtn onClick={() => n("/")} aria-label="Back to Tasks">
          <ArrowBackRounded sx={{ fontSize: 18 }} />
          <span>Tasks</span>
        </AddTaskBackBtn>
        <AddTaskDateDisplay>{formatAddTaskHeaderDate(getAppNow())}</AddTaskDateDisplay>
      </AddTaskTopBar>

      <AddTaskTitleSection>
        <AddTaskPageTitle>Add Task</AddTaskPageTitle>
        <AddTaskPageSubtitle>Create a new task to organize your day.</AddTaskPageSubtitle>
      </AddTaskTitleSection>

      <AddTaskAccentLine />

      <EmojiPickerWrapper>
        <CustomEmojiPicker
          emoji={typeof emoji === "string" ? emoji : undefined}
          setEmoji={setEmoji}
          color={color}
          name={name}
          type="task"
        />
      </EmojiPickerWrapper>

      <InputThemeProvider>
        <FormSection>
          <StyledInput
            label="Task Name"
            name="name"
            placeholder="Enter task name"
            autoComplete="off"
            value={name}
            onChange={handleNameChange}
            required
            error={nameError !== ""}
            helpercolor={nameError ? ColorPalette.red : undefined}
            helperText={
              name === ""
                ? undefined
                : !nameError
                  ? `${name.length}/${TASK_NAME_MAX_LENGTH}`
                  : nameError
            }
          />

          <StyledInput
            label="Task Description"
            name="description"
            placeholder="Enter task description"
            autoComplete="off"
            value={description}
            onChange={handleDescriptionChange}
            multiline
            rows={3}
            error={descriptionError !== ""}
            helpercolor={descriptionError ? ColorPalette.red : undefined}
            helperText={
              description === ""
                ? undefined
                : !descriptionError
                  ? `${description.length}/${DESCRIPTION_MAX_LENGTH}`
                  : descriptionError
            }
          />

          {!isRecurring && (
            <StyledInput
              label="Task Deadline"
              name="deadline"
              placeholder="Enter deadline date"
              type="datetime-local"
              value={deadline}
              onChange={handleDeadlineChange}
              onFocus={() => setIsDeadlineFocused(true)}
              onBlur={() => setIsDeadlineFocused(false)}
              hidetext={(!deadline || deadline === "") && !isDeadlineFocused}
              sx={{
                colorScheme: isDark(theme.secondary) ? "dark" : "light",
              }}
              slotProps={{
                input: {
                  startAdornment:
                    deadline && deadline !== "" ? (
                      <InputAdornment position="start">
                        <Tooltip title="Clear">
                          <IconButton color="error" onClick={() => setDeadline("")}>
                            <CancelRounded />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ) : undefined,
                },
              }}
            />
          )}

          {user.settings.enableCategories !== undefined && user.settings.enableCategories && (
            <CategorySelect
              selectedCategories={selectedCategories}
              onCategoryChange={(categories) => setSelectedCategories(categories)}
              width="100%"
              fontColor={getFontColor(theme.secondary)}
            />
          )}

          {/* Unified Recurring Task Card */}
          <RecurringCard>
            <RecurringHeaderRow>
              <FormControlLabel
                control={
                  <Switch
                    checked={isRecurring}
                    onChange={(e) => handleRecurringChange(e.target.checked)}
                    color="primary"
                  />
                }
                label="Recurring task"
              />
            </RecurringHeaderRow>

            {isRecurring && (
              <RecurringBody>
                <RecurrenceConfig
                  task={{ recurrence, recurrenceDays, recurrenceCount }}
                  onChange={(patch) => {
                    if (patch.recurrence !== undefined) setRecurrence(patch.recurrence);
                    if (patch.recurrenceDays !== undefined) setRecurrenceDays(patch.recurrenceDays);
                    if ("recurrenceCount" in patch) setRecurrenceCount(patch.recurrenceCount);
                  }}
                  fontColor={getFontColor(theme.secondary)}
                />

                {recurrence === "daily" && (
                  <TrackedSubRow>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isTracked}
                          onChange={(e) => setIsTracked(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Track in Tracked habits"
                    />
                  </TrackedSubRow>
                )}
              </RecurringBody>
            )}
          </RecurringCard>

          <ColorPicker
            color={color}
            width="100%"
            onColorChange={(newColor) => setColor(newColor)}
            fontColor={getFontColor(theme.secondary)}
          />

          <AddTaskButton
            onClick={handleAddTask}
            disabled={
              name.length === 0 ||
              name.length > TASK_NAME_MAX_LENGTH ||
              description.length > DESCRIPTION_MAX_LENGTH
            }
          >
            Create Task
          </AddTaskButton>
        </FormSection>
      </InputThemeProvider>
    </AddTaskContainer>
  );
};

export default AddTask;
