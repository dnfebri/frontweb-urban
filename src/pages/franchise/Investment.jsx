import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Dashboard from '../components/Dashboard'

export const Investment = () => {
  const [invest, setInvest] = useState([])

  const getInvestmentAll = async () => {
    const respont = await axios.get(process.env.API_URL_APP + 'investment');
    const result = respont.data;
    setInvest(result);
  }

  useEffect(() => {
    getInvestmentAll()
  },[])

  return (
    <Dashboard>
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-neutral-900 shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 text-xl">Invesment</h2>
        </header>
        <div className="py-3 px-2">
        <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">No</div>
                  </th>
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
                    <div className="font-semibold text-left">Nominal</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-slate-100 text-slate-900 dark:text-slate-100">
                {invest.map((row, index) => (
                  <tr key={index}>
                    <td className="py-4 px-2">
                      <div className="text-left">{index + 1}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center">
                        <p>{row.name}</p>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-left">{row.email}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-left">{row.phone}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-left">{row.nominal}</div>
                    </td>
                    {/* <td className="py-4 px-2">
                      <div className="text-center">
                        <Link to={`/events/99k/${row.id}`} className="mx-0.5 py-1 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600">Detail</Link>
                      </div>
                    </td> */}
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
