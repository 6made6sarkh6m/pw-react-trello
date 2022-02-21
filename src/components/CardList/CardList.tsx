import React, { FC, useState } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";
import { useDispatch } from "react-redux";
import { deleteCardList, updateCardList } from "redux/ducks/CardList";
import { Field, Form } from "react-final-form";
import {
  AddIcon,
  Button,
  DeleteButton,
  DeleteIcon,
  TextInput,
} from "components/ui";
import { NewCard } from "components";
import { Cards } from "./components";

interface ListProps {
  listTitle: string;
  id: string;
  isAddCardShowed: boolean;
  onCardClick: (cardId: string) => void;
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
  onCardClick,
  onAddCardClick,
  onCancelAddCardClick,
}) => {
  const dispatch = useDispatch();
  const [currentTitle, setCurrentTitle] = useState(listTitle);

  const onSubmit = (value: Value) => {
    const listTitle = value.cardListTitle;
    dispatch(updateCardList({ id, listTitle }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };
  const handleDeleteCardList = (id: string) => {
    dispatch(deleteCardList({ id }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const trimmedValue = e.currentTarget.value.trim();
    if (trimmedValue) {
      onSubmit({ cardListTitle: trimmedValue });
      setCurrentTitle(trimmedValue);
    } else {
      setCurrentTitle(listTitle);
    }
  };

  return (
    <Root>
      <Header>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <StyledForm onSubmit={handleSubmit}>
              <StyledTextInput
                type="text"
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
              />
            </StyledForm>
          )}
        />
        <DeleteButton onClick={() => handleDeleteCardList(id)}>
          <DeleteIcon />
        </DeleteButton>
      </Header>

      <Cards listTitle={listTitle} id={id} onCardClick={onCardClick} />

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

const StyledTextInput = styled.input`
  font-family: sans-serif;
  width: 100%;
  color: ${COLORS.deepBlue};
  background: ${COLORS.lightGrey};
  border: none;
  border-radius: 3px;
  box-shadow: none;
  resize: none;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  min-height: 20px;
  padding: 4px 8px;
  margin: 0;
  display: block;
  transition: all 0.1s linear;

  ::placeholder {
    font-weight: 400;
    color: ${COLORS.mildGrey};
  }

  &:focus {
    outline: none;
  }
`;

export default CardList;
