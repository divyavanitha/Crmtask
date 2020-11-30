import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'

import { getSetting, updateSellerSetting } from "../../../../_actions/admin/setting.action";

const Seller = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getSetting())

    }, []);

    const settings = useSelector(state => state);

    const seller = settings && settings.adminsettings && settings.adminsettings.setting && settings.adminsettings.setting.seller;
    console.log(seller)
    return (

        <Formik

            enableReinitialize
            initialValues={{
                level_one_rating: seller ? seller.levelOneRating : '',
                level_one_completed_order: seller ? seller.levelOneCompletedOrder : '',
                level_two_rating: seller ? seller.levelTwoRating : '',
                level_two_completed_order: seller ? seller.levelTwoCompletedOrder : '',
                top_rated_rating: seller ? seller.topRatedRating : '',
                top_rated_completed_order: seller ? seller.topRatedCompletedOrder : ''

            }
            }

            validationSchema={Yup.object().shape({
                level_one_rating: Yup.string().required('Level One Rating is required'),
                level_one_completed_order: Yup.string().required('Level One Completed Order is required'),
                level_two_rating: Yup.string().required('Level Two Rating is required'),
                level_two_completed_order: Yup.string().required('Level Two Completed is required'),
                top_rated_rating: Yup.string().required('Top Rated Rating is required'),
                top_rated_completed_order: Yup.string().required('Top Rated Completed is required')
            })}
            onSubmit={(values, { setSubmitting }) => {

                let data = {
                    level_one_rating: values.level_one_rating,
                    level_one_completed_order: values.level_one_completed_order,
                    level_two_rating: values.level_two_rating,
                    level_two_completed_order: values.level_two_completed_order,
                    top_rated_rating: values.top_rated_rating,
                    top_rated_completed_order: values.top_rated_completed_order
                };

                dispatch(updateSellerSetting(data)).then(res => {
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
                                                <h1><i className="menu-icon fa fa-gear"></i> Settings / Seller </h1>
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
                                                <Link to="/admin/settings/seller" className="tab-item active">Seller</Link>
                                                <Link to="/admin/settings/gig" className="tab-item">Gig</Link>
                                                <Link to="/admin/settings/pricing" className="tab-item">Pricing</Link>
                                            </div>
                                        </div>
                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">


                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Level One Seller Rating % : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="level_one_rating" name="level_one_rating" value={values.level_one_rating} onChange={handleChange} maxLength={100} placeholder="Level One Seller Rating" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="level_one_rating" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Level One Completed Order : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="level_one_completed_order" name="level_one_completed_order" value={values.level_one_completed_order} onChange={handleChange} maxLength={100} placeholder="Level One Completed Order" className={'form-control' + (errors.level_one_completed_order && touched.level_one_completed_order ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="level_one_completed_order" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Level Two Seller Rating % : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="level_two_rating" name="level_two_rating" value={values.level_two_rating} onChange={handleChange} maxLength={100} placeholder="Level Two Seller Rating" className={'form-control' + (errors.level_two_rating && touched.level_two_rating ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="level_two_rating" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Level Two Completed Order : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="level_two_completed_order" name="level_two_completed_order" value={values.level_two_completed_order} onChange={handleChange} maxLength={100} placeholder="Level Two Completed Order" className={'form-control' + (errors.level_two_completed_order && touched.level_two_completed_order ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="level_two_completed_order" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Top Rated Seller Rating % : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="top_rated_rating" name="top_rated_rating" value={values.top_rated_rating} onChange={handleChange} maxLength={100} placeholder="Top Rated Seller Rating" className={'form-control' + (errors.top_rated_rating && touched.top_rated_rating ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="top_rated_rating" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Top Rated Completed Order : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="top_rated_completed_order" name="top_rated_completed_order" value={values.top_rated_completed_order} onChange={handleChange} maxLength={100} placeholder="Top Rated Completed Order" className={'form-control' + (errors.top_rated_completed_order && touched.top_rated_completed_order ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="top_rated_completed_order" component="div" className="invalid-feedback" />
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

export default Seller;