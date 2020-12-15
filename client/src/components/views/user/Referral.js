import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"



import OwlCarousel from 'react-owl-carousel';



function Referral() {



   return (

      <Fragment>

        <div className="dashboardContainer proposals-container no-bg">
<div className="container">
   <div className="row justify-content-center">
      <div className="col-lg-9 col-md-10 mt-5 mb-5">
         <div className="myReferralContent">
         <div className="card rounded-0">
            <div className="card-body">
               <h1> My Referrals </h1>
               <p className="lead">
                  For each unique member you refer that signs up, you will get <span className='font-weight-bold text-success'>&#036;10</span> added to your shopping balance, once it is approved by us.
               </p>
               <div className="referralLinkBox">
                  Your Unique Referral Link is:          <mark> referral=862887231 </mark>
               </div>
               <p className="lead text-danger">Note: If we decide that a referral is incorrect or fraudulent, it will be declined and you will not receive any funds for it.</p>
               
               <div className="listingDatatTable">
                  <table className="table table-striped dataTable" id="cus-table-2" width="100%">
                     <thead>
                        <tr>
                           <th>Username</th>
                           <th>Signup Date</th>
                           <th>Your Commission</th>
                           <th>Status</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>Pat</td>
                           <td>October 05, 2020</td>
                           <td>13%</td>
                           <td>Pending</td>
                        </tr>
                        <tr>
                           <td>tryone</td>
                           <td>October 21, 2020</td>
                           <td>21%</td>
                           <td>Success</td>
                        </tr>
                        <tr>
                           <td>Dharan</td>
                           <td>October 05, 2020</td>
                           <td>5%</td>
                           <td>Decline</td>
                        </tr>
                        
                     </tbody>
                  </table>
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

export default Referral;