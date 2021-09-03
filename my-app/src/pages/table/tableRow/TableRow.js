import React, { useState } from 'react';
import s from "./tableRow.module.css";

export const TableRow = ({userName, id, email, registrationDate, lastLoginTime, getUserId, mainCheckBoxValue, userBlock}) => {

const [checkBoxValue, setCheckBoxValue] = useState(false)

const getCheckboxValue = (e) => {
  const value = e.target.checked
  setCheckBoxValue(value)
  value && getUserId(id)
  !value && getUserId("")
}



  return (
                  <div className={s.tableRow} >
                        <div className={s.checkbox}>
                          <input type={'checkbox'} checked={mainCheckBoxValue ? mainCheckBoxValue : checkBoxValue} onChange={getCheckboxValue}/>
                        </div>
                        <div className={s.cell}>{userName}</div>
                        <div className={s.cell}>{id}</div>
                        <div className={s.cell}>{email}</div>
                        <div className={s.cell}>{registrationDate}</div>
                        <div className={s.cell}>{lastLoginTime}</div>
                        <div className={s.cell}>{userBlock ? 'block' : 'unblock'}</div>
                   </div> 
   
  );
}
