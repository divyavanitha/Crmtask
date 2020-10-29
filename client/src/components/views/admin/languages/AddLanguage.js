import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory  } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useToasts } from 'react-toast-notifications'
import * as Yup from 'yup';


import { addLanguage, getLanguagebyId, updateLanguage } from "../../../../_actions/admin/language.action";

const AddLanguage = (props) => {
    const dispatch = useDispatch();
    const { addToast } = useToasts()
    //console.log('param',props.match.params.id);
    
  let history = useHistory();
    const params = useParams();
    useEffect(() => {

        // Update the document title using the browser API

        dispatch(getLanguagebyId(params.id))

    }, [params.id]);
    const language = useSelector(state => state.languages && state.languages.language && state.languages.language.responseData.language);

    return (

        <Formik

            enableReinitialize
            initialValues={{
                id: language ? language._id : '',
                name: language ? language.name : ''

            }
            }

            validationSchema={Yup.object().shape({
               name: Yup.string()
                    .required('Name is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {

                let data = {
                    id: values.id,
                    name: values.name
                };

                if (params.id) {
                    dispatch(updateLanguage(data)).then(res => { 
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        history.push('/admin/language/')
                    })
                } else {
                    dispatch(addLanguage(data)).then(res => {
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                    })
                }
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
                                                <h1><i className="menu-icon fa fa-cubes"></i> Languages / {params.id ? "Edit Language" : "Add Language"} </h1>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-sm-8">
                                    <div className="page-header float-right">
                                        <div className="page-title">
                                        <ol className="breadcrumb text-right">
                                            <li className="active"><Link className="btn btn-info" to="/admin/language" >Back</Link></li>
                                        </ol>
                                        </div>
                                    </div>
                                    </div> */}

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="box box-block bg-white">
                                        <h5 className="mb-1">{params.id ? "Edit Language" : "Add Language"}
                                        <div className="rightBtn-Group">
                                            <Link className="addMoreBtn" to="/admin/language" ><span className="txt text-capitalize"><span className="amIcon"><i className="fa fa-arrow-left"></i></span> Back</span></Link>
                                        </div>
                                        </h5>

                                        
                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Name : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="name" name="name" value={values.name} onChange={handleChange} maxLength={100} placeholder="Name"  className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}  />
                                                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                {/* <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Status : </label>
                                                    <div className="col-md-6">
                                                        <input type="radio" name="enable_watermark" value="1" required="" />
                                                        <label> Yes </label>
                                                        <input type="radio" name="enable_watermark" value="0" required="" checked="" />
                                                        <label> No </label>
                                                    </div>
                                                </div> */}
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"></label>
                                                    <div className="col-md-6">
                                                        {params.id ? <button type="submit" className="btn btn-success mr-3">Update</button> :<button type="submit" className="btn btn-success mr-3">Save</button>}
                                                        <Link className="btn btn-outline" to="/admin/language">Cancel</Link>
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

export default AddLanguage;