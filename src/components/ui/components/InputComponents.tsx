import styled from "styled-components";
import { COLORS } from "styles/colors";

interface InputProps {
  readonly isEditing: boolean;
}

export const EditTitleInput = styled.textarea<InputProps>`
  font-family: sans-serif;
  width: 100%;
  color: #172b4d;
  background: ${({ isEditing }) =>
    isEditing ? () => COLORS.blindingWhite : "transparent"};
  border: none;
  border-radius: 3px;
  box-shadow: ${({ isEditing }) =>
    isEditing ? () => COLORS.boxShadow : "none"};
  resize: none;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  min-height: 20px;
  padding: 4px 8px;
  margin: 0;
  display: block;
  transition: all 0.1s linear;

  ::placeholder {
    font-weight: 400;
    color: ${COLORS.placeholder};
  }

  &:focus {
    outline: none;
  }
`;
export const AddCardButton = styled.button`
  display: flex;
  align-items: flex-end;
  border: none;
  width: 70%;
  color: ${COLORS.buttonText};
  background-color: ${COLORS.buttonColors.transparent};
  border-radius: 3px;
  padding: 4px 8px;
  margin: 0 4px;
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
    color: ${COLORS.deepBlue};
  }
`;

export const SaveButton = styled.button`
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
    color: ${COLORS.deepBlue};
  }
`;
export const CardTitleInput = styled.textarea`
  font-family: sans-serif;
  width: 100%;
  background: ${COLORS.blindingWhite};
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
    color: ${COLORS.placeholder};
  }

  &:focus {
    outline: none;
  }
`;
export const AddNewCardButton = styled.button`
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
    color: ${COLORS.deepBlue};
  }
`;
export const CancelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  margin: 10px 0px;
  padding: 5px 15px;
  width: 30%;
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
    color: ${COLORS.deepBlue};
  }
`;

export const UserNameInput = styled.input`
  font-family: sans-serif;
  background: ${COLORS.blindingWhite};
  border: none;
  border-radius: 3px;
  resize: none;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  padding: 10px;
  margin: 10px;
  ::placeholder {
    font-weight: 400;
    color: ${COLORS.placeholder};
  }

  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
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
    color: ${COLORS.deepBlue};
  }
`;
export const DeleteButton = styled.button`
  align-self: flex-start;
  position: relative;
  color: ${COLORS.buttonText};
  border: none;
  background-color: ${COLORS.buttonColors.transparent};
  padding: 4px;
  border-radius: 3px;
  margin-top: -2px;
  margin-right: -4px;
  opacity: 0.8;

  :hover {
    opacity: 1;
    color: ${COLORS.deepBlue};
    background-color: rgba(9, 30, 66, 0.08);
  }
`;
export const CommentInput = styled.textarea`
  flex-grow: 1;
  font-family: sans-serif;
  width: 100%;
  background: ${COLORS.lightGrey};
  border: none;
  border-radius: 3px;
  resize: none;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  min-height: 20px;
  display: block;
  overflow: hidden;

  ::placeholder {
    font-weight: 400;
    color: ${COLORS.placeholder};
  }

  &:focus {
    outline: none;
  }
`;
export const EditDescriptionInput = styled.textarea<InputProps>`
  font-family: sans-serif;
  width: 100%;
  color: #172b4d;
  background: ${({ isEditing }) =>
    isEditing ? COLORS.blindingWhite : COLORS.lightGrey};
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
