import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications'

import { addPage, getPagebyId, updatePage } from "../../../../_actions/admin/page.action";

const AddPage = (props) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();

    let history = useHistory();
    const params = useParams();
    useEffect(() => {

        dispatch(getPagebyId(params.id))

    }, [params.id]);
    const pages = useSelector(state => state.pages && state.pages.page && state.pages.page.responseData && state.pages.page.responseData.page);

    return (

        <Formik

            enableReinitialize
            initialValues={{
                id: pages ? pages._id : '',
                title: pages ? pages.title : '',
                content: pages ? pages.content : '',
                url: pages ? pages.url : ''
            }
            }

            validationSchema={Yup.object().shape({
                title: Yup.string()
                    .required('Title is required')
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log('values', values);
                let data = {
                    id: values.id,
                    title: values.title,
                    content: values.content,
                    url: values.url
                };

                if (params.id) {
                    dispatch(updatePage(data)).then(res => {
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        history.push('/admin/page/')
                    })
                } else {
                    dispatch(addPage(data)).then(res => {
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
                                        <div className="page-header float-left">
                                            <div className="page-title">
                                                <h1><i className="menu-icon fa fa-cubes"></i> Packages / {params.id ? "Edit Page" : "Add Page"} </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="box box-block bg-white">
                                        <h5 className="mb-1">{params.id ? "Edit Page" : "Add Page"}
                                            <div className="rightBtn-Group">
                                                <Link className="addMoreBtn" to="/admin/page" ><span className="txt text-capitalize"><span className="amIcon"><i className="fa fa-arrow-left"></i></span> Back</span></Link>
                                            </div>
                                        </h5>


                                        <div className="addFormBox">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"> Title : </label>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Field type="text" id="title" name="title" value={values.title} onChange={handleChange} maxLength={100} placeholder="Title" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"> Content : </label>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <CKEditor
                                                            editor={ClassicEditor}
                                                            data={values.content}
                                                            onReady={editor => {
                                                                // You can store the "editor" and use when it is needed.
                                                                console.log('Editor is ready to use!', editor);
                                                            }}
                                                            onChange={(event, editor) => {
                                                                const data = editor.getData();
                                                                setFieldValue('content', data);
                                                                console.log({ event, editor, data });
                                                            }}
                                                            onBlur={(event, editor) => {
                                                                console.log('Blur.', editor);
                                                            }}
                                                            onFocus={(event, editor) => {
                                                                console.log('Focus.', editor);
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"> Url : </label>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Field type="text" id="url" name="url" value={values.url} onChange={handleChange} maxLength={100} placeholder="Url" className={'form-control' + (errors.url && touched.url ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="url" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <div className="col-md-4">
                                                        <label className="control-label"></label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        {params.id ? <button type="submit" className="btn btn-success mr-3">Update</button> : <button type="submit" className="btn btn-success mr-3">Save</button>}
                                                        {params.id ? <Link className="btn btn-outline" to="/admin/page">Cancel</Link> : <button onClick={handleReset} className="btn btn-outline mr-3">Reset</button>}
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

export default AddPage;