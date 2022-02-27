import React, { useState, useEffect, useContext, createContext }  from 'react';
import Form from '../Form'
import Posts from '../Posts'
import Nav from '../Nav';

import './style.css'

function Home() {
    return (
      <div className="bg-gray-200">
          <Nav />
          <div className="hero bg-black relative">
            <div className="container mx-auto pt-24 flex flex-wrap justify-center">
              <h1 className="text-white text-7xl w-full text-center z-10">Welcome to GameSwap</h1>
              <div className="angle-bg w-full h-64 absolute bottom-0"></div>
            </div>
          </div>
          <div className="container mx-auto mt-6">
            <Posts />
          </div>
      </div>
    );
  }
  
  export default Home;