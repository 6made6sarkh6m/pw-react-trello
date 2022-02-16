import React, { FC, useRef, useMemo } from "react";
import useClickOutside from "hooks/useClickOutside";
import styled from "styled-components";
import { COLORS } from "styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { selectComment, selectUser } from "redux/selectors";
import { updateCard } from "redux/ducks/Card";
import { Form, Field } from "react-final-form";
import { DeleteButton, DeleteIcon, TextInput } from "components/ui";
import { Description, NewComment, Comment } from "./components";

interface CardViewProps {
  onClose?: () => void;
  cardId: string;
  cardTitle: string;
  listTitle: string;
  cardDescription: string;
}

type Value = {
  title: string;
};

const CardModal: FC<CardViewProps> = ({
  onClose,
  cardId,
  cardTitle,
  listTitle,
  cardDescription,
}) => {
  const dispatch = useDispatch();
  const comments = useSelector(selectComment);
  const { name } = useSelector(selectUser);
  const modalRef = useRef(null);

  const onSubmit = (value: Value) => {
    const title = value.title.trim();
    if (title) {
      dispatch(updateCard({ cardId, title }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmedTitle = e.currentTarget.value.trim();
      if (trimmedTitle) {
        onSubmit({ title: e.currentTarget.value });
        e.currentTarget.blur();
      }
    }
  };

  const handleCloseView = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      onClose?.();
    }
  };

  useClickOutside(modalRef, () => {
    onClose?.();
  });

  const filteredComments = useMemo(
    () =>
      Object.values(comments).filter((comment) => comment.cardId === cardId),
    [comments]
  );

  return (
    <Root>
      <Container ref={modalRef} onKeyDown={handleCloseView}>
        <Modal>
          <Header>
            <CardTitleContainer>
              <Form
                onSubmit={onSubmit}
                validate={(values) => {
                  const errors = {
                    title: "",
                  };

                  if (!values.title || !values.title.trim()) {
                    errors.title = "Required";
                  }

                  return errors;
                }}
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Field
                      name="title"
                      initialValue={cardTitle}
                      render={({ input, rest, meta }) => {
                        return (
                          <>
                            <TextInput
                              {...input}
                              {...rest}
                              onKeyDown={handleKeyDown}
                            />
                            {meta.error && meta.touched && (
                              <ErrorTitle>{meta.error}</ErrorTitle>
                            )}
                          </>
                        );
                      }}
                    />
                  </form>
                )}
              />
            </CardTitleContainer>
            <DeleteButton onClick={onClose}>
              <DeleteIcon />
            </DeleteButton>
          </Header>

          <ListTitleContainer>
            <ListTitle>В колонке {listTitle}</ListTitle>
          </ListTitleContainer>

          <Description cardDescription={cardDescription} id={cardId} />

          <Title>Actions</Title>
          <NewComment cardId={cardId} />

          <CommentsContainer>
            <Title>Comments</Title>
            <ul>
              {filteredComments.map((comment) => {
                return (
                  <li key={comment.id}>
                    <Title>{name}</Title>
                    <Comment id={comment.id} commentValue={comment.comment} />
                  </li>
                );
              })}
            </ul>
          </CommentsContainer>
        </Modal>
      </Container>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${COLORS.shadowed};
  z-index: 10;
  margin: 0;
  padding: 0;
  overflow-y: auto;
`;

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  position: relative;
  background-color: ${COLORS.blindingWhite};
  border-radius: 2px;
  padding: 10px;
  margin: 30px 5px 80px;
  overflow: hidden;
`;

const Modal = styled.div`
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Header = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-between;
  padding: 0 4px;
`;

const CardTitleContainer = styled.div`
  width: 100%;
`;

const ListTitleContainer = styled.div`
  display: flex;
  align-self: flex-start;
  padding: 0 12px;
`;

const ListTitle = styled.span`
  font-size: 12px;
  font-family: sans-serif;
  color: ${COLORS.deepGrey};
  display: flex;
`;

const Title = styled.h2`
  text-align: start;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  min-height: 20px;
  padding: 8px;
  margin: 0;
  font-family: sans-serif;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const ErrorTitle = styled.p`
  font-family: sans-serif;
  color: ${COLORS.error};
  font-size: 15px;
  margin: 0;
  min-height: 20px;
`;
export default CardModal;
