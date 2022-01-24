import React, { useEffect } from 'react';


const useClickOutside = (ref : any, callback : any) => {

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
    
    const handleClick = (e : any) => {
        if( ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    }
};

export default useClickOutside;