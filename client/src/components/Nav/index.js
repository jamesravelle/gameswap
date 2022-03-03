import React, { useContext, useEffect }  from 'react';
import Form from '../Form'
import Posts from '../Posts'
import {PostContext} from '../../context/PostContext'
import {useNavigate} from "react-router-dom"

import useLocalStorage from '../hooks/useLocalStorage';

import './style.css'

function Nav() {
    const [user,setUser] = useLocalStorage('user');

    const logout = () => {
        setUser({});
        localStorage.setItem('user', {});
    }

    return (
      <nav className="bg-black text-white"> 
        <div className="container mx-auto p-4 flex justify-between">
            <div className="logo text-2xl w-1/2"><a href="/">GameSwap</a></div>
            
            {/* <a href={`/profile/${user.username}`}>{user.username}</a>
            {user._id ? <a href="#" onClick={logout}>Logout</a> : <a href="/login">Login</a> }
            {!user._id && <a href="/register">Register</a>}
            {user._id && <a href="/portal">Portal</a>} */}
            <div className="main-menu">
            <a href="/">Home</a>
            {(() => {
              if(user){
                return(
                  <>
                    {user._id ? <a href="/" onClick={logout}>Logout</a> : <a href="/login">Login</a> }
                    {!user._id && <a href="/register">Register</a>}
                    {user._id && <a href="/portal">Portal</a>}
                  </>
                )
              }else{
                return(
                  <>
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                  </>
                )
              }
            })()}
            </div>
        </div>
      </nav>
    );
  }
  
  export default Nav;