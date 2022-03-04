import React from 'react';

import './style.css'

function Hero({clearSearch, searchGames}) {

    return (
          <div className="hero bg-black relative px-4">
            <div className="container mx-auto pt-20 md:pt-24 flex flex-col justify-center">
              <h1 className="text-white text-5xl lg:text-7xl w-full text-center z-10 mb-4">GameSwap</h1>
              <p className="w-full text-white text-center text-xl font-bold py-4 lg:w-3/4 xl:w-1/2 mx-auto">Find and trade games with other users. Login or Register to create your collection, search other collections, view user profiles and contact them to trade.</p>
              <form className="w-2/3 md:w-1/2 mx-auto py-4 flex flex-wrap justify-center" onSubmit={searchGames}>
                <input className="w-full md:w-2/3 border-2 border-black  p-2" type="text" />
                <input className="w-full md:w-1/4 md:ml-6 bg-purple-700 text-white font-bold cursor-pointer p-2" type="submit" value="Search" />
              </form>
              <div onClick={()=>clearSearch()}className="w-full text-center md:ml-6 text-purple-500 z-50 relative font-bold cursor-pointer">Clear Search</div>
            </div>
          </div>
    );
  }
  
  export default Hero;