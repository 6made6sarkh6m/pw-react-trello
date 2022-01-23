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

const ListTitle = styled.div`
    font-size: 1rem;
    font-weight: 500;`


interface ListProps {
    title: string,
    key: number
}
const List: FC<ListProps> = ({title, children}) => {
    return(
        <ListWrapper>
            <ListTitle>
                <samp>{title}</samp>
            </ListTitle>
            {children}
        </ListWrapper>
    )
}

export default List;