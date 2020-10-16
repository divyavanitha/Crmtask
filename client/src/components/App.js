import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";

/* import ProtectedRoute from './utils/protected_route';
import AdminRoute from './utils/admin_route';
import AdminAuthRoute from './utils/admin_auth_route'; */

import LandingPage from "./views/LandingPage/LandingPage.js";
/* import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import clientfreelancer from "./views/freelancer/clientfreelancer.js";
import clientfreelancedetail from "./views/freelancer/client-freelance-detail.js";
import clientchat from "./views/freelancer/client-chat.js";
import jobcardbeforeclick from "./views/job/jobcard-beforeclick.js";
import explore from "./views/explore/explore.js";
import CreateGig from './views/gig/CreateGig';
import EditGig from './views/gig/EditGig';
import editservice from "./views/edit/edit-service";
import clientsettings from "./views/freelancer/client-settings.js";
import jobcardafterclick from "./views/job/jobcard-afterclick.js";
import clientfreeuser from "./views/freelancer/clientfreeuser.js";
import createfreelancerjob from "./views/freelancer/create-freelancer-job.js";
import postjob from "./views/job/post-job.js";
import AdminLogin from './views/admin/auth/Login';
import Admin from './views/admin/layout/Base'; */

import "../css/bootstrap.css";
import "../css/custom.css";
import "../css/customStyle.css";
import "../css/styles.css";
import "../css/cate-nav-styles.css";
import "../css/owl.carousel.css";
import "../css/animate.css";
import "../css/knowledge_bank.css";
import "../css/owl.theme.default.css";
import "../css/mainStyle.css";
import "../css/homepage.css";
import "../css/msdropdown.css";


import "popper.js/dist/popper.js";
import "jquery/dist/jquery.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";



//import "../js/jquery.min.js";
import "../js/msdropdown.js";
//import "../js/jquery.sticky.js";
//import "../js/popper.min.js";
//import "../js/owl.carousel.min.js";
//import "../js/bootstrap.js";




function App() {
  
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div>
        <Switch>
        <Route  exact={true}  path="/" component={LandingPage} />
         {/*  <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <ProtectedRoute path="/explore" component={explore} />
          <ProtectedRoute path="/freelancer" component={clientfreeuser} />
          <ProtectedRoute path="/job" component={jobcardbeforeclick} />
          <ProtectedRoute path="/gig/create" component={CreateGig} />
          <ProtectedRoute path="/gig/edit" component={EditGig} /> */}
         {/* <Route  exact={true}  path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <ProtectedRoute path="/explore" component={explore} />
          <ProtectedRoute path="/clientfreelancer" component={clientfreelancer} />
          <ProtectedRoute path="/client-free-user" component={clientfreeuser} />
          <ProtectedRoute path="/client-freelance-detail" component={clientfreelancedetail} />
          <ProtectedRoute path="/client-chat" component={clientchat} />
          <ProtectedRoute path="/jobcard-beforeclick" component={jobcardbeforeclick} />
          <ProtectedRoute path="/edit-service" component={editservice} />
          <ProtectedRoute path="/jobcard-afterclick" component={jobcardafterclick} />
          <ProtectedRoute path="/post-job" component={postjob} />
          <ProtectedRoute path="/create-freelancer-job" component={createfreelancerjob} /> */}


         {/*  <AdminRoute path="/admin" >
            <Admin />
          </AdminRoute>
          <AdminAuthRoute path="/admin/login"><AdminLogin /></AdminAuthRoute> */}
          {/* <Redirect from="*" to="/" /> */}
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
