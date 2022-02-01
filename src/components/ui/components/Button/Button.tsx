import React, { FC } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  background?: string;
  color?: string;
  primary?: boolean;
}

interface StyledProps {
  primary?: boolean;
}
const Button: FC<ButtonProps> = ({ className, onClick, children, primary }) => {
  return (
    <StyledButton primary={primary} className={className} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<StyledProps>`
  display: flex;
  align-items: flex-end;
  width: 100%;
  font-size: 15px;
  font-family: sans-serif;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 5px;
  border: none;
  outline: 0;
  margin: 5px 4px;
  box-shadow: ${(props) => (props.primary ? "0px 2px 2px lightgray" : "none")};
  transition: ease background-color 250ms;
  background: ${(props) => (props.primary ? "#0079bf" : "transparent")};
  color: ${(props) => (props.primary ? "white" : "#5e6c84")};
  &:hover,
  &:focus {
    outline: none;
    background-color: ${(props) =>
      props.primary
        ? "rgba(rgba(0, 121, 191, 0.08))"
        : "rgba(9, 30, 66, 0.08)"};
    color: ${COLORS.deepBlue};
  }
`;
export default Button;
