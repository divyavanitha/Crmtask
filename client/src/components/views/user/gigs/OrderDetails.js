import React, { Fragment, useState } from 'react';
import { withRouter, useParams, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
import "./Gig.css";
import { getBuyerOrderDetails, rating, getDeliveryStatus } from "../../../../_actions/user.action";

import OwlCarousel from 'react-owl-carousel';


const Cart = (props) => {

   const dispatch = useDispatch();
   const params = useParams();
   let history = useHistory();

   const [total, setTotal] = useState(0);

   useEffect(() => {
      dispatch(getBuyerOrderDetails(params.id))
      dispatch(getDeliveryStatus(params.id))
      //$(document).ready(function () {

         // Sticky Code start //
         //$("#order-status-bar").sticky({ topSpacing:0,zIndex:500});
         // Sticky code ends //
         ////  Countdown Timer Code Starts  ////
         // Set the date we're counting down to

         /*var countDownDate = new Date("Nov 20, 2020 10:43:07").getTime();
         // Update the count down every 1 second
         var x = setInterval(function () {
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

      });
*/

         /*$(document).ready(function () {

                  $('.rating-select').barrating({
                      theme: 'fontawesome-stars'
                  });

              });*/


      $("body").on("click", ".complete", function(){

            $.ajax({
              url: "/api/gig/update/orderStatus",
              type: "post",
              data: {
                  id: params.id,
                status: "Completed"
              },

              headers: {
                  Authorization: localStorage.token
              },
              beforeSend: function (request) {
                //showInlineLoader();
              },
              success: function (response, textStatus, jqXHR) {

               console.log(response);
               window.location.reload();

              },
              error: function (jqXHR, textStatus, errorThrown) {
                  //
              }
            });

         });


   }, [params.id]);

   const order_details = useSelector((state) => state.user && state.user.buyer_order_details && state.user.buyer_order_details.responseData && state.user.buyer_order_details.responseData.gig);

   const delivery_status = useSelector((state) => state.user );

   console.log('order', delivery_status);



   return (

      <Formik

         enableReinitialize
         initialValues={{
            order_id: params.id,
            rating: "",
            comment: "",
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
            let data = {
                order_id: params.id,
                rating: values.rating,
                comment: values.comment
            };

            
              dispatch(rating(data)).then(res => {
                console.log('id',res.responseData);
                //history.push('/buyer-order-lists')
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
                                    {order_details && order_details.status}         </span>
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
                                    <li className="nav-item">
                                       <a href="#resolution-center" data-toggle="tab" className="nav-link make-black">Resolution Center</a>
                                    </li>
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
                                                               Order Number {order_details && order_details.orderId}              <small>
                                                                  <a href="" target="_blank" className="text-success">
                                                                     View Proposal/Service               </a>
                                                               </small>
                                                            </h4>
                                                            <p className="text-muted">
                                                               <span className="font-weight-bold">Seller: </span>
                                                               <a href="pat" target="_blank" className="seller-buyer-name mr-1 text-success">
                                                                  {order_details && order_details.seller.firstName} {order_details && order_details.seller.lastName}               </a>
                                             | <span className="font-weight-bold ml-1"> Status: </span>
                                             {order_details && order_details.status}              | <span className="font-weight-bold ml-1"> Date: </span>
                                                               {order_details && order_details.created_at}             | <span className="font-weight-bold ml-1"> Order Revisions:  </span>
                                                               {order_details && order_details.revisions}
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
                                                </div>
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
                                                {/*<center>
                                 <button className="btn btn-success btn-lg mt-5 mb-3" data-toggle="modal" data-target="#deliver-order-modal">
                                 <i className="fa fa-upload"></i> Deliver Order
                                 </button>
                              </center>*/}

                                    {(order_details && order_details.status == "Delivered") ? <div className="card mt-4">

                                        <div className="card-body">

                                          <h5 className="text-center">
                                           <img src="images/svg/box.svg" className="order-icon"/> Order Delivered
                                         </h5>

                                         
                                          <p className="text-center font-weight-bold pb-0">You have 7 day(s) to complete/respond to this order, otherwise it will be automatically marked as completed.</p>
                                         
                                         
                                        </div>

                                    </div> : ""}

                                    {/*<div className="message-div">
                                           <img src="https://www.gigtodo.com//user_images/ty_1574032240.png" width="50" height="50" className="message-image" />

                                             <h5>

                                             <a href="#" className="seller-buyer-name"> tyrone </a>

                                             </h5>

                                             <p className="message-desc">

                                             fdddfsdf

                                                 <a href='orderIncludes/download?order_id=1611&c_id=1376' className='d-block mt-2 ml-1' target='_blank'>
                                                   <i className='fa fa-download'></i> download_1606746068.jpeg
                                                 </a>
                                               
                                             </p>

                                             <p className="text-right text-muted mb-0"> 08:11: November 30 2020 </p>

                                       </div>*/}

                                       {(order_details && order_details.status == "Delivered") ? <center className="pb-4 mt-4">
                                          <div>
                                             <button className="btn btn-success complete">Accept & Review Order</button>
                                             &nbsp;&nbsp;&nbsp;
                                             <button type="button" data-toggle="modal" data-target="#revision-request-modal" className="btn btn-success">
                                             Request A Revision
                                             </button>
                                          </div>
                                       </center> : ""}


                                   {(order_details && order_details.status == "Completed" || order_details && order_details.user_rated == 0)  ? <div className="order-review-box mb-3 p-3">

                                       <h3 className="text-center text-white"> Please Submit a Review For Your Seller</h3>

                                       <div className="row">

                                           <div className="col-md-8 offset-md-2">

                                               <form onSubmit={handleSubmit} encType="multipart/form-data" align="center">

                                                   <div className="form-group">

                                                       <label className="h6 text-white">Review Rating</label>

                                                       <select name="rating" onChange={handleChange} className="rating-select">

                                                           <option value="1">1</option>
                                                           <option value="2">2</option>
                                                           <option value="3">3</option>
                                                           <option value="4">4</option>
                                                           <option value="5">5</option>

                                                       </select>

                                                   </div>

                                                   <Field component="textarea" rows="5" id="comment" value={values.comment} name="comment" onChange={handleChange} maxLength={100} className='form-control mb-2' />

                                                   <button type="submit" className="btn btn-success"> Submit Review </button>


                                               </form>

                                               
                                           </div>


                                       </div>

                                   </div> : ""}
                                       <div className="proposal_reviews mt-5"></div>
                                                {(order_details && order_details.status != "Completed") ? <div className="insert-message-box">
                                                   <div className="float-right">
                                                      <p className="text-muted mt-1">
                                                         {order_details && order_details.seller.firstName} <span className="text-success font-weight-bold"
                                                         >
                                                            is Online </span> | Local Time
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
                                                </div> : ""}
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
                                                            <form method="post">
                                                               <div className="form-group">
                                                                  <textarea name="cancellation_message" placeholder="Please be as detailed as possible..." rows="10" className="form-control" required></textarea>
                                                               </div>
                                                               <div className="form-group">
                                                                  <label className="font-weight-bold"> Cancellation Request Reason </label>
                                                                  <select name="cancellation_reason" className="form-control">
                                                                     <option className="hidden"> Select Cancellation Reason </option>
                                                                     <option> Buyer is not responding. </option>
                                                                     <option> Buyer is extremely rude. </option>
                                                                     <option> Buyer requested that I cancel this order.</option>
                                                                     <option> Buyer expects more than what this proposal can offer.</option>
                                                                  </select>
                                                               </div>
                                                               <input type="submit" name="submit_cancellation_request" value="Submit Cancellation Request" className="btn btn-success float-right" />
                                                            </form>
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
                  <div id="revision-request-modal" class="modal fade">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title"> Submit Your Revision Request Here </h5>
                          <button class="close" data-dismiss="modal"> <span>&times;</span> </button>
                        </div>
                        <div class="modal-body">

                          
                          <form method="post" enctype="multipart/form-data">
                            <div class="form-group">
                              <label class="font-weight-bold" > Request Message </label>
                              <textarea name="revison_message" placeholder="Type Your Message Here..." class="form-control mb-2" required=""></textarea>
                            </div>
                            <div class="form-group clearfix">
                              <input type="file" name="revison_file" class="mt-1" />
                              <input type="submit" name="submit_revison" value="Submit Request" class="btn btn-success float-right" />
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