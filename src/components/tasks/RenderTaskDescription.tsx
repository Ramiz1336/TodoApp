import React, { memo } from "react";
import { URL_REGEX } from "../../constants";
import { Task } from "../../types/user";
import { Button, Tooltip } from "@mui/material";
import styled from "@emotion/styled";
import { getFontColor } from "../../utils";
import { LinkOffRounded } from "@mui/icons-material";

interface RenderTaskDescriptionProps {
  task: Task;
  textHighlighter?: (text: string) => React.ReactNode;
  enableLinks?: boolean;
  fullDescription?: boolean;
}

export const RenderTaskDescription = memo(
  ({
    task,
    textHighlighter = (text) => text,
    enableLinks = true,
    fullDescription = false,
  }: RenderTaskDescriptionProps) => {
    if (!task.description) return null;

    const { description, color } = task;

    // split the description into parts preserving links
    const parts = description.split(URL_REGEX);

    const descriptionWithLinks = parts.map((part, index) => {
      const isURL = index % 2 === 1;
      return isURL ? (
        <DescriptionLink
          key={index}
          url={part}
          color={color}
          disabled={!enableLinks}
          textHighlighter={textHighlighter}
        />
      ) : (
        <React.Fragment key={index}>{textHighlighter(part)}</React.Fragment>
      );
    });

    return (
      <>
        <ScreenDescription fullDescription={fullDescription} title={task.description}>
          {descriptionWithLinks}
        </ScreenDescription>
        <PrintDescription>{task.description}</PrintDescription>
      </>
    );
  },
);

interface DescriptionLinkProps {
  url: string;
  color: string;
  disabled?: boolean;
  textHighlighter?: (text: string) => React.ReactNode;
}

const DescriptionLink = memo(
  ({ url, color, disabled = false, textHighlighter = (text) => text }: DescriptionLinkProps) => {
    let domain = "";
    try {
      const urlObj = new URL(url);
      domain = urlObj.hostname.replace("www.", "");
    } catch (error) {
      console.error(`Invalid URL: ${url}`, error);
    }

    const LinkContent = (
      <StyledDescriptionLink
        id="task-description-link"
        clr={color}
        data-disabled={disabled}
        disabled={disabled}
      >
        {/* put a tag inside button to enable link preview on ios */}
        <a
          href={disabled ? undefined : url}
          rel={disabled ? undefined : "noreferrer"}
          target="_blank"
        >
          <div>
            {disabled ? (
              <LinkOffRounded />
            ) : (
              <FaviconImage
                draggable={false}
                alt="favicon"
                src={`https://www.google.com/s2/favicons?sz=96&domain_url=${url}`}
                style={{ width: 20, height: 20, marginRight: 2, borderRadius: 4 }}
              />
            )}
            {textHighlighter(domain)}
          </div>
        </a>
      </StyledDescriptionLink>
    );

    return <Tooltip title={url}>{LinkContent}</Tooltip>;
  },
);

const FaviconImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 2px;
  border-radius: 4px;

  -webkit-user-drag: none;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const StyledDescriptionLink = styled(Button)<{ clr: string }>`
  margin: 0;
  color: ${({ clr }) => getFontColor(clr)};
  padding: 0 4px;
  display: inline-block;
  background: ${({ clr }) => getFontColor(clr)}28;
  backdrop-filter: none !important;
  text-transform: none !important;
  min-width: unset !important;
  user-select: auto !important;
  border-radius: 6px;
  &:hover {
    background: ${({ clr }) => getFontColor(clr)}19;
  }
  & div {
    word-break: break-all;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  @media print {
    color: black;
  }
`;

const ScreenDescription = styled.div<{ fullDescription: boolean }>`
  display: ${({ fullDescription }) => (fullDescription ? "block" : "-webkit-box")};
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${({ fullDescription }) => (fullDescription ? "normal" : "normal")};
  white-space: ${({ fullDescription }) => (fullDescription ? "pre-wrap" : "normal")};
  -webkit-line-clamp: ${({ fullDescription }) => (fullDescription ? "unset" : "1")};
  -webkit-box-orient: vertical;

  & > * {
    max-width: 100%;
  }
  @media print {
    display: none !important;
  }
`;

const PrintDescription = styled.div`
  display: none;

  @media print {
    display: block !important;
    color: black !important;
  }
`;
