import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, userSelector } from '../../features/userSlice';
import Dashboard from '../components/Dashboard'

function User() {
  const dispatch = useDispatch();
  const users = useSelector(userSelector.selectAll)

  useEffect(() => {
    dispatch(getUsers())
  },[dispatch]);

  return (
    <Dashboard>
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">User</h2>
        </header>
        <div className="p-3">

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Role</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Employee</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-slate-100">
                {/* Row */}
                {users.map((user, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="text-slate-800">{user.email}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-left">{user.role.name ? user.role.name : ''}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-left">{user.employee ? user.employee : 'empty employee'}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        <button className="mx-0.5 py-1 px-4 rounded-md text-white bg-blue-500">Edit</button>
                        <button className="mx-0.5 py-1 px-4 rounded-md text-white bg-red-500">Hapus</button>
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

export default User