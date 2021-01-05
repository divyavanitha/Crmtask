import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getMenu } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"

import { getProfile } from "../../../_actions/profile.action";


import OwlCarousel from 'react-owl-carousel';



function Dashboard() {

   const dispatch = useDispatch();


   const profile = useSelector((state) => state.profile && state.profile.getprofile && state.profile.getprofile.responseData && state.profile.getprofile.responseData.user);

   useEffect(() => {
      dispatch(getProfile())
   }, []);

console.log('useer', profile);
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
               <button className="btn get_btn"> GET STARTED </button>
            </div>
         </div>
         <br />
         
      </div>
      <div className="col-md-8">
         <div className="userDetailBox">
            <div className="row">
               <div className="col-lg-3 col-sm-12 text-center">
                  <div className="userImg">
                     <img src={ require('../../../assets/images/comp/profileIcon.png') } className="rounded-circle img-thumbnail img-fluid" />
                  </div>
               </div>
               <div className="col-lg-9 col-sm-12 text-lg-left text-center ">
                  <div className="row mb-3">
                     <div className="col-6 col-lg-4">
                        <h6><i className="fa fa-globe pr-1"></i> Country</h6>
                        <h4 className="text-muted">United States</h4>
                     </div>
                     <div className="col-6 col-lg-8">
                        <h6><i className="fa fa-star pr-1"></i> Positive Ratings</h6>
                        <h4 className="text-muted"> 100%</h4>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-6 col-sm-4">
                        <h6><i className="fa fa-truck pr-1"></i> Recent Delivery</h6>
                        <h4 className="text-muted">November 07, 2020</h4>
                     </div>
                     <div className="col-6 col-lg-8">
                        <h6><i className="fa fa-clock-o pr-1"></i> Member Since</h6>
                        <h4 className="text-muted">June 28, 2019</h4>
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
                           <h3 className="text-success">18</h3>
                        </div>
                     </div>
                     <div className="col-md-4 text-left">
                        <div className="dl-box">
                           <div className="dl-icon">
                              <img width="" src={ require('../../../assets/images/comp/box.png') } alt="box" />
                           </div>
                           <h5 className="text-muted pt-2">Delivered Orders</h5>
                           <h3 className="text-success">1</h3>
                        </div>
                     </div>
                     <div className="col-md-4 text-left">
                        <div className="dl-box">
                           <div className="dl-icon">
                              <img width="" src={ require('../../../assets/images/comp/cancellation.png') } alt="cancellation" />
                           </div>
                           <h5 className="text-muted pt-2">Orders Cancelled</h5>
                           <h3 className="text-success">20</h3>
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
                           <h3 className="text-success">19</h3>
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
                     Notifications <span className="badge badge-success">201 </span>
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
                     <div className="header-message-div-unread">
                        <a href="" className="float-right delete text-danger">
                        <i className="fa fa-times-circle fa-lg"></i>  
                        </a>
                        <a href="">
                           <img src={ require('../../../assets/images/comp/profileIcon.png') } width="50" height="50" className="rounded-circle" />
                           <strong className="heading">pat</strong>
                           <p className="message">Has just sent you an order.</p>
                           <p className="date text-muted"> November 09, 2020</p>
                        </a>
                     </div>
                     <div className="p-3">
                        <a href="" className="btn btn-success btn-block">
                        See All              </a>
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



      </Fragment>
   );
}

export default Dashboard;