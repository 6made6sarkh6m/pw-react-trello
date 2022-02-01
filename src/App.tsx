import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { StorageService } from "./helpers/storageService";
import { Board } from "components/Board";
import { UsernameModal } from "components/UsernameModal";
import { Header } from "./components/Header";
import { StorageProperties } from "enum/enum";
import { defaultLists, defaultCards, defaultComments } from "utils/mock";
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [lists, setList] = useState<DeskData>(
    StorageService.getData(defaultLists, StorageProperties.lists)
  );
  const [cards, setCard] = useState<CardsData>(
    StorageService.getData(defaultCards, StorageProperties.cards)
  );
  const [comments, setComment] = useState<CommentsData>(
    StorageService.getData(defaultComments, StorageProperties.comments)
  );

  const setListData = (newList: DeskData) => {
    StorageService.setData(newList, StorageProperties.lists);
    setList(newList);
  };

  const setCardData = (newCardList: CardsData) => {
    StorageService.setData(newCardList, StorageProperties.cards);
    setCard(newCardList);
  };

  const setCommentData = (newComments: CommentsData) => {
    StorageService.setData(newComments, StorageProperties.comments);
    setComment(newComments);
  };

  const handleUpdateListTittle = (id: string, listTitle: string) => {
    const cloneList = { ...lists };
    cloneList[id] = { id, listTitle };
    setListData(cloneList);
  };

  const handleAddCard = (
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

  const handleDeleteCard = (id: string) => {
    const cloneCards = { ...cards };
    delete cloneCards[id];
    setCardData(cloneCards);
  };

  const handleUpdateCard = (
    id: string,
    cardProperty: keyof CardDataProps,
    value: string
  ) => {
    const cloneCards = { ...cards };
    cloneCards[id][cardProperty] = value;
    setCardData(cloneCards);
  };

  const handleUpdateComment = (
    id: string,
    commentProperty: keyof CommentDataProps,
    value: string
  ) => {
    const cloneComments = { ...comments };
    cloneComments[id][commentProperty] = value;
    setCommentData(cloneComments);
  };

  const handleDeleteComment = (id: string) => {
    const cloneComments = { ...comments };
    delete cloneComments[id];
    setCommentData(cloneComments);
  };

  const handleAddComment = (
    cardId: string,
    author: string,
    comment: string
  ) => {
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

  const renderPopup = () => {
    return (
      isOpen && (
        <UsernameModal onSubmit={() => setIsOpen(false)}></UsernameModal>
      )
    );
  };
  const currentUser = localStorage.getItem(StorageProperties.user);
  useEffect(() => {
    !currentUser ? setIsOpen(true) : setIsOpen(false);
  }, []);
  return (
    <>
      <Header username={currentUser || ""}></Header>
      <main>
        <PageWrapper>
          <Board
            comments={comments}
            lists={lists}
            cards={cards}
            username={currentUser || ""}
            onUpdateList={handleUpdateListTittle}
            onAddCard={handleAddCard}
            onDeleteCard={handleDeleteCard}
            onUpdateCard={handleUpdateCard}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
            onAddComment={handleAddComment}
          ></Board>
        </PageWrapper>

        {renderPopup()}
      </main>
    </>
  );
};

const PageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 1440px;
  padding: 20px;
  @media screen and (max-width: 800px) {
    width: 100%;
    flex-direction: column;
  }
`;

export default App;
