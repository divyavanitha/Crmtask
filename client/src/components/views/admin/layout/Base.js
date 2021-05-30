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
import General from "../settings/General";
import AddPost from "../posts/AddPost";
import Post from "../posts/Post";
import AddAdmin from "../admin/AddAdmin";
import Admin from "../admin/Admin";
import AddUser from "../users/AddUser";
import Comment from "../comments";
import User from "../users/User";
import SocialLink from "../settings/SocialLink";


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
            <Route path="/admin/post/add" component={AddPost}></Route>
            <Route path="/admin/post/:id/edit" component={AddPost}></Route>
            <Route path="/admin/post" component={Post}></Route>
            <Route path="/admin/comments" component={Comment}></Route>
            <Route path="/admin/user/add" component={AddUser}></Route>
            <Route path="/admin/user/:id/edit" component={AddUser}></Route>
            <Route path="/admin/user" component={User}></Route>
            <Route path="/admin/settings/general" component={General}></Route>
            <Route path="/admin/settings/social/links" component={SocialLink}></Route>

          </Switch>

        </div>
      </div>
    </ToastProvider>

  );
};

export default Base;