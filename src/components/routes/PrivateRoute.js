import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

/** Private route component
 * Props:
 * children - wrapped component which need to be validated against current session
*/ 
const PrivateRoute = ({children}) => {
    // Fetching current user state
    const user = useSelector(state => state.user)
    return (
        user == null?
            <Navigate to="/login" replace="true" />: children
    )
}

export default PrivateRoute