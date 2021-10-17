import React from 'react'
import '../css/login.css'
import { Button } from '@material-ui/core'
import {auth , provider } from '../firebase'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer';
import logo from '../css/login-logo.png'

const Login = () => {
    const [{} , dispatch] = useStateValue('')

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message));
    }
    return (
        <div className='login'>
            <div className="login__container">
                
                <img src={logo}
                 alt=''></img>
                 
                 <div className="login__text">
                 <h1>Login to WhatsApp
                     
                 </h1>
                 <p>*Only google accounts login available</p>
                 </div>
                <Button onClick={signIn}>Sign in with Google</Button>
               
            </div>
           
        </div>
    )
}

export default Login
