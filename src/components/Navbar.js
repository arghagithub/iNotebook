import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar = (props) => {
  let location = useLocation();
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem('token');
    props.showalert("successfully logged out","success");
    navigate('/login');
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <Link className="btn btn-primary" to="/login" role="button" style={{display: (localStorage.getItem('token')?'none':'')}}>
              Login
            </Link>
            <Link className="btn btn-success mx-3" to="/signup" role="button" style={{display: (localStorage.getItem('token')?'none':'')}}>
              Signup
            </Link>
            <button className="btn btn-danger" type="button" onClick={logout} style={{display: (localStorage.getItem('token')?'':'none')}}>
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
