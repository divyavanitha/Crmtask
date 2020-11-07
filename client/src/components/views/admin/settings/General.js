import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'

import { getSetting, updateGeneralSetting } from "../../../../_actions/admin/setting.action";

const General = (props) => {
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
                                                <h1><i className="menu-icon fa fa-gear"></i> Settings / General </h1>
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
                                                <Link to="/admin/settings/general" className="tab-item active">General</Link>
                                                <Link to="/admin/settings/social/links" className="tab-item">Social Links</Link>
                                                <Link to="/admin/settings/push" className="tab-item">Push Notification</Link>
                                                <Link to="/admin/settings/social" className="tab-item">Social Config</Link>
                                                <Link to="/admin/settings/sms" className="tab-item">SMS Config</Link>
                                                <Link to="/admin/settings/mail" className="tab-item">Mail Settings</Link>
                                                <Link to="/admin/settings/payment" className="tab-item">Payment Config</Link>
                                            </div>
                                        </div>
                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">


                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Site Title : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="title" name="title" value={values.title} onChange={handleChange} maxLength={100} placeholder="Title" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Site Description : </label>
                                                    <div className="col-md-6">
                                                        <Field as="textarea" name="description" value={values.description} onChange={handleChange} maxLength={100} placeholder="Description" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')}/>
                                                        <ErrorMessage name="description" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Site Logo : </label>
                                                    <div className="col-md-6">
                                                        <input type="file" name="logo" onChange={(e) => { setFieldValue("logo", e.currentTarget.files[0]) }} className={'form-control' + (errors.logo && touched.logo ? ' is-invalid' : '')} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Site Favicon : </label>
                                                    <div className="col-md-6">
                                                        <input type="file" name="favicon" onChange={(e) => { setFieldValue("favicon", e.currentTarget.files[0]) }}  className={'form-control' + (errors.favicon && touched.favicon ? ' is-invalid' : '')} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Mobile Number : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="mobile" name="mobile" value={values.mobile} onChange={handleChange} maxLength={100} placeholder="Mobile Number" className={'form-control' + (errors.mobile && touched.mobile ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="mobile" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Email : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="email" name="email" value={values.email} onChange={handleChange} maxLength={100} placeholder="Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Copyright Content : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="copyright" name="copyright" value={values.copyright} onChange={handleChange} maxLength={100} placeholder="Copyright Content" className={'form-control' + (errors.copyright && touched.copyright ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="copyright" component="div" className="invalid-feedback" />
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

export default General;