import React from "react";
import { FC } from "react";
import styled from "styled-components";

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
  background: inherit !important;
  background-color: rgba(255, 255, 255, 0.3) !important;
  margin-bottom: 12px;
  display: flex;
  justify-content: flex-start;
  padding: 4px;
`;
const HeaderTitle = styled.h2`
  text-align: start;
  color: ${(props) => props.color || props.theme.containerColors.listTitle};
  font-size: 22px;
  font-family: sans-serif;
  line-height: 14px;
  font-weight: 600;
  min-height: 20px;
  padding: 8px;
  margin: 0;
`;
export default Header;
