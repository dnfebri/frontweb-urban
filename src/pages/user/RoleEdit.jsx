import React, { useEffect, useState } from 'react'
import Role from './Role'
import { useDispatch, useSelector } from 'react-redux';
import { getRoles, roleSelector, updateRoles } from '../../features/roleSlice';
import { useParams, useNavigate } from 'react-router-dom';
import InputModel2 from '../components/InputModel2';

function RoleEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const role = useSelector((state) => roleSelector.selectById(state, id));

  useEffect(() => {
    dispatch(getRoles());
  },[dispatch]);

  useEffect(() => {
    if(role){
      setInputs(values => ({...values, ['name']: role.name}))
    }
  },[role]);

  let name = inputs.name;
  const hendleUpdate = async(e) => {
    e.preventDefault();
    await dispatch(updateRoles({id, name}));
    navigate('/role');
  }

  return (
    <Role>
      <div className="bg-white shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Edit</h2>
        </header>
        <div className="px-3">
          <div className="overflow-x-auto">
            <form onSubmit={hendleUpdate}>
              <InputModel2 label="Role" type="text" name="name" id="role" value={name ? name : true} onChange={handleChange} />
              <button type='submit' className="mx-0.5 my-4 py-1 px-4 rounded-md text-white bg-green-500">Update</button>
            </form>
          </div>
        </div>
      </div>
    </Role>
  )
}

export default RoleEdit