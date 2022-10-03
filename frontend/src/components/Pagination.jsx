import React from 'react';
import PaginationButton from './PaginationButton';

function Pagination({total, limit, page, onChange}) {

    const pagesCount = Math.ceil(total / limit);

    return (
        <section className="flex flex-row gap-x-2">
            {Array(pagesCount).fill(1).map((_, index) => (
                <PaginationButton 
                    key={index} 
                    page={index + 1} 
                    curentPage={page} 
                    onClick={() => onChange(index + 1)} 
                />
            ))}
        </section>
    );
}

export default Pagination;