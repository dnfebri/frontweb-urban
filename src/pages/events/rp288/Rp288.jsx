import React, { useEffect, useState } from 'react';
import Dashboard from '../../components/Dashboard';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { BiSearchAlt } from "react-icons/bi";
import axios from 'axios';

export const Rp288 = () => {
  const [paginate, setPaginate] = useState({
    page: 0,
    pages: 0,
    rows: 0
  })
  const [getPage, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [data288, setData288] = useState([]);
  const [clubs, setClubs] = useState([]);
  const get288All = async() => {
    const response = await axios.get(`https://klik.urbanathletes.co.id/api/288?page=${getPage}&keyword=${search}`);
    const result =  response.data
    const result288 = result.data.data;
    const resultClubs = result.clubs;
    setData288(result288);
    setClubs(resultClubs);
    setPaginate({
      page: result.data.current_page,
      pages: result.data.last_page,
      rows: result.data.total
    })
  }
  
  useEffect(() => {
    get288All();
  },[]);

  const handlePageClick = ({selected}) => {
    setPage(selected + 1);
    get288All();
  }

  const searchSubmit = (e) => {
    e.preventDefault();
    setPage(0);
    get288All();
  }

  const { page, pages, rows } = paginate
  return (
    <Dashboard>
      {/* Dashboard actions */}
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-neutral-900 shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 text-xl">288 Membership</h2>
          <form className="flex items-center" onSubmit={searchSubmit}>
            <input type="text"onChange={(e) => {setSearch(e.target.value)}} placeholder='Search' className="p-0.5 focus:ring-0 border-0 border-b bg-transparent"/>
            <button type="submit" className="text-xl p-1">
              <i><BiSearchAlt/></i>
            </button>
          </form>
        </header>
        <div className="py-3 px-2">
        <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">Nama</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Nomor</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Club</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Status</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-slate-100 text-slate-900 dark:text-slate-100">
              {data288.map((row, index) => (
                  <tr key={index}>
                    <td className="py-4 px-2">
                      <div className="flex items-center">
                        <p>{row.nama}</p>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-left">{row.email}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-left">{row.nomor}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-left">
                        {clubs.map((club) => {
                          if(club['id'] == row.club_id) return club['name'];
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className={`text-black text-center ${row.status == 'settlement' || row.status == 'deny' ? 'bg-green-400' : 'bg-yellow-400' }`}>{row.status}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-center">
                        <Link to={`/events/99k/${row.id}`} className="mx-0.5 py-1 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600">Detail</Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="p-2 ">
        <p className="text-sm">
          Total Rows: {rows} Page: {rows ? page : 0} of {pages}
        </p>
        <div className="p-2 my-3 grid justify-center" key={rows}>
          <ReactPaginate
            previousLabel="< Prev"
            breakLabel="..."
            nextLabel="Next >"
            pageCount={pages}
            onPageChange={handlePageClick}
            containerClassName='paginate-container'
            pageLinkClassName='paginate-page-button'
            previousLinkClassName='paginate-page-button'
            nextLinkClassName='paginate-page-button'
            activeLinkClassName='paginate-activeLink'
            disabledLinkClassName='paginate-disabledLink'
          />
        </div>
      </div>
    </Dashboard>
  )
}

// export default Rp288