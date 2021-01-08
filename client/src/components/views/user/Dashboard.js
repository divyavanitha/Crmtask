import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getMenu } from "../../../_actions/user.action";
import moment from 'moment';
import Gig from "./gigs/Gig"

import { findUser, sellerOrderList, getNotification, deleteNotification } from "../../../_actions/user.action";

import $ from 'jquery';

import OwlCarousel from 'react-owl-carousel';



function Dashboard() {

   const dispatch = useDispatch();


   const user = useSelector((state) => state.user && state.user.find_user && state.user.find_user.responseData && state.user.find_user.responseData.user);
   const order_count = useSelector((state) => state.user && state.user.seller_order_list);
   const seller_buyer = useSelector((state) => state.user && state.user.seller_buyer);
   const notification = useSelector((state) => state.user && state.user.notification && state.user.notification.responseData && state.user.notification.responseData.notification);

   useEffect(() => {
      dispatch(findUser())
      dispatch(sellerOrderList())
      dispatch(getNotification())

      $('body').on('click', '.delete', function (e) {
         //alert();
         var that = $(this);
         e.preventDefault();
         const sid = that.data('id');
         console.log('id', sid);
         $('.delete-modal').modal("show");
         $(".delete-modal-btn")
            .off()
            .on("click", function () {
               dispatch(deleteNotification(sid)).then(res => {
                  //addToast(res.message, { appearance: res.status, autoDismiss: true, })
                  that.closest('div').remove();
                  $('.delete-modal').modal("hide");
                  //window.location.reload();

               })

            });
      });

   }, []);

console.log('useer', seller_buyer);
   return (

      <Fragment>

        <div className="dashboardContainer proposals-container no-bg">
<div className="container mt-5 mb-5">
   <div className="row">
      <div className="col-md-4">
         <h5 className="h5 mb-3"><i className="fa fa-address-book "></i> My Contacts </h5>
               
         <div className="card mb-3 contacts-sidebar">
            <div className="card-header">
               <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                     <a href="#my_buyers" data-toggle="tab" className="nav-link make-black active "> My Buyers </a>
                  </li>
                  <li className="nav-item">
                     <a href="#my_sellers" data-toggle="tab" className="nav-link make-black"> My Sellers </a>
                  </li>
               </ul>
            </div>
            <div className="card-body">
               <div className="tab-content">
                  <div id="my_buyers" className="tab-pane fade show active">
                     <div className="listingDatatTable">
                        <table className="table table-striped dataTable" id="" width="100%">
                           <thead>
                              <tr>
                                 <th className="gray">Buyer Names</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td>
                                    <img src={ require('../../../assets/images/comp/profileIcon.png') } className="rounded-circle" width="50" height="50" />
                                    <div className="contact-title">
                                       <h6 className="make-black">Andrew201 </h6>
                                       <a href="" target="_blank" className="badge badge-success">
                                       User Profile 
                                       </a>
                                       <a href="" target="_blank" className="badge badge-success">  Chat History </a>
                                    </div>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
                  <div id="my_sellers" className="tab-pane fade">
                     <div className="listingDatatTable">
                        <table className="table table-striped dataTable" id="" width="100%">
                           <thead>
                              <tr>
                                 <th className="gray">Seller Names</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td>
                                    <img src={ require('../../../assets/images/comp/profileIcon.png') } className="rounded-circle" width="50" height="50" />
                                    <div className="contact-title">
                                       <h6 className="make-black">mazenlenox10</h6>
                                       <a href="" target="_blank" className="badge badge-success">
                                       User Profile </a>
                                       <a href="" target="_blank" className="badge badge-success"> Chat History </a>
                                    </div>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="card rounded-0 sticky-start mb-3 card_user">
            <div className="card-body">
               <img src={ require('../../../assets/images/sales.png') } className="img-fluid center-block" alt="none" />
               <h4>Start Selling</h4>
               <p>Sell your services to millions of people all over the world.</p>
               <Link to="/start/selling" target="_blank" className="btn get_btn"> GET STARTED </Link>
            </div>
         </div>
         <br />
         
      </div>
      <div className="col-md-8">
         <div className="userDetailBox">
            <div className="row">
               <div className="col-lg-3 col-sm-12 text-center">
                  <div className="userImg">
                     <img src={ user && user.profilePhoto ? user && user.profilePhoto : window.location.href+"public/images/images_1608630531.png" } className="rounded-circle img-thumbnail img-fluid" />
                  </div>
               </div>
               <div className="col-lg-9 col-sm-12 text-lg-left text-center ">
                  <div className="row mb-3">
                     <div className="col-6 col-lg-4">
                        <h6><i className="fa fa-globe pr-1"></i> Country</h6>
                        <h4 className="text-muted">{user && user.country.name}</h4>
                     </div>
                     <div className="col-6 col-lg-8">
                        <h6><i className="fa fa-star pr-1"></i> Positive Ratings</h6>
                        <h4 className="text-muted"> {Math.round(user && user.ratingPercent)}%</h4>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-6 col-sm-4">
                        <h6><i className="fa fa-truck pr-1"></i> Recent Delivery</h6>
                        <h4 className="text-muted">{ moment(user && user.recentDelivery).format('MMMM DD, YYYY') }</h4>
                     </div>
                     <div className="col-6 col-lg-8">
                        <h6><i className="fa fa-clock-o pr-1"></i> Member Since</h6>
                        <h4 className="text-muted">{ moment(user && user.createdAt).format('MMMM DD, YYYY') }</h4>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="card rounded-0">
            <div className="card-body">
               
               <div className="overallStatus">
                  <div className="row">
                     <div className="col-md-4 text-left">
                        <div className="dl-box">
                           <div className="dl-icon">
                              <img width="" src={ require('../../../assets/images/comp/completed.png') } alt="completed" />
                           </div>
                           <h5 className="text-muted pt-2"> Orders Completed</h5>
                           <h3 className="text-success">{user && user.completedOrder}</h3>
                        </div>
                     </div>
                     <div className="col-md-4 text-left">
                        <div className="dl-box">
                           <div className="dl-icon">
                              <img width="" src={ require('../../../assets/images/comp/box.png') } alt="box" />
                           </div>
                           <h5 className="text-muted pt-2">Delivered Orders</h5>
                           <h3 className="text-success">{order_count && order_count.delivered_order.length}</h3>
                        </div>
                     </div>
                     <div className="col-md-4 text-left">
                        <div className="dl-box">
                           <div className="dl-icon">
                              <img width="" src={ require('../../../assets/images/comp/cancellation.png') } alt="cancellation" />
                           </div>
                           <h5 className="text-muted pt-2">Orders Cancelled</h5>
                           <h3 className="text-success">{order_count && order_count.cancelled_order.length}</h3>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-md-4 text-left">
                        <div className="dl-box">
                           <div className="dl-icon">
                              <img width="" src={ require('../../../assets/images/comp/debt.png') } alt="debt" />
                           </div>
                           <h5 className="text-muted pt-2"> Sales In Queue</h5>
                           <h3 className="text-success">{order_count && order_count.active_order.length}</h3>
                        </div>
                     </div>
                     <div className="col-md-4 text-left">
                        <div className="dl-box">
                           <div className="dl-icon">
                              <img width="" src={ require('../../../assets/images/comp/accounting.png') } alt="accounting" />
                           </div>
                           <h5 className="text-muted pt-2"> Balance</h5>
                           <h3 className="text-success">&#036;1,124.00</h3>
                        </div>
                     </div>
                     <div className="col-md-4 text-left">
                        <div className="dl-box">
                           <div className="dl-icon">
                              <img width="" src={ require('../../../assets/images/comp/financial.png') } alt="financial" />
                           </div>
                           <h5 className="text-muted pt-2"> Earnings(Month) </h5>
                           <h3 className="text-success">&#036;85.00</h3>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="card rounded-0 mt-3 bottom-tabs-dash">
            <div className="card-header">
               <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                     <a href="#notifications" data-toggle="tab" className="nav-link make-black active">
                     Notifications <span className="badge badge-success">{notification && notification.length} </span>
                     </a>
                  </li>
                  <li className="nav-item">
                     <a href="#inbox" data-toggle="tab" className="nav-link make-black">
                     Messages <span className="badge badge-success">15</span>
                     </a>
                  </li>
               </ul>
            </div>
            <div className="card-body">
               <div className="tab-content dashboard">
                  <div id="notifications" className="tab-pane fade show active mt-3">
                     {notification && notification.map((list, index) => (<div className="header-message-div-unread">
                        <Link data-id={list._id} className="float-right delete text-danger delete">
                        <i className="fa fa-times-circle fa-lg delete"></i>  
                        </Link>
                         <Link target="_blank" to={list.type == "ORDER" ? "/order/details/"+list.orderId : (list.type == "GIG" ? "/gigs" : "/buyer/requests")}>
                           <img src={list.sender ? list.sender.profilePhoto : window.location.href+"public/images/images_1608630531.png"} width="50" height="50" className="rounded-circle" />
                           <strong className="heading">{list.sender ? list.sender.firstName : "Admin"}</strong>
                           <p className="message">{list.message}</p>
                           <p className="date text-muted"> {moment(list.created_at).format('MMMM DD, YYYY')}</p>
                        </Link>
                     </div>))}
                     <div className="p-3">
                         <Link to="/notifications" target="_blank" className="ml-0 btn btn-success btn-block">See All</Link>
                        
                     </div>
                  </div>
                  <div id="inbox" className="tab-pane fade mt-3">
                     <div className="header-message-div">
                        <a href="">
                           <img src={ require('../../../assets/images/comp/profileIcon.png') } width="50" height="50" className="rounded-circle" />
                           <strong className="heading">Andrew201</strong>
                           <p className="message text-truncate">Sent you an offer</p>
                           <p className="text-muted date">12:46: October 16, 2020</p>
                        </a>
                     </div>
                     <div className="p-3">
                        <a href="" className="btn btn-success btn-block">
                        See All              </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</div>

    <div className="modal delete-modal" tabIndex="-1" role="basic" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h4 className="modal-title">Confirm Delete</h4>
                  </div>
                  <div className="modal-body p-2"> Are you sure want to delete? </div>
                  <div className="modal-footer">
                     <button type="button" className="btn default" data-dismiss="modal">Close</button>
                     <button type="button" data-value="1" className="btn btn-danger delete-modal-btn">Delete</button>
                  </div>
               </div>

            </div>

         </div>

      </Fragment>
   );
}

export default Dashboard;