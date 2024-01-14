import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import AddDepartment from './components/AddDepartment';
import UpdateDepartment from './components/UpdateDepartment';
import DeleteDepartment from './components/DeleteDepartment';
import Profile from './components/Profile';
import Detail from './components/Detail';
import Request from './components/Request';

function App ( props ) {

  return (
    <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='dashboard' element={ <Dashboard/> } />
        <Route path='login' element={ <Login/>} />
        <Route path='signup' element={ <Signup/>} />
        <Route path='adddepart' element={ <AddDepartment/>} />
        <Route path='updatedep' element={ <UpdateDepartment/>} />
        <Route path='deletedep' element={ <DeleteDepartment/>} />
        <Route path='profile' element={ <Profile/>} />
        <Route path='detail' element={ <Detail/>} />
        <Route path='request' element={ <Request/>} />
    </Routes>
  );
}

export default App;
