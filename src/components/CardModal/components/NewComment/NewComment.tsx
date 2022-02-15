import React, { FC, useRef, useState } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";
import { Button } from "components/ui/components/Button";
import { Textarea } from "components/ui/components/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "redux/ducks/Comments/CommentsSlice";
import { selectUser } from "redux/selectors";
import { Form, Field } from "react-final-form";

interface NewCommentProps {
  cardId: string;
}

type Value = {
  newComment: string;
};
const NewComment: FC<NewCommentProps> = ({ cardId }) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const authorData = useSelector(selectUser);
  const author = authorData.name;
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");

  const onSubmit = (value: Value) => {
    const comment = value.newComment.trim();
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
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => (
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <Field
              name="newComment"
              render={({ input, rest }) => {
                return (
                  <Textarea
                    {...input}
                    {...rest}
                    rows={3}
                    placeholder="Type your comment here"
                    spellCheck={false}
                  />
                );
              }}
            />
            <StyledButton type={"submit"} primary={true} onClick={handleSubmit}>
              Add
            </StyledButton>
          </form>
        )}
      />
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
