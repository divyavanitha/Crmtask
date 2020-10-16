import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import { addSubCategory, getSubCategorybyId, updateSubCategory } from "../../../../_actions/admin/subcategory.action";
import { getCategories } from "../../../../_actions/admin/category.action";
import { addNotification } from "../../../../_actions/admin/notifications.action";

const AddSubCategory = (props) => {
    const dispatch = useDispatch();
    //console.log('param',props.match.params.id);
    console.log(useParams());
    const params = useParams();
    useEffect(() => {

        // Update the document title using the browser API
        dispatch(getCategories());
        dispatch(getSubCategorybyId(params.id))

    }, [params.id]);
    const subcategory = useSelector(state => state.subcategories && state.subcategories.subcategory && state.subcategories.subcategory.responseData.sub_category);
    const categories = useSelector(state => state.categories && state.categories.categories.responseData && state.categories.categories.responseData.data.categories);
    console.log('subcats', subcategory);

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

                if(params.id){
                    dispatch(updateSubCategory(data));
                }else{
                    dispatch(addSubCategory(data));
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
                        {params.id ? <h1 className="h3 mb-2 text-gray-800">Edit Sub Category</h1> : <h1 className="h3 mb-2 text-gray-800">Add Sub Category</h1>}

                        <div className="row">
                            <Link className="btn btn-primary" style={{ float: "right" }} to="/admin/subcategory">Back</Link>
                        </div>
                        <div className="col-xl-12 col-lg-12">
                            <div className="card shadow mb-4">
                                {params.id ? <div className="card-header py-3">
                                   <h6 className="m-0 font-weight-bold text-green"> Edit </h6> 
                                    
                                </div> : <div className="card-header py-3">
                                   <h6 className="m-0 font-weight-bold text-green"> Create </h6> 
                                    
                                </div>}

                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <Field id="id" name="id" type="hidden" value={values.id} onChange={handleChange} />
                                                <Field id="name" name="name" value={values.name} onChange={handleChange} maxLength={100} placeholder="Name" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    
                                                    <Field as="select" id="category" name="category" onChange={handleChange} className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} >
                                                        <option value="">Select Catagory</option>

                                                        {categories && categories.map((c_list) => (<option key={c_list._id} value={c_list._id} onChange={handleChange}>{c_list.name}</option>))}

                                                    </Field>
                                                </div>
                                            </div>
                                        
                                       



                                        <Link className="btn btn-danger" to="/admin/subcategory">Cancel</Link>
                                        <button type="submit" className={`btn btn-primary left-margin`}>Save</button>
                                    </form>
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
