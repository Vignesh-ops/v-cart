import { useEffect, useState } from 'react';
import './App.css';
import Home from './Home';
import Posts from './Posts';
import About from './About';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import Postpage from './Postpage';
import Nav from './Nav';
import Header from './Header';
import Newpost from './Newpost';
import api from './api/posts';

import Editpost from './Editpost';
import Footer from './Footer';
import Login from './AuthPage/Login';
import Register from './AuthPage/Register';
import { DataProvider } from './context/DataContext';



function App() {


  return (
    <div className="App">
      <DataProvider>    
         <Header title="Share Zone" />
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/about' element={<Footer />} />

          <Route path='posts'>
            <Route index element={<Newpost />} />
            <Route path=':id' element={<Postpage />} />
            <Route path='edit/:id' element={<Editpost />} />

          </Route>
        </Routes>
        <About />

      </DataProvider>



    </div>
  );
}

export default App;
