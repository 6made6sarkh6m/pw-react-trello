import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectComments, selectUser } from "redux/selectors";
import Comment from "./Comment";

interface CommentListProps {
  cardId: string;
}

const CommentList: FC<CommentListProps> = ({ cardId }) => {
  const comments = useSelector(selectComments);
  const { name } = useSelector(selectUser);

  const filteredComments = useMemo(
    () =>
      Object.values(comments).filter((comment) => comment.cardId === cardId),
    [comments]
  );

  return (
    <CommentsContainer>
      <Title>Comments</Title>
      <ul>
        {filteredComments.map((comment) => {
          return (
            <li key={comment.id}>
              <Title>{name}</Title>
              <Comment id={comment.id} commentValue={comment.comment} />
            </li>
          );
        })}
      </ul>
    </CommentsContainer>
  );
};

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const Title = styled.h2`
  text-align: start;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  min-height: 20px;
  padding: 8px;
  margin: 0;
  font-family: sans-serif;
`;

export default CommentList;
