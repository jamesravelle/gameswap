import React , {useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom"
import useLocalStorage from '../hooks/useLocalStorage';
import Nav from '../Nav';

const Register = () => {
    const history = useNavigate()
    const [user,setUser] = useLocalStorage('user');
    // const [input, setInput] = useState({
    //     email: '',
    //     password: ''
    // })
    const [error, setError] = useState('');

    useEffect(()=>{
        setUser({});
    },[])

   const formSubmit = (e) => {
    e.preventDefault();

    let username = e.target[0].value,
        email = e.target[1].value,
        password = e.target[2].value

    if(username.length == 0 || email.length == 0 || password.length == 0){
        setError('Please fill out all fields.')
        return
    }

    // Validate fields
    if(username.indexOf(' ') >= 0){
        console.log(username)
        setError('Please do not use spaces in your username.')
        return
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)){
        
        setError('Please use a valid email address');
        return
    }

    axios.post("/Register",{
        username, email, password
    })
    .then(res=>{
        if(res.data.message == 'User already exists'){
            setError('User already exists.')
        }
        if(res.data.message == 'success'){
            setUser(res.data.user)
            history('/portal')
        }
    })
}
   
    return (
        <>
        <div className="bg-gray-300 py-4 h-screen p-4">
            <div className="bg-white p-6 shadow-lg md:w-1/2 mx-auto">
                <h1>Sign up for a new account</h1>
                <form onSubmit={formSubmit} className="flex flex-col">
                    <input type="text" className="my-2 p-2 border-black border-2"/>
                    <input type="text" className="my-2 p-2 border-black border-2"/>
                    <input type="password" className="my-2 p-2 border-black border-2"/>
                    <input type="submit" className="bg-black text-white p-2" />
                    <div className="text-red-500 mt-2 font-bold">
                        {error}
                    </div>
                </form>
            </div>
            
        </div>
        
        
        </>
    )
}

export default Register