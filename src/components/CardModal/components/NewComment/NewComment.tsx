import React, { FC, useRef, useState } from "react";
import styled from "styled-components";
import { SaveButton } from "components/ui/components/InputComponents";
import { COLORS } from "styles/colors";
interface NewCommentProps {
  cardId: string;
  username: string;
  addComment: (cardId: string, author: string, comment: string) => void;
}
const NewComment: FC<NewCommentProps> = ({ cardId, username, addComment }) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [newComment, setNewComment] = useState<string>("");
  const onSaveComment = () => {
    const trimmedComment = newComment.trim();
    if (trimmedComment) {
      addComment(cardId, username, newComment);
      setNewComment("");
        ref?.current?.blur?.();
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (newComment.trim() !== "") {
        addComment(cardId, username, newComment);
        setNewComment("");
        ref?.current?.blur?.();
      }
    }
  };
  return (
    <NewCommentContainer>
      <NewCommentInput
        ref={ref}
        value={newComment}
        placeholder="Type your comment here"
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={handleOnKeyDown}
        spellCheck={false}
      ></NewCommentInput>
      <SaveButton onClick={onSaveComment}>
        <span>Save</span>
      </SaveButton>
    </NewCommentContainer>
  );
};

const NewCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-top: 15px;
  position: relative;
  min-height: 20px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  padding: 0px 4px;
`;
const NewCommentInput = styled.textarea`
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
export default NewComment;
