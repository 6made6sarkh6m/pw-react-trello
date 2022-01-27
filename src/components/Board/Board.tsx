import React, { FC } from "react";
import { List } from "components/List";
import { CardsData, CommentsData, DeskData } from "App";
interface BoardProps {
  lists: DeskData;
  cards: CardsData;
  comments: CommentsData;
  updateList: (id: string, title: string) => void;
  addCard: (listId: string, cardTitle: string) => void;
  deleteCard: (cardId: string) => void;
}

const Board: FC<BoardProps> = ({
  lists,
  updateList,
  cards,
  comments,
  addCard,
  deleteCard,
}) => {
  return (
    <>
      {Object.values(lists).map((list) => {
        return (
          <List
            cards={cards}
            comments={comments}
            id={list.id}
            key={list.id}
            listTitle={list.listTitle}
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
