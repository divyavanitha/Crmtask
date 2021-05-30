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

                            <li>
                                <Link to="/admin/post"> <i className="menu-icon fa fa-picture-o"></i>Posts </Link>
                            </li>

                            <li>
                                <Link to="/admin/user"> <i className="menu-icon fa fa-users"></i>Users </Link>
                            </li>

                            <li>
                                <Link to="/admin/comments"> <i className="menu-icon fa fa-flag"></i>Comments </Link>
                            </li>

                            <Can permission="administrator:list"><li>
                                <Link to="/admin/admininstrator"> <i className="menu-icon fa fa-users"></i>Admininstrators </Link>
                            </li></Can>

                            <li className="menu-item-has-children dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="menu-icon fa fa fa-gear"></i> Settings </a>
                                <ul className="sub-menu children dropdown-menu">
                                    <li><i className="fa fa-arrow-circle-right"></i><Link to="/admin/settings/general"> General Settings </Link></li>
                                    
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