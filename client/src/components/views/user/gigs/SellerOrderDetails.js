import React, { Fragment, useState } from 'react';
import { withRouter, useParams, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
import "./Gig.css";
import { getSellerOrderDetails, getDeliveryStatus, getRating, getCancelReason } from "../../../../_actions/user.action";
import { updateOrder, rating, cancel } from "../../../../_actions/order.action";

import OwlCarousel from 'react-owl-carousel';


const Cart = (props) => {

   const dispatch = useDispatch();
   const params = useParams();
   let history = useHistory();

   const [total, setTotal] = useState(0);
   const [status, setStatus] = useState("");

   useEffect(() => {
      dispatch(getSellerOrderDetails(params.id))
      dispatch(getDeliveryStatus(params.id))
      dispatch(getRating(params.id))
      dispatch(getCancelReason("seller"))
      //$(document).ready(function () {

         // Sticky Code start //
         //$("#order-status-bar").sticky({ topSpacing:0,zIndex:500});
         // Sticky code ends //
         ////  Countdown Timer Code Starts  ////
         // Set the date we're counting down to

         //var countDownDate = new Date("Nov 20, 2020 10:43:07").getTime();
         // Update the count down every 1 second
         /*var x = setInterval(function () {
            var now = new Date();
            var nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            var distance = countDownDate - nowUTC;
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            document.getElementById("days").innerHTML = days;
            document.getElementById("hours").innerHTML = hours;
            document.getElementById("minutes").innerHTML = minutes;
            document.getElementById("seconds").innerHTML = seconds;
            // If the count down is over, write some text 
            if (distance < 0) {
               clearInterval(x);
               $("#countdown-timer .countdown-number").addClass("countdown-number-late");
               document.getElementById("days").innerHTML = "<span class='red-color'>The</span>";
               document.getElementById("hours").innerHTML = "<span class='red-color'>Order</span>";
               document.getElementById("minutes").innerHTML = "<span class='red-color'>is</span>";
               document.getElementById("seconds").innerHTML = "<span class='red-color'>Late!</span>";
            }
         }, 1000);

      });*/

      $("body").on("click", ".review", function(){

         let data = {
                order_id: params.id,
                seller_rating: $("#rating option:selected").val(),
                seller_comment: $("textarea[name=comment]").val(),
                type: "seller"
            };

            dispatch(rating(data)).then(res => {
                console.log('id',res.responseData);
                //history.push('/buyer-order-lists')
                window.location.reload();
                 
              })
      });


   }, [params.id]);

   const sendCancelRequest = async () => {

        let data = {
                id: params.id,
                cancellation_message: $("textarea[name=cancellation_message]").val(),
                cancellation_reason: $("select[name=cancellation_reason] option:selected").val(),
                cancelled_by: "seller",
                status: "Cancellation Requested"
        };
        
        dispatch(updateOrder(data)).then(res => {
          console.log('id',res.responseData);
          window.location.reload();           
        })
    }

   const sendCancel = async (status) => {
      
        let data = {
                id: params.id,
                cancel_status: status,
                
         };
        dispatch(cancel(data)).then(res => {
          console.log('id',res.responseData);
          window.location.reload();           
        })
    }

   const order_details = useSelector((state) => state.user && state.user.seller_order_details && state.user.seller_order_details.responseData && state.user.seller_order_details.responseData.order);

   const delivery_status = useSelector((state) => state.user && state.user.delivery_status && state.user.delivery_status.responseData && state.user.delivery_status.responseData.delivery_status);

   const ratings = useSelector((state) => state.user && state.user.rating  && state.user.rating.responseData && state.user.rating.responseData.ratings);

   const cancel_reason = useSelector((state) => state.user && state.user.cancel_reason && state.user.cancel_reason.responseData && state.user.cancel_reason.responseData.CancelReasons);
   console.log('order', ratings);

   let buyer_rating = new Array(ratings && ratings.buyerRating).fill(0);
   let seller_rating = new Array(ratings && ratings.sellerRating).fill(0);

   return (

      <Formik

         enableReinitialize
         initialValues={{
            id: params.id,
            delivered_message: '',
            enable_watermark: false,
            delivery_file: ''
         }
         }

         validationSchema={Yup.object().shape({
            /* title: Yup.string()
                 .required('Title is required'),
             sub_category_id: Yup.string()
                 .required('Sub Category is required'),
             tags: Yup.string()
                 .required('Tags is required'),*/
         })}
         onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log('values', values);
                const data = new FormData();
                data.append("id", params.id);
                data.append("delivered_message", values.delivered_message);
                data.append("enable_watermark", values.enable_watermark);
                data.append("delivery_file", values.delivery_file);
                data.append("status", "Delivered");


                dispatch(updateOrder(data)).then(res => {
                  console.log('id',res.responseData);
                  setStatus(res.responseData.status);
                  $('#deliver-order-modal').modal("hide");
                  window.location.reload();
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

                  <div id="order-status-bar">
                     <div className="container">
                        <div className="row">
                           <div className="col-md-12">
                              <h5 className="float-left mt-2">
                                 <span className="border border-success rounded p-1">Order: #{order_details && order_details.orderId}</span>
                              </h5>
                              <h5 className="float-right mt-2">
                                 Status: <span className="text-muted">
                                    {status ? status : order_details && order_details.status} </span>
                              </h5>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="container view-proposals proposals-container order-page">
                     <div className="row mt-5 mb-5">
                        <div className="col-md-12">
                           <div className="card">
                              <div className="card-header">
                                 <ul className="nav nav-tabs card-header-tabs">
                                    <li className="nav-item">
                                       <a href="#order-activity" data-toggle="tab" className="nav-link active make-black ">Order Activity</a>
                                    </li>
                                    {(order_details && order_details.status == "Progress") ? <li className="nav-item">
                                       <a href="#resolution-center" data-toggle="tab" className="nav-link make-black">Resolution Center</a> 
                                    </li> : ""}
                                 </ul>
                              </div>
                              <div className="card-body">
                                 <div className="tab-content">
                                    <div id="order-activity" className="tab-pane fade show active">
                                       <div className="mt-4">
                                          <div className="row">
                                             <div className="col-md-12">
                                                <div className="card">
                                                   {/* card Starts */}
                                                   <div className="card-body">
                                                      {/* card-body Starts */}
                                                      <div className="row">
                                                         <div className="col-md-2">
                                                            <img src="assets/images/videosales.png" className="img-fluid d-lg-block d-md-block d-none" />
                                                         </div>
                                                         <div className="col-md-10">
                                                            <h1 className="text-success float-right d-lg-block d-md-block d-none">&#036;{order_details && order_details.price}</h1>
                                                            <h4>
                                                               Order Number {order_details && order_details.orderId}              
                                                               <small>
                                                               {console.log('text',order_details && order_details)}
                                                                 
                                                                  <Link to={order_details && order_details.seller ? "/gig/" + order_details.seller.firstName + "/" + order_details.gig._id : ""} target="_blank" className="text-success">
                                                                     View Proposal/Service               </Link>
                                                               </small>
                                                            </h4>
                                                            <p className="text-muted">
                                                               <span className="font-weight-bold">Buyer: </span>
                                                               <a href="pat" target="_blank" className="seller-buyer-name mr-1 text-success">
                                                                  {order_details && order_details.buyer.firstName} {order_details && order_details.buyer.lastName}               </a>
                                             | <span className="font-weight-bold ml-1"> Status: </span>
                                                               {status ? status :  order_details && order_details.status}             | <span className="font-weight-bold ml-1"> Date: </span>
                                                               {order_details && order_details.created_at}             | <span className="font-weight-bold ml-1"> Order Revisions: </span>
                                                               {order_details && order_details.revisions} | <span className="font-weight-bold ml-1"> Revisions Used: </span>
                                                               {order_details && order_details.used_revisions.length}
                                                            </p>
                                                         </div>
                                                      </div>
                                                      <div className="row d-lg-flex d-md-flex d-none">
                                                         {/* row d-lg-flex Starts */}
                                                         <div className="col-md-12">
                                                            <table className="table table-striped mt-3">
                                                               <thead>
                                                                  <tr>
                                                                     <th>Item</th>
                                                                     <th>Quantity</th>
                                                                     <th>Duration</th>
                                                                     <th>Amount</th>
                                                                  </tr>
                                                               </thead>
                                                               <tbody>
                                                                  <tr>
                                                                     <td className="font-weight-bold" width="600">
                                                                        {order_details && order_details.gig.title}
                                                                     </td>
                                                                     <td>{order_details && order_details.quantity}
                                                                     </td>
                                                                     <td>{order_details && order_details.deliveryTime}</td>
                                                                     <td>
                                                                        &#036;{order_details && order_details.price}
                                                                     </td>
                                                                  </tr>
                                                                  <tr>
                                                                     <td colspan="4">
                                                                        <span className="float-right mr-4">
                                                                           <strong>Total : </strong>
                                                      &#036;{order_details && order_details.price}                                   </span>
                                                                     </td>
                                                                  </tr>
                                                               </tbody>
                                                            </table>
                                                         </div>
                                                      </div>
                                                      {/* row d-lg-flex Ends */}
                                                   </div>
                                                   {/* card-body Ends */}
                                                </div>
                                                {/* card Ends */}
                                                {/*<h2 className="text-center mt-4" id="countdown-heading">
                                                   This Order Needs To Be Delivered Before This Day/Time:
                              </h2>
                                                <div id="countdown-timer">
                                                   <div className="row">
                                                      <div className="col-lg-3 col-md-6 col-sm-6 countdown-box">
                                                         <p className="countdown-number" id="days"></p>
                                                         <p className="countdown-title">Day(s)</p>
                                                      </div>
                                                      <div className="col-lg-3 col-md-6 col-sm-6 countdown-box">
                                                         <p className="countdown-number" id="hours"></p>
                                                         <p className="countdown-title">Hours</p>
                                                      </div>
                                                      <div className="col-lg-3 col-md-6 col-sm-6 countdown-box">
                                                         <p className="countdown-number" id="minutes"></p>
                                                         <p className="countdown-title">Minutes</p>
                                                      </div>
                                                      <div className="col-lg-3 col-md-6 col-sm-6 countdown-box">
                                                         <p className="countdown-number" id="seconds"></p>
                                                         <p className="countdown-title">Seconds</p>
                                                      </div>
                                                   </div>
                                                </div> */}
                                                {/* message-div Starts */}
                                                {/*<div id="order-conversations" className="mt-3">
                                 <div className="
                                    message-div">
                                   
                                    <img src="images/img-03.jpg" width="50" height="50" className="message-image" />
                                    <h5>
                                       <a href="#" className="seller-buyer-name"> James </a>
                                    </h5>
                                    <p className="message-desc">
                                       hi
                                    </p>
                                    <p className="text-right text-muted mb-0" style={{fontSize: "14px"}}> 
                                       04:43: November 19, 2020 
                                       | <a href="#" data-toggle="modal" data-target="#report-modal" className="text-muted"><i className="fa fa-flag"></i> Report</a> 
                                    </p>
                                 </div>
                                 
                              </div>*/}
                                                {/* message-div Ends */}

                                       {delivery_status && delivery_status.map((list, index) => (<div className="message-div">
                                           <img src="https://www.gigtodo.com//user_images/ty_1574032240.png" width="50" height="50" className="message-image" />

                                             <h5>

                                             <a href="#" className="seller-buyer-name"> {order_details && order_details.seller.firstName} </a>

                                             </h5>

                                             <p className="message-desc">

                                             {list.deliveredMessage}

                                                 <a href='orderIncludes/download?order_id=1611&c_id=1376' className='d-block mt-2 ml-1' target='_blank'>
                                                   <i className='fa fa-download'></i> {list.delivery_file}
                                                 </a>
                                               
                                             </p>

                                             <p className="text-right text-muted mb-0"> {list.created_at}</p>

                                       </div>))}

                                       {(order_details && order_details.used_revisions.length > 0) ? (<div class="card mt-4">
                                        <div class="card-body">
                                          <h5 class="text-center"><i class="fa fa-pencil-square-o"></i> Revison Requested By {order_details && order_details.buyer.firstName} </h5>
                                        </div>
                                      </div>) : "" }
                                      {order_details && order_details.used_revisions ? order_details && order_details.used_revisions.map((list, index) => (<div class="message-div-hover">
                                        <img src="https://www.gigtodo.com//user_images/cool-profile-picastures-coo_1602176634.png" width="50" height="50" class="message-image" />
                                              
                                      <h5><a href="#" class="seller-buyer-name"> {order_details && order_details.buyer.firstName} </a></h5>

                                      <p class="message-desc">

                                      {list.revision_message}

                                      <a href="orderIncludes/download?order_id=1608&c_id=1382" class="d-block mt-2 ml-1" target='_blank'>
                                        <i class="fa fa-download"></i> {list.revision_file}</a>
                                      </p>

                                      <p class="text-right text-muted mb-0"> {list.updated_at} </p>

                                      </div>)) : ""}

                                    {(order_details && order_details.status == "Cancellation Requested" && order_details && order_details.cancelled_by == "buyer") ? <div>
                                      <div className="card mt-4">
                                        <div className="card-body">
                                          <h5 className="text-center">
                                            <img src="images/svg/cancellation.svg" className="order-icon"/>
                                            Cancellation Requested By {order_details && order_details.buyer.firstName} 
                                          </h5>
                                        </div>
                                      </div>


                                      <div className="message-div">
                                        <img src="https://www.gigtodo.com//user_images/cool-profile-picastures-coo_1602176634.png" width="50" height="50" className="message-image" />            
                                      <h5><a href="#" className="seller-buyer-name"> {order_details && order_details.buyer.firstName} </a></h5>

                                      <p className="message-desc">{order_details && order_details.cancellation_message}</p>
                                      

                                          <center>

                                            <button name="accept_request" onClick={() =>  sendCancel('Accepted')} className="btn btn-success btn-sm">Accept Request</button>
                                            &nbsp;&nbsp;&nbsp;
                                            <button name="decline_request" onClick={() =>  sendCancel('Rejected')} className="btn btn-success btn-sm">Decline Request</button>

                                           </center>

                                      
                                      <p className="text-right text-muted mb-0"> 06:39: Dec 07, 2020 </p>

                                    </div>
                                 </div> : ""}

                                                {(order_details && order_details.status == "Progress" || order_details && order_details.status == "Revision Requested" || order_details && order_details.status == "Delivered") ? <center>
                                                   <button className="btn btn-success btn-lg mt-5 mb-3" data-toggle="modal" data-target="#deliver-order-modal">
                                                   <i className="fa fa-upload"></i> Deliver Order
                                                   </button>
                                                </center> : ""}





                              {(order_details && order_details.status == "Completed" && order_details.seller_rated  != 1)  ? <div className="order-review-box mb-3 p-3">

                                       <h3 className="text-center text-white"> Please Submit a Review For Your Seller</h3>

                                       <div className="row">

                                           <div className="col-md-8 offset-md-2">

                                               {/* <form onSubmit={handleSubmit} encType="multipart/form-data" align="center"> */}

                                                   <div className="form-group">

                                                       <label className="h6 text-white">Review Rating</label>

                                                       <select name="rating" onChange={handleChange} id="rating" className="rating-select">

                                                           <option value="1">1</option>
                                                           <option value="2">2</option>
                                                           <option value="3">3</option>
                                                           <option value="4">4</option>
                                                           <option value="5">5</option>

                                                       </select>

                                                   </div>

                                                   <Field component="textarea" rows="5" id="comment" value={values.comment} name="comment" onChange={handleChange} maxLength={100} className='form-control mb-2' />

                                                   <button className="btn btn-success review"> Submit Review </button>


                                                {/* </form> */}

                                               
                                           </div>


                                       </div>

                                   </div> : ""}

                                   {(order_details && order_details.seller_rated == 1 || order_details && order_details.buyer_rated == 1) ? <div className="proposal_reviews mt-5">
              
                                <div className="card rounded-0 mt-3">

                                    <div className="card-header bg-fivGrey">

                                        <h5 className="text-center mt-2">
                                            <img src="images/svg/reviews.svg" className="mr-1 order-icon"/> Order Reviews
                                        </h5>

                                    </div>

                                    <div className="card-body">

                                        <div className="proposal-reviews">

                                            <ul className="reviews-list">

                                              {(order_details && order_details.buyer_rated == 1) ? <li className="star-rating-row">
                                                  <span className="user-picture">
                                                      <img src="https://www.gigtodo.com/user_images/ty_1574032240.png" width="60" height="60" />
                                                  </span>
                                                  <h4>
                                                      <a href="#" className="mr-1 text-success">{order_details && order_details.buyer.firstName} </a>
                                                      
                                                        {buyer_rating.map((list, index) => (<span key = {index} className="fa fa-star checked" style={{color: "#EEBD01"}}></span>))}
                                                      
                                                  </h4>
                                                  <div className="msg-body">
                                                      {ratings && ratings.buyerComment}
                                                  </div>
                                                  <span className="rating-date">Dec 02 2020 </span>
                                               </li> : ""}
                                                 <hr />
                                                    {(order_details && order_details.seller_rated == 1) ? <li className="rating-seller">
                                                        <h4>
                                                            <span className="mr-1">Seller's Feedback</span>
                                                            {seller_rating.map((list, index) => (<span key = {index} className="fa fa-star checked" style={{color: "#EEBD01"}}></span>))}
                                                        </h4>
                                                      <span className="user-picture">
                                                          <img src="https://www.gigtodo.com//user_images/cool-profile-picastures-coo_1602176634.png" width="40" height="40" />
                                                      </span>
                                                      <div className="msg-body">
                                                          {ratings && ratings.sellerComment}
                                                      </div>
                                                    </li> : ""}
                                            </ul>

                                        </div>

                                    </div>

                                </div>
                              </div>: ""}

                              {(order_details && order_details.status == "Cancellation Requested" || order_details && order_details.status == "Cancelled") ? <div>

                                <div className="card mt-4">
                                    <div className="card-body">
                                      <h5 className="text-center">
                                        <img src="images/svg/cancellation.svg" className="order-icon" />
                                        Cancellation Requested By {(order_details && order_details.cancelled_by == "buyer") ? order_details && order_details.buyer.firstName : order_details && order_details.seller.firstName} 
                                      </h5>
                                    </div>
                              </div>
                              <div className="message-div-hover">

                                  <img src="https://www.gigtodo.com//user_images/ty_1574032240.png" width="50" height="50" className="message-image" />

                                          
                              <h5><a href="#" className="seller-buyer-name"> {(order_details && order_details.cancelled_by == "buyer") ? order_details && order_details.buyer.firstName : order_details && order_details.seller.firstName} </a></h5>

                              <p className="message-desc">{order_details && order_details.cancellation_message}</p>
                              </div> </div> : ""}

                              {(order_details && order_details.status == "Cancelled") ? <div className="order-status-message">

                                    <i className="fa fa-times fa-3x text-danger"></i>

                                    <h5 className="text-danger"> Order Cancelled By Mutual Agreement. </h5>

                                    <p>

                                    Order was cancelled by a mutual agreement between you and your buyer.<br />

                                    The order funds have been refunded to your buyer Shopping Balance.

                                    </p>

                                </div> : ""}

                                                <div className="proposal_reviews mt-5">
                                                </div>
                                                {(order_details && order_details.status == "Progress" || order_details && order_details.status == "Revision Requested" || order_details && order_details.status == "Delivered") ? <div className="insert-message-box">
                                                   <div className="float-right">
                                                      <p className="text-muted mt-1">
                                                         {order_details && order_details.seller.firstName}      <span className="text-success font-weight-bold"
                                                         >
                                                            is Online
                                       </span> | Local Time
                                       <i className="fa fa-sun-o"></i>
                                       02:31 AM
                                    </p>
                                                   </div>
                                                   <form id="insert-message-form" className="clearfix">
                                                      <textarea name="message" rows="5" placeholder="Type your Message Here" className="form-control mb-2" onkeyup="matchWords(this)"></textarea>
                                                      <div className="float-left b-2">
                                                         <p id="spamWords" className="mt-1 text-danger d-none"><i className="fa fa-warning"></i> You seem to have typed word(s) that are in violation of our policy. No direct payments or emails allowed.</p>
                                                      </div>
                                                      <button type="submit" className="btn btn-success float-right">Send</button>
                                                      <div className="clearfix"></div>
                                                      <p></p>
                                                      <div className="form-row align-items-center message-attacment ml-0 mr-0">
                                                         {/* form-row align-items-center message-attacment Starts */}
                                                         <label className="h6 ml-2 mt-1"> Attach File (optional) </label>
                                                         <input type="file" name="file" className="form-control-file p-1 mb-2 mb-sm-0" />
                                                      </div>
                                                      {/* form-row align-items-center message-attacment Ends */}
                                                   </form>
                                                </div>: ""}
                                                <div id="upload_file_div"></div>
                                                <div id="message_data_div"></div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div id="resolution-center" className="tab-pane fade">
                                       <div className="mt-4">
                                          <div className="row">
                                             <div className="col-md-12">
                                                <div className="card">
                                                   <div className="card-body">
                                                      <div className="row">
                                                         <div className="col-md-12">
                                                            <h3 className="text-center mb-3"> Order Cancellation Request</h3>
                                                               <div className="form-group">
                                                                  <textarea name="cancellation_message" placeholder="Please be as detailed as possible..." rows="10" onChange={handleChange} className="form-control" required></textarea>
                                                               </div>
                                                               <div className="form-group">
                                                                  <label className="font-weight-bold"> Cancellation Request Reason </label>
                                                                  <select name="cancellation_reason" onChange={handleChange} className="form-control">
                                                                     <option className="hidden"> Select Cancellation Reason </option>
                                                                     {cancel_reason && cancel_reason.map((list, index) => (<option value={list.reason}> {list.reason}. </option>))}
                                                                     
                                                                  </select>
                                                               </div>
                                                               <button name="submit_cancellation_request" className="btn btn-success float-right submit_cancellation_request" onClick={sendCancelRequest}> Submit Cancellation Request </button>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div id="report-modal" className="modal fade">
                     {/* report-modal modal fade Starts */}
                     <div className="modal-dialog">
                        {/* modal-dialog Starts */}
                        <div className="modal-content">
                           {/* modal-content Starts */}
                           <div className="modal-header p-2 pl-3 pr-3">
                              {/* modal-header Starts */}
            Report This Message
            <button className="close" data-dismiss="modal"><span>&times;</span></button>
                           </div>
                           {/* modal-header Ends */}
                           <div className="modal-body">
                              {/* modal-body p-0 Starts */}
                              <h6>Let us know why you would like to report this user?.</h6>
                              <form action="" method="post">
                                 <div className="form-group mt-3">
                                    {/* form-group Starts */}
                                    <select className="form-control float-right" name="reason" required="">
                                       <option value="">Select Reason</option>
                                       <option>The Buyer tried to abuse the rating system.</option>
                                       <option>The Buyer was using inappropriate language.</option>
                                    </select>
                                 </div>
                                 {/* form-group Ends */}
                                 <br />
                                 <br />
                                 <div className="form-group mt-1 mb-3">
                                    {/* form-group Starts */}
                                    <label> Additional Information </label>
                                    <textarea name="additional_information" rows="3" className="form-control" required=""></textarea>
                                 </div>
                                 {/* form-group Ends */}
                                 <button type="submit" name="submit_report" className="float-right btn btn-sm btn-success">
                                    Submit Report
               </button>
                              </form>
                           </div>
                           {/* modal-body p-0 Ends */}
                        </div>
                        {/* modal-content Ends */}
                     </div>
                     {/* modal-dialog Ends */}
                  </div>
                  {/* report-modal modal fade Ends */}
                  <div id="deliver-order-modal" className="modal fade">
                     {/* deliver-order-modal Starts */}
                     <div className="modal-dialog">
                        <div className="modal-content">
                           <div className="modal-header">
                              <h5 className="modal-title"> Deliver Your Order Now </h5>
                              <button className="close" data-dismiss="modal"> <span>&times;</span> </button>
                           </div>
                           <div className="modal-body">
                              <form onSubmit={handleSubmit} encType="multipart/form-data">
                                 <div className="form-group">
                                    <label className="font-weight-bold" > Message </label>
                                 
                                    <Field component="textarea" rows="2" id="delivered_message" value={values.delivered_message} name="delivered_message" onChange={handleChange} maxLength={100} className='form-control mb-2' />
                                 </div>
                                 {/* <div className="form-group">
                                    <label for="">Enable Watermark : </label>
                                    <input type="checkbox" name="enable_watermark" onClick={(e) => { setFieldValue(`enable_watermark`, e.currentTarget.checked); }} value={values.enable_watermark} style={{ position: "relative", top: "2px" }} />
                                 </div> */}
                                 <div className="form-group mb-0">
                                    <input type="file" name="delivery_file" onChange={(e) => { setFieldValue("delivery_file", e.currentTarget.files[0]) }} className='form-control' />
                                    <button type="submit" name="submit_delivered" className="btn btn-success float-right submit_delivered" > Deliver Order </button>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>


               </Fragment >
            );
         }}
      </Formik>
   );
};
export default Cart;