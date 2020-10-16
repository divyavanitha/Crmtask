import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from "../../components/views/admin/auth/Login";


const AdminRoute = ({ children, ...rest }) => {
    const admin = useSelector((state) => state.admin);
    console.log(children);
    return (
        <Route
            {...rest}
            render={(props) => 
                admin.isAuthenticated ? ( children ) : <Login />

            }
        />
    );
}

export default AdminRoute;