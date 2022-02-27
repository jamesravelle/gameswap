import React, { useState, useEffect, useContext }  from 'react';
import axios from 'axios'
import {PostContext} from '../../context/PostContext'
import SearchResults from './SearchResults'

import './style.css'

const url = 'http://localhost:5000/posts';

function Form({setRefresh}) {

  // game search
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState({
    results: []
  });
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState({});
  const [showSearch, setShowSearch] = useState(false);

  const searchSubmit = (e, page) => {
    if(e !== null){
      e.preventDefault();
    }
    
    setLoading(true)
    console.log(page);

    let searchString = page ? page : `http://localhost:5000/rawg/${search}`
    axios
    .get(searchString)
    .then(response =>{
      console.log(response.data)
      setSearchResults(response.data)
      setLoading(false)
    })
    .catch(err =>{
      console.log(err);
    })
  }


const addGame = (e) => {
  console.log(JSON.parse(e.target[0].value));
  e.preventDefault();
    axios
    .post('http://localhost:5000/posts', JSON.parse(e.target[0].value))
    .then(response =>{
      setRefresh(Math.random)
    }).catch(err =>{
      console.log(err);
    })
}

const selectGame = (e) => {
  let value = JSON.parse(e.target.value);
  setGame(value);
}

    return (
        <section className="flex w-full relative flex-wrap bg-gray-200 transition-all">
            <form className="w-1/2 mx-auto py-4 flex" onSubmit={searchSubmit}>
              <input className="w-2/3 border-2 border-black  p-2" type="text" onChange={(e)=>setSearch(e.target.value)}/>
              <input className="w-64 ml-6 bg-blue-500 text-white font-bold cursor-pointer p-2 " type="submit" value="Add New Game" />
            </form>
            <SearchResults searchResults={searchResults} loading={loading} selectGame={selectGame} searchSubmit={searchSubmit} addGame={addGame}/>
        </section>
    );
  }
  
  export default Form;