import React, { useState, FormEvent, Dispatch } from "react";
import { ToastProvider } from 'react-toast-notifications'
import { Switch, Route } from "react-router";

import "../../../../assets/css/bootstrap.css";
import "../../../../assets/css/custom.css";
import "../../../../assets/css/customStyle.css";

import "../../../../assets/admin/css/style.css";
import "../../../../assets/admin/css/admin-style.css";
import "../../../../assets/admin/css/admin-customStyle.css";

import Notification from "../common/Notification";
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
import AddSkill from "../skills/AddSkill";
import Skill from "../skills/Skill";
import AddCoupon from "../coupons/AddCoupon";
import Coupon from "../coupons/Coupon";
import Dashboard from "../Dashboard";


const Base = () => {

  return (
    <ToastProvider>
    <div style={{ display: 'table', width: '100%' }}>
      <section className="clearfix admin_footer">Copyright onePress 2020. All Rights Reserved</section>

      <Notification />
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

        </Switch>

      </div>
    </div>
    </ToastProvider>

  );
};

export default Base;