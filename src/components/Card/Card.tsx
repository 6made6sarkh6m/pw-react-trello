import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import DeleteIcon from "ui-components/DeleteIcon";
import useClickOutside from "../../hooks/useClickOutside";

interface CardProps {
  title: string;
  key: string;
}
const Card = ({ title }: CardProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState<string>(title);

  const ref = useRef<HTMLTextAreaElement>();

  useClickOutside(ref, () => {
    if (isEditing) {
      setIsEditing(false);
    }
  });

  useEffect(() => {
    if (isEditing) {
      ref?.current?.focus?.();
      ref?.current?.select?.();
    }
  }, [isEditing]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentTitle) {
        setIsEditing(false);
      }
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setCurrentTitle(title);
    }
  };
  return (
    <CardItem>
      <CardTitle>{currentTitle}</CardTitle>
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
background-color: ${(props) => props.color || props.theme.buttons.transparent};
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
`
export default Card;
