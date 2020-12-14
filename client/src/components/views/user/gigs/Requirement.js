import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { useToasts } from 'react-toast-notifications'

import { updateRequirement } from "../../../../_actions/gigs.action";


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
        requirement: ''

      }
      }

      validationSchema={Yup.object().shape({
        requirement: Yup.string()
             .required('Requirement is required')
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        let data = {
          id: values.id,
          requirement: values.requirement
        };

        /*if (params.id) {
            dispatch(updateCategory(data)).then(res => {
                addToast(res.message, { appearance: res.status, autoDismiss: true, })
                history.push('/admin/category/')
            })
        } else {*/
        dispatch(updateRequirement(data)).then(res => {
          console.log('id', res.responseData._id);
          history.push('/gig/post/gallery/' + res.responseData._id)
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
                    <a className="nav-link" href="#overview">
                      Overview      </a>

                    <a className="nav-link d-none " href="#video">
                      Video Settings      </a>

                    <a className="nav-link  d-none" href="#instant-delivery">
                      Instant Delivery      </a>

                    <a className="nav-link  " href="#pricing">
                      Pricing     </a>

                    <a className="nav-link " href="#description">
                      Description & FAQ     </a>
                    <a className="nav-link  active" href="#requirements">
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

                    <div className="tab-pane fade show active" id="requirements">
                      <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* <!--- form Starts --> */}
                        <h5 className="font-weight-normal">
                          <span className="float-left mr-2"><i className="fa fa-file text-info fa-1x"></i> </span>
                          <span className="float-left">
                            Tell your buyer what you need to get started (Optional) <br />
                            <small className="text-muted">Structure your Buyer Instructions as free text.</small>
                          </span>
                          <div className="clearfix"></div>
                        </h5>
                        <hr />
                        <div className="form-group requirements">
                          <p className="mb-1">Requirements</p>
                          <textarea onChange={handleChange} name="requirement" value={values.requirement} placeholder="If you need to obtain information, files or other items from the buyer prior to starting your work, please add your instructions here. For example: Please send me your company name or Please send me the photo you need me to edit." rows="4" className="form-control"></textarea>
                          <ErrorMessage name="requirement" component="div" className="error-message" />
                        </div>
                        <div className="form-group mb-0">
                          {/* <!--- form-group Starts ---> */}
                          <a href="#" className="btn btn-secondary float-left back-to-desc">Back</a>
                          <button type="submit" className="btn btn-success btn-sm float-right">Save & Continue</button>
                        </div>
                        {/* <!--- form-group Starts ---> */}
                      </form>
                      {/* <!--- form Ends --> */}

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