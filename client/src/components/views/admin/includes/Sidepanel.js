import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Sidepanel = () => {

    let [leftMenuVisibility, setLeftMenuVisibility] = useState(false);

    function changeLeftMenuVisibility() {
        setLeftMenuVisibility(!leftMenuVisibility);
    }

    function getCollapseClass() {
        return (leftMenuVisibility) ? "" : "collapsed";
    }

    return (
        <Fragment>

            <aside id="left-panel" className="left-panel">
                <nav className="navbar navbar-expand-sm navbar-default">
                    <div className="navbar-header">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu">
                            <i className="fa fa-bars"></i>
                        </button>
                        <a className="navbar-brand" href="index?dashboard">
                            <img className="desktop" src={require('../../../../assets/images/1press-logo.png')} width="150" />
                        </a>
                        <a className="navbar-brand hidden" href="./"><span className="badge badge-success pt-2 pb-2">A</span></a>
                    </div>
                    <div id="main-menu" className="main-menu collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/admin/dashboard"> <i className="menu-icon fa fa-dashboard"></i>Dashboard </Link>
                            </li>

                            <li>
                                <Link> <i className="menu-icon fa fa-table"></i>Proposals/Services <span className="badge badge-success">18</span> </Link>
                            </li>

                            <li className="menu-item-has-children dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="menu-icon fa fa fa-money"></i> Payouts </a>
                                <ul className="sub-menu children dropdown-menu">
                                    <li><i className="fa fa-arrow-circle-right"></i><Link > Pending </Link></li>
                                    <li><i className="fa fa-arrow-circle-right"></i><Link > Declined </Link></li>
                                    <li><i className="fa fa-arrow-circle-right"></i><Link > Completed </Link></li>
                                </ul>
                            </li>

                            <li>
                                <Link > <i className="menu-icon fa fa-dashboard"></i> Inbox Messages </Link>
                            </li>

                            {/* <li className="menu-item-has-children dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="menu-icon fa fa fa-flag"></i> Report/Abuses </a>
                                <ul className="sub-menu children dropdown-menu">
                                    <li><i className="fa fa-arrow-circle-right"></i><Link to="/admin/category/add"> Add Category </Link></li>
                                    <li><i className="fa fa-arrow-circle-right"></i><Link to="/admin/category"> View Category </Link></li>
                                </ul>
                            </li> */}

                            <li className="menu-item-has-children dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="menu-icon fa fa fa-star"></i> Reviews </a>
                                <ul className="sub-menu children dropdown-menu">
                                    <li><i className="fa fa-arrow-circle-right"></i><Link > User Reviews </Link></li>
                                </ul>
                            </li>

                            <li>
                                <Link > <i className="menu-icon fa fa-table"></i>Buyer Requests <span className="badge badge-success">18</span> </Link>
                            </li>

                            <li>
                                <Link to="/admin/category"> <i className="menu-icon fa fa-cubes"></i>Categories </Link>
                            </li>

                            <li>
                                <Link to="/admin/subcategory"> <i className="menu-icon fa fa-list-alt"></i>Sub Categories </Link>
                            </li>

                            <li>
                                <Link to="/admin/language"> <i className="menu-icon fa fa-language"></i>Languages </Link>
                            </li>

                            <li>
                                <Link to="/admin/delivery/time"> <i className="menu-icon fa fa-clock-o"></i>Delivery Times </Link>
                            </li>

                            <li>
                                <Link to="/admin/skill"> <i className="menu-icon fa fa-flash"></i>Seller Skills </Link>
                            </li>

                            <li>
                                <Link to="/admin/promocode"> <i className="menu-icon fa fa-gift"></i>Promocodes</Link>
                            </li>

                            <li>
                                <Link to="/admin/slides"> <i className="menu-icon fa fa-picture-o"></i>Slides </Link>
                            </li>

                            <li>
                                <Link to="/admin/pages"> <i className="menu-icon fa fa-file"></i>Pages </Link>
                            </li>

                            <li>
                                <Link to="/admin/users"> <i className="menu-icon fa fa-users"></i>Users </Link>
                            </li>

                            <li className="menu-item-has-children dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="menu-icon fa fa fa-gear"></i> Settings </a>
                                <ul className="sub-menu children dropdown-menu">
                                    <li><i className="fa fa-arrow-circle-right"></i><Link to="/admin/category/add"> General Settings </Link></li>
                                    <li><i className="fa fa-arrow-circle-right"></i><Link to="/admin/category"> Payment Settings </Link></li>
                                </ul>
                            </li>


                        </ul>
                    </div>
                </nav>
            </aside>
        </Fragment>
    );
};

export default Sidepanel;