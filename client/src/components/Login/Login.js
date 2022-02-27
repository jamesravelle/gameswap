import React,{useState, useContext} from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { PromiseProvider } from 'mongoose';
import {PostContext} from '../../context/PostContext'
import useLocalStorage from '../hooks/useLocalStorage';
import Nav from '../Nav';

const Login = (props) => {
    const history = useNavigate()
    
    const [user,setUser] = useLocalStorage('user');
    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    const formSubmit = (e) => {
        e.preventDefault();

        axios.post("/Login",{
            email:e.target[0].value,
            password:e.target[1].value
        })
        .then(res=>{
            console.log(res.data.user);
            setUser(res.data.user)
            history('/portal')
        })
    }

    return (
        <>
        <Nav />
        <div className="bg-gray-300 py-4 h-screen p-4">
            <div className="bg-white p-6 md:w-1/2 mx-auto shadow-lg">
                <h1>Login in to your account</h1>
                <form onSubmit={formSubmit} className="flex flex-col">
                    <input type="text" className="my-2 p-2 border-black border-2"/>
                    <input type="password"  className="my-2 p-2 border-black border-2"/>
                    <input type="submit" className="bg-black text-white p-2"/>
                </form>
            </div>
        </div>
        </>
    )
}
export default Login