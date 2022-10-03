import React from 'react';

function TableRow(props) {
    return (
        <tr className="bg-gray-100">
        <td className="py-3 px-6 text-slate-900" >{props.item.name}</td>
        <td className="py-3 px-6 text-slate-900" >{props.item.count}</td>
        <td className="py-3 px-6 text-slate-900" >{props.item.distance}</td>
        <td className="py-3 px-6 text-slate-900" >{props.item.date}</td>
      </tr>
    );
}

export default TableRow;