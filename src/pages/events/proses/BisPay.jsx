import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { bisPaySelector, getBisPay } from '../../../features/bisPaySlice';
import Dashboard from '../../components/Dashboard'

function BisPay() {
  const dispatch = useDispatch();
  const dataBisPay = useSelector(bisPaySelector.selectAll);

  useEffect(() => {
    dispatch(getBisPay())
  },[dispatch]);

  return (
    <Dashboard>
      <div className="mx-4 mb-3">
        <Link to={`/events/back-in-shape-v2`} className="py-0.5 px-4 bg-neutral-300 hover:bg-neutral-400 text-black/70 font-bold rounded-md">{`<- Back`}</Link>
      </div>
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-neutral-900 shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200">List Proses Back In Shape V2</h2>
        </header>
        <div className="p-3">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left min-w-max">Order Id</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left min-w-max">Nama</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left min-w-max">Order Name</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center min-w-max">Gross Amount</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center min-w-max">Status Pembayaran</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center min-w-max">Influenser</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center min-w-max">Actions</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-slate-100 text-slate-900 dark:text-slate-100">
                {dataBisPay.map((row, index) => (
                  <tr key={index}>
                    <td className="py-4 px-2">
                      <div className="flex items-center">
                        <p>{row.order_id}</p>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-left">{row.nama}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-left">{row.order_name}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-left">{row.gross_amount}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className={`text-left px-2 text-black ${row.status == 'settlement' || row.status == 'deny' ? 'bg-green-400' : 'bg-yellow-400' }`}>{row.status}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-left">{row.kdRef} - {row.kdRefName}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-center">
                        <Link to={`/events/back-in-shape-v2/proses/${row.id}`} className="mx-0.5 py-1 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600">Detail</Link>
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

export default BisPay