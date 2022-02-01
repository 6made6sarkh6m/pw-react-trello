import React, { FC } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({ className, onClick, children }) => {
  return <StyledButton
  className={className}
  onClick={onClick}>{children}</StyledButton>;
};

const StyledButton = styled.button`
width: 100%;
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
export default Button;
