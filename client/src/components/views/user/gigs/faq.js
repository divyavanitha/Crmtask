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


const AddGig = (props) => {
    //const { addToast } = useToasts()
    const dispatch = useDispatch();

    let history = useHistory();
    const params = useParams();
    useEffect(() => {
      
    $(".insert").on("click", function(){
      console.log('data',$("input[name^=question]").map(function() { return $(this).val(); }).get());

      $.ajax({
        url: "/api/gig/faq",
        type: "post",
        data: {
          question: $("input[name^=question]").map(function() { return $(this).val(); }).get(),
          answer: $("input[name^=answer]").map(function() { return $(this).val(); }).get(),
          id: params.id,
          action : "faq"
        },
        /*processData: false,
        contentType: false,
        headers: {
            Authorization: "Bearer " + getToken(guard)
        },*/
        beforeSend: function (request) {
            //showInlineLoader();
        },
        success: function(response, textStatus, jqXHR) {

          console.log(response.responseData.faq);
          var result = response.responseData.faq;
          var html = "";
          for(var i in result ){

           html += `<div class="tab rounded border-1">

              <div class="tab-header" data-toggle="collapse" href="#faq-58">

                    <a class="float-left"> <i class="fa fa-bars mr-2"></i>`+ result[i].question +`</a>

                    <a class="float-right text-muted"><i class="fa fa-sort-down"></i></a>

                    <div class="clearfix"></div>

              </div>

                <div class="tab-body p-3 pb-0 collapse" id="faq-58" data-parent="#faqTabs">

                     

                            <div class="form-group mb-2">

                                  <input type="hidden" name="faq_id" value=`+result[i]._id+`>

                                  <input type="text" name="title" placeholder="Title" class="form-control form-control-sm" required value=`+result[i].question+`>

                            </div>

                            <div class="form-group mb-2">

                                  <input name="content" rows="3" class="form-control form-control-sm" value=`+result[i].answer+` />

                            </div>

                            <div class="form-group mb-0">

                                  <a href="#" class="btn btn-danger btn-sm delete-faq">Delete</a>

                                  <button type="submit" class="btn btn-success btn-sm float-right update">Update</button>

                            </div>

                      
                </div>
              </div>`;


          }

          $('#faTabs').html(html);

          $(".update").on('click',function(e) { 
                alert();
                    $.ajax({
                      url: "/api/gig/update/faq",
                      type: 'post',
                      //dataType: 'application/json',
                      data: {
                        question: $("input[name=title]").val(),
                        answer: $("input[name=content]").val(),
                        faq_id: $("input[name=faq_id]").val(),
                        action: "faq",
                        id: params.id
                      },
                      success: function(data) {
                          
                      }
                  });
               });
            /*var data = parseData(response);
            if (table != null) {
            var info = $('#data-table').DataTable().page.info();
            table.order([[ 0, 'asc' ]] ).draw( false );
            }

            $(".crud-modal").modal("hide");
            alertMessage("Success", data.message, "success");
            hideInlineLoader();
           
            if(page!=undefined){
                if(page=='/admin/dashboard'){
                    if(data.responseData.length != 0){
                        localStorage.setItem('admin', JSON.stringify(data.responseData));
                    }
                 }
                 if(page=='store/order'){
                    page = '/home/';
                 }

                setTimeout(function(){
                    window.location.replace(page);
                  }, 1000);
            }*/

        },
        error: function(jqXHR, textStatus, errorThrown) {
            
            /*if (jqXHR.status == 401 && getToken(guard) != null) {
                refreshToken(guard);
            } else if (jqXHR.status == 401) {
                window.location.replace("/admin/login");
            } else if (jqXHR.status == 403) {
                window.location.replace("/access-denied");
            }

            if (jqXHR.responseJSON) {
                if(page=='store/order'){
                    $('.commentLength').html(jqXHR.responseJSON.message);
                    hideInlineLoader();
                    return false;
                }else{
                    alertMessage(textStatus, jqXHR.responseJSON.message, "danger");
                    hideInlineLoader();
                }
            }*/
            
        }
      });
    });
      

    }, [params.id]);
    
    return (

        <Formik

            enableReinitialize
            initialValues={{
                id: params.id,
                description: ''

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

            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log('values',values);
                let data = {
                    id: values.id,
                    description: values.description,
                    action : "desc"
                };

                if (values.action == "desc") {
                    dispatch(updateFaq(data)).then(res => {
                      console.log('id',res.responseData._id);
                      history.push('/gig/post/requirements/'+res.responseData._id)
                        //addToast(res.message, { appearance: res.status, autoDismiss: true, })
                    })
                } else {
                    dispatch(updateFaq(data)).then(res => {
                      
                      history.push('/gig/post/faq/'+params.id)
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
                            
                           <input name="question[]" placeholeder="Question" onChange={handleChange} className="form-control form-control-sm" values="test" />
 
                         </div>
                         <div className="form-group mb-2">
                         <div className="col-md-12">Answer</div>
                            
                            <input name="answer[]" placeholeder="Answer" onChange={handleChange} className="form-control form-control-sm" values="" />
                                         
                                       
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
             <hr className="mt-0" />
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
             
             <div className="form-group mb-0">
                {/* <!--- form-group Starts ---> */}
                <a href="#" className="btn btn-secondary float-left backButton">Back</a>
                <button type="submit" onClick={() => setFieldValue("action", "desc")} className="btn btn-success mr-3 float-right">Save & Continue</button>
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