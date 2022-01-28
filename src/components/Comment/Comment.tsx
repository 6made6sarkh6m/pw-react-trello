import { CommentProps } from "App";
import DeleteIcon from "components/ui-components/DeleteIcon";
import useClickOutside from "hooks/useClickOutside";
import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
interface Comment {
    key: string;
  id: string;
  updateComment: (
    id: string,
    commentProperty: keyof CommentProps,
    value: string
  ) => void;
  commentValue: string;
  deleteComment: (id: string) => void;
}

const Comment: FC<Comment> = ({
  id,
  updateComment,
  commentValue,
  deleteComment,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [comment, setComment] = useState<string>(commentValue);
  const ref = useRef<HTMLTextAreaElement>();

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      updateComment(id, "comment", comment);
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
    <CommentContainer>
      {!isEditing && (
        <>
          <EditTitleButton
            onClick={() => {
              setIsEditing(true);
            }}
          />
          <CommentContent>{comment}</CommentContent>
        </>
      )}
      {isEditing && (
        <CommentInput
          ref={ref as any}
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
  );
};
const CommentContainer = styled.div`
  margin-top: 15px;
  position: relative;
  display: flex;
  width: 70%;
  min-height: 80px;
  background-color: #fff;
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
  background: #fff;
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
    color: #838da1;
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
export const DeleteButton = styled.button`
  align-self: flex-start;
  position: relative;
  color: ${(props) => props.color || props.theme.containerColors.buttonText};
  border: none;
  background-color: ${(props) =>
    props.color || props.theme.buttons.transparent};
  padding: 4px;
  border-radius: 3px;
  margin-top: -2px;
  margin-right: -4px;
  opacity: 0.8;

  :hover {
    opacity: 1;
    color: ${(props) => props.color || props.theme.containerColors.listTitle};
    background-color: rgba(9, 30, 66, 0.08);
  }
`;

export default Comment;
