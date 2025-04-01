import React from "react";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <div className="sidebar">
      <h2>My Sidebar</h2>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  );
};

export default Navbar;