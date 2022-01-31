import { CommentDataProps } from "App";
import DeleteIcon from "components/ui/icons/DeleteIcon";
import useClickOutside from "hooks/useClickOutside";
import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";
interface CommentProps {
  key: string;
  id: string;
  commentValue: string;
  updateComment: (
    id: string,
    commentProperty: keyof CommentDataProps,
    value: string
  ) => void;
  deleteComment: (id: string) => void;
}

const Comment: FC<CommentProps> = ({
  id,
  commentValue,
  updateComment,
  deleteComment,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [comment, setComment] = useState<string>(commentValue);
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if(comment.trim() !== ""){
      setIsEditing(false);
      updateComment(id, "comment", comment);
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
        {
          !isEditing && (
            <CommentContent>{comment}</CommentContent>
          )
        }
         
        {isEditing && (
          <CommentInput
            ref={ref}
            rows={1}
            value={comment}
            spellCheck={false}
            onKeyDown={handleOnKeyDown}
            onChange={(e) => setComment(e.target.value)}
          />
        )}
        <DeleteButton onClick={() => deleteComment(id)}>
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
  min-height: 80px;
  background-color: ${COLORS.listWrapper};
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  padding: 0px 4px;
  overflow: hidden;
`;
export const CommentContent = styled.span`
  font-family: sans-serif;
  font-size: 14px;
  flex-grow: 1;
  font-weight: 400;
  line-height: 20px;
  text-align: start;
  word-break: break-all;
`;

export const CommentInput = styled.textarea`
  flex-grow: 1;
  font-family: sans-serif;
  width: 100%;
  background: ${COLORS.listWrapper};
  border: none;
  border-radius: 3px;
  resize: none;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  min-height: 20px;
  display: block;
  overflow: hidden;

  ::placeholder {
    font-weight: 400;
    color: ${COLORS.placeholder};
  }

  &:focus {
    outline: none;
  }
`;

export const EditTitleButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const EditCommentButton = styled.a`
  text-decoration: underline;
  font-family: sans-serif;
  background-color: transparent;
  font-size: 13px;
  color: ${COLORS.buttonText}
`;

export const DeleteButton = styled.button`
  align-self: flex-start;
  position: relative;
  color: ${COLORS.buttonText};
  border: none;
  background-color: ${COLORS.buttonColors.transparent};
  padding: 4px;
  border-radius: 3px;
  margin-top: -2px;
  margin-right: -4px;
  opacity: 0.8;

  :hover {
    opacity: 1;
    color: ${COLORS.listTitle};
    background-color: rgba(9, 30, 66, 0.08);
  }
`;

export default Comment;
