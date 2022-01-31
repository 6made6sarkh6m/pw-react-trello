import React, { useState, useMemo, FC } from "react";
import styled from "styled-components";
import DeleteIcon from "../ui/icons/DeleteIcon";
import CommentIcon from "../ui/icons/CommentIcon";
import { CommentsData, CardDataProps, CommentDataProps } from "../../App";
import {CardView} from '../CardView'
import {COLORS} from 'styles/colors';
import {DeleteButton} from '../ui/components/InputComponents';
interface CardProps {
  listId: string;
  title: string;
  key: string;
  id: string;
  cardDescription: string;
  comments: CommentsData;
  listTitle: string;
  username: string;
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

  addComment: (cardId: string, author: string, comment: string) => void;
};

const Card: FC<CardProps> = ({
  title,
  id,
  comments,
  listTitle,
  cardDescription,
  username,
  deleteCard,
  updateCardTitle,
  updateComment,
  deleteComment,
  addComment,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const commentCount = useMemo(()=> {
   return  Object.values(comments).filter((comment) => comment.cardId === id)
    .length
  },[comments])
  return (
    <>
      <CardItem onClick={() => setIsOpen(!isOpen)}>
        <CardTitle>{title}</CardTitle>
        <DeleteButton onClick={() => deleteCard(id)}>
          <DeleteIcon></DeleteIcon>
        </DeleteButton>
        <CommentCounter>
          <CommentIcon></CommentIcon>
          {
            commentCount
          }
        </CommentCounter>
      </CardItem>
      {isOpen && (
        <CardView
          cardId={id}
          cardTitle={title}
          comments={comments}
          listTitle={listTitle}
          username={username}
          cardDescription={cardDescription}
          onClose={() => setIsOpen(false)}
          updateComment={updateComment}
          deleteComment={deleteComment}
          updateCardTitle={updateCardTitle}
          addComment={addComment}
        ></CardView>
      )}
    </>
  );
};

const CardItem = styled.div`
  display: flex;
  background-color: ${COLORS.whiteBackground};
  width: 90%;
  min-height: 50px;
  box-shadow: ${COLORS.boxShadow};
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


const CommentCounter = styled.span`
  font-family: monospace;
  font-size: 13px;
  position: absolute;
  margin-left: 10px;
  align-self: flex-end;
  color: ${COLORS.buttonText};
`;
export default Card;
