import React from "react";
import { FaMedal, FaUserGraduate, FaBook, FaUsers, FaArrowRight } from "react-icons/fa";
import { TeamMember } from "./TeamMember"; // You'll need to create this component
import aboutBackground from "../assets/about_us_background.jpg";
import seniorTeacher from "../assets/senior_teacher.jpg";
import psychTeacher from "../assets/virtual_trainer.jpg";
import virtualTrainer from "../assets/logo-badge.jpg";
function About() {
  const teamMembers = [
    {
      name: "Col. (Retd) Ali Khan",
      role: "Military Strategy Expert",
      bio: "20+ years of experience in Army selection processes",
      image: seniorTeacher
    },
    {
      name: "Dr. Sara Ahmed",
      role: "Psychological Assessment Specialist",
      bio: "PhD in Behavioral Psychology with ISSB specialization",
      image: psychTeacher
    },
    {
      name: "Maj. (Retd) Usman Malik",
      role: "Physical Training Instructor",
      bio: "Specialized in military fitness standards",
      image: virtualTrainer
    }
  ];

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "80px 20px",
      color: "#2F2010",
      fontFamily: "'Poppins', sans-serif",
      background: "linear-gradient(to bottom, #ffffff 0%, #f8f6f9 100%)"
    }}>
     
      <div style={{
        textAlign: "center",
        marginBottom: "80px",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          top: "-50px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "150px",
          height: "150px",
          backgroundImage: aboutBackground,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.1,
          zIndex: 0
        }}></div>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "800",
          color: "#4e1faf",
          marginBottom: "20px",
          position: "relative",
          zIndex: 1,
          textShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          About ISSB SMART STUDY
        </h1>
        <h2 style={{
          fontSize: "2rem",
          fontWeight: "600",
          marginBottom: "30px",
          lineHeight: "1.3",
          position: "relative",
          zIndex: 1,
          color: "#2F2010"
        }}>
          Your Trusted Partner in Armed Forces Preparation
        </h2>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1
        }}>
          <img 
            src="../assets/about_us_.jpg" 
            alt="ISSB Candidates in Training"
            style={{
              width: "100%",
              borderRadius: "15px",
              boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
              marginBottom: "30px"
            }}
          />
        </div>
      </div>

      {/* Mission Section */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "60px",
        marginBottom: "80px",
        alignItems: "center"
      }}>
        <div>
          <h3 style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            color: "#4e1faf",
            marginBottom: "30px",
            position: "relative",
            paddingBottom: "15px"
          }}>
            <span style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "80px",
              height: "4px",
              backgroundColor: "#4e1faf",
              borderRadius: "2px"
            }}></span>
            Our Mission & Vision
          </h3>
          
          <div style={{
            lineHeight: "1.8",
            fontSize: "1.1rem",
            color: "#555"
          }}>
            <p style={{ marginBottom: "25px" }}>
              We are committed to making forces test preparation accessible, 
              affordable, and effective for everyone. Our dream is to see every 
              passionate student wear the proud uniform of Pakistan Armed Forces.
            </p>
            
            <p style={{ marginBottom: "25px" }}>
              At ISSB SMART STUDY, we transform dreams into selections through 
              scientifically-proven training methods, cultivating the leadership 
              and confidence needed for success at ISSB and beyond.
            </p>
            
            <p>
              We believe every student has a soldier within. Our vision is to 
              awaken that spirit and help them serve with pride, courage, and 
              dignity.
            </p>
          </div>
        </div>
        
        <div style={{
          backgroundColor: "#f8f6f9",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "20px"
            }}>
              <div style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#4e1faf",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "1.5rem",
                flexShrink: 0
              }}>
                <FaMedal />
              </div>
              <div>
                <h4 style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  marginBottom: "5px",
                  color: "#2F2010"
                }}>
                  Proven Methodology
                </h4>
                <p style={{ color: "#666", fontSize: "0.95rem" }}>
                  Scientifically-developed training programs with 10+ years of success
                </p>
              </div>
            </div>
            
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "20px"
            }}>
              <div style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#4e1faf",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "1.5rem",
                flexShrink: 0
              }}>
                <FaUserGraduate />
              </div>
              <div>
                <h4 style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  marginBottom: "5px",
                  color: "#2F2010"
                }}>
                  Highest Selection Rate
                </h4>
                <p style={{ color: "#666", fontSize: "0.95rem" }}>
                  Trusted by thousands for the best ISSB passing ratio
                </p>
              </div>
            </div>
            
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "20px"
            }}>
              <div style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#4e1faf",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "1.5rem",
                flexShrink: 0
              }}>
                <FaUsers />
              </div>
              <div>
                <h4 style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  marginBottom: "5px",
                  color: "#2F2010"
                }}>
                  Personalized Guidance
                </h4>
                <p style={{ color: "#666", fontSize: "0.95rem" }}>
                  Tailored coaching for each candidate's unique needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div style={{ marginBottom: "80px" }}>
        <h3 style={{
          fontSize: "1.8rem",
          fontWeight: "700",
          color: "#4e1faf",
          marginBottom: "40px",
          textAlign: "center",
          position: "relative",
          paddingBottom: "15px"
        }}>
          <span style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "4px",
            backgroundColor: "#4e1faf",
            borderRadius: "2px"
          }}></span>
          Meet Our Expert Team
        </h3>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px",
          marginTop: "40px"
        }}>
          {teamMembers.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        backgroundColor: "#4e1faf",
        padding: "60px 40px",
        borderRadius: "15px",
        marginBottom: "80px",
        color: "white",
        textAlign: "center"
      }}>
        <h3 style={{
          fontSize: "2rem",
          fontWeight: "700",
          marginBottom: "50px"
        }}>
          Our Impact in Numbers
        </h3>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "30px"
        }}>
          <div>
            <div style={{
              fontSize: "3rem",
              fontWeight: "800",
              marginBottom: "10px"
            }}>
              10+
            </div>
            <div style={{
              fontSize: "1.1rem",
              fontWeight: "500"
            }}>
              Years of Excellence
            </div>
          </div>
          
          <div>
            <div style={{
              fontSize: "3rem",
              fontWeight: "800",
              marginBottom: "10px"
            }}>
              5,000+
            </div>
            <div style={{
              fontSize: "1.1rem",
              fontWeight: "500"
            }}>
              Successful Candidates
            </div>
          </div>
          
          <div>
            <div style={{
              fontSize: "3rem",
              fontWeight: "800",
              marginBottom: "10px"
            }}>
              98%
            </div>
            <div style={{
              fontSize: "1.1rem",
              fontWeight: "500"
            }}>
              Satisfaction Rate
            </div>
          </div>
          
          <div>
            <div style={{
              fontSize: "3rem",
              fontWeight: "800",
              marginBottom: "10px"
            }}>
              15+
            </div>
            <div style={{
              fontSize: "1.1rem",
              fontWeight: "500"
            }}>
              Comprehensive Courses
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div style={{
        textAlign: "center",
        padding: "60px 40px",
        backgroundColor: "#f8f6f9",
        borderRadius: "15px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
      }}>
        <h3 style={{
          fontSize: "2rem",
          fontWeight: "700",
          marginBottom: "20px",
          color: "#4e1faf"
        }}>
          Ready to Begin Your Journey?
        </h3>
        <p style={{
          fontSize: "1.2rem",
          marginBottom: "30px",
          maxWidth: "700px",
          marginLeft: "auto",
          marginRight: "auto",
          color: "#555"
        }}>
          Join thousands of successful candidates who transformed their dreams into reality with ISSB SMART STUDY
        </p>
        <button style={{
          backgroundColor: "#4e1faf",
          color: "white",
          padding: "15px 40px",
          fontSize: "1.1rem",
          fontWeight: "600",
          border: "none",
          borderRadius: "50px",
          cursor: "pointer",
          transition: "all 0.3s",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          ":hover": {
            backgroundColor: "#3a1685",
            transform: "translateY(-3px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
          }
        }}>
          Enroll Now <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default About;