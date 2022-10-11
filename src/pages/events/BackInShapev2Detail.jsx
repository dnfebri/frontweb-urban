import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { backInShapeSelector } from '../../features/backInShapeSlice';
import Dashboard from '../components/Dashboard'

function BackInShapev2Detail() {
  const navigate  = useNavigate();
  const {id} = useParams();
  const data = useSelector((state) => backInShapeSelector.selectById(state, id));

  return (
    <Dashboard>
      <div className="mx-4 mb-3">
        <button onClick={() => navigate(-1)} className="py-0.5 px-4 bg-neutral-300 hover:bg-neutral-400 text-black rounded-lg">{`<- Back`}</button>
      </div>
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Detail Join Back In Shape V2</h2>
        </header>
        <div className="p-4 text-black">
          <table className="table-auto min-w-full">
            <tbody>
              <tr>
                <td className="p-2">Kode</td>
                <td className="p-2 font-bold">: {data.kode}</td>
              </tr>
              <tr>
                <td className="p-2">Nama</td>
                <td className="p-2">: {data.nama}</td>
              </tr>
              <tr>
                <td className="p-2">Nomor</td>
                <td className="p-2">: {data.nomor}</td>
              </tr>
              <tr>
                <td className="p-2">Email</td>
                <td className="p-2">: {data.email}</td>
              </tr>
              <tr>
                <td className="p-2">Alamat</td>
                <td className="p-2">: {data.alamat}</td>
              </tr>
              <tr>
                <td className="p-2">Influenser</td>
                <td className="p-2">: {data.kdRef} - {data.kdRefInfluens}</td>
              </tr>
              <tr>
                <td className="p-2">Event Name</td>
                <td className="p-2">: {data.promoName}</td>
              </tr>
              <tr>
                <td className="p-2">Harga</td>
                <td className="p-2">: {data.harga}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Dashboard>
  )
}

export default BackInShapev2Detail