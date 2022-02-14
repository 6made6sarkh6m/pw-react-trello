import React, { FC, useRef, useEffect, useState, useMemo } from "react";
import { Comment } from "./components/Comment";
import { NewComment } from "./components/NewComment";
import { Description } from "./components/Description";
import useClickOutside from "hooks/useClickOutside";
import DeleteIcon from "../ui/icons/DeleteIcon";
import styled from "styled-components";
import { COLORS } from "styles/colors";
import { DeleteButton } from "../ui/components/DeleteButton";
import { Textarea } from "../ui/components/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { selectComment, selectUser } from "redux/selectors";
import { updateCard } from "redux/ducks/Card/CardSlice";
import { Form, Field } from "react-final-form";
interface CardViewProps {
  onClose?: () => void;
  cardId: string;
  cardTitle: string;
  listTitle: string;
  cardDescription: string;
}
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
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setTitle] = useState(cardTitle);
  const modalRef = useRef(null);

  const handleSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      const title = newTitle.trim();
      if (title) {
        dispatch(updateCard({ cardId, title }));
        setIsEditingTitle(false);
      } else {
        setTitle(cardTitle);
        setIsEditingTitle(false);
      }
    }
  };

  const handleCloseView: EventListener | EventListenerObject = (e) => {
    const event = e as KeyboardEvent;
    if (event.key === "Escape") {
      setIsEditingTitle(false);
      setTitle(cardTitle);
      onClose?.();
    }
  };

  useClickOutside(modalRef, () => {
    onClose?.();
  });

  useEffect(() => {
    document.addEventListener("keydown", handleCloseView, false);

    return () => {
      document.removeEventListener("keydown", handleCloseView, false);
    };
  }, []);

  const filteredComments = useMemo(
    () =>
      Object.values(comments).filter((comment) => comment.cardId === cardId),
    [comments]
  );

  return (
    <Root>
      <Container ref={modalRef}>
        <Modal>
          <Header>
            <div style={{ width: "90%" }}>
              <CardTitle>{cardTitle}</CardTitle>
              {!isEditingTitle && (
                <>
                  <EditTitleContainer
                    onClick={() => {
                      setIsEditingTitle(true);
                    }}
                  ></EditTitleContainer>
                </>
              )}
              <Form
                onSubmit={handleSubmit}
                render={({ handleSubmit }) => (
                  <form onKeyDown={handleSubmit}>
                    <Field
                      name="card-title"
                      render={() => {
                        return (
                          <Textarea
                            isEditing={isEditingTitle}
                            rows={1}
                            value={newTitle}
                            onKeyDown={handleSubmit}
                            onChange={(e) => setTitle(e.target.value)}
                            spellCheck={false}
                          />
                        );
                      }}
                    />
                  </form>
                )}
              ></Form>
            </div>
            <DeleteButton onClick={onClose}>
              <DeleteIcon />
            </DeleteButton>
          </Header>
          <ListTitleContainer>
            <ListTitle>В колонке {listTitle}</ListTitle>
          </ListTitleContainer>
          <Description
            cardDescription={cardDescription}
            id={cardId}
          ></Description>
          <Title>Actions</Title>
          <NewComment cardId={cardId}></NewComment>
          <CommentsContainer>
            <Title>Comments</Title>
            <ul>
              {filteredComments.map((comment) => {
                return (
                  <li key={comment.id}>
                    <Title>{name}</Title>
                    <Comment
                      id={comment.id}
                      commentValue={comment.comment}
                    ></Comment>
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
  }
`;

const Container = styled.div`
  position: relative;
  width: max-content;
  background-color: ${COLORS.blindingWhite};
  border-radius: 2px;
  padding: 10px;
  margin: 30px 5px 80px;
  overflow: hidden;
`;

const Modal = styled.div`
  width: 768px;
  min-height: 600px;
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

const CardTitle = styled.h2`
  display: none;
  text-align: start;
  color: black;
  font-weight: 600;
  max-height: 30px;
  padding: 8px;
  margin: 0;
`;

const EditTitleContainer = styled.div`
  position: absolute;
  max-height: 60px;
  margin: 0 4px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 4px;
  cursor: text;
  width: 90%;
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

export default CardModal;
