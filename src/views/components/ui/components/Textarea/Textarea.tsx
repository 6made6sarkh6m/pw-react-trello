import React, { FC } from "react";
import styled from "styled-components";
import { COLORS } from "views/styles/colors";

interface TextareaProps {
  isEditing?: boolean;
  value?: string;
  spellCheck?: boolean;
  placeholder?: string;
  rows: number;
  autoFocus?: boolean;
  onChange?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  onClick?: () => void;
}
interface StyledProps {
  isEditing?: boolean;
  autoFocus?: boolean;
}
const Textarea: FC<TextareaProps> = ({
  isEditing,
  value,
  spellCheck,
  rows,
  placeholder,
  autoFocus,
  onChange,
  onKeyDown,
  onClick,
}) => {
  return (
    <StyledTextarea
      autoFocus={autoFocus}
      value={value}
      isEditing={isEditing}
      placeholder={placeholder}
      rows={rows}
      spellCheck={spellCheck}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onClick={onClick}
    ></StyledTextarea>
  );
};

const StyledTextarea = styled.textarea<StyledProps>`
  font-family: sans-serif;
  width: 100%;
  color: ${COLORS.deepBlue};
  background: ${({ isEditing }) =>
    isEditing ? () => COLORS.blindingWhite : COLORS.lightGrey};
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
    color: ${COLORS.mildGrey};
  }

  &:focus {
    outline: none;
  }
`;

export default Textarea;
