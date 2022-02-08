import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { StorageService } from "./helpers/storageService";
import { Board } from "components/Board";
import { UsernameModal } from "components/UsernameModal";
import { Header } from "./components/Header";
import { StorageProperties } from "./enum/enum";
import { defaultUser } from "./utils/mock";
import { useSelector } from "react-redux";
import { selectUser } from "redux/store";

const App = () => {
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const renderPopup = () => {
    return (
      isOpen && (
        <UsernameModal onSubmit={() => setIsOpen(false)}></UsernameModal>
      )
    );
  };
  useEffect(() => {
    !user.name ? setIsOpen(true) : setIsOpen(false);
  }, []);
  return (
    <>
      <Header username={user.name || ""}></Header>
      <main>
        <PageWrapper>
          <Board />
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
