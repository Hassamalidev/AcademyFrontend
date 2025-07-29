import { useState } from "react";

function BMI() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (!weight || !height) return;

    let weightInKg = parseFloat(weight);
    let heightInM = parseFloat(height);

    if (unit === "imperial") {
      weightInKg = weightInKg * 0.453592;
      heightInM = heightInM * 0.0254;
    } else {
      heightInM = heightInM / 100;
    }

    const bmiValue = weightInKg / (heightInM * heightInM);
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory("Normal weight");
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory("Overweight");
    } else {
      setCategory("Obesity");
    }
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setCategory("");
  };

  const getCategoryColor = () => {
    switch (category) {
      case "Underweight": return "#3b82f6";
      case "Normal weight": return "#10b981";
      case "Overweight": return "#f59e0b";
      case "Obesity": return "#ef4444";
      default: return "#333";
    }
  };

  const getCategoryGradient = () => {
    switch (category) {
      case "Underweight": return "linear-gradient(135deg, #3b82f6, #1d4ed8)";
      case "Normal weight": return "linear-gradient(135deg, #10b981, #059669)";
      case "Overweight": return "linear-gradient(135deg, #f59e0b, #d97706)";
      case "Obesity": return "linear-gradient(135deg, #ef4444, #dc2626)";
      default: return "linear-gradient(135deg, #6366f1, #4f46e5)";
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#ffffff",
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 48, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.03) 0%, transparent 50%)
      `,
      padding: "20px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <div style={{
        maxWidth: "520px",
        margin: "0 auto",
        paddingTop: "60px"
      }}>
        {/* Header with modern styling */}
        <div style={{
          textAlign: "center",
          marginBottom: "48px",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "4px",
            background: "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)",
            borderRadius: "2px"
          }}></div>
          
          <h1 style={{
            fontSize: "42px",
            fontWeight: "800",
            background: "linear-gradient(135deg, #1f2937, #374151)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: "0 0 12px 0",
            letterSpacing: "-1px",
            lineHeight: "1.1"
          }}>
            BMI Calculator
          </h1>
          <p style={{
            fontSize: "18px",
            color: "#6b7280",
            margin: "0",
            fontWeight: "500",
            letterSpacing: "0.5px"
          }}>
            Discover your body mass index with precision
          </p>
        </div>

        {/* Main Card with enhanced styling */}
        <div style={{
          backgroundColor: "#ffffff",
          border: "1px solid rgba(229, 231, 235, 0.8)",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: `
            0 20px 25px -5px rgba(0, 0, 0, 0.08),
            0 10px 10px -5px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.9)
          `,
          marginBottom: "32px",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Subtle decorative elements */}
          <div style={{
            position: "absolute",
            top: "-50%",
            right: "-50%",
            width: "100%",
            height: "100%",
            background: "linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.01), transparent)",
            borderRadius: "50%",
            pointerEvents: "none"
          }}></div>

          {/* Unit Toggle with modern design */}
          <div style={{
            marginBottom: "36px"
          }}>
            <label style={{
              display: "block",
              fontSize: "15px",
              fontWeight: "700",
              color: "#374151",
              marginBottom: "16px",
              letterSpacing: "0.5px",
              textTransform: "uppercase"
            }}>
              Unit System
            </label>
            <div style={{
              display: "flex",
              backgroundColor: "#f8fafc",
              borderRadius: "16px",
              padding: "6px",
              width: "240px",
              border: "1px solid #e2e8f0",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.04)"
            }}>
              {["metric", "imperial"].map((unitType) => (
                <button
                  key={unitType}
                  onClick={() => setUnit(unitType)}
                  style={{
                    flex: "1",
                    padding: "14px 20px",
                    border: "none",
                    borderRadius: "12px",
                    background: unit === unitType 
                      ? "linear-gradient(135deg, #6366f1, #4f46e5)" 
                      : "transparent",
                    color: unit === unitType ? "#ffffff" : "#64748b",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    textTransform: "capitalize",
                    letterSpacing: "0.5px",
                    boxShadow: unit === unitType 
                      ? "0 4px 8px rgba(99, 102, 241, 0.25)" 
                      : "none"
                  }}
                  onMouseOver={(e) => {
                    if (unit !== unitType) {
                      e.target.style.backgroundColor = "#e2e8f0";
                      e.target.style.color = "#475569";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (unit !== unitType) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#64748b";
                    }
                  }}
                >
                  {unitType}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Input Fields */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginBottom: "40px"
          }}>
            <div style={{ position: "relative" }}>
              <label style={{
                display: "block",
                fontSize: "15px",
                fontWeight: "700",
                color: "#374151",
                marginBottom: "12px",
                letterSpacing: "0.5px",
                textTransform: "uppercase"
              }}>
                Weight {unit === "metric" ? "(kg)" : "(lbs)"}
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === "metric" ? "70" : "154"}
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "16px",
                    fontSize: "17px",
                    fontWeight: "500",
                    outline: "none",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    backgroundColor: "#ffffff",
                    boxSizing: "border-box",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6366f1";
                    e.target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1), 0 1px 3px rgba(0, 0, 0, 0.04)";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.04)";
                    e.target.style.transform = "translateY(0)";
                  }}
                />
                <div style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "14px",
                  color: "#9ca3af",
                  fontWeight: "600",
                  pointerEvents: "none"
                }}>
                  {unit === "metric" ? "KG" : "LBS"}
                </div>
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <label style={{
                display: "block",
                fontSize: "15px",
                fontWeight: "700",
                color: "#374151",
                marginBottom: "12px",
                letterSpacing: "0.5px",
                textTransform: "uppercase"
              }}>
                Height {unit === "metric" ? "(cm)" : "(in)"}
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === "metric" ? "175" : "69"}
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "16px",
                    fontSize: "17px",
                    fontWeight: "500",
                    outline: "none",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    backgroundColor: "#ffffff",
                    boxSizing: "border-box",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6366f1";
                    e.target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1), 0 1px 3px rgba(0, 0, 0, 0.04)";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.04)";
                    e.target.style.transform = "translateY(0)";
                  }}
                />
                <div style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "14px",
                  color: "#9ca3af",
                  fontWeight: "600",
                  pointerEvents: "none"
                }}>
                  {unit === "metric" ? "CM" : "IN"}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Buttons */}
          <div style={{
            display: "flex",
            gap: "16px",
            marginBottom: bmi ? "40px" : "0"
          }}>
            <button
              onClick={calculateBMI}
              disabled={!weight || !height}
              style={{
                flex: "1",
                padding: "20px 32px",
                background: (!weight || !height) 
                  ? "linear-gradient(135deg, #d1d5db, #9ca3af)"
                  : "linear-gradient(135deg, #6366f1, #4f46e5)",
                color: "#ffffff",
                border: "none",
                borderRadius: "16px",
                fontSize: "17px",
                fontWeight: "700",
                cursor: (!weight || !height) ? "not-allowed" : "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                boxShadow: (!weight || !height) 
                  ? "none"
                  : "0 8px 16px rgba(99, 102, 241, 0.25)"
              }}
              onMouseOver={(e) => {
                if (weight && height) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 12px 24px rgba(99, 102, 241, 0.35)";
                }
              }}
              onMouseOut={(e) => {
                if (weight && height) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 8px 16px rgba(99, 102, 241, 0.25)";
                }
              }}
            >
              Calculate BMI
            </button>
            
            <button
              onClick={reset}
              style={{
                padding: "20px 28px",
                backgroundColor: "#ffffff",
                color: "#6b7280",
                border: "2px solid #e5e7eb",
                borderRadius: "16px",
                fontSize: "17px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#f9fafb";
                e.target.style.borderColor = "#d1d5db";
                e.target.style.color = "#374151";
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.08)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.color = "#6b7280";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.04)";
              }}
            >
              Reset
            </button>
          </div>

          {/* Enhanced Results */}
          {bmi && (
            <div style={{
              background: `linear-gradient(135deg, ${getCategoryColor()}08, ${getCategoryColor()}04)`,
              border: `2px solid ${getCategoryColor()}30`,
              borderRadius: "20px",
              padding: "32px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              animation: "slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: getCategoryGradient(),
                borderRadius: "20px 20px 0 0"
              }}></div>
              
              <div style={{
                fontSize: "64px",
                fontWeight: "900",
                background: getCategoryGradient(),
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "12px",
                lineHeight: "1",
                letterSpacing: "-2px"
              }}>
                {bmi}
              </div>
              
              <div style={{
                fontSize: "24px",
                fontWeight: "700",
                color: getCategoryColor(),
                marginBottom: "16px",
                letterSpacing: "0.5px",
                textTransform: "uppercase"
              }}>
                {category}
              </div>

              <div style={{
                fontSize: "16px",
                color: "#6b7280",
                lineHeight: "1.6",
                fontWeight: "500",
                maxWidth: "320px",
                margin: "0 auto"
              }}>
                {category === "Normal weight" 
                  ? "Excellent! You're maintaining a healthy weight range. Keep up the great work with your lifestyle!" 
                  : "Consider consulting with a healthcare professional for personalized guidance and recommendations."
                }
              </div>
            </div>
          )}
        </div>

        {/* Enhanced BMI Scale Reference */}
        <div style={{
          backgroundColor: "#ffffff",
          border: "1px solid rgba(229, 231, 235, 0.8)",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: `
            0 10px 15px -3px rgba(0, 0, 0, 0.06),
            0 4px 6px -2px rgba(0, 0, 0, 0.04)
          `
        }}>
          <h3 style={{
            fontSize: "22px",
            fontWeight: "800",
            color: "#1f2937",
            margin: "0 0 24px 0",
            letterSpacing: "-0.5px"
          }}>
            BMI Categories Reference
          </h3>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            fontSize: "15px"
          }}>
            {[
              { color: "#3b82f6", label: "Underweight", range: "< 18.5" },
              { color: "#10b981", label: "Normal", range: "18.5 - 24.9" },
              { color: "#f59e0b", label: "Overweight", range: "25.0 - 29.9" },
              { color: "#ef4444", label: "Obesity", range: "≥ 30.0" }
            ].map((item, index) => (
              <div key={index} style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "12px",
                padding: "12px 16px",
                backgroundColor: `${item.color}08`,
                borderRadius: "12px",
                border: `1px solid ${item.color}20`
              }}>
                <div style={{
                  width: "16px",
                  height: "16px",
                  background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                  borderRadius: "50%",
                  boxShadow: `0 2px 4px ${item.color}40`
                }}></div>
                <div>
                  <div style={{ 
                    color: "#1f2937", 
                    fontWeight: "700",
                    marginBottom: "2px"
                  }}>
                    {item.label}
                  </div>
                  <div style={{ 
                    color: "#6b7280", 
                    fontWeight: "500",
                    fontSize: "13px"
                  }}>
                    {item.range}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  );
}

export default BMI;