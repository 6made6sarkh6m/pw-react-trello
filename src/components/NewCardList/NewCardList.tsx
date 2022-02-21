import React, { FC } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";
import { useDispatch } from "react-redux";
import { addCardList } from "redux/ducks/CardList";
import { Form, Field } from "react-final-form";
import { TextInput, Button } from "components/ui";
import { composeValidators } from "utils/composeValidators";
import { hasEmptyValue } from "helpers/validators";

interface NewCardListProps {
  onCancelAddingCardList: () => void;
}

type Value = {
  newCardList: string;
};

const NewCardList: FC<NewCardListProps> = ({ onCancelAddingCardList }) => {
  const dispatch = useDispatch();

  const onSubmit = (value: Value) => {
    const listTitle = value.newCardList;
    dispatch(addCardList({ listTitle }));
    onCancelAddingCardList();
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <CardListItem>
              <Field
                name="newCardList"
                validate={composeValidators(hasEmptyValue)}
                render={({ input, rest }) => {
                  return (
                    <TextInput
                      autoFocus
                      spellCheck={false}
                      {...input}
                      {...rest}
                    />
                  );
                }}
              />
              <ButtonContainer>
                <StyledButton primary={true}>Add</StyledButton>
                <StyledButton onClick={onCancelAddingCardList}>
                  Cancel
                </StyledButton>
              </ButtonContainer>
            </CardListItem>
          </form>
        )}
      />
    </>
  );
};

const CardListItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.blindingWhite};
  width: 272px;
  height: 70px;
  box-shadow: ${COLORS.boxShadow};
  cursor: pointer;
  padding: 6px 8px;
  margin-bottom: 10px;
  border-radius: 3px;
  overflow-y: hidden;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  width: 30%;
`;

export default NewCardList;
