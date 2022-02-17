import React, { FC, useMemo } from "react";
import { Card } from "components";
import { selectCard } from "redux/selectors";
import { useSelector } from "react-redux";

interface CardsProps {
  listTitle: string;
  id: string;
}

const Cards: FC<CardsProps> = ({ listTitle, id }) => {
  const cards = useSelector(selectCard);

  const filteredCards = useMemo(
    () => Object.values(cards).filter((card) => card.listId === id),
    [cards]
  );

  return (
    <ul>
      {filteredCards.map((card) => {
        return (
          <li key={card.id}>
            <Card
              listId={id}
              title={card.cardTitle}
              id={card.id}
              cardDescription={card.cardDescription}
              listTitle={listTitle}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Cards;