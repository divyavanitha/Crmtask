import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, social_login } from "../../../../_actions/user.action";
import { useEffect } from 'react';
import SocialButton from '../includes/SocialButton';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';

function Login() {

    const dispatch = useDispatch();

    let settings = useSelector((state) => state.settings);

    let social = settings.settings && settings.settings.social;

    const handleSocialLogin = (user) => {
        if(user._provider == 'google') {

            let dataToSubmit = {
                first_name: user._profile.firstName,
                last_name: user._profile.lastName,
                email: user._profile.email,
                mobile: user._profile.mobile,
                profile_photo: user._profile.profilePicURL,
                social_unique_id: user._profile.id,
                login_by: 'GOOGLE'
            };

            dispatch(social_login(dataToSubmit)).then((res) => {
                $('#login-modal').modal('hide');
            })

        } else if(user._provider == 'facebook') {

            let dataToSubmit = {
                first_name: user._profile.firstName,
                last_name: user._profile.lastName,
                email: user._profile.email,
                mobile: user._profile.mobile,
                profile_photo: user._profile.profilePicURL,
                social_unique_id: user._profile.id,
                login_by: 'FACEBOOK'
            };

            dispatch(social_login(dataToSubmit)).then((res) => {
                $('#login-modal').modal('hide');
            })

        }
    }

    const handleSocialLoginFailure = (err) => {
        console.error(err)
    }

    return (
        <Formik

            enableReinitialize

            initialValues={{
                email: 'demo@demo.com',
                password: '123456',
            }}

            validationSchema={Yup.object().shape({
                email: Yup.string().required('Email is required'),
                password: Yup.string().required('Password is required'),
            })}

            onSubmit={(values, { setSubmitting }) => {

                setTimeout(() => {
                    let dataToSubmit = {
                        email: values.email,
                        password: values.password
                    };

                    dispatch(login(dataToSubmit)).then((res) => {
                        $('#login-modal').modal('hide');
                    })

                    setSubmitting(false);
                }, 500);
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = props;

                return (
                    <Fragment>
                        <div className="modal fade login" id="login-modal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        {/* <!--  Modal header start --> */}
                                        <i className="fa fa-sign-in fa-log"></i>
                                        <h5 className="modal-title">Login To Your Account</h5>
                                        <button className="close" type="button" data-dismiss="modal"><span>&times;</span></button>
                                    </div>
                                    {/* <!--  Modal header end --> */}
                                    <div className="modal-body">
                                        {/* <!--  Modal body start --> */}
                                        <form onSubmit={handleSubmit} >
                                            <div className="form-group">
                                                <label className="form-group-label"> Email</label>
                                                <Field type="email" name="email" value={values.email} onChange={handleChange} placeholder="Enter Your Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-group-label"> Password</label>
                                                <Field type="password" name="password" value={values.password} onChange={handleChange} placeholder="Enter Your Password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                            </div>
                                            <button type="submit" className="btn btn-success btn-block">Login Now</button>
                                        </form>
                                        <div className="clearfix"></div>

                                        { social && social.status == 1 && (social.facebookAppId != "" || social.googleClientId != "" ) &&
                                        <Fragment>
                                            <div className="text-center pt-4 pb-2">OR</div>
                                            <hr />
                                            <div className="line mt-3"><span></span></div>
                                            <div className="text-center">
                                                <SocialButton className="btn btn-success btn-fb-connect" provider='facebook' appId={social.facebookAppId} onLoginSuccess={handleSocialLogin} onLoginFailure={handleSocialLoginFailure} > <i className="fa fa-facebook"></i> FACEBOOK </SocialButton>
                                                &nbsp; &nbsp;
                                                <SocialButton className="btn btn-danger btn-gplus-connect" provider='google' appId={social.googleClientId} onLoginSuccess={handleSocialLogin} onLoginFailure={handleSocialLoginFailure} > <i className="fa fa-google"></i> GOOGLE </SocialButton>
                                            </div>
                                        <div className="clearfix"></div>
                                        </Fragment>
                                        }

                                        <div className="text-center mt-3">
                                            <a href="#" className="text-success" data-toggle="modal" data-target="#register-modal" data-dismiss="modal">
                                                Not Registered?          </a>
               &nbsp; &nbsp; | &nbsp; &nbsp;
               <a href="#" className="text-success" data-toggle="modal" data-target="#forgot-modal" data-dismiss="modal">
                                                Forgot Password?          </a>
                                        </div>
                                    </div>
                                    {/* <!--  Modal body ends --> */}
                                </div>
                            </div>
                        </div>

                    </Fragment>
                );
            }}
        </Formik>
    );
};

export default Login;