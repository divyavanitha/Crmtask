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
            <div className="toggle-area">
                <button className="btn btn-primary toggle-button" onClick={() => changeLeftMenuVisibility()}>
                    <i className="fa fa-bolt"></i>
                </button>
            </div>

            <ul className={`navbar-nav bg-gradient-primary-green sidepanel sidepanel-dark accordion ${getCollapseClass()}`}
                id="collapseMenu">

                <Link className="sidepanel-brand d-flex align-items-center justify-content-center" to="/admin/dashboard">
                    <div className="sidepanel-brand-icon icon-green rotate-n-15">
                        <i className="fa fa-bolt"></i>
                    </div>
                    <div className="sidepanel-brand-text mx-3">1Press <sup>Admin</sup></div>
                </Link>

                <hr className="sidepanel-divider my-0" />

                <li className="nav-item active">

                    <Link className="nav-link" to={'/admin/dashboard'}>
                        <i className="fa fa-fw fa-dashboard"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/products`}>
                        <i className="fa fa-fw fa-warehouse"></i>
                        <span>Job Requests</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/products`}>
                        <i className="fa fa-fw fa-warehouse"></i>
                        <span>Job Proposals</span>
                    </Link>
                </li>


                <hr className="sidepanel-divider" />
                <div className="sidepanel-heading">
                    Members
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/admin/users`}>
                        <i className="fa fa-fw fa-warehouse"></i>
                        <span>Users</span>
                    </Link>
                </li>

                <hr className="sidepanel-divider" />
                <div className="sidepanel-heading">
                    Details
</div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/products`}>
                        <i className="fa fa-fw fa-warehouse"></i>
                        <span>Reviews</span>
                    </Link>
                </li>



                <hr className="sidepanel-divider" />
                <div className="sidepanel-heading">
                    Offer
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/products`}>
                        <i className="fa fa-fw fa-warehouse"></i>
                        <span>Coupons</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/products`}>
                        <i className="fa fa-fw fa-warehouse"></i>
                        <span>Orders</span>
                    </Link>
                </li>

                <hr className="sidepanel-divider" />
                <div className="sidepanel-heading">
                    General
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/admin/category`}>
                        <i className="fa fa-fw fa-warehouse"></i>
                        <span>Category</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/admin/subcategory`}>
                        <i className="fa fa-fw fa-warehouse"></i>
                        <span>Sub Category</span>
                    </Link>
                </li>



                <li className="nav-item">
                    <Link className="nav-link" to={`/admin/skill`}>
                        <i className="fa fa-fw fa-warehouse"></i>
                        <span>Skills</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/admin/delivery/time`}>
                        <i className="fa fa-fw fa-warehouse"></i>
                        <span>Delivery Times</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/admin/language`}>
                        <i className="fa fa-fw fa-warehouse"></i>
                        <span>Languages</span>
                    </Link>
                </li>

                <hr className="sidepanel-divider" />

                <div className="sidepanel-heading">
                    Admin
                </div>


                <li className="nav-item">
                    <Link className="nav-link" to={`/admin/users`}>
                        <i className="fa fa-fw fa-user"></i>
                        <span>Users</span>
                    </Link>
                </li>



                <div className="sidepanel-heading">
                    Others
                </div>
                <li className="nav-item">
                    <Link className="nav-link" to={`/products`}>
                        <i className="fa fa-fw fa-warehouse"></i>
                        <span>Pages</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/products`}>
                        <i className="fa fa-fw fa-warehouse"></i>
                        <span>Settings</span>
                    </Link>
                </li>

                <hr className="sidepanel-divider d-none d-md-block" />
            </ul>
        </Fragment>
    );
};

export default Sidepanel;