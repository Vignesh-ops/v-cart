import { createContext, useState, useEffect } from "react";
import useAxiaosFetch from '../hooks/useAxiaosFetch'
import { useNavigate } from "react-router-dom";
import api from '../api/posts'
import Register from "../AuthPage/Register";
import Login from "../AuthPage/Login";

import format from "date-fns/format";

const DataContext = createContext({});
const URL = window.location.hostname === "localhost"
  ? "http://localhost:8080"
  : "https://server-production-33bb.up.railway.app"

const DataProvider = ({ children }) => {
  const navigate = useNavigate()
  // const { data, isloading, fetchError } = useAxiaosFetch(`${URL}/users`);
  let loggeduid = '';


  const logincheck = async () => {
    try {
      const islogged = await api.get(`${URL}/`);
      console.log("logged successful!",islogged);
      if (islogged) {
        navigate("/");
      } else {
      }
    } catch (error) {
      console.log("Please login")
      navigate("/login");
    }
  }

  useEffect(() => 
    {
    logincheck()
  }, [])

  const handleRegister = async (name, email, password) => {
    try {
      await api.post(`${URL}/register`, { username: name, email, password });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert("Registration failed!");
    }
  };



  const handleLogin = async (email, password) => {
    try {
      // console.log("hiii11====>", email, 'pas======>', password)
      let islogin = await api.post(`${URL}/login`, { email, password });
      if (islogin.status === 200) {
        loggeduid = islogin.data.userid;
        localStorage.setItem("loggeduid", loggeduid);
      }


      // alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.log("Login failed!", error);
    }
  };

  const logout = async () => {
    try {
      await api.post(`${URL}/logout`)
      navigate("/login");
    } catch (err) {
      console.log(err)
    }

  }


  return (
    // data, isloading, fetchError,
    <DataContext.Provider value={{ handleRegister, handleLogin, logout, URL, loggeduid }} >
      {children}
    </DataContext.Provider>
  )
}
export { DataProvider };
export default DataContext;