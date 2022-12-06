import React from 'react';
import SuperInputText from "./SuperInput/SuperInputText";
import SuperButton from "./SuperButton/SuperButton";
import SuperCheckbox from "./SuperCheckbox/SuperCheckbox";

const Login = () => {
    return (
        <div>
            <h2>login</h2>
            <form action="">
            <SuperInputText placeholder={'email'} />
            <SuperInputText placeholder={'password'} />
                <SuperCheckbox>Remember me</SuperCheckbox>
                <SuperButton id={'loginBtn'}>send</SuperButton>
            </form>
        </div>
    );
};

export default Login;