import { CommentDataProps } from "App";
import DeleteIcon from "components/ui/icons/DeleteIcon";
import useClickOutside from "hooks/useClickOutside";
import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";
import { DeleteButton } from "components/ui/components/DeleteButton";
import { Textarea } from "components/ui/components/Textarea";
interface CommentProps {
  id: string;
  commentValue: string;
  onUpdateComment: (
    id: string,
    commentProperty: keyof CommentDataProps,
    value: string
  ) => void;
  onDeleteComment: (id: string) => void;
}

const Comment: FC<CommentProps> = ({
  id,
  commentValue,
  onUpdateComment,
  onDeleteComment,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [comment, setComment] = useState<string>(commentValue);
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      const trimmedComment = comment.trim();
      if (trimmedComment) {
        setIsEditing(false);
        onUpdateComment(id, "comment", comment);
      } else {
        setIsEditing(false);
        setComment(commentValue);
      }
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setComment(commentValue);
    }
  };
  useClickOutside(ref, () => {
    if (isEditing) {
      setIsEditing(false);
    }
  });

  useEffect(() => {
    if (isEditing) {
      ref?.current?.focus?.();
      ref?.current?.select?.();
    }
  }, [isEditing]);
  return (
    <>
      <CommentContainer>
        {!isEditing && <CommentContent>{comment}</CommentContent>}

        {isEditing && (
          <Textarea
            autoFocus={true}
            rows={1}
            value={comment}
            spellCheck={false}
            onKeyDown={handleOnKeyDown}
            onChange={(e) => setComment(e.target.value)}
          />
        )}
        <DeleteButton onClick={() => onDeleteComment(id)}>
          <DeleteIcon />
        </DeleteButton>
      </CommentContainer>
      <EditCommentButton href="#" onClick={() => setIsEditing(true)}>
        Edit
      </EditCommentButton>
    </>
  );
};
const CommentContainer = styled.div`
  position: relative;
  display: flex;
  width: 70%;
  min-height: 40px;
  background-color: ${COLORS.lightGrey};
  border-radius: 3px;
  box-shadow: 0 1px 0 ${COLORS.greyShadowed};
  padding: 0px 4px;
  overflow: hidden;
`;

const CommentContent = styled.span`
  font-family: sans-serif;
  font-size: 14px;
  flex-grow: 1;
  font-weight: 400;
  line-height: 20px;
  text-align: start;
  word-break: break-all;
`;

const EditCommentButton = styled.a`
  margin: 8px 4px;
  text-decoration: underline;
  font-family: sans-serif;
  background-color: transparent;
  font-size: 13px;
  color: ${COLORS.deepGrey};
`;

export default Comment;
