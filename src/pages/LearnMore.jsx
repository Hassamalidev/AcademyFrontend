
import React from "react";

const LearnMore = () => {
  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "80px 24px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <h1 style={{
        fontSize: "2.5rem",
        fontWeight: "800",
        color: "#1e293b",
        marginBottom: "40px",
        textAlign: "center",
        background: "linear-gradient(135deg, #4e1faf, #7c3aed)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>
        ISSB - Inter Services Selection Board
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        marginBottom: "60px"
      }}>
        <div>
          <h2 style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#1e293b",
            marginBottom: "20px"
          }}>
            History of ISSB
          </h2>
          <p style={{
            fontSize: "1.125rem",
            lineHeight: "1.7",
            color: "#475569",
            marginBottom: "20px"
          }}>
            The Inter Services Selection Board (ISSB) was established in 1949 to select officers for the Pakistan Armed Forces. 
            The system was developed based on the German Army's psychological assessment methods used during World War II.
          </p>
          <p style={{
            fontSize: "1.125rem",
            lineHeight: "1.7",
            color: "#475569"
          }}>
            Over the years, ISSB has evolved into a comprehensive 4-day assessment process that evaluates candidates on 
            intelligence, personality, leadership potential, and physical fitness through various tests and group activities.
          </p>
        </div>
        <div>
          <h2 style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#1e293b",
            marginBottom: "20px"
          }}>
            Selection Process
          </h2>
          <ul style={{
            listStyle: "none",
            padding: 0
          }}>
            {[
              "Initial Tests (Intelligence, Academic)",
              "Psychological Tests (Personality Assessment)",
              "Group Testing (Leadership, Teamwork)",
              "Individual Tasks (Planning, Problem Solving)",
              "Interview (Personal Evaluation)",
              "Final Conference (Selection Decision)"
            ].map((item, index) => (
              <li key={index} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                marginBottom: "12px",
                fontSize: "1.125rem",
                color: "#475569"
              }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "24px",
                  height: "24px",
                  backgroundColor: "#4e1faf",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  flexShrink: 0
                }}>
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{
        backgroundColor: "rgba(78, 31, 175, 0.05)",
        padding: "40px",
        borderRadius: "20px",
        border: "1px solid rgba(78, 31, 175, 0.1)",
        marginBottom: "60px"
      }}>
        <h2 style={{
          fontSize: "1.75rem",
          fontWeight: "700",
          color: "#1e293b",
          marginBottom: "20px"
        }}>
          Preparation Tips
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px"
        }}>
          {[
            {
              title: "Physical Fitness",
              tips: [
                "Regular running (2.4km in under 10 minutes)",
                "Push-ups (minimum 30 in 2 minutes)",
                "Sit-ups (minimum 35 in 2 minutes)",
                "Chin-ups (minimum 6 in 2 minutes)"
              ]
            },
            {
              title: "Psychological Preparation",
              tips: [
                "Practice group discussions",
                "Develop decision-making skills",
                "Work on emotional stability",
                "Improve communication skills"
              ]
            },
            {
              title: "General Knowledge",
              tips: [
                "Stay updated on current affairs",
                "Study Pakistan's history",
                "Learn about military history",
                "Understand basic military concepts"
              ]
            }
          ].map((section, index) => (
            <div key={index} style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)"
            }}>
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#4e1faf",
                marginBottom: "16px"
              }}>
                {section.title}
              </h3>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0
              }}>
                {section.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    marginBottom: "12px",
                    fontSize: "1rem",
                    color: "#475569"
                  }}>
                    <span style={{
                      color: "#4e1faf",
                      fontWeight: "bold"
                    }}>•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        textAlign: "center",
        padding: "40px",
        backgroundColor: "rgba(78, 31, 175, 0.05)",
        borderRadius: "20px",
        border: "1px dashed rgba(78, 31, 175, 0.3)"
      }}>
        <h3 style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#1e293b",
          marginBottom: "20px"
        }}>
          Need Personalized Guidance?
        </h3>
        <p style={{
          fontSize: "1.125rem",
          color: "#64748b",
          marginBottom: "24px",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          Our expert instructors are ready to help you prepare for your ISSB journey.
        </p>
        <a 
          href="https://wa.me/923001234567" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #4e1faf 0%, #7c3aed 100%)",
            color: "white",
            padding: "16px 32px",
            fontSize: "1.125rem",
            fontWeight: "600",
            borderRadius: "16px",
            textDecoration: "none",
            boxShadow: "0 8px 20px rgba(78, 31, 175, 0.3)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 12px 30px rgba(78, 31, 175, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 8px 20px rgba(78, 31, 175, 0.3)";
          }}
        >
          Contact Us on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default LearnMore;