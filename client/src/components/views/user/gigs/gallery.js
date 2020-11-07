import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { useToasts } from 'react-toast-notifications'
import Thumb from "./Thumb";
import Dropzone from "react-dropzone";
import { updateImage } from "../../../../_actions/gigs.action";

const dropzoneStyle = {
  width: "100%",
  height: "auto",
  borderWidth: 2,
  borderColor: "rgb(102, 102, 102)",
  borderStyle: "dashed",
  borderRadius: 5,
}

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
                files: [],
                
            }
            }

            validationSchema={Yup.object().shape({
               /* photo: Yup.string()
                    .required('Photo is required'),*/
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log('values', values);
                let data = {
                    id: values.id,
                    photo: values.files
                };

                /*if (params.id) {
                    dispatch(updateCategory(data)).then(res => {
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        history.push('/admin/category/')
                    })
                } else {*/
                    dispatch(updateImage(data)).then(res => {
                      console.log('id',res.responseData._id);
                      history.push('/gig/post/upload/'+res.responseData._id)
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
                    handleReset,
                    setFieldValue,
                } = props;

                return (
                    <Fragment>


                        <nav className="gig-tab-nav" id="tabs">

                          <div className="container">

                            <div className="breadcrumb flat mb-0 nav" role="tablist">
                              <div className="breadcrumbList">
                                <a className="nav-link " href="#overview">
                                  Overview      </a>

                                <a className="nav-link d-none " href="#video">
                                  Video Settings      </a>

                                <a className="nav-link  d-none" href="#instant-delivery">
                                  Instant Delivery      </a>

                                <a className="nav-link  " href="#pricing">
                                  Pricing     </a>

                                <a className="nav-link " href="#description">
                                  Description & FAQ     </a>
                                <a className="nav-link  " href="#requirements">
                                  Requirements      </a>
                                <a className="nav-link active" href="#gallery">
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

          <div className="tab-pane fade show active" id="gallery">
             <h5 className="font-weight-normal">Build Your Proposal Gallery</h5>
             <h6 className="font-weight-normal">Add memorable content to your gallery to set yourself apart from competitors.</h6>
             <hr />
             <p className="text-right mb-0">
                <span className="float-left">Proposal Photos/Audio</span>
                <small className="text-muted" style={{ fontSize:'78%' }}>Upload Photos that describe or related to your proposal.your image size must be 700 x 390 pixels.</small>
             </p>
             <form onSubmit={handleSubmit} encType="multipart/form-data" id="gallery_form">
                {/* <!--- form Starts ---> */}
                <div className="row gallery">
                   <Dropzone style={dropzoneStyle} accept="image/*" onDrop={(acceptedFiles) => {
              // do nothing if no files
                      if (acceptedFiles.length === 0) { return; }

                      // on drop we add to the existing files
                      setFieldValue("files", values.files.concat(acceptedFiles));
                    }}>
                      {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                        if (isDragActive) {
                          return "This file is authorized";
                        }

                        if (isDragReject) {
                          return "This file is not authorized";
                        }

                        if (values.files.length === 0) { 
                          return <p>Try dragging a file here!</p>
                        }

                        return values.files.map((file, i) => (<Thumb key={i} file={file} />));
                      }}
                    </Dropzone>
                </div>

           
             <div className="mb-5"></div>
             <div className="form-group mb-0">
                {/* <!--- form-group Starts ---> */}
                <a href="#" className="btn btn-secondary float-left back-to">Back</a>
                <input className="btn btn-success float-right" type="submit" form="gallery_form" value="Save & Continue" />
                <a href="tyrone/logo-making" id="previewProposal" className="btn btn-success float-right mr-3 d-none">Preview Proposal</a>
                {/* <!-- 
                   <input className="btn btn-success float-right" type="submit" form="gallery_form" value="Save & Continue">
                   <a href="tyrone/logo-making" id="previewProposal" className="btn btn-success float-right mr-3 d-none">Preview Proposal</a>
                   
                   --> */}
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