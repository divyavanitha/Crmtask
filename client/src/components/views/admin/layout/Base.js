import React, { useState, FormEvent, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, withRouter, useHistory } from "react-router-dom";
import { login } from "../../../../_actions/admin/auth.action";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Notifications from "../common/Notification";
import Sidepanel from "../includes/Sidepanel";
import Header from "../includes/Header";


const Base = () => {

  return (
    <React.Fragment>
      <section class="clearfix post_footer">@ Copyright GigToDoScript 2019. Pixinal Studio. </section>
      <aside id="left-panel" class="left-panel">
        <nav class="navbar navbar-expand-sm navbar-default">
          <div class="navbar-header">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu">
              <i class="fa fa-bars"></i>
            </button>
            <a class="navbar-brand" href="index?dashboard">
              site_name  <span class="badge badge-success p-2 font-weight-bold">ADMIN</span>
            </a>
            <a class="navbar-brand hidden" href="./"><span class="badge badge-success pt-2 pb-2">A</span></a>
          </div>
          <div id="main-menu" class="main-menu collapse navbar-collapse">
          <Sidepanel />
    </div>
        </nav>
      </aside>

      <div id="right-panel" class="right-panel">


<header id="header" class="header">
<div class="header-menu"> <Header /> 

<div class="container clearfix">
<div class="row">
<div id="languagePanel" class="bg-light col-md-12 p-2 pb-0 mb-0"> 
	<div class="row">
	<div class="col-md-6"> 
	<p class="col-form-label font-weight-normal mb-0 pb-0">Current Selected Language: <strong> currentLanguage </strong></p>
	</div> 
	<div class="col-md-6 float-right"> 
	<div class="form-group row mb-0 pb-0"> 
		<label class="col-md-2"></label>
		<label class="col-md-4 col-form-label"> Change Language: </label>
		<div class="col-md-6">
		<select id="languageSelect" class="form-control">

		<option data-url="">
		 title 
		</option>

		</select>
		</div>
	</div>
	</div>
	</div>
</div>
</div>
</div>


</div>
</header>

</div>

    </React.Fragment>


  );
};

export default Base;