import React, { FC, useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import useClickOutside from "../../hooks/useClickOutside";
import { patternValidation } from "utils/validate";
import AddIcon from "../ui-components/AddIcon";
import { CardsData, CommentsData } from "App";
import { Card, NewCard } from "../Card";
interface ListProps {
  key: string;
  listTitle: string;
  id: string;
  cards: CardsData;
  comments: CommentsData;
  updateList: (id: string, title: string) => void;
  addCard: (listId: string, cardTitle: string) => void;
  deleteCard: (id: string) => void;
}

interface InputProps {
  readonly isEditing: boolean;
}
const List: FC<ListProps> = ({
  listTitle,
  updateList,
  id,
  cards,
  comments,
  addCard,
  deleteCard,
}) => {
  const [currentTitle, setCurrentTitle] = useState<string>(listTitle);
  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const ref = useRef<HTMLTextAreaElement>();
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
  useEffect(() => {
    console.log(listTitle);
  }, []);
  const handleonKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentTitle.trim() !== "" && !patternValidation(currentTitle)) {
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
  return (
    <ListWrapper>
      <ListHeader>
        <ListTitle>{listTitle}</ListTitle>
        {!isEditing && (
          <>
            <EditTitleContainer
              onClick={() => {
                setIsEditing(true);
              }}
            ></EditTitleContainer>
          </>
        )}
        <EditTitleInput
          ref={ref as any}
          isEditing={isEditing}
          rows={1}
          value={currentTitle}
          spellCheck={false}
          onChange={(e) => setCurrentTitle(e.target.value)}
          onKeyDown={handleonKeyDown}
        ></EditTitleInput>
      </ListHeader>
      {Object.values(cards).map((card) => {
        if (card.listId === id) {
          return (
            <Card
              listId={id}
              title={card.cardTitle}
              key={card.id}
              id={card.id}
              deleteCard={deleteCard}
              comments={comments}
            ></Card>
          );
        }
      })}
      {isAddingCard ? (
        <NewCard
          onCancelAddingCard={onCancelAddingCard}
          addCard={addCard}
          listId={id}
        ></NewCard>
      ) : (
        <AddCardButton onClick={() => setIsAddingCard(!isAddingCard)}>
          <IconContainer>
            <AddIcon></AddIcon>
          </IconContainer>
          <span>Add card</span>
        </AddCardButton>
      )}
    </ListWrapper>
  );
};
const ListWrapper = styled.div`
  width: 272px;
  background: ${(props) =>
    props.color || props.theme.containerColors.listWrapper};
  border-radius: 3px;
  margin-right: 12px;
  margin-bottom: 12px;
  padding: 0 4px 8px;
  display: flex;
  flex-direction: column;
`;

const ListHeader = styled.div`
  padding: 8px 4px;
  position: relative;
  display: flex;
`;
const ListTitle = styled.h2`
  display: none;
  text-align: start;
  color: ${(props) => props.color || props.theme.containerColors.listTitle};
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
      ? (props) => props.color || props.theme.containerColors.whiteBackground
      : "transparent"};
  border: none;
  border-radius: 3px;
  box-shadow: ${({ isEditing }) =>
    isEditing
      ? (props) => props.color || props.theme.containerColors.boxShadow
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
    color: ${(props) => props.color || props.theme.containerColors.placeholder};
  }

  &:focus {
    outline: none;
  }
`;
export const CardList = styled.div`
  min-height: 1px;
  padding: 0 4px;
  margin-bottom: 4px;
`;
const AddCardButton = styled.button`
  display: flex;
  align-items: flex-end;
  border: none;
  width: 70%;
  color: ${(props) => props.color || props.theme.containerColors.buttonText};
  background-color: ${(props) =>
    props.color || props.theme.buttons.transparent};
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
    color: ${(props) => props.color || props.theme.containerColors.listTitle};
  }
`;
const IconContainer = styled.div`
  margin-right: 4px;
  height: 20px;
  opacity: 0.8;
  display: flex;
  color: ${(props) => props.color || props.theme.containerColors.buttonText};
`;

export default List;
