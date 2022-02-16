import React, { FC, useState } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";
import { useSelector } from "react-redux";
import { selectCardList } from "redux/selectors";
import { NewCardList } from "components/NewCardList";
import { CardList } from "components/CardList";
import { AddIcon, Button } from "components/ui";

const Board: FC = () => {
  const lists = useSelector(selectCardList);
  const [isAddingCardList, setIsAddingCardList] = useState(false);
  const [columnWithAddCarad, setColumnWithAddCard] = useState("");

  const handleCancelAddingCardList = () => {
    setIsAddingCardList(false);
  };

  const handleAddCardClick = (clickedColumnId: string) => {
    setColumnWithAddCard(clickedColumnId);
  };

  const handleCancelAddCardClick = () => {
    setColumnWithAddCard("");
  };

  return (
    <Root>
      {Object.values(lists).map((list) => {
        return (
          <li key={list.id}>
            <CardList
              listTitle={list.listTitle}
              id={list.id}
              isAddCardShowed={columnWithAddCarad === list.id}
              onAddCardClick={handleAddCardClick}
              onCancelAddCardClick={handleCancelAddCardClick}
            />
          </li>
        );
      })}
      {isAddingCardList ? (
        <NewCardList onCancelAddingCardList={handleCancelAddingCardList} />
      ) : (
        <StyledButton onClick={() => setIsAddingCardList(!isAddingCardList)}>
          <IconContainer>
            <AddIcon />
          </IconContainer>
          Add list
        </StyledButton>
      )}
    </Root>
  );
};

const Root = styled.ul`
  display: flex;
  flex-wrap: nowrap;
`;

const StyledButton = styled(Button)`
  height: 30px;
  width: 272px;
`;

const IconContainer = styled.div`
  margin-right: 4px;
  height: 20px;
  opacity: 0.8;
  display: flex;
  color: ${COLORS.deepGrey};
`;

export default Board;
