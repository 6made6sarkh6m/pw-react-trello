import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useClickOutside from "../../hooks/useClickOutside";
import AddIcon from "../ui-components/icons/AddIcon";
import { CardDataProps, CardsData, CommentDataProps, CommentsData } from "App";
import { Card} from "../Card";
import { NewCard } from "../NewCard";
import { COLORS } from "styles/colors";
interface ListProps {
  key: string;
  listTitle: string;
  id: string;
  cards: CardsData;
  comments: CommentsData;
  username: string;
  updateList: (id: string, title: string) => void;
  addCard: (listId: string, cardTitle: string) => void;
  deleteCard: (id: string) => void;
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
const List: FC<ListProps> = ({
  listTitle,
  id,
  cards,
  comments,
  username,
  addCard,
  deleteCard,
  updateCardTitle,
  updateComment,
  deleteComment,
  addComment,
  updateList,
}) => {
  const [currentTitle, setCurrentTitle] = useState<string>(listTitle);
  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  
  const handleonKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentTitle.trim() !== "") {
        setIsEditing(false);
        updateList(id, currentTitle);
      }
    }

    if (e.key === "Escape") {
      setCurrentTitle(listTitle);
      setIsEditing(false);
    }
  };

  const onCancelAddingCard = () => {
    setIsAddingCard(false);
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
    } else {
      ref?.current?.blur?.();
    }
  }, [isEditing]);
  return (
    <Root >
      <ListHeader>
        <ListTitle>{listTitle}</ListTitle>
        {!isEditing && (
            <EditTitleContainer
              onClick={() => {
                setIsEditing(true);
              }}
            ></EditTitleContainer>
        )}
        <EditTitleInput
          ref={ref}
          isEditing={isEditing}
          rows={1}
          value={currentTitle}
          spellCheck={false}
          onChange={(e) => setCurrentTitle(e.target.value)}
          onKeyDown={handleonKeyDown}
        ></EditTitleInput>
      </ListHeader>
      {Object.values(cards)
        .filter((card) => card.listId === id)
        .map((card) => {
          return (
            <Card
              listId={id}
              title={card.cardTitle}
              key={card.id}
              id={card.id}
              username={username}
              comments={comments}
              cardDescription={card.cardDescription}
              listTitle={listTitle}
              deleteCard={deleteCard}
              updateCardTitle={updateCardTitle}
              updateComment={updateComment}
              deleteComment={deleteComment}
              addComment={addComment}
            ></Card>
          );
        })}
      {isAddingCard ? (
        <NewCard
          listId={id}
          onCancelAddingCard={onCancelAddingCard}
          addCard={addCard}
        ></NewCard>
      ) : (
        <AddCardButton onClick={() => setIsAddingCard(!isAddingCard)}>
          <IconContainer>
            <AddIcon></AddIcon>
          </IconContainer>
          <span>Add card</span>
        </AddCardButton>
      )}
    </Root>
  );
};
const Root = styled.div`
  width: 272px;
  background: ${COLORS.listWrapper};
  border-radius: 3px;
  margin-right: 12px;
  margin-bottom: 12px;
  padding: 0 4px 8px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 800px){
    width: 100%;
  }
`;

const ListHeader = styled.div`
  padding: 8px 4px;
  position: relative;
  display: flex;
`;
const ListTitle = styled.h2`
  display: none;
  text-align: start;
  color: ${COLORS.listTitle};
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  min-height: 20px;
  padding: 8px;
  margin: 0;
`;

const EditTitleContainer = styled.div`
  position: absolute;
  margin: 0 4px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 4px;
  cursor: pointer;
`;
const EditTitleInput = styled.textarea<InputProps>`
  font-family: sans-serif;
  width: 100%;
  color: #172b4d;
  background: ${({ isEditing }) =>
    isEditing
      ? () => COLORS.whiteBackground
      : "transparent"};
  border: none;
  border-radius: 3px;
  box-shadow: ${({ isEditing }) =>
    isEditing
      ? () => COLORS.boxShadow
      : "none"};
  resize: none;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  min-height: 20px;
  padding: 4px 8px;
  margin: 0;
  display: block;
  transition: all 0.1s linear;

  ::placeholder {
    font-weight: 400;
    color: ${COLORS.placeholder};
  }

  &:focus {
    outline: none;
  }
`;
const AddCardButton = styled.button`
  display: flex;
  align-items: flex-end;
  border: none;
  width: 70%;
  color: ${COLORS.buttonText};
  background-color: ${COLORS.buttonColors.transparent};
  border-radius: 3px;
  padding: 4px 8px;
  margin: 0 4px;
  font-size: 14px;
  cursor: pointer;
  & > span {
    line-height: 20px;
    font-family: sans-serif;
  }
  &:hover,
  &:focus {
    outline: none;
    background-color: rgba(9, 30, 66, 0.08);
    color: ${COLORS.listTitle};
  }
`;
const IconContainer = styled.div`
  margin-right: 4px;
  height: 20px;
  opacity: 0.8;
  display: flex;
  color: ${COLORS.buttonText};
`;

export default List;
