import React, { FC } from "react";
import styled from "styled-components";
import { CardList } from "components/CardList";
import { useSelector } from "react-redux";
import { selectCardList } from "redux/store";

const Board: FC = () => {
  const lists = useSelector(selectCardList);
  return (
    <Root>
      {Object.values(lists).map((list) => {
        return (
          <li key={list.id}>
            <CardList listTitle={list.listTitle} id={list.id}></CardList>
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
