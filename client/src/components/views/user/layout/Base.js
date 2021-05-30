import React, { Fragment, useEffect } from "react";
import { ToastProvider } from 'react-toast-notifications'
import { Switch, Route } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from "react-helmet";


import ProtectedRoute from '../../../utils/protected_route';

import Landing from "../Landing";
import Header from '../includes/Header';
import Nav from '../includes/Nav';
import Footer from "../includes/Footer";
import Profile from "../profile/Profile";
import Post from "../Post";
import "../../../../assets/css/custom.css";


const Base = () => {

   const dispatch = useDispatch();
   const auth = useSelector((state) => state.user);

   useEffect(() => {

   }, []);

    let settings = useSelector((state) => state.settings);

    let site = settings.settings && settings.settings.site;

    return (
        <Fragment>
        <ToastProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{site && site.title}</title>
                <link rel="icon" href={site && site.favicon} />

            </Helmet>
            <Header />

            <Nav />
            <Switch>
                <Route exact={true} path="/" component={Landing} />
                <ProtectedRoute path="/profile" component={Profile} />
                <Route path="/post/:id" component={Post} />
            </Switch>

            <Footer />
        </ToastProvider>

        </Fragment>
    );
};

export default Base;
