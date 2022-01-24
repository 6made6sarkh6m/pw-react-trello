import React, { FC } from 'react';
import styled from 'styled-components';

const ListWrapper = styled.div`
    min-width: 272px;
    min-height: 100px;
    background-color:#ebecf0;
    border-radius: 3px;
    margin: 30px;
    padding: 20px 10px;
    display: flex;
    align-items: center;
    flex-direction: column;`

const ListTitle = styled.input`
    font-size: 1rem;
    font-family: monospace;
    border: none;
    background: none;
    cursor: pointer;
    margin: 0 0 5px 0;
    font-weight: 500;`


interface ListProps {
    title: string,
    key: number
}
const List: FC<ListProps> = ({title, children}) => {
    return(
        <ListWrapper>
            <form>
            <ListTitle defaultValue={title}>
            </ListTitle>
            </form>
            {children}
        </ListWrapper>
    )
}

export default List;