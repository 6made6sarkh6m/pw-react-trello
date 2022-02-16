import React, { useState, useMemo, FC } from "react";
import styled from "styled-components";
import { CardModal } from "components/CardModal";
import { COLORS } from "styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard } from "redux/ducks/Card/CardSlice";
import { selectComment } from "redux/selectors";
import { DeleteButton, DeleteIcon, CommentIcon } from "components/ui";

interface CardProps {
  listId: string;
  title: string;
  id: string;
  cardDescription: string;
  listTitle: string;
}

const Card: FC<CardProps> = ({ title, id, listTitle, cardDescription }) => {
  const dispatch = useDispatch();
  const comments = useSelector(selectComment);
  const [isOpen, setIsOpen] = useState(false);
  const commentCount = useMemo(() => {
    return Object.values(comments).filter((comment) => comment.cardId === id)
      .length;
  }, [comments]);

  const handleDeleteClick = (id: string) => {
    dispatch(deleteCard({ id }));
  };

  return (
    <>
      <CardItem onClick={() => setIsOpen(!isOpen)}>
        <CardTitle>{title}</CardTitle>
        <DeleteButton
          onClick={() => {
            handleDeleteClick(id);
          }}
        >
          <DeleteIcon />
        </DeleteButton>
        <CommentCounter>
          <CommentIcon />
          {commentCount}
        </CommentCounter>
      </CardItem>
      {isOpen && (
        <CardModal
          cardId={id}
          cardTitle={title}
          listTitle={listTitle}
          cardDescription={cardDescription}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const CardItem = styled.div`
  display: flex;
  position: relative;
  background-color: ${COLORS.blindingWhite};
  width: 100%;
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
