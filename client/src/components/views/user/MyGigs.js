import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { updateProfile, getProfile } from "../../../_actions/profile.action";
import { getGigList } from "../../../_actions/gigs.action";

const MyGigs = (props) => {

   const dispatch = useDispatch();
   let history = useHistory();
   const params = useParams();
   const auth = useSelector((state) => state.user);
   const profile = useSelector((state) => state.profile && state.profile.getprofile && state.profile.getprofile.responseData && state.profile.getprofile.responseData.user);
   useEffect(() => {
      dispatch(getProfile())
      dispatch(getGigList())

   }, []);

   const gigs = useSelector((state) => state.gig && state.gig.gigs && state.gig.gigs.responseData);

   return (
      <Fragment>

         <div className="container mt-5 mb-5 myProfileContainer" id="myProfile">



            <div className="row terms-page" >
               <div className="col-md-3 mb-3">
                  <div className="mpLeft">
                     <div className="card">
                        <div className="card-body">
                           <div className="welcome-box">
                              <center>
                                 <img src={profile && profile.profilePhoto} className="img-fluid rounded-circle mb-3" />
                              </center>
                              <h5>Welcome, <span className="text-success">{profile && profile.firstName}</span> </h5>
                           </div>
                           <ul className="nav nav-pills flex-column mt-2">
                              <li className="nav-item">
                                 <Link to="/profile" className="nav-link">
                                    Profile Settings            </Link>
                              </li>
                              <li className="nav-item">
                                 <Link to="/account" className="nav-link">
                                    Account Settings              </Link>
                              </li>
                              <li className="nav-item">
                                 <Link to="/mygigs" className="nav-link active">
                                    My Gigs                    </Link>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-md-9">
                  <div className="mpRight">
                     <div className="">
                        <div className="tab-content">


                           <div id="my_proposal" className="tab-pane fade active show">
                              <div className="card">
                                 <div className="card-header">
                                    <h2>My Gigs</h2>
                                 </div>
                                 <div className="card-body">
                                    <div className="my_proposal_listing">
                                       <div className="row">
                                          {gigs && gigs.active.map((list, index) => (<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
                                             <div className="proposal-card-base mp-proposal-card">
                                             <Link data-id={list._id} to={list.user ? "/gig/" + list.user.firstName + "/" + list.title : ""} className="dropdown-item">
                                                   <img src={list.photo.length ? list.photo[0].photo : ""} className="img-fluid" />
                                                </Link>
                                                <div className="proposal-card-caption">
                                                   <div className="proposal-seller-info">
                                                      <span className="fit-avatar s24">
                                                      <img src={list.user.profilePhoto} className="rounded-circle" width="32" height="32" />
                                                      </span>
                                                      <div className="seller-info-wrapper">
                                                      <Link to="/profile" className="seller-name">{list.user.firstName}</Link>
                                                         <div className="onePress-seller-tooltip">
                                                            {list.user.type}
                                                        </div>
                                                      </div>
                                                      <div className="favoriteIcon">
                                                         <i data-id="4" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip" data-placement="top" title="Favorite"></i>
                                                      </div>
                                                   </div>
                                                   <Link data-id={list._id} to={list.user ? "/gig/" + list.user.firstName + "/" + list.title : ""}  className="proposal-link-main js-proposal-card-imp-data">
                                                      <h3>{list.title}</h3>
                                                   </Link>
                                                   <div className="rating-badges-container">
                                                      <span className="proposal-rating">
                                                         <i className="fa fa-star"></i>
                                                         <span> <strong>{list.user.rating}</strong> (22) </span>
                                                      </span>
                                                   </div>
                                                </div>
                                                <footer className="proposal-card-footer">
                                                   <div className="proposal-price">
                                                      <a>
                                                      <small>STARTING AT</small>&#036;{list.pricing.length ? list.pricing[0].price : 0}     </a>
                                                   </div>
                                                </footer>
                                             </div>
                                          </div>
                                          ))}


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



         </div>



      </Fragment>
   );
};

export default MyGigs;