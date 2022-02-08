import React, { FC, useEffect, useRef, useState } from "react";
import useClickOutside from "hooks/useClickOutside";
import styled from "styled-components";
import { Button } from "components/ui/components/Button";
import { Textarea } from "components/ui/components/Textarea";
import { CardProperties } from "enum/enum";
import { useDispatch } from "react-redux";
import { updateCardDescription } from "redux/ducks/Card/CardSlice";
interface DescriptionProps {
  cardDescription: string;
  id: string;
}

const Description: FC<DescriptionProps> = ({ cardDescription, id }) => {
  const dispatch = useDispatch();
  const editDescRef = useRef<HTMLTextAreaElement>(null);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(cardDescription);
  const handleDescriptionUpdate = () => {
    const descriptionCard = description.trim();
    if (descriptionCard) {
      dispatch(updateCardDescription({ id, descriptionCard }));
      setIsEditingDescription(false);
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
          <StyledButton primary={true} onClick={handleDescriptionUpdate}>
            Save
          </StyledButton>
          <StyledButton
            primary={false}
            onClick={() => {
              setIsEditingDescription(false);
              setDescription(cardDescription);
            }}
          >
            Cancel
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
  align-items: center;
`;

export default Description;