import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCard, getPayoutCard } from "../../../_actions/user.action";
import StripeForm from "./StripeForm";




function AccountSettings() {

   const dispatch = useDispatch();
   const auth = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);
   let cards = useSelector((state) => state.user.cards);


   useEffect(() => {
      setIsLoading(true);
      dispatch(getCard()).then((response) => {
        setIsLoading(false);
         /*setGigAmount(response.gigAmount);
         setPendingAmount(response.pendingAmount);
         setWithdrawalAmount(response.withdrawalAmount);
         setRevenues(response.revenues);
         setIsLoading(false)*/
      })
    }, []);

    console.log(cards)

   return (

      <Fragment>
         <div className="card">
            <div className="card-header">
               <h2>Account Settings</h2>
            </div>
            <div className="card-body">
               <h5 className="mb-4"> Cards </h5>
               <form method="post" className="clearfix mb-3">
                  <div className="form-group row">
                  {console.log(cards)}
                     {/* cards && cards.map(card => <div>{card.last_four}{card.brand}{card.isDefault}</div>) */}
                     <div className="col-md-8">

                     </div>
                  </div>

                  <a href="#" data-toggle="modal" data-target="#stripe-modal" className="btn btn-success float-right">Add Card</a>
               </form>
               <hr />
               <h5 className="mb-4"> Payout Cards (Debit) </h5>
               <form method="post" className="clearfix mb-3">
                  <div className="form-group row">
                     <label className="col-md-4 col-form-label"> Enter Paypal Email </label>
                     <div className="col-md-8">

                     </div>
                  </div>

                  <a href="#" data-toggle="modal" data-target="#stripe-modal" className="btn btn-success float-right">Change Card</a>
               </form>
               <hr />
               {/*<h5 className="mb-4"> REAL-TIME NOTIFICATIONS </h5>
                     <form method="post" className="clearfix">
                        <div className="form-group row mb-3">
                           <label className="col-md-4 col-form-label"> Enable/disable sound </label>
                           <div className="col-md-8">
                              <select name="enable_sound" className="form-control">
                                 <option value="yes"> Yes </option>
                                 <option value="no"> No </option>
                              </select>
                           </div>
                        </div>
                        <div className="form-group row mb-3">
                           <label className="col-md-4 col-form-label"> Enable Sliding Notifications </label>
                           <div className="col-md-8">
                              <select name="enable_notifications" className="form-control">
                                 <option value="1"> Yes </option>
                                 <option value="0"> No </option>
                              </select>
                           </div>
                        </div>
                        <button type="submit" name="update_sound" className="btn btn-success mt-1 float-right">
                           Update Changes  </button>
                     </form>
                     <hr />*/}
               <h5 className="mb-4"> Change Password </h5>
               <form method="post" className="clearfix mb-3">
                  <div className="form-group row">
                     <label className="col-md-4 col-form-label"> Enter Old Password </label>
                     <div className="col-md-8">
                        <input type="text" name="old_pass" className="form-control" required="" />
                     </div>
                  </div>
                  <div className="form-group row">
                     <label className="col-md-4 col-form-label"> Enter New Password </label>
                     <div className="col-md-8">
                        <input type="text" name="new_pass" className="form-control" required="" />
                     </div>
                  </div>
                  <div className="form-group row">
                     <label className="col-md-4 col-form-label"> Confirm New Password </label>
                     <div className="col-md-8">
                        <input type="text" name="new_pass_again" className="form-control" required="" />
                     </div>
                  </div>
                  <button type="submit" name="change_password" className="btn btn-success float-right">
                     Change Password  </button>
               </form>

            </div>
         </div>

         <StripeForm />
      </Fragment>




   );
}

export default AccountSettings;