import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useClickOutside from "../../hooks/useClickOutside";
import AddIcon from "ui-components/AddIcon";
import { CardsData } from "App";
import { Card } from "../Card";
interface ListProps {
  key: string;
  title: string;
  listId: string;
  cards: CardsData;
  updateList: (listId: string, title: string) => void;
}

interface InputProps {
  readonly isEditing: boolean;
}
const List: FC<ListProps> = ({title, children, updateList, listId, cards}) => {
  const [currentTitle, setCurrentTitle] = useState<string>(title);
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

  const handleonKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditing(false);
      updateList(listId, currentTitle)
    }

    if (e.key === "Escape") {
      setCurrentTitle(title);
      setIsEditing(false);
    }
  };
  return (
    <ListWrapper>
      <ListHeader>
        <ListTitle>{currentTitle}</ListTitle>
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
      {
        Object.keys(cards).map((card) => {
          if(cards[card].listId === listId ) {
            return (
              <Card title={cards[card].cardTitle} key = {cards[card].cardId}></Card>
            )
          }
        })
      }
      <AddCardButton>
        <IconContainer>
          <AddIcon></AddIcon>
        </IconContainer>
        <span>Add card</span>
      </AddCardButton>
    </ListWrapper>
  );
};
const ListWrapper = styled.div`
  min-width: 272px;
  max-width: 272px;
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
