import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory  } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import DatePicker from "../DatePicker";
import { useToasts } from 'react-toast-notifications'
import * as Yup from 'yup';
import $ from 'jquery';

import { addMenu, getMenubyId, updateMenu } from "../../../../_actions/admin/menu.action";
import { getCategories } from "../../../../_actions/admin/category.action";

const AddMenu = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();
    const [description, setDescription] = useState("");
    //console.log('param',props.match.params.id);
    
  let history = useHistory();
    const params = useParams();
    useEffect(() => {

        dispatch(getCategories());
        dispatch(getMenubyId(params.id))

    }, [params.id]);
    const menu = useSelector(state => state.menus && state.menus.menus && state.menus.menus.responseData && state.menus.menus.responseData.menu);
    const categories = useSelector(state => state.categories && state.categories.categories.responseData && state.categories.categories.responseData.data.categories);
    console.log(menu);

    return (

        <Formik

            enableReinitialize
            initialValues={{
                id: menu ? menu._id : '',
                title: menu ? menu.title : '',
                subTitle: menu ? menu.subTitle : '',
                layoutPhoto: menu ? menu.layoutPhoto : '',
                category: menu ? menu.category : '',
                description: menu ? menu.description : ''

            }
            }

            validationSchema={Yup.object().shape({
                title: Yup.string()
                    .required('Title is required'),
                subTitle: Yup.string()
                    .required('Sub Title is required'),
                layoutPhoto: Yup.string()
                    .required('Slide Photo is required'),
                category: Yup.string()
                    .required('Category is required')
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
console.log('values', values);
                /*let data = {
                    id: values.id,
                    title: values.title,
                    layoutPhoto: values.layoutPhoto,
                    category: values.category
                };*/

                const data = new FormData();
                data.append( "id", values.id );
                data.append( "title", values.title );
                data.append( "subTitle", values.subTitle );
                data.append( "category", values.category );
                data.append( "description", values.description );
                data.append( "layoutPhoto", values.layoutPhoto );

                if (params.id) {
                    dispatch(updateMenu(data)).then(res => { 
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        history.push('/admin/menu/')
                    })
                } else {
                    dispatch(addMenu(data)).then(res => {
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                    })
                }
                resetForm();
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
                                                <h1><i className="menu-icon fa fa-cubes"></i> Menus / {params.id ? "Edit Menu" : "Add Menu"} </h1>
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
                                        <h5 className="mb-1">{params.id ? "Edit Menu" : "Add Menu"}
                                        <div className="rightBtn-Group">
                                            <Link className="addMoreBtn" to="/admin/menu" ><span className="txt text-capitalize"><span className="amIcon"><i className="fa fa-arrow-left"></i></span> Back</span></Link>
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
                                                    <label className="col-md-4 control-label"> Sub Title : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="subTitle" name="subTitle" value={values.subTitle} onChange={handleChange} maxLength={100} placeholder="Sub Title"  className={'form-control' + (errors.subTitle && touched.subTitle ? ' is-invalid' : '')}  />
                                                        <ErrorMessage name="subTitle" component="div" className="invalid-feedback" />
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
                                                         <input type="file" name="layoutPhoto" onChange={(e) => { setFieldValue("layoutPhoto", e.currentTarget.files[0]) }} className={'form-control' + (errors.layoutPhoto && touched.layoutPhoto ? ' is-invalid' : '')} />

                                                         {params.id ? <img id="target" src={values.layoutPhoto ? values.layoutPhoto : ""} /> : ""}
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
                                                        {params.id ? <button type="submit" className="btn btn-success mr-3">Update</button> : <button type="submit" className="btn btn-success mr-3">Save</button>}
                                                        {params.id ? <Link className="btn btn-outline" to="/admin/menu">Cancel</Link> : <button onClick={handleReset} className="btn btn-outline mr-3">Reset</button>}
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

export default AddMenu;