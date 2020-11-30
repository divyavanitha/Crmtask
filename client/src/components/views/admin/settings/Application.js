import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'

import { getSetting, updateApplicationSetting } from "../../../../_actions/admin/setting.action";

const Application = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getSetting())

    }, []);

    const settings = useSelector(state => state);

    const application = settings && settings.adminsettings && settings.adminsettings.setting && settings.adminsettings.setting.application;

    return (

        <Formik

            enableReinitialize
            initialValues={{
                manual_approval: application ? application.manualApproval : '',
                edit_approval: application ? application.editApproval : '',
                manual_buyer_request_approval: application ? application.manualBuyerRequestApproval : '',
                refer_gig: application ? application.referGig : ''

            }
            }

            validationSchema={Yup.object().shape({
                manual_approval: Yup.string().required('Manual Approval is required'),
                edit_approval: Yup.string().required('Edit Approval is required'),
                manual_buyer_request_approval: Yup.string().required('Manual Buyer Request Approval is required'),
                refer_gig: Yup.string().required('Refer Gig is required')
            })}
            onSubmit={(values, { setSubmitting }) => {

                let data = {
                    manual_approval: values.manual_approval,
                    edit_approval: values.edit_approval,
                    manual_buyer_request_approval: values.manual_buyer_request_approval,
                    refer_gig: values.refer_gig
                };

                dispatch(updateApplicationSetting(data)).then(res => {
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
                                                <h1><i className="menu-icon fa fa-gear"></i> Settings / Application </h1>
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
                                                <Link to="/admin/settings/application" className="tab-item active">Application</Link>
                                                <Link to="/admin/settings/seller" className="tab-item">Seller</Link>
                                                <Link to="/admin/settings/gig" className="tab-item">Gig</Link>
                                                <Link to="/admin/settings/pricing" className="tab-item">Pricing</Link>
                                            </div>
                                        </div>
                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">


                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Manually Gig Approvals : </label>
                                                    <div className="col-md-6">
                                                        <Field as="select" id="manual_approval" name="manual_approval" value={values.manual_approval} onChange={handleChange} className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} >
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </Field>
                                                        <ErrorMessage name="manual_approval" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Enable edited proposals to be submitted for approval : </label>
                                                    <div className="col-md-6">
                                                        <Field as="select" id="edit_approval" name="edit_approval" value={values.edit_approval} onChange={handleChange} className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} >
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </Field>
                                                        <ErrorMessage name="edit_approval" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Manual buyer request approval : </label>
                                                    <div className="col-md-6">
                                                        <Field as="select" id="manual_buyer_request_approval" name="manual_buyer_request_approval" value={values.manual_buyer_request_approval} onChange={handleChange} className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} >
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </Field>
                                                        <ErrorMessage name="manual_buyer_request_approval" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Referral in Gigs : </label>
                                                    <div className="col-md-6">
                                                        <Field as="select" id="refer_gig" name="refer_gig" value={values.refer_gig} onChange={handleChange} className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} >
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </Field>
                                                        <ErrorMessage name="refer_gig" component="div" className="invalid-feedback" />
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

export default Application;