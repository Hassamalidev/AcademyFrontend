import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [hoveredLink, setHoveredLink] = useState(null);

  const navStyle = {
    backgroundColor: "white",
    color: "#000",
    padding: "1rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const logoStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#1B5E20",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flex: 1,
  };

  const centerNavStyle = {
    flex: 2,
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
    fontWeight: 500,
    fontSize: "1rem",
  };

  const getLinkStyle = (name) => ({
    color: hoveredLink === name ? "#2E7D32" : "#000",
    textDecoration: "none",
    transition: "color 0.3s",
    cursor: "pointer",
  });

  const loginContainerStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  };

  const loginButtonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    textDecoration: "none",
    fontWeight: 500,
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/courses", label: "Our Courses" },
    { to: "/contact", label: "Contact Us" },
    { to: "/demos", label: "Demos" },
    { to: "/news", label: "Latest News" },
  ];

  return (
    <nav style={navStyle}>
      {/* Left - Logo */}
      <Link to="/" style={logoStyle}>
        <img
          src="https://thumbnail.imgbin.com/15/17/21/imgbin-flight-sergeant-royal-canadian-air-cadets-air-training-corps-non-commissioned-officer-military-insignia-X28vn9ezDb0cFGNDwBCvGHk2s_t.jpg"
          alt="logo"
          style={{ width: "30px", height: "30px" }}
        />
        Academy Prep
      </Link>

      {/* Center - Navigation Links */}
      <div style={centerNavStyle}>
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            style={getLinkStyle(item.label)}
            onMouseEnter={() => setHoveredLink(item.label)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right - Login Button */}
      <div style={loginContainerStyle}>
        <Link to="/login" style={loginButtonStyle}>Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
