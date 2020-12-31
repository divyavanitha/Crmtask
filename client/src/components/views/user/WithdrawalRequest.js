import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import { getMenu, getWithdrawals } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"



import OwlCarousel from 'react-owl-carousel';



function WithdrawalRequest() {


    const dispatch = useDispatch();
    const [withdrawals, setWithdrawals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setIsLoading(true);
      dispatch(getWithdrawals()).then((response) => {
         setWithdrawals(response.withdrawals);
         setIsLoading(false)
      })
    }, []);

   return (

      <Fragment>

      {isLoading && <div style={{position: 'fixed', opacity: 0.7, top: 0, width: '100%', height: '100%', background: '#000', zIndex: 99 }} >
                    <Loader style={{position: 'absolute', zIndex: 99, top: '30%', left: '45%' }} visible={isLoading} type="Rings" color="#00BFFF" height={100} width={100} />
                    </div>}

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
                     <th>Payment Mode</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {withdrawals && withdrawals.map((withdrawal, index) => (
                     <tr key={index}>
                        <td> {index+1} </td>
                        <td className="text-danger"> { withdrawal.refId }  </td>
                        <td> { moment(withdrawal.date).format('MMMM DD, YYYY') } </td>
                        <td className="text-success"> &#036;{withdrawal.price}  </td>
                        <td className="text-success"> {withdrawal.payment_mode}  </td>
                        <td className="text-success"> 
                           {withdrawal.status} 
                        </td>
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



      </Fragment>
   );
}

export default WithdrawalRequest;