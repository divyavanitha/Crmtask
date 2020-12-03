import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'

import { addCancelReason, getCancelReasonbyId, updateCancelReason } from "../../../../_actions/admin/cancelReason.action";

const AddCategory = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();

    let history = useHistory();
    const params = useParams();
    useEffect(() => {

        dispatch(getCancelReasonbyId(params.id))

    }, [params.id]);
    const cancel_reason = useSelector(state => state.cancel_reasons && state.cancel_reasons.cancel_reason && state.cancel_reasons.cancel_reason.responseData.cancel_reason);

    return (

        <Formik

            enableReinitialize
            initialValues={{
                id: cancel_reason ? cancel_reason._id : '',
                reason: cancel_reason ? cancel_reason.reason : '',
                type: cancel_reason ? cancel_reason.type : '',

            }
            }

            validationSchema={Yup.object().shape({
                reason: Yup.string()
                    .required('Reason is required'),
                type: Yup.string()
                    .required('Type is required')
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {

                let data = {
                    id: values.id,
                    reason: values.reason,
                    type: values.type
                };

                if (params.id) {
                    dispatch(updateCancelReason(data)).then(res => {
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        history.push('/admin/cancel/reason')
                    })
                } else {
                    dispatch(addCancelReason(data)).then(res => {
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
                                                <h1><i className="menu-icon fa fa-cubes"></i> Cancel Reasons / {params.id ? "Edit Cancel Reason" : "Add Cancel Reason"} </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="box box-block bg-white">
                                        <h5 className="mb-1">{params.id ? "Edit Cancel Reason" : "Add Cancel Reason"}
                                            <div className="rightBtn-Group">
                                                <Link className="addMoreBtn" to="/admin/cancel/reason" ><span className="txt text-capitalize"><span className="amIcon"><i className="fa fa-arrow-left"></i></span> Back</span></Link>
                                            </div>
                                        </h5>


                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"> Reason : </label>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Field type="text" id="reason" name="reason" value={values.reason} onChange={handleChange} maxLength={100} placeholder="Reason" className={'form-control' + (errors.reason && touched.reason ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="reason" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"> Type : </label>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Field as="select" id="type" name="type" onChange={handleChange} className={'form-control' + (errors.type && touched.type ? ' is-invalid' : '')} >
                                                            <option value="">Select Cancel Reason</option>
                                                            <option value="seller">Seller</option>
                                                            <option value="buyer">Buyer</option>
                                                        </Field>
                                                        <ErrorMessage name="type" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"></label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <button type="submit" className="btn btn-success mr-3"> {params.id ? 'Update' : 'Save'} </button>
                                                        {params.id ? <Link className="btn btn-outline" to="/admin/cancel/reason">Cancel</Link> : <button onClick={handleReset} className="btn btn-outline mr-3">Reset</button>}
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