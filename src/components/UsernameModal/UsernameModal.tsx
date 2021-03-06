import React, { FC } from "react";
import styled from "styled-components";
import { COLORS } from "styles/colors";
import { useDispatch } from "react-redux";
import { saveUser } from "redux/ducks/User";
import { Form, Field } from "react-final-form";
import { TextInput, Button } from "components/ui";
import { hasEmptyValue } from "helpers/validators";
import { composeValidators } from "utils/composeValidators";
type UsernameModalProps = {
  onClose?: () => void;
};

type Value = {
  userName: string;
};

const UsernameModal: FC<UsernameModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();

  const onSubmit = (value: Value) => {
    const name = value.userName;
    dispatch(saveUser({ isAuth: true, name }));
    onClose?.();
  };

  return (
    <Root>
      <PopupInner>
        <PopupTitle>What's your name?</PopupTitle>

        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <InputWrapper onSubmit={handleSubmit}>
              <div style={{ width: "100%", flexDirection: "column" }}>
                <Field
                  name="userName"
                  validate={composeValidators(hasEmptyValue)}
                  render={({ input, rest, meta }) => {
                    return (
                      <>
                        <TextInput
                          autoFocus
                          spellCheck={false}
                          {...input}
                          {...rest}
                        />
                        {meta.error && meta.touched && (
                          <ErrorTitle>{meta.error}</ErrorTitle>
                        )}
                      </>
                    );
                  }}
                />
              </div>
              <StyledButton type="submit" primary>
                SAVE
              </StyledButton>
            </InputWrapper>
          )}
        />
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
  background-color: ${COLORS.blindingWhite};
  border-radius: 3px;
  box-shadow: ${COLORS.boxShadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const InputWrapper = styled.form`
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
