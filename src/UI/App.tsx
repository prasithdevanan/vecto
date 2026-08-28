import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './component/sidebar/sideBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
      <div className="flex h-screen w-full">
        <SideBar />
        <Outlet />
        <ToastContainer />
      </div>

    </>
  )
}

export default App
