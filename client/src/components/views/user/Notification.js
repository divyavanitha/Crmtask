import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getMenu } from "../../../_actions/user.action";
import moment from 'moment';
import Gig from "./gigs/Gig";
import $ from 'jquery';

import { getNotification, deleteNotification } from "../../../_actions/user.action";


import OwlCarousel from 'react-owl-carousel';



function Notification() {

   const dispatch = useDispatch();


   const user = useSelector((state) => state.user && state.user.find_user && state.user.find_user.responseData && state.user.find_user.responseData.user);
   const order_count = useSelector((state) => state.user && state.user.seller_order_list);
   const seller_buyer = useSelector((state) => state.user && state.user.seller_buyer);

   useEffect(() => {
      dispatch(getNotification())

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
               dispatch(deleteNotification(sid)).then(res => {
                  //addToast(res.message, { appearance: res.status, autoDismiss: true, })
                  that.closest('tr').remove();
                  $('.delete-modal').modal("hide");
                  //window.location.reload();

               })

            });
      });

   }, []);

const notification = useSelector((state) => state.user && state.user.notification && state.user.notification.responseData && state.user.notification.responseData.notification);

console.log('notification',notification);
   return (

      <Fragment>

         <div className="container">
            <div className="row">
               <div className="col-md-12 mt-5">
                  <h2> Notifications </h2>
                  <div className="table-responsive box-table mt-5">
                     <h2 className="mt-3 mb-3 ml-3"> All Notifications </h2>
                     <table className="table table-bordered inbox-conversations">
                        <thead>
                           <tr>
                              <th>Sender</th>
                              <th>Message</th>
                              <th>Date</th>
                              <th>Delete</th>
                           </tr>
                        </thead>
                        <tbody>
                           {notification && notification.map((list, index) => (<tr className="">
                              <td className="inbox-seller">
                                 <img src={list.sender ? list.sender.profilePhoto : window.location.href+"public/images/images_1608630531.png"} className="rounded-circle" />
                                 <h6 className="mb-4">
                                 <Link target="_blank" to={list.type == "ORDER" ? "/order/details/"+list.orderId : (list.type == "GIG" ? "/gigs" : "/buyer/requests")}>{list.sender ? list.sender.firstName : "Admin"}</Link>
                                 </h6>
                              </td>
                              <td width="400">
                                 <Link target="_blank" to={list.type == "ORDER" ? "/order/details/"+list.orderId : (list.type == "GIG" ? "/gigs" : "/buyer/requests")}>
                                    {list.message}             
                                 </Link>
                              </td>
                              <td> {moment(list.created_at).format('MMMM DD, YYYY')} </td>
                              <td>
                                 <Link data-id={list._id} className="text-white btn btn-danger delete">
                                 <i className="fa fa-trash-o delete"></i>
                                 </Link>
                              </td>
                           </tr>))}
                     
                        </tbody>
                     </table>
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

export default Notification;