import React, { FC } from "react";
import styled from "styled-components";
import { CardList } from "app/views/components/CardList";
import {
  CardDataProps,
  CardsData,
  CommentDataProps,
  CommentsData,
  DeskData,
} from "App";
import { useSelector } from "react-redux";
import { selectCardList } from "app/state/store";

// interface BoardProps {
//   lists: DeskData;
//   cards: CardsData;
//   comments: CommentsData;
//   onUpdateList: (id: string, title: string) => void;
//   onAddCard: (listId: string, cardTitle: string) => void;
//   onDeleteCard: (cardId: string) => void;
//   onUpdateCard: (
//     cardId: string,
//     cardProperty: keyof CardDataProps,
//     value: string
//   ) => void;
//   onUpdateComment: (
//     id: string,
//     commentProperty: keyof CommentDataProps,
//     value: string
//   ) => void;
//   onDeleteComment: (id: string) => void;
//   username: string;
//   onAddComment: (cardId: string, author: string, comment: string) => void;
// }

const Board: FC = () => {
  const lists = useSelector(selectCardList);
  return (
    <Root>
      {Object.values(lists).map((list) => {
        return (
          <li key={list.id}>
            <CardList
              listTitle={list.listTitle}
              id = {list.id}
            ></CardList>
          </li>
        );
      })}
    </Root>
  );
};
const Root = styled.ul`
  display: flex;
`;

export default Board;
