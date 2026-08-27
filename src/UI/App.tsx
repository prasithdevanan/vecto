import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './component/sidebar/sideBar';

function App() {


  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <Outlet />
      </div>

    </>
  )
}

export default App
