import React from "react";
import HeaderOption from "./HeaderOption";
import "./Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  // const page = useSelector((state) => state.root.page);

  return (
    <div class="col-sm-5">

      <div class="user-area dropdown float-right">

        <button class="btn btn-outline-secondary btn-sm dropdown-toggle text=white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">



          {/* <img src="admin_images" width="30" height="30" class="rounded-circle text-white" /> */}



          <img src="admin_images/empty-image.png" width="30" height="30" class="rounded-circle text-white" />



            &nbsp;  admin_name  &nbsp; <span class="caret"></span>


        </button>



        <div class="user-menu dropdown-menu">

          <a class="nav-link" href="index?dashboard"><i class="fa fa-dashboard"></i> Dashboard</a>

          <a class="nav-link" href="index?user_profile=<?php echo $admin_id; ?>"><i class="fa fa-user"></i> My Profile</a>

          <div class="dropdown-divider"></div>

          <a class="nav-link" href="logout"><i class="fa fa-power-off"></i> Logout</a>
        </div>
      </div>


    </div>



  );
};

export default Header;
