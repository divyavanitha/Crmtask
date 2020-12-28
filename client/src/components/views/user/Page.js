import React, { Fragment, useState } from 'react';
import { withRouter, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu } from "../../../_actions/user.action";
import parse from 'html-react-parser';
import Gig from "./gigs/Gig";



import OwlCarousel from 'react-owl-carousel';



function Page() {

   const params = useParams();

   let pages = useSelector((state) => state.user && state.user.pages);

   let page = pages && pages.find((data) => data.url == params.page ) ;

   return (

      <Fragment>

        <div className="dashboardContainer proposals-container no-bg">
<div className="container">
   <div className="row justify-content-center">
      <div className="col-lg-12 col-md-12 mt-5 mb-5">
         <div className="myReferralContent">
         <div className="card rounded-0">
            <div className="card-body">
               <div className="listingDatatTable">
                  { page && parse( page.content ) }
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

export default Page;