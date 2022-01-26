import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserService } from "./helpers/userService";
import { StorageService } from "./helpers/storageService";
import Board from './components/Board/Board'
import Popup from "./components/Popup";
import Header from "./components/Header/Header";
import { lists as listData} from "./utils/mock";

export interface ListProps {
  listId: string;
  title: string;
}
export interface CardProps {
  cardId: string;
  listId: string;
  cardTitle: string;
}
export type DeskData = Record<string, ListProps>;
export type CardsData = Record<string, CardProps>;
const App = () => {
  const [isPresent, setIsPresent] = useState<boolean>(false);
  const [lists, setList] = useState<DeskData>(StorageService.getToDoLists());
  const [cards, setCard] = useState<CardsData>(StorageService.getCards());
  const [comments, setComment] = useState(StorageService.getComments());
  useEffect(() => {
    UserService.isLoggedIn() ? setIsPresent(true) : setIsPresent(false);
  }, [isPresent]);

  const setListData = (newList: DeskData) => {
    StorageService.setList(newList);
    setList(newList);
  }
  const updateListTittle = (listId: string, title: string) => {
    const cloneList = {...lists};
    cloneList[listId] = {listId, title}
    setListData(cloneList);
  }
  return (
    <>
      {!isPresent && <Popup setIsPresent={setIsPresent}></Popup>}
      <Header username={UserService.getCurrentUser()}></Header>
      <PageWrapper>
       <Board lists={lists} cards={cards} updateList={updateListTittle}></Board>
      </PageWrapper>
    </>
  );
};

const PageWrapper = styled.div`
  display: flex;
  width: 1440px;
  padding: 20px;
`;

export default App;
