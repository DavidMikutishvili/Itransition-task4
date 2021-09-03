import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from "./logIn.module.css";
import { Redirect } from 'react-router-dom';

export const LogIn = ({getLoginValue, getCurrentUserId}) => {
const [loginData, setLoginData] = useState();
const [valueName, setValueName] = useState('');
const [valuePassword, setValueNamePassword] = useState('');
const [redirect, setRedirect] = useState(false);
const [users, setUsers] = useState([]);
const [toLoginRedirect, setToLoginRedirect] = useState(false);

const onInputNameChange = (value) => {
    const newSymbol = value.currentTarget.value
    setValueName(newSymbol)
}

const onInputPasswordChange = (value) => {
    const newSymbol = value.currentTarget.value
    setValueNamePassword(newSymbol)
}

const onButtonClick = () => {
    if (valueName && valuePassword) {
        setLoginData({
            username: valueName,
            password: valuePassword,
        })
    } else {
        alert('Недостаточно данных')
    }
}

const onSignInClick = () => {
    setToLoginRedirect(true)
}

useEffect(()=>{
    const promise = axios.get('https://localhost:44315/api/user')
          promise.then(response => {
                    setUsers(response.data)
                  })
                  .catch(error => {
                      alert('Error request')
                  })
  },[])

useEffect(()=>{
    if(loginData) {
        const promise = axios.post('https://localhost:44315/api/Authenticate/login', loginData)
        promise.then(response => {
                        const currentUserId = response.data.id
                        getCurrentUserId(currentUserId)
                        const user = users.filter(user => user.id === currentUserId)
                        if (user[0].userBlock){
                            alert('user was blocked')
                        } else {
                            setRedirect(true)                     
                        }
                    })
                    .catch(error => {
                        alert('Error request')
                    })
                    
    }
},[loginData])

if (redirect) {
    getLoginValue(redirect)
    return <Redirect to='/table'/>;
}

if (toLoginRedirect) {
    return <Redirect to='/'/>;
}

  return (
    <div className={style.container}>
        <div className={style.wrapper}>
            <h1>LogIn</h1>
            Name:
            <input className={style.input} placeholder={'name'} value={valueName} onChange={onInputNameChange}/>
            Password:
            <input className={style.input} placeholder={'password'} value={valuePassword} onChange={onInputPasswordChange}/>
            <button className={style.button} onClick={onButtonClick}>Log In</button>
        </div>
        <button className={style.button} onClick={onSignInClick}>Sign In</button>
    </div>    
  );
}
