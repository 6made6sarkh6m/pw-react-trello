import React, { FC, useState } from "react";
import styled from "styled-components";
import { UserService } from "helpers/userService";
import { COLORS } from "styles/colors";

type PopupProps = {
  onSubmit?: () => void;
};

const Popup: FC<PopupProps> = ({onSubmit}) => {
  const [username, setUsername] = useState<string>("");
  const [isNotValid, setIsNotValid] = useState<boolean>(false);

  
  const handleOnSubmit = () => {
    if(username.trim() !=="") {
      UserService.setUsername(username);
      onSubmit?.();
    } else {
      setIsNotValid(true);
    }
  }
  return (
    <Root>
      <PopupInner>
        <PopupTitle>What's your name?</PopupTitle>
        <InputWrapper>
          <form onSubmit={() => handleOnSubmit()}>
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
  display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    @media screen and (max-width: 800px){
      width: 100%;
      align-items: center;

    }
`;

const PopupInner = styled.div`
  position: relative;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  background-color: ${COLORS.listWrapper};
  border-radius: 3px;
  box-shadow: ${COLORS.boxShadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 800px){
    width: calc((100% - 100px) / 3);
    
    
  }
  
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 350px;
  width: 100%;
  justify-content: space-between;
  @media screen and (max-width: 800px){
    width: 100%;
    flex-direction: column;
    
  }
`;
const UserNameInput = styled.input`
  font-family: sans-serif;
  background: ${COLORS.whiteBackground};
  border: none;
  border-radius: 3px;
  resize: none;
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
const PopupTitle = styled.h2`
  font-family: sans-serif;
  color: ${COLORS.listTitle};
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  min-height: 20px;
  padding: 8px;
  margin: 0;
`;

const ErrorTitle = styled.p`
    font-family: sans-serif;
    color: ${COLORS.error};
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
    color: ${COLORS.listTitle};
  }
`;
export default Popup;
