import React, { FC,useState } from "react";
import styled from "styled-components";
import { AddNewCardButton, CancelButton, CardTitleInput } from "components/ui/components/InputComponents";

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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
