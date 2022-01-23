import React from 'react';
import styled from 'styled-components';


const CardItem = styled.div`
    background-color: #fff;
    min-width: 220px;
    min-height: 50px;
    box-shadow: 0 1px 0 #091e4240;
    cursor: pointer;
    padding: 3px 0px 0px 10px;
    margin-bottom: 10px;`


interface CardProps {
    title : string,
    key : number
}
const Card = ({title} : CardProps) => {
    return (
        <CardItem className='card'>
            <samp>{title}</samp>
        </CardItem>
    )
}

export default Card;