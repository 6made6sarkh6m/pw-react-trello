import React, { FC } from "react";
import { List } from "components/List";
import {
  CardProps,
  CardsData,
  CommentProps,
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
    cardProperty: keyof CardProps,
    value: string
  ) => void;
  updateComment: (
    id: string,
    commentProperty: keyof CommentProps,
    value: string
  ) => void;
  deleteComment: (id: string) => void;
  username: string;
  addComment: (cardId: string, author: string, comment: string) => void;
}

const Board: FC<BoardProps> = ({
  lists,
  updateList,
  cards,
  comments,
  addCard,
  deleteCard,
  updateCardTitle,
  updateComment,
  deleteComment,
  username,
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
            updateList={updateList}
            addCard={addCard}
            deleteCard={deleteCard}
            updateCardTitle={updateCardTitle}
            updateComment={updateComment}
            deleteComment={deleteComment}
            username={username}
            addComment={addComment}
          ></List>
        );
      })}
    </>
  );
};

export default Board;
