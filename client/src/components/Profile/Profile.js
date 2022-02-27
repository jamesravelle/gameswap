import React from 'react'
import { useParams } from "react-router-dom";

import Nav from '../Nav';
import Posts from '../Posts'

const Profile = () => {
    const { id } = useParams();
    return (
        <>
        <Nav />
        <div className="container mx-auto">
            <h1 className="text-center my-6">Games for user: { id }</h1>
            <Posts user={id} />
        </div>
        </>
    )
}
export default Profile