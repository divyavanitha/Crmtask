import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
//import { useToasts } from 'react-toast-notifications'
import $ from 'jquery';

import { getRequestList } from "../../../../_actions/request.action";

const RequestList = (props) => {

   const dispatch = useDispatch();
   let history = useHistory();
   useEffect(() => {
      dispatch(getRequestList())

      /*$('body').on('click', '.delete', function (e) {
        
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
                 
                  that.closest('tr').remove();
                  $('.delete-modal').modal("hide");

               })

            });
      });*/

      /*$('body').on('click', '.Change-gigstatus', function(){
            
            let data = {
               id: $(this).data('id'),
               status: $(this).data('status')
            }
            dispatch(changeGigStatus(data)).then(res => {
                console.log('id',res.responseData);
                window.location.reload();           
            })
      });*/

   

      

   }, []);
   const request_list = useSelector((state) => state.request && state.request.requests && state.request.requests.responseData);

   console.log('list', request_list);

   return (


      <Fragment>

         <div className="container view-proposals proposals-container">

            <div className="row mt-5 mb-3">

               <div className="col-md-6">

                  <h1 className="pull-left">Manage Requests</h1>
               </div>
               <div className="col-md-6">
                  <Link className="btn btn-success pull-right" to="/request/add"><i className="fa fa-plus-circle"></i> Add New Request </Link>
               </div>
            </div>
            <div className="row">
               <div className="col-md-12">

                  <div className="clearfix"></div>
                  <ul className="nav nav-tabs flex-column flex-sm-row mt-4">
                     <li className="nav-item">
                        <a href="#active-requests" data-status="APPROVE" data-toggle="tab" className="nav-link active request make-black">
                           Active Requests <span className="badge badge-success">{request_list && request_list.active.length}</span>
                        </a>
                     </li>
                     <li className="nav-item">
                        <a href="#pause-requests" data-toggle="tab" className="nav-link make-black">
                           Paused Requests <span className="badge badge-success">{request_list && request_list.paused.length}</span>
                        </a>
                     </li>
                     <li className="nav-item">
                        <a href="#pending-requests" data-toggle="tab" className="nav-link make-black">
                           Pending Requests <span className="badge badge-success">{request_list && request_list.pending.length}</span>
                        </a>
                     </li>
                     <li className="nav-item">
                        <a href="#unapproved" data-toggle="tab" className="nav-link make-black">
                           Unapproved <span className="badge badge-success">{request_list && request_list.decline.length}</span>
                        </a>
                     </li>
                     
                  </ul>
                  <div className="tab-content">
                     <div id="active-requests" className="tab-pane fade show active">
                        <div className="table-responsive box-table mt-4">
                           <table className="table request-table table-striped">
                              <thead>
                                 <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>offers</th>
                                    <th>Budget</th>
                                    <th>Action</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {request_list && request_list.active.map((list, index) => (<tr key={list._id}>
                                    <td className="proposal-title"> {list.title} </td>
                                    <td> {list.description} </td>
                                    <td>{list.created_at}</td>
                                    <td>22</td>
                                    <td className="text-success"> &#036;{list.budget} </td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> View Offers </a>
                                             <a href="#" className="dropdown-item">Pause</a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>

                                    </td>
                                 </tr>))}
                                 
                              </tbody>
                           </table>
                        </div>
                     </div>
                     <div id="pause-requests" className="tab-pane fade show">
                        <div className="table-responsive box-table mt-4">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>offers</th>
                                    <th>Budget</th>
                                    <th>Action</th>
                                 </tr>
                              </thead>
                              <tbody>
                               {request_list && request_list.paused.map((list, index) => (<tr key={list._id}>
                                    <td className="proposal-title"> {list.title} </td>
                                    <td> {list.description} </td>
                                    <td>{list.created_at}</td>
                                    <td>22</td>
                                    <td className="text-success"> &#036;{list.budget} </td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> View Offers </a>
                                             <a href="#" className="dropdown-item">Pause</a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>

                                    </td>
                                 </tr>))}
                              </tbody>
                           </table>
                           
                        </div>
                     </div>
                     <div id="pending-requests" className="tab-pane fade show">
                        <div className="table-responsive box-table mt-4">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>offers</th>
                                    <th>Budget</th>
                                    <th>Action</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {request_list && request_list.pending.map((list, index) => (<tr key={list._id}>
                                    <td className="proposal-title"> {list.title} </td>
                                    <td> {list.description} </td>
                                    <td>{list.created_at}</td>
                                    <td>22</td>
                                    <td className="text-success"> &#036;{list.budget} </td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> View Offers </a>
                                             <a href="#" className="dropdown-item">Pause</a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>

                                    </td>
                                 </tr>))}
                                 
                              </tbody>
                           </table>
                        </div>
                     </div>
                     <div id="unapproved" className="tab-pane fade show">
                        <div className="table-responsive box-table mt-4">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>offers</th>
                                    <th>Budget</th>
                                    <th>Action</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {request_list && request_list.decline.map((list, index) => (<tr key={list._id}>
                                    <td className="proposal-title"> {list.title} </td>
                                    <td> {list.description} </td>
                                    <td>{list.created_at}</td>
                                    <td>22</td>
                                    <td className="text-success"> &#036;{list.budget} </td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> View Offers </a>
                                             <a href="#" className="dropdown-item">Pause</a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>

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
         <div id="featured-proposal-modal"></div>


      </Fragment>

   );
};

export default RequestList;