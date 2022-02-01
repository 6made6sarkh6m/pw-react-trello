import React, { FC, useRef, useState } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";
import { Button } from "components/ui/components/Button";
import { Textarea } from "components/ui/components/Textarea";
interface NewCommentProps {
  cardId: string;
  username: string;
  onAddComment: (cardId: string, author: string, comment: string) => void;
}
const NewComment: FC<NewCommentProps> = ({
  cardId,
  username,
  onAddComment,
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [newComment, setNewComment] = useState<string>("");
  const onSaveComment = () => {
    const trimmedComment = newComment.trim();
    if (trimmedComment) {
      onAddComment(cardId, username, newComment);
      setNewComment("");
      ref?.current?.blur?.();
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (newComment.trim() !== "") {
        onAddComment(cardId, username, newComment);
        setNewComment("");
        ref?.current?.blur?.();
      }
    }
  };
  return (
    <NewCommentContainer>
      <Textarea
        rows={3}
        value={newComment}
        placeholder="Type your comment here"
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={handleOnKeyDown}
        spellCheck={false}
      ></Textarea>
      <StyledButton primary={true} onClick={onSaveComment}>
        Add
      </StyledButton>
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
  box-shadow: 0 1px 0 ${COLORS.greyShadowed};
  padding: 0px 4px;
`;
const StyledButton = styled(Button)`
  width: 70px;
  align-items: center;
`;
export default NewComment;
