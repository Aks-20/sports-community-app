import React from 'react'
import Sidebar from '../../components/SideBar'
import SalesOverviewChart from '../../components/SalesOverviewChart'

const Admin = () => {
  return (
   <>
  <div className='flex h-screen bg-gray-400 text-gray-100 overflow-hidden'>
  {/* Background overlay below navbar */}
  <div className='fixed top-16 inset-x-0 bottom-0 z-0'>
    <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
    <div className='absolute inset-0 backdrop-blur-sm' />
  </div>
    <Sidebar />
    <SalesOverviewChart />
   </div>
   </>
  )
}

export default Admin