import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import { getMenu, getRevenues, withdraw } from "../../../_actions/user.action";
import Gig from "./gigs/Gig";
import $ from 'jquery';



import OwlCarousel from 'react-owl-carousel';



function Revenue() {

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.user);
    const [gigAmount, setGigAmount] = useState(0);
    const [pendingAmount, setPendingAmount] = useState(0);
    const [withdrawalAmount, setWithdrawalAmount] = useState(0);
    const [price, setPrice] = useState("");
    const [revenues, setRevenues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let settings = useSelector((state) => state.settings);

    let gigSetting = settings.settings && settings.settings.gig;

    useEffect(() => {
      setIsLoading(true);
      dispatch(getRevenues()).then((response) => {
         setGigAmount(response.gigAmount);
         setPendingAmount(response.pendingAmount);
         setWithdrawalAmount(response.withdrawalAmount);
         setRevenues(response.revenues);
         setIsLoading(false)
      })
    }, []);

    const handleChange = ({currentTarget: input}) => {
      if(input.value) setPrice(input.value)
    }

    const transfer = (paymentMode) => {
      let data = {
         price: price,
         payment_mode: paymentMode
      }

      if(price && price != 0 && price >= (gigSetting && gigSetting.minimumWithdrawalLimit)) {
         setIsLoading(true);
         dispatch(withdraw(data)).then((response) => {
            $('#stripe_Modal').modal('hide');
            setIsLoading(false)
            setPrice("");
         })
      }
    }


   return (

      <Fragment>

      {isLoading && <div style={{position: 'fixed', opacity: 0.7, top: 0, width: '100%', height: '100%', background: '#000', zIndex: 99 }} >
                    <Loader style={{position: 'absolute', zIndex: 99, top: '30%', left: '45%' }} visible={isLoading} type="Rings" color="#00BFFF" height={100} width={100} />
                    </div>}

        <div className="dashboardContainer proposals-container no-bg">
<div className="container mt-5 mb-3">
   <div className="row">
      <div className="col-md-12">
         <h2 className="pull-left">Revenue Earned</h2>
         <p className="lead pull-right">
            Available For Withdrawal: <span className="font-weight-bold text-success"> &#036;{auth.user && auth.user.wallet}</span>
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
                                 <h2> &#036;{withdrawalAmount}</h2>
                              </div>
                           </div>
                           <div className="col-md-3">
                              <div className="rs-detail">
                                 <p> Used To Order Gigs </p>
                                 <h2> &#036;-{gigAmount}</h2>
                              </div>
                           </div>
                           <div className="col-md-3">
                              <div className="rs-detail">
                                 <p> Pending Clearance </p>
                                 <h2> &#036;{pendingAmount}</h2>
                              </div>
                           </div>
                           <div className="col-md-3">
                              <div className="rs-detail">
                                 <p> Available Income </p>
                                 <h2> &#036;{auth.user && auth.user.wallet}</h2>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="withdrawBox mb-3">
                  <label className="lead"> Withdraw To: </label>
                  <button className="btn btn-success ml-2" data-toggle="modal" data-target="#stripe_Modal">
                  <i className="fa fa-credit-card"></i> Card
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
                     {revenues && revenues.map((revenue, index) => (
                        <tr key={index}>
                           <td>{ moment(revenue.completed_at).format('MMMM DD, YYYY') }</td>
                           <td> 
                              Order Revenue (<Link to={"/order/details/"+revenue._id} className="text-success"> View Order </Link>)
                           </td>
                           <td className="text-success"> +&#036;{revenue.total-revenue.commission} </td>
                        </tr>
                     ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         </div>
         
      </div>
   </div>
</div>

<div id="stripe_Modal" className="modal fade">
   <div className="modal-dialog">
      <div className="modal-content">
         <div className="modal-header">
            <h5 className="modal-title"> Withdraw/Transfer Funds To Card </h5>
            <button className="close" data-dismiss="modal"><span> &times; </span></button>
         </div>
         <div className="modal-body">
            <center>
               <p className="lead">
                  Your revenue funds will be transferred to: 
                  <br /> <strong> **** **** **** 1234 </strong>
               </p>
                  <input type="hidden" name="method" value="paypal" />
                  <div className="form-group row">
                     <label className="col-md-3 col-form-label font-weight-bold">Amount</label>
                     <div className="col-md-8">
                        <div className="input-group">
                           <span className="input-group-addon font-weight-bold"> $ </span>
                           <input type="text" name="amount" value={price} onChange={handleChange} className="form-control input-lg decimal"  placeholder={gigSetting && gigSetting.minimumWithdrawalLimit+" Minimum"}  />
                        </div>
                     </div>
                  </div>
                  <div className="form-group row">
                     <div className="col-md-8 offset-md-3"> 
                        <button type="submit" onClick={() => { transfer('STRIPE') } } className="btn btn-success form-control">Transfer</button>
                     </div>
                  </div>
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

export default Revenue;