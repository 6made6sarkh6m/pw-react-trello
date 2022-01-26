import React, { FC } from "react";
import List from "../List";
import { CardsData, DeskData } from "App";
interface BoardProps {
  lists: DeskData;
  cards: CardsData;
  updateList: (listId: string, title: string) => void;
}

const Board: FC<BoardProps> = ({ lists, updateList, cards }) => {
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
          >
          </List>
        );
      })}
    </>
  );
};

export default Board;
