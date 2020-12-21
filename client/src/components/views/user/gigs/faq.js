import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Yup from 'yup';
import $ from 'jquery';
//import { useToasts } from 'react-toast-notifications'

import { updateFaq } from "../../../../_actions/gigs.action";
import { getGigbyId } from "../../../../_actions/user.action";


const Faq = (props) => {
  //const { addToast } = useToasts()
  const dispatch = useDispatch();

  let history = useHistory();
  const params = useParams();
   useEffect(() => {

      dispatch(getGigbyId(params.id)).then( async (res) => {
      });

   }, [params.id]);

   const gig = useSelector((state) => state.user && state.user.gig_details && state.user.gig_details.responseData && state.user.gig_details.responseData.gig);

   let htmlData = '';
   if(gig) {
    for(let i in gig.faq) {
      htmlData += `<div class="tab rounded border-1 faq_container">

              <div class="tab-header" data-toggle="collapse" href="#faq-58">
                    <a class="float-left"> <i class="fa fa-bars mr-2"></i>`+ gig.faq[i].question + `</a>
                    <a class="float-right text-muted"><i class="fa fa-sort-down"></i></a>
                    <div class="clearfix"></div>
              </div>

                <div class="tab-body p-3 pb-0 collapse" id="faq-58" data-parent="#faqTabs">
                      <div class="form-group mb-2">
                            <input type="hidden" name="faq_id" value=`+ gig.faq[i]._id + `>
                            <input type="text" name="title" placeholder="Title" class="form-control form-control-sm" required value=`+ gig.faq[i].question + `>
                      </div>

                      <div class="form-group mb-2">
                            <input name="content" rows="3" class="form-control form-control-sm" value=`+ gig.faq[i].answer + ` />
                      </div>

                      <div class="form-group mb-0">
                            <a class="btn btn-danger btn-sm delete-faq delete">Delete</a>
                            <button type="submit" class="btn btn-success btn-sm float-right update">Update</button>
                      </div>   
                </div>
              </div>`;
    }
   }

   $('#faTabs').html(htmlData);
   

  useEffect(() => {

    $(".insert").on("click", function () {
      $.ajax({
        url: "/api/gig/faq",
        type: "post",
        headers: {
          Authorization: localStorage.token
        },
        data: {
          question: $("input[name^=question]").map(function () { return $(this).val(); }).get(),
          answer: $("input[name^=answer]").map(function () { return $(this).val(); }).get(),
          id: params.id,
          action: "faq"
        },
        beforeSend: function (request) {
          //showInlineLoader();
        },
        success: function (response, textStatus, jqXHR) {

          $("#faqTabs").find("input[name^=question]").val("");
          $("#faqTabs").find("input[name^=answer]").val("");
          
          var result = response.responseData.faq;
          var html = "";
          for (var i in result) {

            html += `<div class="tab rounded border-1 faq_container">

              <div class="tab-header" data-toggle="collapse" href="#faq-58">
                    <a class="float-left"> <i class="fa fa-bars mr-2"></i>`+ result[i].question + `</a>
                    <a class="float-right text-muted"><i class="fa fa-sort-down"></i></a>
                    <div class="clearfix"></div>
              </div>

                <div class="tab-body p-3 pb-0 collapse" id="faq-58" data-parent="#faqTabs">
                      <div class="form-group mb-2">
                            <input type="hidden" name="faq_id" value=`+ result[i]._id + `>
                            <input type="text" name="title" placeholder="Title" class="form-control form-control-sm" required value=`+ result[i].question + `>
                      </div>

                      <div class="form-group mb-2">
                            <input name="content" rows="3" class="form-control form-control-sm" value=`+ result[i].answer + ` />
                      </div>

                      <div class="form-group mb-0">
                            <a class="btn btn-danger btn-sm delete-faq delete">Delete</a>
                            <button type="submit" class="btn btn-success btn-sm float-right update">Update</button>
                      </div>   
                </div>
              </div>`;


          }

          $('#faTabs').html(html);

          $(".update").on('click', function (e) {
            $.ajax({
              url: "/api/gig/update/faq",
              type: 'post',
              headers: {
                Authorization: localStorage.token
              },
              data: {
                question: $("input[name=title]").val(),
                answer: $("input[name=content]").val(),
                faq_id: $("input[name=faq_id]").val(),
                action: "faq",
                id: params.id
              },
              success: function (data) {

              }
            });
          });

          $("body").on('click', '.delete', function (e) {
            let faq_id = $(this).closest('.faq_container').find('input[name=faq_id]');
            alert();
            $.ajax({
              url: "/api/gig/update/faq",
              type: 'delete',
              headers: {
                Authorization: localStorage.token
              },
              data: {
                id: faq_id
              },
              success: function (data) {
                $(this).closest('.faq_container').remove();
              }
            });
          });

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
      });
    });


  }, [params.id]);

  return (

    <Formik

      enableReinitialize
      initialValues={{
        id: params.id,
        description: gig ? gig.description : ''

      }
      }

      validationSchema={Yup.object().shape({
        description: Yup.string()
            .required('Description is required')
      })}

      onSubmit={(values, { setSubmitting, resetForm }) => {
        let data = {
          id: values.id,
          description: values.description,
          action: "desc"
        };

        if (values.action == "desc") {
          dispatch(updateFaq(data)).then(res => {
            history.push('/gig/requirements/' + res.responseData._id)
            //addToast(res.message, { appearance: res.status, autoDismiss: true, })
          })
        } else {
          dispatch(updateFaq(data)).then(res => {

            history.push('/gig/faq/' + params.id)
            //addToast(res.message, { appearance: res.status, autoDismiss: true, })
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
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="proposal-form">
                    <div className="tab-pane fade show active" id="description">
                      <h5 className="font-weight-normal">Description</h5>
                      <hr />
                      <p className="small mb-2"> Project Details </p>
                      
                        {/* <!--- form Starts --> */}
                        <div className="form-group">
                          <CKEditor
                            editor={ClassicEditor}
                            data={values.description}
                            onReady={editor => {
                              // You can store the "editor" and use when it is needed.
                              console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setFieldValue('description', data);
                              console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                              console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                              console.log('Focus.', editor);
                            }}
                          />
                          <ErrorMessage name="description" component="div" className="error-message" />
                          <small className="form-text text-danger"></small>
                        </div>
                      
                    </div>

                    <hr  />
                    
                    <h5 className="font-weight-normal"> Frequently Asked Questions  <small className="float-right"><a data-toggle="collapse" href="#insert-faq" className="text-success">+ Add Faq</a></small></h5>
                    <hr />
                    <div className="tabs accordion mt-2" id="faTabs">
                    </div>
                    <div className="tabs accordion mt-2" id="faqTabs">
                      {/* <!--- All Tabs Starts ---> */}
                      <div className="tab">
                        {/* <!-- tab rounded Starts --> */}
                        <div className="tab-body rounded border-1 p-3 pb-0 collapse" id="insert-faq" data-parent="#faqTabs">
                          {/* <form onfaqSubmit={handleFaqSubmit} encType="multipart/form-data" className="add-faq"> */}
                          <div className="form-group mb-2">
                            <div className="col-md-12">Question</div>

                            <input name="question[]" placeholeder="Question" className="form-control form-control-sm" values="test" />

                          </div>
                          <div className="form-group mb-2">
                            <div className="col-md-12">Answer</div>

                            <input name="answer[]" placeholeder="Answer" className="form-control form-control-sm" values="" />


                          </div>
                          <div className="form-group mb-0">
                            <button className="btn btn-success btn-sm float-right insert">Insert</button>
                            <div className="clearfix"></div>
                          </div>
                          {/* </form> */}
                        </div>
                      </div>
                      {/* <!-- tab rounded Ends --> */}

                    </div>
                    {/* <!--- All Tabs Ends ---> */}

                    <input type="hidden" name="section" value="instant_delivery" />

                    <div className="form-group mb-0">
                          {/* <!--- form-group Starts ---> */}
                          <a href="#" className="btn btn-secondary float-left backButton">Back</a>
                          <button type="submit" onClick={() => setFieldValue("action", "desc")} className="btn btn-success float-right">Save & Continue</button>
                    </div>

                    </form>
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

export default Faq;