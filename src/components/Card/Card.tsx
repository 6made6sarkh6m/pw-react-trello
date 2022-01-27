import React, { useRef, useState, useEffect, FC } from "react";
import styled from "styled-components";
import DeleteIcon from "../ui-components/DeleteIcon";
import CommentIcon from "../ui-components/CommentIcon";
import { CommentsData } from "../../App";
interface CardProps {
  listId: string;
  title: string;
  key: string;
  id: string;
  deleteCard: (cardId: string) => void;
  comments: CommentsData;
}

const Card = ({ title, id, deleteCard, comments }: CardProps) => {
  return (
    <CardItem>
      <CardTitle>{title}</CardTitle>
      <DeleteButton onClick={() => deleteCard(id)}>
        <DeleteIcon></DeleteIcon>
      </DeleteButton>
      <CommentCounter>
        <CommentIcon></CommentIcon>
        {
          Object.values(comments).filter((comment) => comment.cardId === id)
            .length
        }
      </CommentCounter>
    </CardItem>
  );
};

const CardItem = styled.div`
  display: flex;
  background-color: ${(props) =>
    props.color || props.theme.containerColors.whiteBackground};
  width: 90%;
  min-height: 50px;
  box-shadow: ${(props) =>
    props.color || props.theme.containerColors.boxShadow};
  cursor: pointer;
  padding: 6px 8px;
  margin-bottom: 10px;
  border-radius: 3px;
  overflow: hidden;
`;
const CardTitle = styled.span`
  font-size: 14px;
  flex-grow: 1;
  font-weight: 400;
  line-height: 20px;
  text-align: start;
  word-break: break-all;
  font-family: sans-serif;
`;

const DeleteButton = styled.button`
  align-self: flex-start;
  position: relative;
  color: ${(props) => props.color || props.theme.containerColors.buttonText};
  border: none;
  background-color: ${(props) =>
    props.color || props.theme.buttons.transparent};
  padding: 4px;
  border-radius: 3px;
  margin-top: -2px;
  margin-right: -4px;
  opacity: 0.8;

  :hover {
    opacity: 1;
    color: ${(props) => props.color || props.theme.containerColors.listTitle};
    background-color: rgba(9, 30, 66, 0.08);
  }
`;
const CommentCounter = styled.span`
  font-family: monospace;
  font-size: 13px;
  position: absolute;
  margin-left: 10px;
  align-self: flex-end;
  color: ${(props) => props.color || props.theme.containerColors.buttonText};
`;
export default Card;
