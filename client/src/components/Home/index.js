import React, { useState, useEffect, useContext, createContext }  from 'react';
import Form from '../Form'
import Posts from '../Posts'
import Nav from '../Nav';

function Home() {
    return (
      <div className="bg-gray-200">
          <Nav />
          <div className="container mx-auto mt-6">
            <Posts />
          </div>
      </div>
    );
  }
  
  export default Home;