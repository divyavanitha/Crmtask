import React, { Fragment, useState } from 'react';
import { withRouter, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logout } from "../../../../_actions/user.action";
import moment from 'moment';
import $ from 'jquery';
import Login from '../auth/Login';
import Register from '../auth/Register';
import ForgotPassword from '../auth/ForgotPassword';
//import { getCartList, findUser, getNotification } from "../../../../_actions/user.action";

function Header() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.user);

    let settings = useSelector((state) => state.settings);

    let site = settings.settings && settings.settings.site;

    /*let cartCount = useSelector((state) => state.user.cart_count);

    const cart = useSelector((state) => state.user && state.user.cart_lists && state.user.cart_lists.carts);
    const notification = useSelector((state) => state.user && state.user.notification && state.user.notification.responseData && state.user.notification.responseData.notification);
    const user = useSelector((state) => state.user && state.user.find_user && state.user.find_user.responseData && state.user.find_user.responseData.user);*/

    const selectMenu = () => {
        $('.dropdown-menu').removeClass('show');
    }

    useEffect(() => {
        
        
        $(document).ready(function () {

            $("body").on("mouseover", ".top-nav-item", function () {
                $(".body-sub-width").addClass("display-none");
                $(".top-nav-item").removeClass("active");
                var node_id = $(this).data('node-id');
                $(this).addClass("active");
                $(".body-sub-width[data-node-id=" + node_id + "]").removeClass("display-none");
            });

            $(".mainHtml .cat-nav").on("mouseleave", function () {
                $(".top-nav-item").removeClass("active");
                $(".body-sub-width").addClass("display-none");
            });

            $('#mobilemenu').on('click', function () {
                $('html body').css('overflow', 'hidden');
                $('.cat-mobile').show();
                $('.mobile-subnav').addClass("display-none");
                $(".mobile-catnav-back-btn").addClass("display-none");
                $("#mobile-sub-catnav-header-title").text("");
                $("#mobile-catnav-header-title").removeClass("display-none");
                $(".mobile-cat-nav").addClass("slideInUp slower");
                $(".mobile-topnav").removeClass("display-none").addClass("slideInUp slower");
                if ($(window).width() <= 421) {
                    $(".mobile-catnav-wrapper").css({
                        "top": "44px"
                    });
                } else if ($(window).width() <= 639) {
                    $(".mobile-catnav-wrapper").css({
                        "top": "60px"
                    });
                }
            });

            $(".cat-mobile .mobile-topnav ul li").on("click", function () {
                $(".top-nav-item").removeClass("active");
                var u_id = $(this).data('uid');
                var name = $(this).data('name');
                $("#mobile-sub-catnav-header-title").text(name);
                $("#mobile-catnav-header-title").addClass("display-none");
                $(".mobile-catnav-back-btn").removeClass("display-none");
                $(".mobile-topnav").addClass("display-none");
                $("#mobile-sub-catnav-content-" + u_id).removeClass("display-none").addClass("slideInRight slower");
                $("#mobile-sub-catnav-content-" + u_id + " ul").removeClass("display-none");
            });

            $(".cat-mobile .mobile-catnav-back-btn").on("click", function () {
                $('.mobile-subnav').addClass("display-none");
                $(".mobile-catnav-back-btn").addClass("display-none");
                $("#mobile-sub-catnav-header-title").text("");
                $("#mobile-catnav-header-title").removeClass("display-none");
                $(".mobile-topnav").removeClass("slideInUp display-none").addClass("slideInLeft slower");
            });

            $('.cat-mobile .overlay-close').on('click', function () {
                $('.cat-mobile').hide();
                $('html body').removeAttr('style');
            });


            /// Mobile Category Menu Code Enye ////

            /// Mobile User Menu Code Starts ////
            $("#usermenu, .bell, .message").on("click", function () {
                if ($(window).width() <= 629) {
                    $('html body').css('overflow', 'hidden');
                    $('.user-mobile').show();
                    $('.mobile-subnav').addClass("display-none");
                    $('.mobile-tertiarynav').addClass("display-none");
                    $(".mobile-catnav-back-btn").addClass("display-none");
                    $(".user-mobile #mobile-sub-catnav-header-title").text("");
                    $(".user-mobile #mobile-catnav-header-title").removeClass("display-none");
                    $(".mobile-cat-nav").addClass("slideInUp slower");
                    $(".mobile-topnav").removeClass("display-none").addClass("slideInUp slower");
                    if ($(window).width() <= 421) {
                        $(".mobile-catnav-wrapper").css({
                            "top": "44px"
                        });
                    } else if ($(window).width() <= 639) {
                        $(".mobile-catnav-wrapper").css({
                            "top": "60px"
                        });
                    }
                }
            });

            $(".user-mobile .mobile-topnav ul li").on("click", function () {
                $(".top-nav-item").removeClass("active");
                var u_id = $(this).data('uid');
                var name = $(this).data('name');
                $(".user-mobile #mobile-sub-catnav-header-title").text(name);
                $(".user-mobile #mobile-catnav-header-title").addClass("display-none");
                $(".user-mobile .mobile-catnav-back-btn").removeClass("display-none");
                $(".user-mobile .mobile-topnav").addClass("display-none");
                $(".user-mobile #mobile-sub-catnav-content-" + u_id).removeClass("display-none").addClass("slideInRight slower");
                $(".user-mobile #mobile-sub-catnav-content-" + u_id + " ul").removeClass("display-none");
            });

            $(".user-mobile .mobile-catnav-back-btn").on("click", function () {
                var subnav_id = $(this).attr('data-subnav-id');
                if (subnav_id == "0") {
                    $('.user-mobile .mobile-subnav').addClass("display-none");
                    $('.user-mobile .mobile-tertiarynav').addClass("display-none");
                    $(".user-mobile .mobile-catnav-back-btn").addClass("display-none");
                    $(".user-mobile #mobile-sub-catnav-header-title").text("");
                    $(".user-mobile #mobile-catnav-header-title").removeClass("display-none");
                    $(".user-mobile .mobile-topnav").removeClass("slideInUp display-none").addClass("slideInLeft slower");
                } else {
                    $(".user-mobile #mobile-sub-catnav-header-title").text("Dashboard");
                    $('.user-mobile .mobile-tertiarynav').addClass("display-none");
                    $(this).attr("data-subnav-id", "0");
                    $(".user-mobile #" + subnav_id).removeClass("display-none").addClass("slideInRight slower");
                }
            });

            $(".user-mobile .mobile-subnav ul li").on("click", function () {
                $(".top-nav-item").removeClass("active");
                var u_id = $(this).data('uid');
                var name = $(this).data('name');
                var parent_id = $(this).parent().parent().attr('id');
                $(".user-mobile #mobile-sub-catnav-header-title").text(name);
                $(".user-mobile #mobile-catnav-header-title").addClass("display-none");
                $(".user-mobile .mobile-catnav-back-btn").removeClass("display-none");
                $(".user-mobile .mobile-catnav-back-btn").attr("data-subnav-id", parent_id);
                $(".user-mobile .mobile-subnav").addClass("display-none");
                $(".user-mobile #mobile-tertiary-nav-" + u_id).removeClass("display-none").addClass("slideInRight slower");
                $(".user-mobile #mobile-tertiary-nav-" + u_id + " ul").removeClass("display-none");
            });

            $('.user-mobile .overlay-close').on("click", function () {
                $('.user-mobile').hide();
                $('html body').removeAttr('style');
            });

            /// Mobile User Menu Code Ends ////

            // Cache selectors
            var lastId,
                topMenu = $("#mainNav"),
                topMenuHeight = topMenu.outerHeight() + 1,

                // All list items
                menuItems = topMenu.find("a"),

                // Anchors corresponding to menu items
                scrollItems = menuItems.map(function () {
                    var item = $($(this).attr("href"));
                    if (item.length) {
                        return item;
                    }
                });

            // Bind click handler to menu items

            // so we can get a fancy scroll animation
            menuItems.on("click", function (e) {
                var href = $(this).attr("href"),
                    offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
                $('html, body').stop().animate({
                    scrollTop: offsetTop
                }, 850);
                // e.preventDefault();
            });

            $(document).on('click', '.dropdown-menu', function (event) {
                event.stopPropagation();
            });

            // Bind to scroll
            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > 0) {
                    // Get container scroll position
                    var fromTop = $(this).scrollTop() + topMenuHeight;
                    // Get id of current scroll item
                    var cur = scrollItems.map(function () {
                        if ($(this).offset().top < fromTop)
                            return this;
                    });
                    // Get the id of the current element
                    cur = cur[cur.length - 1];
                    var id = cur && cur.length ? cur[0].id : "";
                    if (lastId !== id) {
                        lastId = id;
                        // Set/remove active class
                        menuItems.parent().removeClass("selected").end().filter('*[href="#' + id + '"]').parent().addClass("selected");
                    }
                } else {
                    $('.mp-onepress-top-nav li:eq(0)').addClass("selected");
                }
            });

        });

    }, []);

    

    return (

        <Fragment>
            <div id="gnav-header" className="gnav-header global-nav clear gnav-3">
                <header id="gnav-header-inner" className="gnav-header-inner clear apply-nav-height col-group has-svg-icons body-max-width">
                    <div className="col-xs-12">
                        <div id="onePress-logo" className="apply-nav-height onePress-logo-svg onePress-logo-svg-logged-in loggedInLogo">
                            <Link to="/">
                                <img className="desktop" src={site && site.logo} width="150" />
                                {/* <img className="mobile" src={site && site.logo} height="25" /> */}
                            </Link>
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
                        {/* <div className="catnav-search-bar search-browse-wrapper with-catnav">
                            <div className="search-browse-inner">
                                <form id="gnav-search" className="search-nav expanded-search apply-nav-height" method="post">
                                    <div className="gnav-search-inner clearable">
                                        <label htmlFor="search-query" className="screen-reader-only">Search for items</label>
                                        <div className="search-input-wrapper text-field-wrapper">
                                            <input id="search-query" className="rounded" name="search_query" placeholder="Find Services"  autoComplete="off" />
                                        </div>
                                        <div className="search-button-wrapper hide">
                                            <button className="btn btn-primary" name="search" type="submit" value="Search">
                                                <i className="fa fa-search"></i> </button>
                                        </div>
                                    </div>
                                    <ul className="search-bar-panel d-none"></ul>
                                </form>
                            </div>
                        </div> */}


                        {auth.isAuthenticated == false &&
                            (<ul className="account-nav apply-nav-height"><li className="register-link">
                                <a href="#" data-toggle="modal" data-target="#register-modal">
                                    Become a Seller
                     </a>
                            </li>
                                <li className="register-link">
                                    <a href="#" data-toggle="modal" data-target="#login-modal">Sign In</a>
                                </li>
                                <li className="sign-in-link mr-lg-0 mr-3">
                                    <a href="#" className="btn btn_join" style={{ color: "white" }} data-toggle="modal" data-target="#register-modal">
                                        Join Now
                     </a></li></ul>)
                        }
                        {auth.isAuthenticated && (<ul className="account-nav apply-nav-height">
                           
                            <li className="logged-in-link">
                                <div className="dropdown user-menu">
                                    <a href="#" id="usermenu" className="user dropdown-toggle menuItem" style={{ marginTop: "17px" }}
                                        data-toggle="dropdown">
                                        <img src={auth.user && auth.user.profilePhoto ? auth.user && auth.user.profilePhoto : require('../../../../assets/images/userlisting/img-03.jpg')} width="27" height="27" className="rounded-circle" /> &nbsp;
                                        <span className="name">{auth.user && auth.user.firstName}</span>
                                    </a>

                                    <div className="dropdown-menu" style={{ minWidth: '200px', width: 'auto!important', zIndex: '2000' }} >
                                        
                                    
                                        <Link className="dropdown-item" to="/profile"> My Profile </Link>
                                        <div className="dropdown-divider"></div>
                                        <a onClick={() => dispatch(logout())} className="dropdown-item">
                                            Logout   </a>
                                    </div>

                                </div>
                            </li>
                        
                            </ul>)}


                    </div>
                </header>
            </div>
            <div className="clearfix"></div>

            <Login />
            <Register />
            <ForgotPassword />



        </Fragment>
    );
}

export default Header;