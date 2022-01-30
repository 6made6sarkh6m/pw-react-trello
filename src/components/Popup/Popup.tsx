import React, { FC, useState } from "react";
import styled from "styled-components";
import { patternValidation } from "utils/validate";
import { UserService } from "helpers/userService";

type PopupProps = {
  setIsPresent: React.Dispatch<React.SetStateAction<boolean>>;
};

const Popup: FC<PopupProps> = ({ setIsPresent }) => {
  const [username, setUsername] = useState<string>("");
  const [isNotValid, setIsNotValid] = useState<boolean>(false);

  const saveUsername = () => {
    if (username.trim() !== "" && !patternValidation(username)) {
      UserService.setUsername(username);
      setIsPresent(true);
    } else {
      setIsNotValid(true);
    }
  };
  
  return (
    <Root>
      <PopupInner>
        <PopupTitle>What's your name?</PopupTitle>
        <InputWrapper>
          <form onSubmit={() => saveUsername()}>
            <UserNameInput
              placeholder="Type your name!"
              required
              onChange={(e) => setUsername(e.target.value)}
            ></UserNameInput>
            <Button type="submit">
              <samp>SAVE</samp>
            </Button>
          </form>
        </InputWrapper>
        {isNotValid && <ErrorTitle>Please, type your name!</ErrorTitle>}
      </PopupInner>
    </Root>
  );
};

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 1440px;
  background-color: #000000b5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupInner = styled.div`
  position: relative;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  background-color: ${(props) =>
    props.color || props.theme.containerColors.listWrapper};
  border-radius: 3px;
  box-shadow: ${(props) =>
    props.color || props.theme.containerColors.boxShadow};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 350px;
  width: 100%;
  justify-content: space-between;
`;
const UserNameInput = styled.input`
  font-family: sans-serif;
  background: ${(props) =>
    props.color || props.theme.containerColors.whiteBackground};
  border: none;
  border-radius: 3px;
  resize: none;
  font-size: 14px;
  font-weight: 400;
  padding: 10px;
  margin: 10px;
  ::placeholder {
    font-weight: 400;
    color: ${(props) => props.color || props.theme.containerColors.placeholder};
  }

  &:focus {
    outline: none;
  }
`;
const PopupTitle = styled.h2`
  font-family: sans-serif;
  color: ${(props) => props.color || props.theme.containerColors.listTitle};
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  min-height: 20px;
  padding: 8px;
  margin: 0;
`;

const ErrorTitle = styled.p`
    font-family: sans-serif;
    color: ${(props) => props.color || props.theme.containerColors.error};
    font-size: 15px;
    margin: 0;
    min-height: 20px;
    }
`;

const Button = styled.button`
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
export default Popup;
