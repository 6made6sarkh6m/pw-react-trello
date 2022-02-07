import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { StorageService } from "./helpers/storageService";
import { Board } from "components/Board";
import { UsernameModal } from "components/UsernameModal";
import { Header } from "./components/Header";
import { StorageProperties } from "./enum/enum";
import { defaultUser } from "./utils/mock";

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
