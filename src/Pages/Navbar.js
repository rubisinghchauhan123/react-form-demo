// Navbar.js
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const currentUser = useRef(JSON.parse(localStorage.getItem("currentUser")));
  const [user, setUser] = useState(currentUser)
  console.log("user", user)

  useEffect(() => {
    if(currentUser){
      setUser(currentUser)
    }
  },[currentUser])

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <nav>
      <div className="navbar">
        {!user ? (
          <>
          <Link to="/sign-up">Sign Up</Link>
            <Link to="/log-in">Login</Link>
          </>
        ) : (
          <>
            <Link to="/add-todo">Add Todo</Link>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
