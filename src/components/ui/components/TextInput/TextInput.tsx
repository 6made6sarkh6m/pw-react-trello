import React, { FC } from "react";
import { FieldRenderProps } from "react-final-form";
import styled from "styled-components";
import { COLORS } from "styles/colors";

type TextInputProps = FieldRenderProps<string, any>;
interface StyledProps {
  isEditing?: boolean;
  autoFocus?: boolean;
}
const TextInput: FC<TextInputProps> = ({
  input,
  meta,
  ...rest
}: TextInputProps) => {
  return <StyledTextInput {...input} {...rest} />;
};

const StyledTextInput = styled.input<StyledProps>`
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

export default TextInput;
