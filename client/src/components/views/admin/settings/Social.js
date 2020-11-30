import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Switch, Route } from "react-router";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'
import $ from 'jquery';

import { getSetting, updateSocialSetting } from "../../../../_actions/admin/setting.action";

const Social = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getSetting())

    }, []);

    const settings = useSelector(state => state);

    let social = settings && settings.adminsettings && settings.adminsettings.setting && settings.adminsettings.setting.social;

    $('body').on('change', '.toggle_switch', function () {
        var that = $(this);
        if ($(this).is(':checked')) {
            that.closest('.main_container').find('.hide_container').show();
        } else {
            that.closest('.main_container').find('.hide_container').hide();
        }
    })

    return (

        <Formik

            enableReinitialize
            initialValues={{
                status: social ? social.status : null,
                facebook_app_id: social ? social.facebookAppId : '',
                google_client_id: social ? social.googleClientId : '',
                apple_id: social ? social.appleId : ''

            }
            }

            onSubmit={(values, { setSubmitting }) => {

                let data = {
                    status: values.status,
                    facebook_app_id: values.facebook_app_id,
                    google_client_id: values.google_client_id,
                    apple_id: values.apple_id
                };

                dispatch(updateSocialSetting(data)).then(res => {
                    addToast(res.message, { appearance: res.status, autoDismiss: true, })
                })
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
                    setFieldValue,
                } = props;

                return (
                    <Fragment>


                        <div className="container">
                            <div className="breadcrumbs">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="page-header">
                                            <div className="page-title">
                                                <h1><i className="menu-icon fa fa-gear"></i> Settings / Social Config </h1>
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
                                                <Link to="/admin/settings/push" className="tab-item">Push Notification</Link>
                                                <Link to="/admin/settings/social" className="tab-item active">Social Config</Link>
                                                <Link to="/admin/settings/sms" className="tab-item">SMS Config</Link>
                                                <Link to="/admin/settings/mail" className="tab-item">Mail Settings</Link>
                                                <Link to="/admin/settings/payment" className="tab-item">Payment Config</Link>
                                            </div>
                                        </div>
                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                <div className="main_container">
                                                    <div className="form-group row">
                                                        <label className="col-md-4 control-label"> Social Login : </label>
                                                        <div className="col-md-6">
                                                            <label className='switch' style={{ marginTop: '15px' }}>
                                                                <input type='checkbox' className='toggle_switch' defaultChecked={social && social.status} onClick={(e) => { setFieldValue('status', e.currentTarget.checked); }} />   <span className='slider round'></span></label>
                                                        </div>
                                                    </div>
                                                    <div className="hide_container" style={social && social.status == 1 ? { display: 'block', paddingBottom: '15px' } : { display: 'none', paddingBottom: '15px' }} >
                                                        <div className="form-group row">
                                                            <label className="col-md-4 control-label"> Facebook App ID : </label>
                                                            <div className="col-md-6">
                                                                <Field type="text" id="facebook_app_id" name="facebook_app_id" value={values.facebook_app_id} onChange={handleChange} maxLength={100} placeholder="Facebook App ID" className={'form-control' + (errors.facebook_app_id && touched.facebook_app_id ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="facebook_app_id" component="div" className="invalid-feedback" />
                                                            </div>
                                                        </div>



                                                        <div className="form-group row">
                                                            <label className="col-md-4 control-label"> Google Client ID : </label>
                                                            <div className="col-md-6">
                                                                <Field type="text" id="google_client_id" name="google_client_id" value={values.google_client_id} onChange={handleChange} maxLength={100} placeholder="Google Client ID" className={'form-control' + (errors.google_client_id && touched.google_client_id ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="google_client_id" component="div" className="invalid-feedback" />
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label className="col-md-4 control-label"> Apple ID : </label>
                                                            <div className="col-md-6">
                                                                <Field type="text" id="apple_id" name="apple_id" value={values.apple_id} onChange={handleChange} maxLength={100} placeholder="Apple ID" className={'form-control' + (errors.apple_id && touched.apple_id ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="apple_id" component="div" className="invalid-feedback" />
                                                            </div>
                                                        </div>

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

export default Social;