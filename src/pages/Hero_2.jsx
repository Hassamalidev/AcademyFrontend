import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaMedal, FaUserGraduate, FaBook, FaHistory } from "react-icons/fa";
import cardImage from "../assets/Hero_2.png";

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
    navigate('./courses'); 
  };

  return (
    <>
      <style jsx>{`
        .hero-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          background: #fff;
          flex-wrap: wrap;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }

        .bg-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(#4e1faf 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.1;
          z-index: 0;
        }

        .bg-shape-1 {
          position: absolute;
          top: 20%;
          right: 10%;
          width: 100px;
          height: 100px;
          background: rgba(78, 31, 175, 0.1);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          filter: blur(10px);
          z-index: 0;
        }

        .bg-shape-2 {
          position: absolute;
          bottom: 30%;
          left: 15%;
          width: 150px;
          height: 150px;
          background: rgba(78, 31, 175, 0.08);
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          filter: blur(15px);
          z-index: 0;
        }

        .content-section {
          flex: 1;
          min-width: 300px;
          padding: 20px;
          color: #222;
          max-width: 600px;
          position: relative;
          z-index: 1;
        }

        .badge {
          display: inline-block;
          background: #f0e6ff;
          color: #4e1faf;
          padding: 8px 16px;
          border-radius: 20px;
          margin-bottom: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
        }

        .main-title {
          font-size: 2.8rem;
          font-weight: 700;
          margin-bottom: 20px;
          line-height: 1.2;
          color: #1a1a1a;
        }

        .description {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 30px;
          color: #555;
        }

        .features-list {
          list-style: none;
          padding-left: 0;
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 1.1rem;
        }

        .checkmark {
          color: #34A853;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 25px;
          margin-top: 40px;
        }

        .stat-card {
          text-align: center;
          padding: 15px;
          border-radius: 8px;
          background: #f9f9f9;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .stat-icon {
          color: #4e1faf;
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #4e1faf;
          line-height: 1.2;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #666;
          font-weight: 500;
        }

        .image-section {
          flex: 1;
          min-width: 300px;
          max-width: 500px;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          z-index: 1;
          transform: scale(1);
          transition: all 0.3s ease;
        }

        .image-section:hover {
          transform: scale(1.02);
        }

        .hero-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          aspect-ratio: 1/1;
          filter: brightness(1);
          transition: all 0.3s ease;
        }

        .image-section:hover .hero-image {
          filter: brightness(1.05);
        }

        .years-badge {
          position: absolute;
          bottom: 30px;
          left: 50%;
          background: #fff;
          padding: 12px 25px;
          border-radius: 6px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          font-weight: 700;
          font-size: 1rem;
          color: #2F2010;
          text-align: center;
          white-space: nowrap;
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1.2;
          transition: all 0.3s ease;
          transform: translateX(-50%) scale(1);
        }

        .image-section:hover .years-badge {
          transform: translateX(-50%) scale(1.05);
        }

        .years-number {
          color: #4e1faf;
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 5px;
        }

        .years-text {
          font-size: 0.9rem;
        }

        .hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(78, 31, 175, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          opacity: 0;
        }

        .image-section:hover .hover-overlay {
          opacity: 1;
        }

        .explore-button {
          background: #fff;
          padding: 15px 25px;
          border-radius: 8px;
          font-weight: bold;
          color: #4e1faf;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
        }

        .explore-button:hover {
          transform: translateY(-2px);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .explore-button {
          animation: float 3s ease-in-out infinite;
        }

        /* Tablet Styles */
        @media (max-width: 768px) {
          .hero-container {
            padding: 60px 15px;
            gap: 30px;
          }

          .content-section {
            min-width: 280px;
            padding: 15px;
          }

          .main-title {
            font-size: 2.2rem;
            margin-bottom: 15px;
          }

          .description {
            font-size: 1rem;
            margin-bottom: 25px;
          }

          .feature-item {
            font-size: 1rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 30px;
          }

          .stat-card {
            padding: 12px;
          }

          .stat-icon {
            font-size: 1.3rem;
            margin-bottom: 8px;
          }

          .stat-value {
            font-size: 1.6rem;
          }

          .stat-label {
            font-size: 0.8rem;
          }

          .image-section {
            min-width: 280px;
            max-width: 400px;
          }

          .years-badge {
            bottom: 20px;
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          .years-number {
            font-size: 1.6rem;
          }

          .years-text {
            font-size: 0.8rem;
          }

          .bg-shape-1, .bg-shape-2 {
            display: none;
          }
        }

        /* Mobile Styles */
        @media (max-width: 480px) {
          .hero-container {
            flex-direction: column;
            padding: 40px 10px;
            gap: 25px;
          }

          .content-section {
            min-width: 100%;
            padding: 10px;
            order: 2;
          }

          .badge {
            padding: 6px 12px;
            font-size: 0.8rem;
            margin-bottom: 15px;
          }

          .main-title {
            font-size: 1.8rem;
            text-align: center;
            margin-bottom: 15px;
          }

          .description {
            font-size: 0.95rem;
            text-align: center;
            margin-bottom: 20px;
          }

          .features-list {
            margin-bottom: 25px;
          }

          .feature-item {
            font-size: 0.9rem;
            gap: 8px;
          }

          .checkmark {
            font-size: 1rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-top: 25px;
          }

          .stat-card {
            padding: 8px;
            border-radius: 6px;
          }

          .stat-icon {
            font-size: 1rem;
            margin-bottom: 5px;
          }

          .stat-value {
            font-size: 1.2rem;
            margin-bottom: 3px;
          }

          .stat-label {
            font-size: 0.7rem;
            line-height: 1.2;
          }

          .image-section {
            min-width: 100%;
            max-width: 100%;
            order: 1;
          }

          .years-badge {
            bottom: 15px;
            padding: 8px 15px;
            font-size: 0.8rem;
          }

          .years-number {
            font-size: 1.4rem;
            margin-bottom: 3px;
          }

          .years-text {
            font-size: 0.7rem;
          }

          .explore-button {
            padding: 12px 20px;
            font-size: 0.9rem;
          }
        }

        /* Extra Small Mobile */
        @media (max-width: 360px) {
          .hero-container {
            padding: 30px 8px;
          }

          .main-title {
            font-size: 1.6rem;
          }

          .description {
            font-size: 0.9rem;
          }

          .stats-grid {
            gap: 8px;
          }

          .stat-card {
            padding: 6px;
          }

          .stat-value {
            font-size: 1rem;
          }

          .stat-label {
            font-size: 0.65rem;
          }

          .years-badge {
            padding: 6px 12px;
          }

          .years-number {
            font-size: 1.2rem;
          }

          .years-text {
            font-size: 0.65rem;
          }
        }
      `}</style>

      <div className="hero-container">
        
        <div className="bg-pattern" />
        <div className="bg-shape-1" />
        <div className="bg-shape-2" />

        <div className="content-section">
          <span className="badge">
            About Us
          </span>

          <h1 className="main-title">
            Welcome to the Future of Online Learning
          </h1>

          <p className="description">
            With 9+ years of expertise, we are dedicated to providing top-notch Pak Army preparation courses that are accessible anytime, anywhere. Our courses are crafted to equip you with the knowledge and skills needed to achieve excellence and secure your future in the armed forces.
          </p>

          <ul className="features-list">
            {[
              "Flexible and affordable online courses",
              "Easy to understand and hands-on learning",
              "Access resources 24/7"
            ].map((item, index) => (
              <li key={index} className="feature-item">
                <span className="checkmark">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  {stat.icon}
                </div>
                <div className="stat-value">
                  {stat.value}
                </div>
                <div className="stat-label">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div 
          className="image-section"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={cardImage}
            alt="Military Training"
            className="hero-image"
          />

          <div className="years-badge">
            <span className="years-number">9+</span>
            <div>
              <span className="years-text">YEARS OF EDUCATIONAL</span><br />
              <span className="years-text">EXCELLENCE</span>
            </div>
          </div>

          {isHovered && (
            <div className="hover-overlay">
              <button 
                className="explore-button"
                onClick={handleExploreClick} 
              >
                Explore Our Courses →
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Hero_2;