import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import TemplateDashboard from '../pages/TemplateDashboard';

import Index from '../pages/Index';
import List from '../pages/List';
import Inbox from '../pages/Inbox';
import Role from '../pages/user/Role';
import RoleAdd from '../pages/user/RoleAdd';
import RoleEdit from '../pages/user/RoleEdit';
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
        <Route path="/template" element={<TemplateDashboard />} />
        <Route path="/" element={<Index />} />
        <Route path="/list" element={<List />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/role" >
          <Route index element={<Role />} />
          <Route path='add' element={<RoleAdd />} />
          <Route path=':id' element={<RoleEdit />} />
        </Route>
        {/* <Route path="/role/edit" element={<RoleEdit />} /> */}
      </Routes>
    </>
  );
}

export default Router