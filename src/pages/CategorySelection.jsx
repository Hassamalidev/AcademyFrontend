import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../api/api";

function CategorySelection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load categories. Please try again later.");
        setLoading(false);
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

 const handleCategoryClick = (categoryId) => {
    navigate(`/test/${categoryId}`);
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#1565C0" }}>
        Select a Category to Start Test
      </h1>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1.5rem",
        padding: "1rem"
      }}>
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
              padding: "1.5rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              ":hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
              }
            }}
          >
            <h2 style={{ 
              fontSize: "1.4rem", 
              marginBottom: "0.5rem", 
              color: "#0d47a1" 
            }}>
              {category.name}
            </h2>
            <p style={{ 
              color: "#616161", 
              lineHeight: "1.5",
              marginBottom: "1rem"
            }}>
              {category.description || "Test your knowledge in this category"}
            </p>
            <div style={{
              display: "flex",
              justifyContent: "flex-end"
            }}>
              <button style={{
                backgroundColor: "#1565C0",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.9rem"
              }}>
                Start Test
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySelection;