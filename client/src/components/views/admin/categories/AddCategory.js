import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory  } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import { addCategory, getCategorybyId, updateCategory } from "../../../../_actions/admin/category.action";
import { addNotification } from "../../../../_actions/admin/notifications.action";

const AddCategory = (props) => {
    const dispatch = useDispatch();
    //console.log('param',props.match.params.id);
    
  let history = useHistory();
    const params = useParams();
    useEffect(() => {

        // Update the document title using the browser API

        dispatch(getCategorybyId(params.id))

    }, [params.id]);
    const category = useSelector(state => state.categories && state.categories.category && state.categories.category.responseData.category);
    console.log('cats', category);

    return (

        <Formik

            enableReinitialize
            initialValues={{
                id: category ? category._id : '',
                name: category ? category.name : ''

            }
            }

            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .required('Title is required')
            })}
            onSubmit={(values, { setSubmitting }) => {

                let data = {
                    id: values.id,
                    name: values.name
                };

                if (params.id) {
                    dispatch(updateCategory(data)).then(res => { 
                        history.push('/admin/category/')
                    })
                } else {
                    dispatch(addCategory(data));
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
                                        <div className="page-header float-left">
                                            <div className="page-title">
                                                <h1><i className="menu-icon fa fa-cubes"></i> Categories / {params.id ? "Edit Category" : "Add Category"} </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                <div className="box box-block bg-white">
                                    <h5 className="mb-1">{params.id ? "Edit Category" : "Add Category"} 
                                    <div className="rightBtn-Group">
                                        <Link className="addMoreBtn" to="/admin/category" ><span className="txt text-capitalize"><span className="amIcon"><i className="fa fa-arrow-left"></i></span> Back</span></Link>
                                    </div>
                                    </h5>

                                        
                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"> Title : </label>
                                                    </div>
                                                    
                                                    <div className="col-md-6">
                                                        <Field type="text" id="name" name="name" value={values.name} onChange={handleChange} maxLength={100} placeholder="Name"  className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}  />
                                                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                {/* <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"> Status : </label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <input type="radio" name="enable_watermark" value="1" required="" />
                                                        <label> Yes </label>
                                                        <input type="radio" name="enable_watermark" value="0" required="" checked="" />
                                                        <label> No </label>
                                                    </div>
                                                </div> */}
                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"></label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <button type="submit" className="btn btn-success mr-3">Save</button>
                                                        <Link className="btn btn-outline" to="/admin/category">Cancel</Link>
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