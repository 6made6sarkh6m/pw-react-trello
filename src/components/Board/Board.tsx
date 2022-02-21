import React, { FC, useState } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";
import { useSelector } from "react-redux";
import { selectCards, selectCardLists } from "redux/selectors";
import { AddIcon, Button } from "components/ui";
import { CardList, CardModal, NewCardList } from "components";

const Board: FC = () => {
  const lists = useSelector(selectCardLists);
  const cards = useSelector(selectCards);
  const [isAddingCardList, setIsAddingCardList] = useState(false);
  const [columnWithAddCard, setColumnWithAddCard] = useState("");
  const [currentCardModalId, setCurrentCardModalId] = useState("");
  const handleCancelAddingCardList = () => {
    setIsAddingCardList(false);
  };

  const handleAddCardClick = (clickedColumnId: string) => {
    setColumnWithAddCard(clickedColumnId);
  };

  const handleCancelAddCardClick = () => {
    setColumnWithAddCard("");
  };

  const handleCardClick = (cardId: string) => {
    setCurrentCardModalId(cardId);
  };

  const getCardListTitle = (): string => {
    const currentCardModal = cards[currentCardModalId];
    const currentCardListId = currentCardModal?.listId;
    const currentCardListData = lists[currentCardListId];

    return currentCardListData?.listTitle;
  };

  const currentCardListTitle = getCardListTitle();

  return (
    <Root>
      {Object.values(lists).map((list) => {
        return (
          <li key={list.id}>
            <CardList
              listTitle={list.listTitle}
              id={list.id}
              onCardClick={handleCardClick}
              isAddCardShowed={columnWithAddCard === list.id}
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
      {currentCardModalId && (
        <CardModal
          cardId={currentCardModalId}
          cardTitle={cards[currentCardModalId].cardTitle}
          listTitle={currentCardListTitle}
          cardDescription={cards[currentCardModalId].cardDescription}
          onClose={() => setCurrentCardModalId("")}
        />
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
