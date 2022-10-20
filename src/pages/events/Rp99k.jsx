import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import {getRp99k, rp99kSelector} from '../../features/rp99kSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { BiSearchAlt } from "react-icons/bi";

function Rp99k() {
  const dispatch = useDispatch();
  const dataRp99k = useSelector(rp99kSelector.selectAll);
  const { page, pages, rows, clubs } = useSelector(
    (state) => state.rp99ks
  );
  const [getPage, setPage] = useState(0);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    dispatch(getRp99k({page: getPage, search}))
  },[dispatch]);

  const handlePageClick = async({selected}) => {
    await dispatch(getRp99k({page: selected + 1, search}));
  }

  const searchSubmit = async(e) => {
    e.preventDefault();
    await dispatch(getRp99k({page: getPage, search}))
  }

  return (
    <Dashboard>
      {/* Dashboard actions */}
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-neutral-900 shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 text-xl">Rp99K</h2>
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
              {dataRp99k.map((row, index) => (
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
                      <div className="text-left">{row.status}</div>
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
        <div className="p-2 my-3 grid justify-center">
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

export default Rp99k