import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
//import { useToasts } from 'react-toast-notifications'

import { getGigList, deleteGig, submitApproval, changeGigStatus } from "../../../../_actions/gigs.action";
import $ from 'jquery';

const GigList = (props) => {
   const dispatch = useDispatch();
   let history = useHistory();
   let [payment, setPayment] = useState(0);
   let settings = useSelector((state) => state.settings);

   let gig = settings.settings && settings.settings.gig;

   const auth = useSelector((state) => state.user);

   console.log('setting', auth);

   useEffect(() => {
      dispatch(getGigList())

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

      $('body').on('click', '.Change-gigstatus', function(){
            /*let id = $(this).data('id');
            let status = $(this).data('status');*/
            let data = {
               id: $(this).data('id'),
               status: $(this).data('status')
            }
            dispatch(changeGigStatus(data)).then(res => {
                console.log('id',res.responseData);
                window.location.reload();           
            })
      });

      $('body').on('click', '.feature', function(e){

         var that = $(this);
         e.preventDefault();
         const id = that.data('id');
         const status = that.data('status');
         $('.featured-listing-modal').modal("show");
         $(".feature-modal-btn")
            .off()
            .on("click", function () {
               let data = {
                  payment_option: $("input[name='payment_option']:checked").val(),
                  id: id,
                  status: status,
                  feature_price: $("input[name='feature_price']").val(),
                  feature_duration: $("input[name='feature_duration']").val(),
               }

               dispatch(changeGigStatus(data)).then(res => {
                  $('.featured-listing-modal').modal("hide");
                  window.location.reload();
               })

            });
      });

   }, []);

   const gig_list = useSelector((state) => state.gig && state.gig.gigs && state.gig.gigs.responseData);

   console.log('list', gig_list);

   const sendApproval = async (id) => {
        dispatch(submitApproval(id)).then(res => {
          console.log('id',res.responseData);
          window.location.reload();           
        })
   }



   return (

      <Fragment>

         <div className="container view-proposals proposals-container">

            <div className="row mt-5 mb-3">

               <div className="col-md-6">

                  <h1 className="pull-left">Gigs</h1>
               </div>
               <div className="col-md-6">
                  <Link className="btn btn-success pull-right" to="/gig/post"><i className="fa fa-plus-circle"></i> Add New Gig </Link>
               </div>
            </div>
            <div className="row">
               <div className="col-md-12">

                  <div className="clearfix"></div>
                  <ul className="nav nav-tabs flex-column flex-sm-row mt-4">
                     <li className="nav-item">
                        <a href="#active-proposals" data-toggle="tab" className="nav-link active make-black">
                           Active <span className="badge badge-success">{gig_list && gig_list.active.length}</span>
                        </a>
                     </li>
                     <li className="nav-item">
                        <a href="#pending-proposals" data-toggle="tab" className="nav-link make-black">
                           Pending Approval <span className="badge badge-success">{gig_list && gig_list.pending.length}</span>
                        </a>
                     </li>
                     <li className="nav-item">
                        <a href="#modification-proposals" data-toggle="tab" className="nav-link make-black">
                           Requires Mofification <span className="badge badge-success">{gig_list && gig_list.modification.length}</span>
                        </a>
                     </li>
                     <li className="nav-item">
                        <a href="#draft-proposals" data-toggle="tab" className="nav-link make-black">
                           Draft <span className="badge badge-success">{gig_list && gig_list.draft.length}</span>
                        </a>
                     </li>
                     <li className="nav-item">
                        <a href="#declined-proposals" data-toggle="tab" className="nav-link make-black">
                           Declined <span className="badge badge-success">{gig_list && gig_list.inactive.length}</span>
                        </a>
                     </li>
                     <li className="nav-item">
                        <a href="#pause-proposals" data-toggle="tab" className="nav-link make-black">
                           Paused <span className="badge badge-success">{gig_list && gig_list.paused.length}</span>
                        </a>
                     </li>
                  </ul>
                  <div className="tab-content">
                     <div id="active-proposals" className="tab-pane fade show active">
                        <div className="table-responsive box-table mt-4">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Gig</th>
                                    <th>Price</th>
                                    <th>Views</th>
                                    <th>Orders</th>
                                    <th>Actions</th>
                                 </tr>
                              </thead>
                              <tbody className="gig-table">
                                 {gig_list && gig_list.active.map((list, index) => (<tr key={list._id}>
                                 {console.log(list.pricing)}
                                    <td className="proposal-title"> {list.title} </td>
                                     <td className="text-success"> &#036;{list.pricing.length ? list.pricing[0].price : 0} </td> 
                                    <td>21</td>
                                    <td>22</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <Link data-id={list._id} to={list.user ? "/gig/" + list.user.firstName + "/" + list.title : ""} className="dropdown-item" target="_blank" > Preview </Link>

                                             {(list.featured == true) ? <Link className="dropdown-item Change-gigstatus text-success">Already Featured </Link> : <Link data-id={list._id} data-status="ADD_FEATURE" className="dropdown-item feature" id="featured-button">Make Proposal Featured</Link>}

                                             <Link data-id={list._id} data-status="Pause" className="dropdown-item Change-gigstatus"> Deactivate Proposal</Link>

                                             {/* <a href="" className="dropdown-item"> View Coupons</a> 
                                             <a href="" className="dropdown-item"> View Referrals</a> */}
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <Link data-id={list._id} className="dropdown-item delete"> Delete </Link>
                                          </div>
                                       </div>

                                    </td>
                                 </tr>))}

                              </tbody>
                           </table>
                           
                        </div>
                     </div>
                     <div id="pause-proposals" className="tab-pane fade show">
                        <div className="table-responsive box-table mt-4">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Proposal's Title</th>
                                    <th>Proposal's Price</th>
                                    <th>Views</th>
                                    <th>Orders</th>
                                    <th>Actions</th>
                                 </tr>
                              </thead>
                              <tbody>
                              {gig_list && gig_list.paused.map((list, index) => (<tr key={list._id}>
                                 {console.log(list.pricing)}
                                    <td className="proposal-title"> {list.title} </td>
                                     <td className="text-success"> &#036;{list.pricing.length ? list.pricing[0].price : 0} </td> 
                                    <td>21</td>
                                    <td>22</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <Link data-id={list._id} to={list.user ? "/gig/" + list.user.firstName + "/" + list.title : ""} className="dropdown-item" target="_blank" > Preview </Link>
                                             <Link data-id={list._id} data-status="Unpause" className="dropdown-item Change-gigstatus"> Activate</Link>
                                            {/* <a href="" className="dropdown-item"> View Referrals</a> */}
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <Link data-id={list._id} className="dropdown-item delete"> Delete </Link>
                                          </div>
                                       </div>

                                    </td>
                                 </tr>))}
                              </tbody>
                           </table>
                           
                        </div>
                     </div>
                     <div id="pending-proposals" className="tab-pane fade show">
                        <div className="table-responsive box-table mt-4">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Proposal's Title</th>
                                    <th>Proposal's Price</th>
                                    <th>Views</th>
                                    <th>Orders</th>
                                    <th>Actions</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {gig_list && gig_list.pending.map((list, index) => (<tr key={list._id}>
                                 {console.log(list.pricing)}
                                    <td className="proposal-title"> {list.title} </td>
                                     <td className="text-success"> &#036;{list.pricing.length ? list.pricing[0].price : 0} </td> 
                                    <td>21</td>
                                    <td>22</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <Link data-id={list._id} to={list.user ? "/gig/" + list.user.firstName + "/" + list.title : ""} className="dropdown-item" target="_blank" > Preview </Link>
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <Link data-id={list._id} className="dropdown-item delete"> Delete </Link>
                                          </div>
                                       </div>

                                    </td>
                                 </tr>))}
                                
                              </tbody>
                           </table>
                          
                        </div>
                     </div>
                     <div id="modification-proposals" className="tab-pane fade show">
                        <div className="table-responsive box-table mt-4">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Modification Proposal Title</th>
                                    <th>Modification Message</th>
                                    <th>Actions</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {gig_list && gig_list.modification.map((list, index) => (<tr key={list._id}>
                                 {console.log(list.pricing)}
                                    <td className="proposal-title"> {list.title} </td>
                                     <td className="text-success"> {list.modify_description ? list.modify_description : ""} </td> 
                                    
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <Link onClick={() =>  sendApproval(list._id)} className="dropdown-item"> Submit For Approval </Link>
                                             <Link data-id={list._id} to={list.user ? "/gig/" + list.user.firstName + "/" + list.title : ""} className="dropdown-item" target="_blank" > Preview </Link>
                                             <a className="dropdown-item"> Edit </a>
                                             <Link data-id={list._id} className="dropdown-item delete"> Delete </Link>
                                          </div>
                                       </div>

                                    </td>
                                 </tr>))}
                                 
                              </tbody>
                           </table>
                         
                        </div>
                     </div>
                     <div id="draft-proposals" className="tab-pane fade show">
                        <div className="table-responsive box-table mt-4">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Proposal's Title</th>
                                    <th>Proposal's Price</th>
                                    <th>Views</th>
                                    <th>Orders</th>
                                    <th>Actions</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {gig_list && gig_list.draft.map((list, index) => (<tr key={list._id}>
                                 {console.log(list.pricing)}
                                    <td className="proposal-title"> {list.title} </td>
                                     <td className="text-success"> &#036;{list.pricing.length ? list.pricing[0].price : 0} </td> 
                                    <td>21</td>
                                    <td>22</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <button data-id={list._id} className="dropdown-item delete"> Delete </button>
                                          </div>
                                       </div>

                                    </td>
                                 </tr>))}
                                 
                              </tbody>
                           </table>
                         
                        </div>
                     </div>
                     <div id="declined-proposals" className="tab-pane fade show">
                        <div className="table-responsive box-table mt-4">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Proposal's Title</th>
                                    <th>Proposal's Price</th>
                                    <th>Views</th>
                                    <th>Orders</th>
                                    <th>Actions</th>
                                 </tr>
                              </thead>
                              <tbody>
                              {gig_list && gig_list.inactive.map((list, index) => (<tr key={list._id}>
                                 {console.log(list.pricing)}
                                    <td className="proposal-title"> {list.title} </td>
                                    <td className="text-success"> &#036;{list.pricing.length ? list.pricing[0].price : 0} </td> 
                                    <td>21</td>
                                    <td>22</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             
                                             <Link data-id={list._id} className="dropdown-item delete"> Delete </Link>
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
         


   <div className="modal featured-listing-modal" tabIndex="-1" role="basic" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title"> Make Your Proposal/Service Featured</h5>
                     <button className="close" data-dismiss="modal"><span>×</span></button>
                  </div>
                  <div className="modal-body p-0">
                     <div className="order-details">
                        <div className="request-div">
                           <h4 className="mb-3">
                           <b>FEATURE LISTING FEE &amp; INFO:</b> <span className="price float-right d-none d-sm-block mb-3 font-weight-bold">${gig && gig.featuredGigPrice}</span>
                           </h4>
                           <p>You are about to pay a feature listing fee for your proposal/service. This will make this proposal/service feature on our "Featured proposal/service" spots. The fee is $25.00 and the duration is {gig && gig.featuredGigDuration} Days. Please use any of the following payment methods below to complete payment.</p>
                           <h4><b>SUMMARY:</b></h4>
                           <p><b>Proposal Title:</b> i will design a perfect logo for your company</p>
                           <p><b>Feature Listing Fee:</b> ${gig && gig.featuredGigPrice}</p>
                           <p className="processing-fee" style={{display: "none"}}><b>Processing Fee:</b> $1.25</p>
                           <p><b>Listing Duration:</b> {gig && gig.featuredGigDuration} Days.</p>
                        </div>
                     </div>
                </div>
            <div className="payment-options-list">
               <div className="payment-options mb-2">
                  <input type="radio" name="payment_option" value="wallet" id="shopping-balance" className="radio-custom"  />
                  <input type="hidden" name="feature_price" value={gig && gig.featuredGigPrice}   />
                  <input type="hidden" name="feature_duration" value={gig && gig.featuredGigDuration}   />
                  <label for="shopping-balance" className="radio-custom-label"></label>
                  <span className="lead font-weight-bold"> Shopping Balance </span>
                  <p className="lead ml-5">
                  Personal Balance - {auth.user.firstName} <span className="text-success font-weight-bold"> ${auth.user.wallet} </span>
                  </p>
               </div>
            </div>
         <div className="modal-footer">
            <button className="btn btn-secondary" data-dismiss="modal"> Close </button>
            <button className="btn btn-success feature-modal-btn" type="button" name="pay_featured_proposal_listing">Pay With Shopping Balance</button>
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
};

export default GigList;