import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
//import { useToasts } from 'react-toast-notifications'
import moment from 'moment';
import { getGigList, deleteGig } from "../../../../_actions/gigs.action";
import { buyerOrderList } from "../../../../_actions/user.action";

import $ from 'jquery';

const GigList = (props) => {
   const dispatch = useDispatch();
   let history = useHistory();

   useEffect(() => {
      dispatch(buyerOrderList())

      $('body').on('click', '.delete', function (e) {
         //alert();
         var that = $(this);
         e.preventDefault();
         const sid = that.data('id');
         console.log('id', sid);
         console.log(that.closest('tr'));
         $('.delete-modal').modal("show");
         $(".delete-modal-btn")
            .off()
            .on("click", function () {
               dispatch(deleteGig(sid)).then(res => {
                  //addToast(res.message, { appearance: res.status, autoDismiss: true, })
                  that.closest('tr').remove();
                  $('.delete-modal').modal("hide");

               })

            });
      });

   }, []);

   const buyer_order_list = useSelector((state) => state.user && state.user.buyer_order_list);

   console.log('list', buyer_order_list);
   return (


      <Fragment>

         <div className="container view-proposals proposals-container">
            <div className="row mt-5 mb-3">
               <div className="col-md-12">
                  <h1 className="">Manage Orders</h1>
               </div>
            </div>
            <div className="row mb-5">
               <div className="col-md-12">
                  <div className="card">
                     <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                           <li className="nav-item">
                              <a href="#active" data-toggle="tab" className="nav-link make-black active ">
                                 ACTIVE <span className="badge badge-success">{buyer_order_list && buyer_order_list.active_order.length}</span>
                              </a>
                           </li>
                           <li className="nav-item">
                              <a href="#delivered" data-toggle="tab" className="nav-link make-black">
                                 DELIVERED <span className="badge badge-success">{buyer_order_list && buyer_order_list.delivered_order.length}</span>
                              </a>
                           </li>
                           <li className="nav-item">
                              <a href="#completed" data-toggle="tab" className="nav-link make-black">
                                 COMPLETED <span className="badge badge-success">{buyer_order_list && buyer_order_list.completed_order.length}</span>
                              </a>
                           </li>
                           <li className="nav-item">
                              <a href="#cancelled" data-toggle="tab" className="nav-link make-black">
                                 CANCELLED <span className="badge badge-success">{buyer_order_list && buyer_order_list.cancelled_order.length}</span>
                              </a>
                           </li>
                           <li className="nav-item">
                              <a href="#all" data-toggle="tab" className="nav-link make-black">
                                 ALL <span className="badge badge-success">{buyer_order_list && buyer_order_list.orders.length}</span>
                              </a>
                            
                           </li>
                        </ul>
                     </div>
                     <div className="card-body">
                        <div className="tab-content">
                           <div className="tab-pane fade show active" id="active">
                              <div className="table-responsive box-table mt-3">
                                 <table className="table table-striped">
                                    <thead>
                                       <tr>
                                          <th>ORDER SUMMARY</th>
                                          <th>ORDER DATE</th>
                                          <th>DUE ON</th>
                                          <th>TOTAL</th>
                                          <th>STATUS</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {buyer_order_list && buyer_order_list.active_order.map((list, index) => (<tr key={list._id}>
                                          <td>
                                             <Link to={"/order/details/" + list._id} className="make-black order-proposal-link">
                                                {list.gig ? list.gig.title : ""}
                                             </Link>
                                          </td>
                                          <td>
                                            { moment(list.created_at).format('MMMM DD, YYYY') }
                                          </td>
                                          <td>{list.deliveryTime}</td>
                                          <td>&#036;{list.price}</td>
                                          <td><a className="btn btn-success">{list.status}</a></td>
                                       </tr>))}

                                    </tbody>
                                 </table>
                              </div>
                           </div>
                           <div className="tab-pane" id="delivered">
                              <div className="table-responsive box-table mt-3">
                                 <table className="table table-striped">
                                    <thead>
                                       <tr>
                                          <th>ORDER SUMMARY</th>
                                          <th>ORDER DATE</th>
                                          <th>DUE ON</th>
                                          <th>TOTAL</th>
                                          <th>STATUS</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                    {buyer_order_list && buyer_order_list.delivered_order.map((list, index) => (<tr key={list._id}>
                                          <td>
                                             <Link to={"/order/details/" + list._id} className="make-black order-proposal-link">
                                                {list.gig ? list.gig.title : ""}
                                             </Link>
                                          </td>
                                          <td>
                                             { moment(list.created_at).format('MMMM DD, YYYY') }
                                          </td>
                                          <td>{list.deliveryTime}</td>
                                          <td>&#036;{list.price}</td>
                                          <td><a className="btn btn-success">{list.status}</a></td>
                                       </tr>))}
                                    </tbody>
                                 </table>
                                 <center>
                                    <h3 className='pb-4 pt-4'><i className='fa fa-meh-o'></i>  No recent deliveries yet. </h3>
                                 </center>
                              </div>
                           </div>
                           <div className="tab-pane" id="completed">
                              <div className="table-responsive box-table mt-3">
                                 <table className="table table-striped">
                                    <thead>
                                       <tr>
                                          <th>ORDER SUMMARY</th>
                                          <th>ORDER DATE</th>
                                          <th>DUE ON</th>
                                          <th>TOTAL</th>
                                          <th>STATUS</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {buyer_order_list && buyer_order_list.completed_order.map((list, index) => (<tr key={list._id}>
                                          <td>
                                             <Link to={"/order/details/" + list._id} className="make-black order-proposal-link">
                                                {list.gig ? list.gig.title : ""}
                                             </Link>
                                          </td>
                                          <td>
                                             { moment(list.created_at).format('MMMM DD, YYYY') }
                                          </td>
                                          <td>{list.deliveryTime}</td>
                                          <td>&#036;{list.price}</td>
                                          <td><a className="btn btn-success">{list.status}</a></td>
                                       </tr>))}
                                    </tbody>
                                    
                                 </table>
                              </div>
                           </div>
                           <div className="tab-pane" id="cancelled">
                              <div className="table-responsive box-table mt-3">
                                 <table className="table table-striped">
                                    <thead>
                                       <tr>
                                          <th>ORDER SUMMARY</th>
                                          <th>ORDER DATE</th>
                                          <th>DUE ON</th>
                                          <th>TOTAL</th>
                                          <th>STATUS</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {buyer_order_list && buyer_order_list.cancelled_order.map((list, index) => (<tr key={list._id}>
                                          <td>
                                             <Link to={"/order/details/" + list._id} className="make-black order-proposal-link">
                                                {list.gig ? list.gig.title : ""}
                                             </Link>
                                          </td>
                                          <td>
                                             { moment(list.created_at).format('MMMM DD, YYYY') }
                                          </td>
                                          <td>{list.deliveryTime}</td>
                                          <td>&#036;{list.price}</td>
                                          <td><a className="btn btn-success">{list.status}</a></td>
                                       </tr>))}
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                           <div className="tab-pane" id="all">
                              <div className="table-responsive box-table mt-3">
                                 <table className="table table-striped">
                                    <thead>
                                       <tr>
                                          <th>ORDER SUMMARY</th>
                                          <th>ORDER DATE</th>
                                          <th>DUE ON</th>
                                          <th>TOTAL</th>
                                          <th>STATUS</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {buyer_order_list && buyer_order_list.orders.map((list, index) => (<tr key={list._id}>
                                          <td>
                                             <Link to={"/order/details/" + list._id} className="make-black order-proposal-link">
                                                {list.gig ? list.gig.title : ""}
                                             </Link>
                                          </td>
                                          <td>
                                            { moment(list.created_at).format('MMMM DD, YYYY') }
                                          </td>
                                          <td>{list.deliveryTime}</td>
                                          <td>&#036;{list.price}</td>
                                          <td><a className="btn btn-success">{list.status}</a></td>
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
         </div>
         <div id="featured-proposal-modal"></div>
      </Fragment>

   );
};

export default GigList;