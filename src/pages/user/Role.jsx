import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { deleteRoles, getRoles, roleSelector } from '../../features/roleSlice';
import Dashboard from '../components/Dashboard'

function Role({children} = '') {
  const dispatch = useDispatch();
  const roles = useSelector(roleSelector.selectAll);

  useEffect(() => {
    dispatch(getRoles())
  },[dispatch]);
  const {pathname} = useLocation();

  return (
    <Dashboard>
      <div className="flex flex-col-reverse md:flex-row gap-6">
        <div className="w-full md:max-w-md bg-white shadow-lg rounded-md border border-slate-200">
          <header className="px-5 py-3 h-14 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-semibold text-slate-800">Role</h2>
            <Link to="/role/add" className={`mx-0.5 py-1 px-4 rounded-md text-white bg-green-500 ${pathname.includes('role/add') ? 'hidden' : ''}`}>Add</Link>
          </header>
          <div className="p-3">

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">No</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold">Name</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold">Action</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm font-medium divide-y divide-slate-100">
                  {/* Row */}
                  {roles.map((role, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <div className="text-left">{index + 1}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-left">{role.name}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">
                          <Link to={`/role/${role.id}`}><button className="mx-0.5 py-0.5 px-4 rounded-md text-white bg-blue-500">Edit</button></Link>
                          <button onClick={() => dispatch(deleteRoles(role.id))} className="mx-0.5 py-0.5 px-4 rounded-md text-white bg-red-500">Hapus</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>
        <div className="w-full md:max-w-md">
          {children}
        </div>
      </div>
    </Dashboard>
  )
}

export default Role