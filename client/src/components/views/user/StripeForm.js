import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, social_login } from "../../../_actions/user.action";
import { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';

function StripeForm() {

    const dispatch = useDispatch();

    let settings = useSelector((state) => state.settings);


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
                        $('#stripe-modal').modal('hide');
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
                        <div className="modal fade stripe" id="stripe-modal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <i className="fa fa-sign-in fa-log"></i>
                                        <h5 className="modal-title">Enter Card Details</h5>
                                        <button className="close" type="button" data-dismiss="modal"><span>&times;</span></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={handleSubmit} >
                                            <div className="form-group">
                                                <Field type="text" name="name" value={values.name} onChange={handleChange} placeholder="Enter Your Name" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <Field type="text" name="number" value={values.number} maxLength="16" onChange={handleChange} placeholder="Enter Card Number" className={'form-control numbers' + (errors.number && touched.number ? ' is-invalid' : '')} />
                                                <ErrorMessage name="number" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <div class="row">
                                                    <div class="col-md-4 col-sm-12">
                                                        <Field type="text" name="month" value={values.month} maxLength="2" onChange={handleChange} placeholder="Month" className={'form-control numbers' + (errors.month && touched.month ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="month" component="div" className="invalid-feedback" />
                                                    </div>
                                                    
                                                    <div class="col-md-4 col-sm-12">
                                                        <Field type="text" name="year" value={values.year} maxLength="4" onChange={handleChange} placeholder="Year" className={'form-control numbers' + (errors.year && touched.year ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="year" component="div" className="invalid-feedback" />
                                                    </div>
                                                    
                                                    <div class="col-md-4 col-sm-12">
                                                        <Field type="text" name="cvc" value={values.cvc} maxLength="3" onChange={handleChange} placeholder="CVC" className={'form-control numbers' + (errors.cvc && touched.cvc ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="cvc" component="div" className="invalid-feedback" />
                                                    </div>

                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-success btn-block">Add Card</button>
                                        </form>
                                      
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Fragment>
                );
            }}
        </Formik>
    );
};

export default StripeForm;