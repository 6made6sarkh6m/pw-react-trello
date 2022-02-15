import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import AddIcon from "../ui/icons/AddIcon";
import { Button } from "components/ui/components/Button";
import { Textarea } from "components/ui/components/Textarea";
import { Card } from "../Card";
import { NewCard } from "../NewCard";
import { COLORS } from "styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { selectCard } from "redux/selectors";
import {
  deleteCardList,
  updateCardList,
} from "redux/ducks/CardList/CardListSlice";
import { DeleteButton } from "components/ui/components/DeleteButton";
import DeleteIcon from "components/ui/icons/DeleteIcon";
import { Field, Form } from "react-final-form";
import { TextInput } from "components/ui/components/TextInput";
interface ListProps {
  listTitle: string;
  id: string;
  isAddCardShowed: boolean;
  onAddCardClick: (id: string) => void;
  onCancelAddCardClick: () => void;
}

type Value = {
  cardListTitle: string;
};

const CardList: FC<ListProps> = ({
  listTitle,
  id,
  isAddCardShowed,
  onAddCardClick,
  onCancelAddCardClick,
}) => {
  const cards = useSelector(selectCard);
  const dispatch = useDispatch();

  const onSubmit = (value: Value) => {
    const listTitle = value.cardListTitle.trim();
    if (listTitle) {
      dispatch(updateCardList({ id, listTitle }));
    }
  };

  const handleDeleteCardList = (id: string) => {
    dispatch(deleteCardList({ id }));
  };

  const filteredCards = useMemo(
    () => Object.values(cards).filter((card) => card.listId === id),
    [cards]
  );

  return (
    <Root>
      <Header>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name={"cardListTitle"}
                initialValue={listTitle}
                render={({ input, rest }) => {
                  return <TextInput {...input} {...rest} />;
                }}
              />
            </form>
          )}
        />
        <DeleteButton onClick={() => handleDeleteCardList(id)}>
          <DeleteIcon />
        </DeleteButton>
      </Header>
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
      {isAddCardShowed ? (
        <NewCard listId={id} onCancelAddingCard={onCancelAddCardClick} />
      ) : (
        <StyledButton onClick={() => onAddCardClick(id)}>
          <IconContainer>
            <AddIcon />
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
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 8px 4px;
  position: relative;
  display: flex;
  flex-direction: row;
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
  z-index: 100000;
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
