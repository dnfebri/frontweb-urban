import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { LoginUser, reset } from '../../features/authSlice';
import { update } from '../../features/authUserSlice';

import LogoUA from "../../logo_ua.png";
import InputModel1 from './InputModel1';
import axios from 'axios';

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isError, isSuccess, isLoading, massage } = useSelector(
    (state) => state.auth
  );
  
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState(""); /// \/pakai yg bawah untuk mendistruk langsung secara masal
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  useEffect(() => {
    if (token && isSuccess) {
      const tokenDecode = token ? jwt_decode(token) : '';
      const uuid = tokenDecode ? tokenDecode.uuid : '';
      const name = tokenDecode ? tokenDecode.name : '';
      const email = tokenDecode ? tokenDecode.email : '';
      const roleId = tokenDecode ? tokenDecode.roleId : '';
      const role = tokenDecode ? tokenDecode.role : '';
      dispatch(update({uuid, name, email, roleId, role}));
      Cookies.set('token', token);
      axios.defaults.headers.token = token
      navigate("/");
      dispatch(reset());
    }
  },[token, isSuccess, dispatch, navigate]);

  function Auth(e) {
    e.preventDefault();
    // dispatch(LoginUser({email, password}));
    dispatch(LoginUser(inputs));
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-200">
      <div className="bg-white p-4 rounded-lg">
        <img src={LogoUA} alt="Logo" className="invert w-20 mx-auto" />
        <form onSubmit={Auth}>
          {isError && <p className="text-center mt-2">{massage}</p>}
          <div className="mt-4 px-4 pb-4 pt-2 border-t-2 border-neutral-400">
            {/* <InputModel1 label="Email" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputModel1 label="Password" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
            <InputModel1 label="Email" type="text" name="email" id="email" value={inputs.email || ''} onChange={handleChange} />
            <InputModel1 label="Password" type="password" name="password" id="password" value={inputs.password || ''} onChange={handleChange} />
            <div className="mt-4 py-2">
              <button type="submit" className="py-1 w-full text-center bg-green-600 text-black font-bold rounded-lg">
                {isLoading ? 'Loading...' : "Login"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login