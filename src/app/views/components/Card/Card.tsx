import React, { useState, useMemo, FC } from "react";
import styled from "styled-components";
import DeleteIcon from "../ui/icons/DeleteIcon";
import CommentIcon from "../ui/icons/CommentIcon";
import { CommentsData, CardDataProps, CommentDataProps } from "../../../../App";
import { CardModal } from "../CardModal";
import { COLORS } from "app/views/styles/colors";
import { DeleteButton } from "../ui/components/DeleteButton";
interface CardProps {
  listId: string;
  title: string;
  id: string;
  cardDescription: string;
  comments: CommentsData;
  listTitle: string;
  username: string;
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

  onAddComment: (cardId: string, author: string, comment: string) => void;
}

const Card: FC<CardProps> = ({
  title,
  id,
  comments,
  listTitle,
  cardDescription,
  username,
  onDeleteCard,
  onUpdateCard,
  onUpdateComment,
  onDeleteComment,
  onAddComment,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const commentCount = useMemo(() => {
    return Object.values(comments).filter((comment) => comment.cardId === id)
      .length;
  }, [comments]);
  return (
    <>
      <CardItem onClick={() => setIsOpen(!isOpen)}>
        <CardTitle>{title}</CardTitle>
        <DeleteButton onClick={() => onDeleteCard(id)}>
          <DeleteIcon></DeleteIcon>
        </DeleteButton>
        <CommentCounter>
          <CommentIcon></CommentIcon>
          {commentCount}
        </CommentCounter>
      </CardItem>
      {isOpen && (
        <CardModal
          cardId={id}
          cardTitle={title}
          comments={comments}
          listTitle={listTitle}
          username={username}
          cardDescription={cardDescription}
          onClose={() => setIsOpen(false)}
          onUpdateComment={onUpdateComment}
          onDeleteComment={onDeleteComment}
          onUpdateCard={onUpdateCard}
          onAddComment={onAddComment}
        ></CardModal>
      )}
    </>
  );
};

const CardItem = styled.div`
  display: flex;
  background-color: ${COLORS.blindingWhite};
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
  color: ${COLORS.deepGrey};
`;

export default Card;
