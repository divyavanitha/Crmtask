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
import BuyerOrderList from "../orders/BuyerOrderList";
import OrderDetails from "../orders/OrderDetails";
import SellerOrderList from "../orders/SellerOrderList";
import SellerOrderDetails from "../orders/SellerOrderDetails";
import Profile from "../Profile";
import Dashboard from "../Dashboard";
import Revenue from "../Revenue";
import CouponCreate from "../CouponCreate";
import BuyerRequest from "../BuyerRequest";
import WithdrawalRequest from "../WithdrawalRequest";
import Purchase from "../Purchase";
import Favourite from "../Favourite";
import Contact from "../Contact";
import Referral from "../Referral";

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
                <Route path="/categories/:category/:subcategory" component={CategoryGigList} />
                <ProtectedRoute path="/cart-payment-option/:id" component={CartPayment} />
                <ProtectedRoute path="/cart-payment-option" component={CartPayment} />
                <ProtectedRoute path="/gigs" component={GigList} />
                <ProtectedRoute path="/gig/pricing/:id" component={Pricing} />
                <ProtectedRoute path="/gig/faq/:id" component={Faq} />
                <ProtectedRoute path="/gig/requirements/:id" component={Requirement} />
                <ProtectedRoute path="/gig/gallery/:id" component={Gallery} />
                <ProtectedRoute path="/gig/approval/:id" component={GigApproval} />
                <ProtectedRoute path="/gig/add" component={AddGig} />
                <ProtectedRoute path="/gig/edit/:id" component={AddGig} />
                <Route path="/gig/:user/:gig" component={GigDetail} />
                <ProtectedRoute path="/cart" component={Cart} />
                <ProtectedRoute path="/buying-order-lists" component={BuyerOrderList} />
                <ProtectedRoute path="/order/details/:id" component={OrderDetails} />
                <ProtectedRoute path="/selling-order-lists" component={SellerOrderList} />
                <ProtectedRoute path="/seller-order/details/:id" component={SellerOrderDetails} />
                <ProtectedRoute path="/request/add" component={AddRequest} />
                <ProtectedRoute path="/request/manage" component={RequestList} />
                <ProtectedRoute path="/profile" component={Profile} />
                <ProtectedRoute path="/dashboard" component={Dashboard} />
                <ProtectedRoute path="/revenues" component={Revenue} />
                <ProtectedRoute path="/coupon/create" component={CouponCreate} />
                <ProtectedRoute path="/buyer/requests" component={BuyerRequest} />
                <ProtectedRoute path="/withdrawal/requests" component={WithdrawalRequest} />
                <ProtectedRoute path="/purchases" component={Purchase} />
                <ProtectedRoute path="/favourites" component={Favourite} />
                <ProtectedRoute path="/contacts" component={Contact} />
                <ProtectedRoute path="/referrals" component={Referral} />

            </Switch>

            <Footer />

        </Fragment>
    );
};

export default Base;
