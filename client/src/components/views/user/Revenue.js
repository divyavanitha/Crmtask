import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"



import OwlCarousel from 'react-owl-carousel';



function Dashboard() {



   return (

      <Fragment>

        <div className="dashboardContainer proposals-container no-bg">
<div className="container mt-5 mb-3">
   <div className="row">
      <div className="col-md-12">
         <h2 className="pull-left">Revenue Earned</h2>
         <p className="lead pull-right">
            Available For Withdrawal: <span className="font-weight-bold text-success"> &#036;1,124.00 </span>
         </p>
      </div>
      <div className="col-md-12">
         
         
         <div className="revenueDetailList">
         <div className="card">
            <div className="card-body">
               <div className="revenueStatement mb-3">
                  <div className="card">
                     <div className="card-body">
                        <div className="row">
                           <div className="col-md-3">
                              <div className="rs-detail">
                                 <p> Withdrawals </p>
                                 <h2> &#036;18,280.00</h2>
                              </div>
                           </div>
                           <div className="col-md-3">
                              <div className="rs-detail">
                                 <p> Used To Order Proposals/Services </p>
                                 <h2> &#036;-969.00</h2>
                              </div>
                           </div>
                           <div className="col-md-3">
                              <div className="rs-detail">
                                 <p> Pending Clearance </p>
                                 <h2> &#036;1.00</h2>
                              </div>
                           </div>
                           <div className="col-md-3">
                              <div className="rs-detail">
                                 <p> Available Income </p>
                                 <h2> &#036;1,124.00</h2>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="withdrawBox mb-3">
                  <label className="lead"> Withdraw To: </label>
                  <button className="btn btn-success ml-2" data-toggle="modal" data-target="#paypal_withdraw_modal">
                  <i className="fa fa-paypal"></i> Paypal Account
                  </button>
                  <button className="btn btn-success ml-2" data-toggle="modal" data-target="#bank_account_modal">
                  <i className="fa fa-university"></i> Bank Account
                  </button>
                  <button className="btn btn-success ml-2" data-toggle="modal" data-target="#trx_wallet_modal">
                  <i className="fa fa-bitcoin"></i> Bitcoin Wallet 
                  </button>
               </div>
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
                           <td>November 08, 2020</td>
                           <td> 
                              Order Revenue (<a href="order_details?order_id=1461" target="blank" className="text-success"> View Order </a>)
                           </td>
                           <td className="text-success"> +&#036;85.00 </td>
                        </tr>
                        <tr>
                           <td>October 28, 2020</td>
                           <td> 
                              Order Revenue (<a href="order_details?order_id=1459" target="blank" className="text-success"> View Order </a>)
                           </td>
                           <td className="text-success"> +&#036;4.25 </td>
                        </tr>
                        <tr>
                           <td>October 04, 2020</td>
                           <td> 
                              Order Revenue (<a href="order_details?order_id=1418" target="blank" className="text-success"> View Order </a>)
                           </td>
                           <td className="text-success"> +&#036;4,709.85 </td>
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

<div id="paypal_withdraw_modal" className="modal fade">
   <div className="modal-dialog">
      <div className="modal-content">
         <div className="modal-header">
            <h5 className="modal-title"> Withdraw/Transfer Funds To PayPal </h5>
            <button className="close" data-dismiss="modal"><span> &times; </span></button>
         </div>
         <div className="modal-body">
            <center>
               <p className="lead">
                  Your revenue funds will be transferred to: 
                  <br /> <strong> demo123@gmail.com </strong>
               </p>
               <form action="withdraw_manual" method="post">
                  <input type="hidden" name="method" value="paypal" />
                  <div className="form-group row">
                     <label className="col-md-3 col-form-label font-weight-bold">Amount</label>
                     <div className="col-md-8">
                        <div className="input-group">
                           <span className="input-group-addon font-weight-bold"> $ </span>
                           <input type="number" name="amount" className="form-control input-lg" min="10" max="1124" placeholder="10 Minimum" required />
                        </div>
                     </div>
                  </div>
                  <div className="form-group row">
                     <div className="col-md-8 offset-md-3">
                        <input type="submit" name="withdraw" value="Transfer" className="btn btn-success form-control" />
                     </div>
                  </div>
               </form>
            </center>
         </div>
         <div className="modal-footer">
            <button className="btn btn-secondary" data-dismiss="modal">Close</button>
         </div>
      </div>
   </div>
</div>
<div id="payoneer_withdraw_modal" className="modal fade">
   <div className="modal-dialog">
      <div className="modal-content">
         <div className="modal-header">
            <h5 className="modal-title"> Withdraw/Transfer Funds To Payoneer </h5>
            <button className="close" data-dismiss="modal"><span>&times;</span></button>
         </div>
         <div className="modal-body">
            <center>
               <p className="lead">
                  In order to transfer funds to your Payoneer account, you will need to add your payoneer email in your
                  <a href="" className="text-success">account settings</a> tab.
               </p>
            </center>
         </div>
         <div className="modal-footer">
            <button className="btn btn-secondary" data-dismiss="modal">Close</button>
         </div>
      </div>
   </div>
</div>
<div id="bank_account_modal" className="modal fade">
   <div className="modal-dialog">
      <div className="modal-content">
         <div className="modal-header">
            <h5 className="modal-title"> Withdraw/Transfer Funds To Bank Account </h5>
            <button className="close" data-dismiss="modal"><span> &times; </span></button>
         </div>
         <div className="modal-body">
            <center>
               <p className="lead">
                  Your revenue funds will be transferred to: 
                  <br /> Bank Name : <strong>BCA</strong>
                  <br /> Account No : <strong>60</strong>
               </p>
               <form action="withdraw_manual" method="post">
                  <input type="hidden" name="method" value="bank_transfer" />
                  <div className="form-group row">
                     <label className="col-md-3 col-form-label font-weight-bold">Amount</label>
                     <div className="col-md-8">
                        <div className="input-group">
                           <span className="input-group-addon font-weight-bold"> $ </span>/
                           <input type="number" name="amount" className="form-control input-lg" min="10" max="1124"placeholder="10 Minimum" required />
                        </div>
                     </div>
                  </div>
                  <div className="form-group row">
                     <div className="col-md-8 offset-md-3">
                        <input type="submit" name="withdraw" value="Transfer" className="btn btn-success form-control" />
                     </div>
                  </div>
               </form>
            </center>
         </div>
         <div className="modal-footer">
            <button className="btn btn-secondary" data-dismiss="modal">Close</button>
         </div>
      </div>
   </div>
</div>
<div id="moneygram_modal" className="modal fade">
   <div className="modal-dialog">
      <div className="modal-content">
         <div className="modal-header">
            <h5 className="modal-title"> Withdraw/Transfer Funds To Moneygram </h5>
            <button className="close" data-dismiss="modal"><span> &times; </span></button>
         </div>
         <div className="modal-body">
            <center>
               <p className="lead mb-2">Your revenue funds will be transferred to:</p>
               <p className="mt-0 ">
                  Full Name : <strong>Tyrone</strong>
                  <br /> Address/Location : <strong>newyork</strong>
                  <br /> Mobile No : <strong>186363737</strong>
                  <br /> Currency : <strong>USD</strong>
               </p>
               <form action="withdraw_manual" method="post">
                  <input type="hidden" name="method" value="moneygram" />
                  <div className="form-group row">
                     <label className="col-md-3 col-form-label font-weight-bold">Amount</label>
                     <div className="col-md-8">
                        <div className="input-group">
                           <span className="input-group-addon font-weight-bold"> $ </span>
                           <input type="number" name="amount" className="form-control input-lg" min="10" max="1124"placeholder="10 Minimum" required />
                        </div>
                     </div>
                  </div>
                  <div className="form-group row">
                     <div className="col-md-8 offset-md-3">
                        <input type="submit" name="withdraw" value="Transfer" className="btn btn-success form-control" />
                     </div>
                  </div>
               </form>
            </center>
         </div>
         <div className="modal-footer">
            <button className="btn btn-secondary" data-dismiss="modal">Close</button>
         </div>
      </div>
   </div>
</div>
<div id="mobile_money_modal" className="modal fade">
   <div className="modal-dialog">
      <div className="modal-content">
         <div className="modal-header">
            <h5 className="modal-title"> Withdraw To Mobile Money Account </h5>
            <button type="button" className="close" data-dismiss="modal">
            <span>&times;</span>
            </button>
         </div>
         <div className="modal-body text-center">
            <p className="modal-lead">
               For Withdraw Payments To Your Mobile Money Account Please Add Your Mobile Money Account Details In <a href="#" id="settings-link">Settings Tab</a>
            </p>
         </div>
      </div>
   </div>
</div>
<div id="trx_wallet_modal" className="modal fade">
   <div className="modal-dialog">
      <div className="modal-content">
         <div className="modal-header">
            <h5 className="modal-title"> Withdraw/Transfer Funds To Bitcoin Wallet </h5>
            <button className="close" data-dismiss="modal"><span>&times;</span></button>
         </div>
         <div className="modal-body">
            <center>
               <p className="lead">
                  Your revenue funds will be transferred to:
                  <br /> <strong> 1HJeW2NrDBmqQRX9pBSFiMq6Y6yuZJpCUR </strong>
               </p>
               <form action="withdraw_manual" method="post">
                  <input type="hidden" name="method" value="bitcoin wallet" />
                  <div className="form-group row">
                     <label className="col-md-3 col-form-label font-weight-bold">Amount</label>
                     <div className="col-md-8">
                        <div className="input-group">
                           <span className="input-group-addon font-weight-bold"> $ </span>
                           <input type="number" name="amount" className="form-control input-lg" min="10" max="1124" placeholder="10 Minimum" required />
                        </div>
                     </div>
                  </div>
                  <div className="form-group row">
                     <div className="col-md-8 offset-md-3">
                        <input type="submit" name="withdraw" value="Transfer" className="btn btn-success form-control" />
                     </div>
                  </div>
               </form>
            </center>
         </div>
         <div className="modal-footer">
            <button className="btn btn-secondary" data-dismiss="modal">Close</button>
         </div>
      </div>
   </div>
</div>

</div>



      </Fragment>
   );
}

export default Dashboard;