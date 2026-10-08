import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Skeleton from "../components/Skeleton.jsx";

function PublicRoute() {

        const { user, isLoading } = useSelector((state) => state.user);

        if (isLoading) {
            return <Skeleton />
        }

        if(user) {
            return <Navigate to="/home" />
        }


  return <Outlet />
}

export default PublicRoute