import React, { FC, useMemo } from "react";
import { Card } from "components";
import { selectCards } from "redux/selectors";
import { useSelector } from "react-redux";

interface CardsProps {
  listTitle: string;
  id: string;
  onCardClick: (cardId: string) => void;
}

const Cards: FC<CardsProps> = ({ listTitle, id, onCardClick }) => {
  const cards = useSelector(selectCards);

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
              onCardClick={() => onCardClick(card.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Cards;
