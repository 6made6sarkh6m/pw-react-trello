import React, { FC } from "react";
import List from "../List";
import { CardsData, CommentsData, DeskData } from "App";
interface BoardProps {
  lists: DeskData;
  cards: CardsData;
  comments: CommentsData;
  updateList: (listId: string, title: string) => void;
  addCard: (listId: string, cardTitle: string) => void;
  deleteCard: (cardId: string) => void;
}

const Board: FC<BoardProps> = ({ lists, updateList, cards, comments, addCard, deleteCard }) => {
  return (
    <>
      {Object.keys(lists).map((list) => {
        return (
          <List
            cards={cards}
            comments={comments}
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
