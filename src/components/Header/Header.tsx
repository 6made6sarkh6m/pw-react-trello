import React from "react";
import { FC } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";

type HeaderProps = {
  username: string;
};
const Header: FC<HeaderProps> = ({ username }) => {
  return (
    <HeaderContainer>
      <HeaderTitle>Hello, {username}</HeaderTitle>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  height: 40px;
  width: 100%;
  min-width: 1440px;
  background: inherit !important;
  background-color: ${COLORS.glassEffect} !important;
  margin-bottom: 12px;
  display: flex;
  justify-content: flex-start;
  padding: 4px;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
const HeaderTitle = styled.h2`
  text-align: start;
  color: ${COLORS.deepBlue};
  font-size: 22px;
  font-family: sans-serif;
  line-height: 14px;
  font-weight: 600;
  min-height: 20px;
  padding: 8px;
  margin: 0;
`;
export default Header;
