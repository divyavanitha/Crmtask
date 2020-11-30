import { Route, Redirect, RouteProps } from "react-router";
import React from "react";
import { useSelector } from "react-redux";
import Login from "../../components/views/admin/auth/Login";


const AdminAuthRoute = ({ children, ...rest }) => {

    const admin = useSelector((state) => state.admin);
    console.log('AdminAuthRoute', admin);

    return (
        <Route
            {...rest}
            render={() =>
                admin.isAuthenticated ? (
                    <Redirect
                        to={{
                            pathname: "/admin/dashboard"
                        }}
                    />
                ) : <Login />
            }
        />
    );
}

export default AdminAuthRoute;