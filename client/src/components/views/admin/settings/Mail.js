import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Switch, Route } from "react-router";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'
import $ from 'jquery';

import { getSetting, updateMailSetting } from "../../../../_actions/admin/setting.action";

const Mail = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getSetting())

    }, []);

    const settings = useSelector(state => state);

    let mail = settings  && settings.adminsettings && settings.adminsettings.setting && settings.adminsettings.setting.mail;

    $('body').on('change', '.toggle_switch', function() {
        var that = $(this);
        if($(this).is(':checked')) {
            that.closest('.main_container').find('.hide_container').show();
        } else {
            that.closest('.main_container').find('.hide_container').hide();
        }
    })

    return (

        <Formik

            enableReinitialize
            initialValues={{
                status: mail ? mail.status : 0,
                service: mail ? mail.provider : '',
                username: mail ? mail.username : '',
                password: mail ? mail.password : '',
                from: mail ? mail.from : ''

            }
            }

            validationSchema={Yup.object().shape({
                username: Yup.string().required('Username is required'),
                password: Yup.string().required('Password is required'),
                from: Yup.string().required('From Address is required')
            })}
            onSubmit={(values, { setSubmitting }) => {

                let data = {
                    status: values.status,
                    service: values.service,
                    username: values.username,
                    password: values.password,
                    from: values.from
                };

                dispatch(updateMailSetting(data)).then(res => {
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
                                                <h1><i className="menu-icon fa fa-gear"></i> Settings / Mail Server Config </h1>
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
                                                <Link to="/admin/settings/sms" className="tab-item">SMS Config</Link>
                                                <Link to="/admin/settings/mail" className="tab-item active">Mail Settings</Link>
                                                <Link to="/admin/settings/payment" className="tab-item">Payment Config</Link>
                                            </div>
                                        </div>
                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                            <div className="main_container">
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Send Mail : </label>
                                                    <div className="col-md-6">
                                                        <label className='switch' style={{ marginTop: '15px' }}>
                                                        <input type='checkbox' className='toggle_switch' defaultChecked={mail && mail.status} onClick={ (e) => { setFieldValue('status', e.currentTarget.checked); } }  />
                                                            <span className='slider round'></span></label>
                                                    </div>
                                                </div>

                                                <div className="hide_container" style={ mail && mail.status == 1 ? { display:'block', paddingBottom: '15px'} : { display:'none', paddingBottom: '15px'}} >
                                                    <div className="form-group row">
                                                        <label className="col-md-4 control-label"> Username : </label>
                                                        <div className="col-md-6">
                                                            <Field type="text" id="username" name="username" value={values.username} onChange={handleChange} maxLength={100} placeholder="Username" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-md-4 control-label"> Password : </label>
                                                        <div className="col-md-6">
                                                            <Field type="password" id="password" name="password" value={values.password} onChange={handleChange} maxLength={100} placeholder="Password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-md-4 control-label"> From Address : </label>
                                                        <div className="col-md-6">
                                                            <Field type="text" id="from" name="from" value={values.from} onChange={handleChange} maxLength={100} placeholder="From" className={'form-control' + (errors.from && touched.from ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="from" component="div" className="invalid-feedback" />
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

export default Mail;