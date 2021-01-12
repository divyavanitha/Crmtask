import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu, getSlide, getGigWithoutAuth, getRecent, getFavourites, addFavourite, buyItAgain  } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"



import OwlCarousel from 'react-owl-carousel';


function Home() {

   const dispatch = useDispatch();
   let auth = useSelector((state) => state.user);

   useEffect(() => {
      dispatch(getMenu())
      dispatch(getSlide())
      dispatch(getGigWithoutAuth())
      dispatch(getRecent())
      dispatch(buyItAgain())
   }, []);

   const slide = useSelector((state) => state.user && state.user.slide && state.user.slide.responseData && state.user.slide.responseData.slides);
   const gig = useSelector((state) => state.user && state.user.gigs && state.user.gigs.responseData && state.user.gigs.responseData.gigs);
   const recent = useSelector((state) => state.user && state.user.recent);
   const buyit = useSelector((state) => state.user && state.user.buy_it && state.user.buy_it.responseData && state.user.buy_it.responseData.order);

   return (

      <Fragment>
         <div className="container mt-3">
            <div className="row">
               <div className="col-md-3 ">
                  <div className="card rounded-0 mb-3 welcome-box">
                     <div className="card-body pb-2 card_user">
                        <center>
                           <img src={auth.user && auth.user.profilePhoto ? auth.user && auth.user.profilePhoto : require('../../../assets/images/img-03.jpg')} className="img-fluid rounded-circle mb-3" />
                        </center>
                        <h5>Welcome <span className="text-success">{auth.user && auth.user.firstName}</span> </h5>
                        <hr />
                        <p>Sell your services to millions of people all over the world.</p>
                        <Link to="/request/add" className="btn get_btn mt-0">Post A Request</Link>
                     </div>
                  </div>
                  <div className="rounded-0 carosel_sec pt-2">
                     <h3 className="buy_head mt-2">Buy It Again</h3>
                     <div id="demo" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner " role="listbox">
                           {buyit && buyit.map((r, index) => (<div key={r._id} className={ index == 0 ? "carousel-item active" : "carousel-item"}>
                              <div className="proposal-card-base mp-proposal-card">
                                <Link to={r.seller ? "/gig/" + r.seller.firstName + "/" + r.gig.title : ""}>
                                    <img src={r.gig.photo[0] ? r.gig.photo[0].photo : ""} className="img-fluid" />
                                </Link>
                                <div className="proposal-card-caption">
                                    <div className="proposal-seller-info">
                                        <span className="fit-avatar s24">
                                            <img src={r.seller ? r.seller.profilePhoto : ""} className="rounded-circle" width="32" height="32" />
                                        </span>
                                        <div className="seller-info-wrapper">
                                            <a href={r.seller ? r.seller.firstName : ""} className="seller-name">{r.seller ? r.seller.firstName : ""} {r.seller ? r.seller.lastName : ""}</a>
                                            <div className="onePress-seller-tooltip">
                                                {r.seller ? r.seller.type : ""}
                                            </div>
                                        </div>
                                    </div>
                                    <Link to={r.seller ? "/gig/" + r.seller.firstName + "/" + r.gig.title : ""} className="proposal-link-main js-proposal-card-imp-data">
                                        <h3>{r.gig.title}</h3>
                                    </Link>
                                    <div className="rating-badges-container">
                                        <span className="proposal-rating">
                                            <i className="fa fa-star"></i>
                                            <span>
                                                <strong>{r.seller ? Math.ceil(r.seller.rating) : "3"}</strong>
                                    </span>
                                        </span>
                                    </div>
                                </div>
                                <footer className="proposal-card-footer">
                                    <div className="proposal-price">
                                        <a>
                                            <small>STARTING AT</small>&#036;{r.gig.pricing[0] ? r.gig.pricing[0].price : "0.00"} </a>
                                    </div>
                                </footer>
                            </div>
                           </div>))}              
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

                        <div className="carousel-inner " role="listbox">
                           {recent && recent.map((r, index) => (
                              <div key={r._id} className={ index == 0 ? "carousel-item active" : "carousel-item"}>
                              <div className="proposal-card-base mp-proposal-card">
                    <Link to={r.user ? "/gig/" + r.user.firstName + "/" + r.gig.title : ""}>
                        <img src={r.gig.photo[0] ? r.gig.photo[0].photo : ""} className="img-fluid" />
                    </Link>
                    <div className="proposal-card-caption">
                        <div className="proposal-seller-info">
                            <span className="fit-avatar s24">
                                <img src={r.user ? r.user.profilePhoto : ""} className="rounded-circle" width="32" height="32" />
                            </span>
                            <div className="seller-info-wrapper">
                                <a href={r.user ? r.user.firstName : ""} className="seller-name">{r.user ? r.user.firstName : ""} {r.user ? r.user.lastName : ""}</a>
                                <div className="onePress-seller-tooltip">
                                    {r.user ? r.user.type : ""}
                                </div>
                            </div>
                        </div>
                        <Link to={r.user ? "/gig/" + r.user.firstName + "/" + r.gig.title : ""} className="proposal-link-main js-proposal-card-imp-data">
                            <h3>{r.gig.title}</h3>
                        </Link>
                        <div className="rating-badges-container">
                            <span className="proposal-rating">
                                <i className="fa fa-star"></i>
                                <span>
                                    <strong>{r.user ? Math.ceil(r.user.rating) : "3"}</strong> 
                        </span>
                            </span>
                        </div>
                    </div>
                    <footer className="proposal-card-footer">
                        <div className="proposal-price">
                            <a>
                                <small>STARTING AT</small>&#036;{r.gig.pricing[0] ? r.gig.pricing[0].price : "0.00"} </a>
                        </div>
                    </footer>
                </div>
                           </div>
                           ))}

                        </div>

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
                  <div className="row"> {gig && gig.map((list) => (<Gig key={list._id} list={list} />))} </div>




                  {/* <!-- If You have no gigs, show random gigs on homepage Ends --> */}

                  {/* 
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
*/}

               </div>
            </div>

         </div>



      </Fragment>
   );
}

export default Home;