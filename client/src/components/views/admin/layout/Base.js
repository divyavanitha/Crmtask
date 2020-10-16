import React, { Fragment } from "react";
import Sidepanel from "../includes/Sidepanel";
import Header from "../includes/Header";
import { Switch, Route } from "react-router";
/* import "../../../../css/Admin.css";
import "../../../../css/sb-admin-2.css"; */
import Dashboard from "../Dashboard";
import User from "../users/User";
import AddUser from "../users/AddUser";
import Category from "../category/Category";
import AddCategory from "../category/AddCategory";
import SubCategory from "../subcategory/SubCategory";
import AddSubCategory from "../subcategory/AddSubCategory";
import Skill from "../skill/Skill";
import AddSkill from "../skill/AddSkill";
import DeliveryTime from "../deliverytime/DeliveryTime";
import AddDeliveryTime from "../deliverytime/AddDeliveryTime";
import Language from "../language/Language";
import AddLanguage from "../language/AddLanguage";
import Notifications from "../common/Notification";

const Base = () => {

  return (
    <div className="App" id="wrapper">
      <Notifications />
      <Sidepanel />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <div className="container-fluid">
            <Switch>
              <Route path="/admin/dashboard" component={Dashboard}></Route>
              <Route path="/admin/language/add" component={AddLanguage}></Route>
              <Route path="/admin/language/:id/edit" component={AddLanguage}></Route>
              <Route path="/admin/language" component={Language}></Route>
              <Route path="/admin/delivery/time/add" component={AddDeliveryTime}></Route>
              <Route path="/admin/delivery/time/:id/edit" component={AddDeliveryTime}></Route>
              <Route path="/admin/delivery/time" component={DeliveryTime}></Route>
              <Route path="/admin/skill/add" component={AddSkill}></Route>
              <Route path="/admin/skill/:id/edit" component={AddSkill}></Route>
              <Route path="/admin/skill" component={Skill}></Route>
              <Route path="/admin/subcategory/add" component={AddSubCategory}></Route>
              <Route path="/admin/subcategory/:id/edit" component={AddSubCategory}></Route>
              <Route path="/admin/subcategory" component={SubCategory}></Route>
              <Route path="/admin/category/add" component={AddCategory}></Route>
              <Route path="/admin/category/:id/edit" component={AddCategory}></Route>
              <Route path="/admin/category" component={Category}></Route>
              <Route path="/admin/users/add" component={AddUser}></Route>
              <Route path="/admin/users" component={User}></Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base;
