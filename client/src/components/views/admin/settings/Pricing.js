import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'

import { getSetting, updatePricingSetting } from "../../../../_actions/admin/setting.action";

const GigSetting = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getSetting())

    }, []);

    const settings = useSelector(state => state);

    const pricing = settings && settings.adminsettings && settings.adminsettings.setting && settings.adminsettings.setting.pricing;

    return (

        <Formik

            enableReinitialize
            initialValues={{
                commission_level_one: pricing ? pricing.commissionLevelOne : '',
                commission_level_two: pricing ? pricing.commissionLevelTwo : '',
                commission_top_rated: pricing ? pricing.commissionTopRated : '',
                commission: pricing ? pricing.commission : '',

            }
            }

            validationSchema={Yup.object().shape({
                commission_level_one: Yup.string().required('Commission Level One is required'),
                commission_level_two: Yup.string().required('Commission Level Two is required'),
                commission_top_rated: Yup.string().required('Commission Top Rated" is required'),
                commission: Yup.string().required('Commission is required')
            })}
            onSubmit={(values, { setSubmitting }) => {

                let data = {
                    commission_level_one: values.commission_level_one,
                    commission_level_two: values.commission_level_two,
                    commission_top_rated: values.commission_top_rated,
                    commission: values.commission
                };

                dispatch(updatePricingSetting(data)).then(res => {
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
                                                <h1><i className="menu-icon fa fa-gear"></i> Settings / Pricing </h1>
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
                                                <Link to="/admin/settings/gig" className="tab-item">Gig</Link>
                                                <Link to="/admin/settings/pricing" className="tab-item active">Pricing</Link>
                                            </div>
                                        </div>
                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">

                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Commission % For New Seller : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="commission_level_one" name="commission_level_one" value={values.commission_level_one} onChange={handleChange} maxLength={100} placeholder="Commission % For New Seller" className={'form-control' + (errors.commission_level_one && touched.commission_level_one ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="commission_level_one" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Commission % For Level One : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="commission_level_two" name="commission_level_two" value={values.commission_level_two} onChange={handleChange} maxLength={100} placeholder="Commission % For Level One" className={'form-control' + (errors.commission_level_two && touched.commission_level_two ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="commission_level_two" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Commission % For Level Two : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="commission_top_rated" name="commission_top_rated" value={values.commission_top_rated} onChange={handleChange} maxLength={100} placeholder="Commission % For Level Two" className={'form-control' + (errors.commission_top_rated && touched.commission_top_rated ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="commission_top_rated" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Commission % For Top Rated : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="commission" name="commission" value={values.commission} onChange={handleChange} maxLength={100} placeholder="Commission % For Top Rated" className={'form-control' + (errors.commission && touched.commission ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="commission" component="div" className="invalid-feedback" />
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