import React from 'react';
import '../../styles/card.scss';
interface CardProps {
    title : string,
    key : number
}
const Card = ({title} : CardProps) => {
    return (
        <div className='card'>
            <samp>{title}</samp>
        </div>
    )
}

export default Card;