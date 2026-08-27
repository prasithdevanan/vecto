import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './component/sidebar/sideBar';

function App() {


  return (
    <>
      <Outlet />
      <SideBar />
    </>
  )
}

export default App
