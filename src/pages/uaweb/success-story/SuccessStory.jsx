import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Dashboard from '../../components/Dashboard'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteFotoKelas, fotoKelasSelector, getFotoKelases, reset } from '../../../features/successStorySlice';
// import { getSuccessStory, reset, successStorySelector } from '../../../features/successStorySlice';

function SuccessStory() {
  // const dispatch = useDispatch();
  const [successStory, setSuccessStory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [massage, setMassage] = useState('');
  const getSuccessStory = async() => {
    setIsLoading(true)
    try {
      const response = await axios.get( process.env.API_URL_APP + 'success_story');
      setSuccessStory(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setMassage(error.message)
      setIsLoading(false);
    }
  }
  
  const deleteStory = async(storyId) => {
    const del = confirm('apakah anda yakin ?');
    if (del) {
      try {
        const response = await axios.delete( process.env.API_URL_APP + `success_story/${storyId}`);
        setMassage(response.data.msg);
        setIsSuccess(true);
      } catch (error) {
        console.log('error', error);
        setIsError(true);
        setMassage(error.response.data.msg)
      }
    }
  }
  
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
      getSuccessStory();
      setIsSuccess(false);
    }
    if(isError) {
      MySwal.fire({
        position: 'top-end',
        icon: 'error',
        title: `${massage}`,
        showConfirmButton: false,
        timer: 3000
      })
    }
  },[isSuccess, isError, massage]);

  useEffect(() => {
    getSuccessStory();
  }, []);

  return (
    <Dashboard>
      {/* Dashboard actions */}
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-neutral-900 shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 text-xl">Success Story</h2>
          <div className="mx-4 mb-2">
            <Link to={'/uaweb/success-story/add'} className="px-6 py-0.5 rounded-md bg-green-500 hover:bg-green-600 text-white">Add new</Link>
          </div>
        </header>
        <div className="py-3 px-4">
          <div className="overflow-x-auto px-2">
            {
              isLoading ? 
              <h1>Loading....</h1> :
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
                      <div className="font-semibold text-center">Actions</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium divide-y divide-slate-100 text-slate-900 dark:text-slate-100">
                  {successStory.map((row, index) => (
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
                        <div className="text-center">{row.name}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">
                          <Link to={`/uaweb/success-story/${row.id}`}><button className="m-0.5 py-0.5 px-4 rounded-md text-white bg-blue-500">Edit</button></Link>
                          <button onClick={() => deleteStory(row.id)} className="m-0.5 py-0.5 px-4 rounded-md text-white bg-red-500">Hapus</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default SuccessStory