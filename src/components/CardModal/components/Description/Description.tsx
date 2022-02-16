import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateCardDescription } from "redux/ducks/Card/CardSlice";
import { Form, Field } from "react-final-form";
import { Textarea, Button } from "components/ui";

interface DescriptionProps {
  cardDescription: string;
  id: string;
}

type Value = {
  description: string;
};
const Description: FC<DescriptionProps> = ({ cardDescription, id }) => {
  const dispatch = useDispatch();
  const editDescRef = useRef<HTMLTextAreaElement>(null);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const onSubmit = (value: Value) => {
    const descriptionCard = value.description.trim();
    if (descriptionCard) {
      dispatch(updateCardDescription({ id, descriptionCard }));
      setIsEditingDescription(false);
    } else {
      setIsEditingDescription(false);
    }
  };

  useEffect(() => {
    if (isEditingDescription) {
      editDescRef?.current?.focus?.();
    } else {
      editDescRef?.current?.blur?.();
    }
  }, [isEditingDescription]);

  return (
    <DescriptionContainer>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="description"
              initialValue={cardDescription}
              render={({ input, rest }) => {
                return (
                  <Textarea
                    {...input}
                    {...rest}
                    onClick={() => setIsEditingDescription(true)}
                    rows={8}
                  />
                );
              }}
            />
            {isEditingDescription && (
              <DescriptionControlConteiner>
                <StyledButton primary={true} type="submit">
                  Save
                </StyledButton>
                <StyledButton onClick={() => setIsEditingDescription(false)}>
                  Cancel
                </StyledButton>
              </DescriptionControlConteiner>
            )}
          </form>
        )}
      />
    </DescriptionContainer>
  );
};

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 4px;
  margin-top: 30px;
`;

const DescriptionControlConteiner = styled.div`
  display: flex;
  max-width: 200px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 4px;
  margin-top: 15px;
`;

const StyledButton = styled(Button)`
  max-width: 100px;
  width: 100%;
  align-items: center;
`;

export default Description;
