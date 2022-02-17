import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { selectCard } from "redux/selectors";
import { deleteCardList, updateCardList } from "redux/ducks/CardList";
import { Field, Form } from "react-final-form";
import {
  AddIcon,
  Button,
  DeleteButton,
  DeleteIcon,
  TextInput,
} from "components/ui";
import { Card, NewCard } from "components";

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
      onSubmit({ cardListTitle: e.currentTarget.value });
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
            <StyledForm onSubmit={handleSubmit}>
              <Field
                name={"cardListTitle"}
                initialValue={listTitle}
                render={({ input, rest }) => {
                  return (
                    <TextInput {...input} {...rest} onKeyDown={handleKeyDown} />
                  );
                }}
              />
            </StyledForm>
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

const StyledForm = styled.form`
  flex-grow: 1;
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
