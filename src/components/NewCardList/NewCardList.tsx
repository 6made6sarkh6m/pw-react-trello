import React, { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "components/ui/components/Button";
import { COLORS } from "styles/colors";
import { Textarea } from "components/ui/components/Textarea";
import { useDispatch } from "react-redux";
import { addCardList } from "redux/ducks/CardList/CardListSlice";

interface NewCardListProps {
  onCancelAddingCardList: () => void;
}

const NewCardList: FC<NewCardListProps> = ({ onCancelAddingCardList }) => {
  const dispatch = useDispatch();
  const [cardListTitle, setCardListTitle] = useState("");

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      const listTitle = cardListTitle.trim();

      if (listTitle) {
        dispatch(addCardList({ listTitle }));
        onCancelAddingCardList();
      }
    }

    if (e.key === "Escape") {
      onCancelAddingCardList();
    }
  };

  const handleAddCard = () => {
    const listTitle = cardListTitle.trim();

    if (listTitle) {
      dispatch(addCardList({ listTitle }));
      onCancelAddingCardList();
    }
  };

  return (
    <>
      <CardListItem>
        <Textarea
          autoFocus={true}
          rows={2}
          placeholder="Set list title"
          onKeyDown={handleOnKeyDown}
          onChange={(e) => setCardListTitle(e.target.value)}
        ></Textarea>
        <ButtonContainer>
          <StyledButton primary={true} onClick={handleAddCard}>
            Add
          </StyledButton>
          <StyledButton primary={false} onClick={onCancelAddingCardList}>
            Cancel
          </StyledButton>
        </ButtonContainer>
      </CardListItem>
    </>
  );
};

const CardListItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.blindingWhite};
  width: 272px;
  height: 70px;
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

export default NewCardList;
