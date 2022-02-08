import React, { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "components/ui/components/Button";
import { Textarea } from "components/ui/components/Textarea";
import { COLORS } from "styles/colors";
import { useDispatch } from "react-redux";
import { addCard } from "redux/ducks/Card/CardSlice";
interface NewCardProps {
  listId: string;
  onCancelAddingCard: () => void;
}

export const NewCard: FC<NewCardProps> = ({ listId, onCancelAddingCard }) => {
  const dispatch = useDispatch();
  const [currentTitle, setCurrentTitle] = useState("");

  const handleonKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const cardTitle = currentTitle.trim();
      if (cardTitle) {
        dispatch(addCard({ cardTitle, listId }));
        onCancelAddingCard();
      }
    }
    if (e.key === "Escape") {
      onCancelAddingCard();
    }
  };

  const handleAddCard = () => {
    const cardTitle = currentTitle.trim();
    if (cardTitle) {
      dispatch(addCard({ cardTitle, listId }));
      onCancelAddingCard();
    }
  };

  return (
    <>
      <CardItem>
        <Textarea
          autoFocus={true}
          rows={2}
          placeholder="Set card name"
          onKeyDown={handleonKeyDown}
          onChange={(e) => setCurrentTitle(e.target.value)}
        ></Textarea>
      </CardItem>
      <ButtonContainer>
        <StyledButton primary={true} onClick={handleAddCard}>
          Add
        </StyledButton>
        <StyledButton primary={false} onClick={() => onCancelAddingCard()}>
          Cancel
        </StyledButton>
      </ButtonContainer>
    </>
  );
};

const CardItem = styled.div`
  display: flex;
  background-color: ${COLORS.blindingWhite};
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

const StyledButton = styled(Button)`
  width: 30%;
`;

export default NewCard;
