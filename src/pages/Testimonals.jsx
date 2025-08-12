import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    studentName: "",
    remark: "",
    status: "Student"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  const testimonialsPerSlide = 3;

  const API_URL = "https://localhost:7110/api/StudentRemarks";

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1rem",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: "white",
    minHeight: "100vh",
    position: "relative"
  };

  const contentWrapperStyle = {
    background: "white",
    borderRadius: "16px",
    padding: "1.5rem",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e2e8f0"
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "2rem"
  };

  const titleStyle = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontSize: "2.5rem",
    fontWeight: "800",
    marginBottom: "0.5rem",
    letterSpacing: "-0.02em",
    lineHeight: "1.2"
  };

  const subtitleStyle = {
    color: "#64748b",
    fontSize: "1rem",
    maxWidth: "600px",
    margin: "0 auto 1.5rem",
    lineHeight: "1.5",
    fontWeight: "400"
  };

  const buttonStyle = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    padding: "12px 24px",
    fontSize: "0.95rem",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fontWeight: "600",
    margin: "0 8px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
    position: "relative",
    overflow: "hidden"
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)"
  };

  const buttonHoverStyle = {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)"
  };

  const carouselContainerStyle = {
    position: "relative",
    marginTop: "1.5rem",
    overflow: "hidden"
  };

  const carouselStyle = {
    display: "flex",
    transition: "transform 0.5s ease-in-out",
    transform: `translateX(-${currentSlide * 100}%)`
  };

  const slideStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.5rem",
    minWidth: "100%",
    flex: "0 0 100%"
  };

  const navigationStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    marginTop: "2rem"
  };

  const navButtonStyle = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    padding: "12px 16px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
    fontSize: "1.2rem",
    width: "48px",
    height: "48px"
  };

  const navButtonDisabledStyle = {
    ...navButtonStyle,
    background: "#e2e8f0",
    color: "#94a3b8",
    cursor: "not-allowed",
    boxShadow: "none"
  };

  const dotsContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem"
  };

  const dotStyle = {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#e2e8f0",
    cursor: "pointer",
    transition: "all 0.3s ease"
  };

  const activeDotStyle = {
    ...dotStyle,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    transform: "scale(1.2)"
  };

  const cardStyle = {
    background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    position: "relative",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    overflow: "hidden"
  };

  const cardHoverStyle = {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.15)"
  };

  const quoteIconStyle = {
    fontSize: "2rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: "1",
    marginBottom: "0.75rem",
    fontWeight: "bold",
    userSelect: "none",
    pointerEvents: "none"
  };

  const testimonialTextStyle = {
    color: "#475569",
    fontSize: "0.95rem",
    lineHeight: "1.6",
    marginBottom: "1rem",
    flexGrow: 1,
    fontStyle: "italic",
    display: "-webkit-box",
    WebkitLineClamp: "4",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    userSelect: "text"
  };

  const authorContainerStyle = {
    borderTop: "1px solid #e2e8f0",
    paddingTop: "1rem",
    position: "relative",
    pointerEvents: "none"
  };

  const authorNameStyle = {
    fontWeight: "700",
    color: "#1e293b",
    fontSize: "1rem",
    marginBottom: "0.25rem",
    userSelect: "text",
    pointerEvents: "auto"
  };

  const authorTitleStyle = {
    color: "#64748b",
    fontSize: "0.85rem",
    fontWeight: "500",
    userSelect: "text",
    pointerEvents: "auto"
  };

  const badgeStyle = {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "600",
    alignSelf: "flex-start",
    marginBottom: "0.75rem",
    boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.2)"
  };

  const formModalStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    background: "rgba(15, 23, 42, 0.7)",
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000",
    padding: "1rem"
  };

  const formContainerStyle = {
    background: "white",
    padding: "2rem",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    maxHeight: "90vh",
    overflowY: "auto"
  };

  const formGroupStyle = {
    marginBottom: "1.5rem"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "600",
    color: "#1e293b",
    fontSize: "0.95rem"
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "0.95rem",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    background: "rgba(255, 255, 255, 0.8)",
    fontFamily: "inherit"
  };

  const inputFocusStyle = {
    borderColor: "#667eea",
    outline: "none",
    boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
    background: "rgba(255, 255, 255, 1)"
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
    lineHeight: "1.5"
  };

  const formActionsStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.75rem",
    marginTop: "1.5rem"
  };

  const statusOptions = [
    "Trainee",
    "Student",
    "Selected",
    "Recommended",
    "Not Recommended",
    "Initial Cleared",
    "Interview Cleared",
    "Selected Candidate",
    "ISSB Recommended",
    "Course Graduate"
  ];

  const getStatusBadgeColor = (status) => {
    const colorMap = {
      "Trainee": "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      "Student": "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
      "Selected": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      "Recommended": "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      "Not Recommended": "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      "Initial Cleared": "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      "Interview Cleared": "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
      "Selected Candidate": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      "ISSB Recommended": "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      "Course Graduate": "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
    };
    return colorMap[status] || "linear-gradient(135deg, #64748b 0%, #475569 100%)";
  };

  // Carousel navigation functions
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);
  
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  // Group testimonials into slides
  const groupedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += testimonialsPerSlide) {
    groupedTestimonials.push(testimonials.slice(i, i + testimonialsPerSlide));
  }

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${API_URL}/approved`);
        setTestimonials(response.data);
      } catch (err) {
        setError("Failed to load testimonials. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleExploreCourses = () => {
    navigate("/courses");
  };

  const handleAddTestimonial = () => {
    setShowForm(true);
    setSubmitSuccess(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(API_URL, {
        ...formData,
        createdAt: new Date().toISOString(),
        isApproved: false
      });
      
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowForm(false);
        setFormData({
          studentName: "",
          remark: "",
          status: "Student"
        });
        setSubmitSuccess(false);
      }, 2500);
    } catch (err) {
      console.error("Error submitting testimonial:", err);
      setError("Failed to submit testimonial. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseForm = () => {
    if (!isSubmitting) {
      setShowForm(false);
      setFormData({
        studentName: "",
        remark: "",
        status: "Student"
      });
    }
  };

  // Compact loading state
  if (loading) {
    return (
      <section style={containerStyle}>
        <div style={contentWrapperStyle}>
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <div style={{
              display: "inline-block",
              width: "40px",
              height: "40px",
              border: "3px solid rgba(102, 126, 234, 0.2)",
              borderLeftColor: "#667eea",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }} />
            <p style={{ 
              marginTop: "1rem", 
              color: "#64748b",
              fontSize: "1rem",
              fontWeight: "500"
            }}>
              Loading testimonials...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Compact error state
  if (error) {
    return (
      <section style={containerStyle}>
        <div style={contentWrapperStyle}>
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>😔</div>
            <h3 style={{ 
              color: "#ef4444", 
              marginBottom: "0.5rem",
              fontSize: "1.25rem",
              fontWeight: "600"
            }}>
              Something went wrong
            </h3>
            <p style={{ 
              color: "#64748b", 
              marginBottom: "1rem",
              fontSize: "0.95rem"
            }}>
              {error}
            </p>
            <button 
              style={buttonStyle}
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={containerStyle}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      <div style={contentWrapperStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Success Stories from Our Students</h2>
          <p style={subtitleStyle}>
            Our comprehensive ISSB preparation program has helped hundreds of candidates succeed. 
            Join Pakistan's most trusted ISSB training platform.
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <button 
              style={buttonStyle}
              onClick={handleExploreCourses}
              onMouseEnter={e => Object.assign(e.target.style, buttonHoverStyle)}
              onMouseLeave={e => {
                e.target.style.transform = "none";
                e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
              }}
            >
              Explore Courses →
            </button>
            <button 
              style={secondaryButtonStyle}
              onClick={handleAddTestimonial}
              onMouseEnter={e => Object.assign(e.target.style, buttonHoverStyle)}
              onMouseLeave={e => {
                e.target.style.transform = "none";
                e.target.style.boxShadow = "0 4px 12px rgba(79, 70, 229, 0.3)";
              }}
            >
              Share Experience
            </button>
          </div>
        </div>

        {testimonials.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "2rem", 
            background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
            borderRadius: "12px", 
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.5)"
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌟</div>
            <h3 style={{ 
              color: "#1e293b", 
              fontSize: "1.25rem", 
              marginBottom: "0.5rem",
              fontWeight: "600"
            }}>
              Be the First to Share!
            </h3>
            <p style={{ 
              color: "#64748b", 
              fontSize: "0.95rem",
              marginBottom: "1rem",
              lineHeight: "1.5"
            }}>
              No testimonials available yet. Share your success story and inspire others!
            </p>
            <button 
              style={{ ...buttonStyle, marginTop: "0.5rem" }}
              onClick={handleAddTestimonial}
            >
              Share Your Experience
            </button>
          </div>
        ) : (
          <div>
            <div style={carouselContainerStyle}>
              <div style={carouselStyle}>
                {groupedTestimonials.map((slide, slideIndex) => (
                  <div key={slideIndex} style={slideStyle}>
                    {slide.map((testimonial) => (
                      <div 
                        key={testimonial.id} 
                        style={cardStyle}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.15)";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = "none";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
                        }}
                      >
                        <div style={{
                          ...badgeStyle,
                          background: getStatusBadgeColor(testimonial.status)
                        }}>
                          {testimonial.status}
                        </div>
                        <div style={quoteIconStyle}>❝</div>
                        <p style={testimonialTextStyle}>{testimonial.remark}</p>
                        <div style={authorContainerStyle}>
                          <div style={authorNameStyle}>{testimonial.studentName}</div>
                          <div style={authorTitleStyle}>Verified Success Story</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {totalSlides > 1 && (
              <div style={navigationStyle}>
                <button 
                  onClick={prevSlide}
                  style={currentSlide === 0 ? navButtonDisabledStyle : navButtonStyle}
                  disabled={currentSlide === 0}
                  onMouseEnter={e => {
                    if (currentSlide !== 0) {
                      e.target.style.transform = "scale(1.1)";
                      e.target.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.4)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (currentSlide !== 0) {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
                    }
                  }}
                >
                  ←
                </button>

                <div style={dotsContainerStyle}>
                  {Array.from({ length: totalSlides }, (_, index) => (
                    <div
                      key={index}
                      style={currentSlide === index ? activeDotStyle : dotStyle}
                      onClick={() => goToSlide(index)}
                      onMouseEnter={e => {
                        if (currentSlide !== index) {
                          e.target.style.background = "#cbd5e1";
                        }
                      }}
                      onMouseLeave={e => {
                        if (currentSlide !== index) {
                          e.target.style.background = "#e2e8f0";
                        }
                      }}
                    />
                  ))}
                </div>

                <button 
                  onClick={nextSlide}
                  style={currentSlide === totalSlides - 1 ? navButtonDisabledStyle : navButtonStyle}
                  disabled={currentSlide === totalSlides - 1}
                  onMouseEnter={e => {
                    if (currentSlide !== totalSlides - 1) {
                      e.target.style.transform = "scale(1.1)";
                      e.target.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.4)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (currentSlide !== totalSlides - 1) {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
                    }
                  }}
                >
                  →
                </button>
              </div>
            )}
          </div>
        )}

        {showForm && (
          <div style={formModalStyle} onClick={handleCloseForm}>
            <div style={formContainerStyle} onClick={e => e.stopPropagation()}>
              {submitSuccess ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <div style={{ 
                    fontSize: "3rem", 
                    marginBottom: "1rem",
                    animation: "pulse 2s infinite"
                  }}>
                    ✨
                  </div>
                  <h3 style={{ 
                    color: "#1e293b", 
                    marginBottom: "0.5rem",
                    fontSize: "1.5rem",
                    fontWeight: "700"
                  }}>
                    Thank You!
                  </h3>
                  <p style={{ 
                    color: "#64748b",
                    fontSize: "0.95rem",
                    lineHeight: "1.5"
                  }}>
                    Your testimonial has been submitted for approval.
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ 
                    color: "#1e293b", 
                    marginBottom: "1.5rem",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    textAlign: "center"
                  }}>
                    Share Your Success Story
                  </h3>
                  <form onSubmit={handleFormSubmit}>
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>Your Full Name</label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleFormChange}
                        required
                        style={inputStyle}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={e => {
                          e.target.style.borderColor = "#e2e8f0";
                          e.target.style.boxShadow = "none";
                          e.target.style.background = "rgba(255, 255, 255, 0.8)";
                        }}
                        disabled={isSubmitting}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>Your Current Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                        required
                        style={inputStyle}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={e => {
                          e.target.style.borderColor = "#e2e8f0";
                          e.target.style.boxShadow = "none";
                          e.target.style.background = "rgba(255, 255, 255, 0.8)";
                        }}
                        disabled={isSubmitting}
                      >
                        {statusOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>Your Experience & Success Story</label>
                      <textarea
                        name="remark"
                        value={formData.remark}
                        onChange={handleFormChange}
                        required
                        style={textareaStyle}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={e => {
                          e.target.style.borderColor = "#e2e8f0";
                          e.target.style.boxShadow = "none";
                          e.target.style.background = "rgba(255, 255, 255, 0.8)";
                        }}
                        disabled={isSubmitting}
                        placeholder="Share how our courses helped you achieve your goals..."
                      />
                    </div>
                    
                    <div style={formActionsStyle}>
                      <button 
                        type="button" 
                        onClick={handleCloseForm}
                        style={{ 
                          ...buttonStyle, 
                          background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
                          boxShadow: "0 4px 12px rgba(100, 116, 139, 0.3)",
                          opacity: isSubmitting ? 0.6 : 1
                        }}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        style={{
                          ...buttonStyle,
                          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                          position: "relative",
                          opacity: isSubmitting ? 0.8 : 1
                        }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span style={{ visibility: "hidden" }}>Submit</span>
                            <div style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "20px",
                              height: "20px",
                              border: "2px solid rgba(255,255,255,0.3)",
                              borderRadius: "50%",
                              borderTopColor: "#fff",
                              animation: "spin 1s linear infinite"
                            }} />
                          </>
                        ) : "Submit"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;