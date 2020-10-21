import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getSubCategory } from "../../../../_actions/user_actions";
import $ from 'jquery';

function Header() {

    useEffect(() => {


        $(document).ready(function () {

            /*$(function () {
                $('[data-toggle="tooltip"]').tooltip();
            });
            $(function () {
                $('[data-toggle="popover"]').popover();
            });*/

            //// Categories Dropdown Code
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

            $(document).on('click', '.dropdown-menu', function(event) {
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

        <React.Fragment>
            <div id="gnav-header" className="gnav-header global-nav clear gnav-3">
                <header id="gnav-header-inner" className="gnav-header-inner clear apply-nav-height col-group has-svg-icons body-max-width">
                    <div className="col-xs-12">
                        <div id="onePress-logo" className="apply-nav-height onePress-logo-svg onePress-logo-svg-logged-in loggedInLogo">
                            <Link to="/">
                                <img className="desktop" src={require('../../../../assets/images/1press-logo.png')} width="150" />
                                {/* <img className="mobile" src={ require('../../../assets/images/1press-logo.png') } height="25" /> */}
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
                                        data-toggle="dropdown">
                                        <img src={require('../../../../assets/images/userlisting/img-03.jpg')} width="27" height="27" className="rounded-circle" />
                                        <span className="name">tyrone</span>
                                    </a>

                                    <div className="dropdown-menu" style={{ minWidth:'200px', width:'auto!important', zIndex:'2000' }} >
                                        <a className="dropdown-item" href="dashboard">
                                            Dashboard   </a>
                                        <a className="dropdown-item dropdown-toggle" href="#" data-toggle="collapse" data-target="#selling">
                                            Selling   </a>
                                        <div id="selling" className="dropdown-submenu collapse">
                                            <a className="dropdown-item" href="selling_orders">
                                                Orders      </a>
                                            <a className="dropdown-item" href="proposals/view_proposals">
                                                My Proposals      </a>
                                            <a className="dropdown-item" href="proposals/create_coupon">
                                                Create A Coupon      </a>
                                            <a className="dropdown-item" href="requests/buyer_requests">
                                                Buyer Requests      </a>
                                            <a className="dropdown-item" href="revenue">
                                                Revenues      </a>
                                            <a className="dropdown-item" href="withdrawal_requests">
                                                Withdrawal Requests      </a>
                                        </div>
                                        <a className="dropdown-item dropdown-toggle" href="#" data-toggle="collapse" data-target="#buying">
                                            Buying   </a>
                                        <div id="buying" className="dropdown-submenu collapse">
                                            <a className="dropdown-item" href="buying_orders">
                                                Orders      </a>
                                            <a className="dropdown-item" href="purchases">
                                                Purchases      </a>
                                            <a className="dropdown-item" href="favorites">
                                                Favorites      </a>
                                        </div>
                                        <a className="dropdown-item dropdown-toggle" href="#" data-toggle="collapse" data-target="#requests">
                                            Requests   </a>
                                        <div id="requests" className="dropdown-submenu collapse">
                                            <a className="dropdown-item" href="requests/post_request">
                                                Post A Request      </a>
                                            <a className="dropdown-item" href="requests/manage_requests">
                                                Manage Requests      </a>
                                        </div>
                                        <a className="dropdown-item dropdown-toggle" href="#" data-toggle="collapse" data-target="#contacts">
                                            Contacts   </a>
                                        <div id="contacts" className="dropdown-submenu collapse">
                                            <a className="dropdown-item" href="manage_contacts?my_buyers">
                                                My Buyers      </a>
                                            <a className="dropdown-item" href="manage_contacts?my_sellers">
                                                My Sellers      </a>
                                        </div>
                                        <a className="dropdown-item dropdown-toggle" href="#" data-toggle="collapse" data-target="#referrals">
                                            My Referrals   </a>
                                        <div id="referrals" className="dropdown-submenu collapse">
                                            <a className="dropdown-item" href="my_referrals" data-target="#referrals">
                                                User Referrals      </a>
                                            <a className="dropdown-item" href="proposal_referrals" data-target="#referrals">
                                                Proposal Referrals      </a>
                                        </div>
                                        <a className="dropdown-item" href="conversations/inbox">
                                            Inbox Messages   </a>
                                        <Link className="dropdown-item" to="/profile">
                                            My Profile   </Link>
                                        <a className="dropdown-item dropdown-toggle" href="#" data-toggle="collapse" data-target="#settings">
                                            Settings   </a>
                                        <div id="settings" className="dropdown-submenu collapse">
                                            <a className="dropdown-item" href="settings?profile_settings">
                                                Profile Settings      </a>
                                            <a className="dropdown-item" href="settings?account_settings">
                                                Account Settings      </a>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="logout">
                                            Logout   </a>
                                    </div>

                                </div>
                            </li>

                        </ul>
                    </div>
                </header>
            </div>
            <div className="clearfix"></div>


        </React.Fragment>
    );
}

export default Header;