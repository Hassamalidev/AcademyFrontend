import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../api/api";

function CategorySelection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        const categoriesWithDefaults = data.map((cat) => ({
          ...cat,
          description: cat.description || "Test your knowledge in this category",
        }));
        setCategories(categoriesWithDefaults);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/test/${categoryId}`);
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;

  return (
    <div style={styles.wrapper}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Header />
        <div style={styles.grid}>
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                ...styles.card,
                transform: hoveredCard === category.id ? "translateY(-10px) scale(1.02)" : "translateY(0)",
                boxShadow:
                  hoveredCard === category.id
                    ? "0 25px 50px rgba(0,0,0,0.25)"
                    : "0 10px 25px rgba(0,0,0,0.15)",
              }}
            >
              <div style={{ ...styles.cardHeader, background: getGradientColors(index) }}>
                <div style={styles.headerIcon}>{getCategoryIcon(index)}</div>
                <h2 style={styles.headerTitle}>{category.name}</h2>
              </div>

              <div style={styles.cardBody}>
                <p style={styles.description}>{category.description}</p>
                <div style={styles.stats}>
                
                </div>
                <button
                  style={{
                    ...styles.button,
                    background: hoveredCard === category.id
                      ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
                      : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    transform: hoveredCard === category.id ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  Start Challenge <span style={styles.arrow}>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div style={styles.headerWrapper}>
      <div style={styles.headerBadge}>
        <div style={styles.badgeIcon}>🎯</div>
        <h1 style={styles.headerText}>Choose Your Challenge</h1>
      </div>
      <p style={styles.headerSubText}>
        Select a category below to begin your knowledge test. Each category offers unique challenges to help you assess and improve your skills.
      </p>
    </div>
  );
}

function StatBox({ icon, value }) {
  return (
    <div style={styles.statBox}>
      <span style={{ fontSize: "18px" }}>{icon}</span>
      <span style={{ color: "#475569", fontWeight: "600" }}>{value}</span>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div style={styles.centered}>
      <div style={styles.spinner}></div>
      <p style={styles.loadingText}>Loading categories...</p>
    </div>
  );
}

function ErrorScreen({ message }) {
  return (
    <div style={styles.centered}>
      <div style={styles.errorBox}>
        <div style={styles.errorIcon}>⚠️</div>
        <p style={styles.errorText}>{message}</p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
     background: 'linear-gradient(135deg, #bdbdbd 0%, #9e9e9e 100%)',
     borderRadius: '20px',
   padding: "2rem 1rem",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  headerWrapper: {
    textAlign: "center",
    marginBottom: "4rem",
  },
  headerBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: "1rem 2rem",
    borderRadius: "50px",
    backdropFilter: "blur(10px)",
  },
  badgeIcon: {
    width: "50px",
    height: "50px",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  },
  headerText: {
    fontSize: "3rem",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  headerSubText: {
    fontSize: "1.2rem",
    color: "rgba(255,255,255,0.9)",
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: "1.6",
    fontWeight: "400",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    padding: "0 1rem",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  cardHeader: {
    padding: "1rem 1.25rem",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  headerIcon: {
    width: "40px",
    height: "40px",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.3)",
  },
  headerTitle: {
     fontSize: "1.3rem",
    fontWeight: "600",
    color: "#fff",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  cardBody: {
   padding: "1.25rem",
  },
  description: {
    color: "#6b7280",
    lineHeight: "1.7",
    fontSize: "0.95rem",
    marginBottom: "2rem",
    fontWeight: "400",
  },
  stats: {
    display: "flex",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  statBox: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    fontSize: "0.95rem",
    border: "1px solid #e2e8f0",
  },
  button: {
    width: "100%",
    color: "white",
    border: "none",
    borderRadius: "14px",
   padding: "0.8rem 1rem",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1.1rem",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
  },
  arrow: {
    transition: "transform 0.3s ease",
    fontSize: "1.2rem",
  },
  centered: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #f3f4f6",
    borderTop: "4px solid #667eea",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    color: "#374151",
    fontSize: "1.2rem",
    fontWeight: "500",
    marginTop: "1.5rem",
  },
  errorBox: {
    backgroundColor: "rgba(255,255,255,0.95)",
    border: "1px solid #fecaca",
    borderRadius: "20px",
    padding: "3rem 2rem",
    maxWidth: "500px",
    textAlign: "center",
  },
  errorIcon: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  errorText: {
    color: "#dc2626",
    fontSize: "1.2rem",
    fontWeight: "500",
  },
};

// Gradient and Icon helpers
function getGradientColors(index) {
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  ];
  return gradients[index % gradients.length];
}

function getCategoryIcon(index) {
  const icons = ["🎯", "📚", "💡", "🔬", "⚡", "🚀"];
  return icons[index % icons.length];
}

export default CategorySelection;
