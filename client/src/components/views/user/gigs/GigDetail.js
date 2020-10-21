import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import "./Gig.css";

function GigDetail() {


    return (

        <React.Fragment>


            <div class="mp-gig-top-nav">
                <nav>
                    <ul class="container text-center" id="mainNav">
                        <li class="selected">
                            <a href="#introduction" class="gig-page-nav-link">Introduction</a>
                        </li>
                        <li>
                            <a href="#details" class="gig-page-nav-link">Proposal Details</a>
                        </li>
                        <li>
                            <a href="#reviews" class="gig-page-nav-link">Reviews</a>
                        </li>
                        <li>
                            <a href="#related" class="gig-page-nav-link">Related Proposals</a>
                        </li>
                        <li class="btns d-none float-right">
                            <button class="order-now btn btn-secondary">
                                Order Now (&#036;<span class='total-price'>10.00</span>)
            </button>
                        </li>
                        <li class="btns d-none float-right">
                            <button class="add-to-cart btn btn-secondary">
                                <i class="fa fa-shopping-cart"></i>
               Add To Cart
            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            <div class="container mt-5" id="introduction">
                {/* <!-- Container starts --> */}
                <div class="row">
                    <div class="col-lg-8 col-md-7 mb-3">
                        {/* <!--- col-lg-8 col-md-7 mb-3 Starts ---> */}
                        <div class="wt-projectdetail-holder">
                            <div class="card rounded-0 mb-4 border-0 bg-none">
                                <div class="card-body details pt-0">
                                    <div class="proposal-info ">
                                        <h3>I Will Create A Professional Custom Explainer Video</h3>
                                        <hr />
                                        <nav class="breadcrumbs h-text-truncate mb-2">
                                            <a href="../../">Home</a>
                                            <a href="../../categories/video-animation"> Video &amp; Animation </a>
                                            <a href="../../categories/video-animation/whiteboard-explainer-videos">
                                                Whiteboard & Explainer Videos          </a>
                                        </nav>
                                        <img class='mb-1' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='mb-1' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='mb-1' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='mb-1' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='mb-1' src={ require('../../../../assets/images/user_rate_blank.png')} />         <span class="text-muted span"> (22) &nbsp;309 Order(s) In Queue.</span>
                                        <div class="sharethis-inline-share-buttons  st-right  st-inline-share-buttons st-animated" style={{marginTop: "-36px"}} id="st-1"><div class="st-btn st-first" data-network="whatsapp" style={{display: "inline-block"}}>
                                            <img alt="whatsapp sharing button" src="https://platform-cdn.sharethis.com/img/whatsapp.svg" />

                                        </div><div class="st-btn" data-network="facebook" style={{display: "inline-block"}}>
                                                <img alt="facebook sharing button" src="https://platform-cdn.sharethis.com/img/facebook.svg" />

                                            </div><div class="st-btn" data-network="twitter" style={{display: "inline-block"}}>
                                                <img alt="twitter sharing button" src="https://platform-cdn.sharethis.com/img/twitter.svg" />

                                            </div><div class="st-btn" data-network="linkedin" style={{display: "inline-block"}}>
                                                <img alt="linkedin sharing button" src="https://platform-cdn.sharethis.com/img/linkedin.svg" />

                                            </div><div class="st-btn" data-network="pinterest" style={{display: "inline-block"}}>
                                                <img alt="pinterest sharing button" src="https://platform-cdn.sharethis.com/img/pinterest.svg" />

                                            </div><div class="st-btn st-last" data-network="sharethis" style={{display: "inline-block"}}>
                                                <img alt="sharethis sharing button" src="https://platform-cdn.sharethis.com/img/sharethis.svg" />

                                            </div></div>
                                    </div>

                                    <div id="myCarousel" class="carousel slide">
                                        <ol class="carousel-indicators">
                                            <li data-target="#myCarousel" data-slide-to="1" class='active'></li>
                                            <li data-target="#myCarousel" data-slide-to="2"></li>
                                            <li data-target="#myCarousel" data-slide-to="3"></li>
                                        </ol>
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <img class="d-block w-100" src="https://www.gigtodo.com/proposals/proposal_files/videosales-1.png" />
                                                <div data-action="img-1" class="slide-fullscreen">Full Screen</div>
                                            </div>
                                            <div class="carousel-item">
                                                <img class="d-block w-100" src="https://www.gigtodo.com/proposals/proposal_files/videosales-2.jpg" />
                                                <div data-action="img-2" class="slide-fullscreen">Full Screen</div>
                                            </div>
                                            <div class="carousel-item">
                                                {/* <!-- carousel-item Starts --> */}
                                                <img class="d-block w-100" src="https://www.gigtodo.com/proposals/proposal_files/videosales-3.jpg" />
                                                <div data-action="img-3" class="slide-fullscreen">Full Screen</div>
                                            </div>
                                            {/* <!-- carousel-item Ends --> */}
                                        </div>
                                        <a class="carousel-control-prev slide-nav slide-right" href="#myCarousel" data-slide="prev">
                                            {/* <!--<span class="carousel-control-prev-icon carousel-icon"></span>--> */}
                                            <i class="fa fa-angle-left"></i>
                                        </a>
                                        <a class="carousel-control-next slide-nav slide-left" href="#myCarousel" data-slide="next">
                                            {/* <!--<span class="carousel-control-next-icon carousel-icon"></span>--> */}
                                            <i class="fa fa-angle-right"></i>
                                        </a>
                                    </div>
                                    <div class="card mb-0 rounded-0 border-0">
                                        {/* <!-- card Starts --> */}
                                        <div class="card-body proposal-slider pb-0 pt-2 pl-0">
                                            {/* <!-- card-body Starts --> */}
                                            <div class="owl-carousel owl-theme">
                                                {/* <!--- owl-carousel owl-theme Starts ---> */}
                                                <div class="item active" data-position="0">
                                                    <a><img src="https://www.gigtodo.com/proposals/proposal_files/videosales-1.png" alt="videosales-1.png" /></a>
                                                </div>
                                                <div class="item" data-position="1">
                                                    <a>
                                                        <img src="https://www.gigtodo.com/proposals/proposal_files/videosales-2.jpg" alt="videosales-2.jpg" />
                                                    </a>
                                                </div>
                                                <div class="item" data-position="2">
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
                            <div class="card rounded-0 mb-1 " id="details">
                                <div class="card-header">
                                    <h4>About This Gig</h4>
                                </div>
                                <div class="card-body proposal-desc">
                                    <p>Let's Work Together To Create The Perfect Explainer/Sales/Whiteboard Video for your business</p>
                                    <p>Whether it's a simple whiteboard animation to explain a product or service, or a sales kinetic typography lyric video, this gig have you covered!</p>
                                    <p>The prices listed are per 30,60,90 seconds.</p>
                                    <p>Bringing your idea to life with world-class custom animation at a most affordable price.</p>
                                </div>
                            </div>
                            <div class="card proposal-reviews rounded-0 mb-5" id="reviews">
                                <div class="card-header">
                                    <h4 class="mb-0 ">
                                        <div class="float-left">
                                            <span class="mr-2"> 22 Reviews </span>
                                            <img class='mb-2' src={ require('../../../../assets/images/user_rate_full_big.png')} />  <img class='mb-2' src={ require('../../../../assets/images/user_rate_full_big.png')} />  <img class='mb-2' src={ require('../../../../assets/images/user_rate_full_big.png')} />  <img class='mb-2' src={ require('../../../../assets/images/user_rate_full_big.png')} />  <img class='mb-2' src={ require('../../../../assets/images/user_rate_blank_big.png')} />  <span class="text-muted ml-2"> 4.8 </span>
                                        </div>
                                        <div class="float-right">
                                            <button id="dropdown-button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">
                                                Most Recent        </button>
                                            <ul class="dropdown-menu proposalDropdown" style={{width: "auto !important"}}>
                                                <li class="dropdown-item active all">Most Recent</li>
                                                <li class="dropdown-item good">Positive Reviews</li>
                                                <li class="dropdown-item bad">Negative Reviews</li>
                                            </ul>
                                        </div>
                                    </h4>
                                </div>
                                <div class="card-body ">
                                    <article id="all" class="proposal-reviews">
                                        <ul class="reviews-list">
                                            <li class="star-rating-row">
                                                {/* <!-- star-rating-row Starts --> */}
                                                <span class="user-picture" >
                                                    {/* <!-- user-picture Starts --> */}
                                                    <img src={ require('../../../../assets/images/userlisting/img-02.jpg')}  width="60" height="60" />
                                                </span>
                                                {/* <!-- user-picture Ends --> */}
                                                <h4>
                                                    {/* <!-- h4 Starts --> */}
                                                    <a class="text-success" href="#" class="mr-1"> fixmywebsite </a>
                                                    <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />
                                                </h4>
                                                {/* <!-- h4 Ends --> */}
                                                <div class="msg-body">
                                                    {/* <!-- msg-body Starts --> */}
                                                </div>
                                                {/* <!-- msg-body Ends --> */}
                                                <span class="rating-date"> Aug 17 2020 </span>
                                            </li>
                                            {/* <!-- star-rating-row Ends --> */}
                                            <li class="star-rating-row">
                                                {/* <!-- star-rating-row Starts --> */}
                                                <span class="user-picture" >
                                                    {/* <!-- user-picture Starts --> */}
                                                    <img src={ require('../../../../assets/images/userlisting/img-02.jpg')}  width="60" height="60" />
                                                </span>
                                                {/* <!-- user-picture Ends --> */}
                                                <h4>
                                                    {/* <!-- h4 Starts --> */}
                                                    <a class="text-success" href="#" class="mr-1"> fixmywebsite </a>
                                                    <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />
                                                </h4>
                                                {/* <!-- h4 Ends --> */}
                                                <div class="msg-body">
                                                    {/* <!-- msg-body Starts --> */}
                             çok begendim mükemmel
                          </div>
                                                {/* <!-- msg-body Ends --> */}
                                                <span class="rating-date"> Aug 15 2020 </span>
                                            </li>
                                            {/* <!-- star-rating-row Ends --> */}
                                            <li class="star-rating-row">
                                                {/* <!-- star-rating-row Starts --> */}
                                                <span class="user-picture" >
                                                    {/* <!-- user-picture Starts --> */}
                                                    <img src={ require('../../../../assets/images/userlisting/img-02.jpg')}  width="60" height="60" />
                                                </span>
                                                {/* <!-- user-picture Ends --> */}
                                                <h4>
                                                    {/* <!-- h4 Starts --> */}
                                                    <a class="text-success" href="#" class="mr-1"> fixmywebsite </a>
                                                    <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />
                                                </h4>
                                                {/* <!-- h4 Ends --> */}
                                                <div class="msg-body">
                                                    {/* <!-- msg-body Starts --> */}
                             gret, thanks
                          </div>
                                                {/* <!-- msg-body Ends --> */}
                                                <span class="rating-date"> Jun 21 2020 </span>
                                            </li>
                                            {/* <!-- star-rating-row Ends --> */}
                                            <li class="star-rating-row">
                                                {/* <!-- star-rating-row Starts --> */}
                                                <span class="user-picture" >
                                                    {/* <!-- user-picture Starts --> */}
                                                    <img src={ require('../../../../assets/images/userlisting/img-01.jpg')}  width="60" height="60" />
                                                </span>
                                                {/* <!-- user-picture Ends --> */}
                                                <h4>
                                                    {/* <!-- h4 Starts --> */}
                                                    <a class="text-success" href="#" class="mr-1"> volarex </a>
                                                    <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />
                                                </h4>
                                                {/* <!-- h4 Ends --> */}
                                                <div class="msg-body">
                                                    {/* <!-- msg-body Starts --> */}
                                                </div>
                                                {/* <!-- msg-body Ends --> */}
                                                <span class="rating-date"> Jun 04 2020 </span>
                                            </li>
                                            {/* <!-- star-rating-row Ends --> */}
                                            <li class="star-rating-row">
                                                {/* <!-- star-rating-row Starts --> */}
                                                <span class="user-picture" >
                                                    {/* <!-- user-picture Starts --> */}
                                                    <img src={ require('../../../../assets/images/userlisting/img-06.jpg')}  width="60" height="60" />
                                                </span>
                                                {/* <!-- user-picture Ends --> */}
                                                <h4>
                                                    {/* <!-- h4 Starts --> */}
                                                    <a class="text-success" href="#" class="mr-1"> shoail </a>
                                                    <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />  <img class='rating' src={ require('../../../../assets/images/user_rate_full.png')} />
                                                </h4>
                                                {/* <!-- h4 Ends --> */}
                                                <div class="msg-body">
                                                    {/* <!-- msg-body Starts --> */}
                             shit
                          </div>
                                                {/* <!-- msg-body Ends --> */}
                                                <span class="rating-date"> May 29 2020 </span>
                                            </li>
                                            {/* <!-- star-rating-row Ends --> */}


                                        </ul>
                                        {/* <!-- reviews-list Ends --> */}
                                    </article>
                                    {/* <!-- proposal-reviews Ends --> */}

                                </div>
                            </div>
                            <div class="proposal-tags-container mt-2 ">
                                {/* <!--- proposal-tags-container Starts ---> */}
                                <div class="proposal-tag mb-3" ><a href="../../tags/explainer-video"><span>explainer video</span></a></div>
                                <div class="proposal-tag mb-3" ><a href="../../tags/-whiteboard-animation"><span> whiteboard animation</span></a></div>
                                <div class="proposal-tag mb-3" ><a href="../../tags/-sales-video"><span> sales video</span></a></div>
                                <div class="proposal-tag mb-3" ><a href="../../tags/-Animated-video"><span> Animated video</span></a></div>
                                <div class="proposal-tag mb-3" ><a href="../../tags/-video-marketing"><span> video marketing</span></a></div>
                                <div class="proposal-tag mb-3" ><a href="../../tags/-video"><span> video</span></a></div>
                            </div>
                            {/* <!--- proposal-tags-container Ends ---> */}
                        </div>

                    </div>
                    {/* <!--- col-lg-8 col-md-7 mb-3 Ends ---> */}
                    <div class="col-lg-4 col-md-5 proposal-sidebar">
                        {/* <!-- Col starts --> */}
                        <div class="card mb-5">
                            <div class="card-body order-box tab-content">
                                {/* <!--- card-body Starts ---> */}
                                <div class="purchase-form">
                                    <form action="../../checkout" id="checkoutForm" method="post">
                                        <input type="hidden" name="proposal_id" value="4" />
                                        <input type="hidden" name="proposal_qty" value="1" />
                                        <div class="header">
                                            <span class="text ">
                                                <span class="dropdown" tabindex="0" data-toggle="popover" data-placement="bottom" data-html="true" data-content="<div class='card border-0'>
                              <div class='card-body pb-3'>
                              <h5 class='font-weight-normal mb-3'><strong>How it works</strong> <span class='badge badge-success badge-sm'>SITE RULE</span> </h5>
                              <div class='price'>
                              <b class='currency'>&#036;<span>10</span></b>
                              </div>
                              <p class='h6 line-height-full'>This is the base price. Unless you agree otherwise with seller, the delivered work will be as detailed on this page. Ordering extras may extend the delivery time.</p>
                              </div>
                              </div>
                              <script>
                              var order_box = $('.order-box');
                              $('.popover').css({ 'max-width' : order_box.width() + 'px', left : '155px' });
                              </script>
                              ">Order Details</span>
                                                <a href="#" class="secure ml-2">

                                                </a>
                                                <a href="#" id="favorite_4" class="favorite ml-2">
                                                    <i class="fa fa-heart dil1" data-toggle="tooltip" data-placement="top" title="Favorites"></i>
                                                </a>
                                            </span>
                                            <div class="price ">
                                                <b class="currency">
                                                    &#036;<span class='total-price'>10.00</span>      </b>
                                                <br />
                                                <span class="total-price-num d-none">10</span>
                                            </div>
                                        </div>
                                        <hr class="mt-0" />
                                            <div class="row">
                                                <div class="col-12 ml-2 p-2">
                                                    <h6 class="mb-0 ">
                                                        <i class="fa fa-clock-o"></i> 1 Day Delivery
                              &nbsp;&nbsp;
                              <span class="float-right mr-4">
                                                            <i class="fa fa-refresh"></i>
                              Revisions
                              </span>
                                                    </h6>
                                                </div>
                                            </div>
                                            <hr />
                                            <li class="basket-item mb-4">
                                                <span class="item "><span class="name"><span>Quantity:</span></span></span>
                                                <div class="quantity-control ">
                                                    <div class="increase ">
<button>+</button>
                                                    </div>
                                                    <span class="quantity ">1</span>
                                                    <div class="decrease ">
                                                    <button>-</button>
                                                    </div>
                                                </div>
                                                {/* <!-- &#036;<span class="total-price">10</span>.00 --> */}
                                            </li>
                                            <button type="submit" name="add_cart" value="1" class="btn btn-order primary mb-3">
                                                <i class="fa fa-shopping-cart"></i> &nbsp;<strong>Add to Cart</strong>
                                            </button>
                                            <button type="submit" name="add_order" value="1" class="btn btn-order">
                                                {/* <!-- <strong>Order Now (&#036;<span class="total-price">10</span>)</strong> --> */}
                                                <strong>Order Now (&#036;<span class='total-price'>10.00</span>)</strong>
                                            </button>
                  </form>
               </div>
                                </div>
                                {/* <!--- card-body Ends ---> */}
                            </div>
                            <div class="card seller-bio mb-3 rounded-0">
                                <div class="card-body ">
                                    <center class="mb-4">
                                        <img src={ require('../../../../assets/images/userlisting/img-06.jpg')}  width="100" class="rounded-circle" />
                                    </center>
                                    <h3 class="text-center h3">
                                        <a class="text-success" href="../../mir_digimarket" >
                                            Mir_digimarket  </a> <span class="divider"> </span> <span class="text-muted">Level Two</span>
                                    </h3>
                                    <a href="../../conversations/message?seller_id=2" class="btn btn-lg btn-block btn-success rounded-0">Message me</a>
                                    <hr />
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p class="text-muted"><i class="fa fa-check pr-1"></i> From</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p> Ecuador</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p class="text-muted"><i class="fa fa-check pr-1"></i>  Speaks</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p>
                                                <span>English </span>
                                            </p>
                                        </div>
                                        <div class="col-md-6">
                                            <p class="text-muted"><i class="fa fa-check pr-1"></i>  Positive Reviews</p>
                                            <p class="text-muted"><i class="fa fa-check pr-1"></i> Recent Delivery</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p> 7% </p>
                                            <p> July 31, 2020 </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <p class="text-left "> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here. </p>
                                    <a href="../../mir_digimarket" class="text-success"> Read More </a>
                                </div>
                            </div>

                        </div>
                        {/* <!-- Col ends --> */}
                    </div>
                </div>
            


        </React.Fragment>
    );
}

export default GigDetail;