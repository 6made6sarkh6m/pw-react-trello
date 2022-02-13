import React, { FC, useState } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";
import { Button } from "components/ui/components/Button";
import { Textarea } from "components/ui/components/Textarea";
import { useDispatch } from "react-redux";
import { saveUser } from "redux/ducks/User/UserSlice";
import { Form, Field } from "react-final-form";
type UsernameModalProps = {
  onSubmit?: () => void;
};

const UsernameModal: FC<UsernameModalProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleSubmit = () => {
    const name = username.trim();
    if (name) {
      dispatch(saveUser({ isAuth: true, name }));
      onSubmit?.();
    } else {
      setIsValid(false);
    }
  };

  const handleonKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const name = username.trim();
      if (name) {
        dispatch(saveUser({ isAuth: true, name }));
        onSubmit?.();
      }
    }
  };

  return (
    <Root>
      <PopupInner>
        <PopupTitle>What's your name?</PopupTitle>
        <InputWrapper>
          <Form
            onSubmit={handleSubmit}
            render={({ handleSubmit }) => (
              <>
                <Field
                  name="username"
                  render={()=>{
                    return <Textarea
                    rows={1}
                    autoFocus={true}
                    placeholder="Type your name!"
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleonKeyDown}
                  />
                  }}/>
                <StyledButton primary={true} onClick={handleSubmit}>
                  SAVE
                </StyledButton>
              </>
            )}
          ></Form>
        </InputWrapper>
        {!isValid && <ErrorTitle>Please, type your name!</ErrorTitle>}
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
    width: 100%;
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
`;

const StyledButton = styled(Button)`
  width: 70px;
`;

export default UsernameModal;
