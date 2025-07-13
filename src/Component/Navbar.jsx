import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Check screen size and update state
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
      // Close mobile menu when resizing to desktop view
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    zIndex: 1001, // Ensure logo stays above mobile menu
  };

  const centerNavStyle = {
    flex: 2,
    display: isMobileView ? "none" : "flex",
    justifyContent: "center",
    gap: "1.5rem",
    fontWeight: 500,
    fontSize: "1rem",
  };

  const mobileMenuStyle = {
    position: "fixed",
    top: "70px",
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: "2rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    alignItems: "center",
    zIndex: 999,
    transition: "all 0.3s ease",
    transform: isMobileMenuOpen ? "translateY(0)" : "translateY(-150%)",
    opacity: isMobileMenuOpen ? 1 : 0,
    pointerEvents: isMobileMenuOpen ? "all" : "none",
  };

  const getLinkStyle = (name) => ({
    color: hoveredLink === name ? "#2E7D32" : "#000",
    textDecoration: "none",
    transition: "color 0.3s",
    cursor: "pointer",
    padding: "0.5rem 0",
    fontSize: isMobileView ? "1.2rem" : "1rem",
  });

  const loginContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
  };

  const mobileLoginContainerStyle = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #eee",
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
    fontSize: isMobileView ? "1rem" : "inherit",
  };

  const mobileMenuButtonStyle = {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#1B5E20",
    display: isMobileView ? "block" : "none",
    marginLeft: "1rem",
    zIndex: 1001,
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

      {/* Center - Navigation Links (Desktop) */}
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

      {/* Right - Login Button (Desktop) */}
      {!isMobileView && (
        <div style={loginContainerStyle}>
          <Link to="/login" style={loginButtonStyle}>
            Login
          </Link>
        </div>
      )}

      {/* Mobile Menu Button */}
      {isMobileView && (
        <button
          style={mobileMenuButtonStyle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      {/* Mobile Menu */}
      {isMobileView && (
        <div style={mobileMenuStyle}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              style={getLinkStyle(item.label)}
              onClick={() => setIsMobileMenuOpen(false)}
              onMouseEnter={() => setHoveredLink(item.label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {item.label}
            </Link>
          ))}
          <div style={mobileLoginContainerStyle}>
            <Link 
              to="/login" 
              style={loginButtonStyle}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;