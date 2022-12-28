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
import BackInShapev2 from '../pages/events/BackInShapev2';
import BackInShapev2Detail from '../pages/events/BackInShapev2Detail';
import BisPay from '../pages/events/proses/BisPay';
import BisPayDetail from '../pages/events/proses/BisPayDetail';
import {Rp288} from '../pages/events/rp288';
import PersonalTrainer from '../pages/uaweb/personal-trainer/PersonalTrainer';
import PersonalTrainerAdd from '../pages/uaweb/personal-trainer/PersonalTrainerAdd';
import PersonalTrainerEdit from '../pages/uaweb/personal-trainer/PersonalTrainerEdit';
import Rp99k from '../pages/events/Rp99k';
import Rp99kDetail from '../pages/events/Rp99kDetail';
import FotoKelas from '../pages/uaweb/foto-kelas/FotoKelas';
import FotoKelasAdd from '../pages/uaweb/foto-kelas/FotoKelasAdd';
import FotoKelasEdit from '../pages/uaweb/foto-kelas/FotoKelasEdit';
import SuccessStory from '../pages/uaweb/success-story/SuccessStory';
import SuccessStoryAdd from '../pages/uaweb/success-story/SuccessStoryAdd';
import SuccessStoryEdit from '../pages/uaweb/success-story/SuccessStoryEdit';
import { Investment } from '../pages/franchise';

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

        <Route path="/events" >
          <Route index element={<Rp99k />} />
          <Route path="back-in-shape-v2" >
            <Route index element={<BackInShapev2 />} />
            <Route path=':id' element={<BackInShapev2Detail />} />
            <Route path='proses' element={<BisPay />} />
            <Route path='proses/:id' element={<BisPayDetail />} />
          </Route>
          <Route path="99k" >
            <Route index element={<Rp99k />} />
            <Route path=':id' element={<Rp99kDetail />} />
          </Route>
          <Route path="288" >
            <Route index element={<Rp288 />} />
            {/* <Route path=':id' element={<Rp99kDetail />} /> */}
          </Route>
        </Route>

        <Route path="/uaweb" >
          <Route path="personal-trainer" >
            <Route index element={<PersonalTrainer />} />
            <Route path='add' element={<PersonalTrainerAdd />} />
            <Route path=':id' element={<PersonalTrainerEdit />} />
          </Route>
          <Route path="foto-kelas" >
            <Route index element={<FotoKelas />} />
            <Route path='add' element={<FotoKelasAdd />} />
            <Route path=':id' element={<FotoKelasEdit />} />
          </Route>
          <Route path="success-story" >
            <Route index element={<SuccessStory />} />
            <Route path='add' element={<SuccessStoryAdd />} />
            <Route path=':id' element={<SuccessStoryEdit />} />
          </Route>
        </Route>

        <Route path="/franchise" >
          <Route index element={<Investment />} />
          {/* <Route path="investment" >
            <Route path='add' element={<PersonalTrainerAdd />} />
            <Route path=':id' element={<PersonalTrainerEdit />} />
          </Route> */}
        </Route>
        {/* <Route path="/role/edit" element={<RoleEdit />} /> */}
      </Routes>
    </>
  );
}

export default Router