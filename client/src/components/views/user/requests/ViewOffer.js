import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { useToasts } from 'react-toast-notifications'
import $ from 'jquery';

import { viewOffer, orderOffer } from "../../../../_actions/request.action";

const ViewOffer = (props) => {

   const dispatch = useDispatch();
   let history = useHistory();
   const params = useParams();
   const auth = useSelector((state) => state.user);

   useEffect(() => {
      dispatch(viewOffer(params.id))

      $('body').on('click', '.order', function(e){

         var that = $(this);
         e.preventDefault();
         const id = params.id;
         const gig = that.data('gig');
         const amount = that.data('amount');
         const duration = that.data('duration');
         const description = that.data('description');
         const gigId = that.data('id');
         const seller = that.data('seller');

         $("#Gig").text(gig);
         $("#description").text(description);
         $("#price").text("$"+amount);
         $(".duration").text("Delivery Time: "+duration);

         $('.payment-listing-modal').modal("show");
         $(".payment-modal-btn")
            .off()
            .on("click", function () {
               let wallet = false;
               if ($("input[name='payment_option']:checked").val() == "wallet") {
                  wallet = true;
               }

               let data = {
                  payment_mode: $("input[name='payment_option']:checked").val(),
                  gig_id: gigId,
                  amount: amount,
                  duration: duration,
                  seller: seller,
                  wallet: wallet
               }
console.log('data',data);
               dispatch(orderOffer(data)).then(res => {
                  $('.payment-listing-modal').modal("hide");
                  history.push('/buying-order-lists');
               })

            });
      });

   }, [params.id]);

const offer = useSelector((state) => state.request && state.request.view_offer && state.request.view_offer.responseData);

console.log('offer', offer && offer.offers);

   return (

      <Formik

         enableReinitialize
         initialValues={{
   
         }
         }

         validationSchema={Yup.object().shape({
           
         })}
         onSubmit={(values, { setSubmitting, resetForm }) => {
           

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


                  <div className="container mt-4 mb-4">
                     <div className="row view-offers">
                        <h2 className="mb-3 ml-3"> View Offers ({offer && offer.request.offerCount ? offer && offer.request.offerCount : "0"}) </h2>
                        <div className="col-md-12">
                           <div className="card mb-4 rounded-0">
                              <div className="card-body">
                                 <h5 className="font-weight-bold"> Request Description: </h5>
                                 <p className="offer-p">{offer && offer.request.description}</p>
                                 <p className="offer-p">
                                 <i className="fa fa-money"></i> <span> Request Budget: </span><span className="text-muted"> &#036;{offer && offer.request.budget} </span><br />
                                 <i className="fa fa-calendar"></i> <span> Request Date: </span><span className="text-muted"> {offer && offer.request.created_at}</span> <br />
                                 <i className="fa fa-clock-o"></i> <span> Request Duration: </span><span className="text-muted">  {offer && offer.request.duration} </span>  <br />
                                 <i className="fa fa-archive"></i> <span> Request Category: </span><span className="text-muted"> {offer && offer.request.category.name} / {offer && offer.request.subCategory.name} </span>
                                 </p>
                              </div>
                           </div>
                        { offer && offer.offers.map((list, index) => (<div className="card rounded-0 mb-3">
                           {console.log('gig', list.gig._id)}
                           <div className="card-body">
                              <div className="row">
                                 <div className="col-md-2">
                                    <img src={(list.gig.photo.length > 0) ? list.gig.photo[0].photo : ""} className="img-fluid" />
                                 </div>
                              <div className="col-md-7">
                                    <h5 className="mt-md-0 mt-2">
                                    <a href="../proposals/pat/i-will-design-your-dream-logo" className="text-success"> 
                                    {list.gig.title}                     </a>
                                    </h5>
                                    <p className="mb-1">{list.description}</p>
                                    <p className="offer-p">
                                    <i className="fa fa-money"></i> Offer Budget: <span className="font-weight-normal text-muted"> &#036;{list.amount} </span><br />
                                    <i className="fa fa-calendar"></i> Offer Duration: <span className="font-weight-normal text-muted"> {list.duration} </span>
                                    </p>
                              </div>
                           <div className="col-md-3 responsive-border pt-md-0 pt-3">
                              <div className="offer-seller-picture">
                                 <a href="../pat" target="_blank"><img src={list.seller.profilePhoto} className="rounded-circle" /></a>
                                 <img src="../images/level_badge_3.png" className="level-badge" />
                              </div>
                              <div className="offer-seller mb-4">
                                 <p className="font-weight-bold mb-1">
                                 {list.seller.firstName}  <small className="text-success"> online  </small>
                                 </p>
                                 <p className="user-link">
                                    <a href="../pat" className="text-success" target="blank"> User Profile </a>
                                 </p>
                              </div>
                              <a href="../conversations/message?seller_id=19&offer_id=97" className="btn btn-sm btn-success rounded-0">
                                 Contact Now
                              </a> &nbsp;
                              <button id="order-button" data-id={list.gig._id} data-gig={list.gig.title} data-description={list.description} data-amount={list.amount} data-seller={list.seller._id} data-duration= {list.duration} className="btn btn-sm btn-success rounded-0 order">
                                 Order Now
                              </button>
                          </div>
                          </div>
                           </div>
                        </div>))}
               </div>
            </div>
         </div>

<div className="modal payment-listing-modal" tabIndex="-1" role="basic" aria-hidden="true" data-backdrop="static" data-keyboard="false">
   <div className="modal-dialog">
      <div className="modal-content">
         <div className="modal-header">
            <h5 className="modal-title"> Select A Payment Method </h5>
            <button className="close" data-dismiss="modal">
               <span> × </span>
            </button>
         </div>
         <div className="modal-body p-0">
            <div className="order-details">
               <div className="request-div">
                  <h4>THIS ORDER IS RELATED TO THE FOLLOWING REQUEST:</h4>
                  <p>
                     {offer && offer.request.title}
                  </p>
                  
               </div>
               <div className="offer-div">
                  <h4 id="Gig">
                     I will design your dream logo                  
                     
                  </h4>
                  <span className="price" id="price">$22.00</span>
                  <p id="description">w</p>
                  <p><strong> <i className="fa fa-calendar duration"></i>  </strong></p>
               </div>
            </div>
            <div className="payment-options-list">
               <div className="payment-options mb-2">
                  <input type="radio" value="wallet" name="payment_option" id="shopping-balance" className="radio-custom" />
                  <label for="shopping-balance" className="radio-custom-label"></label>
                  <span className="lead font-weight-bold"> Shopping Balance </span>
                  <p className="lead ml-5">
                  Personal Balance - {auth.user.firstName} <span className="text-success font-weight-bold"> ${auth.user.wallet} </span>
                  </p>
               </div>
               <hr />
                                                            
            </div>
         </div>
         <div className="modal-footer">
             <button className="btn btn-secondary" data-dismiss="modal"> Close </button>
                 <button className="btn btn-success payment-modal-btn" type="submit" name="view_offers_submit_order" >
                  Pay With Shopping Balance</button>
               
               <br />
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

export default ViewOffer;