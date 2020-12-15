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
                        <div class="proposal-card-base mp-proposal-card">
                           <a href="">
                           <img src="assets/images/postImg/img-03.jpg" class="img-fluid" />
                           </a>
                           <div class="proposal-card-caption">
                              <div class="proposal-seller-info">
                                 <span class="fit-avatar s24">
                                 <img src="images/userlisting/img-02.jpg" class="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div class="seller-info-wrapper">
                                    <a href="" class="seller-name">mir_digimarket</a>
                                    <div class="onePress-seller-tooltip">
                                       Level Two       
                                    </div>
                                 </div>
                                 <div class="favoriteIcon">
                                    <i data-id="4" href="#" class="fa fa-heart proposal-unfavorite" data-toggle="tooltip" data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              <a href="" class="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I Will Create A Professional Custom Explainer Video</h3>
                              </a>
                              <div class="rating-badges-container">
                                 <span class="proposal-rating">
                                 <i class="fa fa-star"></i>
                                 <span>
                                 <strong>4.8</strong> (22)
                                 </span>
                                 </span>
                              </div>
                           </div>
                           <footer class="proposal-card-footer">
                              <div class="proposal-price">
                                 <a>
                                 <small>STARTING AT</small>&#036;10.00     </a>
                              </div>
                           </footer>
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