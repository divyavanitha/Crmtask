import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory  } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useToasts } from 'react-toast-notifications'
import * as Yup from 'yup';


import { addSubCategory, getSubCategorybyId, updateSubCategory } from "../../../../_actions/admin/subcategory.action";
import { getCategories } from "../../../../_actions/admin/category.action";

const AddSubCategory = (props) => {
    const dispatch = useDispatch();
    const { addToast } = useToasts()
    //console.log('param',props.match.params.id);
    
  let history = useHistory();
    const params = useParams();
    useEffect(() => {

        // Update the document title using the browser API

        dispatch(getCategories());
        dispatch(getSubCategorybyId(params.id))

    }, [params.id]);
    const subcategory = useSelector(state => state.subcategories && state.subcategories.subcategory && state.subcategories.subcategory.responseData.sub_category);
    const categories = useSelector(state => state.categories && state.categories.categories.responseData && state.categories.categories.responseData.data.categories);
console.log('sub', categories);
    return (

        <Formik

            enableReinitialize
            initialValues={{
                id: subcategory ? subcategory._id : '',
                name: subcategory ? subcategory.name : '',
                category: subcategory ? subcategory.category : ''

            }
            }

            validationSchema={Yup.object().shape({
               name: Yup.string()
                    .required('Name is required'),
                category: Yup.string()
                    .required('Category is required')
            })}
            onSubmit={(values, { setSubmitting }) => {

                let data = {
                    id: values.id,
                    name: values.name,
                    category: values.category
                };

                if (params.id) {
                    dispatch(updateSubCategory(data)).then(res => { 
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        history.push('/admin/subcategory/')
                    })
                } else {
                    dispatch(addSubCategory(data)).then(res => {
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
                                    <div className="col-sm-4">
                                        <div className="page-header float-left">
                                            <div className="page-title">
                                                <h1><i className="menu-icon fa fa-cubes"></i> Sub Categories / {params.id ? "Edit Sub Category" : "Add Sub Category"} </h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                    <div className="page-header float-right">
                                        <div className="page-title">
                                        <ol className="breadcrumb text-right">
                                            <li className="active"><Link className="btn btn-info" to="/admin/subcategory" >Back</Link></li>
                                        </ol>
                                        </div>
                                    </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="h4">{params.id ? "Edit Sub Category" : "Add Sub Category"}</h4>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Name : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="name" name="name" value={values.name} onChange={handleChange} maxLength={100} placeholder="Name"  className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}  />
                                                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Category : </label>
                                                    <div className="col-md-6">
                                                        <Field as="select" id="category" name="category" onChange={handleChange} className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} >
                                                        <option value="">Select Catagory</option>

                                                        {categories && categories.map((c_list) => (<option key={c_list._id} value={c_list._id} onChange={handleChange}>{c_list.name}</option>))}

                                                        </Field>
                                                        <ErrorMessage name="category" component="div" className="invalid-feedback" />
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
                                                        {params.id ? <button type="submit" className="btn btn-success">Update</button> :<button type="submit" className="btn btn-success">Save</button>}
                                                        <Link className="btn btn-danger" to="/admin/subcategory">Cancel</Link>
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

export default AddSubCategory;