import React, { useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import {getBackInShapes, backInShapeSelector} from '../../features/backInShapeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function BackInShapev2() {
  
  const dispatch = useDispatch();
  const dataBis = useSelector(backInShapeSelector.selectAll);
  // console.log(dataBis);

  useEffect(() => {
    dispatch(getBackInShapes())
  },[dispatch]);

  return (
    <Dashboard>
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-neutral-900 shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200">Back In Shape V2</h2>
          <Link to={`/events/back-in-shape-v2/proses`} className="mx-0.5 py-1 px-4 rounded-md text-black font-black bg-green-500 hover:bg-green-600">{'List Proses ->'}</Link>
        </header>
        <div className="p-3">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">Kode</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Nama</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2 min-w-max">
                    <div className="font-semibold text-center min-w-max">Promo Name</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Influenser</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-slate-100 text-slate-900 dark:text-slate-100">
                {dataBis.map((row, index) => (
                  <tr key={index}>
                    <td className="py-4 px-2">
                      <div className="flex items-center">
                        <p>{row.kode}</p>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-left">{row.nama}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-left">{row.email}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-left">{row.promoName}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-left">{row.kdRef} - {row.kdRefInfluens}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-center">
                        <Link to={`/events/back-in-shape-v2/${row.id}`} className="mx-0.5 py-1 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600">Detail</Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default BackInShapev2