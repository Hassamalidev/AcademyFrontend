// TeamMember.jsx
import React from "react";

export function TeamMember({ member }) {
  return (
    <div style={{
      backgroundColor: "#fff",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      transition: "all 0.3s",
      ":hover": {
        transform: "translateY(-10px)",
        boxShadow: "0 15px 40px rgba(0,0,0,0.15)"
      }
    }}>
      <div style={{
        height: "250px",
        backgroundImage: `url(${about_us_background})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}></div>
      <div style={{
        padding: "25px",
        textAlign: "center"
      }}>
        <h4 style={{
          fontSize: "1.3rem",
          fontWeight: "700",
          marginBottom: "5px",
          color: "#2F2010"
        }}>
          {member.name}
        </h4>
        <p style={{
          color: "#4e1faf",
          fontWeight: "600",
          marginBottom: "15px"
        }}>
          {member.role}
        </p>
        <p style={{
          color: "#666",
          lineHeight: "1.6"
        }}>
          {member.bio}
        </p>
      </div>
    </div>
  );
}