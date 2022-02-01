import React, { FC, useState } from "react";
import styled from "styled-components";
import { StorageService } from "helpers/storageService";
import { COLORS } from "styles/colors";
import { Button } from "components/ui/components/Button";
import { Textarea } from "components/ui/components/Textarea";
import { StorageProperties } from "enum/enum";
type PopupProps = {
  onSubmit?: () => void;
};

const UsernameModal: FC<PopupProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState<string>("");
  const [isNotValid, setIsNotValid] = useState<boolean>(false);

  const handleOnSubmit = () => {
    const trimmedUsername = username.trim();
    if (trimmedUsername) {
      StorageService.setData(trimmedUsername, StorageProperties.user);
      onSubmit?.();
    } else {
      setIsNotValid(true);
    }
  };

  const handleonKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedUsername = username.trim();
      if (trimmedUsername) {
        StorageService.setData(trimmedUsername, StorageProperties.user);
        onSubmit?.();
      }
    }
  };

  return (
    <Root>
      <PopupInner>
        <PopupTitle>What's your name?</PopupTitle>
        <InputWrapper>
          <Textarea
            rows={1}
            placeholder="Type your name!"
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleonKeyDown}
          ></Textarea>
          <StyledButton primary={true} onClick={handleOnSubmit}>
            SAVE
          </StyledButton>
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
  background: ${COLORS.shadowed};
  z-index: 10;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  @media screen and (max-width: 800px) {
    width: 100%;
    align-items: center;
  }
`;

const PopupInner = styled.div`
  position: relative;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  background-color: ${COLORS.lightGrey};
  border-radius: 3px;
  box-shadow: ${COLORS.boxShadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 800px) {
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
  @media screen and (max-width: 800px) {
    width: 100%;
    flex-direction: column;
  }
`;

const PopupTitle = styled.h2`
  font-family: sans-serif;
  color: ${COLORS.deepBlue};
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

const StyledButton = styled(Button)`
  width: 70px;
`;

export default UsernameModal;
