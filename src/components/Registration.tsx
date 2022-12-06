import React from 'react';
import SuperInputText from "./SuperInput/SuperInputText";
import SuperButton from "./SuperButton/SuperButton";

const Registration = () => {
    return (
        <div>
            <h2>Registration</h2>
            <form action="">
                <SuperInputText placeholder={'email'}/>
                <SuperInputText placeholder={'password'}/>
                <SuperButton id={'loginBtn'}>send</SuperButton>
            </form>
        </div>
    );
};

export default Registration;