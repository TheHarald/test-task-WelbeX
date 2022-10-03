import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Pagination from "./components/Pagination";
import Table from "./components/Table";

function App() {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);  
  const [isLoading, setIsLoading] = useState(false);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterBy, setFilterBy] = useState("name");
  const [filterValue, setFilterValue] = useState("");

  function getData(filterParams){
    setIsLoading(true);
    axios.get("http://localhost:3001/api/items",{
      params: {
        page: currentPage,
        limit: limit,
        order: order,
        sort_by: orderBy,
        ...filterParams
      }
    })
      .then(res => {
        setData(res.data.content);
        setTotal(res.data.total_results);
        setLimit(res.data.limit);
        setCurrentPage(res.data.page);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  
  useEffect(() => {
      getData()
  }, []);

  useEffect(() => {
    getData()
  }, [currentPage, order, orderBy]);

  

  return (
    <div className=" py-12 flex flex-col items-center gap-y-6">
      <h1 className="text-slate-900 text-5xl" >Test Task Table</h1>

      {
        isLoading ? <p>Loading...</p> : 
        <>
          <Filter 
            columns={['name', 'count', 'distance']}
            filterOptions={['>', '<', '=', 'содержит']}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            getData={getData}
          />
          <Table data={data} order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} />
          <Pagination total={total} limit={limit} page={currentPage} onChange={setCurrentPage}  />
        </>
      }
      
    </div>
  );
}

export default App;
