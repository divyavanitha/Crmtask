import React from "react";
import HeaderOption from "./HeaderOption";
import "./Header.css";
import { useSelector } from "react-redux";

const Header = () => {
 // const page = useSelector((state) => state.root.page);

  return (
    <nav className="navbar navbar-expand navbar-light bg-custom-dark topbar mb-4 static-top shadow">
      <ol className="breadcrumb dark-breadcrumb">
        {/* <li className="breadcrumb-item"><a href="# ">{page ? page.area : null}</a></li>
        <li className="breadcrumb-item"><a href="# ">{page ? page.subArea : null}</a></li> */}
      </ol>

      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>
        <HeaderOption />
      </ul>
    </nav>
  );
};

export default Header;
