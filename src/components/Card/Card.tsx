import React, { useRef, useState, useEffect, FC } from "react";
import styled from "styled-components";
import DeleteIcon from "ui-components/DeleteIcon";
import useClickOutside from "../../hooks/useClickOutside";

interface CardProps {
  listId: string;
  title: string;
  key: string;
}

interface AddCardProps {
  listId: string;
  onCancelAddingCard: () => void;
  addCard: (listId: string, currentTitle: string) => void;
}
export const NewCard: FC<AddCardProps> = ({ listId, onCancelAddingCard, addCard}) => {
  const [currentTitle, setCurrentTitle] = useState<string>("");

  const ref = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [currentTitle]);

  const handleonKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentTitle) {
        console.log(currentTitle);
      }
    }
  };

  const onAddCard = () => {
    addCard(listId, currentTitle);
    onCancelAddingCard();
  }
  return (
    <>
      <CardItem>
        <CardTitleInput placeholder="Set card name" onChange={(e)=> setCurrentTitle(e.target.value)}></CardTitleInput>
      </CardItem>
      <ButtonContainer>
        <AddNewCardButton onClick={()=> onAddCard()}>
          <span>Add card</span>
        </AddNewCardButton>
        <CancelButton onClick={()=> onCancelAddingCard()}>
          <span>Cancel</span>
        </CancelButton>
      </ButtonContainer>
    </>
  );
};
const Card = ({ title }: CardProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <CardItem>
      <CardTitle>{title}</CardTitle>
      <DeleteButton>
        <DeleteIcon></DeleteIcon>
      </DeleteButton>
    </CardItem>
  );
};

const CardItem = styled.div`
  display: flex;
  background-color: ${(props) =>
    props.color || props.theme.containerColors.whiteBackground};
  width: 90%;
  min-height: 50px;
  box-shadow: ${(props) =>
    props.color || props.theme.containerColors.boxShadow};
  cursor: pointer;
  padding: 6px 8px;
  margin-bottom: 10px;
  border-radius: 3px;
  overflow: hidden;
`;
const CardTitle = styled.span`
  font-size: 14px;
  flex-grow: 1;
  font-weight: 400;
  line-height: 20px;
  text-align: start;
  word-break: break-all;
  font-family: sans-serif;
`;
const CardTitleInput = styled.textarea`
  font-family: sans-serif;
  width: 100%;
  background: ${(props) =>
    props.color || props.theme.containerColors.whiteBackground};
  border: none;
  border-radius: 3px;
  resize: none;
  font-size: 14px;
  font-weight: 400;
  min-height: 20px;
  line-height: 20px;
  overflow: hidden;
  display: block;
  flex-grow: 1;

  ::placeholder {
    font-weight: 400;
    color: ${(props) => props.color || props.theme.containerColors.placeholder};
  }

  &:focus {
    outline: none;
  }
`;

const EditTitleContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const DeleteButton = styled.button`
  align-self: flex-start;
  position: relative;
  color: ${(props) => props.color || props.theme.containerColors.buttonText};
  border: none;
  background-color: ${(props) =>
    props.color || props.theme.buttons.transparent};
  padding: 4px;
  border-radius: 3px;
  margin-top: -2px;
  margin-right: -4px;
  opacity: 0.8;

  :hover {
    opacity: 1;
    color: ${(props) => props.color || props.theme.containerColors.listTitle};
    background-color: rgba(9, 30, 66, 0.08);
  }
`;
const AddNewCardButton = styled.button`
  width: 40%;
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
    color: ${(props) => props.color || props.theme.containerColors.listTitle};
  }
`;
const CancelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  margin: 10px 0px;
  padding: 5px 15px;
  width: 30%;
  color: ${(props) => props.color || props.theme.containerColors.buttonText};
  background-color: ${(props) =>
    props.color || props.theme.buttons.transparent};
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
    color: ${(props) => props.color || props.theme.containerColors.listTitle};
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export default Card;
