import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaMedal, FaUserGraduate, FaBook, FaHistory } from "react-icons/fa";

function Hero_2() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const stats = [
    { value: "9+", label: "Years of Experience", icon: <FaHistory /> },
    { value: "100+", label: "ISSB Recommendations", icon: <FaMedal /> },
    { value: "15+", label: "Premium Courses", icon: <FaBook /> },
    { value: "120+", label: "Video Lectures", icon: <FaPlay /> }
  ];
    const handleExploreClick = () => {
    navigate('./courses'); // Navigate to Courses component
  };
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 20px",
      background: "#fff",
      flexWrap: "wrap",
      gap: "40px",
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Blue dots background pattern */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "radial-gradient(#4e1faf 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        opacity: 0.1,
        zIndex: 0
      }} />
      
      {/* Random blue shapes */}
      <div style={{
        position: "absolute",
        top: "20%",
        right: "10%",
        width: "100px",
        height: "100px",
        background: "rgba(78, 31, 175, 0.1)",
        borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        filter: "blur(10px)",
        zIndex: 0
      }} />
      <div style={{
        position: "absolute",
        bottom: "30%",
        left: "15%",
        width: "150px",
        height: "150px",
        background: "rgba(78, 31, 175, 0.08)",
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        filter: "blur(15px)",
        zIndex: 0
      }} />

      {/* Text Content */}
      <div style={{
        flex: "1",
        minWidth: "300px",
        padding: "20px",
        color: "#222",
        maxWidth: "600px",
        position: "relative",
        zIndex: 1
      }}>
        <span style={{
          display: "inline-block",
          background: "#f0e6ff",
          color: "#4e1faf",
          padding: "8px 16px",
          borderRadius: "20px",
          marginBottom: "20px",
          fontWeight: "600",
          fontSize: "0.9rem",
          letterSpacing: "0.5px"
        }}>
          About Us
        </span>
        
        <h1 style={{
          fontSize: "2.8rem",
          fontWeight: "700",
          marginBottom: "20px",
          lineHeight: "1.2",
          color: "#1a1a1a"
        }}>
          Welcome to the Future of Online Learning
        </h1>
        
        <p style={{
          fontSize: "1.1rem",
          lineHeight: "1.7",
          marginBottom: "30px",
          color: "#555"
        }}>
          With 9+ years of expertise, we are dedicated to providing top-notch Pak Army preparation courses that are accessible anytime, anywhere. Our courses are crafted to equip you with the knowledge and skills needed to achieve excellence and secure your future in the armed forces.
        </p>
        
        <ul style={{ 
          listStyle: "none", 
          paddingLeft: "0", 
          marginBottom: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}>
          {[
            "Flexible and affordable online courses",
            "Easy to understand and hands-on learning",
            "Access resources 24/7"
          ].map((item, index) => (
            <li key={index} style={{ 
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              fontSize: "1.1rem"
            }}>
              <span style={{ 
                color: "#34A853", 
                fontWeight: "bold",
                fontSize: "1.2rem"
              }}>✓</span>
              {item}
            </li>
          ))}
        </ul>

        {/* Stats Section with Icons */}
        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "25px",
          marginTop: "40px"
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ 
              textAlign: "center",
              padding: "15px",
              borderRadius: "8px",
              background: "#f9f9f9",
              transition: "all 0.3s ease",
              ":hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
              }
            }}>
              <div style={{
                color: "#4e1faf",
                fontSize: "1.5rem",
                marginBottom: "10px"
              }}>
                {stat.icon}
              </div>
              <div style={{ 
                fontSize: "2rem", 
                fontWeight: "700", 
                color: "#4e1faf",
                lineHeight: "1.2",
                marginBottom: "5px"
              }}>
                {stat.value}
              </div>
              <div style={{ 
                fontSize: "0.9rem", 
                color: "#666",
                fontWeight: "500"
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Section with Hover Effect */}
      <div 
        style={{
          flex: "1",
          minWidth: "300px",
          maxWidth: "500px",
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          zIndex: 1,
          transform: isHovered ? "scale(1.02)" : "scale(1)",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="/about_2.png"
          alt="Military Training"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "cover",
            aspectRatio: "1/1",
            filter: isHovered ? "brightness(1.05)" : "brightness(1)",
            transition: "all 0.3s ease"
          }}
        />
        
        {/* 9+ Years Experience Strip */}
        <div style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#fff",
          padding: "12px 25px",
          borderRadius: "6px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          fontWeight: "700",
          fontSize: "1rem",
          color: "#2F2010",
          textAlign: "center",
          whiteSpace: "nowrap",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          lineHeight: "1.2",
          transition: "all 0.3s ease",
          transform: isHovered ? "translateX(-50%) scale(1.05)" : "translateX(-50%) scale(1)"
        }}>
          <span style={{ 
            color: "#4e1faf", 
            fontSize: "2rem",
            fontWeight: "800",
            marginBottom: "5px"
          }}>9+</span>
          <div>
            <span style={{ fontSize: "0.9rem" }}>YEARS OF EDUCATIONAL</span><br />
            <span style={{ fontSize: "0.9rem" }}>EXCELLENCE</span>
          </div>
        </div>

        {/* Hover Overlay */}
        {isHovered && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(78, 31, 175, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease"
          }}>
            <div 
              style={{
                background: "#fff",
                padding: "15px 25px",
                borderRadius: "8px",
                fontWeight: "bold",
                color: "#4e1faf",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                transform: "translateY(0)",
                animation: "float 3s ease-in-out infinite",
                cursor: "pointer" // Add pointer cursor
              }}
              onClick={handleExploreClick} // Add click handler
            >
              Explore Our Courses →
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero_2;