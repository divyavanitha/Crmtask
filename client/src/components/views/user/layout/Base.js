import React, { Fragment, useEffect } from "react";
import { ToastProvider } from 'react-toast-notifications'
import { Switch, Route } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from "react-helmet";

import Home from "../Home";
import Header from '../includes/Header';
import Nav from '../includes/Nav';
import Footer from "../includes/Footer";
import GigDetail from "../gigs/GigDetail";
import AddGig from "../gigs/AddGig";
import Profile from "../Profile";

import "../../../../assets/css/custom.css";
/* import "../../../../assets/css/bootstrap.css";
import "../../../../assets/css/custom.css";
import "../../../../assets/css/customStyle.css";
import "../../../../assets/css/styles.css";
import "../../../../assets/css/cate-nav-styles.css";
import "../../../../assets/css/owl.carousel.css";
import "../../../../assets/css/animate.css";
import "../../../../assets/css/knowledge_bank.css";
import "../../../../assets/css/owl.theme.default.css";
import "../../../../assets/css/mainStyle.css";
import "../../../../assets/css/homepage.css";
import "../../../../assets/css/msdropdown.css";

 import "../../../../assets/js/msdropdown.js"; */

/*  import "../../../../assets/js/popper.min.js";
 import "../../../../assets/js/bootstrap.js"; */

const Base = () => {

    let settings = useSelector((state) => state.settings);

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
                <Route exact={true} path="/" component={Home}></Route>
                <Route exact={true} path="/gig/post" component={AddGig}></Route>
                <Route exact={true} path="/gig/:user/:gig" component={GigDetail}></Route>
                <Route exact={true} path="/profile" component={Profile}></Route>
            </Switch>

            <Footer />

        </Fragment>
    );
};

export default Base;
