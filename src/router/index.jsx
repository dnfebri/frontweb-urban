import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Index from '../pages/Index';
import List from '../pages/List';
import Inbox from '../pages/Inbox';
import Role from '../pages/user/Role';
import User from '../pages/user/Index';
import Login from '../pages/components/Login';

function Router() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/list" element={<List />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/role" element={<Role />} />
      </Routes>
    </>
  );
}

export default Router