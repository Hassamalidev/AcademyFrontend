import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    remark: "",
    status: "Student"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  const API_URL = "https://localhost:7110/api/StudentRemarks";

  // Styles
  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "3rem 2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "3rem"
  };

  const titleStyle = {
    color: "#2c3e50",
    fontSize: "2.2rem",
    marginBottom: "1rem",
    fontWeight: "700"
  };

  const subtitleStyle = {
    color: "#7f8c8d",
    fontSize: "1.1rem",
    maxWidth: "700px",
    margin: "0 auto 2rem",
    lineHeight: "1.6"
  };

  const buttonStyle = {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "12px 25px",
    fontSize: "1rem",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "500",
    margin: "0 10px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3498db"
  };

  const buttonHoverStyle = {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginTop: "2rem"
  };

  const cardStyle = {
    background: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    position: "relative",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  };

  const quoteIconStyle = {
    fontSize: "3rem",
    color: "#e74c3c",
    lineHeight: "1",
    marginBottom: "1rem"
  };

  const testimonialTextStyle = {
    color: "#34495e",
    fontSize: "1rem",
    lineHeight: "1.6",
    marginBottom: "1.5rem",
    flexGrow: 1
  };

  const authorContainerStyle = {
    borderTop: "1px solid #eee",
    paddingTop: "1rem"
  };

  const authorNameStyle = {
    fontWeight: "bold",
    color: "#2c3e50",
    fontSize: "1.1rem",
    marginBottom: "0.25rem"
  };

  const authorTitleStyle = {
    color: "#7f8c8d",
    fontSize: "0.9rem"
  };

  const badgeStyle = {
    backgroundColor: "#27ae60",
    color: "white",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: "1rem"
  };

  const formModalStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000"
  };

  const formContainerStyle = {
    background: "white",
    padding: "2rem",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 5px 25px rgba(0,0,0,0.2)"
  };

  const formGroupStyle = {
    marginBottom: "1.5rem"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "500",
    color: "#2c3e50"
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    transition: "border-color 0.3s"
  };

  const inputFocusStyle = {
    borderColor: "#3498db",
    outline: "none",
    boxShadow: "0 0 0 3px rgba(52, 152, 219, 0.2)"
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "120px",
    resize: "vertical"
  };

  const formActionsStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
    marginTop: "1rem"
  };

  const statusOptions = [
    "Student",
    "Selected Candidate",
    "ISSB Recommended",
    "Course Graduate"
  ];

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
      // Reset form after successful submission
      setTimeout(() => {
        setShowForm(false);
        setFormData({
          studentName: "",
          remark: "",
          status: "Student"
        });
        setSubmitSuccess(false);
      }, 2000);
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

  // Render loading state
  if (loading) {
    return (
      <section style={containerStyle}>
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <div style={{
            display: "inline-block",
            width: "50px",
            height: "50px",
            border: "4px solid rgba(0,0,0,0.1)",
            borderLeftColor: "#3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }} />
          <p style={{ marginTop: "1rem", color: "#7f8c8d" }}>Loading testimonials...</p>
        </div>
      </section>
    );
  }

  // Render error state
  if (error) {
    return (
      <section style={containerStyle}>
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <div style={{ fontSize: "3rem", color: "#e74c3c", marginBottom: "1rem" }}>⚠️</div>
          <p style={{ color: "#e74c3c", marginBottom: "1.5rem" }}>{error}</p>
          <button 
            style={buttonStyle}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
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
      `}</style>

      <div style={headerStyle}>
        <h2 style={titleStyle}>Success Stories from Our Students</h2>
        <p style={subtitleStyle}>
          Our comprehensive ISSB preparation program has helped hundreds of candidates succeed. 
          Join Pakistan's most trusted ISSB training platform and start your journey to success.
        </p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
          <button 
            style={buttonStyle}
            onClick={handleExploreCourses}
            onMouseEnter={e => Object.assign(e.target.style, buttonHoverStyle)}
            onMouseLeave={e => e.target.style.removeProperty("transform")}
          >
            Explore Our Courses →
          </button>
          <button 
            style={secondaryButtonStyle}
            onClick={handleAddTestimonial}
            onMouseEnter={e => Object.assign(e.target.style, buttonHoverStyle)}
            onMouseLeave={e => e.target.style.removeProperty("transform")}
          >
            Share Your Experience
          </button>
        </div>
      </div>

      {testimonials.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 3px 10px rgba(0,0,0,0.08)" }}>
          <p style={{ color: "#7f8c8d", fontSize: "1.1rem" }}>
            No testimonials available yet. Be the first to share your success story!
          </p>
          <button 
            style={{ ...buttonStyle, marginTop: "1.5rem" }}
            onClick={handleAddTestimonial}
          >
            Share Your Experience
          </button>
        </div>
      ) : (
        <div style={gridStyle}>
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              style={cardStyle}
              onMouseEnter={e => Object.assign(e.target.style, { transform: "translateY(-5px)", boxShadow: "0 8px 25px rgba(0,0,0,0.15)" })}
              onMouseLeave={e => Object.assign(e.target.style, cardStyle)}
            >
              <div style={badgeStyle}>Verified Student</div>
              <div style={quoteIconStyle}>❝</div>
              <p style={testimonialTextStyle}>{testimonial.remark}</p>
              <div style={authorContainerStyle}>
                <div style={authorNameStyle}>{testimonial.studentName}</div>
                <div style={authorTitleStyle}>{testimonial.status}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div style={formModalStyle} onClick={handleCloseForm}>
          <div style={formContainerStyle} onClick={e => e.stopPropagation()}>
            {submitSuccess ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{ fontSize: "3rem", color: "#27ae60", marginBottom: "1rem" }}>✓</div>
                <h3 style={{ color: "#2c3e50", marginBottom: "0.5rem" }}>Thank You!</h3>
                <p style={{ color: "#7f8c8d" }}>
                  Your testimonial has been submitted for approval. It will appear here once verified.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ color: "#2c3e50", marginBottom: "1.5rem" }}>Share Your Experience</h3>
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
                      onBlur={e => e.target.style.removeProperty("box-shadow")}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Your Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleFormChange}
                      required
                      style={inputStyle}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={e => e.target.style.removeProperty("box-shadow")}
                      disabled={isSubmitting}
                    >
                      {statusOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Your Experience</label>
                    <textarea
                      name="remark"
                      value={formData.remark}
                      onChange={handleFormChange}
                      required
                      style={textareaStyle}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={e => e.target.style.removeProperty("box-shadow")}
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
                        backgroundColor: "#95a5a6",
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
                        backgroundColor: "#27ae60",
                        position: "relative",
                        opacity: isSubmitting ? 0.8 : 1
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span style={{ visibility: "hidden" }}>Submitting</span>
                          <div style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "20px",
                            height: "20px",
                            border: "3px solid rgba(255,255,255,0.3)",
                            borderRadius: "50%",
                            borderTopColor: "#fff",
                            animation: "spin 1s linear infinite"
                          }} />
                        </>
                      ) : "Submit Testimonial"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;