import { Emoji } from "emoji-picker-react";
import { lazy, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryBadge, ColorPicker, CustomDialogTitle, CustomEmojiPicker } from "../components";
import type { Category, Task, UUID } from "../types/user";
import { useTheme } from "@emotion/react";
import {
  ArrowBackRounded,
  DeleteRounded,
  EditRounded,
  ExpandMoreRounded,
  SaveRounded,
  StarRounded,
  StarBorderRounded,
  AddRounded,
} from "@mui/icons-material";
import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Popover,
  Tooltip,
  Chip,
} from "@mui/material";
import styled from "@emotion/styled";
import { CATEGORY_NAME_MAX_LENGTH } from "../constants";
import { UserContext } from "../contexts/UserContext";
import { useStorageState } from "../hooks/useStorageState";
import { DialogBtn } from "../styles";
import { formatDate, generateUUID, getFontColor, showToast, timeAgo } from "../utils";
import { ColorPalette } from "../theme/themeConfig";
import { useToasterStore } from "react-hot-toast";
import { TaskContext } from "../contexts/TaskContext";
import { TestingDateControl } from "../components/TestingDateControl";
import { getAppNow } from "../utils/testingDate";

const DEFAULT_EDIT_CATEGORY_SUBTITLE = "Edit the details of the category.";
const NotFound = lazy(() => import("./NotFound"));

const formatHeaderDate = (d: Date): string => {
  const dayName = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const dayNum = d.getDate();
  const monthName = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const year = d.getFullYear();
  return `${dayName}  /  ${dayNum}  ${monthName}  ${year}`;
};

const Categories = () => {
  const { user, setUser } = useContext(UserContext);
  const { updateCategory } = useContext(TaskContext);
  const theme = useTheme();
  const n = useNavigate();
  const { toasts } = useToasterStore();
  const now = getAppNow();

  const [testDateAnchor, setTestDateAnchor] = useState<HTMLElement | null>(null);

  const [name, setName] = useStorageState<string>("", "catName", "sessionStorage");
  const [nameError, setNameError] = useState<string>("");
  const [emoji, setEmoji] = useStorageState<string | null>(null, "catEmoji", "sessionStorage");
  const [color, setColor] = useStorageState<string>(theme.primary, "catColor", "sessionStorage");

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<UUID | undefined>();

  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>("");
  const [editNameError, setEditNameError] = useState<string>("");
  const [editEmoji, setEditEmoji] = useState<string | null>(null);
  const [editColor, setEditColor] = useState<string>(ColorPalette.purple);
  const [editLastSaveLabel, setEditLastSaveLabel] = useState<string>(
    DEFAULT_EDIT_CATEGORY_SUBTITLE,
  );

  const selectedCategory = user.categories.find((cat) => cat.id === selectedCategoryId);

  useEffect(() => {
    document.title = "Todo App - Categories";
    if (!user.settings.enableCategories) {
      n("/");
    }
    if (name.length > CATEGORY_NAME_MAX_LENGTH) {
      setNameError(`Name is too long (maximum ${CATEGORY_NAME_MAX_LENGTH} characters)`);
    }
  }, [n, name.length, user.settings]);

  useEffect(() => {
    const cat = user.categories.find((cat) => cat.id === selectedCategoryId);
    if (cat) {
      setEditColor(cat.color || ColorPalette.purple);
      setEditName(cat.name || "");
      setEditEmoji(cat.emoji || null);
      setEditNameError("");
      setEditLastSaveLabel(
        cat.lastSave
          ? `Last edited ${timeAgo(new Date(cat.lastSave))} • ${formatDate(new Date(cat.lastSave))}`
          : DEFAULT_EDIT_CATEGORY_SUBTITLE,
      );
    }
  }, [selectedCategoryId, user.categories]);

  const handleDelete = (categoryId: UUID | undefined) => {
    if (!categoryId) return;

    const categoryName = user.categories.find((category) => category.id === categoryId)?.name || "";

    const updatedCategories = user.categories.filter((category) => category.id !== categoryId);
    const updatedFavoriteCategories = user.favoriteCategories.filter((id) => id !== categoryId);

    const updatedTasks = user.tasks.map((task) => {
      const updatedCategoryList = task.category?.filter((category) => category.id !== categoryId);
      return {
        ...task,
        category: updatedCategoryList,
      };
    });

    setUser((prevUser) => ({
      ...prevUser,
      categories: updatedCategories,
      favoriteCategories: updatedFavoriteCategories,
      tasks: updatedTasks,
      deletedCategories: [
        ...(prevUser.deletedCategories || []),
        ...(prevUser.deletedCategories?.includes(categoryId) ? [] : [categoryId]),
      ],
    }));

    showToast(
      <div>
        Deleted category - <b translate="no">{categoryName}.</b>
      </div>,
    );
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    if (newName.length > CATEGORY_NAME_MAX_LENGTH) {
      setNameError(`Name is too long (maximum ${CATEGORY_NAME_MAX_LENGTH} characters)`);
    } else {
      setNameError("");
    }
  };

  const handleEditNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setEditName(newName);
    if (newName.length > CATEGORY_NAME_MAX_LENGTH) {
      setEditNameError(`Name is too long (maximum ${CATEGORY_NAME_MAX_LENGTH} characters)`);
    } else {
      setEditNameError("");
    }
  };

  const handleAddCategory = () => {
    if (name !== "") {
      if (name.length > CATEGORY_NAME_MAX_LENGTH) {
        return;
      }
      const newCategory: Category = {
        id: generateUUID(),
        lastSave: new Date(),
        name,
        emoji: emoji !== "" && emoji !== null ? emoji : undefined,
        color,
      };

      showToast(
        <div>
          Added category - <b translate="no">{newCategory.name}</b>
        </div>,
      );

      setUser((prevUser) => ({
        ...prevUser,
        categories: [...prevUser.categories, newCategory],
      }));

      setName("");
      setColor(theme.primary);
      setEmoji("");
    } else {
      showToast("Category name is required.", {
        type: "error",
        preventDuplicate: true,
        id: "category-name-required",
        visibleToasts: toasts,
      });
    }
  };

  const handleEditDimiss = () => {
    setSelectedCategoryId(undefined);
    setOpenEditDialog(false);
    setEditColor(theme.primary);
    setEditName("");
    setEditEmoji(null);
  };

  const handleEditCategory = () => {
    updateCategory({
      id: selectedCategoryId,
      name: editName,
      emoji: editEmoji || undefined,
      color: editColor,
      lastSave: new Date(),
    });

    showToast(
      <div>
        Updated category - <b translate="no">{editName}</b>
      </div>,
    );

    setOpenEditDialog(false);
  };

  const handleAddToFavorites = (category: Category) => {
    setUser((user) => ({
      ...user,
      favoriteCategories: user.favoriteCategories.includes(category.id)
        ? user.favoriteCategories.filter((id) => id !== category.id)
        : [...user.favoriteCategories, category.id],
      categories: user.categories.map((cat) =>
        cat.id === category.id ? { ...cat, lastSave: new Date() } : cat,
      ),
    }));
  };

  const getAssociatedTasks = (categoryId: UUID): Task[] => {
    return user.tasks.filter((task) => task.category?.some((cat) => cat.id === categoryId));
  };

  if (!user.settings.enableCategories) {
    return <NotFound message="Categories are not enabled." />;
  }

  return (
    <PageContainer>
      {/* Top Bar Header */}
      <TopBar>
        <BackBtn onClick={() => n("/")} aria-label="Back to Tasks">
          <ArrowBackRounded sx={{ fontSize: 18 }} />
          <span>Tasks</span>
        </BackBtn>

        <DateDisplay
          onClick={(e) => setTestDateAnchor(e.currentTarget)}
          title="Click to adjust test date"
        >
          {formatHeaderDate(now)}
        </DateDisplay>

        <Popover
          open={Boolean(testDateAnchor)}
          anchorEl={testDateAnchor}
          onClose={() => setTestDateAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              p: 2,
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            },
          }}
        >
          <TestingDateControl />
        </Popover>
      </TopBar>

      <TitleSection>
        <PageTitle>Categories</PageTitle>
        <PageSubtitle>
          Organize and prioritize your tasks with custom categories, colors, and emojis.
        </PageSubtitle>
      </TitleSection>

      <AccentLine color={theme.primary} />

      {/* Categories List Section */}
      <SectionHeader>
        <SectionHeading>Your Categories</SectionHeading>
        <Chip
          label={`${user.categories.length} total`}
          size="small"
          sx={{
            fontSize: "11px",
            fontWeight: 600,
            borderRadius: "8px",
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-card)",
            color: "var(--text-muted)",
          }}
        />
      </SectionHeader>

      {user.categories.length > 0 ? (
        <CategoriesList>
          {user.categories.map((category) => {
            const categoryTasks = user.tasks.filter((task) =>
              task.category?.some((cat) => cat.id === category.id),
            );

            const completedTasksCount = categoryTasks.reduce(
              (count, task) => (task.done ? count + 1 : count),
              0,
            );
            const totalTasksCount = categoryTasks.length;
            const completionPercentage =
              totalTasksCount > 0 ? Math.floor((completedTasksCount / totalTasksCount) * 100) : 0;
            const isFav = user.favoriteCategories.includes(category.id);

            return (
              <CategoryCard key={category.id}>
                <CategoryCardMain>
                  <CategoryColorBar color={category.color} />
                  <CategoryEmojiWrap>
                    {category.emoji ? (
                      <Emoji unified={category.emoji} emojiStyle={user.emojisStyle} size={22} />
                    ) : (
                      <CategoryDot color={category.color} />
                    )}
                  </CategoryEmojiWrap>

                  <CategoryInfo>
                    <CategoryName>{category.name}</CategoryName>
                    <CategoryMetaRow>
                      {totalTasksCount > 0 ? (
                        <>
                          <Chip
                            label={`${completionPercentage}% completed`}
                            size="small"
                            sx={{
                              height: "20px",
                              fontSize: "11px",
                              fontWeight: 600,
                              borderRadius: "6px",
                              backgroundColor: `${category.color}15`,
                              color: category.color,
                            }}
                          />
                          <CategoryTaskCount>
                            {completedTasksCount}/{totalTasksCount} tasks
                          </CategoryTaskCount>
                        </>
                      ) : (
                        <CategoryTaskCount>0 tasks</CategoryTaskCount>
                      )}
                    </CategoryMetaRow>
                  </CategoryInfo>

                  <CategoryActions>
                    <Tooltip title={isFav ? "Remove from favorites" : "Add to favorites"}>
                      <IconButton
                        size="small"
                        onClick={() => handleAddToFavorites(category)}
                        sx={{ color: isFav ? "#f59e0b" : "var(--text-muted)" }}
                      >
                        {isFav ? (
                          <StarRounded sx={{ fontSize: 20 }} />
                        ) : (
                          <StarBorderRounded sx={{ fontSize: 20 }} />
                        )}
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit category">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedCategoryId(category.id);
                          setOpenEditDialog(true);
                        }}
                        sx={{ color: "var(--text-muted)" }}
                      >
                        <EditRounded sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete category">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedCategoryId(category.id);
                          if (totalTasksCount > 0 || isFav) {
                            setOpenDeleteDialog(true);
                          } else {
                            handleDelete(category.id);
                          }
                        }}
                        sx={{ color: "#ef4444" }}
                      >
                        <DeleteRounded sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                  </CategoryActions>
                </CategoryCardMain>

                {/* Associated Tasks Accordion */}
                {totalTasksCount > 0 && (
                  <StyledAccordion>
                    <AccordionSummary expandIcon={<ExpandMoreRounded sx={{ fontSize: 18 }} />}>
                      <AccordionTitle>View {totalTasksCount} associated tasks</AccordionTitle>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2, pb: 1.5, pt: 0 }}>
                      <AssociatedTasksList>
                        {categoryTasks.map((t) => (
                          <AssociatedTaskItem key={t.id} done={t.done}>
                            <AssociatedTaskDot done={t.done} color={category.color} />
                            <span>{t.name}</span>
                            {t.done && <TaskDoneBadge>Done</TaskDoneBadge>}
                          </AssociatedTaskItem>
                        ))}
                      </AssociatedTasksList>
                    </AccordionDetails>
                  </StyledAccordion>
                )}
              </CategoryCard>
            );
          })}
        </CategoriesList>
      ) : (
        <EmptyBox>You haven't created any custom categories yet.</EmptyBox>
      )}

      {/* Add New Category Card */}
      <FormCard>
        <FormHeading>
          <AddRounded sx={{ color: theme.primary }} /> Add New Category
        </FormHeading>

        <EmojiPickerRow>
          <CustomEmojiPicker
            emoji={typeof emoji === "string" ? emoji : undefined}
            setEmoji={setEmoji}
            color={color}
            name={name}
            type="category"
          />
        </EmojiPickerRow>

        <FormInputWrap>
          <ModernInput
            placeholder="Enter category name..."
            value={name}
            onChange={handleNameChange}
            maxLength={CATEGORY_NAME_MAX_LENGTH}
          />
          <CharCounter hasError={nameError !== ""}>
            {name.length}/{CATEGORY_NAME_MAX_LENGTH}
          </CharCounter>
        </FormInputWrap>
        {nameError && <ErrorMessage>{nameError}</ErrorMessage>}

        <ColorPickerSection>
          <ColorPickerLabel>Choose Category Color</ColorPickerLabel>
          <ColorPicker
            color={color}
            onColorChange={(newColor) => setColor(newColor)}
            width="100%"
            fontColor={getFontColor(theme.secondary)}
          />
        </ColorPickerSection>

        <CreateCategoryBtn
          onClick={handleAddCategory}
          primaryColor={theme.primary}
          disabled={name.trim().length === 0 || name.length > CATEGORY_NAME_MAX_LENGTH}
        >
          Create Category
        </CreateCategoryBtn>
      </FormCard>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            padding: "8px",
            maxWidth: "420px",
          },
        }}
      >
        <CustomDialogTitle
          title="Delete category?"
          subTitle="This action cannot be undone."
          icon={<DeleteRounded />}
          onClose={() => setOpenDeleteDialog(false)}
        />
        <DialogContent sx={{ px: 2, py: 1.5 }}>
          {selectedCategory ? (
            <>
              <CategoryBadge
                glow={false}
                category={selectedCategory}
                sx={{ width: "100%", height: "100%", margin: "0 auto", borderRadius: "12px" }}
              />
              {getAssociatedTasks(selectedCategory.id).length > 0 && (
                <WarningNotice>
                  ⚠️ {getAssociatedTasks(selectedCategory.id).length} task(s) are assigned to this
                  category. They will remain in your tasks but will lose this category tag. ⚠️{" "}
                  {getAssociatedTasks(selectedCategory.id).length} task(s) are assigned to this
                  category. They will remain in your tasks but will lose this category tag.
                </WarningNotice>
              )}
            </>
          ) : (
            <p>Category not found</p>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
          <DialogBtn onClick={() => setOpenDeleteDialog(false)}>Cancel</DialogBtn>
          <DialogBtn
            onClick={() => {
              handleDelete(selectedCategoryId);
              setOpenDeleteDialog(false);
            }}
            color="error"
          >
            <DeleteRounded sx={{ fontSize: 18 }} /> &nbsp; Delete
          </DialogBtn>
        </DialogActions>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditDimiss}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            padding: "8px",
            maxWidth: "460px",
            width: "100%",
          },
        }}
      >
        <CustomDialogTitle
          title="Edit Category"
          subTitle={editLastSaveLabel}
          icon={<EditRounded />}
          onClose={handleEditDimiss}
        />
        <DialogContent sx={{ px: 2, py: 1.5 }}>
          <EmojiPickerRow>
            <CustomEmojiPicker
              emoji={
                user.categories.find((cat) => cat.id === selectedCategoryId)?.emoji || undefined
              }
              setEmoji={setEditEmoji}
              color={editColor}
              name={editName}
              type="category"
            />
          </EmojiPickerRow>

          <FormInputWrap style={{ marginTop: 16 }}>
            <ModernInput
              placeholder="Category name"
              value={editName}
              onChange={handleEditNameChange}
              maxLength={CATEGORY_NAME_MAX_LENGTH}
            />
            <CharCounter hasError={editNameError !== "" || editName.length === 0}>
              {editName.length}/{CATEGORY_NAME_MAX_LENGTH}
            </CharCounter>
          </FormInputWrap>
          {editNameError && <ErrorMessage>{editNameError}</ErrorMessage>}

          <ColorPickerSection>
            <ColorPickerLabel>Category Color</ColorPickerLabel>
            <ColorPicker
              color={editColor}
              width="100%"
              fontColor={theme.darkmode ? ColorPalette.fontLight : ColorPalette.fontDark}
              onColorChange={(clr) => setEditColor(clr)}
            />
          </ColorPickerSection>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
          <DialogBtn onClick={handleEditDimiss}>Cancel</DialogBtn>
          <DialogBtn
            onClick={handleEditCategory}
            disabled={editNameError !== "" || editName.length === 0}
          >
            <SaveRounded sx={{ fontSize: 18 }} /> &nbsp; Save
          </DialogBtn>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

/* --- Styled Components --- */

const PageContainer = styled.main`
  --bg-card: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.04)" : "#ffffff")};
  --border-card: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0")};
  --border-subtle: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.05)" : "#f1f5f9")};
  --text-dark: ${({ theme }) => (theme.darkmode ? "#f8fafc" : "#0f172a")};
  --text-muted: ${({ theme }) => (theme.darkmode ? "#94a3b8" : "#475569")};
  --text-subtle: ${({ theme }) => (theme.darkmode ? "#cbd5e1" : "#64748b")};
  --card-hover: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.07)" : "#f8fafc")};

  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 12px 16px 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: "Poppins", sans-serif;

  @media (min-width: 1025px) {
    max-width: 680px;
    margin: 36px auto 80px;
    padding: 36px 40px 60px;
    background: ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.04)" : "#ffffff")};
    border-radius: 20px;
    box-shadow: ${({ theme }) =>
      theme.darkmode ? "0 4px 32px rgba(0, 0, 0, 0.4)" : "0 4px 32px rgba(100, 110, 140, 0.12)"};
      theme.darkmode ? "0 4px 32px rgba(0, 0, 0, 0.4)" : "0 4px 32px rgba(100, 110, 140, 0.12)"};
    border: 1px solid ${({ theme }) => (theme.darkmode ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0")};
    position: relative;
  }
`;

const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--text-dark);
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }
`;

const DateDisplay = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  margin-left: auto;
  margin-right: 56px;
  transition: background 0.15s;
  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
  @media (max-width: 1024px) {
    margin-right: 52px;
  }
`;

const TitleSection = styled.div`
  margin-bottom: 16px;
`;

const PageTitle = styled.h1`
  font-size: clamp(26px, 5vw, 32px);
  font-weight: 800;
  color: var(--text-dark);
  letter-spacing: -0.5px;
  margin: 0 0 6px 0;
  line-height: 1.15;
`;

const PageSubtitle = styled.p`
  font-size: 13.5px;
  font-weight: 400;
  color: var(--text-subtle);
  margin: 0;
  line-height: 1.4;
`;

const AccentLine = styled.div<{ color: string }>`
  width: 100%;
  height: 2px;
  background-color: ${({ color }) => color || "#7851bf"};
  margin-bottom: 24px;
  border-radius: 1px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const SectionHeading = styled.h2`
  font-size: 15.5px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
`;

const CategoriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
`;

const CategoryCard = styled.div`
  border-radius: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--text-muted);
  }
`;

const CategoryCardMain = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  position: relative;
`;

const CategoryColorBar = styled.div<{ color: string }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background-color: ${({ color }) => color};
`;

const CategoryEmojiWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.03);
  flex-shrink: 0;
`;

const CategoryDot = styled.span<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

const CategoryInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

const CategoryName = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 14.5px;
  font-weight: 700;
  color: var(--text-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CategoryMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 3px;
`;

const CategoryTaskCount = styled.span`
  font-size: 11.5px;
  color: var(--text-muted);
`;

const CategoryActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledAccordion = styled(Accordion)`
  background: transparent !important;
  box-shadow: none !important;
  border-top: 1px solid var(--border-card) !important;
  margin: 0 !important;

  &:before {
    display: none !important;
  }

  & .MuiAccordionSummary-root {
    min-height: 36px !important;
    padding: 0 16px !important;
  }

  & .MuiAccordionSummary-content {
    margin: 6px 0 !important;
  }
`;

const AccordionTitle = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
`;

const AssociatedTasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const AssociatedTaskItem = styled.div<{ done: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.02);
  color: ${({ done }) => (done ? "var(--text-muted)" : "var(--text-dark)")};
  text-decoration: ${({ done }) => (done ? "line-through" : "none")};

  & span {
    flex: 1;
  }
`;

const AssociatedTaskDot = styled.span<{ done: boolean; color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ done, color }) => (done ? "#94a3b8" : color)};
`;

const TaskDoneBadge = styled.span`
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
`;

const FormCard = styled.section`
  padding: 22px;
  border-radius: 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormHeading = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
`;

const EmojiPickerRow = styled.div`
  display: flex;
  justify-content: center;
`;

const FormInputWrap = styled.div`
  position: relative;
  width: 100%;
`;

const ModernInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 13px 60px 13px 16px;
  border-radius: 14px;
  border: 1px solid var(--border-card);
  background: var(--bg-card);
  color: var(--text-dark);
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.primary}25`};
  }
`;

const CharCounter = styled.span<{ hasError: boolean }>`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 11px;
  font-weight: 600;
  color: ${({ hasError }) => (hasError ? "#ef4444" : "var(--text-muted)")};
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: #ef4444;
  margin-top: -8px;
`;

const ColorPickerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ColorPickerLabel = styled.label`
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-dark);
`;

const CreateCategoryBtn = styled.button<{ primaryColor: string }>`
  width: 100%;
  height: 48px;
  border-radius: 999px;
  border: none;
  background: ${({ primaryColor }) => primaryColor};
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px ${({ primaryColor }) => `${primaryColor}40`};

  &:hover:not(:disabled) {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const WarningNotice = styled.div`
  font-size: 12px;
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
  padding: 10px 12px;
  border-radius: 10px;
  margin-top: 12px;
  line-height: 1.4;
`;

const EmptyBox = styled.div`
  font-size: 13px;
  color: var(--text-muted);
  padding: 24px;
  text-align: center;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px dashed var(--border-card);
  margin-bottom: 24px;
`;

export default Categories;
