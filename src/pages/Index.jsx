import React, { useEffect, useState } from 'react';

import Dashboard from './components/Dashboard'
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import Cookies from 'js-cookie';

function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth.authState));
  // console.log('Dashboard', useSelector((state => state.auth))); /// INI di akses terus
  
  const [token] = useState(Cookies.get('token'));
  
  useEffect(()=>{
    if(!token){
      navigate("/login");
    } else {
      dispatch(getMe());
    }
  }, [dispatch, token]);

  useEffect(()=>{
    console.log('effec dasboard 2', isError);
    if(isError){
      navigate("/login");
    }
  }, [isError, navigate]);

  return (
    <Dashboard>
      {/* Welcome banner */}
      <WelcomeBanner />

      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">

        {/* Left: Avatars */}
        <DashboardAvatars />

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Filter button */}
          <FilterButton />
          {/* Datepicker built with flatpickr */}
          <Datepicker />
          {/* Add view button */}
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
              <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="hidden xs:block ml-2">Add view</span>
          </button>                
        </div>

      </div>
    </Dashboard>
  )
}

export default Index