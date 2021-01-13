import React, { Fragment, useState } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { profileGigs } from "../../../../_actions/user.action";
import Gig from "./Gig"
import OwlCarousel from 'react-owl-carousel';


function SellerProfile() {

   const dispatch = useDispatch();
   let auth = useSelector((state) => state.user);
   const params = useParams();

   useEffect(() => {
      dispatch(profileGigs(params.id))
      
   }, []);


   const gigs = useSelector((state) => state.user && state.user.profile_gigs && state.user.profile_gigs.responseData && state.user.profile_gigs.responseData.gig);

   const background = gigs ? 'url("'+gigs[0].user.coverPhoto+'") center no-repeat' : '#000';

   const userRating = gigs && gigs[0].user.rating ? gigs && gigs[0].user.rating : 0;

   return (

      <Fragment>
      {console.log(gigs && gigs[0].user.profilePhoto)}
         <div className="user-header pl-5 pr-5 pt-5 pb-5" style={{ background: background }}>
            <div className="profile-image float-lg-left flaot-md-left float-none mr-4">
               <img src={ gigs && gigs[0].user.profilePhoto } className="rounded-circle" />
               {(gigs && gigs[0].user.type == "TOPRATED") ? (<img src={require('../../../../assets/images/level_badge_3.png')} className="level_badge" />) : (gigs && gigs[0].user.type == "LEVELONE") ? (<img src={require('../../../../assets/images/level_badge_1.png')} className="level_badge" />) : (gigs && gigs[0].user.type == "LEVELTWO") ? ( <img src={require('../../../../assets/images/level_badge.png')} className="level_badge" />) : ""}
            </div>
            <div className="content-bar mt-3">
               <h1> Hi, I'm {params.user} </h1>
               <span className="headline"> {gigs && gigs[0].user.headline} </span>

               <div className="star-rating">
                  { new Array(Math.ceil(userRating)).fill(Math.ceil(userRating)).map(() => <img className='mb-2' src={require('../../../../assets/images/user_rate_full_big.png')} />  ) }
                  { new Array(5 - Math.ceil(userRating)).fill(0).map(() => <img className='mb-2' src={require('../../../../assets/images/user_rate_blank_big.png')} />  ) }

                  <span className="text-white m-1"><strong></strong></span>
                  <span className="text-white">
                     <i className="fa fa-map-marker m-1"></i> {gigs && gigs[0].user.country ? gigs && gigs[0].user.country.name : ""}
                  </span>
               </div>
               <span className="user-is-online">
                  <span className="h6"><i className="fa fa-circle"></i></span>
                  <span>Online</span>
               </span>
            </div>
            <a className="btn btn-success mt-3" href="">
               Contact <small>({params.user})</small>
            </a>
         </div>
         
         <div className="dashboardContainer favorites-container">
            <div className="container"> 
               <div className="row">
                   <div className="col-md-4 mt-4">
                     <div className="card user-sidebar rounded-0 mb-4">
                        <div className="card-body">
                           <h3>Description</h3>
                           <p>{ gigs && gigs[0].user.description }</p>
                           <hr className="card-hr" />
                           <h3 className="float-left">Languages</h3>
                           <div className="clearfix"></div>
                           <ul className="list-unstyled mt-3">
                              {gigs && gigs[0].user.language.map((list) => (<li className="card-li mb-1">
                                 {list.language} - <span className="text-muted"> {list.level} </span>
                              </li>))}
                              
                              
                           </ul>
                           <hr className="card-hr" />
                           <h3 className="float-left">Skills</h3>
                           <div className="clearfix"></div>
                           <ul className="list-unstyled mt-3">
                              {gigs && gigs[0].user.skill.map((list) => (<li className="card-li mb-1">
                                
                                 {list.skill} - <span className="text-muted"> {list.level} </span>
                              </li>))}
                              
                           </ul>
                          
                        </div>
                        
                     </div>
                   </div>
                   <div className="col-md-8">
                     <div className="row">
                          <div className="col-md-12">
                            <div className="card mt-4 mb-4 rounded-0">
                              <div className="card-body">
                                <h2>{params.user}'s Gigs/Services</h2>
                              </div>
                            </div>
                          </div>
                      </div>
                      <div className="row">
                       <div className="row"> {gigs && gigs.map((list) => (<Gig key={list._id} list={list} />))} </div>
                     </div>
                   </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
}

export default SellerProfile;