import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu, getSlide, getGigWithoutAuth } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"



import OwlCarousel from 'react-owl-carousel';


function Landing() {

   const dispatch = useDispatch();
   let auth = useSelector((state) => state.user);

   useEffect(() => {
      dispatch(getMenu())
      dispatch(getSlide())
      dispatch(getGigWithoutAuth())
   }, []);

   const menus = useSelector((state) => state.menu);
   const menuList = menus && menus.menu.menus;
   const slide = useSelector((state) => state.user && state.user.slide && state.user.slide.responseData && state.user.slide.responseData.slides);
   const gig = useSelector((state) => state.user && state.user.gigs && state.user.gigs.responseData && state.user.gigs.responseData.gigs);

   return (

      <Fragment>

         <div id="demo1" className="main carousel">
            <ul className="carousel-indicators">
               <li data-target="#demo1" data-slide-to="0" className="active"></li>
               <li data-target="#demo1" data-slide-to="1"></li>
            </ul>
            <div className="carousel-inner">
               <div className="carousel-caption">
                  <h1>Find the perfect</h1>
                  <h5>freelance services for your business</h5>
                  <div className="row justify-content-center">
                     <div className="">
                        <form action="" method="post">
                           <div className="input-group space20 bannerFormBox">
                              <input type="text" name="search_query" className="form-control" value="" placeholder="Find Services" />
                              <div className="input-group-append move-icon-up">
                                 <button name="search" type="submit" className="search_button">
                                    <img src={require('../../../assets/images/srch.png')} className="srch2" />
                                 </button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
               <div className="carousel-item active">
                  <img src={require('../../../assets/images/bannerimg/banner-img.jpg')} />

               </div>
               <div className="carousel-item ">
                  <img src={require('../../../assets/images/bannerimg/banner.jpg')} />
               </div>
            </div>
            <a className="carousel-control-prev" href="#demo1" data-slide="prev" style={{ width: '6%', opacity: 1 }}>
               <i className="fa fa-arrow-circle-o-left fa-3x"></i>
            </a>
            <a className="carousel-control-next" href="#demo1" data-slide="next" style={{ width: '6%', opacity: 1 }}>
               <i className="fa fa-arrow-circle-o-right fa-3x"></i>
            </a>
         </div>

         {menuList && menuList.length > 0 &&
            <section className="popularService">

               <div className="container mb-5 cards">
                  <div className="row">
                     <div className="col-md-12">
                        <h1 className="mt-5 mb-1 ">Popular Professional Services</h1>
                        <p className="subHeading mb-4 ">Get your project done on time by highly skilled professionals</p>
                        <OwlCarousel className="owl-carousel home-cards-carousel nav={true} dots={false} owl-theme" loop margin={18} nav={true} dots={false} autoplay={true} items={5}>
                           {menuList && menuList.map((menu) => (
                              <div key={menu._id} className="card-box">
                                 <div>
                                    <a href={menu.category} className="subcategory">
                                       <h4><small>{menu.title}</small>{menu.subTitle}</h4>
                                       <picture>
                                          <img src={menu.layoutPhoto} />
                                       </picture>
                                    </a>
                                 </div>
                              </div>
                           ))}
                        </OwlCarousel>
                     </div>
                  </div>
               </div>
            </section>
         }

         <section className="market">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <div className="sectiontitle">
                        <h2>Explore the Marketplace</h2>
                        <h4>Get inspired to build your business</h4>
                     </div>

                     <div className="categorieList">
                        <div className="row space50">
                           <div className="col-md-3 col-6">
                              <a href="categories/graphics-design">
                                 <div className="grn_box">
                                    <img src={require('../../../assets/images/categories/img-01.png')} className="mx-auto d-block" />
                                    <p>Mobiles</p>
                                 </div>
                              </a>
                           </div>
                           <div className="col-md-3 col-6">
                              <a href="categories/digital-marketing">
                                 <div className="grn_box">
                                    <img src={require('../../../assets/images/categories/img-08.png')} className="mx-auto d-block" />
                                    <p>Digital Marketing</p>
                                 </div>
                              </a>
                           </div>
                           <div className="col-md-3 col-6">
                              <a href="categories/writing-translation">
                                 <div className="grn_box">
                                    <img src={require('../../../assets/images/categories/img-02.png')} className="mx-auto d-block" />
                                    <p>Writing & Translation</p>
                                 </div>
                              </a>
                           </div>
                           <div className="col-md-3 col-6">
                              <a href="categories/video-animation">
                                 <div className="grn_box">
                                    <img src={require('../../../assets/images/categories/img-03.png')} className="mx-auto d-block" />
                                    <p>Video &amp; Animation</p>
                                 </div>
                              </a>
                           </div>
                           <div className="col-md-3 col-6">
                              <a href="categories/programming-tech">
                                 <div className="grn_box">
                                    <img src={require('../../../assets/images/categories/img-05.png')} className="mx-auto d-block" />
                                    <p>Programming &amp; Tech</p>
                                 </div>
                              </a>
                           </div>
                           <div className="col-md-3 col-6">
                              <a href="categories/business">
                                 <div className="grn_box">
                                    <img src={require('../../../assets/images/categories/img-06.png')} className="mx-auto d-block" />
                                    <p>Business</p>
                                 </div>
                              </a>
                           </div>
                           <div className="col-md-3 col-6">
                              <a href="categories/fun-lifestyle">
                                 <div className="grn_box">
                                    <img src={require('../../../assets/images/categories/img-07.png')} className="mx-auto d-block" />
                                    <p>Fun & Lifestyle</p>
                                 </div>
                              </a>
                           </div>
                           <div className="col-md-3 col-6">
                              <a href="categories/music-audio">
                                 <div className="grn_box">
                                    <img src={require('../../../assets/images/categories/img-04.png')} className="mx-auto d-block" />
                                    <p>Music & Audio</p>
                                 </div>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>


         <section className="wt-haslayout wt-main-section wt-paddingnull wt-companyinfohold">
            <div className="container">
               <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                     <div className="wt-companydetails">
                        <div className="wt-companycontent">
                           <div className="wt-companyinfotitle">
                              <h2>Start As Company</h2>
                           </div>
                           <div className="wt-description">
                              <p>Consectetur adipisicing elit sed dotem eiusmod tempor incune utnaem labore etdolore maigna aliqua enim poskina ilukita ylokem lokateise ination voluptate velit esse cillum.</p>
                           </div>
                           <div className="wt-btnarea">
                              <a href="javascript:void(0);" className="btn btn-primary">Join Now</a>
                           </div>
                        </div>
                        <div className="wt-companycontent">
                           <div className="wt-companyinfotitle">
                              <h2>Start As Freelancer</h2>
                           </div>
                           <div className="wt-description">
                              <p>Consectetur adipisicing elit sed dotem eiusmod tempor incune utnaem labore etdolore maigna aliqua enim poskina ilukita ylokem lokateise ination voluptate velit esse cillum.</p>
                           </div>
                           <div className="wt-btnarea">
                              <a href="javascript:void(0);" className="btn btn-primary">Join Now</a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>



         <section className="homeFeatured">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <h2>Featured Proposals/Services</h2>
                     <h4>Lorem ipsum dummy Text</h4>
                  </div>
               </div>
               <div className="row mt-5">
                  {gig && gig.map((list) => (<Gig key={list._id} list={list} styles='col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-3 pr-lg-1' />))}

               </div>
            </div>
         </section>


         <section className="wt-haslayout wt-main-section app-download-sec">
            <div className="container">
               <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 float-left">
                     <figure className="wt-mobileimg">
                        <img src={require('../../../assets/images/app-sec-img.svg')} alt="img description" />
                     </figure>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 float-left">
                     <div className="wt-experienceholder">
                        <div className="wt-sectionhead">
                           <div className="wt-sectiontitle">
                              <h2>Limitless Experience</h2>
                              <span>Roam Around With Your Business</span>
                           </div>
                           <div className="wt-description">
                              <p>Dotem eiusmod tempor incune utnaem labore etdolore maigna aliqua enim poskina ilukita ylokem lokateise ination voluptate velit esse cillum dolore eu fugiat nulla pariatur lokaim urianewce.</p>
                              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumed perspiciatis.</p>
                           </div>
                           <ul className="wt-appicon">
                              <li>
                                 <a href="javascript:void(0)">
                                    <figure><img src={require('../../../assets/images/app-icon/img-01.png')} alt="img description" /></figure>
                                 </a>
                              </li>
                              <li>
                                 <a href="javascript:void(0)">
                                    <figure><img src={require('../../../assets/images/app-icon/img-02.png')} alt="img description" /></figure>
                                 </a>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>



         <div className="append-modal"></div>


      </Fragment>
   );
}

export default Landing;