import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import LCC from "../assets/LCC.jpg"
import LongCourse from "../assets/Long_Course.jpg"
import medicalCorp from "../assets/medical_corp.jpg"
import PafPic from "../assets/paf_pic.jpg"
import Navy from "../assets/navy_pic.jpg"



function HomeCategory() {
  const navigate = useNavigate();

  const categories = [
    {
      id: "long-cadet",
      title: "Long Cadets Course",
      description: "Comprehensive training program for aspiring military officers with rigorous physical and academic preparation.",
      image:LongCourse,
       icon: "🎖️",
      color: "#2F2010"
    },
    {
      id: "lady-cadet",
      title: "Lady Cadet Course",
      description: "Specialized training program designed for female candidates to excel in military leadership roles.",
      image:LCC,
      icon: "💂‍♀️",
      color: "#5c2018"
    },
    {
      id: "navy",
      title: "Navy Courses",
      description: "Prepare for a career at sea with specialized naval training programs and technical education.",
      icon: "⚓",
      image:Navy,
      color: "#1a4b8c"
    },
    {
      id: "air-force",
      title: "Air Force Courses",
      description: "Take to the skies with our aviation-focused training programs for future air force officers.",
      image:PafPic,
      icon: "✈️",
      color: "#3a7ca5"
    },
    {
      id: "technical",
      title: "Technical Courses",
      description: "Specialized technical training for engineering and support roles across military branches.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa0lRDw3GHdpaAIfhYy-5ozn_gmZoPE6v-oA&s",
      icon: "🛠️",
      color: "#4a4e4d"
    },
    {
      id: "medical",
      title: "Medical Corps",
      description: "Training programs for medical professionals serving in military healthcare systems.",
      image:medicalCorp,
      icon: "⚕️",
      color: "#6b0504"
    }
  ];

  const handleExploreClick = () => {
    navigate('./courses'); 
  };

  return (
    <div className="category-section" style={{
      padding: "60px 20px",
      background: "#f8f9fa",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: "50px",
        position: "relative",
        zIndex: 2,
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#333",
          marginBottom: "15px",
          position: "relative",
          display: "inline-block",
        }}>
          Browse Our Categories
          <span style={{
            position: "absolute",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "4px",
            background: "linear-gradient(90deg, #1a4b8c, #3a7ca5)",
            borderRadius: "2px",
          }}></span>
        </h2>
        <p style={{
          fontSize: "1.1rem",
          color: "#666",
          maxWidth: "700px",
          margin: "0 auto",
          lineHeight: "1.6",
        }}>
          Explore our comprehensive range of military preparation courses designed to help you succeed in your armed forces career.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "30px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        zIndex: 2,
      }}>
        {categories.map((category, index) => (
          <div key={category.id} style={{
            background: "#fff",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            transition: "all 0.3s ease",
            position: "relative",
            border: `3px solid ${category.color}`,
            transform: `rotate(${Math.random() * 4 - 2}deg)`,
            ':hover': {
              transform: "translateY(-10px) rotate(0deg)",
              boxShadow: `0 15px 35px rgba(0,0,0,0.12), 0 0 0 3px ${category.color}`,
            }
          }}>
            <div style={{
              height: "180px",
              position: "relative",
              overflow: "hidden",
            }}>
              <img 
                src={category.image} 
                alt={category.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.9)",
                }}
              />
              <div style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                background: `linear-gradient(to bottom, transparent 0%, ${category.color} 100%)`,
                opacity: 0.7,
              }}></div>
              <div style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(255,255,255,0.9)",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
              }}>
                {category.icon}
              </div>
            </div>

            <div style={{
              padding: "25px",
            }}>
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                marginBottom: "15px",
                color: "#333",
              }}>
                {category.title}
              </h3>
              <p style={{
                color: "#666",
                marginBottom: "25px",
                lineHeight: "1.6",
              }}>
                {category.description}
              </p>
              <button
                onClick={handleExploreClick}
                style={{
                  background: category.color,
                  color: "#fff",
                  border: "none",
                  padding: "12px 25px",
                  borderRadius: "50px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s",
                  boxShadow: `0 4px 15px ${category.color}40`,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#333";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = category.color;
                  e.currentTarget.style.transform = "none";
                }}
              >
                Explore Category <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        zIndex: 1,
        opacity: 0.05,
        backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}></div>
    </div>
  );
}

export default HomeCategory;