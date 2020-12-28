import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { useToasts } from 'react-toast-notifications'

import { updateConfirm } from "../../../../_actions/gigs.action";


const GigApproval = (props) => {
  //const { addToast } = useTasts()
  const dispatch = useDispatch();

  let history = useHistory();
  const params = useParams();
  useEffect(() => {

  }, [params.id]);


  return (

    <Formik

      enableReinitialize
      initialValues={{
        id: '',
        proposal: 0


      }
      }

      validationSchema={Yup.object().shape({
        /*proposal: Yup.number()
            .required('Proposal feature is required'),*/

      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        let data = {
          id: params.id,
          proposal: values.proposal,

        };

        dispatch(updateConfirm(data)).then(res => {
          console.log('id', res.responseData._id);
          history.push('/gigs');

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
                    <a className="nav-link" href="#overview">
                      Overview      </a>

                    <a className="nav-link d-none " href="#video">
                      Video Settings      </a>

                    <a className="nav-link  d-none" href="#instant-delivery">
                      Instant Delivery      </a>

                    <a className="nav-link  " href="#pricing">
                      Pricing     </a>

                    <a className="nav-link " href="#description">
                      Description &amp; FAQ     </a>
                    <a className="nav-link  " href="#requirements">
                      Requirements      </a>
                    <a className="nav-link " href="#gallery">
                      Gallery     </a>
                    <a className="nav-link active" href="#publish">Submit For Approval</a>
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

                    <div className="tab-pane fade show active" id="publish">
                      <h1><img style={{ position: 'relative', top: '-5px' }} src={require('../../../../assets/images/comp/winner.png')} />  Yay! You are almost done!</h1>
                      <h6 className="font-weight-normal line-height-normal">
                        Congrats! you're almost done submitting this proposal. <br />
                You can go back and check if you entered all the details for this proposal correctly. If all looks good and you agree with
                <a href="https://www.gigtodo.com/terms_and_conditions" target="_black" className="text-primary">all our policies</a>, please click on the “Save &amp; Submit For Approval” button.<br /><br />
                        <span className="text-muted">
                          If you do not wish to submit this proposal for approval at this time, please exit this page. You can easily retrieve this proposal by clicking on "Selling => My Proposals => Drafts". Cheers!
                </span>
                      </h6>
                      <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <h1 className="h3">Make Proposal Featured (Optional)</h1>
                        <h6 className="font-weight-normal line-height-normal">
                          Let your proposal appear on several places on GigToDo<br />
                   Proposal will always be at the top section of search results <br />
                   WIth GigToDo feature, your proposal already has a 50% chance of getting ordered by potential buyers
                   <p className="ml-4 mt-3">
                            <label for="checkid" style={{ wordWrap: 'break-word' }}>
                              <input type='checkbox' onClick={(e) => { setFieldValue(`proposal`, e.currentTarget.checked); }} value={values.proposal} name='proposal' style={{ verticalAlign: 'middle', marginLeft: '-1.25rem' }} /> Make Proposal Featured
                      </label>
                          </p>
                        </h6>
                        <div className="form-group mb-0 mt-3">
                          {/* <!--- form-group Starts ---> */}
                          <Link to={"/gig/gallery/"+params.id} className="btn btn-secondary back-to-gallery">Back</Link>
                          <input className="btn btn-success" type="submit" name="submit_proposal" value="Save &amp; Submit For Approval" />
                          <a href="#" className="btn btn-success d-none" id="featured-button">Make Proposal Featured</a>
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

export default GigApproval;