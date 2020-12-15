import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"



import OwlCarousel from 'react-owl-carousel';



function Purchase() {



   return (

      <Fragment>

        <div className="dashboardContainer proposals-container no-bg">
<div className="container">
   <div className="row">
      <div className="col-md-12 mt-5">
         <h1 className="mb-4"> Purchases </h1>
         <div className="card">
            <div className="card-body">
               <div className="listingDatatTable">
            <table className="table table-striped dataTable" id="cus-table-2" width="100%">
               <thead>
                  <tr>
                     <th>Date</th>
                     <th>For</th>
                     <th>Amount</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td> November 09, 2020 </td>
                     <td> 
                     Order Tip Payment with <b>Shopping Balance</b> (<a target='' href='' className='text-success'>View Order</a>)
                     </td>
                     <td className="text-danger"> 
                     -&#036;1.00 
                     </td>   
                  </tr>
                  <tr>
                     <td> November 08, 2019 </td>
                     <td> 
                     Proposal/Service with <b>Shopping Balance</b> (<a target='' href='' className='text-success'>View Order</a>)
                     </td>
                     <td className="text-danger"> 
                     -&#036;1.00 
                     </td>
                  </tr>
                  <tr>
                     <td> November 09, 2020 </td>
                     <td> 
                     Order Tip Payment with <b>Shopping Balance</b> (<a target='' href='' className='text-success'>View Order</a>)
                     </td>
                     <td className="text-danger"> 
                     -&#036;1.00 
                     </td>
                  </tr>
                  <tr>
                     <td> November 09, 2020 </td>
                     <td> 
                     Order Tip Payment with <b>Shopping Balance</b> (<a target='' href='' className='text-success'>View Order</a>)
                     </td>
                     <td className="text-danger"> 
                     -&#036;1.00 
                     </td>
                  </tr>
                  <tr>
                     <td> November 09, 2020 </td>
                     <td> 
                     Order Tip Payment with <b>Shopping Balance</b> (<a target='' href='' className='text-success'>View Order</a>)
                     </td>
                     <td className="text-danger"> 
                     -&#036;1.00 
                     </td>
                  </tr>
                  <tr>
                     <td> November 09, 2020 </td>
                     <td> 
                     Order Tip Payment with <b>Shopping Balance</b> (<a target='' href='' className='text-success'>View Order</a>)
                     </td>
                     <td className="text-danger"> 
                     -&#036;1.00 
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

export default Purchase;