import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getApprovedRemarks, 
  getAllRemarks,
  createRemark, 
  approveRemark, 
  deleteRemark 
} from "../api/api";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [unapprovedTestimonials, setUnapprovedTestimonials] = useState([]);
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [viewMode, setViewMode] = useState("approved");
  const [testimonialsPerSlide, setTestimonialsPerSlide] = useState(3);
  const navigate = useNavigate();

  const checkAdminStatus = () => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const roleClaimKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
        const userRole = payload[roleClaimKey] || payload.role;
        const adminStatus = userRole && userRole.toLowerCase() === "admin";
        setIsAdmin(adminStatus);
        return adminStatus;
      } catch (err) {
        console.error("Error decoding token:", err);
        setIsAdmin(false);
        return false;
      }
    } else {
      setIsAdmin(false);
      return false;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTestimonialsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setTestimonialsPerSlide(2);
      } else {
        setTestimonialsPerSlide(3);
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const admin = checkAdminStatus();
    fetchTestimonials();
  }, [viewMode]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      if (isAdmin && viewMode === "unapproved") {
        const response = await getAllRemarks();
        setAllTestimonials(response);
        const unapproved = response.filter(t => !t.isApproved);
        setUnapprovedTestimonials(unapproved);
        setTestimonials(unapproved);
      } else if (isAdmin && viewMode === "all") {
        const response = await getAllRemarks();
        setAllTestimonials(response);
        setTestimonials(response);
      } else {
        const response = await getApprovedRemarks();
        setTestimonials(response);
      }
    } catch (err) {
      setError("Failed to load testimonials. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRemark = async (id) => {
    try {
      await approveRemark(id);
      // Update all testimonials
      setAllTestimonials(prev => 
        prev.map(item => item.id === id ? {...item, isApproved: true} : item)
      );
      
      // Update unapproved testimonials
      setUnapprovedTestimonials(prev => prev.filter(item => item.id !== id));
      
      // Update current view
      if (viewMode === "unapproved") {
        setTestimonials(prev => prev.filter(item => item.id !== id));
      } else {
        setTestimonials(prev => 
          prev.map(item => item.id === id ? {...item, isApproved: true} : item)
        );
      }
    } catch (err) {
      setError("Failed to approve testimonial.");
      console.error(err);
    }
  };

  const handleDeleteRemark = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    
    try {
      await deleteRemark(id);
      setAllTestimonials(prev => prev.filter(item => item.id !== id));
      setUnapprovedTestimonials(prev => prev.filter(item => item.id !== id));
      
      if (viewMode === "unapproved") {
        setTestimonials(prev => prev.filter(item => item.id !== id));
      } else {
        setTestimonials(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      setError("Failed to delete testimonial.");
      console.error(err);
    }
  };

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

  const groupedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += testimonialsPerSlide) {
    groupedTestimonials.push(testimonials.slice(i, i + testimonialsPerSlide));
  }

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
      await createRemark({
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
        if (isAdmin) {
          fetchTestimonials();
        }
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
    border: "1px solid #e2e8f0",
    '@media (max-width: 768px)': {
      padding: "1rem",
      borderRadius: "12px"
    }
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "2rem",
    '@media (max-width: 768px)': {
      marginBottom: "1.5rem"
    }
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
    lineHeight: "1.2",
    '@media (max-width: 768px)': {
      fontSize: "2rem"
    },
    '@media (max-width: 480px)': {
      fontSize: "1.75rem"
    }
  };

  const subtitleStyle = {
    color: "#64748b",
    fontSize: "1rem",
    maxWidth: "600px",
    margin: "0 auto 1.5rem",
    lineHeight: "1.5",
    fontWeight: "400",
    '@media (max-width: 768px)': {
      fontSize: "0.9rem",
      marginBottom: "1rem"
    }
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
    overflow: "hidden",
    '@media (max-width: 768px)': {
      padding: "10px 20px",
      fontSize: "0.9rem",
      margin: "4px"
    }
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)"
  };

  const adminButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
    padding: "8px 16px",
    fontSize: "0.85rem"
  };

  const buttonHoverStyle = {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)"
  };

  const adminControlsStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
    '@media (max-width: 768px)': {
      flexDirection: "column",
      alignItems: "center",
      gap: "0.5rem"
    }
  };

  const carouselContainerStyle = {
    position: "relative",
    marginTop: "1.5rem",
    overflow: "hidden",
    '@media (max-width: 768px)': {
      marginTop: "1rem"
    }
  };

  const carouselStyle = {
    display: "flex",
    transition: "transform 0.5s ease-in-out",
    transform: `translateX(-${currentSlide * 100}%)`
  };

  const slideStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${testimonialsPerSlide}, 1fr)`,
    gap: "1.5rem",
    minWidth: "100%",
    flex: "0 0 100%",
    '@media (max-width: 768px)': {
      gap: "1rem"
    }
  };

  const navigationStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    marginTop: "2rem",
    '@media (max-width: 768px)': {
      marginTop: "1.5rem",
      gap: "0.5rem"
    }
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
    height: "48px",
    '@media (max-width: 768px)': {
      width: "40px",
      height: "40px",
      fontSize: "1rem",
      padding: "10px 14px"
    }
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
    overflow: "hidden",
    '@media (max-width: 768px)': {
      padding: "1rem"
    }
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
    pointerEvents: "none",
    '@media (max-width: 768px)': {
      fontSize: "1.5rem",
      marginBottom: "0.5rem"
    }
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
    userSelect: "text",
    '@media (max-width: 768px)': {
      fontSize: "0.85rem",
      marginBottom: "0.75rem"
    }
  };

  const authorContainerStyle = {
    borderTop: "1px solid #e2e8f0",
    paddingTop: "1rem",
    position: "relative",
    pointerEvents: "none",
    '@media (max-width: 768px)': {
      paddingTop: "0.75rem"
    }
  };

  const authorNameStyle = {
    fontWeight: "700",
    color: "#1e293b",
    fontSize: "1rem",
    marginBottom: "0.25rem",
    userSelect: "text",
    pointerEvents: "auto",
    '@media (max-width: 768px)': {
      fontSize: "0.9rem"
    }
  };

  const authorTitleStyle = {
    color: "#64748b",
    fontSize: "0.85rem",
    fontWeight: "500",
    userSelect: "text",
    pointerEvents: "auto",
    '@media (max-width: 768px)': {
      fontSize: "0.8rem"
    }
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
    border: "1px solid rgba(255, 255, 255, 0.2)",
    '@media (max-width: 768px)': {
      fontSize: "0.7rem",
      padding: "3px 10px",
      marginBottom: "0.5rem"
    }
  };

  const pendingBadgeStyle = {
    ...badgeStyle,
    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    boxShadow: "0 2px 8px rgba(245, 158, 11, 0.3)"
  };

  const adminActionsStyle = {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
    justifyContent: "flex-end",
    '@media (max-width: 768px)': {
      flexDirection: "column",
      gap: "0.25rem"
    }
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
    overflowY: "auto",
    '@media (max-width: 768px)': {
      padding: "1.5rem"
    }
  };

  const formGroupStyle = {
    marginBottom: "1.5rem",
    '@media (max-width: 768px)': {
      marginBottom: "1rem"
    }
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "600",
    color: "#1e293b",
    fontSize: "0.95rem",
    '@media (max-width: 768px)': {
      fontSize: "0.9rem",
      marginBottom: "0.4rem"
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "0.95rem",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    background: "rgba(255, 255, 255, 0.8)",
    fontFamily: "inherit",
    '@media (max-width: 768px)': {
      padding: "0.6rem 0.8rem",
      fontSize: "0.9rem"
    }
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
    marginTop: "1.5rem",
    '@media (max-width: 768px)': {
      flexDirection: "column",
      gap: "0.5rem"
    }
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

  // Loading state
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
          
          {isAdmin && (
            <div style={adminControlsStyle}>
              <button 
                style={viewMode === "approved" ? adminButtonStyle : buttonStyle}
                onClick={() => setViewMode("approved")}
                onMouseEnter={e => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseLeave={e => {
                  e.target.style.transform = "none";
                  e.target.style.boxShadow = viewMode === "approved" 
                    ? "0 4px 12px rgba(16, 185, 129, 0.3)" 
                    : "0 4px 12px rgba(102, 126, 234, 0.3)";
                }}
              >
                View Approved
              </button>
              <button 
                style={viewMode === "all" ? adminButtonStyle : buttonStyle}
                onClick={() => setViewMode("all")}
                onMouseEnter={e => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseLeave={e => {
                  e.target.style.transform = "none";
                  e.target.style.boxShadow = viewMode === "all" 
                    ? "0 4px 12px rgba(16, 185, 129, 0.3)" 
                    : "0 4px 12px rgba(102, 126, 234, 0.3)";
                }}
              >
                View All ({allTestimonials.length})
              </button>
              <button 
                style={viewMode === "unapproved" ? adminButtonStyle : buttonStyle}
                onClick={() => setViewMode("unapproved")}
                onMouseEnter={e => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseLeave={e => {
                  e.target.style.transform = "none";
                  e.target.style.boxShadow = viewMode === "unapproved" 
                    ? "0 4px 12px rgba(16, 185, 129, 0.3)" 
                    : "0 4px 12px rgba(102, 126, 234, 0.3)";
                }}
              >
                Pending Approval ({unapprovedTestimonials.length})
              </button>
            </div>
          )}
          
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
              {viewMode === "unapproved" ? "No Pending Approvals" : "Be the First to Share!"}
            </h3>
            <p style={{ 
              color: "#64748b", 
              fontSize: "0.95rem",
              marginBottom: "1rem",
              lineHeight: "1.5"
            }}>
              {viewMode === "unapproved" 
                ? "All testimonials have been approved. Check back later for new submissions." 
                : "No testimonials available yet. Share your success story and inspire others!"}
            </p>
            {viewMode !== "unapproved" && (
              <button 
                style={{ ...buttonStyle, marginTop: "0.5rem" }}
                onClick={handleAddTestimonial}
              >
                Share Your Experience
              </button>
            )}
          </div>
        ) : (
          <div>
            {isAdmin && viewMode === "unapproved" && (
              <div style={{ 
                textAlign: "center", 
                marginBottom: "1rem",
                padding: "0.75rem",
                background: "#fffbeb",
                borderRadius: "8px",
                border: "1px solid #fef3c7"
              }}>
                <p style={{ color: "#92400e", margin: 0, fontSize: "0.9rem" }}>
                  <strong>Admin Mode:</strong> Reviewing {unapprovedTestimonials.length} testimonials pending approval
                </p>
              </div>
            )}
            
            {isAdmin && viewMode === "all" && (
              <div style={{ 
                textAlign: "center", 
                marginBottom: "1rem",
                padding: "0.75rem",
                background: "#f0f9ff",
                borderRadius: "8px",
                border: "1px solid #e0f2fe"
              }}>
                <p style={{ color: "#0c4a6e", margin: 0, fontSize: "0.9rem" }}>
                  <strong>Admin Mode:</strong> Viewing all testimonials ({allTestimonials.filter(t => !t.isApproved).length} pending approval)
                </p>
              </div>
            )}
            
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
                        {!testimonial.isApproved && (
                          <div style={pendingBadgeStyle}>
                            Pending Approval
                          </div>
                        )}
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
                          <div style={authorTitleStyle}>
                            {testimonial.isApproved ? "Verified Success Story" : "Pending Verification"}
                          </div>
                        </div>
                        
                        {/* Admin Actions */}
                        {isAdmin && (viewMode === "all" || viewMode === "unapproved") && !testimonial.isApproved && (
                          <div style={adminActionsStyle}>
                            <button 
                              style={adminButtonStyle}
                              onClick={() => handleApproveRemark(testimonial.id)}
                            >
                              Approve
                            </button>
                            <button 
                              style={deleteButtonStyle}
                              onClick={() => handleDeleteRemark(testimonial.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
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
                      on
MouseLeave={e => {
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
              <h3 style={{ 
                marginTop: 0, 
                marginBottom: '1.5rem', 
                textAlign: 'center',
                color: '#1e293b',
                fontSize: '1.5rem',
                fontWeight: '700'
              }}>
                Share Your Success Story
              </h3>
              
              {submitSuccess ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '2rem',
                  background: '#f0fdf4',
                  borderRadius: '8px',
                  border: '1px solid #bbf7d0'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                  <h4 style={{ 
                    color: '#16a34a', 
                    marginBottom: '0.5rem',
                    fontSize: '1.25rem',
                    fontWeight: '600'
                  }}>
                    Thank You!
                  </h4>
                  <p style={{ 
                    color: '#64748b', 
                    marginBottom: '0',
                    fontSize: '0.95rem'
                  }}>
                    Your testimonial has been submitted and is pending approval.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleFormChange}
                      required
                      style={inputStyle}
                      placeholder="Enter your full name"
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={e => {
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                        e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                      }}
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
                      onBlur={e => {
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                        e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                      }}
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
                      placeholder="Share your experience with our program..."
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={e => {
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                        e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                      }}
                    />
                  </div>

                  <div style={formActionsStyle}>
                    <button
                      type="button"
                      onClick={handleCloseForm}
                      disabled={isSubmitting}
                      style={{ 
                        ...buttonStyle, 
                        background: '#64748b',
                        boxShadow: '0 4px 12px rgba(100, 116, 139, 0.3)'
                      }}
                      onMouseEnter={e => {
                        if (!isSubmitting) {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 20px rgba(100, 116, 139, 0.4)';
                        }
                      }}
                      onMouseLeave={e => {
                        e.target.style.transform = 'none';
                        e.target.style.boxShadow = '0 4px 12px rgba(100, 116, 139, 0.3)';
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={buttonStyle}
                      onMouseEnter={e => {
                        if (!isSubmitting) {
                          Object.assign(e.target.style, buttonHoverStyle);
                        }
                      }}
                      onMouseLeave={e => {
                        e.target.style.transform = 'none';
                        e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div style={{
                            display: 'inline-block',
                            width: '16px',
                            height: '16px',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderLeftColor: 'white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginRight: '8px'
                          }} />
                          Submitting...
                        </>
                      ) : 'Submit Testimonial'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;