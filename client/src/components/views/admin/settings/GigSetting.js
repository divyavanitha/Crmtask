import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'

import { getSetting, updateGigSetting } from "../../../../_actions/admin/setting.action";

const GigSetting = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getSetting())

    }, []);

    const settings = useSelector(state => state);

    const gig = settings && settings.adminsettings && settings.adminsettings.setting && settings.adminsettings.setting.gig;

    return (

        <Formik

            enableReinitialize
            initialValues={{
                minimum_withdrawal_period: gig ? gig.minimumWithdrawalPeriod : '',
                minimum_gig_price: gig ? gig.minimumGigPrice : '',
                minimum_withdrawal_limit: gig ? gig.minimumWithdrawalLimit : '',
                featured_gig_price: gig ? gig.featuredGigPrice : '',
                featured_gig_duration: gig ? gig.featuredGigDuration : '',
                processing_fee: gig ? gig.processingFee : ''

            }
            }

            validationSchema={Yup.object().shape({
                minimum_withdrawal_period: Yup.string().required('Minimum Withdrawal Period is required'),
                minimum_gig_price: Yup.string().required('Minimum Gig Price is required'),
                minimum_withdrawal_limit: Yup.string().required('Minimum Withdrawal Limit is required'),
                featured_gig_price: Yup.string().required('Featured Gig Price is required'),
                featured_gig_duration: Yup.string().required('Featured Gig Duration is required'),
                processing_fee: Yup.string().required('Processing Fee is required')
            })}
            onSubmit={(values, { setSubmitting }) => {


                let data = {
                    minimum_withdrawal_period: values.minimum_withdrawal_period,
                    minimum_gig_price: values.minimum_gig_price,
                    minimum_withdrawal_limit: values.minimum_withdrawal_limit,
                    featured_gig_price: values.featured_gig_price,
                    featured_gig_duration: values.featured_gig_duration,
                    processing_fee: values.processing_fee
                };

                dispatch(updateGigSetting(data)).then(res => {
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
                    setFieldValue
                } = props;

                return (
                    <Fragment>


                        <div className="container">
                            <div className="breadcrumbs">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="page-header float-left">
                                            <div className="page-title">
                                                <h1><i className="menu-icon fa fa-gear"></i> Settings / Gig </h1>
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
                                                <Link to="/admin/settings/application" className="tab-item">Application</Link>
                                                <Link to="/admin/settings/seller" className="tab-item">Seller</Link>
                                                <Link to="/admin/settings/gig" className="tab-item active">Gig</Link>
                                                <Link to="/admin/settings/pricing" className="tab-item">Pricing</Link>
                                            </div>
                                        </div>
                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">

                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Days Before Withdrawal : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="minimum_withdrawal_period" name="minimum_withdrawal_period" value={values.minimum_withdrawal_period} onChange={handleChange} maxLength={100} placeholder="Days Before Withdrawal" className={'form-control' + (errors.minimum_withdrawal_period && touched.minimum_withdrawal_period ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="minimum_withdrawal_period" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Minimum Proposal Price : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="minimum_gig_price" name="minimum_gig_price" value={values.minimum_gig_price} onChange={handleChange} maxLength={100} placeholder="Minimum Proposal Price" className={'form-control' + (errors.minimum_gig_price && touched.minimum_gig_price ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="minimum_gig_price" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Minimum Withdrawal Limit : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="minimum_withdrawal_limit" name="minimum_withdrawal_limit" value={values.minimum_withdrawal_limit} onChange={handleChange} maxLength={100} placeholder="Minimum Withdrawal Limit " className={'form-control' + (errors.minimum_withdrawal_limit && touched.minimum_withdrawal_limit ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="minimum_withdrawal_limit" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Featured Proposal Listing Fee : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="featured_gig_price" name="featured_gig_price" value={values.featured_gig_price} onChange={handleChange} maxLength={100} placeholder="Featured Proposal Listing Fee" className={'form-control' + (errors.featured_gig_price && touched.featured_gig_price ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="featured_gig_price" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Featured Listing Duration  : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="featured_gig_duration" name="featured_gig_duration" value={values.featured_gig_duration} onChange={handleChange} maxLength={100} placeholder="Featured Listing Duration" className={'form-control' + (errors.featured_gig_duration && touched.featured_gig_duration ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="featured_gig_duration" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Processing Fee : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="processing_fee" name="processing_fee" value={values.processing_fee} onChange={handleChange} maxLength={100} placeholder="Processing Fee" className={'form-control' + (errors.processing_fee && touched.processing_fee ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="processing_fee" component="div" className="invalid-feedback" />
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

export default GigSetting;