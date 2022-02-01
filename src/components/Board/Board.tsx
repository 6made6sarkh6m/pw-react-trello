import React, { FC } from "react";
import { List } from "components/List";
import {
  CardDataProps,
  CardsData,
  CommentDataProps,
  CommentsData,
  DeskData,
} from "App";

interface BoardProps {
  lists: DeskData;
  cards: CardsData;
  comments: CommentsData;
  updateList: (id: string, title: string) => void;
  addCard: (listId: string, cardTitle: string) => void;
  deleteCard: (cardId: string) => void;
  updateCardTitle: (
    cardId: string,
    cardProperty: keyof CardDataProps,
    value: string
  ) => void;
  updateComment: (
    id: string,
    commentProperty: keyof CommentDataProps,
    value: string
  ) => void;
  deleteComment: (id: string) => void;
  username: string;
  addComment: (cardId: string, author: string, comment: string) => void;
}

const Board: FC<BoardProps> = ({
  lists,
  username,
  cards,
  comments,
  updateList,
  addCard,
  deleteCard,
  updateCardTitle,
  updateComment,
  deleteComment,
  addComment,
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
            username={username}
            updateList={updateList}
            addCard={addCard}
            deleteCard={deleteCard}
            updateCardTitle={updateCardTitle}
            updateComment={updateComment}
            deleteComment={deleteComment}
            addComment={addComment}
          ></List>
        );
      })}
    </>
  );
};

export default Board;
