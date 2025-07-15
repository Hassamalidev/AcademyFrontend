import React from "react";

const Testimonials = () => {
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "3rem 2rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
    },
    header: {
      textAlign: "center",
      marginBottom: "3rem"
    },
    title: {
      color: "#2c3e50",
      fontSize: "2.2rem",
      marginBottom: "1rem"
    },
    subtitle: {
      color: "#7f8c8d",
      fontSize: "1.1rem",
      maxWidth: "700px",
      margin: "0 auto 2rem"
    },
    ctaButton: {
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      padding: "12px 25px",
      fontSize: "1rem",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "all 0.3s ease"
    },
    ctaButtonHover: {
      backgroundColor: "#c0392b",
      transform: "translateY(-2px)"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem"
    },
    card: {
      background: "white",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
      position: "relative"
    },
    quoteIcon: {
      fontSize: "3rem",
      color: "#e74c3c",
      lineHeight: "1",
      marginBottom: "1rem"
    },
    testimonialText: {
      color: "#34495e",
      fontSize: "1rem",
      lineHeight: "1.6",
      marginBottom: "1.5rem"
    },
    authorContainer: {
      borderTop: "1px solid #eee",
      paddingTop: "1rem"
    },
    authorName: {
      fontWeight: "bold",
      color: "#2c3e50",
      fontSize: "1.1rem"
    },
    authorTitle: {
      color: "#7f8c8d",
      fontSize: "0.9rem"
    },
    badge: {
      position: "absolute",
      top: "-10px",
      right: "20px",
      backgroundColor: "#27ae60",
      color: "white",
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: "bold"
    }
  };

  return (
    <section style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>What Our Students Say About ISSB Courses</h2>
        <p style={styles.subtitle}>
          Our comprehensive ISSB preparation program has helped hundreds of candidates succeed. 
          Join Pakistan's most trusted ISSB training platform.
        </p>
        <button 
          style={styles.ctaButton}
          onMouseOver={(e) => Object.assign(e.target.style, styles.ctaButtonHover)}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = styles.ctaButton.backgroundColor;
            e.target.style.transform = "none";
          }}
        >
          Explore Our Courses →
        </button>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.quoteIcon}>“</div>
          <p style={styles.testimonialText}>
            The ISSB preparation course helped me clear my tests on the first attempt. 
            The mock tests and expert tips were game-changers. I couldn't have done it without them!
          </p>
          <div style={styles.authorContainer}>
            <div style={styles.authorName}>Ahmed Khan</div>
            <div style={styles.authorTitle}>Successful Candidate</div>
          </div>
          <div style={styles.badge}>First Attempt Success</div>
        </div>

        <div style={styles.card}>
          <div style={styles.quoteIcon}>“</div>
          <p style={styles.testimonialText}>
            Thanks to their amazing ISSB preparation course, I felt confident and well-prepared. 
            The trainers were exceptionally supportive and provided personalized feedback.
          </p>
          <div style={styles.authorContainer}>
            <div style={styles.authorName}>Maria Ali</div>
            <div style={styles.authorTitle}>Future Armed Forces Officer</div>
          </div>
          <div style={styles.badge}>Recommended by 95% Students</div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;