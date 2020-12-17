import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"



import OwlCarousel from 'react-owl-carousel';



function Favourite() {



   return (

      <Fragment>

        <div class="dashboardContainer proposals-container favorites-container">
<div class="container">
   <div class="row mt-5">
      <div class="col-md-6">
         <h1 class="pt-2"> Favorites <span class="favCount">(5 gigs in favorite)</span></h1>
      </div>
      <div class="col-md-6">
         <a href="" class="btn btn-success pull-right"><i class="fa fa-plus-circle"></i>  Add Favorites To Cart</a>
      </div>
   </div>
   <div class="row">
      <div class="col-md-12 mt-3 mb-5">
         <div class="card">
            <div class="card-body">
               
               <div class="my_proposal_listing">
                  <div class="row">
                     <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-3">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/volarex/i-will-design-and-code-android-apps">
                              <img src={require('../../../assets/images/proposals/andorid-1_1571118714.png')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../assets/images/userlisting/img-05.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="volarex" className="seller-name">volarex</a>
                                    <div className="onePress-seller-tooltip">
                                       New Seller
                                    </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="6" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/volarex/i-will-design-and-code-android-apps"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I Will Design And Code Android Apps</h3>
                              </a>
                              <div className="rating-badges-container">
                                 <span className="proposal-rating">
                                    <i className="fa fa-star"></i>
                                    <span>
                                       <strong>4.5</strong> (2)
                                    </span>
                                 </span>
                              </div>
                           </div>
                           {/* <!--- proposal-card-caption Ends ---> */}
                           <footer className="proposal-card-footer">
                              {/* <!--- proposal-card-footer Starts ---> */}
                              <div className="proposal-price">
                                 <a>
                                    <small>STARTING AT</small>&#036;20.00 </a>
                              </div>
                           </footer>
                           {/* <!--- proposal-card-footer Ends ---> */}
                        </div>
                     </div>
                  </div>
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

export default Favourite;