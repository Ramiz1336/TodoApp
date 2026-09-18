import styled from "@emotion/styled";
import { Avatar, Chip, ChipProps } from "@mui/material";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import type { Category } from "../types/user";

interface CategoryBadgeProps extends ChipProps, StyledBadgeProps {
  category: Category;
  emojiSizes?: [number, number];
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, emojiSizes, ...props }) => {
  const { user } = useContext(UserContext);
  const { emojisStyle, settings } = user;

  const emojiSize = emojiSizes
    ? emojisStyle !== EmojiStyle.NATIVE
      ? emojiSizes[0]
      : emojiSizes[1]
    : 14;

  return (
    <StyledCategoryBadge
      key={category.id}
      label={category.name}
      variant="outlined"
      backgroundclr={category.color}
      glow={settings.enableGlow}
      translate="no"
      avatar={
        category.emoji ? (
          <Avatar alt={category.name} sx={{ background: "transparent", borderRadius: "0px" }}>
            <Emoji lazyLoad size={emojiSize} unified={category.emoji} emojiStyle={emojisStyle} />
          </Avatar>
        ) : undefined
      }
      {...props}
    />
  );
};

interface StyledBadgeProps {
  backgroundclr?: string;
  borderclr?: string;
  glow?: boolean;
  list?: boolean | string;
}

export const StyledCategoryBadge = styled(Chip)<StyledBadgeProps>`
  color: ${({ backgroundclr, list, theme }) =>
    list ? (theme.darkmode ? "#f8fafc" : "#17243a") : backgroundclr || theme.primary || "#7851bf"};
  background-color: ${({ backgroundclr, list, theme }) =>
    list
      ? theme.darkmode
        ? "rgba(255, 255, 255, 0.05)"
        : "#ffffff"
      : backgroundclr
        ? `${backgroundclr}22`
        : theme.darkmode
          ? "rgba(255,255,255,0.08)"
          : "#f1f5f9"};
  border: ${({ borderclr, backgroundclr, list, theme }) =>
    borderclr
      ? `1.5px solid ${borderclr}`
      : list
        ? `1.5px solid ${theme.darkmode ? "rgba(255, 255, 255, 0.15)" : "#cbd5e1"}`
        : backgroundclr
          ? `1px solid ${backgroundclr}35`
          : "none"};
  border-radius: 999px;
  font-weight: 600;
  font-size: 11.5px;
  margin: 0;
  padding: 2px 4px;
  height: 22px;
  transition: all 0.2s ease;
  box-shadow: none;

  &:hover {
    background-color: ${({ backgroundclr, list }) =>
      list ? "rgba(120, 81, 191, 0.1)" : backgroundclr ? `${backgroundclr}33` : undefined};
  }

  & .MuiChip-label {
    padding-left: 8px;
    padding-right: 8px;
  }

  & .MuiChip-deleteIcon {
    color: inherit;
    transition: 0.2s all;
    width: 16px;
    height: 16px;
    stroke: transparent;

    &:hover {
      opacity: 0.7;
    }
  }

  @media print {
    box-shadow: none;
    border: 1px solid black;
    background-color: white;
    color: black;
  }
`;
