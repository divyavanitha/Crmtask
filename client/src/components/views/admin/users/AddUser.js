import React, { Fragment, useState, FormEvent, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import { addNotification } from "../../../../_actions/admin/notifications.action";

const AddUser = (props) => {
    const dispatch = useDispatch();

    return (

        <Formik initialValues={{ first_name: '', last_name: '', email: '', mobile: '', password: '' }}
            validationSchema={Yup.object().shape({
                first_name: Yup.string()
                    .required('First Name is required'),
                last_name: Yup.string()
                    .required('Last Name is required'),
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                mobile: Yup.number()
                    .required('Mobile is required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is required'),
                confirm_password: Yup.string()
                    .required('Password is required')
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
            })}
            onSubmit={(values, { setSubmitting }) => {

                let data = {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    mobile: values.mobile,
                    password: values.password
                };

                //  dispatch(login(data));
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
                    <Fragment>
                        <h1 className="h3 mb-2 text-gray-800">Users</h1>
                        <p className="mb-4">User List</p>
                        <div className="row">
                            <Link class="btn btn-primary" style={{ float: "right" }} to="/admin/users">Back</Link>
                        </div>
                        <div className="col-xl-12 col-lg-12">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    create
                                    {/* <h6 className="m-0 font-weight-bold text-green">Product {(isCreate ? "create" : "edit")}</h6> */}
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <Field id="first_name" name="first_name" value={values.first_name} onChange={handleChange} maxLength={100} placeholder="First Name" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <Field id="last_name" name="last_name" value={values.last_name} onChange={handleChange} maxLength={100} placeholder="Last Name" className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <Field id="email" name="email" value={values.email} onChange={handleChange} maxLength={100} placeholder="Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <Field id="mobile" name="mobile" value={values.mobile} onChange={handleChange} maxLength={15} placeholder="Mobile" className={'form-control' + (errors.mobile && touched.mobile ? ' is-invalid' : '')} />
                                                <ErrorMessage name="mobile" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <Field id="password" name="password" value={values.password} onChange={handleChange} maxLength={60} type="password" placeholder="Password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <Field id="confirm_password" name="confirm_password" value={values.confirm_password} onChange={handleChange} type="password" placeholder="Confirm Password" className={'form-control' + (errors.confirm_password && touched.confirm_password ? ' is-invalid' : '')} />
                                                <ErrorMessage name="confirm_password" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>



                                        <button className="btn btn-danger">Cancel</button>
                                        <button type="submit" className={`btn btn-primary left-margin`}>Save</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );
            }}
        </Formik>
    );
};

export default AddUser;
