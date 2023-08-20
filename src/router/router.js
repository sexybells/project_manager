import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/auth/login';

export default function WebRoute() {
    return (
        <Routes>
            <Route exact path='/' />
            <Route path='/login' element={<Login />} />
            <Route path='/register' />
            <Route path='project:id' />
        </Routes>
    )
}