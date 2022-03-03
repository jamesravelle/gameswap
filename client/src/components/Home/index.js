import React, { useState, useEffect }  from 'react';
import Form from '../Form'
import Posts from '../Posts'
import Nav from '../Nav';

import './style.css'

function Home() {

    const [search, setSearch] = useState('');

    const searchGames = (e) => {
      e.preventDefault();
      setSearch(e.target[0].value)
    }

    const clearSearch = () => {
      setSearch('');
    }

    return (
      <div className="bg-gray-200">
          
          <div className="hero bg-black relative">
            <div className="container mx-auto pt-24 flex flex-wrap justify-center">
              <h1 className="text-white text-7xl w-full text-center z-10 mb-4">Welcome to GameSwap</h1>
              <form className="w-2/3 md:w-1/2 mx-auto py-4 flex flex-wrap justify-center" onSubmit={searchGames}>
                <input className="w-full md:w-2/3 border-2 border-black  p-2" type="text" />
                <input className="w-full md:w-1/4 md:ml-6 bg-blue-500 text-white font-bold cursor-pointer p-2" type="submit" value="Search" />
              </form>
              <div onClick={()=>clearSearch()}className="w-full text-center ml-6 text-blue-500 z-50 relative font-bold cursor-pointer">Reset Search</div>
              {/* <div className="angle-bg w-full h-64 absolute bottom-0"></div> */}
            </div>
          </div>
          <div className="container mx-auto mt-6">
            <Posts search={search} />
          </div>
      </div>
    );
  }
  
  export default Home;