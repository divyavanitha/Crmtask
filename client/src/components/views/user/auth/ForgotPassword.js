import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getSubCategory } from "../../../../_actions/user.action";
import $ from 'jquery';

function ForgotPassword() {

    useEffect(() => {


        $(document).ready(function () {

        });

    }, []);

    return (

        <Fragment>
            <div className="modal fade login" id="forgot-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* <!--  Modal header starts --> */}
                            <i className="fa fa-meh-o fa-log"></i>
                            <h5 className="modal-title"> Forgot Password </h5>
                            <button type="button" className="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        {/* <!--  Modal header ends --> */}
                        <div className="modal-body">
                            {/* <!--  Modal body starts --> */}
                            <p className="text-muted text-center mb-2">
                                Enter your email to receive a password reset link.
            </p>
                            <form action="" method="post">
                                <div className="form-group">
                                    <input type="text" name="forgot_email" className="form-control" placeholder="Enter Your Email" />
                                </div>
                                <input type="submit" className="btn btn-success btn-block" value="submit" name="forgot" />
                                <p className="text-muted text-center mt-4">
                                    Not A Member Yet?            <a href="#" className="text-success" data-toggle="modal" data-target="#register-modal" data-dismiss="modal">
                                        Join Now.            </a>
                                </p>
                            </form>
                        </div>
                        {/* <!--  Modal body ends --> */}
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default ForgotPassword;