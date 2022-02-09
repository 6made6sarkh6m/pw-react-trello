import React, { FC, useState } from "react";
import styled from "styled-components";
import { CardList } from "components/CardList";
import { useSelector } from "react-redux";
import { selectCardList } from "redux/selectors";
import { Button } from "components/ui/components/Button";
import { COLORS } from "styles/colors";
import AddIcon from "components/ui/icons/AddIcon";
import { NewCardList } from "components/NewCardList";

const Board: FC = () => {
  const lists = useSelector(selectCardList);
  const [isAddingCardList, setIsAddingCardList] = useState(false);
  const [columnWithAddCarad, setColumnWithAddCarad] = useState("");

  const handleCancelAddingCardList = () => {
    setColumnWithAddCarad("");
  };

  const handleAddCardClick = (clickedColumnId: string) => {
    setColumnWithAddCarad(clickedColumnId);
    console.log("clickedColumnId", clickedColumnId);
  };
  const handleCancelAddCardClick = () => {
    setColumnWithAddCarad("");
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
            ></CardList>
          </li>
        );
      })}
      {isAddingCardList ? (
        <NewCardList
          onCancelAddingCardList={handleCancelAddingCardList}
        ></NewCardList>
      ) : (
        <StyledButton onClick={() => setIsAddingCardList(!isAddingCardList)}>
          <IconContainer>
            <AddIcon></AddIcon>
          </IconContainer>
          Add list
        </StyledButton>
      )}
    </Root>
  );
};
const Root = styled.ul`
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
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
