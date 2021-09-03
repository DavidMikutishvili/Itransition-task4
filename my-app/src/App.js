import './App.css';
import { SignIn } from './pages/signIn/SignIn';
import { LogIn } from './pages/logIn/LogIn';
import { BrowserRouter, Route } from "react-router-dom";
import { Table } from './pages/table/Table';
import { useState } from 'react';

function App() {

const [isLogin, setIslogin] = useState(false)
const [currentUserId, setCurrentUserId] = useState('');

const getCurrentUserId = (id) => {
  console.log(id);
  setCurrentUserId(id)
}

const getLoginValue = (value) => {
  setIslogin(value)
}

  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path={"/"} render={() => <SignIn/>}/>
        <Route exact path={"/login"} render={() => <LogIn getCurrentUserId={getCurrentUserId} getLoginValue={getLoginValue}/>}/>
        <Route exact path={"/table"} render={() => <Table currentUserId={currentUserId} isLogin={isLogin}/>}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
