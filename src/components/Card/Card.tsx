import React, { useMemo, FC } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard } from "redux/ducks/Card";
import { selectComments } from "redux/selectors";
import { DeleteButton, DeleteIcon, CommentIcon } from "components/ui";

interface CardProps {
  listId: string;
  title: string;
  id: string;
  cardDescription: string;
  listTitle: string;
  onCardClick: () => void;
}

const Card: FC<CardProps> = ({ title, id, onCardClick }) => {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const commentCount = useMemo(() => {
    return Object.values(comments).filter((comment) => comment.cardId === id)
      .length;
  }, [comments]);

  const handleDeleteClick = (id: string) => {
    dispatch(deleteCard({ id }));
  };

  return (
    <CardItem onClick={onCardClick}>
      <Container>
        <CardTitle>{title}</CardTitle>
        <DeleteButton
          onClick={() => {
            handleDeleteClick(id);
          }}
        >
          <DeleteIcon />
        </DeleteButton>
      </Container>
      <div>
        <CommentCounter>
          <CommentIcon />
          {commentCount}
        </CommentCounter>
      </div>
    </CardItem>
  );
};

const CardItem = styled.div`
  display: flex;
  flex-direction: column;
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

const Container = styled.div`
  display: flex;
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
  margin-left: 0;
  align-self: flex-end;
  color: ${COLORS.deepGrey};
`;

export default Card;
