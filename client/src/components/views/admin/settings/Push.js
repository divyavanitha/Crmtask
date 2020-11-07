import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Switch, Route } from "react-router";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'

import { addCategory, getCategorybyId, updateCategory } from "../../../../_actions/admin/category.action";

const Push = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();

    let history = useHistory();
    const params = useParams();
    useEffect(() => {

        dispatch(getCategorybyId(params.id))

    }, [params.id]);
    const category = useSelector(state => state.categories && state.categories.category && state.categories.category.responseData.category);

    return (

        <Formik

            enableReinitialize
            initialValues={{
                id: '',
                title: '',
                description: '',
                logo: '',
                favicon: '',
                mobile: '',
                email: '',
                copyright: ''

            }
            }

            validationSchema={Yup.object().shape({
                title: Yup.string().required('Title is required'),
                description: Yup.string().required('Description is required'),
                logo: Yup.string().required('Logo is required'),
                favicon: Yup.string().required('Favicon is required'),
                mobile: Yup.string().required('Mobile Number is required'),
                email: Yup.string().required('Email Address is required'),
                copyright: Yup.string().required('Copyright content is required')
            })}
            onSubmit={(values, { setSubmitting }) => {

                let data = {
                    id: values.id,
                    title: values.title,
                    description: values.description,
                    logo: values.logo,
                    favicon: values.favicon,
                    mobile: values.mobile,
                    email: values.email,
                    copyright: values.copyright
                };

                if (params.id) {
                    dispatch(updateCategory(data)).then(res => {
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        history.push('/admin/category/')
                    })
                } else {
                    dispatch(addCategory(data)).then(res => {
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                    })
                }
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
                                        <div className="page-header">
                                            <div className="page-title">
                                                <h1><i className="menu-icon fa fa-gear"></i> Settings / Push Notification </h1>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">

                                    <div className="box box-block bg-white">
                                        <div style={{ padding: '0px' }} className="">
                                            <div className="tab-container">
                                                <Link to="/admin/settings/general" className="tab-item">General</Link>
                                                <Link to="/admin/settings/social/links" className="tab-item">Social Links</Link>
                                                <Link to="/admin/settings/push" className="tab-item active">Push Notification</Link>
                                                <Link to="/admin/settings/social" className="tab-item">Social Config</Link>
                                                <Link to="/admin/settings/sms" className="tab-item">SMS Config</Link>
                                                <Link to="/admin/settings/mail" className="tab-item">Mail Settings</Link>
                                                <Link to="/admin/settings/payment" className="tab-item">Payment Config</Link>
                                            </div>
                                        </div>
                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">


                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> IOS Push Environment : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="title" name="title" value={values.title} onChange={handleChange} maxLength={100} placeholder="Title" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> IOS Push Pem : </label>
                                                    <div className="col-md-6">
                                                        <input type="file" name="logo" value={values.logo} onChange={handleChange} maxLength={100} placeholder="Logo" className={'form-control' + (errors.logo && touched.logo ? ' is-invalid' : '')} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> IOS Push Password : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="mobile" name="mobile" value={values.mobile} onChange={handleChange} maxLength={100} placeholder="Mobile Number" className={'form-control' + (errors.mobile && touched.mobile ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="mobile" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Android Push Key : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="email" name="email" value={values.email} onChange={handleChange} maxLength={100} placeholder="Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"></label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <button type="submit" className="btn btn-success mr-3">Update</button>
                                                        <button type="reset" className="btn btn-outline">Cancel</button>
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

export default Push;