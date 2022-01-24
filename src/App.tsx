import React, { useEffect, useState } from 'react';
import { IList} from './types';
import List from './components/List';
import Card from './components/Card';
import styled from 'styled-components';
import {UserService} from './helpers/userService';
import { StorageService } from './helpers/storageService';
import { mockData } from './utils/mock';
import Popup from './components/Popup';


const  App = () => {

  const [list, setList] = useState<IList[]>(
    StorageService.hasToDolists() ? StorageService.getToDoLists() : mockData
  );
  const [isPresent, setIsPresent] = useState<boolean>(false);

  useEffect(() => {
    UserService.isLoggedIn() ? setIsPresent(true) : setIsPresent(false);
  }, [])
  

  
    return (
      <>
      {
        !isPresent && (
          <Popup setIsPresent={setIsPresent}></Popup>
        )
      }
      <PageWrapper>
        {
          list.map(list=> (
            <List key = {list.id} title = {list.title} >
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
  flex-direction: row;
  width: 1440px;
  padding: 20px;
`

export default App;
