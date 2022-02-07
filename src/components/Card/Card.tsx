import React, { useState, useMemo, FC } from "react";
import styled from "styled-components";
import DeleteIcon from "../ui/icons/DeleteIcon";
import CommentIcon from "../ui/icons/CommentIcon";
import { CardModal } from "../CardModal";
import { COLORS } from "styles/colors";
import { DeleteButton } from "../ui/components/DeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard } from "redux/ducks/Card/reducers";
import { CommentReducer } from "redux/ducks/Comments";
import { selectComment } from "redux/store";
interface CardProps {
  listId: string;
  title: string;
  id: string;
  cardDescription: string;
  listTitle: string;
}

const Card: FC<CardProps> = ({
  title,
  id,
  listTitle,
  cardDescription,
}) => {
  const dispatch = useDispatch();
  const comments  = useSelector(selectComment);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const commentCount = useMemo(() => {
  //   return Object.values(comments).filter((comment) => comment.cardId === id)
  //     .length;
  // }, [comments]);
  const handleOnDelete = (id : string) => {
    dispatch(deleteCard({id}))
  }
  return (
    <>
      <CardItem onClick={() => setIsOpen(!isOpen)}>
        <CardTitle>{title}</CardTitle>
        <DeleteButton onClick={ ()=>{handleOnDelete(id)}}>
          <DeleteIcon></DeleteIcon>
        </DeleteButton>
        <CommentCounter>
          <CommentIcon></CommentIcon>
          {/* {commentCount} */}
        </CommentCounter>
      </CardItem>
      {isOpen && (
        <CardModal
          cardId={id}
          cardTitle={title}
          listTitle={listTitle}
          cardDescription={cardDescription}
          onClose={() => setIsOpen(false)}
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
