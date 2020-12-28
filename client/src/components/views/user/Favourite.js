import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu, getFavourites, addFavourite } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"

import OwlCarousel from 'react-owl-carousel';

function Favourite() {

   const dispatch = useDispatch();

   const favourites = useSelector((state) => state.user && state.user.favourites);

   return (

      <Fragment>

        <div class="dashboardContainer proposals-container favorites-container">
         <div class="container">
            <div class="row mt-5">
               <div class="col-md-6">
                  <h1 class="pt-2"> Favorites {favourites && <span class="favCount">({favourites.length} gigs in favorite)</span>}</h1>
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
                           <div className="row"> {favourites && favourites.map((favourite) => (<Gig key={favourite.gig._id} list={favourite.gig} styles={'col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-3'} />))} </div>
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