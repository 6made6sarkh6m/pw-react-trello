import React, { FC, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "components/ui/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "redux/ducks/Comments/CommentsSlice";
import { selectUser } from "redux/selectors";
import { Form, Field } from "react-final-form";
import { TextInput } from "components/ui/components/TextInput";

interface NewCommentProps {
  cardId: string;
}

type Value = {
  newComment: string;
};
const NewComment: FC<NewCommentProps> = ({ cardId }) => {
  const authorData = useSelector(selectUser);
  const author = authorData.name;
  const dispatch = useDispatch();

  const onSubmit = (value: Value) => {
    const comment = value.newComment.trim();
    if (comment) {
      dispatch(addComment({ cardId, comment, author }));
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
              form.change("newComment", undefined);
            }}
          >
            <Field
              name="newComment"
              render={({ input, rest }) => {
                return (
                  <TextInput
                    {...input}
                    {...rest}
                    placeholder="Type your comment here"
                    spellCheck={false}
                  />
                );
              }}
            />
            <StyledButton type={"submit"} primary={true}>
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
  width: 100%;
  margin-top: 15px;
  position: relative;
  min-height: 20px;
  padding: 0px 4px;
`;

const StyledButton = styled(Button)`
  max-width: 80px;
  width: 100%;
  align-items: center;
`;

export default NewComment;
