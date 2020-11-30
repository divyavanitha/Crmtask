import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu, getSlide, getGigWithoutAuth } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"



import OwlCarousel from 'react-owl-carousel';


function CategoryGigList() {

   const dispatch = useDispatch();
   let auth = useSelector((state) => state.user);

   useEffect(() => {
      dispatch(getMenu())
      dispatch(getGigWithoutAuth())
   }, []);

   const gig = useSelector((state) => state.user && state.user.gig && state.user.gig.responseData && state.user.gig.responseData.gigs);

   return (

      <Fragment>
         <div className="container mt-3">
            {/* <!-- Container starts --> */}
            <div className="row">
               <div className="col-md-3 ">
                  <div className="card rounded-0 mb-3 welcome-box">
                     {/* <!-- card rounded-0 mb-3 welcome-box Starts --> */}
                     <div className="card-body pb-2 card_user">
                        {/* <!-- card-body Starts --> */}
                        <center>
                           <img src={require('../../../assets/images/img-03.jpg')} className="img-fluid rounded-circle mb-3" />
                        </center>
                        <h5>Welcome <span className="text-success">{auth.user && auth.user.firstName}</span> </h5>
                        <hr />
                        <p>Sell your services to millions of people all over the world.</p>
                        <Link to="/request/add" className="btn get_btn mt-0">Post A Request</Link>
                     </div>
                     {/* <!-- card-body Ends --> */}
                  </div>

               </div>
               <div className="col-md-9 ">


                  <div className="row mb-3 mt-3">
                     <div className="col-md-12">
                        <div className="secTitle">
                           <h2 className="pl-0 pr-0 ml-0 mr-0 float-left">Random Proposals/Services</h2>
                        </div>
                     </div>
                  </div>
                  <div className="row"> <Gig /> </div>




               </div>
            </div>

         </div>



      </Fragment>
   );
}

export default CategoryGigList;