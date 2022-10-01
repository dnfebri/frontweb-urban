import React from 'react'
import Dashboard from './components/Dashboard'

function Inbox() {
  return (
    <Dashboard>
      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <h1 className="text-4xl">Inbox</h1>
      </div>
    </Dashboard>
  )
}

export default Inbox