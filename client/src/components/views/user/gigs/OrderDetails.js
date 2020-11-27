import React, { Fragment, useState } from 'react';
import { withRouter, useParams, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
import "./Gig.css";
import { getBuyerOrderDetails } from "../../../../_actions/user.action";

import OwlCarousel from 'react-owl-carousel';


const Cart = (props) =>  {

    const dispatch = useDispatch();
    const params = useParams();
    let history = useHistory();

    const [total, setTotal] = useState(0);

    useEffect(() => {
        dispatch(getBuyerOrderDetails(params.id))
       $(document).ready(function(){
   
   // Sticky Code start //
   //$("#order-status-bar").sticky({ topSpacing:0,zIndex:500});
   // Sticky code ends //
   ////  Countdown Timer Code Starts  ////
   // Set the date we're counting down to
   
   var countDownDate = new Date("Nov 20, 2020 10:43:07").getTime();
   // Update the count down every 1 second
   var x = setInterval(function(){
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
   if (distance < 0){
   clearInterval(x);
    $("#countdown-timer .countdown-number").addClass("countdown-number-late");
   document.getElementById("days").innerHTML = "<span class='red-color'>The</span>";
   document.getElementById("hours").innerHTML = "<span class='red-color'>Order</span>";
   document.getElementById("minutes").innerHTML = "<span class='red-color'>is</span>";
   document.getElementById("seconds").innerHTML = "<span class='red-color'>Late!</span>";
   }
   }, 1000);
   
   });



    }, [params.id]);
    
    const order_details = useSelector((state) => state.user && state.user.buyer_order_details && state.user.buyer_order_details.responseData && state.user.buyer_order_details.responseData.gig);

    console.log('order', order_details);
    
    

    return (

        <Formik

            enableReinitialize
            initialValues={{
                /*gig_id: params.gig,
                price: price,
                quantity: '1',
                package_id: package_id*/

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
                   /* gig_id: params.gig,
                    price: values.price,
                    quantity: values.quantity,
                    package_id: values.package_id*/
                };

                /*if (values.action == "cart") {
                    dispatch(addCart(data)).then(res => {
                        console.log(res.responseData);
                        $(".cart-count").text(res.responseData.length);
                        //addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        
                    })
                } else {
                    dispatch(addCart(data)).then(res => {
                      console.log('id',res.responseData);
                      history.push('/gig/post/order/'+res.responseData._id)
                        //addToast(res.message, { appearance: res.status, autoDismiss: true, })
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
                    setFieldValue,
                } = props;

    return (

        <Fragment>

<div id="order-status-bar">
   <div class="container">
      <div class="row">
         <div class="col-md-12">
            <h5 class="float-left mt-2">
               <span class="border border-success rounded p-1">Order: #{order_details && order_details.orderId}</span>
            </h5>
            <h5 class="float-right mt-2">
               Status: <span class="text-muted">
               {order_details && order_details.status}         </span>
            </h5>
         </div>
      </div>
   </div>
</div>
<div class="container view-proposals proposals-container order-page">
   <div class="row mt-5 mb-5">
      <div class="col-md-12">
         <div class="card">
            <div class="card-header">
               <ul class="nav nav-tabs card-header-tabs">
                  <li class="nav-item">
                     <a href="#order-activity" data-toggle="tab" class="nav-link active make-black ">Order Activity</a>
                  </li>
                  <li class="nav-item">
                     <a href="#resolution-center" data-toggle="tab" class="nav-link make-black">Resolution Center</a>
                  </li>
               </ul>
            </div>
            <div class="card-body">
               <div class="tab-content">
                  <div id="order-activity" class="tab-pane fade show active">
                     <div class="mt-4">
                        <div class="row">
                           <div class="col-md-12">
                              <div class="card">
                                 {/* card Starts */}
                                 <div class="card-body">
                                    {/* card-body Starts */}
                                    <div class="row">
                                       <div class="col-md-2">
                                          <img src="assets/images/videosales.png" class="img-fluid d-lg-block d-md-block d-none" />
                                       </div>
                                       <div class="col-md-10">
                                          <h1 class="text-success float-right d-lg-block d-md-block d-none">&#036;{order_details && order_details.price}</h1>
                                          <h4>
                                             Order Number {order_details && order_details.orderId}              <small>
                                             <a href="" target="_blank" class="text-success">
                                             View Proposal/Service               </a>
                                             </small>
                                          </h4>
                                          <p class="text-muted">
                                             <span class="font-weight-bold">Seller: </span>
                                             <a href="pat" target="_blank" class="seller-buyer-name mr-1 text-success">
                                             {order_details && order_details.buyer.firstName} {order_details && order_details.buyer.lastName}               </a>
                                             | <span class="font-weight-bold ml-1"> Status: </span>
                                             Progress             | <span class="font-weight-bold ml-1"> Date: </span>
                                             {order_details && order_details.created_at}             | <span class="font-weight-bold ml-1"> Order Revisions: </span>
                                             0                          
                                          </p>
                                       </div>
                                    </div>
                                    <div class="row d-lg-flex d-md-flex d-none">
                                       {/* row d-lg-flex Starts */}
                                       <div class="col-md-12">
                                          <table class="table table-striped mt-3">
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
                                                   <td class="font-weight-bold" width="600">
                                                      {order_details && order_details.gig.title}                               
                                                   </td>
                                                   <td>{order_details && order_details.quantity}                               
                                                   </td>
                                                   <td>1 Day</td>
                                                   <td>
                                                      &#036;{order_details && order_details.price}                             
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td colspan="4">
                                                      <span class="float-right mr-4">
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
                              <h2 class="text-center mt-4" id="countdown-heading">
                                 This Order Needs To Be Delivered Before This Day/Time:
                              </h2>
                              <div id="countdown-timer">
                                 <div class="row">
                                    <div class="col-lg-3 col-md-6 col-sm-6 countdown-box">
                                       <p class="countdown-number" id="days"></p>
                                       <p class="countdown-title">Day(s)</p>
                                    </div>
                                    <div class="col-lg-3 col-md-6 col-sm-6 countdown-box">
                                       <p class="countdown-number" id="hours"></p>
                                       <p class="countdown-title">Hours</p>
                                    </div>
                                    <div class="col-lg-3 col-md-6 col-sm-6 countdown-box">
                                       <p class="countdown-number" id="minutes"></p>
                                       <p class="countdown-title">Minutes</p>
                                    </div>
                                    <div class="col-lg-3 col-md-6 col-sm-6 countdown-box">
                                       <p class="countdown-number" id="seconds"></p>
                                       <p class="countdown-title">Seconds</p>
                                    </div>
                                 </div>
                              </div>
                              <div id="order-conversations" class="mt-3">
                                 <div class="
                                    message-div">
                                    {/* message-div Starts */}
                                    <img src="images/img-03.jpg" width="50" height="50" class="message-image" />
                                    <h5>
                                       <a href="#" class="seller-buyer-name"> James </a>
                                    </h5>
                                    <p class="message-desc">
                                       hi
                                    </p>
                                    <p class="text-right text-muted mb-0" style={{fontSize: "14px"}}> 
                                       04:43: November 19, 2020 
                                       | <a href="#" data-toggle="modal" data-target="#report-modal" class="text-muted"><i class="fa fa-flag"></i> Report</a> 
                                    </p>
                                 </div>
                                 
                              </div>
                              {/* message-div Ends */}
                              <center>
                                 <button class="btn btn-success btn-lg mt-5 mb-3" data-toggle="modal" data-target="#deliver-order-modal">
                                 <i class="fa fa-upload"></i> Deliver Order
                                 </button>
                              </center>
                              <div class="proposal_reviews mt-5">
                              </div>
                              <div class="insert-message-box">
                                 <div class="float-right">
                                    <p class="text-muted mt-1">
                                       Pat      <span         class="text-success font-weight-bold"
                                          >  
                                       is Online 
                                       </span> | Local Time
                                       <i class="fa fa-sun-o"></i>
                                       02:31 AM    
                                    </p>
                                 </div>
                                 <form id="insert-message-form" class="clearfix">
                                    <textarea name="message" rows="5" placeholder="Type your Message Here" class="form-control mb-2" onkeyup="matchWords(this)"></textarea>
                                    <div class="float-left b-2">
                                       <p id="spamWords" class="mt-1 text-danger d-none"><i class="fa fa-warning"></i> You seem to have typed word(s) that are in violation of our policy. No direct payments or emails allowed.</p>
                                    </div>
                                    <button type="submit" class="btn btn-success float-right">Send</button>
                                    <div class="clearfix"></div>
                                    <p></p>
                                    <div class="form-row align-items-center message-attacment ml-0 mr-0">
                                       {/* form-row align-items-center message-attacment Starts */}
                                       <label class="h6 ml-2 mt-1"> Attach File (optional) </label>
                                       <input type="file" name="file" class="form-control-file p-1 mb-2 mb-sm-0" />
                                    </div>
                                    {/* form-row align-items-center message-attacment Ends */}
                                 </form>
                              </div>
                              <div id="upload_file_div"></div>
                              <div id="message_data_div"></div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div id="resolution-center" class="tab-pane fade">
                     <div class="mt-4">
                        <div class="row">
                           <div class="col-md-12">
                              <div class="card">
                                 <div class="card-body">
                                    <div class="row">
                                       <div class="col-md-12">
                                          <h3 class="text-center mb-3"> Order Cancellation Request</h3>
                                          <form method="post">
                                             <div class="form-group">
                                                <textarea name="cancellation_message" placeholder="Please be as detailed as possible..." rows="10" class="form-control" required></textarea>
                                             </div>
                                             <div class="form-group">
                                                <label class="font-weight-bold"> Cancellation Request Reason </label>
                                                <select name="cancellation_reason" class="form-control">
                                                   <option class="hidden"> Select Cancellation Reason </option>
                                                   <option> Buyer is not responding. </option>
                                                   <option> Buyer is extremely rude. </option>
                                                   <option> Buyer requested that I cancel this order.</option>
                                                   <option> Buyer expects more than what this proposal can offer.</option>
                                                </select>
                                             </div>
                                             <input type="submit" name="submit_cancellation_request" value="Submit Cancellation Request" class="btn btn-success float-right" />
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
<div id="report-modal" class="modal fade">
   {/* report-modal modal fade Starts */}
   <div class="modal-dialog">
      {/* modal-dialog Starts */}
      <div class="modal-content">
         {/* modal-content Starts */}
         <div class="modal-header p-2 pl-3 pr-3">
            {/* modal-header Starts */}
            Report This Message
            <button class="close" data-dismiss="modal"><span>&times;</span></button>
         </div>
         {/* modal-header Ends */}
         <div class="modal-body">
            {/* modal-body p-0 Starts */}
            <h6>Let us know why you would like to report this user?.</h6>
            <form action="" method="post">
               <div class="form-group mt-3">
                  {/* form-group Starts */}
                  <select class="form-control float-right" name="reason" required="">
                     <option value="">Select Reason</option>
                     <option>The Buyer tried to abuse the rating system.</option>
                     <option>The Buyer was using inappropriate language.</option>
                  </select>
               </div>
               {/* form-group Ends */}
               <br />
               <br />
               <div class="form-group mt-1 mb-3">
                  {/* form-group Starts */}
                  <label> Additional Information </label>
                  <textarea name="additional_information" rows="3" class="form-control" required=""></textarea>
               </div>
               {/* form-group Ends */}
               <button type="submit" name="submit_report" class="float-right btn btn-sm btn-success">
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
<div id="deliver-order-modal" class="modal fade">
   {/* deliver-order-modal Starts */}
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title"> Deliver Your Order Now </h5>
            <button class="close" data-dismiss="modal"> <span>&times;</span> </button>
         </div>
         <div class="modal-body">
            <form method="post" enctype="multipart/form-data">
               <div class="form-group">
                  <label class="font-weight-bold" > Message </label>
                  <textarea name="delivered_message" placeholder="Type Your Message Here..." class="form-control mb-2" required="" rows="3"></textarea>
               </div>
               <div class="form-group">
                  <label for="">Enable Watermark : </label>
                  <input type="checkbox" name="enable_watermark" value="1" style={{position: "relative", top: "2px"}} />
               </div>
               <div class="form-group mb-0">
                  <input type="file" name="delivered_file" class="mt-1 mb-2" /> 
                  <input type="submit" name="submit_delivered" value="Deliver Order" class="btn btn-success float-right" />
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