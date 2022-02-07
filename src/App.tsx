import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { StorageService } from "./app/views/helpers/storageService";
import { Board } from "app/views/components/Board";
import { UsernameModal } from "app/views/components/UsernameModal";
import { Header } from "./app/views/components/Header";
import { StorageProperties } from "app/views/enum/enum";
import { defaultUser } from "app/views/utils/mock";
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

  const renderPopup = () => {
    return (
      isOpen && (
        <UsernameModal onSubmit={() => setIsOpen(false)}></UsernameModal>
      )
    );
  };
  const currentUser = StorageService.getData(
    defaultUser,
    StorageProperties.user
  );
  useEffect(() => {
    !currentUser.name ? setIsOpen(true) : setIsOpen(false);
  }, []);
  return (
    <>
      <Header username={currentUser.name || ""}></Header>
      <main>
        <PageWrapper>
          <Board></Board>
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
