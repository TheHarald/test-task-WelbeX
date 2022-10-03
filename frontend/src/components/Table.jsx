import React from 'react';
import ArrowButton from './ArrowButton';
import IconButton from './ArrowButton';
import { arrowUp } from './icons';
import TableRow from './TableRow';

function Table({order, orderBy, setOrder , setOrderBy , data}) {
    
  let row = ['name', 'count', 'distance', 'date'];
    function handleClick(orderColumn){
      
      if(order === 'asc'){
        setOrder('desc');
      }else{
        setOrder('asc');
      }
      setOrderBy(orderColumn)
    }

    return (
        <table className="w-1/2 text-sm text-left text-gray-50">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300" >
            <tr>
              {row.map((item, index) => (
                <th key={index} className="py-3 px-6">
                  <div className='flex flex-row gap-x-6' >
                    <p>{item}</p>
                    <ArrowButton onClick={() => handleClick(item)} order={order} />
                  </div>
                  
                </th>
              ))}
            </tr>
          </thead>
        <tbody className="bg-gray-100 divide-y">
          {data.map((item) => (
            <TableRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    );
}

export default Table;