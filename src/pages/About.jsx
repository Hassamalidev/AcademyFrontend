import React from "react";
import { FaMedal, FaUserGraduate, FaBook, FaUsers } from "react-icons/fa";

function About() {
  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "60px 20px",
      color: "#2F2010",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Hero Section */}
      <div style={{
        textAlign: "center",
        marginBottom: "60px"
      }}>
        <h1 style={{
          fontSize: "2.8rem",
          fontWeight: "700",
          color: "#4e1faf",
          marginBottom: "20px"
        }}>
          About Us
        </h1>
        <h2 style={{
          fontSize: "2.2rem",
          fontWeight: "600",
          marginBottom: "30px",
          lineHeight: "1.3"
        }}>
          ISSB SMART STUDY: Your Gateway to the Armed Forces
        </h2>
        <p style={{
          fontSize: "1.3rem",
          fontWeight: "500",
          color: "#4e1faf",
          marginBottom: "40px"
        }}>
          Trusted by Thousands for the Highest ISSB Passing Ratio
        </p>
      </div>

      {/* Mission Section */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        marginBottom: "60px",
        lineHeight: "1.8",
        fontSize: "1.1rem"
      }}>
        <p>
          We are committed to making forces test preparation accessible, 
          affordable, and effective for everyone. Our dream is to see every 
          passionate student wear the proud uniform of Pakistan Army, 
          Navy, and Air Force.
        </p>
        
        <p>
          At ISSB SMART STUDY, we guide hearts full of hope and minds 
          ready to serve, turning dreams into selections with smart study, 
          strong faith, and sincere efforts that cultivate leadership, 
          confidence, and success in ISSB and beyond.
        </p>
        
        <p>
          We believe every student has a soldier within. Our vision is to 
          awaken that spirit and help them wear the uniform with pride, 
          courage, and dignity.
        </p>
        
        <p>
          Whether you're a student dreaming of joining the armed forces or 
          a repeater candidate aiming to overcome previous hurdles, ISSB 
          SMART STUDY is your trusted partner on the journey to a military 
          career.
        </p>
      </div>

      {/* Call to Action */}
      <div style={{
        textAlign: "center",
        margin: "50px 0",
        padding: "30px",
        backgroundColor: "#f8f6f9",
        borderRadius: "15px"
      }}>
        <h3 style={{
          fontSize: "1.8rem",
          fontWeight: "600",
          marginBottom: "20px",
          color: "#4e1faf"
        }}>
          Join us. Get Smart Training. Serve with Pride.
        </h3>
        <button style={{
          backgroundColor: "#4e1faf",
          color: "white",
          padding: "12px 30px",
          fontSize: "1.1rem",
          fontWeight: "600",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer",
          transition: "all 0.3s",
          ":hover": {
            backgroundColor: "#3a1685",
            transform: "translateY(-2px)"
          }
        }}>
          Start Your Journey Today
        </button>
      </div>

      {/* Stats Section */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "30px",
        marginTop: "60px"
      }}>
        <div style={{
          textAlign: "center",
          padding: "30px",
          backgroundColor: "#f8f6f9",
          borderRadius: "15px"
        }}>
          <div style={{
            fontSize: "2.5rem",
            color: "#4e1faf",
            marginBottom: "15px"
          }}>
            <FaMedal />
          </div>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "10px"
          }}>
            10+ Years
          </h3>
          <p>of Expertise in ISSB Preparation</p>
        </div>
        
        <div style={{
          textAlign: "center",
          padding: "30px",
          backgroundColor: "#f8f6f9",
          borderRadius: "15px"
        }}>
          <div style={{
            fontSize: "2.5rem",
            color: "#4e1faf",
            marginBottom: "15px"
          }}>
            <FaUserGraduate />
          </div>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "10px"
          }}>
            Highest
          </h3>
          <p>ISSB Passing Ratio</p>
        </div>
        
        <div style={{
          textAlign: "center",
          padding: "30px",
          backgroundColor: "#f8f6f9",
          borderRadius: "15px"
        }}>
          <div style={{
            fontSize: "2.5rem",
            color: "#4e1faf",
            marginBottom: "15px"
          }}>
            <FaBook />
          </div>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "10px"
          }}>
            Comprehensive
          </h3>
          <p>Course Development</p>
        </div>
        
        <div style={{
          textAlign: "center",
          padding: "30px",
          backgroundColor: "#f8f6f9",
          borderRadius: "15px"
        }}>
          <div style={{
            fontSize: "2.5rem",
            color: "#4e1faf",
            marginBottom: "15px"
          }}>
            <FaUsers />
          </div>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "10px"
          }}>
            Trusted by
          </h3>
          <p>Thousands of Students</p>
        </div>
      </div>
    </div>
  );
}

export default About;