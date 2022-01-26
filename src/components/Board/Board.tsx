import React, { FC } from "react";
import List from "../List";
import { CardsData, DeskData } from "App";
interface BoardProps {
  lists: DeskData;
  cards: CardsData;
  updateList: (listId: string, title: string) => void;
  addCard: (listId: string, cardTitle: string) => void;
  deleteCard: (cardId: string) => void;
}

const Board: FC<BoardProps> = ({ lists, updateList, cards, addCard, deleteCard }) => {
  return (
    <>
      {Object.keys(lists).map((list) => {
        return (
          <List
            cards={cards}
            listId={lists[list].listId}
            key={lists[list].listId}
            title={lists[list].title}
            updateList={updateList}
            addCard={addCard}
            deleteCard={deleteCard}
          ></List>
        );
      })}
    </>
  );
};

export default Board;
