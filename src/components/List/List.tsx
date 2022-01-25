import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { StorageService } from '../../helpers/storageService';
import useClickOutside from '../../hooks/useClickOutside';
interface ListProps {
    title: string,
    key: number
}

interface InputProps {
   readonly isEditing: boolean;
}
const List: FC<ListProps> = ({key, title, children}) => {

    const [currentTitle, setCurrentTitle] = useState<string>(title);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const ref = useRef<HTMLTextAreaElement>();


    useClickOutside( ref, () => {
        if( isEditing ) {
            setIsEditing(false);
        }

    });

    useEffect(() => {
        if( isEditing ) {
            ref?.current?.focus?.();
            ref?.current?.select?.();
        } else {
            ref?.current?.blur?.();
        }
    }, [isEditing]);
    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ( e.key === 'Enter' ) {
            e.preventDefault();
            StorageService.updateList(key, currentTitle);
            setIsEditing(false);
        }

        if ( e.key === 'Escape' ) {
            setCurrentTitle(title);
            setIsEditing(false);
        }
    }
    return(
        <ListWrapper>
            <ListHeader>
            <ListTitle>
                {currentTitle}
            </ListTitle>
            { !isEditing && (
                <>
                    <EditTitleContainer
                        onClick={() => {
                            setIsEditing(true);
                        }}
                    ></EditTitleContainer>
                </>
            )}
            <EditTitleInput
                ref = {ref as any}
                isEditing = {isEditing}
                rows = {1}
                value = {currentTitle}
                spellCheck = {false}
                onChange = {(e) => setCurrentTitle(e.target.value)}
                onKeyDown={onKeyDown}
            ></EditTitleInput>
            </ListHeader>
            {children}
        </ListWrapper>
    )
}
const ListWrapper = styled.div`
    min-width: 272px;
    max-width: 272px;
    background: ${props => props.color || props.theme.containerColors.listWrapper};
    border-radius: 3px;
    margin-right: 12px;
    margin-bottom: 12px;
    padding: 0 4px 8px;
    display: flex;
    flex-direction: column;`

const ListHeader = styled.div`
    padding: 8px 4px;
    position: relative;
    display: flex;
`
const ListTitle = styled.h2`
    display: none;
    text-align: start;
    color: ${props => props.color || props.theme.containerColors.listTitle};
    font-size: 14px;
    line-height: 14px;
    font-weight: 600;
    min-height: 20px;
    padding: 8px;
    margin: 0;
`

const EditTitleContainer = styled.div`
    position: absolute;
    margin: 0 4px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 4px;
    cursor: pointer;
`
const EditTitleInput = styled.textarea<InputProps>`
    font-family: sans-serif;
    width: 100%;
    color: #172b4d;
    background: ${({ isEditing }) => (isEditing ? (props => props.color || props.theme.containerColors.whiteBackground) : "transparent") };
    border: none;
    border-radius: 3px;
    box-shadow: ${({ isEditing}) => (isEditing ? (props => props.color || props.theme.containerColors.boxShadow) : "none")};
    resize: none;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    min-height: 20px;
    padding: 4px 8px;
    margin: 0;
    display: block;
    transition: all 0.1s linear;

  ::placeholder {
    font-weight: 400;
    color: ${props => props.color || props.theme.containerColors.placeholder};
  }

  &:focus {
    outline: none;
  }
`


export default List;