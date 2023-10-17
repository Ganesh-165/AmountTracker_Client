import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate,Outlet } from 'react-router-dom';

const Auth = () => {
    const {auth} = useAuth();
    const userid = auth.userid;
  return (userid ? <Outlet/> : <Navigate to='/'/>)
}

export default Auth