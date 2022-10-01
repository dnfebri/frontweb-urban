import React from 'react'
import Dashboard from './components/Dashboard'
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';

function List() {
  return (
    <Dashboard>
      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <h1 className="text-4xl">List</h1>
      </div>
    </Dashboard>
  )
}

export default List