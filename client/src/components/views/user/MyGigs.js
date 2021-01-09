import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { getMenu } from "../../../_actions/user.action";

import { getGigList } from "../../../_actions/gigs.action";



function MyProposals() {

   const dispatch = useDispatch();


   useEffect(() => {
      dispatch(getGigList())
   });

   const gig_list = useSelector((state) => state.gig && state.gig.gigs && state.gig.gigs.responseData);

   return (

      <Fragment>
                        <div className="card">
                                 <div className="card-header">
                                    <h2>My Gigs</h2>
                                 </div>
                                 <div className="card-body">
                                    <div className="my_proposal_listing">
                                       <div className="row">
                                          {gig_list && gig_list.active.map((list, index) => (<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
                                             <div className="proposal-card-base mp-proposal-card">
                                                {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                                                <Link data-id={list._id} to={list.user ? "/gig/" + list.user.firstName + "/" + list.title : ""} className="dropdown-item" target="_blank">
                                                   <img src={list.photo.length ? list.photo[0].photo : ""} className="img-fluid" />
                                                </Link>
                                                <div className="proposal-card-caption">
                                                   {/* <!--- proposal-card-caption Starts ---> */}
                                                   <div className="proposal-seller-info">
                                                      {/* <!--- onePress-seller-info Starts ---> */}
                                                      <span className="fit-avatar s24">
                                                         <img src={list.user.profilePhoto} className="rounded-circle" width="32" height="32" />
                                                      </span>
                                                      <div className="seller-info-wrapper">
                                                         <Link to="/profile" className="seller-name">{list.user.firstName}</Link>
                                                         <div className="onePress-seller-tooltip">
                                                            {list.user.type}
                                                        </div>
                                                      </div>
                                                      
                                                   </div>
                                                   {/* <!--- onePress-seller-info Ends ---> */}
                                                   <Link data-id={list._id} to={list.user ? "/gig/" + list.user.firstName + "/" + list.title : ""} target="_blank" className="proposal-link-main js-proposal-card-imp-data">
                                                      <h3>{list.title}</h3>
                                                   </Link>
                                                   <div className="rating-badges-container">
                                                      <span className="proposal-rating">
                                                         <i className="fa fa-star"></i>
                                                         <span>
                                                            <strong>{list.user.rating}</strong>
                                                         </span>
                                                      </span>
                                                   </div>
                                                  </div>
                                                {/* <!--- proposal-card-caption Ends ---> */}
                                                <footer className="proposal-card-footer">
                                                   {/* <!--- proposal-card-footer Starts ---> */}
                                                   <div className="proposal-price">
                                                      <a>
                                                         <small>STARTING AT</small>&#036;{list.pricing.length ? list.pricing[0].price : 0}      </a>
                                                   </div>
                                                </footer>
                                                {/* <!--- proposal-card-footer Ends ---> */}
                                             </div>
                                             {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                                          </div>))}


                                       </div>

                                    </div> {/* <!-- my_proposal_listing --> */}
                                 </div>
                              </div>
      </Fragment>




   );
}

export default MyProposals;