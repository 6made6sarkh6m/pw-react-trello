import { CardProps, CommentsData } from "App";
import useClickOutside from "hooks/useClickOutside";
import React, { FC, useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { patternValidation } from "utils/validate";
import DeleteIcon from "../ui-components/DeleteIcon";
interface CardViewProps {
  onClose?: () => void;
  comments: CommentsData;
  cardId: string;
  cardTitle: string;
  listTitle: string;
  updateCardTitle: (
    cardId: string,
    cardProperty: keyof CardProps,
    value: string
  ) => void;
  cardDescription: string;
}
interface InputProps {
  readonly isEditing: boolean;
}

const CardView: FC<CardViewProps> = ({
  onClose,
  comments,
  cardId,
  cardTitle,
  listTitle,
  updateCardTitle,
  cardDescription,
}) => {
  const ref = useRef<HTMLTextAreaElement>();
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [isEditingDescription, setIsEditingDescription] =
    useState<boolean>(false);

  const [description, setDescription] = useState<string>(cardDescription);
  const [title, setTitle] = useState<string>(cardTitle);
  const onDescriptionUpdate = () => {
      if(description.trim() !== "" && !patternValidation(title)) {
          setIsEditingDescription(false);
          updateCardTitle(cardId, "cardDescription", description);
      }else{
          setIsEditingDescription(false);
          updateCardTitle(cardId, "cardDescription", "");
      }
  }
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (title.trim() !== "" && !patternValidation(title)) {
        setIsEditingTitle(false);
        updateCardTitle(cardId, "cardTitle", title);
      }
    }
  };
  const handleCloseView: EventListener | EventListenerObject = (e) => {
    const event = e as KeyboardEvent;
    if (event.key === "Escape") {
      setIsEditingTitle(false);
      setTitle(cardTitle);
      onClose?.();
    }
  };
  useClickOutside(ref, () => {
    if (isEditingTitle) {
      setIsEditingTitle(false);
      setTitle(cardTitle);
    }
    if (isEditingDescription) {
      setIsEditingDescription(false);
    }
  });
  useEffect(() => {
    if (isEditingTitle) {
      ref?.current?.focus?.();
      ref?.current?.select?.();
    } else {
      ref?.current?.blur?.();
    }
    if (isEditingDescription) {
      ref?.current?.focus?.();
    } else {
      ref?.current?.blur?.();
    }
  }, [isEditingTitle, isEditingDescription]);
  useEffect(() => {
    document.addEventListener("keydown", handleCloseView, false);

    return () => {
      document.removeEventListener("keydown", handleCloseView, false);
    };
  }, []);
  return (
    <Root>
      <Container>
        <CardModal>
          <Header>
            <div style={{ width: "90%" }}>
              <CardTitle>{cardTitle}</CardTitle>
              {!isEditingTitle && (
                <>
                  <EditTitleContainer
                    onClick={() => {
                      setIsEditingTitle(true);
                    }}
                  ></EditTitleContainer>
                </>
              )}
              <EditTitleInput
                ref={ref as any}
                isEditing={isEditingTitle}
                rows={1}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleOnKeyDown}
                spellCheck={false}
              ></EditTitleInput>
            </div>
            <DeleteButton onClick={onClose}>
              <DeleteIcon></DeleteIcon>
            </DeleteButton>
          </Header>
          <ListTitleContainer>
            <ListTitle>В колонке {listTitle}</ListTitle>
          </ListTitleContainer>
          <DescriptionContainer>
            <Title>Description</Title>
            <EditDescriptionInput
              onClick={() => setIsEditingDescription(true)}
              ref={ref as any}
              isEditing={isEditingDescription}
              rows={10}
              value={description}
              placeholder="Type your description text"
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleOnKeyDown}
              spellCheck={false}
            ></EditDescriptionInput>
          </DescriptionContainer>
          {isEditingDescription && (
            <DescriptionControlConteiner>
              <AddDescriptionButton
              onClick={onDescriptionUpdate}>
                <span>Add</span>
              </AddDescriptionButton>
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
        </CardModal>
      </Container>
    </Root>
  );
};

const Root = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    margin: 0;
    padding: 0;
    overflow-y: auto;
  }
`;

const Container = styled.div`
  position: relative;
  width: max-content;
  background-color: white;
  border-radius: 2px;
  padding: 10px;
  margin: 30px 5px 80px;
  overflow: hidden;
`;

const CardModal = styled.div`
  width: 768px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-between;
  padding: 0 4px;
`;

const CardTitle = styled.h2`
  display: none;
  text-align: start;
  color: black;
  font-weight: 600;
  max-height: 30px;
  padding: 8px;
  margin: 0;
`;

const EditTitleContainer = styled.div`
  position: absolute;
  max-height: 60px;
  margin: 0 4px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 4px;
  cursor: pointer;
  width: 90%;
`;
const EditTitleInput = styled.textarea<InputProps>`
  overflow-y: hidden;
  font-family: sans-serif;
  width: 100%;
  color: #172b4d;
  background: ${({ isEditing }) =>
    isEditing
      ? (props) => props.color || props.theme.containerColors.listWrapper
      : "transparent"};
  border: none;
  border-radius: 3px;
  resize: none;
  font-size: 16px;
  line-height: 12px;
  font-weight: 600;
  min-height: 30px;
  padding: 4px 8px;
  margin: 0;
  display: block;
  transition: all 0.1s linear;

  ::placeholder {
    font-weight: 400;
    color: ${(props) => props.color || props.theme.containerColors.placeholder};
  }

  &:focus {
    outline: none;
  }
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

const ListTitleContainer = styled.div`
  display: flex;
  align-self: flex-start;
  padding: 0 12px;
`;
const ListTitle = styled.span`
  font-size: 12px;
  font-family: sans-serif;
  color: lightgrey;
  display: flex;
`;
const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 0 4px;
  margin-top: 30px;
`;
const Title = styled.h2`
  text-align: start;
  color: ${(props) => props.color};
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
const AddDescriptionButton = styled.button`
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
const EditDescriptionInput = styled.textarea<InputProps>`
  font-family: sans-serif;
  width: 100%;
  color: #172b4d;
  background: ${({ isEditing }) =>
    isEditing
      ? (props) => props.color || props.theme.containerColors.whiteBackground
      : (props) => props.color || props.theme.containerColors.listWrapper};
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
    color: ${(props) => props.color || props.theme.containerColors.placeholder};
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
export default CardView;