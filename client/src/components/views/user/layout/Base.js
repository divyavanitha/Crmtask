import React, { Fragment } from "react";

import { Switch, Route } from "react-router";

import Home from "../Home";

import $ from 'jquery';

import "../../../../assets/css/bootstrap.css";
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

 import "../../../../assets/js/msdropdown.js";
/*  import "../../../../assets/js/categoriesProposal.js"; */

const Base = () => {

    return (
        <Switch>
            <Route exact={true} path="/" component={Home}></Route>
        </Switch>
    );
};

export default Base;
