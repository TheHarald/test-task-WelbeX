import React from 'react';

function PaginationButton({page, curentPage, onClick}) {
    
    return (
        <button onClick={onClick} className={`py-2 px-4 rounded-full ${page === curentPage ? 'bg-blue-400' : 'bg-blue-100'} hover:bg-blue-200`}>
            <span className="text-sm font-bold text-gray-500">{page}</span>
        </button>
    );
}

export default PaginationButton;