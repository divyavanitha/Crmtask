import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { useToasts } from 'react-toast-notifications'

import { creategigs } from "../../../../_actions/gigs.action";
import { getCategory, getSubCategory } from "../../../../_actions/user.action";

const AddGig = (props) => {
    //const { addToast } = useToasts()
    const dispatch = useDispatch();

    let history = useHistory();
    const params = useParams();
    useEffect(() => {
        dispatch(getCategory())
        //dispatch(getCategorybyId(params.id))

    }, [params.id]);
    //const category = useSelector(state => state.categories && state.categories.category && state.categories.category.responseData.category);
    const category = useSelector(state => state.user.category);
    const category_list = category && category.responseData.categories;

    const [subCategory, setSubCategory] = useState([])

    const handleCategoryChange = async ({target: input}) => {
      console.log(input.value);
      const sub_category = await dispatch(getSubCategory(input.value))
      if(sub_category && sub_category.responseData.sub_categories){

       setSubCategory(sub_category.responseData.sub_categories)
      }
      
    }
    return (

        <Formik

            enableReinitialize
            initialValues={{
                id: '',
                title: '',
                sub_category_id: '',
                tags: ''

            }
            }

            validationSchema={Yup.object().shape({
                title: Yup.string()
                    .required('Title is required'),
                sub_category_id: Yup.string()
                    .required('Sub Category is required'),
                tags: Yup.string()
                    .required('Tags is required'),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                let data = {
                    id: values.id,
                    title: values.title,
                    sub_category_id: values.sub_category_id,
                    tags: values.tags
                };

                /*if (params.id) {
                    dispatch(updateCategory(data)).then(res => {
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        history.push('/admin/category/')
                    })
                } else {*/
                    dispatch(creategigs(data)).then(res => {
                      console.log('id',res.responseData._id);
                      history.push('/gig/post/pricing/'+res.responseData._id)
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

          <div className="tab-pane fade show active" id="gallery">
             <h5 className="font-weight-normal">Build Your Proposal Gallery</h5>
             <h6 className="font-weight-normal">Add memorable content to your gallery to set yourself apart from competitors.</h6>
             <hr />
             <p className="text-right mb-0">
                <span className="float-left">Proposal Photos/Audio</span>
                <small className="text-muted" style={{ fontSize:'78%' }}>Upload Photos that describe or related to your proposal.your image size must be 700 x 390 pixels.</small>
             </p>
             <form action="" className="proposal-form" id="gallery_form">
                {/* <!--- form Starts ---> */}
                <div className="row gallery">
                   {/* <!--- row gallery Starts ---> */}
                   <div className="col-md-3">
                      {/* <!--- col-md-3 Starts ---> */}
                      <div className="pic add-pic">
                         {/* <i className="fa fa-picture-o fa-2x mb-2"></i><br /> <span>Browse Image/Audio</span>
                         <input type="hidden" name="proposal_img1" value="" />
                         <input type="hidden" name="proposal_img1_s3" value="0" /> */}
                         <input type="file" name="photo" onChange={(e) => { setFieldValue("photo", e.currentTarget.files[0]) }} />
                      </div>
                   </div>
                   {/* <!--- col-md-3 Ends ---> */}
                   <div className="col-md-3">
                      {/* <!--- col-md-3 Starts ---> */}
                      <div className="pic">
                         <i className="fa fa-picture-o fa-2x mb-2"></i><br /> <span>Browse Image/Audio</span>
                         <input type="hidden" name="proposal_img2" value="" />
                         <input type="hidden" name="proposal_img2_s3" value="0" />
                      </div>
                   </div>
                   {/* <!--- col-md-3 Ends ---> */}
                   <div className="col-md-3">
                      {/* <!--- col-md-3 Starts ---> */}
                      <div className="pic">
                         <i className="fa fa-picture-o fa-2x mb-2"></i><br /> <span>Browse Image/Audio</span>
                         <input type="hidden" name="proposal_img3" value="" />
                         <input type="hidden" name="proposal_img3_s3" value="0" />
                      </div>
                   </div>
                   {/* <!--- col-md-3 Ends ---> */}
                   <div className="col-md-3">
                      {/* <!--- col-md-3 Starts ---> */}
                      <div className="pic">
                         <i className="fa fa-picture-o fa-2x mb-2"></i><br /> <span>Browse Image/Audio</span>
                         <input type="hidden" name="proposal_img4" value="" />
                         <input type="hidden" name="proposal_img3_s3" value="0" />
                      </div>
                   </div>
                   {/* <!--- col-md-3 Ends ---> */}
                </div>
                {/* <!--- row gallery Ends ---> */}
                <hr />
                <p className="text-right mb-0">
                   <span className="float-left">Add Video</span>
                   <small className="text-muted" style={{ fontSize:'78%' }}>(Optional) Supported Video Extensions Include : 'mp4','mov','avi','flv','wmv'.</small>
                </p>
                <div className="row gallery">
                   {/* <!--- row gallery Starts ---> */}
                   <div className="col-md-12">
                      {/* <!--- col-md-3 Starts ---> */}
                      <div className="pic add-video">
                         <span className="chose"><i className="fa fa-video-camera fa-2x mb-2"></i><br />Add Video</span>
                      </div>
                      <input type='hidden' name='proposal_video' value='' id='v_file' /> 
                      <input type='hidden' name='proposal_video_s3' value='0' id='v_file_s3' /> 
                   </div>
                   {/* <!--- col-md-3 Ends ---> */}
                </div>
                {/* <!--- row gallery Ends ---> */}
             </form>
             {/* <!--- form Ends ---> */}
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