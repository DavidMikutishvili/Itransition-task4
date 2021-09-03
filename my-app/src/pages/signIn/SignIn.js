import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from "./signIn.module.css";
import { Redirect } from 'react-router-dom';

export const SignIn = (props) => {
const [registerData, setRegisterData] = useState();
const [valueName, setValueName] = useState('');
const [valueEmail, setValueNameEmail] = useState('');
const [valuePassword, setValueNamePassword] = useState('');
const [redirect, setRedirect] = useState(false);

const onInputNameChange = (value) => {
    const newSymbol = value.currentTarget.value
    setValueName(newSymbol)
}

const onInputEmailChange = (value) => {
    const newSymbol = value.currentTarget.value
    setValueNameEmail(newSymbol)
}

const onInputPasswordChange = (value) => {
    const newSymbol = value.currentTarget.value
    setValueNamePassword(newSymbol)
}

const onSignInClick = () => {
    if (valueName && valueEmail && valuePassword) {
        setRegisterData({
            username: valueName,
            email: valueEmail,
            password: valuePassword,
        })
    } else {
        alert('Недостаточно данных')
    }
}

const onLogInClick = () => {
    setRedirect(true)
}

useEffect(()=>{
    if(registerData) {
        const promise = axios.post('https://localhost:44315/api/Authenticate/register', registerData)
        promise.then(response => {
                if (response.status === 200) {
                    setRedirect(true)
                }
                })
                .catch(error => {
                    alert('Error request')
                })
    }
},[registerData])

if (redirect) {
    return <Redirect to='/logIn'/>;
}

  return (
    <div className={style.container}>
        <div className={style.wrapper}>
            <h1>Sign In</h1>
            Name:
            <input className={style.input} placeholder={'name'} value={valueName} onChange={onInputNameChange}/>
            Email:
            <input className={style.input} placeholder={'email'} value={valueEmail} onChange={onInputEmailChange}/>
            Password:
            <input className={style.input} placeholder={'password'} value={valuePassword} onChange={onInputPasswordChange}/>
            <button className={style.button} onClick={onSignInClick}>Sign In</button>
        </div>
        <button className={style.button} onClick={onLogInClick}>Log In</button>
    </div>
  );
}
