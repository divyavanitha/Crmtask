import React, { Fragment, useState, useEffect } from 'react';
import { withRouter, Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMenu } from "../../../_actions/user.action";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Gig from "./gigs/Gig";
import OwlCarousel from 'react-owl-carousel';
import { getBuyerRequest } from "../../../_actions/request.action";
import { gigSubCatoegory, requestGigs } from "../../../_actions/user.action";
import * as Yup from 'yup';
import $ from 'jquery';

const BuyerRequest = (props) => {
    const dispatch = useDispatch();
   let history = useHistory();
   useEffect(() => {
      dispatch(getBuyerRequest())
      dispatch(gigSubCatoegory())

      $('body').on('click', '.send_offer', function (e) {
        
         var that = $(this);
         e.preventDefault();
         const id = that.data('id');
         const sub = that.data('sub');
         console.log('id', id);
         console.log('sub', sub);
         dispatch(requestGigs(sub)).then(res => {
                console.log('reqest', res);

         })

         $('.send-offer-modal').modal("show");
         $(".send-offer-modal-btn")
            .off()
            .on("click", function () {
               dispatch(requestGigs(id)).then(res => {
                  $('.send-offer-modal').modal("hide");

               })

            });
      });

   }, []);
   const buyer_request = useSelector((state) => state.request && state.request.request && state.request.request.responseData);
   const gig_subcategory = useSelector((state) => state.user && state.user.gig_subcategory);
   
   const request_gigs = useSelector((state) => state.user);
   console.log('list', request_gigs);

    return (

        <Formik

            enableReinitialize
            initialValues={{
                id:  '',
                name:  '',
                category: ''
            }
            }

            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .required('Name is required'),
                category: Yup.string()
                    .required('Category is required')
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {

                let data = {
                    id: values.id,
                    name: values.name,
                    category: values.category
                };

                /*if (params.id) {
                    dispatch(updateSubCategory(data)).then(res => {
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        history.push('/admin/subcategory/')
                    })
                } else {
                    dispatch(addSubCategory(data)).then(res => {
                        addToast(res.message, { appearance: res.status, autoDismiss: true, })
                    })
                }*/
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
                } = props;

                return (
                    <Fragment>


<div className="container">
   <div className="row buyer-requests proposals-container mb-5">
      <div className="col-md-12 mt-5">
         <div className="row">
            <div className="col-md-9">
               <h1>
                  Recent Buyer Requests        
               </h1>
            </div>
            <div className="col-md-3">
               <div className="input-group">
                  <input type="text" id="search-input"  placeholder="Search Buyer Requests" className="form-control" />
                  <span className="input-group-btn">
                  <button className="btn btn-success"> <i className="fa fa-search"></i> </button>
                  </span>
               </div>
            </div>
         </div>
      </div>
      <div className="col-md-12 mt-4">
         <div className="card">
            <div className="card-header">
               <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                     <a href="#active-requests" data-toggle="tab" className="nav-link active make-black">
                     Active <span className="badge badge-success"> 
                     {buyer_request && buyer_request.length}            </span>
                     </a>
                  </li>
                  <li className="nav-item">
                     <a href="#sent-offers" data-toggle="tab" className="nav-link make-black">
                     Offers Sent <span className="badge badge-success"> 12  </span>
                     </a>
                  </li>
               </ul>
            </div>
            <div className="card-body">
               <div className="tab-content">
                  <div id="active-requests" className="tab-pane fade show active">
                     <div className="table-responsive">
                        <h3 className="float-left mb-3 pt-2"> Buyer Requests </h3>
                        <select id="sub-category" className="form-control float-right sort-by mb-3">
                           <option value="all"> All Subcategories </option>
                           {gig_subcategory && gig_subcategory.map((c_list) => (<option key={c_list._id} value={c_list._id} onChange={handleChange}>{c_list.subCategory.name}</option>))}
                        </select>
                        <table className="table table-striped">
                           <thead>
                              <tr>
                                 <th>Request</th>
                                 <th>Offers</th>
                                 <th>Date</th>
                                 <th>Duration</th>
                                 <th>Budget</th>
                              </tr>
                           </thead>
                           <tbody id="load-data">
                               {buyer_request && buyer_request.map((list, index) => (<tr key={list._id} id="request_tr_367">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">{list.user.firstName}</a> 
                                       </h6>
                                       <h5 className="text-success"> {list.title} </h5>
                                       <p className="lead mb-2">  {list.description} </p>
                                       <ul className="request-category">
                                          <li> {list.category.name} </li>
                                          <li> {list.subCategory.name} </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> {list.created_at} </td>
                                 <td> 
                                    {list.duration}
                                    <Link data-id={list._id} className="remove-link text-danger delete"> Remove Request </Link>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;{list.budget}                                            <br />
                                    <a data-id={list._id} data-sub={list.subCategory._id} className="btn btn-success btn-sm mt-4 send_offer">Send Offer</a>
                                 </td>
                              </tr>))}
                              
                           </tbody>
                        </table>
                     </div>
                  </div>
                  <div id="sent-offers" className="tab-pane fade">
                     <div className="table-responsive">
                        <h3 className="float-left mb-3 pt-2"> Sent Offers </h3>
                        <select id="sub-category" className="form-control float-right sort-by mb-3">
                           <option value="all"> All Subcategories </option>
                           <option value='1'> Logo Design </option>
                           <option value='2'> Business Cards &amp; Stationery </option>
                           <option value='31'> Proofreading & Editing </option>
                           <option value='70'> Virtual Assistant </option>
                           <option value='84'> Health, Nutrition & Fitness </option>
                           <option value='86'> Spiritual & Healing </option>
                           <option value='88'> Collectibles </option>
                        </select>
                        <table className="table table-striped">
                           <thead>
                              <tr>
                                 <th>Request</th>
                                 <th>Offers</th>
                                 <th>Date</th>
                                 <th>Duration</th>
                                 <th>Budget</th>
                              </tr>
                           </thead>
                           <tbody id="load-data">
                              <tr id="request_tr_367">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> sdfsdf </h5>
                                       <p className="lead mb-2"> sdfsdfsdfsdfsf </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> October 05, 2020 </td>
                                 <td> 
                                    1 Day 
                                    <a href="#" className="remove-link text-danger remove_request_367"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;33.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="append-modal"></div>
         <div id="quota-finish" className="modal fade">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title h5"><i className="fa fa-frown-o fa-move-up"></i> Request Quota Reached</h5>
                     <button className="close" data-dismiss="modal"> &times; </button>
                  </div>
                  <div className="modal-body">
                     <center>
                        <h5>You can only send a max of 10 offers per day. Today you've maxed out. Try again tomorrow. </h5>
                     </center>
                  </div>
                  <div className="modal-footer">
                     <button className="btn btn-success" data-dismiss="modal">Close</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
   
    <div className="modal send-offer-modal" tabIndex="-1" role="basic" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Select A Proposal/Service To Offer</h5>
                     <button className="close" data-dismiss="modal"> <span> ×</span></button>
                  </div>
                  <div className="modal-body p-0">

            <div className="request-summary">
                                      
               <img src="https://www.gigtodo.com/user_images/cool-profile-picastures-coo_1602176634.png" width="50" height="50" className="rounded-circle" />
            
               <div id="request-description">

                  <h6 className="text-success mb-1"> sdfsdf </h6>

                  <p>sdfsdfsdfsdfsf</p>

               </div>    

            </div>
            <div className="request-proposals-list">
               <div className="proposal-picture">

                  <input type="radio" id="radio-623" className="radio-custom" name="proposal_id" value="623" required="" />

                  <label for="radio-623" className="radio-custom-label"></label>

                  <img src="https://www.gigtodo.com/proposals/proposal_files/man-iand-woman-doing-a-handshake-3874034_1588269353.png" width="50" height="50" style={{ borderRadius: '2% !important' }} />

               </div> 

               <div className="proposal-title">

                  <p>I will do a video session and prepare you for any job interview</p>

               </div>

               <hr />
                    
                    
               <div className="proposal-picture">

                  <input type="radio" id="radio-890" className="radio-custom" name="proposal_id" value="890" required="" />

                  <label for="radio-890" className="radio-custom-label"></label>

                  <img src="https://www.gigtodo.com/proposals/proposal_files/poster%206_1595619408.png" width="50" height="50" style={{ borderRadius: "2% !important;" }} />

               </div> 

               <div className="proposal-title">

                  <p>i will design a perfect logo for your company</p>

               </div>

               <hr />
                    
                    
               <div className="proposal-picture">

                  <input type="radio" id="radio-904" className="radio-custom" name="proposal_id" value="904" required="" />

                  <label for="radio-904" className="radio-custom-label"></label>

                  <img src="https://www.gigtodo.com/proposals/proposal_files/screenshot-premium11.web-hosting.com_2083-2020.07.29-06_54_39_1596023798.png" width="50" height="50" style={{ borderRadius: "2% !important;" }} />

               </div> 

               <div className="proposal-title">

                  <p>dsfgfdghfrghrfhcxvbsdfhgdfhg</p>

               </div>

               <hr />
                    
                    
            </div>

         </div>
            
         <div className="modal-footer">

            <button className="btn btn-secondary" data-dismiss="modal"> Close</button>

            <button className="btn btn-success send-offer-modal-btn" id="submit-proposal" data-toggle="modal" data-dismiss="modal" data-target="#submit-proposal-details" title="Choose an offer before clicking continue">Continue</button>

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

export default BuyerRequest;