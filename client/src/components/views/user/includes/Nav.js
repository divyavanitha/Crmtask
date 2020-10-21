import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategory } from "../../../../_actions/user_actions";

function Nav() {

    const dispatch = useDispatch();

    useEffect(() => {

        // Update the document title using the browser API
        dispatch(getCategory())

    }, []);

    const category = useSelector(state => state.user.category);
    const category_list = category && category.responseData.categories;
    console.log('cat',category_list);

    return (

        <React.Fragment>

            <div data-ui="cat-nav" id="desktop-category-nav" className="ui-toolkit cat-nav ">
                <div className="bg-transparent-homepage-experiment hide-xs hide-sm hide-md">
                    <div className="col-group body-max-width">
                        <ul className="col-xs-12 body-max-width display-flex-xs justify-content-space-between" role="menubar"
                            data-ui="top-nav-category-list" aria-activedescendant="catnav-primary-link-10855">
                            {category_list && category_list.map((c_list) => (<li key={c_list._id} className="top-nav-item pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 display-flex-xs align-items-center text-center"
                                data-linkable="true" data-ui="top-nav-category-link" data-node-id={c_list._id}>
                                <a href="">
                                    {c_list.name} </a>
                            </li>))}
                           
                        </ul>
                    </div>
                </div>
                <div className="position-absolute col-xs-12 col-centered z-index-4">
                    <div>
                    {category_list && category_list.map((c_list) => (
                        <div  key={ `s_${c_list._id}` }
                            className="body-sub-width vertical-align-top sub-nav-container bg-white overflow-hidden bl-xs-1 bb-xs-1 br-xs-1 catnav-mott-control display-none"
                            data-ui="sub-nav" aria-hidden="true" data-node-id={c_list._id}>
                            <div className="width-full display-flex-xs">
                            {c_list.subCategories && (
                                <ul className="list-unstyled subcategory display-inline-block col-xs-3 p-xs-3 pl-xs-5" role="presentation">
                                   
                                {c_list.subCategories.map((subCategories) => (
                                    <li key={subCategories._id}>
                                        <a className="display-block text-gray text-body-larger pt-xs-1"
                                            href="categories/graphics-design/logo-design">
                                            {subCategories.name} </a>
                                    </li>
                                ))}
                                   
                                </ul>
                            )}
                            </div>
                        </div>
                        ))}
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
                                        <img src={require('../../../../assets/images/1press-logo.png')} width="158" />
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
                                        {/* <!--  <a href=""><img src={ require('../../../assets/images/https://s3.ap-south-1.amazonaws.com/onePress/images/onePressFav.ico" className="rounded" title='Home' alt='Home'/></a> --> */}
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
                                                <div className='flag-img flag-img-right'>
                                                    <span className='onePress-icon float-right'>
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
                                                <div className='flag-img flag-img-right'>
                                                    <span className='onePress-icon float-right'>
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
                                                <div className='flag-img flag-img-right'>
                                                    <span className='onePress-icon float-right'>
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
                                                <div className='flag-img flag-img-right'>
                                                    <span className='onePress-icon float-right'>
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
                                                <div className='flag-img flag-img-right'>
                                                    <span className='onePress-icon float-right'>
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
                                                <div className='flag-img flag-img-right'>
                                                    <span className='onePress-icon float-right'>
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
                                                <div className='flag-img flag-img-right'>
                                                    <span className='onePress-icon float-right'>
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
                                                <div className='flag-img flag-img-right'>
                                                    <span className='onePress-icon float-right'>
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
                                                <div className='flag-img flag-img-right'>
                                                    <span className='onePress-icon float-right'>
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


        </React.Fragment>
    );
}

export default Nav;