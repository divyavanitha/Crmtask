import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'

import { getGigbyId, requestModification } from "../../../../_actions/admin/gig.action";

const AddCategory = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();

    let history = useHistory();
    const params = useParams();
    useEffect(() => {

        dispatch(getGigbyId(params.id))

    }, [params.id]);
    const gig = useSelector(state => state.gigs && state.gigs.gig && state.gigs.gig.responseData.gig);
    console.log('gigig', gig);

    return (

        <Formik

            enableReinitialize
            initialValues={{
                id: gig ? gig._id : '',
                modify_description: gig ? gig.modify_description : ''

            }
            }

            validationSchema={Yup.object().shape({
                modify_description: Yup.string()
                    .required('Description is required')
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {

                let data = {
                    id: values.id,
                    modify_description: values.modify_description
                };

                dispatch(requestModification(data)).then(res => {
                    addToast(res.message, { appearance: res.status, autoDismiss: true, })
                    history.push('/admin/gigs/')
                })
                
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
                                                <h1><i className="menu-icon fa fa-cubes"></i> Proposal / Modification Request </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="box box-block bg-white">
                                        <h5 className="mb-1">Insert Reason For Modification Request
                                            <div className="rightBtn-Group">
                                                <Link className="addMoreBtn" to="/admin/gigs" ><span className="txt text-capitalize"><span className="amIcon"><i className="fa fa-arrow-left"></i></span> Back</span></Link>
                                            </div>
                                        </h5>


                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"> Title : </label>
                                                    </div>

                                                    <div className="col-md-6">
                                                        {gig && gig.title}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Description : </label>
                                                    <div className="col-md-6">
                                                        <Field component="textarea" rows="2" id="modify_description" value={values.modify_description} name="modify_description" onChange={handleChange} maxLength={100} className={'form-control' + (errors.modify_description && touched.modify_description ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="modify_description" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"></label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <button type="submit" className="btn btn-success mr-3"> Send Modification Request </button>
                                                        
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