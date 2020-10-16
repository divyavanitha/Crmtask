import React, { useState, FormEvent, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, withRouter, useHistory } from "react-router-dom";
import { login } from "../../../../_actions/admin/auth.action";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Notifications from "../common/Notification";

const Login = (props) => {
    const dispatch = useDispatch();

    return (

        <Formik initialValues={{ email: 'admin@demo.com', password: '123456' }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {

                let data = {
                    email: values.email,
                    password: values.password
                };

                dispatch(login(data))

                setSubmitting(false);
            }}>
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
                    <div className="container">
                        <Notifications />
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-lg-5">
                                <div className="card o-hidden border-0 shadow-lg my-5">
                                    <div className="card-body p-0">
                                        <div className="row">
                                            <div className="col-lg-12" style={{ paddingBottom: "15px" }}>
                                                <div className="p-5">
                                                    <div className="text-center">
                                                        <h1 className="h4 text-gray-900 mb-4">Login!</h1>
                                                    </div>
                                                    <form className="user" onSubmit={handleSubmit}>
                                                        <div className="form-group">
                                                            <Field id="email" name="email" value={values.email} onChange={handleChange} maxLength={100} placeholder="Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                        </div>
                                                        <div className="form-group">
                                                            <Field id="password" name="password" value={values.password} onChange={handleChange} maxLength={100} type="password" placeholder="Password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                        </div>


                                                        <div className="form-group"><button className="btn btn-primary btn-user btn-block" type="submit"> Login </button></div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
};

export default withRouter(Login);
