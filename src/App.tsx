import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Board } from "components/Board";
import { UsernameModal } from "components/UsernameModal";
import { Header } from "./components/Header";
import { useSelector } from "react-redux";
import { selectUser } from "redux/selectors";

const App = () => {
  const user = useSelector(selectUser);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    !user.isAuth ? setIsOpenModal(true) : setIsOpenModal(false);
  }, []);
  return (
    <>
      {isOpenModal ? (
        <UsernameModal onSubmit={() => setIsOpenModal(false)}></UsernameModal>
      ) : (
        <>
          <Header username={user.name}></Header>
          <main>
            <PageWrapper>
              <Board />
            </PageWrapper>
          </main>
        </>
      )}
    </>
  );
};

const PageWrapper = styled.div`
  display: flex;
  width: 1440px;
  align-items: flex-start;
  padding: 20px;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

export default App;
