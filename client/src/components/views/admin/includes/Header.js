import React from "react";
import { useSelector } from "react-redux";

const Header = () => {


  return (
    <React.Fragment>


      <header id="header" className="header">
        <div className="header-menu">
          <div className="col-sm-7">
          </div>
          <div className="col-sm-5 pr-sm-0">
            <div className="user-area dropdown float-right">
              <button className="btn btn-outline-secondary btn-sm dropdown-toggle text=white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="admin-img.jpg" width="30" height="30" className="rounded-circle text-white" />
                     &nbsp; Patrice  &nbsp; <span className="caret"></span>
              </button>
              <div className="user-menu dropdown-menu">
                <a className="nav-link" href="index?dashboard"><i className="fa fa-dashboard"></i> Change Password</a>
                <a className="nav-link" href="index?user_profile=1">
                  <i className="fa fa-user"></i> My Profile
                        </a>
                <div className="dropdown-divider"></div>
                <a className="nav-link" href="logout"><i className="fa fa-power-off"></i> Logout</a>
              </div>
            </div>
          </div>
        </div>
      </header>


    </React.Fragment>



  );
}

export default Header;
