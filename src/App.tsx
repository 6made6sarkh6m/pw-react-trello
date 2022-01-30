import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { UserService } from "./helpers/userService";
import { StorageService } from "./helpers/storageService";
import { Board } from "components/Board";
import Popup from "./components/Popup";
import Header from "./components/Header/Header";
export interface ListDataProps {
  id: string;
  listTitle: string;
}

export interface CardDataProps {
  id: string;
  listId: string;
  cardTitle: string;
  cardDescription: string;
}

export interface CommentDataProps {
  id: string;
  cardId: string;
  author: string;
  comment: string;
}

export type DeskData = Record<string, ListDataProps>;
export type CardsData = Record<string, CardDataProps>;
export type CommentsData = Record<string, CommentDataProps>;

const App = () => {
  const [isPresent, setIsPresent] = useState<boolean>(false);
  const [lists, setList] = useState<DeskData>(StorageService.getToDoLists());
  const [cards, setCard] = useState<CardsData>(StorageService.getCards());
  const [comments, setComment] = useState<CommentsData>(
    StorageService.getComments()
  );

  const setListData = (newList: DeskData) => {
    StorageService.setList(newList);
    setList(newList);
  };

  const setCardData = (newCardList: CardsData) => {
    StorageService.setCards(newCardList);
    setCard(newCardList);
  };

  const setCommentData = (newComments: CommentsData) => {
    StorageService.setComment(newComments);
    setComment(newComments);
  };

  const updateListTittle = (id: string, listTitle: string) => {
    const cloneList = { ...lists };
    cloneList[id] = { id, listTitle };
    setListData(cloneList);
  };

  const addCard = (
    listId: string,
    cardTitle: string,
    cardDescription: string = ""
  ) => {
    const cloneCards = { ...cards };
    const newCardId = uuid();
    cloneCards[newCardId] = {
      id: newCardId,
      cardTitle: cardTitle,
      listId: listId,
      cardDescription: cardDescription,
    };
    setCardData(cloneCards);
  };

  const deleteCard = (id: string) => {
    const cloneCards = { ...cards };
    delete cloneCards[id];
    setCardData(cloneCards);
  };

  const updateCardTitle = (
    id: string,
    cardProperty: keyof CardDataProps,
    value: string
  ) => {
    const cloneCards = { ...cards };
    cloneCards[id][cardProperty] = value;
    setCardData(cloneCards);
  };

  const updateComment = (
    id: string,
    commentProperty: keyof CommentDataProps,
    value: string
  ) => {
    const cloneComments = { ...comments };
    cloneComments[id][commentProperty] = value;
    setCommentData(cloneComments);
  };

  const deleteComment = (id: string) => {
    const cloneComments = { ...comments };
    delete cloneComments[id];
    setCommentData(cloneComments);
  };

  const addComment = (cardId: string, author: string, comment: string) => {
    const cloneComments = { ...comments };
    const newCommentId = uuid();
    cloneComments[newCommentId] = {
      id: newCommentId,
      cardId: cardId,
      comment: comment,
      author: author,
    };

    setCommentData(cloneComments);
  };

  useEffect(() => {
    UserService.getCurrentUser() !== ""
      ? setIsPresent(true)
      : setIsPresent(false);
  }, [isPresent]);
  return (
    <>
      {!isPresent && <Popup setIsPresent={setIsPresent}></Popup>}
      <Header username={UserService.getCurrentUser()}></Header>
      <PageWrapper>
        <Board
          comments={comments}
          lists={lists}
          cards={cards}
          username={UserService.getCurrentUser()}
          updateList={updateListTittle}
          addCard={addCard}
          deleteCard={deleteCard}
          updateCardTitle={updateCardTitle}
          updateComment={updateComment}
          deleteComment={deleteComment}
          addComment={addComment}
        ></Board>
      </PageWrapper>
    </>
  );
};

const PageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 1440px;
  padding: 20px;
`;

export default App;
