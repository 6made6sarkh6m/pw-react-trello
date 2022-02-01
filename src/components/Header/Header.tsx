import React from "react";
import { FC } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";

type HeaderProps = {
  username: string;
};
const Header: FC<HeaderProps> = ({ username }) => {
  return (
    <Container>
      <Title>Hello, {username}</Title>
    </Container>
  );
};

const Container = styled.header`
  height: 40px;
  width: 100%;
  background: inherit;
  background-color: ${COLORS.glassEffect};
  margin-bottom: 12px;
  display: flex;
  justify-content: flex-start;
  padding: 4px;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
const Title = styled.h2`
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
