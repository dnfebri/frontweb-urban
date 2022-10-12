import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { bisPaySelector } from '../../../features/bisPaySlice';
import Dashboard from '../../components/Dashboard';

function BisPayDetail() {
  const navigate  = useNavigate();
  const {id} = useParams();
  const data = useSelector((state) => bisPaySelector.selectById(state, id));
  console.log(data);

  return (
    <Dashboard>
      <div className="mx-4 mb-3">
        <button onClick={() => navigate(-1)} className="py-0.5 px-4 bg-neutral-300 hover:bg-neutral-400 text-black/70 font-bold rounded-lg">{`<- Back`}</button>
      </div>
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Detail Pay Join Back In Shape V2</h2>
        </header>
        <div className="p-4 text-black">
          <table className="table-auto min-w-full">
            <tbody>
              <tr>
                <td className="p-2">Order Id</td>
                <td className="p-2 font-bold">: {data.order_id}</td>
              </tr>
              <tr>
                <td className="p-2">Nama</td>
                <td className="p-2">: {data.nama}</td>
              </tr>
              <tr>
                <td className="p-2">Order Name</td>
                <td className="p-2">: {data.order_name}</td>
              </tr>
              <tr>
                <td className="p-2">Email</td>
                <td className="p-2">: {data.email}</td>
              </tr>
              <tr>
                <td className="p-2">Influenser</td>
                <td className="p-2">: {data.kdRef} - {data.kdRefName}</td>
              </tr>
              <tr>
                <td className="p-2">Gross</td>
                <td className="p-2">: {data.gross_amount}</td>
              </tr>
              <tr>
                <td className="p-2">Status</td>
                <td className="p-2 flex">: <p className={`mx-2 px-2 rounded-md max-w-min ${data.status == 'settlement' || data.status == 'deny' ? 'bg-green-400' : 'bg-yellow-400' }`}>{data.status}</p></td>
              </tr>
              <tr>
                <td className="p-2">Payment Type</td>
                <td className="p-2">: {data.payment_type}</td>
              </tr>
              <tr>
                <td className="p-2">Transaction id</td>
                <td className="p-2">: {data.transaction_id}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Dashboard>
  )
}

export default BisPayDetail