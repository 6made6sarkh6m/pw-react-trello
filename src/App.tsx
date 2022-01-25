import React, { useEffect, useState } from 'react';
import { IList} from './types';
import List from './components/List';
import { Card } from './components/Card';
import styled from 'styled-components';
import {UserService} from './helpers/userService';
import { StorageService } from './helpers/storageService';
import Popup from './components/Popup';
import Header from './components/Header/Header'

const  App = () => {

  const [list, setList] = useState<IList[]>(
    StorageService.getToDoLists()
  );
  const [isPresent, setIsPresent] = useState<boolean>(false);

  useEffect(() => {
    UserService.isLoggedIn() ? setIsPresent(true) : setIsPresent(false);
  }, [isPresent])
  

  
    return (
      <>
      {
        !isPresent && (
          <Popup setIsPresent={setIsPresent}></Popup>
        )
      }
      <Header username= {UserService.getCurrentUser()}></Header>
      <PageWrapper>
      
        {
          list.map(list=> (
            <List key = {list.id} title = {list.title}>
              {
                list.cards.map(
                  card => (
                    <Card key ={card.id} title = {card.title}></Card>
                  )
                )
              }
            </List>
          ))
        }
      </PageWrapper>
      </>
    );
  }
  
  const PageWrapper = styled.div`
  display: flex;
  width: 1440px;
  padding: 20px;
`

export default App;
