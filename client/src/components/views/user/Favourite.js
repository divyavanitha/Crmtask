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

        <div className="dashboardContainer proposals-container favorites-container">
         <div className="container">
            <div className="row mt-5">
               <div className="col-md-6">
                  <h1 className="pt-2"> Favorites {favourites && <span className="favCount">({favourites.length} gigs in favorite)</span>}</h1>
               </div>
               <div className="col-md-6">
                  <a href="" className="btn btn-success pull-right"><i className="fa fa-plus-circle"></i>  Add Favorites To Cart</a>
               </div>
            </div>
            <div className="row">
               <div className="col-md-12 mt-3 mb-5">
                  <div className="card">
                     <div className="card-body">
                        
                        <div className="my_proposal_listing">
                           <div className="row"> {favourites && favourites.length > 0 && favourites.map((favourite) => (<Gig key={favourite.gig._id} list={favourite.gig} styles={'col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-3'} />))} </div>
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