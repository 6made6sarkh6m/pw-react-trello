import React, { FC, useEffect, useRef, useState } from "react";
import { CardDataProps } from "App";
import useClickOutside from "hooks/useClickOutside";
import styled from "styled-components";
import { Button } from "components/ui/components/Button";
import { Textarea } from "components/ui/components/Textarea";
import { CardProperties } from "enum/enum";
interface DescriptionProps {
  cardDescription: string;
  cardId: string;
  updateCardTitle: (
    cardId: string,
    cardProperty: keyof CardDataProps,
    value: string
  ) => void;
}

const Description: FC<DescriptionProps> = ({
  cardDescription,
  cardId,
  updateCardTitle,
}) => {
  const editDescRef = useRef<HTMLTextAreaElement>(null);
  const [isEditingDescription, setIsEditingDescription] =
    useState<boolean>(false);
  const [description, setDescription] = useState<string>(cardDescription);
  const onDescriptionUpdate = () => {
    const trimmedDescription = description.trim();
    if (trimmedDescription) {
      setIsEditingDescription(false);
      updateCardTitle(cardId, CardProperties.description, description);
    } else {
      setIsEditingDescription(false);
      setDescription(cardDescription);
    }
  };

  useClickOutside(editDescRef, () => {
    if (isEditingDescription) {
      setIsEditingDescription(false);
      setDescription(description);
    }
  });

  useEffect(() => {
    if (isEditingDescription) {
      editDescRef?.current?.focus?.();
    } else {
      editDescRef?.current?.blur?.();
    }
  }, [isEditingDescription]);
  return (
    <>
      <DescriptionContainer>
        <Title>Description</Title>
        <Textarea
          onClick={() => setIsEditingDescription(true)}
          isEditing={isEditingDescription}
          rows={8}
          value={description}
          placeholder="Type your description text"
          onChange={(e) => setDescription(e.target.value)}
          spellCheck={false}
        ></Textarea>
      </DescriptionContainer>

      {isEditingDescription && (
        <DescriptionControlConteiner>
          <StyledButton primary={true} onClick={onDescriptionUpdate}>
            <span>Add</span>
          </StyledButton>
          <StyledButton
            primary={false}
            onClick={() => {
              setIsEditingDescription(false);
              setDescription(cardDescription);
            }}
          >
            <span>Cancel</span>
          </StyledButton>
        </DescriptionControlConteiner>
      )}
    </>
  );
};
const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 0 4px;
  margin-top: 30px;
`;
const Title = styled.h2`
  text-align: start;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  min-height: 20px;
  padding: 8px;
  margin: 0;
  font-family: sans-serif;
`;

const DescriptionControlConteiner = styled.div`
  display: flex;
  width: 30%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 4px;
  margin-top: 15px;
`;

const StyledButton = styled(Button)`
  width: 30%;
`;

export default Description;
