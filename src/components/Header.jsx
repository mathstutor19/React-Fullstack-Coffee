import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header_flex">
      <div className="menu_flex">
        <Link to="/">
          <div className="menu_gap">
            <h4>Menu</h4>
          </div>
        </Link>
      </div>
      <div>
        <Link to="/addcoffee">
          <button className="btn">Add coffee</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
