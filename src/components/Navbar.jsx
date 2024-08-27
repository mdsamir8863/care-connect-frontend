import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { Context } from "../main";
import "../styles/Navbar.css";
import axios from "axios";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("/");
  const [menuBar, setMenuBar] = useState(true);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "https://care-connect-p81e.onrender.com/api/v1/user/patient/me",
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    }
  };

  if (document.cookie) {
    fetchUser();
  }

  useEffect(() => {
    // fetchUser();
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth !== null) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
  }, [setIsAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user"); // Optionally remove user data as well
    setIsAuthenticated(false);
  };

  const handleMenuBar = () => {
    setMenuBar(!menuBar);
  };

  return (
    <>
      <nav className="deskNav">
        <div className="logo">
          <Link to="/" className="logo-img">
            <img
              style={{ height: "4rem", borderRadius: "10px" }}
              src={Logo}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="navLinks">
          <div className="links">
            <Link
              onClick={handleMenuBar}
              to="/"
              className={`link ${activeTab === "/" ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              onClick={handleMenuBar}
              to="/services"
              className={`link ${activeTab === "/services" ? "active" : ""}`}
            >
              Services
            </Link>
            <Link
              onClick={handleMenuBar}
              to="/about"
              className={`link ${activeTab === "/about" ? "active" : ""}`}
            >
              About
            </Link>
            <Link
              onClick={handleMenuBar}
              to="/doctors"
              className={`link ${activeTab === "/doctors" ? "active" : ""}`}
            >
              Doctors
            </Link>
          </div>
          <div className="buttons">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="logoutBtn btn">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="loginBtn btn">
                  Login
                </Link>
                <Link to="/register" className="registerBtn btn">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <nav className="mbNav">
        <div className="logo">
          <Link to="/" className="logo-img">
            <img
              style={{ height: "4rem", borderRadius: "10px" }}
              src={Logo}
              alt="Logo"
            />
          </Link>
        </div>
        <button className="menuIcon" onClick={handleMenuBar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        {menuBar && (
          <>
            <div className="navLinks">
              <div className="links">
                <Link
                  onClick={handleMenuBar}
                  to="/"
                  className={`link ${activeTab === "/" ? "active" : ""}`}
                >
                  Home
                </Link>
                <Link
                  onClick={handleMenuBar}
                  to="/services"
                  className={`link ${
                    activeTab === "/services" ? "active" : ""
                  }`}
                >
                  Services
                </Link>
                <Link
                  onClick={handleMenuBar}
                  to="/about"
                  className={`link ${activeTab === "/about" ? "active" : ""}`}
                >
                  About
                </Link>
                <Link
                  onClick={handleMenuBar}
                  to="/doctors"
                  className={`link ${activeTab === "/doctors" ? "active" : ""}`}
                >
                  Doctors
                </Link>
              </div>
              <div className="buttons">
                {isAuthenticated ? (
                  <button onClick={handleLogout} className="logoutBtn btn">
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      onClick={handleMenuBar}
                      to="/login"
                      className="loginBtn btn"
                    >
                      Login
                    </Link>
                    <Link
                      onClick={handleMenuBar}
                      to="/register"
                      className="registerBtn btn"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
