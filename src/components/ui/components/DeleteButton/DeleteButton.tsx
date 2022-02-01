import React, { FC } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";

interface DeleteButtonProps {
  onClick?: () => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({ children, onClick }) => {
  return <StyledDeleteButton onClick={onClick}>{children}</StyledDeleteButton>;
};

const StyledDeleteButton = styled.button`
  align-self: flex-start;
  position: relative;
  color: ${COLORS.deepGrey};
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
    background-color: ${COLORS.greyShadowed};
  }
`;
export default DeleteButton;
