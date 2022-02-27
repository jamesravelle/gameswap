//PostContext.js
import React, { useEffect, useState } from 'react'
import useLocalStorage from '../components/hooks/useLocalStorage'

const PostContext = React.createContext([{}, () => {}])

const PostProvider = ({ children }) => {
  const [data, setData] = useState({})
  // const [user, setUser] = useLocalStorage('user');

  useEffect(()=>{
    // console.log("POST STATE UPDATED", posts)
    console.log("DATA STATE UPDATED", data)
  },[data])

  return (
    <PostContext.Provider value={[data, setData]}>
      {children}
    </PostContext.Provider>
  )
}

export { PostContext, PostProvider }