import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export default function Guards() {
    let auth = useSelector(state => state.auth)
    let { pathname } = useLocation()
    
    if (pathname !== "/login") {
        if (!auth.token)
            return <Navigate to="login" />
    }
         
}
