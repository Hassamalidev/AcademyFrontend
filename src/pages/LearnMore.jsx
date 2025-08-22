import React, { useState } from "react";

const LearnMore = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = {
    initialTests: {
      title: "Initial Tests",
      icon: "📝",
      color: "#4e1faf",
      content: {
        overview: "First screening phase that includes intelligence and academic assessments",
        components: [
          {
            name: "Verbal Intelligence Test",
            details: "80-90 questions in 30-40 minutes testing vocabulary, analogies, and comprehension"
          },
          {
            name: "Non-Verbal Intelligence Test", 
            details: "Pattern recognition, spatial reasoning, and logical sequences"
          },
          {
            name: "Academic Test",
            details: "Mathematics, Physics, Chemistry, English based on intermediate level"
          }
        ],
        passingCriteria: "Minimum 60% marks required to proceed to next stage",
        tips: [
          "Practice IQ tests and reasoning questions daily",
          "Strengthen basic mathematics and science concepts",
          "Improve vocabulary and English comprehension",
          "Time management is crucial - practice with timer"
        ]
      }
    },
    physical: {
      title: "Physical Fitness",
      icon: "🏃",
      color: "#059669",
      content: {
        overview: "Physical fitness assessment to ensure candidates can handle military training demands",
        components: [
          {
            name: "1.6km Run",
            details: "Males: 6:30 minutes max, Females: 7:30 minutes max"
          },
          {
            name: "Push-ups",
            details: "Males: Minimum 30 in 2 minutes, Females: Minimum 15 in 2 minutes"
          },
          {
            name: "Sit-ups",
            details: "Males: Minimum 35 in 2 minutes, Females: Minimum 25 in 2 minutes"
          },
          {
            name: "Chin-ups",
            details: "Males: Minimum 6, Females: Flexed arm hang for 20 seconds"
          }
        ],
        passingCriteria: "Must pass all components to continue",
        tips: [
          "Start training at least 3 months before ISSB",
          "Focus on cardiovascular endurance",
          "Practice proper form for exercises",
          "Maintain consistent daily workout routine"
        ]
      }
    },
    medical: {
      title: "Medical Examination",
      icon: "🏥",
      color: "#dc2626",
      content: {
        overview: "Comprehensive medical examination to ensure fitness for military service",
        components: [
          {
            name: "Initial Medical",
            details: "Height, weight, basic physical examination, flat feet check"
          },
          {
            name: "Detailed Medical",
            details: "Chest X-ray, blood tests, ECG, eye test, hearing test"
          },
          {
            name: "Specialist Consultations",
            details: "ENT, Ophthalmology, Cardiology as required"
          }
        ],
        passingCriteria: "Must be declared medically fit in all categories",
        tips: [
          "Maintain good health habits before ISSB",
          "Get regular health check-ups",
          "Address any medical issues beforehand",
          "Carry all medical documents if any previous treatments"
        ]
      }
    }
  };

  const services = {
    army: {
      title: "Pakistan Army",
      icon: "🛡️",
      color: "#16a34a",
      courses: [
        {
          name: "PMA Long Course",
          duration: "2 years",
          eligibility: "Intermediate with 60% marks, Age 17-22 years"
        },
        {
          name: "Technical Cadet Course (TCC)",
          duration: "4 years",
          eligibility: "FSc Pre-Engineering with 60% marks, Age 17-22 years"
        }
      ],
      specialBranches: ["Infantry", "Artillery", "Armoured Corps", "Engineers", "Signals", "Aviation"],
      website: "www.joinpakarmy.gov.pk"
    },
    navy: {
      title: "Pakistan Navy",
      icon: "⚓",
      color: "#0ea5e9",
      courses: [
        {
          name: "Pakistan Naval Academy",
          duration: "1.5 years",
          eligibility: "Intermediate with 60% marks, Age 17-22 years"
        },
        {
          name: "Naval Engineering",
          duration: "4 years",
          eligibility: "FSc Pre-Engineering with 60% marks"
        }
      ],
      specialBranches: ["Operations", "Engineering", "Naval Aviation", "Marines", "Submarines"],
      website: "www.paknavy.gov.pk"
    },
    airforce: {
      title: "Pakistan Air Force",
      icon: "✈️",
      color: "#7c3aed",
      courses: [
        {
          name: "General Duty Pilot (GDP)",
          duration: "3 years",
          eligibility: "Intermediate with 60% marks, Age 17-22 years"
        },
        {
          name: "Aeronautical Engineering",
          duration: "4 years",
          eligibility: "FSc Pre-Engineering with 60% marks"
        }
      ],
      specialBranches: ["Flying", "Engineering", "Air Defence", "Administration", "Education"],
      website: "www.joinpaf.gov.pk"
    }
  };

  const CategoryCard = ({ category, data, isSelected, onClick }) => (
    <div
      onClick={() => onClick(isSelected ? null : category)}
      className={`cursor-pointer transition-all duration-300 ${
        isSelected ? 'transform scale-105' : 'hover:transform hover:scale-102'
      }`}
      style={{
        backgroundColor: isSelected ? `${data.color}10` : "white",
        border: `2px solid ${isSelected ? data.color : '#e2e8f0'}`,
        borderRadius: "20px",
        padding: "24px",
        boxShadow: isSelected ? `0 20px 40px ${data.color}20` : "0 8px 25px rgba(0, 0, 0, 0.08)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
        <span style={{ fontSize: "2.5rem" }}>{data.icon}</span>
        <h3 style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: data.color,
          margin: 0
        }}>
          {data.title}
        </h3>
      </div>
      
      <p style={{
        fontSize: "1rem",
        color: "#64748b",
        lineHeight: "1.6",
        margin: 0
      }}>
        {data.content.overview}
      </p>

      {isSelected && (
        <div style={{ marginTop: "24px" }}>
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ color: data.color, fontSize: "1.2rem", fontWeight: "600", marginBottom: "12px" }}>
              Components:
            </h4>
            {data.content.components.map((comp, idx) => (
              <div key={idx} style={{
                backgroundColor: `${data.color}05`,
                padding: "12px 16px",
                borderRadius: "12px",
                marginBottom: "8px",
                borderLeft: `4px solid ${data.color}`
              }}>
                <div style={{ fontWeight: "600", color: "#1e293b", marginBottom: "4px" }}>
                  {comp.name}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#64748b" }}>
                  {comp.details}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ color: data.color, fontSize: "1.2rem", fontWeight: "600", marginBottom: "8px" }}>
              Passing Criteria:
            </h4>
            <p style={{ 
              backgroundColor: `${data.color}08`,
              padding: "12px",
              borderRadius: "8px",
              color: "#1e293b",
              margin: 0,
              fontWeight: "500"
            }}>
              {data.content.passingCriteria}
            </p>
          </div>

          <div>
            <h4 style={{ color: data.color, fontSize: "1.2rem", fontWeight: "600", marginBottom: "12px" }}>
              Preparation Tips:
            </h4>
            {data.content.tips.map((tip, idx) => (
              <div key={idx} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                marginBottom: "8px"
              }}>
                <span style={{ color: data.color, fontWeight: "bold", marginTop: "2px" }}>•</span>
                <span style={{ color: "#475569", fontSize: "0.95rem" }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const ServiceCard = ({ service, data }) => (
    <div style={{
      backgroundColor: "white",
      border: `2px solid ${data.color}20`,
      borderRadius: "20px",
      padding: "24px",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
      transition: "all 0.3s ease"
    }}
    className="hover:transform hover:scale-102">
      
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
        <span style={{ fontSize: "2.5rem" }}>{data.icon}</span>
        <h3 style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: data.color,
          margin: 0
        }}>
          {data.title}
        </h3>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ color: "#1e293b", fontSize: "1.1rem", fontWeight: "600", marginBottom: "12px" }}>
          Available Courses:
        </h4>
        {data.courses.map((course, idx) => (
          <div key={idx} style={{
            backgroundColor: `${data.color}08`,
            padding: "12px",
            borderRadius: "12px",
            marginBottom: "8px"
          }}>
            <div style={{ fontWeight: "600", color: data.color, marginBottom: "4px" }}>
              {course.name}
            </div>
            <div style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "2px" }}>
              Duration: {course.duration}
            </div>
            <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
              {course.eligibility}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ color: "#1e293b", fontSize: "1.1rem", fontWeight: "600", marginBottom: "8px" }}>
          Special Branches:
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {data.specialBranches.map((branch, idx) => (
            <span key={idx} style={{
              backgroundColor: `${data.color}`,
              color: "white",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: "500"
            }}>
              {branch}
            </span>
          ))}
        </div>
      </div>

      <div style={{
        padding: "12px",
        backgroundColor: "#f8fafc",
        borderRadius: "8px",
        textAlign: "center"
      }}>
        <span style={{ fontSize: "0.9rem", color: "#64748b" }}>
          Apply at: {data.website}
        </span>
      </div>
    </div>
  );

  return (
    <div style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "40px 24px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      backgroundColor: "#fafbfc"
    }}>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "800",
          background: "linear-gradient(135deg, #4e1faf, #7c3aed, #059669)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "16px"
        }}>
          ISSB - Complete Guide
        </h1>
        <p style={{
          fontSize: "1.2rem",
          color: "#64748b",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          Everything you need to know about Inter Services Selection Board
        </p>
      </div>

      {/* ISSB Test Categories */}
      <section style={{ marginBottom: "80px" }}>
        <h2 style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#1e293b",
          textAlign: "center",
          marginBottom: "40px"
        }}>
          ISSB Test Categories
        </h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "24px"
        }}>
          {Object.entries(categories).map(([key, data]) => (
            <CategoryCard
              key={key}
              category={key}
              data={data}
              isSelected={selectedCategory === key}
              onClick={setSelectedCategory}
            />
          ))}
        </div>
      </section>

      {/* Services Information */}
      <section style={{ marginBottom: "80px" }}>
        <h2 style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#1e293b",
          textAlign: "center",
          marginBottom: "40px"
        }}>
          Armed Forces Services
        </h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "24px"
        }}>
          {Object.entries(services).map(([key, data]) => (
            <ServiceCard key={key} service={key} data={data} />
          ))}
        </div>
      </section>

      {/* ISSB Process Timeline */}
      <section style={{ marginBottom: "80px" }}>
        <h2 style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#1e293b",
          textAlign: "center",
          marginBottom: "40px"
        }}>
          4-Day ISSB Process
        </h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          {[
            { day: "Day 1", title: "Arrival & Initial Tests", activities: "Registration, Intelligence Test, Academic Test" },
            { day: "Day 2", title: "Psychological Tests", activities: "TAT, WAT, SRT, Self Description" },
            { day: "Day 3", title: "Group Testing", activities: "Group Discussion, Planning Exercise, Physical Tasks" },
            { day: "Day 4", title: "Interview & Results", activities: "Personal Interview, Medical Check, Final Results" }
          ].map((phase, idx) => (
            <div key={idx} style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "16px",
              border: `3px solid ${['#4e1faf', '#059669', '#dc2626', '#7c3aed'][idx]}`,
              textAlign: "center",
              position: "relative"
            }}>
              <div style={{
                backgroundColor: ['#4e1faf', '#059669', '#dc2626', '#7c3aed'][idx],
                color: "white",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "0.9rem",
                fontWeight: "600",
                marginBottom: "16px",
                display: "inline-block"
              }}>
                {phase.day}
              </div>
              <h3 style={{ color: "#1e293b", fontSize: "1.2rem", fontWeight: "600", marginBottom: "12px" }}>
                {phase.title}
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.5", margin: 0 }}>
                {phase.activities}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <div style={{
        textAlign: "center",
        padding: "40px",
        background: "linear-gradient(135deg, #4e1faf 0%, #7c3aed 50%, #059669 100%)",
        borderRadius: "24px",
        color: "white"
      }}>
        <h3 style={{
          fontSize: "2rem",
          fontWeight: "700",
          marginBottom: "16px"
        }}>
          Ready to Start Your ISSB Journey?
        </h3>
        <p style={{
          fontSize: "1.1rem",
          opacity: "0.9",
          marginBottom: "32px",
          maxWidth: "500px",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          Join our Defence Preparatory Academy for expert guidance and comprehensive preparation
        </p>
        <a 
          href="https://whatsapp.com/channel/0029Vb6OOf2JuyABkRXFLn2m"
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            color: "white",
            padding: "16px 32px",
            fontSize: "1.1rem",
            fontWeight: "600",
            borderRadius: "50px",
            textDecoration: "none",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.25)";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.15)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>📱</span>
          Follow Defence Preparatory Academy
        </a>
      </div>
    </div>
  );
};

export default LearnMore;