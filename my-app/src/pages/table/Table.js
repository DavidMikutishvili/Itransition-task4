import React, { useEffect, useState } from 'react';
import axios from 'axios';
import s from "./table.module.css";
import { Redirect } from 'react-router-dom';
import { TableRow } from './tableRow/TableRow'

export const Table = ({isLogin, currentUserId}) => {

const [users, setUsers] = useState([])
const [userId, setUserId] = useState()
const [deleteRequest, setDeleteRequest] = useState()
const [deleteAllRequest, setDeleteAllRequest] = useState()
const [mainCheckBoxValue, setMainCheckBoxValue] = useState(false)
const [blockUser, setBlockUser] = useState(false)
const [unblockUser, setUnlockUser] = useState(false)
const [blockAllUsers, setBlockAllUsers] = useState(false)
const [unblockAllUsers, setUnlockAllUsers] = useState(false)
const [redirectToLogin, setRedirectToLogin] = useState(false)


const getCheckboxValue = (e) => {
  const value = e.target.checked
  setMainCheckBoxValue(value)
}

const getUserId = (id) => {
  setUserId(id)
}

const del = () => {
  !mainCheckBoxValue && deleteUser()
  mainCheckBoxValue && deleteAllUsers()
}

const deleteUser = () => {
  setDeleteRequest(true)
}

const deleteAllUsers = () => {
  setDeleteAllRequest(true)
}

const block = () => {
  !mainCheckBoxValue && blockUserRequest()
  mainCheckBoxValue && blockAllUsersRequest()
}

const blockUserRequest = () => {
  setBlockUser(true)
}

const blockAllUsersRequest = () => {
  setBlockAllUsers(true)
}

const unblock = () => {
  !mainCheckBoxValue && unblockUserRequest()
  mainCheckBoxValue && unblockAllUsersRequest()
}

const unblockUserRequest = () => {
  setUnlockUser(true)
}

const unblockAllUsersRequest = () => {
  setUnlockAllUsers(true)
}



useEffect(()=>{
  if (deleteRequest) {
        const promise = axios.delete(`https://localhost:44315/api/user/${userId}`)
              promise.then(response => {
                    setDeleteRequest(false)
                })
                .catch(error => {
                    alert('Error request')
                    setDeleteRequest(false)
                })
              }
},[deleteRequest])

useEffect(()=>{
  if (deleteAllRequest) {
        const promise = axios.delete(`https://localhost:44315/api/user`)
              promise.then(response => {
                    setDeleteAllRequest(false)
                    setMainCheckBoxValue(false)
                })
                .catch(error => {
                    alert('Error request')
                    setDeleteAllRequest(false)
                    setMainCheckBoxValue(false)
                })
              }
},[deleteAllRequest])

useEffect(()=>{
  if (blockUser) {
        const promise = axios.post(`https://localhost:44315/api/user/${userId}`)
              promise.then(response => {
                    setDeleteAllRequest(false)
                    setMainCheckBoxValue(false)
                    setBlockUser(false)
                })
                .catch(error => {
                    alert('Error request')
                    setDeleteAllRequest(false)
                    setMainCheckBoxValue(false)
                    setBlockUser(false)
                })
              }
},[blockUser])

useEffect(()=>{
  if (unblockUser) {
        const promise = axios.put(`https://localhost:44315/api/user/${userId}`)
              promise.then(response => {
                    setDeleteAllRequest(false)
                    setMainCheckBoxValue(false)
                    setBlockUser(false)
                    setUnlockUser(false)
                })
                .catch(error => {
                    alert('Error request')
                    setDeleteAllRequest(false)
                    setMainCheckBoxValue(false)
                    setBlockUser(false)
                    setUnlockUser(false)
                })
              }
},[unblockUser])

useEffect(()=>{
  if (blockAllUsers) {
        const promise = axios.put(`https://localhost:44315/api/user/BlockAllUsers`)
              promise.then(response => {
                    setDeleteAllRequest(false)
                    setMainCheckBoxValue(false)
                    setBlockUser(false)
                    setUnlockUser(false)
                    setBlockAllUsers(false)
                    setUnlockAllUsers(false)

                })
                .catch(error => {
                    alert('Error request')
                    setDeleteAllRequest(false)
                    setMainCheckBoxValue(false)
                    setBlockUser(false)
                    setUnlockUser(false)
                    setBlockAllUsers(false)
                    setUnlockAllUsers(false)

                })
              }
},[blockAllUsers])

useEffect(()=>{
  if (unblockAllUsers) {
        const promise = axios.put(`https://localhost:44315/api/user/unblockAllUsers`)
              promise.then(response => {
                    setDeleteAllRequest(false)
                    setMainCheckBoxValue(false)
                    setBlockUser(false)
                    setUnlockUser(false)
                    setUnlockAllUsers(false)
                })
                .catch(error => {
                    alert('Error request')
                    setDeleteAllRequest(false)
                    setMainCheckBoxValue(false)
                    setBlockUser(false)
                    setUnlockUser(false)
                    setUnlockAllUsers(false)

                })
              }
},[unblockAllUsers])

useEffect(()=>{
  const promise = axios.get('https://localhost:44315/api/user')
        promise.then(response => {
                const currentUser = response.data.filter(user => user.id === currentUserId)
                if (currentUser[0].userBlock) {
                  alert('user was blocked')
                  setRedirectToLogin(true)
                } else {
                  setUsers(response.data)
                }
                })
                .catch(error => {
                    alert('Error request')
                })
},[deleteRequest, deleteAllRequest, blockUser, unblockUser, blockAllUsers, unblockAllUsers])



if (!isLogin) {
    return <Redirect to='/login'/>;
}

if (redirectToLogin) {
  return <Redirect to='/login'/>;
}

  return (
    <div>
        <button onClick={del}>delete</button>
        <button onClick={block}>block</button>
        <button onClick={unblock}>unblock</button>
       <div className={s.table}>
          <div className={s.header}>
              <div className={s.checkbox}>
                  <input type={'checkbox'} checked={mainCheckBoxValue} onChange={getCheckboxValue}/>
              </div>
              <div className={s.cell}>Name</div>
              <div className={s.cell}>Id</div>
              <div className={s.cell}>Email</div>
              <div className={s.cell}>Regisration date</div>
              <div className={s.cell}>Last login</div>
              <div className={s.cell}>Status</div>
          </div>
          <div className={s.gridTable}>
           {users.map(user => (<TableRow 
                                  userName={user.userName} 
                                  id={user.id} 
                                  email={user.email} 
                                  registrationDate={user.registrationDate} 
                                  lastLoginTime={user.lastLoginTime}
                                  getUserId={getUserId}
                                  mainCheckBoxValue={mainCheckBoxValue}
                                  userBlock={user.userBlock}
                                  />
                                  ))}               
          </div>
        </div>
    </div>
  );
}
