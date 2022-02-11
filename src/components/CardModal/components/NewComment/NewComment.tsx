import React, { FC, useRef, useState } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";
import { Button } from "components/ui/components/Button";
import { Textarea } from "components/ui/components/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "redux/ducks/Comments/CommentsSlice";
import { selectUser } from "redux/selectors";
interface NewCommentProps {
  cardId: string;
}
const NewComment: FC<NewCommentProps> = ({ cardId }) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const authorData = useSelector(selectUser);
  const author = authorData.name;
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");
  const onSaveComment = () => {
    const comment = newComment.trim();
    if (comment) {
      dispatch(addComment({ cardId, comment, author }));
      setNewComment("");
      ref?.current?.blur?.();
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      const comment = newComment.trim();
      if (comment) {
        dispatch(addComment({ cardId, comment, author }));
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
  padding: 0px 4px;
`;
const StyledButton = styled(Button)`
  width: 70px;
  align-items: center;
`;
export default NewComment;
