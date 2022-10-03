import React from 'react';

function Filter({columns, filterOptions , setFilterBy, filterBy, filterValue, setFilterValue, getData}) {


    const [filterOption, setFilterOption] = React.useState('>');
    const [value, setValue] = React.useState('');
    const [isError, setIsError] = React.useState(false);


    function handleChangeInput(e){
        setValue(e.target.value);
        setIsError(false);
        let temp = ''
        switch(filterOption){
            case '>':
                temp = `gt:${e.target.value}`
                console.log('gt');
                break;
            case '<':
                temp = `lt:${e.target.value}`;
                console.log('lt');
                break;
            case '=':
                temp = `eq:${e.target.value}`;
                console.log('eq');
                break;
            case 'содержит':
                temp = `like:${e.target.value}`;
                console.log('like');
                break;
        }
        setFilterValue(temp);
    }

    function handleFilter(){
        if(value === ''){
            setIsError(true);
            return;
        }else{
            let filter = {
                filter_by: filterBy,
                filter_value: filterValue
            }
            getData(filter);
        }
        
    }
    return (
        <section className='flex flex-col gap-y-2'>
             <section className="flex flex-row gap-x-2 items-center">
            <p>Отфильтровать по:</p>
            <select 
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)} 
                className='px-4 py-2 rounded-md border-2 border-gray-400'>
                {columns.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
            <select 
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                className='px-4 py-2 rounded-md border-2 border-gray-400' >
                {filterOptions.map((item, index) => (   
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
            <input 
                value={value} 
                onChange={handleChangeInput} 
                className='px-4 py-2 rounded-md border-2 border-gray-400' 
                placeholder='Введите значение' />
            <button onClick={handleFilter} className='px-4 py-2 rounded-md border-2 border-gray-400 hover:bg-slate-200'>Применить</button>
        </section>
        {isError && <p className='text-red-700 '>Поля не должны быть пустыми</p>}   
        </section>
       

    );
}

export default Filter;