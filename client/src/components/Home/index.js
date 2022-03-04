import React, { useState, useEffect }  from 'react';
import Posts from '../Posts'
import Hero from './Hero'


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
          <Hero clearSearch={clearSearch} searchGames={searchGames}/>
          <div className="container mx-auto mt-16 md:mt-12">
            <Posts search={search} />
          </div>
      </div>
    );
  }
  
  export default Home;