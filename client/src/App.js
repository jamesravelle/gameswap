import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect, useContext, createContext }  from 'react';
import Portal from './components/Portal'
import { render } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from './components/Home'
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Nav from './components/Nav';
import Profile from './components/Profile/Profile'

import {PostProvider} from './context/PostContext.js'
import {PostContext} from './context/PostContext'

import useLocalStorage from './components/hooks/useLocalStorage';
// todo:
// X configure Context or useReducer
// X configure Routing 
// show posts for user only
// show show all posts on homepage

// const Context = createContext('Default Value');

function App() {
  const value = 'My Context Value';
  const [posts, setPosts] = useState(null);

  const [user,setUser] = useLocalStorage('user');

  console.log("APP", user);

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/portal" element={<Portal />}/>
          <Route exact path="/profile/:id" element={<Profile />}/>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App;
