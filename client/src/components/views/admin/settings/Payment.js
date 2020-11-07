import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Switch, Route } from "react-router";
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'
import $ from 'jquery';

import { getSetting, updatePaymentSetting } from "../../../../_actions/admin/setting.action";

const Payment = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getSetting())

    }, []);

    const settings = useSelector(state => state);

    let payment = settings && settings.adminsettings && settings.adminsettings.setting && settings.adminsettings.setting.payment;

    $('body').on('change', '.toggle_switch', function () {
        var that = $(this);
        if ($(this).is(':checked')) {
            that.closest('.main_container').find('.hide_container').show();
        } else {
            that.closest('.main_container').find('.hide_container').hide();
        }
    })

    let name = [];
    let status = [];

    let initial = {}

    if (payment) {

        for (let pay of payment) {
            name.push(pay.name);
            status.push(pay.status);
            window[`${pay.name}_name`] = [];
            window[`${pay.name}_value`] = [];

            for (let credential of pay.credentials) {
                window[`${pay.name}_name`].push(credential.name);
                window[`${pay.name}_value`].push(credential.value);
            }

            initial[`${pay.name}_name`] = window[`${pay.name}_name`];
            initial[`${pay.name}_value`] = window[`${pay.name}_value`];
        }

        initial.name = name;
        initial.status = status;

    }

    return (

        <Formik

            enableReinitialize

            initialValues={initial}

            validationSchema={Yup.object().shape({
            })}
            onSubmit={(values, { setSubmitting }) => {
                let payment = [];
                for (let i in values.name) {
                    var obj = {};
                    obj.name = (values.name)[i];
                    obj.status = (values.status)[i];
                    let credentials = [];
                    for (let j in values[`${(values.name)[i]}_name`]) {
                        var cred = {};
                        cred.name = values[`${(values.name)[i]}_name`][j];
                        cred.value = values[`${(values.name)[i]}_value`][j];
                        credentials.push(cred)
                    }
                    obj.credentials = credentials;
                    payment.push(obj)
                }
                let data = { payment: payment };
                console.log(data)

                dispatch(updatePaymentSetting(data)).then(res => {
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
                                                <Link to="/admin/settings/sms" className="tab-item">SMS Config</Link>
                                                <Link to="/admin/settings/mail" className="tab-item">Mail Settings</Link>
                                                <Link to="/admin/settings/payment" className="tab-item active">Payment Config</Link>
                                            </div>
                                        </div>
                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">

                                                {payment && payment.map((pay, index) => (

                                                    <div key={index} className="main_container">
                                                        <div className="form-group row">
                                                            <label className="col-md-4 control-label"> {(pay.name).charAt(0).toUpperCase() + (pay.name).slice(1).toLowerCase()} : </label>
                                                            <div className="col-md-6">
                                                                <label className='switch' style={{ marginTop: '15px' }}>
                                                                    <input type="checkbox" id={`status.${index}`} name={`status.${index}`} value={`status.${index}`} defaultChecked={pay && pay.status} onClick={(e) => { setFieldValue(`status.${index}`, e.currentTarget.checked); }} className='toggle_switch' />
                                                                    <span className='slider round'></span></label>
                                                            </div>
                                                        </div>

                                                        <div className="hide_container" style={pay.status == 0 ? { display: 'none', paddingBottom: '15px', paddingTop: '15px' } : { paddingBottom: '15px', paddingTop: '15px' }} >
                                                            {pay && pay.credentials.map((credential, i) => (
                                                                <div key={i} className="form-group row">
                                                                    <label className="col-md-4 control-label"> {(credential.name).charAt(0).toUpperCase() + ((credential.name).slice(1).toLowerCase()).replace("_", " ")} : </label>
                                                                    <div className="col-md-6">
                                                                        <Field type="text" id={`${pay.name}_${credential.name}.${i}`} name={`${pay.name}_value.${i}`} onChange={handleChange} placeholder={(credential.name).charAt(0).toUpperCase() + ((credential.name).slice(1).toLowerCase()).replace("_", " ")} className='form-control' />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                    </div>
                                                ))}

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

export default Payment;