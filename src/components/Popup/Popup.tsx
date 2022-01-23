import React, { FC, useState } from 'react';
import styled from 'styled-components';
import {UserService} from '../../helpers/userService';
const PopupWrapper = styled.div`
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
    justify-content: space-around;
`
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
            
        }else{
            alert('Enter your name!');
        }
    }
    return (
        <PopupWrapper>
            <PopupInner>
                <h5>What's your name?</h5>
                <InputWrapper>
                <input type='text' onChange={(e) =>handleChange(e.target.value)}></input>
                <button onClick={() => saveUsername()}>Save</button>
            </InputWrapper>
            </PopupInner>
            
        </PopupWrapper>
    )
}

export default Popup;