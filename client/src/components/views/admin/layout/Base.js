import React, { useEffect } from "react";
import { ToastProvider } from 'react-toast-notifications'
import { Switch, Route } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from "react-helmet";

import "../../../../assets/css/bootstrap.css";
import "../../../../assets/css/custom.css";
import "../../../../assets/css/customStyle.css";

import "../../../../assets/admin/css/style.css";
import "../../../../assets/admin/css/admin-style.css";
import "../../../../assets/admin/css/admin-customStyle.css";

import Header from "../includes/Header";
import Sidepanel from "../includes/Sidepanel";
import AddCategory from "../categories/AddCategory";
import Category from "../categories/Category";
import AddDeliveryTime from "../deliverytimes/AddDeliveryTime";
import DeliveryTime from "../deliverytimes/DeliveryTime";
import AddSubCategory from "../subcategories/AddSubCategory";
import SubCategory from "../subcategories/SubCategory";
import AddLanguage from "../languages/AddLanguage";
import Language from "../languages/Language";
import AddCoupon from "../coupons/AddCoupon";
import AddSkill from "../skills/AddSkill";
import General from "../settings/General";
import Skill from "../skills/Skill";
import Coupon from "../coupons/Coupon";
import AddSlide from "../slides/AddSlide";
import Slide from "../slides/Slide";
import Dashboard from "../Dashboard";
import Profile from "../settings/Profile";
import Social from "../settings/Social";
import Sms from "../settings/Sms";
import Mail from "../settings/Mail";
import Push from "../settings/Push";
import Payment from "../settings/Payment";


const Base = () => {

    let settings = useSelector((state) => state.settings);

    let site = settings.settings && settings.settings.site;

  return (
    <ToastProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{site && site.title}</title>
        <link rel="icon" href={site && site.favicon} />
      </Helmet>
      <div style={{ display: 'table', width: '100%' }}>
        <section className="clearfix admin_footer">{site && site.copyright}</section>
        <Sidepanel />

        <div className="clearfix"></div>

        <div id="right-panel" className="right-panel">

          <Header />



          <Switch>
            <Route path="/admin/dashboard" component={Dashboard}></Route>
            <Route path="/admin/category/add" component={AddCategory}></Route>
            <Route path="/admin/category/:id/edit" component={AddCategory}></Route>
            <Route path="/admin/category" component={Category}></Route>
            <Route path="/admin/subcategory/add" component={AddSubCategory}></Route>
            <Route path="/admin/subcategory/:id/edit" component={AddSubCategory}></Route>
            <Route path="/admin/subcategory" component={SubCategory}></Route>
            <Route path="/admin/language/add" component={AddLanguage}></Route>
            <Route path="/admin/language/:id/edit" component={AddLanguage}></Route>
            <Route path="/admin/language" component={Language}></Route>
            <Route path="/admin/delivery/time/add" component={AddDeliveryTime}></Route>
            <Route path="/admin/delivery/time/:id/edit" component={AddDeliveryTime}></Route>
            <Route path="/admin/delivery/time" component={DeliveryTime}></Route>
            <Route path="/admin/skill/add" component={AddSkill}></Route>
            <Route path="/admin/skill/:id/edit" component={AddSkill}></Route>
            <Route path="/admin/skill" component={Skill}></Route>
            <Route path="/admin/promocode/add" component={AddCoupon}></Route>
            <Route path="/admin/promocode/:id/edit" component={AddCoupon}></Route>
            <Route path="/admin/promocode" component={Coupon}></Route>
            <Route path="/admin/slide/add" component={AddSlide}></Route>
            <Route path="/admin/slide/:id/edit" component={AddSlide}></Route>
            <Route path="/admin/slide" component={Slide}></Route>
            <Route path="/admin/settings/general" component={General}></Route>
            <Route path="/admin/settings/profile/links" component={Profile}></Route>
            <Route path="/admin/settings/social/links" component={Social}></Route>
            <Route path="/admin/settings/sms" component={Sms}></Route>
            <Route path="/admin/settings/mail" component={Mail}></Route>
            <Route path="/admin/settings/push" component={Push}></Route>
            <Route path="/admin/settings/payment" component={Payment}></Route>

          </Switch>

        </div>
      </div>
    </ToastProvider>

  );
};

export default Base;