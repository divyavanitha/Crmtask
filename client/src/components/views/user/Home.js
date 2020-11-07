import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu, getSlide, getGigWithoutAuth } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"



import OwlCarousel from 'react-owl-carousel';


function Home() {

   const dispatch = useDispatch();
   let auth = useSelector((state) => state.user);

   useEffect(() => {
      dispatch(getMenu())
      dispatch(getSlide())
      dispatch(getGigWithoutAuth())
   }, []);

   const slide = useSelector((state) => state.user && state.user.slide && state.user.slide.responseData && state.user.slide.responseData.slides);
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
                        <h5>Welcome <span className="text-success">{ auth.user && auth.user.firstName  }</span> </h5>
                        <hr />
                        <p>Sell your services to millions of people all over the world.</p>
                        <Link to="/request/add" className="btn get_btn mt-0">Post A Request</Link>
                     </div>
                     {/* <!-- card-body Ends --> */}
                  </div>
                  {/* <!-- card rounded-0 mb-3 welcome-box Ends --> */}
                  <div className="rounded-0 carosel_sec pt-2">
                     <h3 className="buy_head mt-2">Buy It Again</h3>
                     <div id="demo" className="carousel slide" data-ride="carousel">
                        {/* <!-- The slideshow --> */}
                        <div className="carousel-inner " role="listbox">
                           <div className="carousel-item active">
                           <div className="proposal-card-base mp-proposal-card">
                                 {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                                 <a href="proposals/Timiex/i-will-design-a-professional-wordpress-website-for-your-business">
                                    <img src={require('../../../assets/images/proposals/website-design-logo-png_1590561828.png')}
                                       className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../assets/images/userlisting/img-02.jpg')} className="rounded-circle" width="32"
                                             height="32" />
                                       </span>
                                       <div className="seller-info-wrapper">
                                          <a href="Timiex" className="seller-name">Timiex</a>
                                          <div className="onePress-seller-tooltip">
                                             New Seller
                                    </div>
                                       </div>
                                    </div>
                                    {/* <!--- onePress-seller-info Ends ---> */}
                                    <a href="proposals/Timiex/i-will-design-a-professional-wordpress-website-for-your-business"
                                       className="proposal-link-main">
                                       <h3>I will design a professional WordPress website for your business </h3>
                                    </a>
                                    <div className="rating-badges-container">
                                       <span className="proposal-rating">
                                          <i className="fa fa-star"></i>
                                          <span>
                                             <strong>0.0</strong>
                                       (0)
                                       </span>
                                       </span>
                                    </div>
                                 </div>
                                 {/* <!--- proposal-card-caption Ends ---> */}
                                 <footer className="proposal-card-footer">
                                    {/* <!--- proposal-card-footer Starts ---> */}
                                    <div className="proposal-price">
                                       <a className="js-proposal-card-imp-data">
                                          <small>Starting At</small>&#036;35.00 </a>
                                    </div>
                                 </footer>
                                 {/* <!--- proposal-card-footer Ends ---> */}
                              </div>
                              {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                           </div>
                           <div className="carousel-item ">
                              <div className="proposal-card-base mp-proposal-card">
                                 {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                                 <a href="proposals/Timiex/i-will-design-a-professional-wordpress-website-for-your-business">
                                    <img src={require('../../../assets/images/proposals/website-design-logo-png_1590561828.png')}
                                       className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../assets/images/userlisting/img-02.jpg')} className="rounded-circle" width="32"
                                             height="32" />
                                       </span>
                                       <div className="seller-info-wrapper">
                                          <a href="Timiex" className="seller-name">Timiex</a>
                                          <div className="onePress-seller-tooltip">
                                             New Seller
                                    </div>
                                       </div>
                                    </div>
                                    {/* <!--- onePress-seller-info Ends ---> */}
                                    <a href="proposals/Timiex/i-will-design-a-professional-wordpress-website-for-your-business"
                                       className="proposal-link-main">
                                       <h3>I will design a professional WordPress website for your business </h3>
                                    </a>
                                    <div className="rating-badges-container">
                                       <span className="proposal-rating">
                                          <i className="fa fa-star"></i>
                                          <span>
                                             <strong>0.0</strong>
                                       (0)
                                       </span>
                                       </span>
                                    </div>
                                 </div>
                                 {/* <!--- proposal-card-caption Ends ---> */}
                                 <footer className="proposal-card-footer">
                                    {/* <!--- proposal-card-footer Starts ---> */}
                                    <div className="proposal-price">
                                       <a className="js-proposal-card-imp-data">
                                          <small>Starting At</small>&#036;35.00 </a>
                                    </div>
                                 </footer>
                                 {/* <!--- proposal-card-footer Ends ---> */}
                              </div>
                              {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                           </div>
                           <div className="carousel-item ">
                              <div className="proposal-card-base mp-proposal-card">
                                 {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                                 <a href="proposals/RayTay90/i-will-sell-2000-inspirational-quotes">
                                    <img src={require('../../../assets/images/proposals/quote-1342706_1280_1588263608.png')} className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../assets/images/userlisting/img-04.jpg')} className="rounded-circle" width="32"
                                             height="32" />
                                       </span>
                                       <div className="seller-info-wrapper">
                                          <a href="RayTay90" className="seller-name">RayTay90</a>
                                          <div className="onePress-seller-tooltip">
                                             Level One
                                    </div>
                                       </div>
                                    </div>
                                    {/* <!--- onePress-seller-info Ends ---> */}
                                    <a href="proposals/RayTay90/i-will-sell-2000-inspirational-quotes"
                                       className="proposal-link-main">
                                       <h3>I will sell 2000 Inspirational quotes</h3>
                                    </a>
                                    <div className="rating-badges-container">
                                       <span className="proposal-rating">
                                          <i className="fa fa-star"></i>
                                          <span>
                                             <strong>4.6</strong>
                                       (5)
                                    </span>
                                       </span>
                                    </div>
                                 </div>
                                 {/* <!--- proposal-card-caption Ends ---> */}
                                 <footer className="proposal-card-footer">
                                    {/* <!--- proposal-card-footer Starts ---> */}
                                    <div className="proposal-price">
                                       <a className="js-proposal-card-imp-data">
                                          <small>Starting At</small>&#036;20.00 </a>
                                    </div>
                                 </footer>
                                 {/* <!--- proposal-card-footer Ends ---> */}
                              </div>
                              {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                           </div>
                           <div className="carousel-item ">
                              <div className="proposal-card-base mp-proposal-card">
                                 {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                                 <a href="proposals/Patricia/e-book-on-how-to-be-a-successful-entreprenuer">
                                    <img src={require('../../../assets/images/proposals/fall-3723738_1920_1588260783.png')} className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../assets/images/userlisting/img-06.jpg')} className="rounded-circle" width="32"
                                             height="32" />
                                       </span>
                                       <div className="seller-info-wrapper">
                                          <a href="Patricia" className="seller-name">Patricia</a>
                                          <div className="onePress-seller-tooltip">
                                             Level One
                                    </div>
                                       </div>
                                    </div>
                                    {/* <!--- onePress-seller-info Ends ---> */}
                                    <a href="proposals/Patricia/e-book-on-how-to-be-a-successful-entreprenuer"
                                       className="proposal-link-main">
                                       <h3>E-book on how to be a successful entreprenuer </h3>
                                    </a>
                                    <div className="rating-badges-container">
                                       <span className="proposal-rating">
                                          <i className="fa fa-star"></i>
                                          <span>
                                             <strong>4.3</strong>
                                       (6)
                                    </span>
                                       </span>
                                    </div>
                                 </div>
                                 {/* <!--- proposal-card-caption Ends ---> */}
                                 <footer className="proposal-card-footer">
                                    {/* <!--- proposal-card-footer Starts ---> */}
                                    <div className="proposal-price">
                                       <a className="js-proposal-card-imp-data">
                                          <small>Starting At</small>&#036;10.00 </a>
                                    </div>
                                 </footer>
                                 {/* <!--- proposal-card-footer Ends ---> */}
                              </div>
                              {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                           </div>
                           <div className="carousel-item ">
                              <div className="proposal-card-base mp-proposal-card">
                                 {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                                 <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video">
                                    <img src={require('../../../assets/images/postImg/img-03.jpg')} className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../assets/images/userlisting/img-02.jpg')} className="rounded-circle" width="32"
                                             height="32" />
                                       </span>
                                       <div className="seller-info-wrapper">
                                          <a href="mir_digimarket" className="seller-name">mir_digimarket</a>
                                          <div className="onePress-seller-tooltip">
                                             Level Two
                                    </div>
                                       </div>
                                    </div>
                                    {/* <!--- onePress-seller-info Ends ---> */}
                                    <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video"
                                       className="proposal-link-main">
                                       <h3>I Will Create A Professional Custom Explainer Video</h3>
                                    </a>
                                    <div className="rating-badges-container">
                                       <span className="proposal-rating">
                                          <i className="fa fa-star"></i>
                                          <span>
                                             <strong>4.8</strong>
                                             (22)
                                          </span>
                                       </span>
                                    </div>
                                 </div>
                                 {/* <!--- proposal-card-caption Ends ---> */}
                                 <footer className="proposal-card-footer">
                                    {/* <!--- proposal-card-footer Starts ---> */}
                                    <div className="proposal-price">
                                       <a className="js-proposal-card-imp-data">
                                          <small>Starting At</small>&#036;10.00 </a>
                                    </div>
                                 </footer>
                                 {/* <!--- proposal-card-footer Ends ---> */}
                              </div>
                              {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                           </div>
                        </div>
                        {/* <!-- Left and right controls --> */}
                        <a className="carousel-control-prev" href="#demo" data-slide="prev">
                           <i className="fa fa-angle-left"></i>
                        </a>
                        <a className="carousel-control-next" href="#demo" data-slide="next">
                           <i className="fa fa-angle-right"></i>
                        </a>
                     </div>
                  </div>
                  <div className="rounded-0 mb-3 carosel_sec mt-3">
                     <h3 className="buy_head ">Recently Viewed</h3>
                     <div id="demo2" className="carousel slide" data-ride="carousel">
                        {/* <!-- The slideshow --> */}
                        <div className="carousel-inner " role="listbox">
                           <div className="carousel-item active">
                              {/* <!--- carousel-item Starts ---> */}
                              <div className="proposal-card-base mp-proposal-card">
                                 {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                                 <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video">
                                    <img src={require('../../../assets/images/postImg/img-03.jpg')} className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../assets/images/userlisting/img-02.jpg')} className="rounded-circle" width="32"
                                             height="32" />
                                       </span>
                                       <div className="seller-info-wrapper">
                                          <a href="mir_digimarket" className="seller-name">mir_digimarket</a>
                                          <div className="onePress-seller-tooltip">
                                             Level Two
                                          </div>
                                       </div>
                                    </div>
                                    {/* <!--- onePress-seller-info Ends ---> */}
                                    <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video"
                                       className="proposal-link-main">
                                       <h3>I Will Create A Professional Custom Explainer Video</h3>
                                    </a>
                                    <div className="rating-badges-container">
                                       <span className="proposal-rating">
                                          <i className="fa fa-star"></i>
                                          <span>
                                             <strong>4.8</strong>
                                       (22)
                                        </span>
                                       </span>
                                    </div>
                                 </div>
                                 {/* <!--- proposal-card-caption Ends ---> */}
                                 <footer className="proposal-card-footer">
                                    {/* <!--- proposal-card-footer Starts ---> */}
                                    <div className="proposal-price">
                                       <a className="js-proposal-card-imp-data">
                                          <small>Starting At</small>&#036;10.00 </a>
                                    </div>
                                 </footer>
                                 {/* <!--- proposal-card-footer Ends ---> */}
                              </div>
                              {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                           </div>
                           {/* <!--- carousel-item Ends ---> */}
                           <div className="carousel-item ">
                              {/* <!--- carousel-item Starts ---> */}
                              <div className="proposal-card-base mp-proposal-card">
                                 {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                                 <a href="proposals/thili00traffi/i-will-develop-and-reskin-3d-and-2d-games-in-unit">
                                    <img src={require('../../../assets/images/proposals/game-1.jpg')} className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../assets/images/userlisting/img-01.jpg')} className="rounded-circle" width="32"
                                             height="32" />
                                       </span>
                                       <div className="seller-info-wrapper">
                                          <a href="thili00traffi" className="seller-name">thili00traffi</a>
                                          <div className="onePress-seller-tooltip">
                                             New Seller
                                    </div>
                                       </div>
                                    </div>
                                    {/* <!--- onePress-seller-info Ends ---> */}
                                    <a href="proposals/thili00traffi/i-will-develop-and-reskin-3d-and-2d-games-in-unit"
                                       className="proposal-link-main">
                                       <h3>I Will Develop And Reskin 3d And 2d Games In Unity</h3>
                                    </a>
                                    <div className="rating-badges-container">
                                       <span className="proposal-rating">
                                          <i className="fa fa-star"></i>
                                          <span>
                                             <strong>4.0</strong>
                                       (4)
                                    </span>
                                       </span>
                                    </div>
                                 </div>
                                 {/* <!--- proposal-card-caption Ends ---> */}
                                 <footer className="proposal-card-footer">
                                    {/* <!--- proposal-card-footer Starts ---> */}
                                    <div className="proposal-price">
                                       <a className="js-proposal-card-imp-data">
                                          <small>Starting At</small>&#036;20.00 </a>
                                    </div>
                                 </footer>
                                 {/* <!--- proposal-card-footer Ends ---> */}
                              </div>
                              {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                           </div>
                           {/* <!--- carousel-item Ends ---> */}
                           <div className="carousel-item ">
                              {/* <!--- carousel-item Starts ---> */}
                              <div className="proposal-card-base mp-proposal-card">
                                 {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                                 <a href="proposals/Patricia/i-will-do-a-video-session-and-teach-you-english">
                                    <img src={require('../../../assets/images/proposals/board-64269_1920_1588265658.png')} className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../assets/images/userlisting/img-06.jpg')} className="rounded-circle" width="32"
                                             height="32" />
                                       </span>
                                       <div className="seller-info-wrapper">
                                          <a href="Patricia" className="seller-name">Patricia</a>
                                          <div className="onePress-seller-tooltip">
                                             Level One
                                    </div>
                                       </div>
                                    </div>
                                    {/* <!--- onePress-seller-info Ends ---> */}
                                    <a href="proposals/Patricia/i-will-do-a-video-session-and-teach-you-english"
                                       className="proposal-link-main">
                                       <h3>I will do a video session and teach you english</h3>
                                    </a>
                                    <div className="rating-badges-container">
                                       <span className="proposal-rating">
                                          <i className="fa fa-star"></i>
                                          <span>
                                             <strong>0.0</strong>
                                       (0)
                                    </span>
                                       </span>
                                    </div>
                                 </div>
                                 {/* <!--- proposal-card-caption Ends ---> */}
                                 <footer className="proposal-card-footer">
                                    {/* <!--- proposal-card-footer Starts ---> */}
                                    <div className="proposal-price">
                                       <a className="js-proposal-card-imp-data">
                                          <small>Starting At</small>&#036;0.50 </a>
                                    </div>
                                 </footer>
                                 {/* <!--- proposal-card-footer Ends ---> */}
                              </div>
                              {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                           </div>
                           {/* <!--- carousel-item Ends ---> */}
                           <div className="carousel-item ">
                              {/* <!--- carousel-item Starts ---> */}
                              <div className="proposal-card-base mp-proposal-card">
                                 {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                                 <a href="proposals/RayTay90/i-will-sell-2000-inspirational-quotes">
                                    <img src={require('../../../assets/images/proposals/quote-1342706_1280_1588263608.png')} className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../assets/images/userlisting/img-04.jpg')} className="rounded-circle" width="32"
                                             height="32" />
                                       </span>
                                       <div className="seller-info-wrapper">
                                          <a href="RayTay90" className="seller-name">RayTay90</a>
                                          <div className="onePress-seller-tooltip">
                                             Level One
                                    </div>
                                       </div>
                                    </div>
                                    {/* <!--- onePress-seller-info Ends ---> */}
                                    <a href="proposals/RayTay90/i-will-sell-2000-inspirational-quotes"
                                       className="proposal-link-main">
                                       <h3>I will sell 2000 Inspirational quotes</h3>
                                    </a>
                                    <div className="rating-badges-container">
                                       <span className="proposal-rating">
                                          <i className="fa fa-star"></i>
                                          <span>
                                             <strong>4.6</strong>
                                       (5)
                                    </span>
                                       </span>
                                    </div>
                                 </div>
                                 {/* <!--- proposal-card-caption Ends ---> */}
                                 <footer className="proposal-card-footer">
                                    {/* <!--- proposal-card-footer Starts ---> */}
                                    <div className="proposal-price">
                                       <a className="js-proposal-card-imp-data">
                                          <small>Starting At</small>&#036;20.00 </a>
                                    </div>
                                 </footer>
                                 {/* <!--- proposal-card-footer Ends ---> */}
                              </div>
                              {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                           </div>
                           {/* <!--- carousel-item Ends ---> */}
                        </div>
                        {/* <!-- Left and right controls --> */}
                        <a className="carousel-control-prev" href="#demo2" data-slide="prev">
                           <i className="fa fa-angle-left"></i>
                        </a>
                        <a className="carousel-control-next" href="#demo2" data-slide="next">
                           <i className="fa fa-angle-right"></i>
                        </a>
                     </div>
                  </div>
                  <br />
                  {/* <script>
               $(document).ready(function () {
                  // Sticky Code start //
                  if ($(window).width() < 767) {
                     // 
                  } else {
                     $(".sticky-start").sticky({
                        topSpacing: 20,
                        zIndex: 500,
                        bottomSpacing: 400,
                     });
                  }
                  // Sticky code ends //
               });
            </script> */}
               </div>
               <div className="col-md-9 ">
                  <div id="demo3" className="carousel slide">

                     <OwlCarousel className="carousel-inner" loop dots={true} autoplay={true} items={1} >

                        {slide && slide.map((list) => (<div key={list._id} className="carousel-item active"><a><img className="img-fluid" src={list.layoutPhoto} /></a>
                           <div className="carousel-caption d-lg-block d-md-block d-none " >
                              <h3>{list.title}</h3>
                              <p>{list.description}</p></div>
                        </div>))}

                     </OwlCarousel>

                  </div>


                  <div className="row mt-4 mb-3">
                     <div className="col-md-12">
                        <div className="secTitle">
                           <h2 className="float-left">Featured Proposals/Services</h2>
                           <button className="float-right btn btn-success">VIEW ALL</button>
                        </div>
                     </div>
                  </div>
                  <div className="row">



                   <Gig /> </div>

                  {/* <!-- If You have no gigs, show random gigs on homepage --> */}
                  <div className="row mb-3 mt-3">
                     <div className="col-md-12">
                        <div className="secTitle">
                           <h2 className="float-left">Top Proposals/Services</h2>
                           <button className="float-right btn btn-success">VIEW ALL</button>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
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
                        {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                     </div>
                     
                  </div>
                  {/* <!-- If You have no gigs, show random gigs on homepage --> */}
                  <div className="row mb-3 mt-3">
                     <div className="col-md-12">
                        <div className="secTitle">
                           <h2 className="pl-0 pr-0 ml-0 mr-0 float-left">Random Proposals/Services</h2>
                           <button className="float-right btn btn-success">VIEW ALL</button>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/rewedfv/fghjkl">
                              <img src={require('../../../assets/images/postImg/img-03.jpg')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../assets/images/userlisting/img-07.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="rewedfv" className="seller-name">rewedfv</a>
                                    <div className="onePress-seller-tooltip">
                                       New Seller
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="404" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/rewedfv/fghjkl" className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>fghjkl</h3>
                              </a>
                              <div className="rating-badges-container">
                                 <span className="proposal-rating">
                                    <i className="fa fa-star"></i>
                                    <span>
                                       <strong>0.0</strong> (0)
                        </span>
                                 </span>
                              </div>
                           </div>
                           {/* <!--- proposal-card-caption Ends ---> */}
                           <footer className="proposal-card-footer">
                              {/* <!--- proposal-card-footer Starts ---> */}
                              <div className="proposal-price">
                                 <a>
                                    <small>STARTING AT</small>&#036;5.00 </a>
                              </div>
                           </footer>
                           {/* <!--- proposal-card-footer Ends ---> */}
                        </div>
                        {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                     </div>
                  </div>
                  {/* <!-- <br> --> */}
                  {/* <!-- If You have no gigs, show random gigs on homepage Ends --> */}
                  <div className="row mt-2 mb-3 mt-3">
                     <div className="col-md-12">
                        <div className="secTitle">
                           <h2 className="float-left">Recent Buyer Requests</h2>
                           <button type="button" className="float-right btn btn-success">VIEW ALL</button>
                        </div>
                     </div>
                  </div>
                  <div className="row buyer-requests">
                     <div className="col-md-12">
                        <div className="table-responsive box-table tableContent">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Request Message</th>
                                    <th>Offers</th>
                                    <th>Duration</th>
                                    <th>Budget</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr id="request_tr_367">
                                    <td>
                                       <img src={require('../../../assets/images/userlisting/img-01.jpg')} className="request-img rounded-circle" />
                                       <div className="request-description">
                                          <h6>Pat</h6>
                                          <h6 className="text-success">sdfsdf</h6>
                                          <p className="lead">sdfsdfsdfsdfsf </p>
                                       </div>
                                    </td>
                                    <td>0</td>
                                    <td>1 Day</td>
                                    <td className="text-success">
                                       &#036;33.00 <br />
                                       <button className="btn btn-success btn-sm mt-4 send_button_367">
                                          Send Offer </button>
                                    </td>
                                    {/*  <script type="text/javascript">
                           $(".send_button_367").click(function () {
                              request_id = "367";
                              $.ajax({
                                 method: "POST",
                                 url: "requests/send_offer_modal",
                                 data: { request_id: request_id }
                              }).done(function (data) {
                                 $(".append-modal").html(data);
                              });
                           });

                        </script> */}
                                 </tr>
                                
                              </tbody>
                           </table>
                           <center>
                              <a href="requests/buyer_requests" className="btn btn-success btn-lg mb-3">
                                 <i className="fa fa-spinner"></i> Load More </a>
                           </center>
                        </div>
                     </div>
                  </div>


               </div>
            </div>

         </div>
         


      </Fragment>
   );
}

export default Home;