import React, { FC, useRef, useEffect, useState } from "react";
import { Comment } from "./components/Comment";
import { NewComment } from "./components/NewComment";
import { Description } from "./components/Description";
import { CardDataProps, CommentDataProps, CommentsData } from "App";
import useClickOutside from "hooks/useClickOutside";
import DeleteIcon from "../ui/icons/DeleteIcon";
import styled from "styled-components";
import { CardProperties } from "enum/enum";
import { COLORS } from "styles/colors";
import {EditTitleInput, DeleteButton} from "../ui/components/InputComponents";

interface CardViewProps {
  onClose?: () => void;
  comments: CommentsData;
  cardId: string;
  cardTitle: string;
  listTitle: string;
  cardDescription: string;
  username: string;
  updateCardTitle: (
    cardId: string,
    cardProperty: keyof CardDataProps,
    value: string
  ) => void;
  updateComment: (
    id: string,
    commentProperty: keyof CommentDataProps,
    value: string
  ) => void;
  deleteComment: (id: string) => void;
  addComment: (cardId: string, author: string, comment: string) => void;
}
interface InputProps {
  readonly isEditing: boolean;
}

const CardModal: FC<CardViewProps> = ({
  onClose,
  comments,
  cardId,
  cardTitle,
  listTitle,
  cardDescription,
  username,
  updateCardTitle,
  updateComment,
  deleteComment,
  addComment,
}) => {
  const editTitleRef = useRef<HTMLTextAreaElement>(null);

  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(cardTitle);

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (title.trim() !== "") {
        setIsEditingTitle(false);
        updateCardTitle(cardId, CardProperties.title, title);
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
              <EditTitleInput
                ref={editTitleRef}
                isEditing={isEditingTitle}
                rows={1}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleOnKeyDown}
                spellCheck={false}
              ></EditTitleInput>
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
            updateCardTitle={updateCardTitle}
          ></Description>
          <Title>Actions</Title>
          <NewComment
            cardId={cardId}
            username={username}
            addComment={addComment}
          ></NewComment> 
          <CommentsContainer>
            <Title>Comments</Title>
            {Object.values(comments)
              .filter((comment) => comment.cardId === cardId)
              .map((comment) => {
                return (
                  <>
                    <Title key={comment.id}>{username}</Title>
                    <Comment
                      id={comment.id}
                      key={comment.id}
                      commentValue={comment.comment}
                      updateComment={updateComment}
                      deleteComment={deleteComment}
                    ></Comment>
                  </>
                );
              })}
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
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    margin: 0;
    padding: 0;
    overflow-y: auto;
  }
`;

const Container = styled.div`
  position: relative;
  width: max-content;
  background-color: ${COLORS.whiteBackground};
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
    width: 100%%;
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
  color: ${COLORS.buttonText};
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
