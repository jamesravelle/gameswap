import React, { useState, useEffect, useContext }  from 'react';
// import Select from 'react-select'
import './style.css'

import useLocalStorage from '../../hooks/useLocalStorage';

function SearchResults({searchResults, loading, selectGame, searchSubmit, addGame}) {

    const [user, setUser] = useLocalStorage('user');

    console.log('SEARCH', searchResults.results.length)
    if(loading){
      return (
        <div className="container mx-auto flex items-center justify-center h-72 py-12">
          <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      )
    }else if(searchResults.results.length === 0) {
      return ("")
    }

    return (
        <section className="container mx-auto flex items-center">
        <div className="absolute top-1/2 left-0">
          <div onClick={()=>{searchSubmit(null, searchResults.hasOwnProperty('next') ? searchResults.previous : '')}} className="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"/></svg>
          </div>
        </div>
        <div className="flex w-full">
        {
          searchResults.results.map((game) => (
            <div className="w-1/3 p-4 flex">
            <form className="bg-white  overflow-hidden shadow-lg w-full" onSubmit={addGame}  key={game.hasOwnProperty('id') ? game.id : ''}>
              <div className="h-64 bg-cover" style={{backgroundImage:`url("${game.hasOwnProperty('background_image') ? game.background_image : ''}")`}}>&nbsp;</div>
              
              <div className="game-data p-2 flex flex-wrap">
                <h2 className="text-center mb-2 w-full">{game.hasOwnProperty('name') ? game.name : ''}</h2>
                <select onChange={selectGame} className="flex-grow border-2 p-1 border-black ">
                  {
                  game.hasOwnProperty('platforms') ? 
                  game.platforms
                  .filter( (p) => p.platform.name !== 'PC' )
                  .map((platform,i)=>(
                    <option key={i} value={JSON.stringify({username:user.username, user: user.email, game: game.name, image: game.background_image, platform: platform.platform.name})}>{platform.platform.name}</option>
                  )) 
                  : ''
                  }
                </select>
                <input type="submit" value="+" className="w-12 ml-4 bg-blue-500 cursor-pointer text-white  text-2xl pb-1"/>
              </div>
            </form>
            </div>
          ))
        }
        </div>
        <div className="absolute top-1/2 right-0">
          <div onClick={()=>{searchSubmit(null, searchResults.hasOwnProperty('next') ? searchResults.next : '')}} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12"/></g></svg>          
          </div>
        </div>
        </section>
    );
  }
  
  export default SearchResults;