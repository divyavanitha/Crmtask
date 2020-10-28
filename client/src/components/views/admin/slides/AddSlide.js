import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory  } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import DatePicker from "../DatePicker";
import { useToasts } from 'react-toast-notifications'
import * as Yup from 'yup';
import $ from 'jquery';

import { addSlide, getSlidebyId, updateSlide } from "../../../../_actions/admin/slide.action";
import { getCategories } from "../../../../_actions/admin/category.action";

const AddCategory = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();
    const [description, setDescription] = useState("");
    //console.log('param',props.match.params.id);
    
  let history = useHistory();
    const params = useParams();
    useEffect(() => {

        dispatch(getCategories());
        dispatch(getSlidebyId(params.id))

    }, [params.id]);
    const slide = useSelector(state => state.slides && state.slides.slide && state.slides.slide.responseData.slide);
    const categories = useSelector(state => state.categories && state.categories.categories.responseData && state.categories.categories.responseData.data.categories);
    console.log(categories);

    return (

        <Formik

            enableReinitialize
            initialValues={{
                id: slide ? slide._id : '',
                title: slide ? slide.title : '',
                layoutPhoto: slide ? slide.layoutPhoto : '',
                category: slide ? slide.category : ''

            }
            }

            validationSchema={Yup.object().shape({
                title: Yup.string()
                    .required('Title is required'),
                layoutPhoto: Yup.string()
                    .required('Slide Photo is required'),
                category: Yup.string()
                    .required('Category is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
console.log('values', values);
                let data = {
                    id: values.id,
                    title: values.title,
                    layoutPhoto: values.layoutPhoto,
                    category: values.category
                };

                if (params.id) {
                    dispatch(updateSlide(data)).then(res => { 
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        history.push('/admin/slide/')
                    })
                } else {
                    dispatch(addSlide(data)).then(res => {
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                    })
                }
                setSubmitting(false);
            }}>

            {props => {
                const {
                    values,
                    setFieldValue,
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
                                                <h1><i className="menu-icon fa fa-cubes"></i> Slides / {params.id ? "Edit Slide" : "Add Slide"} </h1>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-sm-8">
                                    <div className="page-header float-right">
                                        <div className="page-title">
                                        <ol className="breadcrumb text-right">
                                            <li className="active"><Link className="btn btn-info" to="/admin/slide" >Back</Link></li>
                                        </ol>
                                        </div>
                                    </div>
                                    </div> */}

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="box box-block bg-white">
                                        <h5 className="mb-1">{params.id ? "Edit Slide" : "Add Slide"}
                                        <div className="rightBtn-Group">
                                            <Link className="addMoreBtn" to="/admin/slide" ><span className="txt text-capitalize"><span className="amIcon"><i className="fa fa-arrow-left"></i></span> Back</span></Link>
                                        </div>
                                        </h5>
                                        {/* <div className="card-header">
                                            <h4 className="h4">{params.id ? "Edit Slide" : "Add Slide"}</h4>
                                        </div> */}
                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Title : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="title" name="title" value={values.title} onChange={handleChange} maxLength={100} placeholder="Title"  className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}  />
                                                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
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
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Image : </label>
                                                    <div className="col-md-6">
                                                        <Field id="file" name="file" type="file" value={values.layoutPhoto} onChange={(event) => {setFieldValue("file", event.currentTarget.files[0]);}} className={'form-control' + (errors.layoutPhoto && touched.layoutPhoto ? ' is-invalid' : '')}  />
                                                        
                                                        <ErrorMessage name="layoutPhoto" component="div" className="invalid-feedback" />
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