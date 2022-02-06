import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useClickOutside from "../../hooks/useClickOutside";
import AddIcon from "../ui/icons/AddIcon";
import { Button } from "app/views/components/ui/components/Button";
import { Textarea } from "app/views/components/ui/components/Textarea";
import { Card } from "../Card";
import { NewCard } from "../NewCard";
import { COLORS } from "app/views/styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { CardReducer } from "app/state/ducks/Card";
import { selectCard } from "app/state/store";
import { updateCardList } from "app/state/ducks/CardList/reducers";
 interface ListProps {
   listTitle: string;
    id: string;
//   cards: CardsData;
//   comments: CommentsData;
//   username: string;
//   onUpdateList: (id: string, title: string) => void;
//   onAddCard: (listId: string, cardTitle: string) => void;
//   onDeleteCard: (id: string) => void;
//   onUpdateCard: (
//     cardId: string,
//     cardProperty: keyof CardDataProps,
//     value: string
//   ) => void;
//   onUpdateComment: (
//     id: string,
//     commentProperty: keyof CommentDataProps,
//     value: string
//   ) => void;
//   onDeleteComment: (id: string) => void;
//   onAddComment: (cardId: string, author: string, comment: string) => void;
 }

const CardList: FC<ListProps> = ({listTitle, id}) => {
  const cards = useSelector(selectCard);
  const dispatch = useDispatch();
  const [currentTitle, setCurrentTitle] = useState<string>(listTitle);
  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const [isAddingCardOnColumn, setAddingCardOnColumn] = useState<string>("");

  let isAddingNewCard = false;

  const handleOnAddNewCard = (id: string) => {
    setAddingCardOnColumn(id);
    isAddingNewCard = isAddingCardOnColumn === id;
  };
  const handleonKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const listTitle = currentTitle.trim();
      if (listTitle) {
        setIsEditing(false);
        dispatch(updateCardList({id, listTitle}));
      }
    }

    if (e.key === "Escape") {
      setCurrentTitle(listTitle);
      setIsEditing(false);
    }
  };

  const handleCancelAddingCard = () => {
    setIsAddingCard(false);
  };
  useClickOutside(ref, () => {
    if (isEditing) {
      setIsEditing(false);
    }
  });

  useEffect(() => {
    if (isEditing) {
      ref?.current?.focus?.();
      ref?.current?.select?.();
    } else {
      ref?.current?.blur?.();
    }
  }, [isEditing]);
  return (
    <Root>
      <Header>
        <Title>{listTitle}</Title>
        {!isEditing && (
          <EditTitleContainer
            onClick={() => {
              setIsEditing(true);
            }}
          ></EditTitleContainer>
        )}
        <Textarea
          isEditing={isEditing}
          rows={1}
          value={currentTitle}
          spellCheck={false}
          onChange={(e) => setCurrentTitle(e.target.value)}
          onKeyDown={handleonKeyDown}
        ></Textarea>
      </Header>
      <ul>
        {Object.values(cards)
          .filter((card) => card.listId === id)
          .map((card) => {
            return (
              <li key={card.id}>
                <Card
                  listId={id}
                  title={card.cardTitle}
                  id={card.id}
                  cardDescription={card.cardDescription}
                  listTitle={listTitle}
                ></Card>
              </li>
            );
          })}
      </ul>
      {isAddingCard ? (
        <NewCard
          listId={id}
          onCancelAddingCard={handleCancelAddingCard}
        ></NewCard>
      ) : (
        <StyledButton
          onClick={() => setIsAddingCard(!isAddingCard)}
          primary={false}
        >
          <IconContainer>
            <AddIcon></AddIcon>
          </IconContainer>
          Add card
        </StyledButton>
      )}
    </Root>
  );
};
const Root = styled.div`
  width: 272px;
  background: ${COLORS.lightGrey};
  border-radius: 3px;
  margin-right: 12px;
  margin-bottom: 12px;
  padding: 0 4px 8px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Header = styled.div`
  padding: 8px 4px;
  position: relative;
  display: flex;
`;

const Title = styled.h2`
  display: none;
  text-align: start;
  color: ${COLORS.deepBlue};
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  min-height: 20px;
  padding: 8px;
  margin: 0;
`;

const EditTitleContainer = styled.div`
  position: absolute;
  margin: 0 4px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 4px;
  cursor: pointer;
`;

const IconContainer = styled.div`
  margin-right: 4px;
  height: 20px;
  opacity: 0.8;
  display: flex;
  color: ${COLORS.deepGrey};
`;

const StyledButton = styled(Button)`
  width: 70%;
`;

export default CardList;