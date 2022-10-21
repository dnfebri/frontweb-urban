import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { rp99kSelector } from '../../features/rp99kSlice';
import Dashboard from '../components/Dashboard'

function Rp99kDetail() {
  const navigate  = useNavigate();
  const {id} = useParams();
  const data = useSelector((state) => rp99kSelector.selectById(state, id));
  const { clubs } = useSelector(
    (state) => state.rp99ks
  );
  if (!data) navigate('/events/99k');
  if (data) {const dateJoin = new Date(data.created_at);}
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <Dashboard>
      <div className="mx-4 mb-3">
        <button onClick={() => navigate(-1)} className="py-0.5 px-4 bg-neutral-300 hover:bg-neutral-400 text-black/70 font-bold rounded-lg">{`<- Back`}</button>
      </div>
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-neutral-900 shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 text-xl">Rp99K Detail</h2>
          <p className="font-black">{data ? data.order_id : ''}</p>
        </header>
        <div className="py-3 px-2">
          <div className="text-right mb-2 px-2">
            <p>Register : {data ? `${dateJoin.getDate()} - ${months[dateJoin.getMonth()-1]} - ${dateJoin.getFullYear()}` : ''}</p>
          </div>
          <table className="table-auto min-w-full">
            <tbody>
              <tr>
                <td className="p-2">Kode</td>
                <td className="p-2 font-bold">: {data ? data.kode : ''}</td>
              </tr>
              <tr>
                <td className="p-2">Nama</td>
                <td className="p-2">: {data ? data.nama : ''}</td>
              </tr>
              <tr>
                <td className="p-2">Nomor</td>
                <td className="p-2">: {data ? data.nomor : ''}</td>
              </tr>
              <tr>
                <td className="p-2">Email</td>
                <td className="p-2">: {data ? data.email : ''}</td>
              </tr>
              <tr>
                <td className="p-2">Promo Name</td>
                <td className="p-2">: {data ? data.order_name : ''}</td>
              </tr>
              <tr>
                <td className="p-2">Club</td>
                <td className="p-2">: {
                  data ? 
                    clubs.map((club) => {
                      if(club['id'] == data.club_id) return club['name'];
                    })
                  : ''}
                </td>
              </tr>
              <tr>
                <td className="p-2">Payment Type</td>
                <td className="p-2">: {data ? data.payment_type : ''}</td>
              </tr>
              <tr>
                <td className="p-2">Harga</td>
                <td className="p-2">: {data ? data.harga : ''}</td>
              </tr>
              <tr>
                <td className="p-2">Status</td>
                <td className="p-2 flex">: <p className={`mx-1 px-2 ${data ? data.status == 'settlement' || data.status == 'deny' ? 'bg-green-400' : 'bg-yellow-400' : ''}`}>{data ? data.status : ''}</p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Dashboard>
  )
}

export default Rp99kDetail