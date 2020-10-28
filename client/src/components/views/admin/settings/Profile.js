import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Switch, Route } from "react-router";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'

import { addCategory, getCategorybyId, updateCategory } from "../../../../_actions/admin/category.action";

const Profile = (props) => {
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
                playstore_link: '',
                appstore_link: '',
                facebook_link: '',
                twitter_link: ''

            }
            }

            validationSchema={Yup.object().shape({
            })}
            onSubmit={(values, { setSubmitting }) => {

                let data = {
                    playstore_link: values.playstore_link,
                    appstore_link: values.appstore_link,
                    facebook_link: values.facebook_link,
                    twitter_link: values.twitter_link
                }

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
                                    <div className="col-sm-4">
                                        <div className="page-header float-left">
                                            <div className="page-title">
                                                <h1><i className="menu-icon fa fa-gear"></i> Settings / Profile Links </h1>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">

                                    <div className="card">
                                        <div style={{ padding: '0px' }} className="card-header">
                                            <div className="tab-container">
                                                <Link to="/admin/settings/general" className="tab-item">General</Link>
                                                <Link to="/admin/settings/profile/links" className="tab-item active">Social Links</Link>
                                                <Link to="/admin/settings/push" className="tab-item">Push Notification</Link>
                                                <Link to="/admin/settings/social/links" className="tab-item">Social Config</Link>
                                                <Link to="/admin/settings/sms" className="tab-item">SMS Config</Link>
                                                <Link to="/admin/settings/mail" className="tab-item">Mail Settings</Link>
                                                <Link to="/admin/settings/payment" className="tab-item">Payment Config</Link>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">


                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Playstore link : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="playstore_link" name="playstore_link" value={values.playstore_link} onChange={handleChange} maxLength={100} placeholder="Playstore link" className={'form-control' + (errors.playstore_link && touched.playstore_link ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="playstore_link" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Appstore link : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="appstore_link" name="appstore_link" value={values.appstore_link} onChange={handleChange} maxLength={100} placeholder="Appstore link" className={'form-control' + (errors.appstore_link && touched.appstore_link ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="appstore_link" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Facebook link : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="facebook_link" name="facebook_link" value={values.facebook_link} onChange={handleChange} maxLength={100} placeholder="Facebook link" className={'form-control' + (errors.facebook_link && touched.facebook_link ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="facebook_link" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Twitter link : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="twitter_link" name="twitter_link" value={values.twitter_link} onChange={handleChange} maxLength={100} placeholder="Twitter link" className={'form-control' + (errors.twitter_link && touched.twitter_link ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="twitter_link" component="div" className="invalid-feedback" />
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

export default Profile;