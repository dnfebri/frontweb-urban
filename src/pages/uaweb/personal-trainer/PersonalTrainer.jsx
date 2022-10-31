import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePersonalTrainer, getPersonalTrainers, personalTrainerSelector, reset } from '../../../features/personalTrainerSlice';
import Dashboard from '../../components/Dashboard'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function PersonalTrainer() {
  const dispatch = useDispatch();
  const personalTrainer = useSelector(personalTrainerSelector.selectAll);
  const { errorGetData, isError, isSuccess, isLoading, massage } = useSelector(
    (state) => state.personalTrainers
  );
  const MySwal = withReactContent(Swal);
  
  useEffect(() => {
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
        timer: 2000
      })
      dispatch(reset());
    }
  },[dispatch, isSuccess, isError, massage]);
  
  useEffect(() => {
    dispatch(getPersonalTrainers());
  }, [dispatch]);

  const deletePt = async(ptId) => {
    const del = confirm('apakah anda yakin ?');
    if (del) {
      await dispatch(deletePersonalTrainer(ptId));
    }
  }


  return (
    <Dashboard>
      {/* Dashboard actions */}
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-neutral-900 shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 text-xl">Personal Trainer</h2>
          <div className="mx-4 mb-2">
            <Link to={'/uaweb/personal-trainer/add'} className="px-6 py-0.5 rounded-md bg-green-500 hover:bg-green-600 text-white">Add new</Link>
          </div>
        </header>
        <div className="py-3">
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
                {personalTrainer.map((pt, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <div className="text-left">{index + 1}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-left">
                        <img src={pt.url} alt={pt.image} className="max-h-20" />
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-left">{pt.name}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-left">{pt.clubId}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        <Link to={`/uaweb/personal-trainer/${pt.id}`}><button className="m-0.5 py-0.5 px-4 rounded-md text-white bg-blue-500">Edit</button></Link>
                        <button onClick={() => deletePt(pt.id)} className="m-0.5 py-0.5 px-4 rounded-md text-white bg-red-500">Hapus</button>
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

export default PersonalTrainer