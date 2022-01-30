import React, { FC } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";
interface NewCardProps {
  listId: string;
  onCancelAddingCard: () => void;
  addCard: (listId: string, currentTitle: string) => void;
};

export const NewCard: FC<NewCardProps> = ({
  listId,
  onCancelAddingCard,
  addCard,
}) => {
  const [currentTitle, setCurrentTitle] = useState<string>("");


  
  const handleonKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentTitle) {
        addCard(listId, currentTitle);
        onCancelAddingCard();
      }
    }
    if (e.key === "Escape") {
      onCancelAddingCard();
    }
  };

  const onAddCard = () => {
    addCard(listId, currentTitle);
    onCancelAddingCard();
  };


  return (
    <>
      <CardItem>
        <CardTitleInput
          placeholder="Set card name"
          onKeyDown={handleonKeyDown}
          onChange={(e) => setCurrentTitle(e.target.value)}
        ></CardTitleInput>
      </CardItem>
      <ButtonContainer>
        <AddNewCardButton onClick={() => onAddCard()}>
          <span>Add card</span>
        </AddNewCardButton>
        <CancelButton onClick={() => onCancelAddingCard()}>
          <span>Cancel</span>
        </CancelButton>
      </ButtonContainer>
    </>
  );
};
export default NewCard;
const CardItem = styled.div`
  display: flex;
  background-color: ${COLORS.whiteBackground};
  width: 90%;
  min-height: 50px;
  box-shadow: ${COLORS.boxShadow};
  cursor: pointer;
  padding: 6px 8px;
  margin-bottom: 10px;
  border-radius: 3px;
  overflow: hidden;
`;
const CardTitleInput = styled.textarea`
  font-family: sans-serif;
  width: 100%;
  background: ${COLORS.whiteBackground};
  border: none;
  border-radius: 3px;
  resize: none;
  font-size: 14px;
  font-weight: 400;
  min-height: 20px;
  line-height: 20px;
  overflow: hidden;
  display: block;
  flex-grow: 1;

  ::placeholder {
    font-weight: 400;
    color: ${COLORS.placeholder};
  }

  &:focus {
    outline: none;
  }
`;
const AddNewCardButton = styled.button`
  width: 40%;
  font-size: 15px;
  font-family: sans-serif;
  cursor: pointer;
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  border: none;
  outline: 0;
  background-color: #0079bf;
  margin: 10px 0px;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover,
  &:focus {
    outline: none;
    background-color: rgba(rgba(0, 121, 191, 0.08));
    color: ${COLORS.listTitle};
  }
`;
const CancelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  margin: 10px 0px;
  padding: 5px 15px;
  width: 30%;
  color: ${COLORS.buttonText};
  background-color: ${COLORS.buttonColors.transparent};
  border-radius: 3px;
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
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
