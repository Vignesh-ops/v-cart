import { Outlet } from "react-router-dom";
import React from 'react'
import Header from './Header'
import SearchBar from "./SearchBar";
import ChatRoom from "./Chat";
import Allusers from "./Allusers";
import { useContext } from 'react'
import DataContext from "../context/DataContext";


const Layout = () => {

  
  return (
    <>
    <Header/>
    {/* <SearchBar /> */}
    <Allusers />
 
    <main className="App">
      <Outlet />
    </main>
    </>
  )
}

export default Layout