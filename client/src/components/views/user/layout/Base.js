import React, { Fragment, useEffect } from "react";
import { ToastProvider } from 'react-toast-notifications'
import { Switch, Route } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from "react-helmet";


import ProtectedRoute from '../../../utils/protected_route';

import Home from "../Home";
import Landing from "../Landing";
import Header from '../includes/Header';
import Nav from '../includes/Nav';
import Footer from "../includes/Footer";
import GigDetail from "../gigs/GigDetail";
import AddGig from "../gigs/AddGig";
import Pricing from "../gigs/Pricing";
import Faq from "../gigs/faq";
import Requirement from "../gigs/Requirement";
import Gallery from "../gigs/gallery";
import Profile from "../Profile";

import "../../../../assets/css/custom.css";

const Base = () => {

    let settings = useSelector((state) => state.settings);
    const auth = useSelector((state) => state.user);

    let site = settings.settings && settings.settings.site;

    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{site && site.title}</title>
                <link rel="icon" href={site && site.favicon} />
            </Helmet>
            <Header />

            <Nav />
            <Switch>
                <Route exact={true} path="/" component={ auth.isAuthenticated ? Home : Landing } />
                <ProtectedRoute exact={true} path="/gig/post" component={AddGig} />
                <ProtectedRoute exact={true} path="/gig/post/pricing/:id" component={Pricing} />
                <ProtectedRoute exact={true} path="/gig/post/faq/:id" component={Faq} />
                <ProtectedRoute exact={true} path="/gig/post/requirements/:id" component={Requirement} />
                <ProtectedRoute exact={true} path="/gig/post/gallery/:id" component={Gallery} />
                <ProtectedRoute exact={true} path="/gig/:user/:gig" component={GigDetail} />
                <ProtectedRoute exact={true} path="/profile" component={Profile} />
            </Switch>

            <Footer />

        </Fragment>
    );
};

export default Base;
