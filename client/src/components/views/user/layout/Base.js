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
import GigList from "../gigs/GigList";
import AddGig from "../gigs/AddGig";
import Pricing from "../gigs/Pricing";
import Faq from "../gigs/faq";
import CategoryGigList from "../CategoryGigList";
import AddRequest from "../requests/AddRequest";
import RequestList from "../requests/RequestList";
import Requirement from "../gigs/Requirement";
import Gallery from "../gigs/gallery";
import GigApproval from "../gigs/GigApproval";
import Cart from "../gigs/cart";
import CartPayment from "../gigs/cartPayment";
import BuyerOrderList from "../gigs/BuyerOrderList";
import OrderDetails from "../gigs/OrderDetails";
import SellerOrderList from "../gigs/SellerOrderList";
import SellerOrderDetails from "../gigs/SellerOrderDetails";
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
                <Route exact={true} path="/" component={auth.isAuthenticated ? Home : Landing} />
                <ProtectedRoute path="/cart-payment-option/:id" component={CartPayment} />
                <ProtectedRoute path="/cart-payment-option" component={CartPayment} />
                <ProtectedRoute path="/categories/:category/:subcategory" component={CategoryGigList} />
                <ProtectedRoute path="/gig/list" component={GigList} />
                <ProtectedRoute path="/gig/post/pricing/:id" component={Pricing} />
                <ProtectedRoute path="/gig/post/faq/:id" component={Faq} />
                <ProtectedRoute path="/gig/post/requirements/:id" component={Requirement} />
                <ProtectedRoute path="/gig/post/gallery/:id" component={Gallery} />
                <ProtectedRoute path="/gig/post/approval/:id" component={GigApproval} />
                <ProtectedRoute path="/gig/post" component={AddGig} />
                <ProtectedRoute path="/gig/:user/:gig" component={GigDetail} />
                <ProtectedRoute path="/cart" component={Cart} />
                <ProtectedRoute path="/buyer-order-lists" component={BuyerOrderList} />
                <ProtectedRoute path="/order/details/:id" component={OrderDetails} />
                <ProtectedRoute path="/seller-order-lists" component={SellerOrderList} />
                <ProtectedRoute path="/seller-order/details/:id" component={SellerOrderDetails} />
                <ProtectedRoute path="/request/add" component={AddRequest} />
                <ProtectedRoute path="/request/manage" component={RequestList} />
                <ProtectedRoute path="/profile" component={Profile} />

            </Switch>

            <Footer />

        </Fragment>
    );
};

export default Base;
