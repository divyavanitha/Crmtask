import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"



import OwlCarousel from 'react-owl-carousel';



function CouponCreate() {



   return (

      <Fragment>

      <div className="container post-request-container">
   <div className="row mt-5 mb-3">
      <div className="col-md-6">
         <h1 className="pull-left">Add New Coupon</h1>
      </div>
   </div>
   <div className="row mb-5">
      <div className="col-md-12">
         <div className="card">
            <div className="card-body">
               <form action="" method="post">
                  <div className="form-group row">
                     <label className="col-md-3 control-label"> Coupon Title : </label>
                     <div className="col-md-6">
                        <input type="text" name="coupon_title" className="form-control" required />
                     </div>
                  </div>
                  <div className="form-group row">
                     <label className="col-md-3 control-label"> Coupon Price : </label>
                     <div className="col-md-3">
                        <select name="coupon_type" className="coupon-type form-control" required>
                           <option value="fixed_price"> Fixed Price </option>
                           <option value="discount_price"> Discount Percentage </option>
                        </select>
                     </div>
                     <div className="col-md-3">
                        <div className="input-group">
                           <span className="input-group-addon"> <b>&#036;</b> </span>
                           <input type="number" name="coupon_price" className="form-control" value="1" min="1" required />
                        </div>
                     </div>
                  </div>
                  <div className="form-group row">
                     <label className="col-md-3 control-label"> Coupon Code : </label>
                     <div className="col-md-6">
                        <input type="text" name="coupon_code" className="form-control" required />
                     </div>
                  </div>
                  <div className="form-group row">
                     <label className="col-md-3 control-label"> Coupon Limit : </label>
                     <div className="col-md-6">
                        <input type="number" name="coupon_limit" className="form-control" value="1" min="1" required />
                     </div>
                  </div>
                  <div className="form-group row">
                     <label className="col-md-3 control-label"> Select Proposal/Service : </label>
                     <div className="col-md-6">
                        <select name="proposal_id" className="form-control" required>
                           <option value=""> Select A Proposal/Service to Apply Coupon </option>
                           <option value='623'>I will do a video session and prepare you for any job interview</option>
                           <option value='890'>i will design a perfect logo for your company</option>
                           <option value='897'>texto ejemplo</option>
                           <option value='900'>w5nb547yn4 573457 n 76</option>
                           <option value='904'>dsfgfdghfrghrfhcxvbsdfhgdfhg</option>
                           <option value='1000'>instant</option>
                           <option value='1017'>pro00001</option>
                           <option value='1019'>vggg</option>
                           <option value='1046'>Хорошо поесть за 3-их</option>
                        </select>
                     </div>
                  </div>

                  <hr className="card-hr" />

                  <div className="form-group row">
                     <label className="col-md-3 control-label"></label>
                     <div className="col-md-6 text-right">
                        <input type="submit" name="submit" className="btn btn-success" value="Create Coupon" />
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
</div>



      </Fragment>
   );
}

export default CouponCreate;