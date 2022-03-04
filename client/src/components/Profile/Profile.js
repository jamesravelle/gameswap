import React from 'react'
import { useParams } from "react-router-dom";

import Nav from '../Nav';
import Posts from '../Posts'

const Profile = () => {
    const { id } = useParams();
    console.log('ID',id)
    return (
        <>
        <div className="bg-gray-300">
        <h1 className="text-center py-6">Games for user: { id }</h1>
        </div>
        <div className="container mx-auto mt-6">
            <Posts profile={id} />
        </div>
        </>
    )
}
export default Profile