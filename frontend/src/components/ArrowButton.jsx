import React from 'react';
import { arrowDown, arrowUp } from './icons';

function ArrowButton({ onClick, order }) {

    let icon = null;

    if(order === 'desc'){
        icon = arrowUp
    }

    if(order === 'asc'){
        icon = arrowDown
    }

    return (
        <button onClick={onClick} className=" hover:bg-slate-200 rounded-sm">
            {icon}
        </button>
    );
}

export default ArrowButton;