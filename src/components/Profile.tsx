import React from 'react';
import {useAppSelector} from "../store/store";
import {Navigate} from "react-router-dom";

const Profile = () => {
    const isLogged = useAppSelector(state => state.auth.isLoggedIn)
    if(!isLogged){
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            profile
        </div>
    );
};

export default Profile;