import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'

import { addUser, getUserbyId, updateUser } from "../../../../_actions/admin/user.action";

const AddCategory = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();

    let history = useHistory();
    const params = useParams();
    useEffect(() => {

        dispatch(getUserbyId(params.id))

    }, [params.id]);
    const user = useSelector(state => state.users && state.users.user && state.users.user.responseData && state.users.user.responseData.user);

    return (

        <Formik

            enableReinitialize
            initialValues={{
                id: user ? user._id : '',
                firstName: user ? user.firstName : '',
                lastName: user ? user.lastName : '',
                email: user ? user.email : '',
                mobile: user ? user.mobile : '',
                //password: user ? user.password : '',

            }
            }

            validationSchema={Yup.object().shape({
                firstName: Yup.string()
                    .required('First Name is required'),
                lastName: Yup.string()
                    .required('Last Name is required'),
                email: Yup.string()
                    .required('Email is required'),
                mobile: Yup.string()
                    .required('Mobile is required'),
                password: Yup.string()
                    .required('Password is required'),
                confirm_password: Yup.string()
                    .required('Confirm Password is required'),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {

                let data = {
                    id: values.id,
                    first_name: values.firstName,
                    last_name: values.lastName,
                    email: values.email,
                    mobile: values.mobile,
                    password: values.password,
                    confirm_password: values.confirm_password
                };

                if (params.id) {
                    dispatch(updateUser(data)).then(res => {
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        history.push('/admin/user/')
                    })
                } else {
                    dispatch(addUser(data)).then(res => {
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                    })
                }
                resetForm();
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


                        <div className="container">
                            <div className="breadcrumbs">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="page-header float-left">
                                            <div className="page-title">
                                                <h1><i className="menu-icon fa fa-cubes"></i> Users / {params.id ? "Edit User" : "Add User"} </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="box box-block bg-white">
                                        <h5 className="mb-1">{params.id ? "Edit User" : "Add User"}
                                            <div className="rightBtn-Group">
                                                <Link className="addMoreBtn" to="/admin/user" ><span className="txt text-capitalize"><span className="amIcon"><i className="fa fa-arrow-left"></i></span> Back</span></Link>
                                            </div>
                                        </h5>


                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"> First Name : </label>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Field type="text" id="firstName" name="firstName" value={values.firstName} onChange={handleChange} maxLength={100} placeholder="First Name" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"> Last Name : </label>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Field type="text" id="lastName" name="lastName" value={values.lastName} onChange={handleChange} maxLength={100} placeholder="Last Name" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"> Email : </label>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Field type="text" id="email" name="email" value={values.email} onChange={handleChange} maxLength={100} placeholder="Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"> Mobile : </label>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Field type="text" id="mobile" name="mobile" value={values.mobile} onChange={handleChange} maxLength={100} placeholder="Mobile" className={'form-control' + (errors.mobile && touched.mobile ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="mobile" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>


                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"> Password : </label>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Field type="password" name="password" value={values.password} onChange={handleChange} placeholder="Enter Your Password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"> Confirm Password : </label>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Field type="password" name="confirm_password" value={values.confirm_password} onChange={handleChange} placeholder="Enter Your Password Again" className={'form-control' + (errors.confirm_password && touched.confirm_password ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="confirm_password" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"></label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        {params.id ? <button type="submit" className="btn btn-success mr-3">Update</button> : <button type="submit" className="btn btn-success mr-3">Save</button>}
                                                        {params.id ? <Link className="btn btn-outline" to="/admin/category">Cancel</Link> : <button onClick={handleReset} className="btn btn-outline mr-3">Reset</button>}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
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

export default AddCategory;