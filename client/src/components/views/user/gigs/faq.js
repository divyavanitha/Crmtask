import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Yup from 'yup';
//import { useToasts } from 'react-toast-notifications'

import { updateFaq } from "../../../../_actions/gigs.action";


const AddGig = (props) => {
    //const { addToast } = useToasts()
    const dispatch = useDispatch();

    let history = useHistory();
    const params = useParams();
    useEffect(() => {
        

    }, [params.id]);
    
    return (

        <Formik

            enableReinitialize
            initialValues={{
                id: params.id,
                description: '',
                question: [''],
                answer: ['']

            }
            }

            validationSchema={Yup.object().shape({
                /*description: Yup.string()
                    .required('Title is required'),
                question: Yup.string()
                    .required('Sub Category is required'),
                answer: Yup.string()
                    .required('Tags is required'),*/
            })}

            onfaqSubmit={(values, { setSubmitting, resetForm }) => {
              console.log('values',values);
                let data = {
                    id: values.id,
                    
                    question: values.question,
                    answer: values.answer
                };

                /*if (params.id) {
                    dispatch(updateCategory(data)).then(res => {
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        history.push('/admin/category/')
                    })
                } else {*/
                    dispatch(updateFaq(data)).then(res => {
                      console.log('id',res.responseData._id);
                      history.push('/gig/post/faq/'+res.responseData._id)
                        //addToast(res.message, { appearance: res.status, autoDismiss: true, })
                    })
                //}
                resetForm();
                setSubmitting(false);
            }}

            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log('values',values);
                let data = {
                    id: values.id,
                    description: values.description,
                   
                };

                /*if (params.id) {
                    dispatch(updateCategory(data)).then(res => {
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        history.push('/admin/category/')
                    })
                } else {*/
                    dispatch(updateFaq(data)).then(res => {
                      console.log('id',res.responseData._id);
                      history.push('/gig/post/requirements/'+res.responseData._id)
                        //addToast(res.message, { appearance: res.status, autoDismiss: true, })
                    })
                //}
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
                    handleFaqSubmit,
                    handleReset,
                    setFieldValue,
                } = props;

                return (
                    <Fragment>


                        <nav className="gig-tab-nav" id="tabs">

                          <div className="container">

                            <div className="breadcrumb flat mb-0 nav" role="tablist">
                              <div className="breadcrumbList">
                                <a className="nav-link" href="#overview">
                                  Overview      </a>

                                <a className="nav-link d-none " href="#video">
                                  Video Settings      </a>

                                <a className="nav-link  d-none" href="#instant-delivery">
                                  Instant Delivery      </a>

                                <a className="nav-link  " href="#pricing">
                                  Pricing     </a>

                                <a className="nav-link active" href="#description">
                                  Description & FAQ     </a>
                                <a className="nav-link  " href="#requirements">
                                  Requirements      </a>
                                <a className="nav-link " href="#gallery">
                                  Gallery     </a>
                                <a className="nav-link " href="#publish">Submit For Approval</a>
                              </div>
                            </div>

                          </div>

                          </nav>

<div className="container mt-5 mb-5">
 {/* <!--- container mt-5 Starts ---> */}
 <div className="row">
    {/* <!--- row Starts ---> */}
    <div className="col-xl-8 col-lg-12 col-md-12 offset-xl-2">
       {/* <!--- col-xl-8 Starts ---> */}

       <div className="tab-content card card-body">
          {/* <!--- tab-content Starts ---> */}

          <div className="tab-pane fade show active" id="description">
             <h5 className="font-weight-normal">Description</h5>
             <hr />
             <p className="small mb-2"> Project Details </p>
             <form onSubmit={handleSubmit} encType="multipart/form-data" className="proposal-form">
                {/* <!--- form Starts --> */}
                <div className="form-group">
                   <CKEditor
                    editor={ ClassicEditor }
                    data={values.description}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setFieldValue('description', data);
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                     />
                   <small className="form-text text-danger"></small>
                </div>
             
             {/* <!--- form Ends --> */}
             <hr className="mt-0" />
             <h5 className="font-weight-normal"> Frequently Asked Questions  <small className="float-right"><a data-toggle="collapse" href="#insert-faq" className="text-success">+ Add Faq</a></small></h5>
             <hr />
             <div className="tabs accordion mt-2" id="faqTabs">
                {/* <!--- All Tabs Starts ---> */}
                <div className="tab">
                   {/* <!-- tab rounded Starts --> */}
                   <div className="tab-body rounded border-1 p-3 pb-0 collapse" id="insert-faq" data-parent="#faqTabs">
                      <form onfaqSubmit={handleFaqSubmit} encType="multipart/form-data" className="add-faq">
                         <div className="form-group mb-2">
                          <div className="col-md-12">Question</div>
                            <FieldArray name="question" render={arrayHelpers => (
                               <div>
                                 {values.question && values.question.map((data, index) => (
                                     <div key={index}>
                                       <Field name={`question.${index}`} placeholeder="Question" onChange={handleChange} className="form-control form-control-sm" values={`question.${index}`} />
                                       
                                     </div>
                                   ))}
                               </div>

                             )}
                            />
                                 
                         </div>
                         <div className="form-group mb-2">
                         <div className="col-md-12">Answer</div>
                            <FieldArray name="answer" render={arrayHelpers => (
                                 <div>
                                   {values.answer && values.answer.map((data, index) => (
                                       <div key={index}>
                                         <Field name={`answer.${index}`} placeholeder="Answer" onChange={handleChange} className="form-control form-control-sm" values={`answer.${index}`} />
                                         
                                       </div>
                                     ))}
                                 </div>
                               )}
                              />
                         </div>
                         <div className="form-group mb-0">
                            <button type="submit" className="btn btn-success btn-sm float-right">Insert</button>
                            <div className="clearfix"></div>
                         </div>
                      </form>
                   </div>
                </div>
                {/* <!-- tab rounded Ends --> */}
               
             </div>
             {/* <!--- All Tabs Ends ---> */}
             <div className="form-group mb-0">
                {/* <!--- form-group Starts ---> */}
                <a href="#" className="btn btn-secondary float-left backButton">Back</a>
                <button type="submit" className="btn btn-success mr-3 float-right">Save & Continue</button>
             </div>
             {/* <!--- form-group Starts ---> */}
        </form>
          </div>
          
          <input type="hidden" name="section" value="instant_delivery" />
       </div>
       {/* <!--- tab-content Ends ---> */}
    </div>
    {/* <!--- col-md-8 Ends ---> */}
 </div>
 {/* <!--- row Ends ---> */}
</div>

                    </Fragment>
                );
            }}
        </Formik>
    );
};

export default AddGig;