import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'

import { getSetting, updateGeneralSetting } from "../../../../_actions/admin/setting.action";

const GigSetting = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();
    
    useEffect(() => {

        dispatch(getSetting())

    }, []);

    const settings = useSelector(state => state);

    const site = settings && settings.adminsettings && settings.adminsettings.setting && settings.adminsettings.setting.site;

    return (

        <Formik

            enableReinitialize
            initialValues={{
                title: site ? site.title : '',
                description: site ? site.description : '',
                logo: '',
                favicon: '',
                mobile: site ? site.mobile : '',
                email: site ? site.email : '',
                copyright: site ? site.copyright : ''

            }
            }

            validationSchema={Yup.object().shape({
                title: Yup.string().required('Title is required'),
                description: Yup.string().required('Description is required'),
                mobile: Yup.string().required('Mobile Number is required'),
                email: Yup.string().required('Email Address is required'),
                copyright: Yup.string().required('Copyright content is required')
            })}
            onSubmit={(values, { setSubmitting }) => {

                /* let data = {
                    title: values.title,
                    description: values.description,
                    logo: values.logo,
                    favicon: values.favicon,
                    mobile: values.mobile,
                    email: values.email,
                    copyright: values.copyright
                }; */

                const data = new FormData();
                data.append( "title", values.title );
                data.append( "description", values.description );
                data.append( "logo", values.logo );
                data.append( "favicon", values.favicon );
                data.append( "mobile", values.mobile );
                data.append( "email", values.email );
                data.append( "copyright", values.copyright );

                dispatch(updateGeneralSetting(data)).then(res => {
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
                                                        <Field type="text" id="title" name="title" value={values.title} onChange={handleChange} maxLength={100} placeholder="Title" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Commission % For Level One : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="title" name="title" value={values.title} onChange={handleChange} maxLength={100} placeholder="Title" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Commission % For Level Two : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="title" name="title" value={values.title} onChange={handleChange} maxLength={100} placeholder="Title" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Commission % For Top Rated : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="title" name="title" value={values.title} onChange={handleChange} maxLength={100} placeholder="Title" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
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