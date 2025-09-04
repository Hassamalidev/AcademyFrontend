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
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-0.5 h-0.5 bg-gradient-to-br from-[#006400] to-[#228B22] rounded-full opacity-60`}
          style={{
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
            0%, 100% { box-shadow: 0 4px 12px rgba(0, 100, 0, 0.3); }
            50% { box-shadow: 0 6px 20px rgba(0, 100, 0, 0.5), 0 0 0 4px rgba(0, 100, 0, 0.1); }
          }
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/courses", label: "Our Courses" },
    { to: "/contact", label: "Contact Us" },
    { to: "/bmi", label: "BMI" },
    { to: "/news", label: "News" },
    { to: "/ai", label: "AI" },
  ];

  return (
    <>
      <nav 
        className={`flex items-center justify-between sticky top-0 z-50 transition-all duration-400 ease-in-out
          ${isScrolled 
            ? "bg-white/90 backdrop-blur-xl backdrop-saturate-180 border-b border-[#006400]/20 shadow-md py-2 px-4" 
            : "bg-white/95 backdrop-blur-xl backdrop-saturate-180 border-b border-gray-200/30 shadow-sm py-3 px-4"
          }`}
        style={{ transform: `translateY(${Math.min(scrollY * 0.1, 10)}px)` }}
      >
        <FloatingParticles />
        
        <Link 
          to="/" 
          className="font-bold bg-gradient-to-r from-[#006400] via-[#228B22] to-[#006400] bg-clip-text text-transparent no-underline flex items-center gap-2 z-50 transition-all duration-300 ease text-lg"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#006400] to-[#228B22] text-white flex items-center justify-center shadow-md p-1.5">
            <FaRocket className="w-3.5 h-3.5" />
          </div>
          <span className="hidden sm:inline">Frontline Prep</span>
        </Link>

        <div className="hidden md:flex justify-center gap-2 font-medium text-sm flex-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`relative no-underline cursor-pointer transition-all duration-300 ease-in-out font-medium
                ${hoveredLink === item.label 
                  ? "text-white bg-gradient-to-br from-[#228B22] to-[#006400] translate-y-[-2px] shadow-lg" 
                  : "text-gray-700"
                } py-2 px-4 rounded-2xl overflow-hidden`}
              onMouseEnter={() => setHoveredLink(item.label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {hoveredLink === item.label && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#228B22]/10 to-transparent animate-shimmer bg-[length:200%_100%]"></div>
              )}
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {!isMobileView && (
            <Link 
              to="/login" 
              className="bg-gradient-to-br from-[#228B22] to-[#006400] text-white border-none py-2 px-4 rounded-2xl cursor-pointer no-underline font-semibold text-sm shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg hidden md:block"
            >
              Login
            </Link>
          )}

          <button
            className="md:hidden z-50 p-2 rounded-xl transition-all duration-300 ease bg-[#228B22]/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-[#006400] text-xl" />
            ) : (
              <FaBars className="text-[#006400] text-xl" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileView && (
        <>
          <div 
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 ease-in-out z-40
              ${isMobileMenuOpen ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div 
            className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transition-all duration-300 ease-in-out transform
              ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex flex-col h-full">
              {/* Header with close button */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#006400] to-[#228B22] text-white flex items-center justify-center shadow-md p-1.5">
                    <FaRocket className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-[#006400]">Frontline Prep</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <FaTimes className="text-[#006400]" />
                </button>
              </div>
              
              {/* Navigation items */}
              <div className="flex-1 overflow-y-auto py-4 px-2">
                <div className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="py-3 px-4 rounded-xl text-gray-700 font-medium no-underline transition-all duration-300 hover:bg-[#006400]/10 hover:pl-6 hover:text-[#006400]"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Login button at bottom */}
              <div className="p-4 border-t border-gray-200">
                <Link 
                  to="/login" 
                  className="block w-full bg-gradient-to-br from-[#228B22] to-[#006400] text-white text-center py-3 px-4 rounded-xl cursor-pointer no-underline font-semibold shadow-md transition-all duration-300 hover:shadow-lg"
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