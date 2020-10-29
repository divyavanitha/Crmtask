import React, { Fragment, useState } from 'react';
import { withRouter, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import "./Gig.css";
import { getGigbyId } from "../../../../_actions/user.action";

import OwlCarousel from 'react-owl-carousel';


function GigDetail() {

    const dispatch = useDispatch();
    const params = useParams();

   useEffect(() => {
      
      dispatch(getGigbyId(params.gig))
   }, [params.gig]);
    const gig = useSelector((state) => state.user && state.user.gig_details && state.user.gig_details.responseData && state.user.gig_details.responseData.gig);
    console.log('gig',gig);

    return (

        <Fragment>


            <div className="mp-gig-top-nav">
                <nav>
                    <ul className="container text-center" id="mainNav">
                        <li className="selected">
                            <a href="#introduction" className="gig-page-nav-link">Introduction</a>
                        </li>
                        <li>
                            <a href="#details" className="gig-page-nav-link">Proposal Details</a>
                        </li>
                        <li>
                            <a href="#reviews" className="gig-page-nav-link">Reviews</a>
                        </li>
                        <li>
                            <a href="#related" className="gig-page-nav-link">Related Proposals</a>
                        </li>
                        <li className="btns d-none float-right">
                            <button className="order-now btn btn-secondary">
                                Order Now (&#036;<span className='total-price'>10.00</span>)
            </button>
                        </li>
                        <li className="btns d-none float-right">
                            <button className="add-to-cart btn btn-secondary">
                                <i className="fa fa-shopping-cart"></i>
               Add To Cart
            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="container mt-5" id="introduction">
                {/* <!-- Container starts --> */}
                <div className="row">
                    <div className="col-lg-8 col-md-7 mb-3">
                        {/* <!--- col-lg-8 col-md-7 mb-3 Starts ---> */}
                        <div className="wt-projectdetail-holder">
                            <div className="card rounded-0 mb-4 border-0 bg-none">
                                <div className="card-body details pt-0">
                                    <div className="proposal-info ">
                                        <h3>{gig && gig.title}</h3>
                                        <hr />
                                        <nav className="breadcrumbs h-text-truncate mb-2">
                                            <a href="../../">Home</a>
                                            <a href="../../categories/video-animation"> Video &amp; Animation </a>
                                            <a href="../../categories/video-animation/whiteboard-explainer-videos">
                                                Whiteboard & Explainer Videos          </a>
                                        </nav>
                                        <img className='mb-1' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='mb-1' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='mb-1' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='mb-1' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='mb-1' src={ require('../../../../assets/images/user_rate_blank.png')} />         <span className="text-muted span"> (22) &nbsp;309 Order(s) In Queue.</span>
                                        <div className="sharethis-inline-share-buttons  st-right  st-inline-share-buttons st-animated" style={{marginTop: "-36px"}} id="st-1"><div className="st-btn st-first" data-network="whatsapp" style={{display: "inline-block"}}>
                                            <img alt="whatsapp sharing button" src="https://platform-cdn.sharethis.com/img/whatsapp.svg" />

                                        </div><div className="st-btn" data-network="facebook" style={{display: "inline-block"}}>
                                                <img alt="facebook sharing button" src="https://platform-cdn.sharethis.com/img/facebook.svg" />

                                            </div><div className="st-btn" data-network="twitter" style={{display: "inline-block"}}>
                                                <img alt="twitter sharing button" src="https://platform-cdn.sharethis.com/img/twitter.svg" />

                                            </div><div className="st-btn" data-network="linkedin" style={{display: "inline-block"}}>
                                                <img alt="linkedin sharing button" src="https://platform-cdn.sharethis.com/img/linkedin.svg" />

                                            </div><div className="st-btn" data-network="pinterest" style={{display: "inline-block"}}>
                                                <img alt="pinterest sharing button" src="https://platform-cdn.sharethis.com/img/pinterest.svg" />

                                            </div><div className="st-btn st-last" data-network="sharethis" style={{display: "inline-block"}}>
                                                <img alt="sharethis sharing button" src="https://platform-cdn.sharethis.com/img/sharethis.svg" />

                                            </div></div>
                                    </div>

                                    <div id="myCarousel" className="carousel slide">
                                       
                                        <OwlCarousel className="carousel-inner" loop dots={true} autoplay={true} items={1} >
                                            
                                            {gig && gig.photo.map((list) => (<div className="row"><div className="carousel-item active"><a><img className="img-fluid d-block w-100" src={list.photo} alt="videosales-1.png" /></a>
                                               
                                                  
                                            </div></div>))}

                                         </OwlCarousel>
                                    </div>
                                    <div className="card mb-0 rounded-0 border-0">
                                        {/* <!-- card Starts --> */}
                                        <div className="card-body proposal-slider pb-0 pt-2 pl-0">
                                            {/* <!-- card-body Starts --> */}
                                            <div className="owl-carousel owl-theme">
                                                {/* <!--- owl-carousel owl-theme Starts ---> */}
                                                <div className="item active" data-position="0">
                                                    <a><img src="https://www.gigtodo.com/proposals/proposal_files/videosales-1.png" alt="videosales-1.png" /></a>
                                                </div>
                                                <div className="item" data-position="1">
                                                    <a>
                                                        <img src="https://www.gigtodo.com/proposals/proposal_files/videosales-2.jpg" alt="videosales-2.jpg" />
                                                    </a>
                                                </div>
                                                <div className="item" data-position="2">
                                                    <a>
                                                        <img src="https://www.gigtodo.com/proposals/proposal_files/videosales-3.jpg" alt="videosales-3.jpg" />
                                                    </a>
                                                </div>
                                            </div>
                                            {/* <!--- owl-carousel owl-theme Ends ---> */}
                                        </div>
                                        {/* <!-- card-body Ends --> */}
                                    </div>
                                    {/* <!-- card rounded-0 mb-3 Ends --> */}

                                </div>
                            </div>
                            <div className="card rounded-0 mb-1 " id="details">
                                <div className="card-header">
                                    <h4>About This Gig</h4>
                                </div>
                                <div className="card-body proposal-desc">
                                    <p>{gig && gig.description}</p>
                                    
                                </div>
                            </div>
                            <div className="card proposal-reviews rounded-0 mb-5" id="reviews">
                                <div className="card-header">
                                    <h4 className="mb-0 ">
                                        <div className="float-left">
                                            <span className="mr-2"> 22 Reviews </span>
                                            <img className='mb-2' src={ require('../../../../assets/images/user_rate_full_big.png')} />  <img className='mb-2' src={ require('../../../../assets/images/user_rate_full_big.png')} />  <img className='mb-2' src={ require('../../../../assets/images/user_rate_full_big.png')} />  <img className='mb-2' src={ require('../../../../assets/images/user_rate_full_big.png')} />  <img className='mb-2' src={ require('../../../../assets/images/user_rate_blank_big.png')} />  <span className="text-muted ml-2"> 4.8 </span>
                                        </div>
                                        <div className="float-right">
                                            <button id="dropdown-button" className="btn btn-success dropdown-toggle" data-toggle="dropdown">
                                                Most Recent        </button>
                                            <ul className="dropdown-menu proposalDropdown" style={{width: "auto !important"}}>
                                                <li className="dropdown-item active all">Most Recent</li>
                                                <li className="dropdown-item good">Positive Reviews</li>
                                                <li className="dropdown-item bad">Negative Reviews</li>
                                            </ul>
                                        </div>
                                    </h4>
                                </div>
                                <div className="card-body ">
                                    <article id="all" className="proposal-reviews">
                                        <ul className="reviews-list">
                                            <li className="star-rating-row">
                                                {/* <!-- star-rating-row Starts --> */}
                                                <span className="user-picture" >
                                                    {/* <!-- user-picture Starts --> */}
                                                    <img src={ require('../../../../assets/images/userlisting/img-02.jpg')}  width="60" height="60" />
                                                </span>
                                                {/* <!-- user-picture Ends --> */}
                                                <h4>
                                                    {/* <!-- h4 Starts --> */}
                                                    <a className="text-success" href="#" className="mr-1"> fixmywebsite </a>
                                                    <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />
                                                </h4>
                                                {/* <!-- h4 Ends --> */}
                                                <div className="msg-body">
                                                    {/* <!-- msg-body Starts --> */}
                                                </div>
                                                {/* <!-- msg-body Ends --> */}
                                                <span className="rating-date"> Aug 17 2020 </span>
                                            </li>
                                            {/* <!-- star-rating-row Ends --> */}
                                            <li className="star-rating-row">
                                                {/* <!-- star-rating-row Starts --> */}
                                                <span className="user-picture" >
                                                    {/* <!-- user-picture Starts --> */}
                                                    <img src={ require('../../../../assets/images/userlisting/img-02.jpg')}  width="60" height="60" />
                                                </span>
                                                {/* <!-- user-picture Ends --> */}
                                                <h4>
                                                    {/* <!-- h4 Starts --> */}
                                                    <a className="text-success" href="#" className="mr-1"> fixmywebsite </a>
                                                    <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />
                                                </h4>
                                                {/* <!-- h4 Ends --> */}
                                                <div className="msg-body">
                                                    {/* <!-- msg-body Starts --> */}
                             çok begendim mükemmel
                          </div>
                                                {/* <!-- msg-body Ends --> */}
                                                <span className="rating-date"> Aug 15 2020 </span>
                                            </li>
                                            {/* <!-- star-rating-row Ends --> */}
                                            <li className="star-rating-row">
                                                {/* <!-- star-rating-row Starts --> */}
                                                <span className="user-picture" >
                                                    {/* <!-- user-picture Starts --> */}
                                                    <img src={ require('../../../../assets/images/userlisting/img-02.jpg')}  width="60" height="60" />
                                                </span>
                                                {/* <!-- user-picture Ends --> */}
                                                <h4>
                                                    {/* <!-- h4 Starts --> */}
                                                    <a className="text-success" href="#" className="mr-1"> fixmywebsite </a>
                                                    <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />
                                                </h4>
                                                {/* <!-- h4 Ends --> */}
                                                <div className="msg-body">
                                                    {/* <!-- msg-body Starts --> */}
                             gret, thanks
                          </div>
                                                {/* <!-- msg-body Ends --> */}
                                                <span className="rating-date"> Jun 21 2020 </span>
                                            </li>
                                            {/* <!-- star-rating-row Ends --> */}
                                            <li className="star-rating-row">
                                                {/* <!-- star-rating-row Starts --> */}
                                                <span className="user-picture" >
                                                    {/* <!-- user-picture Starts --> */}
                                                    <img src={ require('../../../../assets/images/userlisting/img-01.jpg')}  width="60" height="60" />
                                                </span>
                                                {/* <!-- user-picture Ends --> */}
                                                <h4>
                                                    {/* <!-- h4 Starts --> */}
                                                    <a className="text-success" href="#" className="mr-1"> volarex </a>
                                                    <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />
                                                </h4>
                                                {/* <!-- h4 Ends --> */}
                                                <div className="msg-body">
                                                    {/* <!-- msg-body Starts --> */}
                                                </div>
                                                {/* <!-- msg-body Ends --> */}
                                                <span className="rating-date"> Jun 04 2020 </span>
                                            </li>
                                            {/* <!-- star-rating-row Ends --> */}
                                            <li className="star-rating-row">
                                                {/* <!-- star-rating-row Starts --> */}
                                                <span className="user-picture" >
                                                    {/* <!-- user-picture Starts --> */}
                                                    <img src={ require('../../../../assets/images/userlisting/img-06.jpg')}  width="60" height="60" />
                                                </span>
                                                {/* <!-- user-picture Ends --> */}
                                                <h4>
                                                    {/* <!-- h4 Starts --> */}
                                                    <a className="text-success" href="#" className="mr-1"> shoail </a>
                                                    <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={ require('../../../../assets/images/user_rate_full.png')} />
                                                </h4>
                                                {/* <!-- h4 Ends --> */}
                                                <div className="msg-body">
                                                    {/* <!-- msg-body Starts --> */}
                             shit
                          </div>
                                                {/* <!-- msg-body Ends --> */}
                                                <span className="rating-date"> May 29 2020 </span>
                                            </li>
                                            {/* <!-- star-rating-row Ends --> */}


                                        </ul>
                                        {/* <!-- reviews-list Ends --> */}
                                    </article>
                                    {/* <!-- proposal-reviews Ends --> */}

                                </div>
                            </div>
                            <div className="proposal-tags-container mt-2 ">
                                {/* <!--- proposal-tags-container Starts ---> */}
                                <div className="proposal-tag mb-3" ><a href="../../tags/explainer-video"><span>explainer video</span></a></div>
                                <div className="proposal-tag mb-3" ><a href="../../tags/-whiteboard-animation"><span> whiteboard animation</span></a></div>
                                <div className="proposal-tag mb-3" ><a href="../../tags/-sales-video"><span> sales video</span></a></div>
                                <div className="proposal-tag mb-3" ><a href="../../tags/-Animated-video"><span> Animated video</span></a></div>
                                <div className="proposal-tag mb-3" ><a href="../../tags/-video-marketing"><span> video marketing</span></a></div>
                                <div className="proposal-tag mb-3" ><a href="../../tags/-video"><span> video</span></a></div>
                            </div>
                            {/* <!--- proposal-tags-container Ends ---> */}
                        </div>

                    </div>
                    {/* <!--- col-lg-8 col-md-7 mb-3 Ends ---> */}
                    <div className="col-lg-4 col-md-5 proposal-sidebar">
                        {/* <!-- Col starts --> */}
                        <div className="card mb-5">
                            <div className="card-body order-box tab-content">
                                {/* <!--- card-body Starts ---> */}
                                <div className="purchase-form">
                                    <form encType="multipart/form-data">
                                        <input type="hidden" name="proposal_id" value="4" />
                                        <input type="hidden" name="proposal_qty" value="1" />
                                        <div className="header">
                                            <span className="text ">
                                            <span className="dropdown" tabindex="0" data-toggle="popover" data-placement="bottom" data-html="true" data-content="<div className='card border-0'>
                                          <div className='card-body pb-3'>
                                          <h5 className='font-weight-normal mb-3'><strong>How it works</strong> <span className='badge badge-success badge-sm'>SITE RULE</span> </h5>
                                          <div className='price'>
                                            <b className='currency'>&#036;<span>10</span></b>
                                          </div>
                                          <p className='h6 line-height-full'>This is the base price. Unless you agree otherwise with seller, the delivered work will be as detailed on this page. Ordering extras may extend the delivery time.</p>
                                          </div>
                                          </div>
                                          <script>
                                          var order_box = $('.order-box');
                                          $('.popover').css({ 'max-width' : order_box.width() + 'px', left : '155px' });
                                          </script>
                                          ">Order Details</span>
                                                <a href="#" className="secure ml-2">

                                                </a>
                                                <a href="#" id="favorite_4" className="favorite ml-2">
                                                    <i className="fa fa-heart dil1" data-toggle="tooltip" data-placement="top" title="Favorites"></i>
                                                </a>
                                            </span>
                                            <div className="price ">
                                                <b className="currency">
                                                    &#036;<span className='total-price'>10.00</span>      </b>
                                                <br />
                                                <span className="total-price-num d-none">10</span>
                                            </div>
                                        </div>
                                        <hr className="mt-0" />
                                            <div className="row">
                                                <div className="col-12 ml-2 p-2">
                                                    <h6 className="mb-0 ">
                                                        <i className="fa fa-clock-o"></i> 1 Day Delivery
                                                        &nbsp;&nbsp;
                                                        <span className="float-right mr-4">
                                                            <i className="fa fa-refresh"></i>
                                                            Revisions
                                                        </span>
                                                    </h6>
                                                </div>
                                            </div>
                                            <hr />
                                            <li className="basket-item mb-4">
                                                <span className="item "><span className="name"><span>Quantity:</span></span></span>
                                                <div className="quantity-control ">
                                                    <div className="increase ">
                                                    <button>+</button>
                                                    </div>
                                                    <span className="quantity ">1</span>
                                                    <div className="decrease ">
                                                    <button>-</button>
                                                    </div>
                                                </div>
                                                {/* <!-- &#036;<span className="total-price">10</span>.00 --> */}
                                            </li>
                                            <button type="submit" name="add_cart" value="1" className="btn btn-order primary mb-3">
                                                <i className="fa fa-shopping-cart"></i> &nbsp;<strong>Add to Cart</strong>
                                            </button>
                                            <button type="submit" name="add_order" value="1" className="btn btn-order">
                                                {/* <!-- <strong>Order Now (&#036;<span className="total-price">10</span>)</strong> --> */}
                                                <strong>Order Now (&#036;<span className='total-price'>10.00</span>)</strong>
                                            </button>
                                          </form>
                                       </div>
                                </div>
                                {/* <!--- card-body Ends ---> */}
                            </div>
                            <div className="card seller-bio mb-3 rounded-0">
                                <div className="card-body ">
                                    <center className="mb-4">
                                        <img src={ require('../../../../assets/images/userlisting/img-06.jpg')}  width="100" className="rounded-circle" />
                                    </center>
                                    <h3 className="text-center h3">
                                        <a className="text-success" href={gig && gig.user.firstName} >
                                            {gig && gig.user.firstName} {gig && gig.user.lastName}  </a> <span className="divider"> </span> <span className="text-muted">Level Two</span>
                                    </h3>
                                    <a href="../../conversations/message?seller_id=2" className="btn btn-lg btn-block btn-success rounded-0">Message me</a>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className="text-muted"><i className="fa fa-check pr-1"></i> From</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p> Ecuador</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="text-muted"><i className="fa fa-check pr-1"></i>  Speaks</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>
                                                <span>English </span>
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="text-muted"><i className="fa fa-check pr-1"></i>  Positive Reviews</p>
                                            <p className="text-muted"><i className="fa fa-check pr-1"></i> Recent Delivery</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p> 7% </p>
                                            <p> July 31, 2020 </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <p className="text-left "> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here. </p>
                                    <a href="../../mir_digimarket" className="text-success"> Read More </a>
                                </div>
                            </div>

                        </div>
                        {/* <!-- Col ends --> */}
                    </div>
                </div>
            


        </Fragment>
    );
}

export default GigDetail;