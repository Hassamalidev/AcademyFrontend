import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaRocket } from "react-icons/fa";

function Navbar() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };

    handleResize();
    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const FloatingParticles = () => (
    <div style={{
      position: 'absolute',
      inset: '0',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: '0'
    }}>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: 'linear-gradient(45deg, #10b981, #34d399)',
            borderRadius: '50%',
            opacity: '0.6',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float${(i % 3) + 1} ${3 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      <style>
        {`
          @keyframes float1 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(180deg); }
          }
          @keyframes float2 {
            0%, 100% { transform: translateX(0px) rotate(0deg); }
            50% { transform: translateX(10px) rotate(360deg); }
          }
          @keyframes float3 {
            0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
            33% { transform: translate(5px, -5px) rotate(120deg); }
            66% { transform: translate(-5px, 5px) rotate(240deg); }
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); }
            50% { box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5), 0 0 0 4px rgba(16, 185, 129, 0.1); }
          }
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
        `}
      </style>
    </div>
  );

  const navStyle = {
    background: isScrolled 
      ? 'rgba(255, 255, 255, 0.85)' 
      : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    borderBottom: isScrolled 
      ? '1px solid rgba(16, 185, 129, 0.2)' 
      : '1px solid rgba(229, 231, 235, 0.3)',
    boxShadow: isScrolled 
      ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(16, 185, 129, 0.05)' 
      : '0 4px 24px rgba(0, 0, 0, 0.08)',
    padding: isScrolled ? "0.75rem 2rem" : "1rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: `translateY(${Math.min(scrollY * 0.1, 10)}px)`,
  };

  const logoStyle = {
    fontSize: isScrolled ? "1.15rem" : "1.25rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flex: 1,
    zIndex: 1001,
    transition: "all 0.3s ease",
    position: "relative",
  };

  const logoIconStyle = {
    width: isScrolled ? "28px" : "32px",
    height: isScrolled ? "28px" : "32px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #059669, #10b981)",
    padding: "6px",
    color: "white",
    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
    transition: "all 0.3s ease",
    animation: "pulse-glow 3s ease-in-out infinite",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const centerNavStyle = {
    flex: 2,
    display: isMobileView ? "none" : "flex",
    justifyContent: "center",
    gap: "0.5rem",
    fontWeight: "500",
    fontSize: "0.95rem",
    position: "relative",
  };

  const mobileMenuOverlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    background: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    zIndex: 998,
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: isMobileMenuOpen ? 1 : 0,
    pointerEvents: isMobileMenuOpen ? "all" : "none",
  };

  const mobileMenuStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: isMobileMenuOpen 
      ? "translate(-50%, -50%) scale(1)" 
      : "translate(-50%, -50%) scale(0.9)",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "3rem 2.5rem",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.3)",
    border: "1px solid rgba(16, 185, 129, 0.1)",
    minWidth: "320px",
    maxWidth: "90vw",
    zIndex: 999,
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: isMobileMenuOpen ? 1 : 0,
    pointerEvents: isMobileMenuOpen ? "all" : "none",
  };

  const getLinkStyle = (name, index) => {
    const isActive = hoveredLink === name;
    return {
      color: isActive ? "#ffffff" : "#374151",
      textDecoration: "none",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: "pointer",
      padding: isMobileView ? "1rem 1.5rem" : "0.75rem 1.25rem",
      borderRadius: "16px",
      fontSize: isMobileView ? "1.1rem" : "0.95rem",
      fontWeight: "500",
      position: "relative",
      background: isActive 
        ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" 
        : "transparent",
      boxShadow: isActive 
        ? "0 8px 25px rgba(16, 185, 129, 0.3), 0 0 0 1px rgba(16, 185, 129, 0.1)" 
        : "none",
      transform: isActive ? "translateY(-2px)" : "translateY(0)",
      overflow: "hidden",
    };
  };

  const linkHoverOverlayStyle = (name) => ({
    position: "absolute",
    top: "0",
    left: hoveredLink === name ? "0" : "-100%",
    right: "0",
    bottom: "0",
    background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent)",
    transition: "all 0.6s ease",
    zIndex: "-1",
    animation: hoveredLink === name ? "shimmer 2s ease-in-out infinite" : "none",
    backgroundSize: "200% 100%",
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
    marginTop: "2rem",
    paddingTop: "2rem",
    borderTop: "2px solid rgba(16, 185, 129, 0.1)",
  };

  const loginButtonStyle = {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    border: "none",
    padding: isMobileView ? "1rem 2rem" : "0.75rem 1.5rem",
    borderRadius: "16px",
    cursor: "pointer",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: isMobileView ? "1.1rem" : "0.95rem",
    boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3), 0 0 0 1px rgba(16, 185, 129, 0.1)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
  };

  const loginButtonHoverStyle = {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 35px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(16, 185, 129, 0.2)",
  };

  const mobileMenuButtonStyle = {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#059669",
    display: isMobileView ? "block" : "none",
    marginLeft: "1rem",
    zIndex: 1001,
    padding: "0.5rem",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    backgroundColor: isMobileMenuOpen ? "rgba(16, 185, 129, 0.1)" : "transparent",
    transform: isMobileMenuOpen ? "rotate(90deg)" : "rotate(0deg)",
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/courses", label: "Our Courses" },
    { to: "/contact", label: "Contact Us" },
    { to: "/bmi", label: "BMI" },
    { to: "/news", label: "Latest News" },
  ];

  return (
    <>
      <nav style={navStyle}>
        <FloatingParticles />
        
        <Link to="/" style={logoStyle}>
          <div style={logoIconStyle}>
            <FaRocket size={16} />
          </div>
          Frontline Prep
        </Link>

        <div style={centerNavStyle}>
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.to}
              style={getLinkStyle(item.label, index)}
              onMouseEnter={() => setHoveredLink(item.label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <div style={linkHoverOverlayStyle(item.label)}></div>
              {item.label}
            </Link>
          ))}
        </div>

        {!isMobileView && (
          <div style={loginContainerStyle}>
            <Link 
              to="/login" 
              style={loginButtonStyle}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, loginButtonHoverStyle);
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.3), 0 0 0 1px rgba(16, 185, 129, 0.1)";
              }}
            >
              Login
            </Link>
          </div>
        )}

        <button
          style={mobileMenuButtonStyle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {isMobileView && (
        <>
          <div 
            style={mobileMenuOverlayStyle}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div style={mobileMenuStyle}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
              alignItems: "center"
            }}>
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.to}
                  style={getLinkStyle(item.label, index)}
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
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;