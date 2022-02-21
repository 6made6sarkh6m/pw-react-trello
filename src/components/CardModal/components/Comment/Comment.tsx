import React, { FC, useEffect, useRef, useState } from "react";
import useClickOutside from "hooks/useClickOutside";
import styled from "styled-components";
import { COLORS } from "styles/colors";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "redux/ducks/Comments";
import { Field, Form } from "react-final-form";
import { TextInput, DeleteButton, DeleteIcon } from "components/ui";
import { composeValidators } from "utils/composeValidators";
import { hasEmptyValue } from "helpers/validators";

interface CommentProps {
  id: string;
  commentValue: string;
}
type Value = {
  comment: string;
};
const Comment: FC<CommentProps> = ({ id, commentValue }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(commentValue);
  const ref = useRef<HTMLTextAreaElement>(null);

  const onSubmit = (value: Value) => {
    const comment = value.comment;
    dispatch(updateComment({ id, comment }));
    setComment(comment);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    dispatch(deleteComment({ id }));
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
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <StyledForm onSubmit={handleSubmit}>
                <Field
                  name="comment"
                  initialValue={comment}
                  validate={composeValidators(hasEmptyValue)}
                  render={({ input, rest }) => {
                    return <TextInput {...input} {...rest} autoFocus />;
                  }}
                />
              </StyledForm>
            )}
          />
        )}
        <DeleteButton onClick={handleDeleteClick}>
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
  width: 100%;
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
const StyledForm = styled.form`
  flex-grow: 1;
`;

export default Comment;
