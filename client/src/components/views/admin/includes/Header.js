import React, { useState, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../_actions/admin/auth.action";

const Header = () => {

  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const [isShow, setShow] = useState(false);


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
                     &nbsp; {admin.admin.name}  &nbsp; <span className="caret"></span>
              </button>
              <div className="user-menu dropdown-menu">
                <a className="nav-link" href="index?dashboard"><i className="fa fa-dashboard"></i> Change Password</a>
                <a className="nav-link" href="index?user_profile=1">
                  <i className="fa fa-user"></i> My Profile
                        </a>
                <div className="dropdown-divider"></div>
                <a className="nav-link" onClick={ () => dispatch(logout()) }><i className="fa fa-power-off"></i> Logout</a>
              </div>
            </div>
          </div>
        </div>
      </header>


    </React.Fragment>



  );
}

export default Header;
