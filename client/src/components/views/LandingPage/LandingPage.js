import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu } from "../../../_actions/user_actions";
/* import Sidebar from "../Includes/Sidebar";
import Footer from "../Includes/Footer" */



import OwlCarousel from 'react-owl-carousel';



function App() {

   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getMenu());

   }, []);
   const user = useSelector((state) => state.user);

   const menu = useSelector((state) => state.menu);
   const result = menu && menu.menu.responseData && menu.menu.responseData.menus;


   return (

      <React.Fragment>

         <div id="gnav-header" className="gnav-header global-nav clear gnav-3">
            <header id="gnav-header-inner" className="gnav-header-inner clear apply-nav-height col-group has-svg-icons body-max-width">
               <div className="col-xs-12">
                  <div id="onePress-logo" className="apply-nav-height onePress-logo-svg onePress-logo-svg-logged-in loggedInLogo">
                     <a href="">
                        <img className="desktop" src={require('../../../images/1press-logo.png')} width="150" />
                        {/* <img className="mobile" src={ require('../../../images/1press-logo.png') } height="25" /> */}
                     </a>
                  </div>
                  <button id="mobilemenu"
                     className="unstyled-button mobile-catnav-trigger apply-nav-height icon-b-1 tablet-catnav-enabled ">
                     <span className="screen-reader-only"></span>
                     <div className="text-gray-lighter text-body-larger">
                        <span className="onePress-icon hamburger-icon nav-icon">
                           <i className="fa fa-bars" aria-hidden="true"></i>
                        </span>
                     </div>
                  </button>
                  <div className="catnav-search-bar search-browse-wrapper with-catnav">
                     <div className="search-browse-inner">
                        <form id="gnav-search" className="search-nav expanded-search apply-nav-height" method="post">
                           <div className="gnav-search-inner clearable">
                              <label htmlFor="search-query" className="screen-reader-only">Search for items</label>
                              <div className="search-input-wrapper text-field-wrapper">
                                 <input id="search-query" className="rounded" name="search_query" placeholder="Find Services" value="" autoComplete="off" />
                              </div>
                              <div className="search-button-wrapper hide">
                                 <button className="btn btn-primary" name="search" type="submit" value="Search">
                                    <i className="fa fa-search"></i> </button>
                              </div>
                           </div>
                           <ul className="search-bar-panel d-none"></ul>
                        </form>
                     </div>
                  </div>
                  <ul className="account-nav apply-nav-height">
                     <li className="logged-in-link d-none d-sm-block d-md-block d-lg-block">
                        <a className="menuItem" href="" title="Blog">
                           <span className="onePress-icon nav-icon onePress-icon-relative">
                              <i className="fa fa-rss fa-lg" style={{ fontSize: "1.4em" }}></i>
                           </span>
                        </a>
                     </li>
                     <li className="logged-in-link">
                        <a className="menuItem" href="cart" title="Cart">
                           <span className="onePress-icon nav-icon onePress-icon-relative">
                              <i className="fa fa-envelope-o" style={{ fontSize: "1.4em" }} aria-hidden="true"></i>
                           </span>
                           <span className="total-user-count count">1</span>
                        </a>
                     </li>
                     <li className="logged-in-link">
                        <div className="dropdown user-menu">
                           <a href="#" id="usermenu" className="user dropdown-toggle menuItem" style={{ marginTop: "17px" }}
                              className="dropdown-toggle" data-toggle="dropdown">
                              <img src={require('../../../images/userlisting/img-03.jpg')} width="27" height="27" className="rounded-circle" />
                              <span className="name">tyrone</span>
                           </a>
                           <div className="dropdown-menu " style={{ minWidth: "200px", width: "auto!important", zIndex: "2000" }}>
                              <a className="dropdown-item" href="dashboard">
                                 Dashboard </a>
                              <a className="dropdown-item dropdown-toggle" href="#" data-toggle="collapse" data-target="#selling">
                                 Selling </a>
                              <div id="selling" className="dropdown-submenu collapse">
                                 <a className="dropdown-item" href="selling_orders">
                                    Orders </a>
                                 <a className="dropdown-item" href="proposals/view_proposals">
                                    My Proposals </a>
                                 <a className="dropdown-item" href="proposals/create_coupon">
                                    Create A Coupon </a>
                                 <a className="dropdown-item" href="requests/buyer_requests">
                                    Buyer Requests </a>
                                 <a className="dropdown-item" href="revenue">
                                    Revenues </a>
                                 <a className="dropdown-item" href="withdrawal_requests">
                                    Withdrawal Requests </a>
                              </div>
                              <a className="dropdown-item dropdown-toggle" href="#" data-toggle="collapse" data-target="#buying">
                                 Buying </a>
                              <div id="buying" className="dropdown-submenu collapse">
                                 <a className="dropdown-item" href="buying_orders">
                                    Orders </a>
                                 <a className="dropdown-item" href="purchases">
                                    Purchases </a>
                                 <a className="dropdown-item" href="favorites">
                                    Favorites </a>
                              </div>
                              <a className="dropdown-item dropdown-toggle" href="#" data-toggle="collapse"
                                 data-target="#requests">
                                 Requests </a>
                              <div id="requests" className="dropdown-submenu collapse">
                                 <a className="dropdown-item" href="requests/post_request">
                                    Post A Request </a>
                                 <a className="dropdown-item" href="requests/manage_requests">
                                    Manage Requests </a>
                              </div>
                              <a className="dropdown-item dropdown-toggle" href="#" data-toggle="collapse"
                                 data-target="#contacts">
                                 Contacts </a>
                              <div id="contacts" className="dropdown-submenu collapse">
                                 <a className="dropdown-item" href="manage_contacts?my_buyers">
                                    My Buyers </a>
                                 <a className="dropdown-item" href="manage_contacts?my_sellers">
                                    My Sellers </a>
                              </div>
                              <a className="dropdown-item dropdown-toggle" href="#" data-toggle="collapse"
                                 data-target="#referrals">
                                 My Referrals </a>
                              <div id="referrals" className="dropdown-submenu collapse">
                                 <a className="dropdown-item" href="my_referrals" data-target="#referrals">
                                    User Referrals </a>
                                 <a className="dropdown-item" href="proposal_referrals" data-target="#referrals">
                                    Proposal Referrals </a>
                              </div>
                              <a className="dropdown-item" href="conversations/inbox">
                                 Inbox Messages </a>
                              <a className="dropdown-item" href="tyrone">
                                 My Profile </a>
                              <a className="dropdown-item dropdown-toggle" href="#" data-toggle="collapse"
                                 data-target="#settings">
                                 Settings </a>
                              <div id="settings" className="dropdown-submenu collapse">
                                 <a className="dropdown-item" href="settings?profile_settings">
                                    Profile Settings </a>
                                 <a className="dropdown-item" href="settings?account_settings">
                                    Account Settings </a>
                              </div>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="logout">
                                 Logout </a>
                           </div>
                        </div>
                     </li>
                     {/* {/* <!-- <li className="logged-in-link mr-lg-0 mr-2 d-none d-sm-block d-md-block d-lg-block">
                     <a className="menuItem btn btn-success text-white">&#036;-10.00</a>
                     </li> --> */}
                  </ul>
               </div>
            </header>
         </div>
         <div className="clearfix"></div>


         <div data-ui="cat-nav" id="desktop-category-nav" className="ui-toolkit cat-nav ">
            <div className="bg-transparent-homepage-experiment hide-xs hide-sm hide-md">
               <div className="col-group body-max-width">
                  <ul className="col-xs-12 body-max-width display-flex-xs justify-content-space-between" role="menubar"
                     data-ui="top-nav-category-list" aria-activedescendant="catnav-primary-link-10855">
                     <li className="top-nav-item pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 display-flex-xs align-items-center text-center"
                        data-linkable="true" data-ui="top-nav-category-link" data-node-id="c-1">
                        <a href="categories/graphics-design">
                           Graphics &amp; Design </a>
                     </li>
                     <li className="top-nav-item pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 display-flex-xs align-items-center text-center"
                        data-linkable="true" data-ui="top-nav-category-link" data-node-id="c-2">
                        <a href="categories/digital-marketing">
                           Digital Marketing </a>
                     </li>
                     <li className="top-nav-item pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 display-flex-xs align-items-center text-center"
                        data-linkable="true" data-ui="top-nav-category-link" data-node-id="c-3">
                        <a href="categories/writing-translation">
                           Writing & Translation </a>
                     </li>
                     <li className="top-nav-item pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 display-flex-xs align-items-center text-center"
                        data-linkable="true" data-ui="top-nav-category-link" data-node-id="c-4">
                        <a href="categories/video-animation">
                           Video &amp; Animation </a>
                     </li>
                     <li className="top-nav-item pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 display-flex-xs align-items-center text-center"
                        data-linkable="true" data-ui="top-nav-category-link" data-node-id="c-6">
                        <a href="categories/programming-tech">
                           Programming &amp; Tech </a>
                     </li>
                     <li className="top-nav-item pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 display-flex-xs align-items-center text-center"
                        data-linkable="true" data-ui="top-nav-category-link" data-node-id="c-7">
                        <a href="categories/business">
                           Business
                  </a>
                     </li>
                     <li className="top-nav-item pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 display-flex-xs align-items-center text-center"
                        data-linkable="true" data-ui="top-nav-category-link" data-node-id="c-8">
                        <a href="categories/fun-lifestyle">
                           Fun & Lifestyle
                  </a>
                     </li>
                     <li className="top-nav-item pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 display-flex-xs align-items-center text-center"
                        data-linkable="true" data-ui="top-nav-category-link" data-node-id="c-9">
                        <a href="categories/music-audio">
                           Music & Audio </a>
                     </li>
                     <li className="top-nav-item pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 display-flex-xs align-items-center text-center"
                        data-linkable="true" data-ui="top-nav-category-link" data-node-id="c-10">
                        <a href="categories/video-category">
                           Video Tutorials </a>
                     </li>
                     <li className="top-nav-item pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 display-flex-xs align-items-center text-center"
                        data-linkable="true" data-ui="top-nav-category-link" data-node-id="c-more">
                        <a href="#">More</a>
                     </li>
                  </ul>
               </div>
            </div>
            <div className="position-absolute col-xs-12 col-centered z-index-4">
               <div>
                  <div
                     className="body-sub-width vertical-align-top sub-nav-container bg-white overflow-hidden bl-xs-1 bb-xs-1 br-xs-1 catnav-mott-control display-none"
                     data-ui="sub-nav" aria-hidden="true" data-node-id="c-1">
                     <div className="width-full display-flex-xs">
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/logo-design">
                                 Logo Design </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/business-cards-amp-stationery">
                                 Business Cards &amp; Stationery </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/illustration">
                                 Illustration </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/cartoons-caricatures">
                                 Cartoons Caricatures </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/flyers-posters">
                                 Flyers Posters </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/book-covers-packaging">
                                 Book Covers & Packaging </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/web-amp-mobile-design">
                                 Web &amp; Mobile Design </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/social-media-design">
                                 Social Media Design </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/banner-ads">
                                 Banner Ads </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/photoshop-editing">
                                 Photoshop Editing </a>
                           </li>
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/3d-2d-models">
                                 3D & 2D Models </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/t-shirts">
                                 T-Shirts </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/presentation-design">
                                 Presentation Design </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/other">
                                 Other </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/%D8%AE%D8%AF%D9%85%D8%A7%D8%AA+%D8%A7%D9%84%D8%AA%D8%B1%D8%AC%D9%85%D8%A9">
                                 خدمات الترجمة </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/hosting-services">
                                 Hosting Services </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/facebook-servic3">
                                 facebook servic3 </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/graphics-design/o8uyoiu">
                                 o8uyoiu </a>
                           </li>
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                     </div>
                  </div>
                  <div
                     className="body-sub-width vertical-align-top sub-nav-container bg-white overflow-hidden bl-xs-1 bb-xs-1 br-xs-1 catnav-mott-control display-none"
                     data-ui="sub-nav" aria-hidden="true" data-node-id="c-2">
                     <div className="width-full display-flex-xs">
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/digital-marketing/social-media-marketing">
                                 Social Media Marketing </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/digital-marketing/seo">
                                 SEO </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/digital-marketing/web-traffic">
                                 Web Traffic </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/digital-marketing/content-marketing">
                                 Content Marketing </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/digital-marketing/video-marketing">
                                 Video Marketing </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/digital-marketing/email-marketing">
                                 Email Marketing </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/digital-marketing/search-display-marketing">
                                 Search & Display Marketing </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/digital-marketing/marketing-strategy">
                                 Marketing Strategy </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/digital-marketing/web-analytics">
                                 Web Analytics </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/digital-marketing/influencer-marketing">
                                 Influencer Marketing </a>
                           </li>
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/digital-marketing/local-listings">
                                 Local Listings </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/digital-marketing/domain-research">
                                 Domain Research </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/digital-marketing/e-commerce-marketing">
                                 E-Commerce Marketing </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/digital-marketing/mobile-advertising">
                                 Mobile Advertising </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/digital-marketing/tutorail-creation">
                                 Tutorial Creation </a>
                           </li>
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                     </div>
                  </div>
                  <div
                     className="body-sub-width vertical-align-top sub-nav-container bg-white overflow-hidden bl-xs-1 bb-xs-1 br-xs-1 catnav-mott-control display-none"
                     data-ui="sub-nav" aria-hidden="true" data-node-id="c-3">
                     <div className="width-full display-flex-xs">
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1" href="">
                                 Resumes & Cover Letters </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/writing-translation/proofreading-editing">
                                 Proofreading & Editing </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/writing-translation/translation">
                                 Translation </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/writing-translation/creative-writing">
                                 Creative Writing </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/writing-translation/business-copywriting">
                                 Business Copywriting </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/writing-translation/research-summaries">
                                 Research & Summaries </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/writing-translation/articles-blog-posts">
                                 Articles & Blog Posts </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/writing-translation/press-releases">
                                 Press Releases </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/writing-translation/transcription">
                                 Transcription </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/writing-translation/legal-writing">
                                 Legal Writing </a>
                           </li>
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/writing-translation/other">
                                 Other </a>
                           </li>
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                     </div>
                  </div>
                  <div
                     className="body-sub-width vertical-align-top sub-nav-container bg-white overflow-hidden bl-xs-1 bb-xs-1 br-xs-1 catnav-mott-control display-none"
                     data-ui="sub-nav" aria-hidden="true" data-node-id="c-4">
                     <div className="width-full display-flex-xs">
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/video-animation/whiteboard-explainer-videos">
                                 Whiteboard & Explainer Videos </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/video-animation/intros-animated-logos">
                                 Intros & Animated Logos </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/video-animation/promotional-brand-videos">
                                 Promotional & Brand Videos </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/video-animation/editing-post-production">
                                 Editing & Post Production </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/video-animation/lyric-music-videos">
                                 Lyric & Music Videos </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/video-animation/spokespersons-testimonials">
                                 Spokespersons & Testimonials </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/video-animation/other">
                                 Other </a>
                           </li>
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                     </div>
                  </div>
                  <div
                     className="body-sub-width vertical-align-top sub-nav-container bg-white overflow-hidden bl-xs-1 bb-xs-1 br-xs-1 catnav-mott-control display-none"
                     data-ui="sub-nav" aria-hidden="true" data-node-id="c-6">
                     <div className="width-full display-flex-xs">
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/programming-tech/wordpress">
                                 WordPress </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/programming-tech/web-programming">
                                 Web Programming </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/programming-tech/website-builders-cms">
                                 Website Builders & CMS </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/programming-tech/ecommerce">
                                 Ecommerce </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/programming-tech/mobile-apps-web">
                                 Mobile Apps & Web </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/programming-tech/desktop-applications">
                                 Desktop applications </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/programming-tech/support-it">
                                 Support & IT </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/programming-tech/chatbots">
                                 Chatbots </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/programming-tech/data-analysis-reports">
                                 Data Analysis & Reports </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/programming-tech/convert-files">
                                 Convert Files </a>
                           </li>
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/programming-tech/databases">
                                 Databases </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/programming-tech/user-testing">
                                 User Testing </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/programming-tech/other">
                                 Other </a>
                           </li>
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                     </div>
                  </div>
                  <div
                     className="body-sub-width vertical-align-top sub-nav-container bg-white overflow-hidden bl-xs-1 bb-xs-1 br-xs-1 catnav-mott-control display-none"
                     data-ui="sub-nav" aria-hidden="true" data-node-id="c-7">
                     <div className="width-full display-flex-xs">
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/business/virtual-assistant">
                                 Virtual Assistant </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/business/market-research">
                                 Market Research </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/business/business-plans">
                                 Business Plans </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/business/branding-services">
                                 Branding Services </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/business/legal-consulting">
                                 Legal Consulting </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/business/financial-consulting">
                                 Financial Consulting </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/business/business-tips">
                                 Business Tips </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/business/presentations">
                                 Presentations </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/business/career-advice">
                                 Career Advice </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/business/flyer-distribution">
                                 Flyer Distribution </a>
                           </li>
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1" href="categories/business/other">
                                 Other </a>
                           </li>
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                     </div>
                  </div>
                  <div
                     className="body-sub-width vertical-align-top sub-nav-container bg-white overflow-hidden bl-xs-1 bb-xs-1 br-xs-1 catnav-mott-control display-none"
                     data-ui="sub-nav" aria-hidden="true" data-node-id="c-8">
                     <div className="width-full display-flex-xs">
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/fun-lifestyle/online-lessons">
                                 Online Lessons </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/fun-lifestyle/arts-crafts">
                                 Arts & Crafts </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/fun-lifestyle/relationship-advice">
                                 Relationship Advice </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/fun-lifestyle/health-nutrition-fitness">
                                 Health, Nutrition & Fitness </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/fun-lifestyle/astrology-readings">
                                 Astrology & Readings </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/fun-lifestyle/spiritual-healing">
                                 Spiritual & Healing </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/fun-lifestyle/family-genealogy">
                                 Family & Genealogy </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/fun-lifestyle/collectibles">
                                 Collectibles </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/fun-lifestyle/greeting-cards-videos">
                                 Greeting Cards & Videos </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/fun-lifestyle/viral-videos">
                                 Viral Videos </a>
                           </li>
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/fun-lifestyle/pranks-stunts">
                                 Pranks & Stunts </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/fun-lifestyle/celebrity-impersonators">
                                 Celebrity Impersonators </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/fun-lifestyle/other">
                                 Other </a>
                           </li>
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                     </div>
                  </div>
                  <div
                     className="body-sub-width vertical-align-top sub-nav-container bg-white overflow-hidden bl-xs-1 bb-xs-1 br-xs-1 catnav-mott-control display-none"
                     data-ui="sub-nav" aria-hidden="true" data-node-id="c-9">
                     <div className="width-full display-flex-xs">
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/music-audio/voice-over">
                                 Voice Over </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/music-audio/mixing-mastering">
                                 Mixing & Mastering </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/music-audio/producers-composers">
                                 Producers & Composers </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/music-audio/singer-songwriters">
                                 Singer-Songwriters </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/music-audio/session-musicians-singers">
                                 Session Musicians & Singers </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/music-audio/jingles-drops">
                                 Jingles & Drops </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/music-audio/sound-effects">
                                 Sound Effects </a>
                           </li>
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                     </div>
                  </div>
                  <div
                     className="body-sub-width vertical-align-top sub-nav-container bg-white overflow-hidden bl-xs-1 bb-xs-1 br-xs-1 catnav-mott-control display-none"
                     data-ui="sub-nav" aria-hidden="true" data-node-id="c-10">
                     <div className="width-full display-flex-xs">
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/video-category/course-creation">
                                 Course Creation </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/video-category/english-video-tutorials">
                                 English Video Tutorials </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/video-category/interviews">
                                 Interviews </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/video-category/language-tutorials">
                                 Language Tutorials </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1"
                                 href="categories/video-category/web-programing">
                                 Web Programing </a>
                           </li>
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                     </div>
                  </div>
                  <div
                     className="body-sub-width vertical-align-top sub-nav-container bg-white overflow-hidden bl-xs-1 bb-xs-1 br-xs-1 catnav-mott-control display-none"
                     data-ui="sub-nav" aria-hidden="true" data-node-id="c-more">
                     <div className="width-full display-flex-xs">
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1" href="categories/on-demand-typing">
                                 On demand typing </a>
                           </li>
                           <li>
                              <a className="display-block text-gray text-body-larger pt-xs-1" href="categories/radio-anuncio">
                                 Radio anuncio </a>
                           </li>
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                        <ul className="list-unstyled display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>


         <div className="cat-mobile" id="onePress-modal-container" style={{ display: "none" }}>
            {/* <!--- cat-mobile Starts ---> */}
            <div data-overlay-mask="" className="overlay-mask mobile-catnav-overlay-mask" data-aria-hidden="true"></div>
            <div data-overlay-content-wrapper="" className="overlay-mask overlay-content-wrapper mobile-catnav-overlay-mask">
               <div className="mobile-catnav-wrapper overlay-region position-relative p-xs-0" id="mobile-catnav-overlay"
                  aria-hidden="false" data-overlay-has-trigger="true" style={{ top: "0px" }}>
                  <div data-ui="mobile-cat-nav"
                     className="mobile-cat-nav bg-gray-lighter pb-xs-4 width-full position-fixed animated" style={{ height: "100vh" }}>
                     <div className="bg-white display-flex-md show-md pt-md-3 pl-md-2 pb-md-3">
                        <div className="flex-md-5 pl-md-0">
                           <a role="button" href="">
                              <img src={require('../../../images/1press-logo.png')} width="158" />
                           </a>
                        </div>
                        <div className="flex-md-1 pr-md-2">
                           <button className="btn-link text-right overlay-close flex-xs-1 justify-self-flex-end border-0 p-md-0"
                              data-overlay-close="">
                              <span className="screen-reader-only">Close Menu</span>
                              <span className="onePress-icon">
                                 <i className="fa fa-times" aria-hidden="true"></i>
                              </span>
                           </button>
                        </div>
                     </div>
                     <div data-ui="mobile-catnav-header"
                        className="mobile-catnav-header bb-xs-1 align-items-center bg-white display-flex-xs flex-nowrap position-relative height-50px">
                        <button
                           className="mobile-catnav-back-btn btn-link overlay-back p-xs-2 text-left display-none flex-xs-1 align-self-flex-start z-index-1 position-absolute"
                           data-subnav-id="0" data-ternav-id="0" data-topnav-name="" data-subnav-name="">
                           <span className="screen-reader-only">Go Back</span>
                           <span className="onePress-icon">
                              <i className="fa fa-arrow-left" aria-hidden="true"></i>
                           </span>
                        </button>
                        <div className="flex-xs-4 width-full pt-md-4 pb-md-4 pl-xs-2">
                           <h6 id="mobile-catnav-header-title" className="text-left position-absolute vertical-center">
                              {/* <!--  <a href=""><img src={ require('../../../images/https://s3.ap-south-1.amazonaws.com/onePress/images/onePressFav.ico" className="rounded" title='Home' alt='Home'/></a> --> */}
                        Browse Categories
                     </h6>
                           <h6 id="mobile-sub-catnav-header-title"
                              className="text-center position-absolute position-left position-right vertical-center pl-md-8 pr-md-8">
                           </h6>
                           <h6 id="mobile-tertiary-catnav-header-title"
                              className="text-center position-absolute position-left position-right vertical-center pl-md-8 pr-md-8 display-none">
                           </h6>
                        </div>
                        <div className="flex-xs-1 width-full">
                           <button className="show-xs show-sm btn-link p-xs-2 overlay-close border-0 float-right"
                              data-overlay-close="">
                              <span className="screen-reader-only">Close Menu</span>
                              <span className="onePress-icon">
                                 <i className="fa fa-times" aria-hidden="true"></i>
                              </span>
                           </button>
                        </div>
                     </div>
                     <div data-ui="mobile-catnav-scroll-wrapper" className="height-full overflow-y-scroll">
                        <div className="mobile-topnav bg-white animated">
                           <ul data-ui="mobile-top-catnav-container"
                              className="mobile-top-catnav-container list-unstyled mobile-catnav-margin">
                              <li className="p-xs-2 bb-xs-1 text-body-larger top-nav-item" data-uid="11"
                                 data-name="Graphics &amp; Design">
                                 <div className="flag">
                                    <div className="flag-body">Graphics &amp; Design</div>
                                    <div class='flag-img flag-img-right'>
                                       <span class='onePress-icon float-right'>
                                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden='true'
                                             focusable='false'>
                                             <path
                                                d='M10,17a1,1,0,0,1-.707-1.707L12.586,12,9.293,8.707a1,1,0,0,1,1.414-1.414L15.414,12l-4.707,4.707A1,1,0,0,1,10,17Z'>
                                             </path>
                                          </svg>
                                       </span>
                                    </div>
                                 </div>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger top-nav-item" data-uid="12"
                                 data-name="Digital Marketing">
                                 <div className="flag">
                                    <div className="flag-body">Digital Marketing</div>
                                    <div class='flag-img flag-img-right'>
                                       <span class='onePress-icon float-right'>
                                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden='true'
                                             focusable='false'>
                                             <path
                                                d='M10,17a1,1,0,0,1-.707-1.707L12.586,12,9.293,8.707a1,1,0,0,1,1.414-1.414L15.414,12l-4.707,4.707A1,1,0,0,1,10,17Z'>
                                             </path>
                                          </svg>
                                       </span>
                                    </div>
                                 </div>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger top-nav-item" data-uid="13"
                                 data-name="Writing & Translation">
                                 <div className="flag">
                                    <div className="flag-body">Writing & Translation</div>
                                    <div class='flag-img flag-img-right'>
                                       <span class='onePress-icon float-right'>
                                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden='true'
                                             focusable='false'>
                                             <path
                                                d='M10,17a1,1,0,0,1-.707-1.707L12.586,12,9.293,8.707a1,1,0,0,1,1.414-1.414L15.414,12l-4.707,4.707A1,1,0,0,1,10,17Z'>
                                             </path>
                                          </svg>
                                       </span>
                                    </div>
                                 </div>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger top-nav-item" data-uid="14"
                                 data-name="Video &amp; Animation">
                                 <div className="flag">
                                    <div className="flag-body">Video &amp; Animation</div>
                                    <div class='flag-img flag-img-right'>
                                       <span class='onePress-icon float-right'>
                                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden='true'
                                             focusable='false'>
                                             <path
                                                d='M10,17a1,1,0,0,1-.707-1.707L12.586,12,9.293,8.707a1,1,0,0,1,1.414-1.414L15.414,12l-4.707,4.707A1,1,0,0,1,10,17Z'>
                                             </path>
                                          </svg>
                                       </span>
                                    </div>
                                 </div>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger top-nav-item" data-uid="16"
                                 data-name="Programming &amp; Tech">
                                 <div className="flag">
                                    <div className="flag-body">Programming &amp; Tech</div>
                                    <div class='flag-img flag-img-right'>
                                       <span class='onePress-icon float-right'>
                                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden='true'
                                             focusable='false'>
                                             <path
                                                d='M10,17a1,1,0,0,1-.707-1.707L12.586,12,9.293,8.707a1,1,0,0,1,1.414-1.414L15.414,12l-4.707,4.707A1,1,0,0,1,10,17Z'>
                                             </path>
                                          </svg>
                                       </span>
                                    </div>
                                 </div>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger top-nav-item" data-uid="17" data-name="Business
                              ">
                                 <div className="flag">
                                    <div className="flag-body">Business</div>
                                    <div class='flag-img flag-img-right'>
                                       <span class='onePress-icon float-right'>
                                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden='true'
                                             focusable='false'>
                                             <path
                                                d='M10,17a1,1,0,0,1-.707-1.707L12.586,12,9.293,8.707a1,1,0,0,1,1.414-1.414L15.414,12l-4.707,4.707A1,1,0,0,1,10,17Z'>
                                             </path>
                                          </svg>
                                       </span>
                                    </div>
                                 </div>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger top-nav-item" data-uid="18" data-name="Fun & Lifestyle
                              ">
                                 <div className="flag">
                                    <div className="flag-body">Fun & Lifestyle</div>
                                    <div class='flag-img flag-img-right'>
                                       <span class='onePress-icon float-right'>
                                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden='true'
                                             focusable='false'>
                                             <path
                                                d='M10,17a1,1,0,0,1-.707-1.707L12.586,12,9.293,8.707a1,1,0,0,1,1.414-1.414L15.414,12l-4.707,4.707A1,1,0,0,1,10,17Z'>
                                             </path>
                                          </svg>
                                       </span>
                                    </div>
                                 </div>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger top-nav-item" data-uid="19"
                                 data-name="Music & Audio">
                                 <div className="flag">
                                    <div className="flag-body">Music & Audio</div>
                                    <div class='flag-img flag-img-right'>
                                       <span class='onePress-icon float-right'>
                                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden='true'
                                             focusable='false'>
                                             <path
                                                d='M10,17a1,1,0,0,1-.707-1.707L12.586,12,9.293,8.707a1,1,0,0,1,1.414-1.414L15.414,12l-4.707,4.707A1,1,0,0,1,10,17Z'>
                                             </path>
                                          </svg>
                                       </span>
                                    </div>
                                 </div>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger top-nav-item" data-uid="110"
                                 data-name="Video Tutorials">
                                 <div className="flag">
                                    <div className="flag-body">Video Tutorials</div>
                                    <div class='flag-img flag-img-right'>
                                       <span class='onePress-icon float-right'>
                                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden='true'
                                             focusable='false'>
                                             <path
                                                d='M10,17a1,1,0,0,1-.707-1.707L12.586,12,9.293,8.707a1,1,0,0,1,1.414-1.414L15.414,12l-4.707,4.707A1,1,0,0,1,10,17Z'>
                                             </path>
                                          </svg>
                                       </span>
                                    </div>
                                 </div>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger top-nav-item" data-uid="118"
                                 data-name="On demand typing ">
                                 <a href='category?cat_id=18'>
                                    <div className="flag">
                                       <div className="flag-body">On demand typing </div>
                                    </div>
                                 </a>
                              </li>
                           </ul>
                        </div>
                        <div className="mobile-subnav bg-white animated" id="mobile-sub-catnav-content-11">
                           <ul className="mobile-sub-catnav-container list-unstyled mobile-catnav-margin display-none">
                              <li className="p-xs-1 bb-xs-1 text-body-larger strong subnav-item a11y-focus-only">
                                 <a className="p-xs-1 text-gray display-inline-block width-full text-underline"
                                    href="categories/graphics-design">
                                    View All Graphics &amp; Design </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/logo-design">
                                    <div className="flag">
                                       <div className="flag-body">Logo Design</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/business-cards-amp-stationery">
                                    <div className="flag">
                                       <div className="flag-body">Business Cards &amp; Stationery</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/illustration">
                                    <div className="flag">
                                       <div className="flag-body">Illustration</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/cartoons-caricatures">
                                    <div className="flag">
                                       <div className="flag-body">Cartoons Caricatures</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/flyers-posters">
                                    <div className="flag">
                                       <div className="flag-body">Flyers Posters</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/book-covers-packaging">
                                    <div className="flag">
                                       <div className="flag-body">Book Covers & Packaging</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/web-amp-mobile-design">
                                    <div className="flag">
                                       <div className="flag-body">Web &amp; Mobile Design</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/social-media-design">
                                    <div className="flag">
                                       <div className="flag-body">Social Media Design</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/banner-ads">
                                    <div className="flag">
                                       <div className="flag-body">Banner Ads</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/photoshop-editing">
                                    <div className="flag">
                                       <div className="flag-body">Photoshop Editing</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/3d-2d-models">
                                    <div className="flag">
                                       <div className="flag-body">3D & 2D Models</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/t-shirts">
                                    <div className="flag">
                                       <div className="flag-body">T-Shirts</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/presentation-design">
                                    <div className="flag">
                                       <div className="flag-body">Presentation Design</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/other">
                                    <div className="flag">
                                       <div className="flag-body">Other</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a
                                    href="categories/graphics-design/%D8%AE%D8%AF%D9%85%D8%A7%D8%AA+%D8%A7%D9%84%D8%AA%D8%B1%D8%AC%D9%85%D8%A9">
                                    <div className="flag">
                                       <div className="flag-body">خدمات الترجمة</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/hosting-services">
                                    <div className="flag">
                                       <div className="flag-body">Hosting Services</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/facebook-servic3">
                                    <div className="flag">
                                       <div className="flag-body">facebook servic3</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/graphics-design/o8uyoiu">
                                    <div className="flag">
                                       <div className="flag-body">o8uyoiu</div>
                                    </div>
                                 </a>
                              </li>
                           </ul>
                        </div>
                        <div className="mobile-subnav bg-white animated" id="mobile-sub-catnav-content-12">
                           <ul className="mobile-sub-catnav-container list-unstyled mobile-catnav-margin display-none">
                              <li className="p-xs-1 bb-xs-1 text-body-larger strong subnav-item a11y-focus-only">
                                 <a className="p-xs-1 text-gray display-inline-block width-full text-underline" href="">
                                    View All Digital Marketing </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="">
                                    <div className="flag">
                                       <div className="flag-body">Social Media Marketing</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="">
                                    <div className="flag">
                                       <div className="flag-body">SEO</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="">
                                    <div className="flag">
                                       <div className="flag-body">Web Traffic</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="">
                                    <div className="flag">
                                       <div className="flag-body">Content Marketing</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="">
                                    <div className=" flag">
                                       <div className="flag-body">Video Marketing</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="">
                                    <div className="flag">
                                       <div className="flag-body">Email Marketing</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="">
                                    <div className="flag">
                                       <div className="flag-body">Search & Display Marketing</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="">
                                    <div className="flag">
                                       <div className="flag-body">Marketing Strategy</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="">
                                    <div className="flag">
                                       <div className="flag-body">Web Analytics</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="">
                                    <div className="flag">
                                       <div className="flag-body">Influencer Marketing</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="">
                                    <div className="flag">
                                       <div className="flag-body">Local Listings</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="">
                                    <div className="flag">
                                       <div className="flag-body">Domain Research</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="">
                                    <div className="flag">
                                       <div className="flag-body">E-Commerce Marketing</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="">
                                    <div className="flag">
                                       <div className="flag-body">Mobile Advertising</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="">
                                    <div className="flag">
                                       <div className="flag-body">Tutorial Creation</div>
                                    </div>
                                 </a>
                              </li>
                           </ul>
                        </div>
                        <div className="mobile-subnav bg-white animated" id="mobile-sub-catnav-content-13">
                           <ul className="mobile-sub-catnav-container list-unstyled mobile-catnav-margin display-none">
                              <li className="p-xs-1 bb-xs-1 text-body-larger strong subnav-item a11y-focus-only">
                                 <a className="p-xs-1 text-gray display-inline-block width-full text-underline"
                                    href="categories/writing-translation">
                                    View All Writing & Translation </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="">
                                    <div className="flag">
                                       <div className="flag-body">Resumes & Cover Letters</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/writing-translation/proofreading-editing">
                                    <div className="flag">
                                       <div className="flag-body">Proofreading & Editing</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/writing-translation/translation">
                                    <div className="flag">
                                       <div className="flag-body">Translation</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/writing-translation/creative-writing">
                                    <div className="flag">
                                       <div className="flag-body">Creative Writing</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/writing-translation/business-copywriting">
                                    <div className="flag">
                                       <div className="flag-body">Business Copywriting</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/writing-translation/research-summaries">
                                    <div className="flag">
                                       <div className="flag-body">Research & Summaries</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/writing-translation/articles-blog-posts">
                                    <div className="flag">
                                       <div className="flag-body">Articles & Blog Posts</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/writing-translation/press-releases">
                                    <div className="flag">
                                       <div className="flag-body">Press Releases</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/writing-translation/transcription">
                                    <div className="flag">
                                       <div className="flag-body">Transcription</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/writing-translation/legal-writing">
                                    <div className="flag">
                                       <div className="flag-body">Legal Writing</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/writing-translation/other">
                                    <div className="flag">
                                       <div className="flag-body">Other</div>
                                    </div>
                                 </a>
                              </li>
                           </ul>
                        </div>
                        <div className="mobile-subnav bg-white animated" id="mobile-sub-catnav-content-14">
                           <ul className="mobile-sub-catnav-container list-unstyled mobile-catnav-margin display-none">
                              <li className="p-xs-1 bb-xs-1 text-body-larger strong subnav-item a11y-focus-only">
                                 <a className="p-xs-1 text-gray display-inline-block width-full text-underline"
                                    href="categories/video-animation">
                                    View All Video &amp; Animation </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/video-animation/whiteboard-explainer-videos">
                                    <div className="flag">
                                       <div className="flag-body">Whiteboard & Explainer Videos</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/video-animation/intros-animated-logos">
                                    <div className="flag">
                                       <div className="flag-body">Intros & Animated Logos</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/video-animation/promotional-brand-videos">
                                    <div className="flag">
                                       <div className="flag-body">Promotional & Brand Videos</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/video-animation/editing-post-production">
                                    <div className="flag">
                                       <div className="flag-body">Editing & Post Production</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/video-animation/lyric-music-videos">
                                    <div className="flag">
                                       <div className="flag-body">Lyric & Music Videos</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/video-animation/spokespersons-testimonials">
                                    <div className="flag">
                                       <div className="flag-body">Spokespersons & Testimonials</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/video-animation/other">
                                    <div className="flag">
                                       <div className="flag-body">Other</div>
                                    </div>
                                 </a>
                              </li>
                           </ul>
                        </div>
                        <div className="mobile-subnav bg-white animated" id="mobile-sub-catnav-content-16">
                           <ul className="mobile-sub-catnav-container list-unstyled mobile-catnav-margin display-none">
                              <li className="p-xs-1 bb-xs-1 text-body-larger strong subnav-item a11y-focus-only">
                                 <a className="p-xs-1 text-gray display-inline-block width-full text-underline"
                                    href="categories/programming-tech">
                                    View All Programming &amp; Tech </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/programming-tech/wordpress">
                                    <div className="flag">
                                       <div className="flag-body">WordPress</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/programming-tech/web-programming">
                                    <div className="flag">
                                       <div className="flag-body">Web Programming</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/programming-tech/website-builders-cms">
                                    <div className="flag">
                                       <div className="flag-body">Website Builders & CMS</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/programming-tech/ecommerce">
                                    <div className="flag">
                                       <div className="flag-body">Ecommerce</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/programming-tech/mobile-apps-web">
                                    <div className="flag">
                                       <div className="flag-body">Mobile Apps & Web</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/programming-tech/desktop-applications">
                                    <div className="flag">
                                       <div className="flag-body">Desktop applications</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/programming-tech/support-it">
                                    <div className="flag">
                                       <div className="flag-body">Support & IT</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/programming-tech/chatbots">
                                    <div className="flag">
                                       <div className="flag-body">Chatbots</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/programming-tech/data-analysis-reports">
                                    <div className="flag">
                                       <div className="flag-body">Data Analysis & Reports</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/programming-tech/convert-files">
                                    <div className="flag">
                                       <div className="flag-body">Convert Files</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/programming-tech/databases">
                                    <div className="flag">
                                       <div className="flag-body">Databases</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/programming-tech/user-testing">
                                    <div className="flag">
                                       <div className="flag-body">User Testing</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/programming-tech/other">
                                    <div className="flag">
                                       <div className="flag-body">Other</div>
                                    </div>
                                 </a>
                              </li>
                           </ul>
                        </div>
                        <div className="mobile-subnav bg-white animated" id="mobile-sub-catnav-content-17">
                           <ul className="mobile-sub-catnav-container list-unstyled mobile-catnav-margin display-none">
                              <li className="p-xs-1 bb-xs-1 text-body-larger strong subnav-item a11y-focus-only">
                                 <a className="p-xs-1 text-gray display-inline-block width-full text-underline"
                                    href="categories/business">
                                    View All Business
                        </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/business/virtual-assistant">
                                    <div className="flag">
                                       <div className="flag-body">Virtual Assistant</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/business/market-research">
                                    <div className="flag">
                                       <div className="flag-body">Market Research</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/business/business-plans">
                                    <div className="flag">
                                       <div className="flag-body">Business Plans</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/business/branding-services">
                                    <div className="flag">
                                       <div className="flag-body">Branding Services</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/business/legal-consulting">
                                    <div className="flag">
                                       <div className="flag-body">Legal Consulting</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/business/financial-consulting">
                                    <div className="flag">
                                       <div className="flag-body">Financial Consulting</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/business/business-tips">
                                    <div className="flag">
                                       <div className="flag-body">Business Tips</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/business/presentations">
                                    <div className="flag">
                                       <div className="flag-body">Presentations</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/business/career-advice">
                                    <div className="flag">
                                       <div className="flag-body">Career Advice</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/business/flyer-distribution">
                                    <div className="flag">
                                       <div className="flag-body">Flyer Distribution</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/business/other">
                                    <div className="flag">
                                       <div className="flag-body">Other</div>
                                    </div>
                                 </a>
                              </li>
                           </ul>
                        </div>
                        <div className="mobile-subnav bg-white animated" id="mobile-sub-catnav-content-18">
                           <ul className="mobile-sub-catnav-container list-unstyled mobile-catnav-margin display-none">
                              <li className="p-xs-1 bb-xs-1 text-body-larger strong subnav-item a11y-focus-only">
                                 <a className="p-xs-1 text-gray display-inline-block width-full text-underline"
                                    href="categories/fun-lifestyle">
                                    View All Fun & Lifestyle
                        </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/fun-lifestyle/online-lessons">
                                    <div className="flag">
                                       <div className="flag-body">Online Lessons</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/fun-lifestyle/arts-crafts">
                                    <div className="flag">
                                       <div className="flag-body">Arts & Crafts</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/fun-lifestyle/relationship-advice">
                                    <div className="flag">
                                       <div className="flag-body">Relationship Advice</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/fun-lifestyle/health-nutrition-fitness">
                                    <div className="flag">
                                       <div className="flag-body">Health, Nutrition & Fitness</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/fun-lifestyle/astrology-readings">
                                    <div className="flag">
                                       <div className="flag-body">Astrology & Readings</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/fun-lifestyle/spiritual-healing">
                                    <div className="flag">
                                       <div className="flag-body">Spiritual & Healing</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/fun-lifestyle/family-genealogy">
                                    <div className="flag">
                                       <div className="flag-body">Family & Genealogy</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/fun-lifestyle/collectibles">
                                    <div className="flag">
                                       <div className="flag-body">Collectibles</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/fun-lifestyle/greeting-cards-videos">
                                    <div className="flag">
                                       <div className="flag-body">Greeting Cards & Videos</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/fun-lifestyle/viral-videos">
                                    <div className="flag">
                                       <div className="flag-body">Viral Videos</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/fun-lifestyle/pranks-stunts">
                                    <div className="flag">
                                       <div className="flag-body">Pranks & Stunts</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/fun-lifestyle/celebrity-impersonators">
                                    <div className="flag">
                                       <div className="flag-body">Celebrity Impersonators</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/fun-lifestyle/other">
                                    <div className="flag">
                                       <div className="flag-body">Other</div>
                                    </div>
                                 </a>
                              </li>
                           </ul>
                        </div>
                        <div className="mobile-subnav bg-white animated" id="mobile-sub-catnav-content-19">
                           <ul className="mobile-sub-catnav-container list-unstyled mobile-catnav-margin display-none">
                              <li className="p-xs-1 bb-xs-1 text-body-larger strong subnav-item a11y-focus-only">
                                 <a className="p-xs-1 text-gray display-inline-block width-full text-underline"
                                    href="categories/music-audio">
                                    View All Music & Audio </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/music-audio/voice-over">
                                    <div className="flag">
                                       <div className="flag-body">Voice Over</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/music-audio/mixing-mastering">
                                    <div className="flag">
                                       <div className="flag-body">Mixing & Mastering</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/music-audio/producers-composers">
                                    <div className="flag">
                                       <div className="flag-body">Producers & Composers</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/music-audio/singer-songwriters">
                                    <div className="flag">
                                       <div className="flag-body">Singer-Songwriters</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/music-audio/session-musicians-singers">
                                    <div className="flag">
                                       <div className="flag-body">Session Musicians & Singers</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/music-audio/jingles-drops">
                                    <div className="flag">
                                       <div className="flag-body">Jingles & Drops</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/music-audio/sound-effects">
                                    <div className="flag">
                                       <div className="flag-body">Sound Effects</div>
                                    </div>
                                 </a>
                              </li>
                           </ul>
                        </div>
                        <div className="mobile-subnav bg-white animated" id="mobile-sub-catnav-content-110">
                           <ul className="mobile-sub-catnav-container list-unstyled mobile-catnav-margin display-none">
                              <li className="p-xs-1 bb-xs-1 text-body-larger strong subnav-item a11y-focus-only">
                                 <a className="p-xs-1 text-gray display-inline-block width-full text-underline"
                                    href="categories/video-category">
                                    View All Video Tutorials </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/video-category/course-creation">
                                    <div className="flag">
                                       <div className="flag-body">Course Creation</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/video-category/english-video-tutorials">
                                    <div className="flag">
                                       <div className="flag-body">English Video Tutorials</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/video-category/interviews">
                                    <div className="flag">
                                       <div className="flag-body">Interviews</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/video-category/language-tutorials">
                                    <div className="flag">
                                       <div className="flag-body">Language Tutorials</div>
                                    </div>
                                 </a>
                              </li>
                              <li className="p-xs-2 bb-xs-1 text-body-larger subnav-item a11y-focus-only">
                                 <a href="categories/video-category/web-programing">
                                    <div className="flag">
                                       <div className="flag-body">Web Programing</div>
                                    </div>
                                 </a>
                              </li>
                           </ul>
                        </div>
                        <div className="mobile-subnav bg-white animated" id="mobile-sub-catnav-content-118">
                           <ul className="mobile-sub-catnav-container list-unstyled mobile-catnav-margin display-none">
                              <li className="p-xs-1 bb-xs-1 text-body-larger strong subnav-item a11y-focus-only">
                                 <a className="p-xs-1 text-gray display-inline-block width-full text-underline"
                                    href="categories/on-demand-typing">
                                    View All On demand typing </a>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>


         <div className="container mt-3">
            {/* <!-- Container starts --> */}
            <div className="row">
               <div className="col-md-3 ">
                  <div className="card rounded-0 mb-3 welcome-box">
                     {/* <!-- card rounded-0 mb-3 welcome-box Starts --> */}
                     <div className="card-body pb-2 card_user">
                        {/* <!-- card-body Starts --> */}
                        <center>
                           <img src={require('../../../images/img-03.jpg')} className="img-fluid rounded-circle mb-3" />
                        </center>
                        <h5>Welcome, <span className="text-success">Tyrone</span> </h5>
                        <hr />
                        <p>Sell your services to millions of people all over the world.</p>
                        <button className="btn get_btn mt-0">Post A Request</button>
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
                                 <a href="proposals/mazenlenox10/asdsadsadsad">
                                    <img src={require('../../../images/proposals/BackgroundAvega_1600903536.png')} className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../images/userlisting/img-07.jpg')} className="rounded-circle" width="32"
                                             height="32" />
                                       </span>
                                       <div className="seller-info-wrapper">
                                          <a href="mazenlenox10" className="seller-name">mazenlenox10</a>
                                          <div className="onePress-seller-tooltip">
                                             New Seller
                                    </div>
                                       </div>
                                    </div>
                                    {/* <!--- onePress-seller-info Ends ---> */}
                                    <a href="proposals/mazenlenox10/asdsadsadsad" className="proposal-link-main">
                                       <h3>asdsadsadsad</h3>
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
                                          <small>Starting At</small>&#036;5.00 </a>
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
                                    <img src={require('../../../images/proposals/website-design-logo-png_1590561828.png')}
                                       className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../images/userlisting/img-02.jpg')} className="rounded-circle" width="32"
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
                                    <img src={require('../../../images/proposals/quote-1342706_1280_1588263608.png')} className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../images/userlisting/img-04.jpg')} className="rounded-circle" width="32"
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
                                    <img src={require('../../../images/proposals/fall-3723738_1920_1588260783.png')} className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../images/userlisting/img-06.jpg')} className="rounded-circle" width="32"
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
                                    <img src={require('../../../images/postImg/img-03.jpg')} className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../images/userlisting/img-02.jpg')} className="rounded-circle" width="32"
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
                                    <img src={require('../../../images/postImg/img-03.jpg')} className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../images/userlisting/img-02.jpg')} className="rounded-circle" width="32"
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
                                    <img src={require('../../../images/proposals/game-1.jpg')} className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../images/userlisting/img-01.jpg')} className="rounded-circle" width="32"
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
                                    <img src={require('../../../images/proposals/board-64269_1920_1588265658.png')} className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../images/userlisting/img-06.jpg')} className="rounded-circle" width="32"
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
                                    <img src={require('../../../images/proposals/quote-1342706_1280_1588263608.png')} className="img-fluid" />
                                 </a>
                                 <div className="proposal-card-caption">
                                    {/* <!--- proposal-card-caption Starts ---> */}
                                    <div className="proposal-seller-info">
                                       {/* <!--- onePress-seller-info Starts ---> */}
                                       <span className="fit-avatar s24">
                                          <img src={require('../../../images/userlisting/img-04.jpg')} className="rounded-circle" width="32"
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

                        <div className="carousel-item active"><a><img className="img-fluid" src={require('../../../images/bannerimg/banner.jpg')} /></a>
                           <div className="carousel-caption d-lg-block d-md-block d-none " >
                              <h3>Maecenas hendrerit fermentum pulvinar</h3>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget fermentum orci. Nulla sit amet
           suscipit justo, sit amet dapibus dui.</p></div>
                        </div>
                        <div className="carousel-item active"><a><img className="img-fluid" src={require('../../../images/bannerimg/banner-img.jpg')} /></a>
                           <div className="carousel-caption d-lg-block d-md-block d-none " >
                              <h3>Maecenas hendrerit fermentum pulvinar</h3>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget fermentum orci. Nulla sit amet
           suscipit justo, sit amet dapibus dui.</p></div>
                        </div>

                     </OwlCarousel>

                  </div>


                  <div className="row mt-4 mb-3">
                     <div className="col-md-12">
                        <div className="secTitle">
                           <h2 className="float-left">Featured Proposals/Services</h2>
                           <button onclick="location.href='featured_proposals'" className="float-right btn btn-success">VIEW
                  ALL</button>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video">
                              <img src={require('../../../images/postImg/img-03.jpg')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-02.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="mir_digimarket" className="seller-name">mir_digimarket</a>
                                    <div className="onePress-seller-tooltip">
                                       Level Two
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="4" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I Will Create A Professional Custom Explainer Video</h3>
                              </a>
                              <div className="rating-badges-container">
                                 <span className="proposal-rating">
                                    <i className="fa fa-star"></i>
                                    <span>
                                       <strong>4.8</strong> (22)
                        </span>
                                 </span>
                              </div>
                           </div>
                           {/* <!--- proposal-card-caption Ends ---> */}
                           <footer className="proposal-card-footer">
                              {/* <!--- proposal-card-footer Starts ---> */}
                              <div className="proposal-price">
                                 <a>
                                    <small>STARTING AT</small>&#036;10.00 </a>
                              </div>
                           </footer>
                           {/* <!--- proposal-card-footer Ends ---> */}
                        </div>
                        {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                     </div>
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/shoail/i-will-record-your-brazilian-portuguese-voice-over">
                              <img src={require('../../../images/proposals/voice-over-1.jpg')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-03.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="shoail" className="seller-name">shoail</a>
                                    <div className="onePress-seller-tooltip">
                                       New Seller
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="5" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/shoail/i-will-record-your-brazilian-portuguese-voice-over"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I Will Record Your Brazilian Portuguese Voice Over</h3>
                              </a>
                              <div className="rating-badges-container">
                                 <span className="proposal-rating">
                                    <i className="fa fa-star"></i>
                                    <span>
                                       <strong>5.0</strong> (7)
                        </span>
                                 </span>
                              </div>
                           </div>
                           {/* <!--- proposal-card-caption Ends ---> */}
                           <footer className="proposal-card-footer">
                              {/* <!--- proposal-card-footer Starts ---> */}
                              <div className="proposal-price">
                                 <a>
                                    <small>STARTING AT</small>&#036;10.00 </a>
                              </div>
                           </footer>
                           {/* <!--- proposal-card-footer Ends ---> */}
                        </div>
                        {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                     </div>
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/thili00traffi/i-will-develop-and-reskin-3d-and-2d-games-in-unit">
                              <img src={require('../../../images/proposals/game-1.jpg')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-01.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="thili00traffi" className="seller-name">thili00traffi</a>
                                    <div className="onePress-seller-tooltip">
                                       New Seller
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="7" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/thili00traffi/i-will-develop-and-reskin-3d-and-2d-games-in-unit"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I Will Develop And Reskin 3d And 2d Games In Unity</h3>
                              </a>
                              <div className="rating-badges-container">
                                 <span className="proposal-rating">
                                    <i className="fa fa-star"></i>
                                    <span>
                                       <strong>4.0</strong> (4)
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
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/RayTay90/i-will-sell-2000-inspirational-quotes">
                              <img src={require('../../../images/proposals/quote-1342706_1280_1588263608.png')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-04.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="RayTay90" className="seller-name">RayTay90</a>
                                    <div className="onePress-seller-tooltip">
                                       Level One
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="618" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/RayTay90/i-will-sell-2000-inspirational-quotes"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I will sell 2000 Inspirational quotes</h3>
                              </a>
                              <div className="rating-badges-container">
                                 <span className="proposal-rating">
                                    <i className="fa fa-star"></i>
                                    <span>
                                       <strong>4.6</strong> (5)
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
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/Patricia/i-will-do-a-video-session-and-teach-you-english">
                              <img src={require('../../../images/proposals/board-64269_1920_1588265658.png')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-06.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="Patricia" className="seller-name">Patricia</a>
                                    <div className="onePress-seller-tooltip">
                                       Level One
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="621" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/Patricia/i-will-do-a-video-session-and-teach-you-english"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I will do a video session and teach you english</h3>
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
                                    <small>STARTING AT</small>&#036;0.50 </a>
                              </div>
                           </footer>
                           {/* <!--- proposal-card-footer Ends ---> */}
                        </div>
                        {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                     </div>
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/tyrone/i-will-do-a-video-session-and-prepare-you-for-any-job-interview">
                              <img src={require('../../../images/proposals/man-iand-woman-doing-a-handshake-3874034_1588269353.png')}
                                 className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/img-03.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="tyrone" className="seller-name">tyrone</a>
                                    <div className="onePress-seller-tooltip">
                                       Level One
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/tyrone/i-will-do-a-video-session-and-prepare-you-for-any-job-interview"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I will do a video session and prepare you for any job interview</h3>
                              </a>
                              <div className="rating-badges-container">
                                 <span className="proposal-rating">
                                    <i className="fa fa-star"></i>
                                    <span>
                                       <strong>5.0</strong> (4)
                        </span>
                                 </span>
                              </div>
                              <div className="is-online float-right">
                                 <i className="fa fa-circle"></i> online
                  </div>
                           </div>
                           {/* <!--- proposal-card-caption Ends ---> */}
                           <footer className="proposal-card-footer">
                              {/* <!--- proposal-card-footer Starts ---> */}
                              <div className="proposal-price">
                                 <a>
                                    <small>STARTING AT</small>&#036;10.00 </a>
                              </div>
                           </footer>
                           {/* <!--- proposal-card-footer Ends ---> */}
                        </div>
                        {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                     </div>
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/ghol666/i-will-record-a-professional-spanish-voice-over">
                              <img src={require('../../../images/proposals/IMG_20200411_185413_1590163548_1590247743.png')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-02.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="ghol666" className="seller-name">ghol666</a>
                                    <div className="onePress-seller-tooltip">
                                       New Seller
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="676" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/ghol666/i-will-record-a-professional-spanish-voice-over"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I will record a professional spanish voice over</h3>
                              </a>
                              <div className="rating-badges-container">
                                 <span className="proposal-rating">
                                    <i className="fa fa-star"></i>
                                    <span>
                                       <strong>5.0</strong> (1)
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
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/Timiex/i-will-design-wix-website-design-redesign-wix-website">
                              <img src={require('../../../images/proposals/9414fba1ab6146d844e931436284f142_1591363901.png')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-02.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="Timiex" className="seller-name">Timiex</a>
                                    <div className="onePress-seller-tooltip">
                                       New Seller
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="717" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/Timiex/i-will-design-wix-website-design-redesign-wix-website"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I will design wix website design , redesign wix website</h3>
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
                                    <small>STARTING AT</small>&#036;25.00 </a>
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
                           <h2 className="float-left">Top Proposals/Services</h2>
                           <button onclick="location.href='top_proposals'" className="float-right btn btn-success">VIEW ALL</button>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/volarex/i-will-design-and-code-android-apps">
                              <img src={require('../../../images/proposals/andorid-1_1571118714.png')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-05.jpg')} className="rounded-circle" width="32" height="32" />
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
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/thili00traffi/i-will-develop-and-reskin-3d-and-2d-games-in-unit">
                              <img src={require('../../../images/proposals/game-1.jpg')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-01.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="thili00traffi" className="seller-name">thili00traffi</a>
                                    <div className="onePress-seller-tooltip">
                                       New Seller
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="7" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/thili00traffi/i-will-develop-and-reskin-3d-and-2d-games-in-unit"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I Will Develop And Reskin 3d And 2d Games In Unity</h3>
                              </a>
                              <div className="rating-badges-container">
                                 <span className="proposal-rating">
                                    <i className="fa fa-star"></i>
                                    <span>
                                       <strong>4.0</strong> (4)
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
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/fixmywebsite/i-will-design-and-code-android-apps">
                              <img src={require('../../../images/proposals/macbook-pro-92904_1579141538.png')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-07.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="fixmywebsite" className="seller-name">fixmywebsite</a>
                                    <div className="onePress-seller-tooltip">
                                       Top Rated
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="12" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/fixmywebsite/i-will-design-and-code-android-apps"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I will fix any bug on your website</h3>
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
                                    <small>STARTING AT</small>&#036;10.00 </a>
                              </div>
                           </footer>
                           {/* <!--- proposal-card-footer Ends ---> */}
                        </div>
                        {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                     </div>
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/fixmywebsite/walk-like-an-egyptian">
                              <img src={require('../../../images/proposals/Adam2_1565532813.png')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-07.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="fixmywebsite" className="seller-name">fixmywebsite</a>
                                    <div className="onePress-seller-tooltip">
                                       Top Rated
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="106" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/fixmywebsite/walk-like-an-egyptian"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>Walk like an Egyptian</h3>
                              </a>
                              <div className="rating-badges-container">
                                 <span className="proposal-rating">
                                    <i className="fa fa-star"></i>
                                    <span>
                                       <strong>5.0</strong> (1)
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
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/Patricia/e-book-on-how-to-be-a-successful-entreprenuer">
                              <img src={require('../../../images/proposals/fall-3723738_1920_1588260783.png')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-06.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="Patricia" className="seller-name">Patricia</a>
                                    <div className="onePress-seller-tooltip">
                                       Level One
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="616" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/Patricia/e-book-on-how-to-be-a-successful-entreprenuer"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>E-book on how to be a successful entreprenuer </h3>
                              </a>
                              <div className="rating-badges-container">
                                 <span className="proposal-rating">
                                    <i className="fa fa-star"></i>
                                    <span>
                                       <strong>4.3</strong> (6)
                        </span>
                                 </span>
                              </div>
                           </div>
                           {/* <!--- proposal-card-caption Ends ---> */}
                           <footer className="proposal-card-footer">
                              {/* <!--- proposal-card-footer Starts ---> */}
                              <div className="proposal-price">
                                 <a>
                                    <small>STARTING AT</small>&#036;10.00 </a>
                              </div>
                           </footer>
                           {/* <!--- proposal-card-footer Ends ---> */}
                        </div>
                        {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                     </div>
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/pat/i-will-deliver-20-ios-game-source-code">
                              <img src={require('../../../images/proposals/mario-1558063_1920_1588266377.png')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-01.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="pat" className="seller-name">pat</a>
                                    <div className="onePress-seller-tooltip">
                                       Top Rated
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="617" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/pat/i-will-deliver-20-ios-game-source-code"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I will deliver 20 IOS game source code</h3>
                              </a>
                              <div className="rating-badges-container">
                                 <span className="proposal-rating">
                                    <i className="fa fa-star"></i>
                                    <span>
                                       <strong>4.8</strong> (6)
                        </span>
                                 </span>
                              </div>
                           </div>
                           {/* <!--- proposal-card-caption Ends ---> */}
                           <footer className="proposal-card-footer">
                              {/* <!--- proposal-card-footer Starts ---> */}
                              <div className="proposal-price">
                                 <a>
                                    <small>STARTING AT</small>&#036;15.00 </a>
                              </div>
                           </footer>
                           {/* <!--- proposal-card-footer Ends ---> */}
                        </div>
                        {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                     </div>
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/RayTay90/i-will-sell-2000-inspirational-quotes">
                              <img src={require('../../../images/proposals/quote-1342706_1280_1588263608.png')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-04.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="RayTay90" className="seller-name">RayTay90</a>
                                    <div className="onePress-seller-tooltip">
                                       Level One
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="618" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/RayTay90/i-will-sell-2000-inspirational-quotes"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I will sell 2000 Inspirational quotes</h3>
                              </a>
                              <div className="rating-badges-container">
                                 <span className="proposal-rating">
                                    <i className="fa fa-star"></i>
                                    <span>
                                       <strong>4.6</strong> (5)
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
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/pat/i-will-help-with-any-php-programming-task">
                              <img src={require('../../../images/proposals/Screenshot_20190313-160401[1]_1598983942.png')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-01.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="pat" className="seller-name">pat</a>
                                    <div className="onePress-seller-tooltip">
                                       Top Rated
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="620" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/pat/i-will-help-with-any-php-programming-task"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I will help with any PHP programming task</h3>
                              </a>
                              <div className="rating-badges-container">
                                 <span className="proposal-rating">
                                    <i className="fa fa-star"></i>
                                    <span>
                                       <strong>5.0</strong> (3)
                        </span>
                                 </span>
                              </div>
                           </div>
                           {/* <!--- proposal-card-caption Ends ---> */}
                           <footer className="proposal-card-footer">
                              {/* <!--- proposal-card-footer Starts ---> */}
                              <div className="proposal-price">
                                 <a>
                                    <small>STARTING AT</small>&#036;5,222.00 </a>
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
                           <button onclick="location.href='random_proposals'" className="float-right btn btn-success">VIEW ALL</button>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video">
                              <img src={require('../../../images/postImg/img-03.jpg')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-02.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="mir_digimarket" className="seller-name">mir_digimarket</a>
                                    <div className="onePress-seller-tooltip">
                                       Level Two
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="4" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I Will Create A Professional Custom Explainer Video</h3>
                              </a>
                              <div className="rating-badges-container">
                                 <span className="proposal-rating">
                                    <i className="fa fa-star"></i>
                                    <span>
                                       <strong>4.8</strong> (22)
                        </span>
                                 </span>
                              </div>
                           </div>
                           {/* <!--- proposal-card-caption Ends ---> */}
                           <footer className="proposal-card-footer">
                              {/* <!--- proposal-card-footer Starts ---> */}
                              <div className="proposal-price">
                                 <a>
                                    <small>STARTING AT</small>&#036;10.00 </a>
                              </div>
                           </footer>
                           {/* <!--- proposal-card-footer Ends ---> */}
                        </div>
                        {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                     </div>
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/fgdfgdfg/criar-site-php">
                              <img src={require('../../../images/postImg/img-03.jpg')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-07.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="fgdfgdfg" className="seller-name">fgdfgdfg</a>
                                    <div className="onePress-seller-tooltip">
                                       New Seller
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="426" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/fgdfgdfg/criar-site-php" className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>criar site php</h3>
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
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/minuway/i-will-test-your-website">
                              <img src={require('../../../images/postImg/img-03.jpg')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-07.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="minuway" className="seller-name">minuway</a>
                                    <div className="onePress-seller-tooltip">
                                       New Seller
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="610" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="proposals/minuway/i-will-test-your-website"
                                 className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>I will test your website</h3>
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
                                    <small>STARTING AT</small>&#036;100.00 </a>
                              </div>
                           </footer>
                           {/* <!--- proposal-card-footer Ends ---> */}
                        </div>
                        {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                     </div>
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="">
                              <img src={require('../../../images/postImg/img-03.jpg')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-07.jpg')} className="rounded-circle" width="32" height="32" />
                                 </span>
                                 <div className="seller-info-wrapper">
                                    <a href="LBGA" className="seller-name">LBGA</a>
                                    <div className="onePress-seller-tooltip">
                                       New Seller
                        </div>
                                 </div>
                                 <div className="favoriteIcon">
                                    <i data-id="837" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                       data-placement="top" title="Favorite"></i>
                                 </div>
                              </div>
                              {/* <!--- onePress-seller-info Ends ---> */}
                              <a href="" className="proposal-link-main js-proposal-card-imp-data">
                                 <h3>setup and customize your dubsado account</h3>
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
                                    <small>STARTING AT</small>&#036;80.00 </a>
                              </div>
                           </footer>
                           {/* <!--- proposal-card-footer Ends ---> */}
                        </div>
                        {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                     </div>
                     <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                        <div className="proposal-card-base mp-proposal-card">
                           {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                           <a href="proposals/rewedfv/fghjkl">
                              <img src={require('../../../images/postImg/img-03.jpg')} className="img-fluid" />
                           </a>
                           <div className="proposal-card-caption">
                              {/* <!--- proposal-card-caption Starts ---> */}
                              <div className="proposal-seller-info">
                                 {/* <!--- onePress-seller-info Starts ---> */}
                                 <span className="fit-avatar s24">
                                    <img src={require('../../../images/userlisting/img-07.jpg')} className="rounded-circle" width="32" height="32" />
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
                                       <img src={require('../../../images/userlisting/img-01.jpg')} className="request-img rounded-circle" />
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
                                 <tr id="request_tr_348">
                                    <td>
                                       <img src={require('../../../images/userlisting/img-01.jpg')} className="request-img rounded-circle" />
                                       <div className="request-description">
                                          <h6>Pat</h6>
                                          <h6 className="text-success">design a logo for us</h6>
                                          <p className="lead">hi we need a logo </p>
                                       </div>
                                    </td>
                                    <td>0</td>
                                    <td>5 Days</td>
                                    <td className="text-success">
                                       &#036;5.00 <br />
                                       <button className="btn btn-success btn-sm mt-4 send_button_348">
                                          Send Offer </button>
                                    </td>
                                    {/* <script type="text/javascript">
                           $(".send_button_348").click(function () {
                              request_id = "348";
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

         <footer className="footer">
         <div className="container">
            <div className="row">
               <div className="col-md-6 col-12">
                  <div className="footerAbout">
                     <div className="footerLogo"><a href=""><img src={require('../../../images/1press-logo.png')}/></a></div>
                     <p className="f-abt-desc">
                        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin bibendum tellus ac felis posuere aliquet. Curabitur ut sodales sapien.
                     </p>
                     <div className="collapse show" id="collapsefindusOn">
                        <ul className="list-inline social_icon">
                           <li className="list-inline-item"><a href="#"><i className="fa fa-google-plus-official"></i></a></li>
                           <li className="list-inline-item"><a href="#"><i className="fa fa-twitter"></i></a></li>
                           <li className="list-inline-item"><a href="#"><i className="fa fa-facebook"></i></a></li>
                           <li className="list-inline-item"><a href="#"><i className="fa fa-linkedin"></i></a></li>
                           <li className="list-inline-item"><a href="#"><i className="fa fa-pinterest"></i></a></li>
                        </ul>
                        <img src={require('../../../images/google.png')} className="pic" />
                        <img src={require('../../../images/app.png')} className="pic1" />
                     </div>
                  </div>
               </div>
               <div className="col-md-3 col-12">
                  <h3 className="h3Border" data-toggle="collapse" data-target="#collapsecategories2">Company</h3>
                  <ul className="collapse show list-unstyled" id="collapsecategories2">
                     <li className="list-unstyled-item"><a href="">About Us</a></li>
                     <li className="list-unstyled-item"><a href="">Common Problems</a></li>
                     <li className="list-unstyled-item"><a href="">Tips For Sellers</a></li>
                     <li className="list-unstyled-item"><a href="">Tips For Buyers</a></li>
                  </ul>
               </div>
               <div className="col-md-3 col-12">
                  <h3 className="h3Border" data-toggle="collapse" data-target="#collapseabout">Explore More</h3>
                  <ul className="collapse show list-unstyled" id="collapseabout">
                     <li className="list-unstyled-item"><a href=""><i className="fa fa-file-text-o"></i> Terms & Conditions</a></li>
                     <li className="list-unstyled-item"><a href=""><i className="fa fa fa-life-ring"></i> Customer Support</a></li>
                     <li className="list-unstyled-item"><a href=""><i className="fa fa-question-circle"></i> How It Works</a></li>
                     <li className="list-unstyled-item"><a href=""><i className="fa fa-book"></i> Knowledge Bank</a></li>
                     <li className="list-unstyled-item"><a href=""><i className="fa fa-rss"></i> Blog - Stay Informed</a></li>
                     <li className="list-unstyled-item"><a href=""><i className="fa fa-comments"></i> Feedback/Forum </a></li>
                  </ul>
               </div>
               
            </div>
         </div>
         <br />
      </footer>
      <section className="post_footer">
         @ Copyright onePress 2020. All Rights Reserved
      </section>

      </React.Fragment>
   );
}

export default App;