import React, { FC } from "react";
import styled from 'styled-components';
import { CardList } from "components/CardList";
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
  onUpdateList: (id: string, title: string) => void;
  onAddCard: (listId: string, cardTitle: string) => void;
  onDeleteCard: (cardId: string) => void;
  onUpdateCard: (
    cardId: string,
    cardProperty: keyof CardDataProps,
    value: string
  ) => void;
  onUpdateComment: (
    id: string,
    commentProperty: keyof CommentDataProps,
    value: string
  ) => void;
  onDeleteComment: (id: string) => void;
  username: string;
  onAddComment: (cardId: string, author: string, comment: string) => void;
}

const Board: FC<BoardProps> = ({
  lists,
  username,
  cards,
  comments,
  onUpdateList,
  onAddCard,
  onDeleteCard,
  onUpdateCard,
  onUpdateComment,
  onDeleteComment,
  onAddComment,
}) => {
  return (
    <Root>
      {Object.values(lists).map((list) => {
        return (
          <li key={list.id}>
            <CardList
              cards={cards}
              comments={comments}
              id={list.id}
              listTitle={list.listTitle}
              username={username}
              onUpdateList={onUpdateList}
              onAddCard={onAddCard}
              onDeleteCard={onDeleteCard}
              onUpdateCard={onUpdateCard}
              onUpdateComment={onUpdateComment}
              onDeleteComment={onDeleteComment}
              onAddComment={onAddComment}
            ></CardList>
          </li>
        );
      })}
    </Root>
  );
};
const Root = styled.ul`
  display: flex;
`

export default Board;
