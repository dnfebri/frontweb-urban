import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { deleteFotoKelas, fotoKelasSelector, getFotoKelases, reset } from '../../../features/fotoKelasSlice';
import Dashboard from '../../components/Dashboard'

function FotoKelas() {
  const dispatch = useDispatch();
  const fotoKelas = useSelector(fotoKelasSelector.selectAll);
  const { isError, isSuccess, isLoading, massage } = useSelector(
    (state) => state.fotoKelases
  );
  const MySwal = withReactContent(Swal);
  
  useEffect(() => {
    // dispatch(getFotoKelases());
    getFotoKelases();
    if(isSuccess) {
      MySwal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${massage}`,
        showConfirmButton: false,
        timer: 3000
      })
      dispatch(reset());
    }
    if(isError) {
      MySwal.fire({
        position: 'top-end',
        icon: 'error',
        title: `${massage}`,
        showConfirmButton: false,
        timer: 3000
      })
      dispatch(reset());
    }
  },[dispatch, getFotoKelases, isSuccess, isError, massage]);

  const deleteClass = async(classId) => {
    const del = confirm('apakah anda yakin ?');
    if (del) {
      await dispatch(deleteFotoKelas(classId));
    }
  }

  return (
    <Dashboard>
      {/* Dashboard actions */}
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-neutral-900 shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 text-xl">Index Foto Kelas</h2>
          <div className="mx-4 mb-2">
            <Link to={'/uaweb/foto-kelas/add'} className="px-6 py-0.5 rounded-md bg-green-500 hover:bg-green-600 text-white">Add new</Link>
          </div>
        </header>
        <div className="py-3 px-2">
          <div className="overflow-x-auto px-2">
            <table className="table-auto w-full">
              <thead className="text-xs uppercase text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">No</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Image</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Name</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Club</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-slate-100 text-slate-900 dark:text-slate-100">
                {fotoKelas.map((row, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <div className="text-left">{index + 1}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-left">
                        <img src={row.url} alt={row.image} className="max-h-20" />
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-left">{row.name}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-left">{row.clubId}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        <Link to={`/uaweb/foto-kelas/${row.id}`}><button className="m-0.5 py-0.5 px-4 rounded-md text-white bg-blue-500">Edit</button></Link>
                        <button onClick={() => deleteClass(row.id)} className="m-0.5 py-0.5 px-4 rounded-md text-white bg-red-500">Hapus</button>
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

export default FotoKelas