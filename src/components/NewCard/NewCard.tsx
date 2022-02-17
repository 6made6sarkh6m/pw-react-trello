import React, { FC } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";
import { useDispatch } from "react-redux";
import { addCard } from "redux/ducks/Card";
import { Field, Form } from "react-final-form";
import { TextInput, Button } from "components/ui";

interface NewCardProps {
  listId: string;
  onCancelAddingCard: () => void;
}

type Value = {
  newCardTitle: string;
};

const NewCard: FC<NewCardProps> = ({ listId, onCancelAddingCard }) => {
  const dispatch = useDispatch();

  const onSubmit = (value: Value) => {
    const cardTitle = value.newCardTitle.trim();
    if (cardTitle) {
      dispatch(addCard({ cardTitle, listId }));
      onCancelAddingCard();
    }
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="newCardTitle"
              render={({ input, rest }) => {
                return (
                  <CardItem>
                    <TextInput
                      autoFocus
                      spellCheck={false}
                      {...input}
                      {...rest}
                    />
                  </CardItem>
                );
              }}
            />
            <ButtonContainer>
              <StyledButton primary={true}>Add</StyledButton>
              <StyledButton onClick={() => onCancelAddingCard()}>
                Cancel
              </StyledButton>
            </ButtonContainer>
          </form>
        )}
      />
    </>
  );
};

const CardItem = styled.div`
  display: flex;
  background-color: ${COLORS.blindingWhite};
  width: 100%;
  min-height: 50px;
  box-shadow: ${COLORS.boxShadow};
  cursor: pointer;
  padding: 6px 8px;
  margin-bottom: 10px;
  border-radius: 3px;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  width: 30%;
`;

export default NewCard;
