import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { register } from "../../../../_actions/user.action";
import * as Yup from 'yup';
import $ from 'jquery';

function Register() {

    const dispatch = useDispatch();

    return (
        <Formik
        
        enableReinitialize

            initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                mobile: '',
                password: '',
                confirm_password: '',
            }}

            validationSchema={Yup.object().shape({
                first_name: Yup.string().required('First Name is required'),
                last_name: Yup.string().required('Last Name is required'),
                email: Yup.string().required('Email is required'),
                mobile: Yup.string().required('Mobile is required'),
                password: Yup.string().required('Password is required'),
                confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords does not match') .required('Confirm Password is required')
            })}

            onSubmit={(values, { setSubmitting }) => {

                setTimeout(() => {
                    let dataToSubmit = {
                        first_name: values.first_name,
                        last_name: values.last_name,
                        email: values.email,
                        mobile: values.mobile,
                        password: values.password,
                        confirm_password: values.confirm_password
                    };

                    dispatch(register(dataToSubmit)).then((res) => {
                        $('#register-modal').modal('hide');
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
                        <div className="modal fade" id="register-modal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        {/* <!--  modal-header Starts --> */}
                                        <i className="fa fa-user-plus"></i>
                                        <h5 className="modal-title"> Register Account </h5>
                                        <button className="close" data-dismiss="modal"><span>&times;</span></button>
                                    </div>
                                    {/* <!--  modal-header Ends --> */}
                                    <div className="modal-body">
                                        {/* <!--  modal-body Starts --> */}
                                        <form onSubmit={handleSubmit} className="pb-3">
                                            <div className="form-group">
                                                <label className="form-control-label font-weight-bold"> First Name </label>
                                                <Field type="text" name="first_name" value={values.first_name} onChange={handleChange} placeholder="Enter Your First Name" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-control-label font-weight-bold"> Last Name </label>
                                                <Field type="text" name="last_name" value={values.last_name} onChange={handleChange} placeholder="Enter Your Last Name" className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-control-label font-weight-bold"> Email </label>
                                                <Field type="email" name="email" value={values.email} onChange={handleChange} placeholder="Enter Your Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-control-label font-weight-bold"> Mobile </label>
                                                <Field type="text" name="mobile" value={values.mobile} onChange={handleChange} placeholder="Enter Your Mobile" className={'form-control' + (errors.mobile && touched.mobile ? ' is-invalid' : '')} />
                                                <ErrorMessage name="mobile" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-control-label font-weight-bold"> Password </label>
                                                <Field type="password" name="password" value={values.password} onChange={handleChange} placeholder="Enter Your Password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-control-label font-weight-bold"> Confirm Password: </label>
                                                <Field type="password" name="confirm_password" value={values.confirm_password} onChange={handleChange} placeholder="Enter Your Password Again" className={'form-control' + (errors.confirm_password && touched.confirm_password ? ' is-invalid' : '')} />
                                                <ErrorMessage name="confirm_password" component="div" className="invalid-feedback" />
                                            </div>
                                            {/* <div className="form-group">
                                    <input type="checkbox" style={{ position: "relative", top: "1px" }} id="check" value="1" required="" />
                                    <label htmlFor="check">
                                        I Accept
                  <a className="text-success" href="terms_and_conditions">Terms And Conditions</a>
                                    </label>
                                </div> */}
                                            <input type="submit" name="register" className="btn btn-success btn-block" value="Register Now" />
                                        </form>
                                        <div className="clearfix"></div>
                                        <div className="text-center">or, register with either:</div>
                                        <hr />
                                        <div className="line mt-3"><span></span></div>
                                        <div className="text-center">
                                            <a href="#" className="btn btn-success btn-fb-connect" >
                                                <i className="fa fa-facebook"></i> FACEBOOK
               </a>
                                            <a href="#" className="btn btn-danger btn-gplus-connect " >
                                                <i className="fa fa-google"></i> GOOGLE
               </a>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="text-center mt-3 text-muted">
                                            Already Have An Account?          <a href="#" className="text-success" data-toggle="modal" data-target="#login-modal" data-dismiss="modal">
                                                Login Now          </a>
                                        </div>
                                    </div>
                                    {/* <!--  modal-body Ends --> */}
                                </div>
                            </div>
                        </div>

                    </Fragment>
                );
            }}
        </Formik>
    );
};

export default Register;