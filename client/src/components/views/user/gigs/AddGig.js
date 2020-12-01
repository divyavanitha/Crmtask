import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import * as Yup from 'yup';
//import { useToasts } from 'react-toast-notifications'

import { creategigs } from "../../../../_actions/gigs.action";
import { getCategory, getSubCategory } from "../../../../_actions/user.action";

const AddGig = (props) => {
   //const { addToast } = useTasts()
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
   const [categorylist, setCategorylist] = useState('');

   const [subCategory, setSubCategory] = useState([]);
   const [tags, setTags] = useState([]);

   const handleCategoryChange = async (value, setFieldValue) => {
      setCategorylist(value);
      if(value) {
         setFieldValue('category_id', value);
         const sub_category = await dispatch(getSubCategory(value));
         if (sub_category && sub_category.responseData.sub_categories) {
            setSubCategory(sub_category.responseData.sub_categories)
         }
      }
      

   }

   const handleTagChange = (tag, setFieldValue) => {
      setTags(tag);
      setFieldValue('tags', tag);
   }



   return (

      <Formik

         enableReinitialize
         initialValues={{
            id: '',
            title: '',
            category_id: '',
            sub_category_id: '',
            tags: []

         }
         }

         validationSchema={Yup.object().shape({
            title: Yup.string()
                .required('Title is required'),
            category_id: Yup.string()
                .required('Category is required'),
            sub_category_id: Yup.string()
                .required('Sub Category is required'),
            tags: Yup.string()
                .required('Tags is required'),
         })}
         onSubmit={(values, { setSubmitting, resetForm }) => {

            let data = {
               id: values.id,
               title: values.title,
               category_id: values.category_id,
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
               history.push('/gig/post/pricing/' + res.responseData._id)
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
                              <a className="nav-link active" href="#overview">
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
                              <div className="tab-pane fade show active" id="overview">
                                 <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    {/* <!--- form Starts --> */}
                                    <div className="form-group row">
                                       {/* <!--- form-group row Starts ---> */}
                                       <div className="col-md-3">Gig Title</div>
                                       <div className="col-md-9">
                                          <textarea name="title" value={values.title} onChange={handleChange} rows="2" placeholder="Title" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} >logo making </textarea>
                                          <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                       </div>
                                       <small className="form-text text-danger"></small>
                                    </div>
                                    {/* <!--- form-group row Ends ---> */}
                                    <div className="form-group row">
                                       {/* <!--- form-group row Starts ---> */}
                                       <div className="col-md-3"> Category </div>
                                       <div className="col-md-9">
                                          <select name="category_id" className={'form-control mb-3' + (errors.category_id && touched.category_id ? ' is-invalid' : '')} onChange={(e) => { handleCategoryChange(e.currentTarget.value, setFieldValue) }}>
                                             <option value="">Select Catagory</option>

                                             {category_list && category_list.map((c_list) => (<option key={c_list._id} value={c_list._id} onChange={handleCategoryChange}>{c_list.name}</option>))}

                                          </select>
                                          <ErrorMessage name="category_id" component="div" className="invalid-feedback" />
                                          <small className="form-text text-danger"></small>

                                          {categorylist && (<Fragment><select name="sub_category_id" className={'form-control' + (errors.sub_category_id && touched.sub_category_id ? ' is-invalid' : '')} onChange={(e) => { setFieldValue('sub_category_id', e.currentTarget.value); }} >

                                             <option value="">Sub Catagory</option>

                                             {subCategory.map((s_list) => (<option key={s_list._id} value={s_list._id} >{s_list.name}</option>))}
                                          </select>
                                          <ErrorMessage name="sub_category_id" component="div" className="invalid-feedback" /></Fragment>) }

                                       </div>
                                    </div>
                                    {/* <!--- form-group row Ends ---> */}

                                    <div className="form-group row">
                                       {/* <!--- form-group row Starts ---> */}
                                       <div className="col-md-3">Tags</div>
                                       <div className="col-md-9">
                                          <TagsInput value={tags} name="tags" onChange={(e) => handleTagChange(e, setFieldValue)} className={'form-control' + (errors.tags && touched.tags ? ' is-invalid' : '')} data-role="tagsinput" />
                                          <ErrorMessage name="tags" component="div" className="invalid-feedback" />
                                       </div>
                                       <small className="form-text text-danger"></small>
                                    </div>
                                    {/* <!--- form-group row Ends ---> */}
                                    <div className="form-group mb-0">
                                       {/* <!--- form-group Starts ---> */}
                                       <a href="view_proposals" className="float-left btn btn-secondary">Cancel</a>
                                       <button type="submit" className="btn btn-success mr-3 float-right">Save & Continue</button>
                                    </div>
                                    {/* <!--- form-group Starts ---> */}
                                 </form>
                                 {/* <!--- form Ends --> */}
                              </div>
                              <div className="tab-pane fade " id="video">
                                 <h4 className="font-weight-normal">Video</h4>
                                 <hr />
                                 <form action="#" method="post" className="video-form">
                                    {/* <!--- form Starts --> */}
                                    <div className="form-group row">
                                       {/* <!--- form-group row Starts ---> */}
                                       <label className="col-md-4 col-form-label">Enable video calling:</label>
                                       <div className="col-md-5">
                                          <input type="checkbox" name="enable" className="mt-3" value="1" />
                                       </div>
                                    </div>
                                    <div className="form-group row">
                                       {/* <!--- form-group row Starts ---> */}
                                       <label className="col-md-4 col-form-label">Price per minute:</label>
                                       <div className="col-md-5">
                                          <input type="number" min="0.5" name="price_per_minute" className="form-control" value="" step="any" required="" />
                                       </div>
                                    </div>
                                    <div className="form-group row">
                                       {/* <!--- form-group row Starts ---> */}
                                       <div className="col-md-4 col-form-label">Delivery Time</div>
                                       <div className="col-md-5">
                                          <select name="delivery_id" className="form-control" required="">
                                             <option value="1">  1 Day </option>
                                             <option value='2'>2 Days</option>
                                             <option value='3'>3 Days</option>
                                             <option value='4'>4 Days</option>
                                             <option value='5'>5 Days</option>
                                             <option value='6'>6 Days</option>
                                             <option value='7'>7 Days</option>
                                             <option value='8'>7+</option>
                                          </select>
                                       </div>
                                       <small className="form-text text-danger"></small>
                                    </div>
                                    {/* <!--- form-group row Ends ---> */}
                                    <div className="form-group row">
                                       {/* <!--- form-group row Starts ---> */}
                                       <label className="col-md-4 col-form-label">Days within which a video session can be scheduled:</label>
                                       <div className="col-md-5">
                                          <select name="days_within_scheduled" className="form-control">
                                             <option value="1" >1 Day</option>
                                             <option value="2" >2 Days</option>
                                             <option value="3" >4 Days</option>
                                             <option value="4" >6 Days</option>
                                             <option value="5" >7 Days</option>
                                             <option value="7" >8 Days</option>
                                             <option value="8" >10 Days</option>
                                             <option value="9" >11 Days</option>
                                             <option value="10" >Best Value</option>
                                             <option value="11" >call between Pat and Tyrone</option>
                                             <option value="12" >hello</option>
                                             <option value="13" >video</option>
                                          </select>
                                       </div>
                                    </div>
                                    <hr />
                                    <div className="form-group mb-0">
                                       {/* <!--- form-group Starts ---> */}
                                       <a href="#" className="btn btn-secondary float-left back-to-overview">Back</a>
                                       <input className="btn btn-success float-right" type="submit" value="Save & Continue" />
                                    </div>
                                    {/* <!--- form-group Starts ---> */}
                                 </form>
                                 {/* <!--- form Ends --> */}

                              </div>
                              <div className="tab-pane fade show" id="instant-delivery">
                                 <h5 className="font-weight-normal float-left">Instant Delivery</h5>
                                 <div className="float-right switch-box">
                                    <span className="text">Enable Instant Delivery:</span>
                                    <label className="switch">
                                       <input type="checkbox" name="enable" form="delivery-form" value="1" />
                                       <span className="slider"></span>
                                    </label>
                                 </div>
                                 <div className="clearfix"></div>
                                 <hr className="mt-0" />
                                 <div className="alert alert-warning d-none">
                                    ! Instant Delivery Will Only Work When Some One Buy This Proposal Directly Or Buy Cart.
             </div>
                                 <div className="alert alert-info">
                                    With this, any item uploaded on here will be available for instant download after purchase.
             </div>
                                 <form action="#" enctype="multipart/form-data" method="post" id="delivery-form">
                                    {/* <!--- form Starts --> */}
                                    <div className="form-group">
                                       <p className="mb-2">Message</p>
                                       <textarea name="message" placeholder="Message" rows="4" className="form-control"></textarea>
                                    </div>
                                    <div className="alert alert-info">
                                       <p className='mb-1'>Accepted Files: jpeg, jpg, gif, png, tif, avi, mpeg, mpg, mov, rm, 3gp, flv, mp4, zip, rar, mp3, wav, docx, csv, xls, pptx, pdf, txt</p>
                                       <p className='mb-0'>Max Upload Size: 100mb</p>
                                    </div>
                                    <div className="form-group float-left">
                                       <input type="file" id="deliveryFile" name="file" className="mb-3" />
                                       <div id="downloadFile">
                                       </div>
                                    </div>
                                    <div className="form-group float-right">
                                       <label for="">Enable Watermark : </label>
                                       <input type="checkbox" name="enable_watermark" value="1" style={{ position: 'relative', top: '2px' }} />
                                    </div>
                                    <div className="clearfix"></div>
                                    <hr className="mt-0" />
                                    <div className="form-group mb-0">
                                       {/* <!--- form-group Starts ---> */}
                                       <a href="#" className="btn btn-secondary float-left back-to-req">Back</a>
                                       <input className="btn btn-success float-right" type="submit" value="Save & Continue" />
                                    </div>
                                    {/* <!--- form-group Starts ---> */}
                                 </form>
                                 {/* <!--- form Ends --> */}

                              </div>
                              <div className="tab-pane fade" id="pricing">
                                 <h5 className="font-weight-normal float-left">Pricing</h5>
                                 <div className="float-right switch-box">
                                    <span className="text">Fixed Price :</span>
                                    <label className="switch">
                                       <input type="checkbox" className="pricing" />
                                       <span className="slider"></span>
                                    </label>
                                 </div>
                                 <div className="clearfix"></div>
                                 <hr className="mt-0" />
                                 <div className="form-group row proposal-price justify-content-center">
                                    <div className="col-md-7">
                                       <label>Proposal Price</label>
                                       <div className="input-group">
                                          <span className="input-group-addon font-weight-bold">
                                             &#036;    </span>
                                          <input type="number" className="form-control" form="pricing-form" name="proposal_price" min="5" value="0" />
                                       </div>
                                       <small>If you want to use packages, you need to set this field value to 0.</small>
                                    </div>
                                 </div>
                                 <div className="form-group row proposal-price justify-content-center mb-4">
                                    {/* <!--- form-group row Starts ---> */}
                                    <div className="col-md-7">
                                       <label>Proposal Revisions</label>
                                       <select name="proposal_revisions" form="pricing-form" className="form-control" required="">
                                          <option value='0' selected>0</option>
                                          <option value='1' >1</option>
                                          <option value='2' >2</option>
                                          <option value='3' >3</option>
                                          <option value='4' >4</option>
                                          <option value='5' >5</option>
                                          <option value='6' >6</option>
                                          <option value='7' >7</option>
                                          <option value='8' >8</option>
                                          <option value='9' >9</option>
                                          <option value='10' >10</option>
                                          <option value='unlimited' >Unlimited Revisions</option>
                                       </select>
                                       <small>Set to 0 if your proposal is configured for instant delivery.</small>
                                    </div>
                                    <small className="form-text text-danger"></small>
                                 </div>
                                 {/* <!--- form-group row Ends ---> */}
                                 <div className="form-group row proposal-price justify-content-center mb-4">
                                    {/* <!--- form-group row Starts ---> */}
                                    <div className="col-md-7">
                                       <label>Delivery Time</label>
                                       <select name="delivery_id" form="pricing-form" className="form-control" required="">
                                          <option value="">Select Delivery Time</option>
                                          <option value='1' selected>1 Day</option>
                                          <option value='2' >2 Days</option>
                                          <option value='3' >3 Days</option>
                                          <option value='4' >4 Days</option>
                                          <option value='5' >5 Days</option>
                                          <option value='6' >6 Days</option>
                                          <option value='7' >7 Days</option>
                                          <option value='8' >7+</option>
                                       </select>
                                       <small>Please select 1 day if this is for an instant delivery.</small>
                                    </div>
                                    <small className="form-text text-danger"></small>
                                 </div>
                                 {/* <!--- form-group row Ends ---> */}
                                 <div className="packages">
                                    <table className="table table-bordered packages">
                                       <thead>
                                          <tr>
                                             <th></th>
                                             <th>Basic</th>
                                             <th>Standard</th>
                                             <th>Advance</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <form action="#" method="post" className="pricing-form" id="pricing-form">
                                             <input type="hidden" name="proposal_packages[1][package_id]" form="pricing-form" value="3145" />
                                             <input type="hidden" name="proposal_packages[2][package_id]" form="pricing-form" value="3146" />
                                             <input type="hidden" name="proposal_packages[3][package_id]" form="pricing-form" value="3147" />
                                             <tr>
                                                <td>Description</td>
                                                <td className="p-0"><textarea name="proposal_packages[1][description]" form="pricing-form" className="form-control" placeholder="Description" rows="3"></textarea></td>
                                                <td className="p-0"><textarea name="proposal_packages[2][description]" form="pricing-form" className="form-control" placeholder="Description" rows="3"></textarea></td>
                                                <td className="p-0"><textarea name="proposal_packages[3][description]" form="pricing-form" className="form-control" placeholder="Description" rows="3"></textarea></td>
                                             </tr>
                                             <tr className="delivery-time">
                                                <td>Delivery Time</td>
                                                <td className="p-0">
                                                   <select name="proposal_packages[1][delivery_time]" className="form-control">
                                                      <option value='1' >1 Day</option>
                                                      <option value='2' >2 Days</option>
                                                      <option value='3' >3 Days</option>
                                                      <option value='4' >4 Days</option>
                                                      <option value='5' >5 Days</option>
                                                      <option value='6' >6 Days</option>
                                                      <option value='7' >7 Days</option>
                                                      <option value='7' >7+</option>
                                                   </select>
                                                </td>
                                                <td className="p-0">
                                                   <select name="proposal_packages[2][delivery_time]" form="pricing-form" className="form-control">
                                                      <option value='1' >1 Day</option>
                                                      <option value='2' >2 Days</option>
                                                      <option value='3' >3 Days</option>
                                                      <option value='4' >4 Days</option>
                                                      <option value='5' >5 Days</option>
                                                      <option value='6' >6 Days</option>
                                                      <option value='7' >7 Days</option>
                                                      <option value='7' >7+</option>
                                                   </select>
                                                </td>
                                                <td className="p-0">
                                                   <select name="proposal_packages[3][delivery_time]" form="pricing-form" className="form-control">
                                                      <option value='1' >1 Day</option>
                                                      <option value='2' >2 Days</option>
                                                      <option value='3' >3 Days</option>
                                                      <option value='4' >4 Days</option>
                                                      <option value='5' >5 Days</option>
                                                      <option value='6' >6 Days</option>
                                                      <option value='7' >7 Days</option>
                                                      <option value='7' >7+</option>
                                                   </select>
                                                </td>
                                             </tr>
                                             <tr>
                                                <td>Revisions</td>
                                                <td className="p-0">
                                                   <select name="proposal_packages[1][revisions]" form="pricing-form" className="form-control">
                                                      <option value='0' selected>0</option>
                                                      <option value='1'>1</option>
                                                      <option value='2'>2</option>
                                                      <option value='3'>3</option>
                                                      <option value='4'>4</option>
                                                      <option value='5'>5</option>
                                                      <option value='6'>6</option>
                                                      <option value='7'>7</option>
                                                      <option value='8'>8</option>
                                                      <option value='9'>9</option>
                                                      <option value='10'>10</option>
                                                      <option value='unlimited'>Unlimited Revisions</option>
                                                   </select>
                                                </td>
                                                <td className="p-0">
                                                   <select name="proposal_packages[2][revisions]" form="pricing-form" className="form-control">
                                                      <option value='0' selected>0</option>
                                                      <option value='1'>1</option>
                                                      <option value='2'>2</option>
                                                      <option value='3'>3</option>
                                                      <option value='4'>4</option>
                                                      <option value='5'>5</option>
                                                      <option value='6'>6</option>
                                                      <option value='7'>7</option>
                                                      <option value='8'>8</option>
                                                      <option value='9'>9</option>
                                                      <option value='10'>10</option>
                                                      <option value='unlimited'>Unlimited Revisions</option>
                                                   </select>
                                                </td>
                                                <td className="p-0">
                                                   <select name="proposal_packages[3][revisions]" form="pricing-form" className="form-control">
                                                      <option value='0' selected>0</option>
                                                      <option value='1'>1</option>
                                                      <option value='2'>2</option>
                                                      <option value='3'>3</option>
                                                      <option value='4'>4</option>
                                                      <option value='5'>5</option>
                                                      <option value='6'>6</option>
                                                      <option value='7'>7</option>
                                                      <option value='8'>8</option>
                                                      <option value='9'>9</option>
                                                      <option value='10'>10</option>
                                                      <option value='unlimited'>Unlimited Revisions</option>
                                                   </select>
                                                </td>
                                             </tr>
                                             <tr>
                                                <td>Price</td>
                                                <td className="p-0">
                                                   <input type="number" min='5' required name="proposal_packages[1][price]" form="pricing-form" value="5" className="form-control" />
                                                </td>
                                                <td className="p-0">
                                                   <input type="number" min='5' required name="proposal_packages[2][price]" form="pricing-form" value="10" className="form-control" />
                                                </td>
                                                <td className="p-0">
                                                   <input type="number" min='5' required name="proposal_packages[3][price]" form="pricing-form" value="15" className="form-control" />
                                                </td>
                                             </tr>
                                          </form>
                                       </tbody>
                                    </table>
                                    {/* <!-- Modal --> */}
                                    <div className="modal fade" id="edit-modal" role="dialog">
                                       <div className="modal-dialog" role="document">
                                          <div className="modal-content">
                                             <div className="modal-header">
                                                <h5 className="modal-title">Edit Attribute Name</h5>
                                                <button type="button" className="close" data-dismiss="modal">
                                                   <span>&times;</span>
                                                </button>
                                             </div>
                                             <div className="modal-body">
                                                <form action="" method="post" className="update-attribute">
                                                   <input type="hidden" name="name" value="" />
                                                   <div className="form-group">
                                                      <input type="text" className="form-control" name="new_name" placeholder="Attribute Name" />
                                                   </div>
                                                   <div className="form-group text-center mb-0">
                                                      <input type="submit" className="btn btn-success" value="Update Attribute Name" />
                                                   </div>
                                                </form>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="form-group row add-attribute justify-content-center">
                                    <div className="col-md-7">
                                       <div className="input-group">
                                          <input className="form-control form-control-sm attribute-name" placeholder="Add New Attribute" name="" />
                                          <button className="btn btn btn-success input-group-addon insert-attribute" >
                                             <i className="fa fa-cloud-upload"></i> &nbsp;Insert
                      </button>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="card rounded-0">
                                    <div className="card-body bg-light pt-3 pb-0">
                                       <h6 className="font-weight-normal">My Proposal Extras</h6>
                                       <a data-toggle="collapse" href="#insert-extra" className="small text-success">+ Add Extra</a>
                                       <div className="tabs accordion mt-2" id="allTabs">
                                          {/* <!--- All Tabs Starts ---> */}
                                          <div className="tab">
                                             {/* <!-- tab rounded Starts --> */}
                                             <div className="tab-body rounded border-1 p-3 pb-0 collapse " id="insert-extra" data-parent="#allTabs">
                                                <form action="#" method="post" className="add-extra">
                                                   <div className="form-group">
                                                      <input type="text" name="name" placeholder="Extra Name" className="form-control form-control-sm" required="" />
                                                      <small className="form-text text-danger"></small>
                                                   </div>
                                                   <div className="form-group">
                                                      <div className="input-group input-group-sm">
                                                         {/* <!--- input-group Starts ---> */}
                                                         <span className="input-group-addon">&#036;</span>
                                                         <input type="number" name="price" placeholder="Extra Price" className="form-control form-control-sm" required="" />
                                                      </div>
                                                      <small className="form-text text-danger"></small>
                                                      {/* <!--- input-group Ends ---> */}
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
                                    </div>
                                 </div>
                                 <div className="form-group mt-4 mb-0">
                                    {/* <!--- form-group Starts ---> */}
                                    <a href="#" className="btn btn-secondary float-left back-to-instant">Back</a>
                                    <input className="btn btn-success float-right" type="submit" form="pricing-form" value="Save & Continue" />
                                 </div>
                                 {/* <!--- form-group Starts ---> */}

                              </div>
                              <div className="tab-pane fade" id="description">
                                 <h5 className="font-weight-normal">Description</h5>
                                 <hr />
                                 <p className="small mb-2"> Project Details </p>
                                 <form action="#" method="post" className="proposal-form" id="form1">
                                    {/* <!--- form Starts --> */}
                                    <div className="form-group">
                                       <textarea rows="7" name="proposal_desc" placeholder="Enter Your Proposal's Description" className="form-control proposal-desc"></textarea>
                                       <small className="form-text text-danger"></small>
                                    </div>
                                 </form>
                                 {/* <!--- form Ends --> */}
                                 <hr className="mt-0" />
                                 <h5 className="font-weight-normal"> Frequently Asked Questions  <small className="float-right"><a data-toggle="collapse" href="#insert-faq" className="text-success">+ Add Faq</a></small></h5>
                                 <hr />
                                 <div className="tabs accordion mt-2" id="faqTabs">
                                    {/* <!--- All Tabs Starts ---> */}
                                    <div className="tab">
                                       {/* <!-- tab rounded Starts --> */}
                                       <div className="tab-body rounded border-1 p-3 pb-0 collapse" id="insert-faq" data-parent="#faqTabs">
                                          <form action="" method="post" className="add-faq">
                                             <div className="form-group mb-2">
                                                <input type="text" name="title" placeholder="Faq Title" className="form-control form-control-sm" required />
                                             </div>
                                             <div className="form-group mb-2">
                                                <textarea name="content" rows="3" placeholder="Faq Content" className="form-control form-control-sm"></textarea>
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
                                    <input className="btn btn-success float-right" type="submit" form="form1" value="Save & Continue" />
                                 </div>
                                 {/* <!--- form-group Starts ---> */}

                              </div>
                              <div className="tab-pane fade" id="requirements">
                                 <form action="#" method="post" className="proposal-form">
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
                                       <textarea name="buyer_instruction" placeholder="If you need to obtain information, files or other items from the buyer prior to starting your work, please add your instructions here. For example: Please send me your company name or Please send me the photo you need me to edit." rows="4" className="form-control"></textarea>
                                    </div>
                                    <div className="form-group mb-0">
                                       {/* <!--- form-group Starts ---> */}
                                       <a href="#" className="btn btn-secondary float-left back-to-desc">Back</a>
                                       <input className="btn btn-success float-right" type="submit" value="Save & Continue" />
                                    </div>
                                    {/* <!--- form-group Starts ---> */}
                                 </form>
                                 {/* <!--- form Ends --> */}

                              </div>
                              <div className="tab-pane fade" id="gallery">
                                 <h5 className="font-weight-normal">Build Your Proposal Gallery</h5>
                                 <h6 className="font-weight-normal">Add memorable content to your gallery to set yourself apart from competitors.</h6>
                                 <hr />
                                 <p className="text-right mb-0">
                                    <span className="float-left">Proposal Photos/Audio</span>
                                    <small className="text-muted" style={{ fontSize: '78%' }}>Upload Photos that describe or related to your proposal.your image size must be 700 x 390 pixels.</small>
                                 </p>
                                 <form action="" className="proposal-form" id="gallery_form">
                                    {/* <!--- form Starts ---> */}
                                    <div className="row gallery">
                                       {/* <!--- row gallery Starts ---> */}
                                       <div className="col-md-3">
                                          {/* <!--- col-md-3 Starts ---> */}
                                          <div className="pic add-pic">
                                             <i className="fa fa-picture-o fa-2x mb-2"></i><br /> <span>Browse Image/Audio</span>
                                             <input type="hidden" name="proposal_img1" value="" />
                                             <input type="hidden" name="proposal_img1_s3" value="0" />
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
                                       <small className="text-muted" style={{ fontSize: '78%' }}>(Optional) Supported Video Extensions Include : 'mp4','mov','avi','flv','wmv'.</small>
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
                                    <input className="btn btn-success float-right" type="submit" form="gallery_form" value="Save &amp; Continue" />
                                    <a href="tyrone/logo-making" id="previewProposal" className="btn btn-success float-right mr-3 d-none">Preview Proposal</a>
                                    {/* <!-- 
                   <input className="btn btn-success float-right" type="submit" form="gallery_form" value="Save & Continue">
                   <a href="tyrone/logo-making" id="previewProposal" className="btn btn-success float-right mr-3 d-none">Preview Proposal</a>
                   
                   --> */}
                                 </div>
                                 {/* <!--- form-group Starts ---> */}

                              </div>
                              <div className="tab-pane fade " id="publish">
                                 <h1><img style={{ position: 'relative', top: '-5px' }} src="../images/comp/winner.png" />  Yay! You are almost done!</h1>
                                 <h6 className="font-weight-normal line-height-normal">
                                    Congrats! you're almost done submitting this proposal. <br />
                You can go back and check if you entered all the details for this proposal correctly. If all looks good and you agree with
                <a href="https://www.gigtodo.com/terms_and_conditions" target="_black" className="text-primary">all our policies</a>, please click on the “Save & Submit For Approval” button.<br /><br />
                                    <span className="text-muted">
                                       If you do not wish to submit this proposal for approval at this time, please exit this page. You can easily retrieve this proposal by clicking on "Selling => My Proposals => Drafts". Cheers!
                </span>
                                 </h6>
                                 <form action="" method="post">
                                    <h1 className="h3">Make Proposal Featured (Optional)</h1>
                                    <h6 className="font-weight-normal line-height-normal">
                                       Let your proposal appear on several places on GigToDo<br />
                   Proposal will always be at the top section of search results <br />
                   WIth GigToDo feature, your proposal already has a 50% chance of getting ordered by potential buyers
                   <p className="ml-4 mt-3">
                                          <label for="checkid" style={{ wordWrap: 'break-word' }}>
                                             <input type="checkbox" id="checkid" name="proposal_featured" value="1" style={{ verticalAlign: 'middle', marginLeft: '-1.25rem' }} /> Make Proposal Featured
                      </label>
                                       </p>
                                    </h6>
                                    <div className="form-group mb-0 mt-3">
                                       {/* <!--- form-group Starts ---> */}
                                       <a href="#" className="btn btn-secondary back-to-gallery">Back</a>
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

export default AddGig;