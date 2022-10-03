import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice'; 

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Cookies from 'js-cookie';

function Dashboard({children}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));
  console.log('Dashboard', useSelector((state => state.auth))); /// INI di akses terus
  
  const [token] = useState(Cookies.get('token'));
  
  useEffect(()=>{
    // console.log(token);
    if(!token){
      navigate("/login");
    } else {
      dispatch(getMe());
    }
  }, [dispatch, token]);

  useEffect(()=>{
    if(isError){
      navigate("/login");
    }
  }, [isError, navigate]);
// console.log(dispatch(getMe()));

  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  )
}

export default Dashboard