import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUser } from "redux/selectors";
import { COLORS } from "styles/colors";
import { Header, Board, UsernameModal } from "components";

const App = () => {
  const user = useSelector(selectUser);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    !user.isAuth ? setIsOpenModal(true) : setIsOpenModal(false);
  }, []);
  return (
    <>
      {isOpenModal ? (
        <UsernameModal onClose={() => setIsOpenModal(false)} />
      ) : (
        <AppWrapper>
          <Header username={user.name} />
          <Main>
            <PageWrapper>
              <Board />
            </PageWrapper>
          </Main>
        </AppWrapper>
      )}
    </>
  );
};

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  height: 100%;
  width: 100%;
  overflow-x: auto;

  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${COLORS.glassEffect};
    border-radius: 3px;
    margin: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${COLORS.lightGrey};
    border-radius: 3px;
  }
`;

const Main = styled.main`
  height: 100%;
`;

export default App;
