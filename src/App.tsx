import React, { useEffect, useState } from 'react';
import { IList } from './types';
import List from './components/List';
import Card from './components/Card';
import Button from './components/Button';
import './styles/app.scss';
const  App = () => {
  const [list, setList] = useState<IList[]>([
    {id: 1, title : 'TO DO', cards: [{id: 1, title: 'Complete trello task', comment: 'JEEZ, just do it already'}]},
    {id: 2, title : 'In Progress', cards: []},
    {id: 3, title : 'Testing', cards: []},
    {id: 4, title : 'Done', cards: []}
  ]);

  return (
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
  );
}

export default App;
