import React from 'react'
import Dashboard from './components/Dashboard'

function Inbox() {
  return (
    <Dashboard>
      {/* Dashboard actions */}
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-neutral-900 shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 text-xl">Inbox</h2>
        </header>
        <div className="py-3 px-4">
          {/* content */}
        </div>
      </div>
    </Dashboard>
  )
}

export default Inbox