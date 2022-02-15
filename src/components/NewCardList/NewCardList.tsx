import React, { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "components/ui/components/Button";
import { COLORS } from "styles/colors";
import { Textarea } from "components/ui/components/Textarea";
import { useDispatch } from "react-redux";
import { addCardList } from "redux/ducks/CardList/CardListSlice";
import { Form, Field } from "react-final-form";
import { TextInput } from "components/ui/components/TextInput";

interface NewCardListProps {
  onCancelAddingCardList: () => void;
}

type Value = {
  newCardList: string;
};

const NewCardList: FC<NewCardListProps> = ({ onCancelAddingCardList }) => {
  const dispatch = useDispatch();
  const [cardListTitle, setCardListTitle] = useState("");

  const onSubmit = (value: Value) => {
    const listTitle = value.newCardList.trim();
    if (listTitle) {
      dispatch(addCardList({ listTitle }));
      onCancelAddingCardList();
    }
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
                render={({ input, rest }) => {
                  return <TextInput {...input} {...rest} />;
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
