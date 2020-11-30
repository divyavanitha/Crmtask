import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Switch, Route } from "react-router";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'
import $ from 'jquery';

import { getSetting, updateSmsSetting } from "../../../../_actions/admin/setting.action";

const Sms = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getSetting())

    }, []);

    const settings = useSelector(state => state);

    let sms = settings && settings.adminsettings && settings.adminsettings.setting && settings.adminsettings.setting.sms;

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
                status: sms ? sms.status : 0,
                provider: sms ? sms.provider : '',
                sid: sms ? sms.sid : '',
                token: sms ? sms.token : '',
                sender: sms ? sms.sender : '',

            }
            }

            validationSchema={Yup.object().shape({
                status: Yup.string().required('Status is required'),
                provider: Yup.string().required('Provider is required'),
                sid: Yup.string().required('SID is required'),
                token: Yup.string().required('TOken is required'),
                sender: Yup.string().required('Sender content is required')
            })}
            onSubmit={(values, { setSubmitting }) => {

                let data = {
                    status: values.status,
                    provider: values.provider,
                    sid: values.sid,
                    token: values.token,
                    sender: values.sender
                };

                dispatch(updateSmsSetting(data)).then(res => {
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
                                                <h1><i className="menu-icon fa fa-gear"></i> Settings / SMS Config </h1>
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
                                                <Link to="/admin/settings/social" className="tab-item">Social Config</Link>
                                                <Link to="/admin/settings/sms" className="tab-item active">SMS Config</Link>
                                                <Link to="/admin/settings/mail" className="tab-item">Mail Settings</Link>
                                                <Link to="/admin/settings/payment" className="tab-item">Payment Config</Link>
                                            </div>
                                        </div>
                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                <div className="main_container">
                                                    <div className="form-group row">
                                                        <label className="col-md-4 control-label"> {sms && sms.provider} : </label>
                                                        <div className="col-md-6">
                                                            <label className='switch' style={{ marginTop: '15px' }}>
                                                                <input type='checkbox' className='toggle_switch' defaultChecked={sms && sms.status} onClick={(e) => { setFieldValue('status', e.currentTarget.checked); }} />
                                                                <span className='slider round'></span></label>
                                                        </div>
                                                    </div>

                                                    <div className="hide_container" style={sms && sms.status == 1 ? { display: 'block', paddingBottom: '15px' } : { display: 'none', paddingBottom: '15px' }} >
                                                        <div className="form-group row">
                                                            <label className="col-md-4 control-label"> Account SID : </label>
                                                            <div className="col-md-6">
                                                                <Field type="text" id="sid" name="sid" value={values.sid} onChange={handleChange} maxLength={100} placeholder="SID" className={'form-control' + (errors.sid && touched.sid ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="sid" component="div" className="invalid-feedback" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-md-4 control-label"> Auth Token : </label>
                                                            <div className="col-md-6">
                                                                <Field type="text" id="token" name="token" value={values.token} onChange={handleChange} maxLength={100} placeholder="Token" className={'form-control' + (errors.token && touched.token ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="token" component="div" className="invalid-feedback" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-md-4 control-label"> Sender Number : </label>
                                                            <div className="col-md-6">
                                                                <Field type="text" id="sender" name="sender" value={values.sender} onChange={handleChange} maxLength={100} placeholder="Sender" className={'form-control' + (errors.sender && touched.sender ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="sender" component="div" className="invalid-feedback" />
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

export default Sms;