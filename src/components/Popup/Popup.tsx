import React, { FC, useState } from 'react';
import styled from 'styled-components';
import {UserService} from '../../helpers/userService';

type PopupProps = {
    setIsPresent: React.Dispatch<React.SetStateAction<boolean>>;
}
const Popup: FC <PopupProps> = ({setIsPresent}) => {
    const [username, setUsername] = useState<string>('');

    const handleChange = (value : string) => {
        setUsername(value);
    }
    const saveUsername = () => {
        if(username.length > 0) {
            UserService.setUsername(username);
            setIsPresent(true);
        }else {
            alert('Please, enter your name');
        }
        
    }
    return (
        <Root>
            <PopupInner>
                <h5><samp>What's your name?</samp></h5>
                <InputWrapper>
                <form onSubmit={() => saveUsername()}>
                <UserNameInput type='text' required  onChange={(e) =>handleChange(e.target.value)}></UserNameInput>
                <Button type='submit' onClick={() => saveUsername()}><samp>SAVE</samp></Button>
                </form>
            </InputWrapper>
            </PopupInner>
            
        </Root>
    )
}

const Root = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #000000b5;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PopupInner = styled.div`
    position: relative;
    padding: 24px;
    max-width: 400px;
    width: 100%;
    background-color: #ebecf0;
    border-radius: 3px;
    box-shadow: 0 1px 0 #091e4240;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 350px;
    width: 100%;
    justify-content: space-between;
`
const UserNameInput = styled.input`
    width: 70%;
    border: 1px solid lightgrey;
    font-family: monospace;
    font-size: 1.5rem;
    border-radius: 3px;
`

const Button = styled.button`
    width: 20%;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;

`
export default Popup;