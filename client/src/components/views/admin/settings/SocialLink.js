import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Switch, Route } from "react-router";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'

import { getSetting, updateSocialLinkSetting } from "../../../../_actions/admin/setting.action";

const SocialLink = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getSetting())

    }, []);

    const settings = useSelector(state => state);

    let socialLink = settings && settings.adminsettings && settings.adminsettings.setting && settings.adminsettings.setting.socialLink;

    let initialvalues = {};

    if (socialLink) {
        for (let social of socialLink) {
            initialvalues[social.name] = social.url;
        }
    }

    return (

        <Formik

            enableReinitialize

            initialValues={initialvalues}

            validationSchema={Yup.object().shape({
            })}
            onSubmit={(values, { setSubmitting }) => {

                let data = {};

                if (socialLink) {
                    for (let social of socialLink) {
                        data[social.name] = values[social.name];
                    }
                }

                dispatch(updateSocialLinkSetting(data)).then(res => {
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
                } = props;

                return (
                    <Fragment>


                        <div className="container">
                            <div className="breadcrumbs">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="page-header">
                                            <div className="page-title">
                                                <h1><i className="menu-icon fa fa-gear"></i> Settings / Profile Links </h1>
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
                                                <Link to="/admin/settings/social/links" className="tab-item active">Social Links</Link>
                                                
                                            </div>
                                        </div>
                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit}>

                                                {socialLink && socialLink.map((social, index) => (
                                                    <div key={index} className="form-group row">
                                                        <label className="col-md-4 control-label"> {(social.name).charAt(0).toUpperCase() + (social.name).slice(1).toLowerCase()} : </label>
                                                        <div className="col-md-6">
                                                            <Field type="text" id={social.name} name={social.name} value={values[social.name]} onChange={handleChange} maxLength={100} placeholder={social.title} className={'form-control' + (errors[social.url] && touched[social.url] ? ' is-invalid' : '')} />
                                                            <ErrorMessage name={social.name} component="div" className="invalid-feedback" />
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

export default SocialLink;