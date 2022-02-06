import React, { FC, useRef, useEffect, useState, useMemo } from "react";
import { Comment } from "./components/Comment";
import { NewComment } from "./components/NewComment";
import { Description } from "./components/Description";
import { CardDataProps, CommentDataProps, CommentsData } from "App";
import useClickOutside from "app/views/hooks/useClickOutside";
import DeleteIcon from "../ui/icons/DeleteIcon";
import styled from "styled-components";
import { CardProperties } from "app/views/enum/enum";
import { COLORS } from "app/views/styles/colors";
import { DeleteButton } from "../ui/components/DeleteButton";
import { Textarea } from "../ui/components/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { selectComment } from "app/state/store";
import { updateCard } from "app/state/ducks/Card/reducers";
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
  const editTitleRef = useRef<HTMLTextAreaElement>(null);

  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(cardTitle);

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = title.trim();
      if (value) {
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
  useClickOutside(editTitleRef, () => {
    if (isEditingTitle) {
      setIsEditingTitle(false);
      setTitle(cardTitle);
    }
  });

  useEffect(() => {
    if (isEditingTitle) {
      editTitleRef?.current?.focus?.();
      editTitleRef?.current?.select?.();
    } else {
      editTitleRef?.current?.blur?.();
    }
  }, [isEditingTitle]);

  useEffect(() => {
    document.addEventListener("keydown", handleCloseView, false);

    return () => {
      document.removeEventListener("keydown", handleCloseView, false);
    };
  }, []);

  // const filteredComments = useMemo(
  //   () =>
  //     Object.values(comments).filter((comment) => comment.cardId === cardId),
  //   [comments]
  // );

  return (
    <Root>
      <Container>
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
              <Textarea
                isEditing={isEditingTitle}
                rows={1}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleOnKeyDown}
                spellCheck={false}
              ></Textarea>
            </div>
            <DeleteButton onClick={onClose}>
              <DeleteIcon></DeleteIcon>
            </DeleteButton>
          </Header>
          <ListTitleContainer>
            <ListTitle>В колонке {listTitle}</ListTitle>
          </ListTitleContainer>
          <Description
            cardDescription={cardDescription}
            cardId={cardId}
          ></Description>
          <Title>Actions</Title>
          <NewComment
            cardId={cardId}
          ></NewComment>
           {/*
          <CommentsContainer>
            <Title>Comments</Title>
            <ul>
              {filteredComments.map((comment) => {
                return (
                  <li key={comment.id}>
                    <Title>{username}</Title>
                    <Comment
                      id={comment.id}
                      commentValue={comment.comment}
                      onUpdateComment={onUpdateComment}
                      onDeleteComment={onDeleteComment}
                    ></Comment>
                  </li>
                );
              })}
            </ul>
          </CommentsContainer> */}
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