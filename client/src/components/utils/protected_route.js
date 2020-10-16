import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch, connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, render, ...rest }) => {

    const user = useSelector((state) => state.user);

    return (

        <Route {...rest} render={props => {
                if (user.isAuthenticated) {
                    return Component ? <Component /> : render(props);
                } else {
                    return (
                        <Redirect to={{ pathname: "/login", state: { from: props.location } }}
                        />
                    );
                }

            }}
        />
    );
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(ProtectedRoute);