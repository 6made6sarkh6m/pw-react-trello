import React, { FC } from 'react';
import '../../styles/list.scss';

interface ListProps {
    title: string,
}
const List: FC<ListProps> = ({title, children}) => {
    return(
        <div className='list'>
            <div className='list-title'>
                <samp>{title}</samp>
            </div>
            {children}
        </div>
    )
}

export default List;