import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Can from "../../../../components/Can";
import { Link } from "react-router-dom";

const Sidepanel = () => {

    let settings = useSelector((state) => state.settings);

    let site = settings.settings && settings.settings.site;

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
                        <Link className="navbar-brand" to="/admin/dashboard">
                            <img className="desktop" src={site && site.logo} width="150" />
                        </Link>
                        <a className="navbar-brand hidden" href="./"><span className="badge badge-success pt-2 pb-2">A</span></a>
                    </div>
                    <div id="main-menu" className="main-menu collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <Can permission="dashboard">
                                <li>
                                    <Link to="/admin/dashboard"> <i className="menu-icon fa fa-dashboard"></i>Dashboard </Link>
                                </li>
                            </Can>

                            <li>
                                <Link to="/admin/gigs"> <i className="menu-icon fa fa-table"></i>Proposals/Services <span className="badge badge-success">18</span> </Link>
                            </li>

                            <li className="menu-item-has-children dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="menu-icon fa fa fa-money"></i> Payouts </a>
                                <ul className="sub-menu children dropdown-menu">
                                    <li><i className="fa fa-arrow-circle-right"></i><Link to="/admin/pending"> Pending </Link></li>
                                    <li><i className="fa fa-arrow-circle-right"></i><Link to="/admin"> Declined </Link></li>
                                    <li><i className="fa fa-arrow-circle-right"></i><Link to="/admin"> Completed </Link></li>
                                </ul>
                            </li>

                            <li>
                                <Link to="/admin"> <i className="menu-icon fa fa-dashboard"></i> Inbox Messages </Link>
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
                                    <li><i className="fa fa-arrow-circle-right"></i><Link to="/admin"> User Reviews </Link></li>
                                </ul>
                            </li>

                            <li>
                                <Link to="/admin/request"> <i className="menu-icon fa fa-table"></i>Buyer Requests <span className="badge badge-success">18</span> </Link>
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
                                <Link to="/admin/slide"> <i className="menu-icon fa fa-picture-o"></i>Slides </Link>
                            </li>

                            <li>
                                <Link to="/admin/menu"> <i className="menu-icon fa fa-picture-o"></i>Menus </Link>
                            </li>

                            <li>
                                <Link to="/admin/package"> <i className="menu-icon fa fa-file"></i>Packages </Link>
                            </li>

                            <li>
                                <Link to="/admin/page"> <i className="menu-icon fa fa-file"></i>Pages </Link>
                            </li>

                            <li>
                                <Link to="/admin/cancel/reason"> <i className="menu-icon fa fa-picture-o"></i>Cancel Reason </Link>
                            </li>

                            <li>
                                <Link to="/admin/user"> <i className="menu-icon fa fa-users"></i>Users </Link>
                            </li>

                            <Can permission="administrator:list"><li>
                                <Link to="/admin/admininstrator"> <i className="menu-icon fa fa-users"></i>Admininstrators </Link>
                            </li></Can>

                            <li className="menu-item-has-children dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="menu-icon fa fa fa-gear"></i> Settings </a>
                                <ul className="sub-menu children dropdown-menu">
                                    <li><i className="fa fa-arrow-circle-right"></i><Link to="/admin/settings/general"> General Settings </Link></li>
                                    <li><i className="fa fa-arrow-circle-right"></i><Link to="/admin/settings/application"> Application Settings </Link></li>
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