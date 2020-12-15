import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"



import OwlCarousel from 'react-owl-carousel';



function WithdrawalRequest() {



   return (

      <Fragment>

        <div className="dashboardContainer proposals-container no-bg">
<div className="container">
   <div className="row">
      <div className="col-md-12 mt-5">
         <h1 className="mb-4"> Withdrawal Requests </h1>
         <div className="card">
            <div className="card-body">
               <div className="listingDatatTable">
            <table className="table table-striped dataTable" id="cus-table-2" width="100%">
               <thead>
                  <tr>
                     <th>No</th>
                     <th>Ref No</th>
                     <th>Date</th>
                     <th>Amount</th>
                     <th>Amount</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td> 1 </td>
                     <td className="text-danger"> P-430207YO </td>
                     <td> October 09, 2020 </td>
                     <td className="text-success"> &#036;10.00  </td>
                     <td className="text-success"> Paypal  </td>
                     <td className="text-success"> 
                        Completed
                     </td>
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



      </Fragment>
   );
}

export default WithdrawalRequest;