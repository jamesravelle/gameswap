import React, { useContext, useEffect, useState }  from 'react';
import Form from '../Form'
import Posts from '../Posts'
import {PostContext} from '../../context/PostContext'
import useLocalStorage from '../hooks/useLocalStorage';
import {useNavigate} from "react-router-dom"
import Nav from '../Nav';

import './style.css'

function Portal() {
  const [user,setUser] = useLocalStorage('user');
  const [refresh, setRefresh] = useState(0);
  
  const history = useNavigate()


  useEffect(() => {
    if(!user._id){
      history('/login')
    }
  }, []);

    return (
      <>
         <div className="portal-container"> 
          <Form setRefresh={setRefresh} />
          <h1 className="text-center py-4">{user.username}'s Collection</h1>
          <Posts refresh={refresh} profile={user.username} />
         </div>
      </>
    );
  }
  
  export default Portal;