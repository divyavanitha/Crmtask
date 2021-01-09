import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { getMenu, buyerOrderList } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"
import moment from 'moment';



import OwlCarousel from 'react-owl-carousel';



function Purchase() {

const dispatch = useDispatch();
   let history = useHistory();

   useEffect(() => {
      dispatch(buyerOrderList())

   }, []);

   const buyer_order_list = useSelector((state) => state.user && state.user.buyer_order_list);

   console.log('list', buyer_order_list);

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
                   {buyer_order_list && buyer_order_list.completed_order.map((list, index) => (<tr>
                     <td> { moment(list.created_at).format('MMMM DD, YYYY') } </td>
                     <td> 
                     Order Tip Payment with <b>{list.payment_mode}</b> (<Link target='_blank' to={"/order/details/" + list._id} className='text-success'>View Order</Link>)
                     </td>
                     <td className="text-danger"> 
                     -&#036;{list.price}
                     </td>   
                  </tr>))}
                  
                  
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