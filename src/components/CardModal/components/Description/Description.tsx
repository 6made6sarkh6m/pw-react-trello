import React, { FC, useEffect, useRef, useState } from 'react';
import { CardDataProps } from 'App';
import useClickOutside from 'hooks/useClickOutside';
import styled from 'styled-components';
import { COLORS } from 'styles/colors';
import { CardProperties } from "enum/enum";
import {SaveButton, CancelButton, EditDescriptionInput} from 'components/ui/components/InputComponents';
interface DescriptionProps {
    cardDescription: string;
    cardId: string;
    updateCardTitle: (
        cardId: string,
        cardProperty: keyof CardDataProps,
        value: string
      ) => void;
}

const Description:FC <DescriptionProps> = ({cardDescription, cardId, updateCardTitle}) => {
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
      useClickOutside(editDescRef, ()=> {
        if (isEditingDescription) {
          setIsEditingDescription(false);
          setDescription(description);
        }
        
      })

      useEffect(()=>{
        if (isEditingDescription) {
            editDescRef?.current?.focus?.();
          }else{
            editDescRef?.current?.blur?.();
          }
      },[isEditingDescription])
    return(
        <>
        <DescriptionContainer>
            <Title>Description</Title>
            <EditDescriptionInput
              onClick={() => setIsEditingDescription(true)}
              ref={editDescRef}
              isEditing={isEditingDescription}
              rows={10}
              value={description}
              placeholder="Type your description text"
              onChange={(e) => setDescription(e.target.value)}
              spellCheck={false}
            ></EditDescriptionInput>
          </DescriptionContainer>

          {isEditingDescription && (
            <DescriptionControlConteiner>
              <SaveButton onClick={onDescriptionUpdate}>
                <span>Add</span>
              </SaveButton>
              <CancelButton
                onClick={() => {
                  setIsEditingDescription(false);
                  setDescription(cardDescription);
                }}
              >
                <span>Cancel</span>
              </CancelButton>
            </DescriptionControlConteiner>
          )}
          </>
    )
}
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




export default Description;