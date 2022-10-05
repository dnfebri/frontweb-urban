import React, { useState } from 'react';
import Role from './Role';
import { useDispatch } from 'react-redux';
import { saveRoles } from '../../features/roleSlice';
import InputModel2 from '../components/InputModel2';
import { useNavigate } from 'react-router-dom';

function RoleAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const createRole = async(e) => {
    e.preventDefault();
    await dispatch(saveRoles(inputs));
    navigate('/role');
    setInputs(values => ({...values, ['name']: ''}));
  }

  return (
    <Role>
      <div className="bg-white shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Add</h2>
        </header>
        <div className="px-3">
          <div className="overflow-x-auto">
            <form onSubmit={createRole}>
              <InputModel2 label="Role" type="text" name="name" id="role" value={inputs.name || ''} onChange={handleChange} />
              <button type='submit' className="mx-0.5 my-4 py-1 px-4 rounded-md text-white bg-green-500">Save</button>
            </form>
          </div>
        </div>
      </div>
    </Role>
  )
}

export default RoleAdd