import React, { useEffect, useState } from 'react';
import { IList } from './types';
import List from './components/List';
import Card from './components/Card';
import Button from './components/Button';
import './styles/app.scss';
import {UserService} from './helpers/userService';
import { StorageService } from './helpers/storageService';
import { mockData } from './utils/mock';
import Popup from './components/Popup';
const  App = () => {
  const userEntrance = UserService.isLoggedIn();

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
          <Popup></Popup>
        )
      }
      <div className='page-wrapper'>
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
              <Button
                borderRadius='3px'
                backgroundColor='#5e6c84'
                height='40px'
                width='220px'
                onClick={()=>{}}
                ><samp>Add task</samp></Button>
            </List>
          ))
        }
      </div>
      </>
    );
  }
  
  

export default App;
