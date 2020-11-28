import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
//import { useToasts } from 'react-toast-notifications'

import { getGigList, deleteGig } from "../../../../_actions/gigs.action";
import { sellerOrderList } from "../../../../_actions/user.action";

import $ from 'jquery';

const GigList = (props) => {
   const dispatch = useDispatch();
   let history = useHistory();

    useEffect(() => {
         dispatch(sellerOrderList())

         $('body').on('click', '.delete', function (e) {
          //alert();
          var that = $(this);
          e.preventDefault();
          const sid = that.data('id');
          console.log('id',sid);
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

    const seller_order_list = useSelector((state) => state.user && state.user.seller_order_list && state.user.seller_order_list.orders);

    console.log('list', seller_order_list);
   return (


      <Fragment>

         <div className="container view-proposals proposals-container">
   <div className="row mt-5 mb-3">
      <div className="col-md-12">
         <h1 className="">Manage Proposal/Service Orders</h1>
      </div>
   </div>
   <div className="row mb-5">
      <div className="col-md-12">
         <div className="card">
            <div className="card-header">
               <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                     <a href="#active" data-toggle="tab" className="nav-link make-black active ">
                     ACTIVE <span className="badge badge-success">{seller_order_list && seller_order_list.length}</span>
                     </a>
                  </li>
                  <li className="nav-item">
                     <a href="#delivered" data-toggle="tab" className="nav-link make-black">
                     DELIVERED <span className="badge badge-success">0</span>
                     </a>
                  </li>
                  <li className="nav-item">
                     <a href="#completed" data-toggle="tab" className="nav-link make-black">
                     COMPLETED <span className="badge badge-success">19</span>
                     </a>
                  </li>
                  <li className="nav-item">
                     <a href="#cancelled" data-toggle="tab" className="nav-link make-black">
                     CANCELLED <span className="badge badge-success">21</span>
                     </a>
                  </li>
                  <li className="nav-item">
                     <a href="#all" data-toggle="tab" className="nav-link make-black">
                     ALL <span className="badge badge-success">{seller_order_list && seller_order_list.length}</span>
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
                              {seller_order_list && seller_order_list.map((list, index) => (<tr key={list._id}>
                                 <td>
                                    <Link to={"/seller-order/details/"+list._id} className="make-black order-proposal-link">
                                       {list.gig.title}
                                    </Link>
                                 </td>
                                 <td>
                                 {list.created_at}
                                 </td>
                                 <td>{list.updated_at}</td>
                                 <td>&#036;{list.price}</td>
                                 <td><a className="btn btn-success">Progress</a></td>
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
                              <tr>
                                 <td>
                                    <a href="order-details.php" className="make-black order-proposal-link">
                                       <p className="order-proposal-title">i will design a perfect logo for your company</p>
                                    </a>
                                 </td>
                                 <td>November 26, 2020</td>
                                 <td>November 28, 2020</td>
                                 <td>&#036;5.00</td>
                                 <td><button className="btn btn-success">Progress</button></td>
                              </tr>
                              <tr>
                                 <td>
                                    <a href="order-details.php" className="make-black order-proposal-link">
                                       <p className="order-proposal-title">I will do a video session and prepare you for any job interview</p>
                                    </a>
                                 </td>
                                 <td>November 19, 2020</td>
                                 <td>November 20, 2020</td>
                                 <td>&#036;5.00</td>
                                 <td><button className="btn btn-success">Progress</button></td>
                              </tr>
                              <tr>
                                 <td>
                                    <a href="order-details.php" className="make-black order-proposal-link">
                                       <p className="order-proposal-title">i will design a perfect logo for your company</p>
                                    </a>
                                 </td>
                                 <td>November 26, 2020</td>
                                 <td>November 28, 2020</td>
                                 <td>&#036;5.00</td>
                                 <td><button className="btn btn-success">Progress</button></td>
                              </tr>
                              <tr>
                                 <td>
                                    <a href="order-details.php" className="make-black order-proposal-link">
                                       <p className="order-proposal-title">I will do a video session and prepare you for any job interview</p>
                                    </a>
                                 </td>
                                 <td>November 19, 2020</td>
                                 <td>November 20, 2020</td>
                                 <td>&#036;5.00</td>
                                 <td><button className="btn btn-success">Progress</button></td>
                              </tr>
                              <tr>
                                 <td>
                                    <a href="order-details.php" className="make-black order-proposal-link">
                                       <p className="order-proposal-title">i will design a perfect logo for your company</p>
                                    </a>
                                 </td>
                                 <td>November 26, 2020</td>
                                 <td>November 28, 2020</td>
                                 <td>&#036;5.00</td>
                                 <td><button className="btn btn-success">Progress</button></td>
                              </tr>
                              <tr>
                                 <td>
                                    <a href="order-details.php" className="make-black order-proposal-link">
                                       <p className="order-proposal-title">I will do a video session and prepare you for any job interview</p>
                                    </a>
                                 </td>
                                 <td>November 19, 2020</td>
                                 <td>November 20, 2020</td>
                                 <td>&#036;5.00</td>
                                 <td><button className="btn btn-success">Progress</button></td>
                              </tr>
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
                              <tr>
                                 <td>
                                    <a href="">
                                       <p className="order-proposal-title">I will do a video session and prepare you for any job interview</p>
                                    </a>
                                 </td>
                                 <td>November 17, 2020</td>
                                 <td>November 21, 2020</td>
                                 <td>&#036;10.00</td>
                                 <td><button className="btn btn-success">Cancelled</button></td>
                              </tr>
                              <tr>
                                 <td>
                                    <a href="">
                                       <p className="order-proposal-title">pro00001</p>
                                    </a>
                                 </td>
                                 <td>October 03, 2020</td>
                                 <td>October 04, 2020</td>
                                 <td>&#036;50.00</td>
                                 <td><button className="btn btn-success">Cancelled</button></td>
                              </tr>
                              <tr>
                                 <td>
                                    <a href="order_details?order_id=1245">
                                       <p className="order-proposal-title">I will do a video session and prepare you for any job interview</p>
                                    </a>
                                 </td>
                                 <td>August 08, 2020</td>
                                 <td>August 12, 2020</td>
                                 <td>&#036;10.00</td>
                                 <td><button className="btn btn-success">Cancelled</button></td>
                              </tr>
                              <tr>
                                 <td>
                                    <a href="">
                                       <p className="order-proposal-title">pro00001</p>
                                    </a>
                                 </td>
                                 <td>October 03, 2020</td>
                                 <td>October 04, 2020</td>
                                 <td>&#036;50.00</td>
                                 <td><button className="btn btn-success">Cancelled</button></td>
                              </tr>
                              <tr>
                                 <td>
                                    <a href="order_details?order_id=1245">
                                       <p className="order-proposal-title">I will do a video session and prepare you for any job interview</p>
                                    </a>
                                 </td>
                                 <td>August 08, 2020</td>
                                 <td>August 12, 2020</td>
                                 <td>&#036;10.00</td>
                                 <td><button className="btn btn-success">Cancelled</button></td>
                              </tr>
                              <tr>
                                 <td>
                                    <a href="">
                                       <p className="order-proposal-title">pro001234</p>
                                    </a>
                                 </td>
                                 <td>October 03, 2020</td>
                                 <td>October 04, 2020</td>
                                 <td>&#036;50.00</td>
                                 <td><button className="btn btn-success">Cancelled</button></td>
                              </tr>
                              <tr>
                                 <td>
                                    <a href="order_details?order_id=1245">
                                       <p className="order-proposal-title">I will do a video session and prepare you for any job interview</p>
                                    </a>
                                 </td>
                                 <td>August 08, 2020</td>
                                 <td>August 12, 2020</td>
                                 <td>&#036;10.00</td>
                                 <td><button className="btn btn-success">Cancelled</button></td>
                              </tr>
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
                              <tr>
                                 <td>
                                    <a href="order-details.php" className="make-black order-proposal-link">
                                       <p className="order-proposal-title">i will design a perfect logo for your company</p>
                                    </a>
                                 </td>
                                 <td>November 26, 2020</td>
                                 <td>November 28, 2020</td>
                                 <td>&#036;5.00</td>
                                 <td><button className="btn btn-success">Progress</button></td>
                              </tr>
                              <tr>
                                 <td>
                                    <a href="order-details.php" className="make-black order-proposal-link">
                                       <p className="order-proposal-title">I will do a video session and prepare you for any job interview</p>
                                    </a>
                                 </td>
                                 <td>November 19, 2020</td>
                                 <td>November 20, 2020</td>
                                 <td>&#036;5.00</td>
                                 <td><button className="btn btn-success">Progress</button></td>
                              </tr>
                              <tr>
                                 <td>
                                    <a href="order-details.php" className="make-black order-proposal-link">
                                       <p className="order-proposal-title">i will design a perfect logo for your company</p>
                                    </a>
                                 </td>
                                 <td>November 26, 2020</td>
                                 <td>November 28, 2020</td>
                                 <td>&#036;5.00</td>
                                 <td><button className="btn btn-success">Progress</button></td>
                              </tr>
                              <tr>
                                 <td>
                                    <a href="order-details.php" className="make-black order-proposal-link">
                                       <p className="order-proposal-title">I will do a video session and prepare you for any job interview</p>
                                    </a>
                                 </td>
                                 <td>November 19, 2020</td>
                                 <td>November 20, 2020</td>
                                 <td>&#036;5.00</td>
                                 <td><button className="btn btn-success">Progress</button></td>
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
<div id="featured-proposal-modal"></div>
      </Fragment>

   );
};

export default GigList;