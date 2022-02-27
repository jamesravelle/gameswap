import React, { useState, useEffect, useContext }  from 'react';
import axios from 'axios'
import './style.css'

const url = 'http://localhost:5000/posts';

function Posts({user, refresh}) {
    const [data, setData] = useState(null);

    console.log("USER",user)

    useEffect(()=>{
        console.log(user);
        refreshData();
    },[user, refresh])

    const refreshData = () => {
        let url = "";
        if(user){
            url = `http://localhost:5000/posts/user/${user}`
        } else {
            url = "http://localhost:5000/posts/"
        }
        axios
        .get(url)
        .then(response =>{
            console.log(response.data)
            setData(response.data)
        }).catch(err =>{
            console.log(err);
        })
    }

    const deleteGame = (id) => {
        if(user && window.location.pathname == '/portal'){
            let url = `http://localhost:5000/posts/${id}`
            axios
            .delete(url)
            .then(response =>{
                refreshData();
            }).catch(err =>{
                console.log(err);
            })
        }
    }

    const contact = (data) => {
        window.location = 
        `
        mailto:${data.user.trim()}
        ?subject=${data.username} is interested in ${data.game}
        &body=Please view my collection: https://game-swap-app.herokuapp.com/profile/${data.username} 
        `;
    }

    const visitProfile = (data) => {
        window.location = `/profile/${data.username}`
    }
    
    return (
      <div className="container flex flex-wrap mx-auto px-4">
        {data && Object.keys(data).map(function(key, i) {
            return (
                <div className="game w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 relative overflow-hidden" key={key}>
                    <div className="overflow-hidden shadow-lg h-full bg-white">
                        <div className="h-64 bg-cover" style={{backgroundImage:`url("${data[key].image ? data[key].image : ''}")`}}>&nbsp;</div>
                        <div className="p-2 " key={i}>
                            <h2 className="border-b-2 ">{data[key].game}</h2>
                            <div className="flex">
                                <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8zM6 15h2v-2h2v-2H8V9H6v2H4v2h2z"/><circle cx="14.5" cy="13.5" r="1.5"/><circle cx="18.5" cy="10.5" r="1.5"/></svg>
                                {data[key].platform}
                            </div>
                            <div className="flex">
                            <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>                            {window.location.pathname !== '/' 
                            ? 
                            <span>{data[key].username}</span>
                            :
                            <a href={`/profile/${data[key].username}`} target="_self" className="text-blue-500">{data[key].username}</a>   
                            }
                            </div>
                        </div>
                    </div>
                    {window.location.pathname == '/portal' &&
                        <div onClick={()=>deleteGame(data[key]._id)} className="absolute top-0 right-0 w-12 h-12 bg-white border-2 border-black flex items-center justify-center cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                        </div>
                    }
                    {(window.location.pathname == '/' || window.location.pathname.includes('/profile')) &&
                        <div>
                            <div onClick={()=>contact(data[key])} className="email-icon absolute w-12 h-12 bg-white border-2 border-black flex items-center justify-center cursor-pointer transition-all lg:hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
                            </div>
                            <div onClick={()=>visitProfile(data[key])} className="user-icon absolute w-12 h-12 bg-white border-2 border-black flex items-center justify-center cursor-pointer transition-all lg:hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>                            
                            </div>
                        </div>
                    }
                </div>
            )
        })}
      </div>
    );
  }
  
  export default Posts;