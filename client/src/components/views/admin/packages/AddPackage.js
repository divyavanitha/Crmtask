import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'

import { addPackage, getPackagebyId, updatePackage } from "../../../../_actions/admin/package.action";

const AddPackage = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();

    let history = useHistory();
    const params = useParams();
    useEffect(() => {

        dispatch(getPackagebyId(params.id))

    }, [params.id]);
    const packages = useSelector(state => state.packages && state.packages.package && state.packages.package.responseData && state.packages.package.responseData.package);

    return (

        <Formik

            enableReinitialize
            initialValues={{
                id: packages ? packages._id : '',
                name: packages ? packages.name : ''

            }
            }

            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .required('Package Name is required')
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {

                let data = {
                    id: values.id,
                    name: values.name
                };

                if (params.id) {
                    dispatch(updatePackage(data)).then(res => {
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        history.push('/admin/package/')
                    })
                } else {
                    dispatch(addPackage(data)).then(res => {
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
                                                <h1><i className="menu-icon fa fa-cubes"></i> Packages / {params.id ? "Edit Package" : "Add Package"} </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                <div className="box box-block bg-white">
                                    <h5 className="mb-1">{params.id ? "Edit Package" : "Add Package"} 
                                    <div className="rightBtn-Group">
                                        <Link className="addMoreBtn" to="/admin/package" ><span className="txt text-capitalize"><span className="amIcon"><i className="fa fa-arrow-left"></i></span> Back</span></Link>
                                    </div>
                                    </h5>

                                        
                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"> Title : </label>
                                                    </div>
                                                    
                                                    <div className="col-md-6">
                                                        <Field type="text" id="name" name="name" value={values.name} onChange={handleChange} maxLength={100} placeholder="Name" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                
                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"></label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        {params.id ? <button type="submit" className="btn btn-success mr-3">Update</button> : <button type="submit" className="btn btn-success mr-3">Save</button>}
                                                        {params.id ? <Link className="btn btn-outline" to="/admin/package">Cancel</Link> : <button onClick={handleReset} className="btn btn-outline mr-3">Reset</button>}
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

export default AddPackage;