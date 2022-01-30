import { CardDataProps } from 'App';
import useClickOutside from 'hooks/useClickOutside';
import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from 'styles/colors';

interface DescriptionProps {
    cardDescription: string;
    cardId: string;
    updateCardTitle: (
        cardId: string,
        cardProperty: keyof CardDataProps,
        value: string
      ) => void;
}
interface InputProps {
    readonly isEditing: boolean;
  }
  
const Description:FC <DescriptionProps> = ({cardDescription, cardId, updateCardTitle}) => {
    const editDescRef = useRef<HTMLTextAreaElement>(null);
    const [isEditingDescription, setIsEditingDescription] =
    useState<boolean>(false);
    const [description, setDescription] = useState<string>(cardDescription);
    const onDescriptionUpdate = () => {
        if (description.trim() !== " ") {
          setIsEditingDescription(false);
          updateCardTitle(cardId, "cardDescription", description);
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
const SaveButton = styled.button`
  width: 70px;
  font-size: 15px;
  font-family: sans-serif;
  cursor: pointer;
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  border: none;
  outline: 0;
  background-color: #0079bf;
  margin: 10px 0px;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover,
  &:focus {
    outline: none;
    background-color: rgba(rgba(0, 121, 191, 0.08));
    color: ${COLORS.listTitle};
  }
`;
const EditDescriptionInput = styled.textarea<InputProps>`
  font-family: sans-serif;
  width: 100%;
  color: #172b4d;
  background: ${({ isEditing }) =>
    isEditing ? COLORS.whiteBackground : COLORS.listWrapper};
  border: none;
  border-radius: 3px;
  resize: none;
  font-size: 12px;
  line-height: 10px;
  font-weight: 600;
  min-height: 100px;
  padding: 4px 8px;
  margin: 0;
  display: block;
  transition: all 0.1s linear;

  ::placeholder {
    font-weight: 400;
    color: ${COLORS.placeholder};
  }

  &:focus {
    outline: 1px solid #0079bf;
  }
`;
const CancelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  margin: 10px 0px;
  padding: 5px 15px;
  width: 70px;
  color: ${COLORS.buttonText};
  background-color: ${COLORS.buttonColors.transparent};
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  & > span {
    line-height: 20px;
    font-family: sans-serif;
  }
  &:hover,
  &:focus {
    outline: none;
    background-color: rgba(9, 30, 66, 0.08);
    color: ${COLORS.listTitle};
  }
`;

export default Description;