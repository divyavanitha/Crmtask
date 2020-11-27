import React, { Fragment, useState, FormEvent, Dispatch, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { useToasts } from 'react-toast-notifications'
import $ from 'jquery';
import { useDropzone } from 'react-dropzone'
import { updateImage } from "../../../../_actions/gigs.action";


const Gallery = (props) => {
  const dropzoneStyle = {
    width: "100%",
    height: "200px",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderStyle: "solid",
    borderRadius: 5,
  }
  const maxSize = 1048576;
  //const { addToast } = useToasts()
  const dispatch = useDispatch();

  let history = useHistory();
  const params = useParams();
  useEffect(() => {


  }, [params.id]);
  let files = [];
  let [file, setFile] = useState([]);

  const onDrop = useCallback(acceptedFiles => {

    files.push(acceptedFiles);
    setFile(files);
  }, []);


  const { isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, rejectedFiles } = useDropzone({
    onDrop,
    accept: 'image/png',
    minSize: 0,
    maxSize,
  });

  //const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  return (

    <Formik
      initialValues={{
        id: params.id
      }}
      validationSchema={Yup.object().shape({
        /* photo: Yup.string()
             .required('Photo is required'),*/
      })}

      onSubmit={(values, { setSubmitting, resetForm }) => {

        const data = new FormData();
        data.append( "id", params.id );

        for (var i = 0; i < file.length; i++) {
          data.append( "photo[]", file[i][0] );
        }

        dispatch(updateImage(data)).then(res => {
          console.log('id',res.responseData._id);
          history.push('/gig/post/approval/'+res.responseData._id)
            
        })
        
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
                      <a className="nav-link " href="#publish">Submit For Approval</a>
                  </div>
                </div>

              </div>

            </nav>

            <div className="container mt-5 mb-5">

              <div className="row">

                <div className="col-xl-8 col-lg-12 col-md-12 offset-xl-2">


                  <div className="tab-content card card-body">


                    <div className="tab-pane fade show active" id="gallery">
                      <h5 className="font-weight-normal">Build Your Proposal Gallery</h5>
                      <h6 className="font-weight-normal">Add memorable content to your gallery to set yourself apart from competitors.</h6>
                      <hr />
                      <p style={{ fontSize: '12px' }} className="text-right mb-0">
                        <span className="float-left">Proposal Photos/Audio</span>
                        <small className="text-muted" style={{ fontSize: '78%' }}>Upload Photos that describe or related to your proposal.your image size must be 700 x 390 pixels.</small>
                      </p>


                      <form onSubmit={handleSubmit} encType="multipart/form-data" >

                        <div style={dropzoneStyle} {...getRootProps()}>
                          <input {...getInputProps()} />
                          {!isDragActive && <p style={{ textAlign: 'center', color: '#eaeaea' }}>Click here or drop a file to upload!</p>}
                          {isDragActive && !isDragReject && <p style={{ textAlign: 'center', color: '#eaeaea' }}>Drop it like it's hot!</p>}
                          {isDragReject && <p style={{ textAlign: 'center', color: '#eaeaea' }}>File type not accepted, sorry!</p>}
                          {file.map( (f, i) => {
                            let reader = new FileReader();
                            reader.readAsDataURL(f[0]);

                            let thumb;

                            reader.onloadend = () => {
                              //thumb = reader.result;
                            };

                            reader.onload = () => {
                              $('#'+i).attr('src', reader.result);
                            };
                          
                            reader.onerror = function() {
                              console.log(reader.error);
                            };

                            return (<img style={{padding: '10px', width: '150px' }} key={i} id={i} src={reader.result} alt={f[0].name} />)
                            
                          }
                           )}
                        </div>

                        <div className="mb-5"></div>
                        <div className="form-group mb-0">

                          <a href="#" className="btn btn-secondary float-left back-to">Back</a>
                          <button type="submit" onClick={() => setFieldValue("action", "desc")} className="btn btn-success mr-3 float-right">Save & Continue</button>
                          <a href="tyrone/logo-making" id="previewProposal" className="btn btn-success float-right mr-3 d-none">Preview Proposal</a>

                        </div>

                      </form>
                    </div>

                    <input type="hidden" name="section" value="instant_delivery" />
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

export default Gallery;