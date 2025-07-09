import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
        Welcome to ISSB Smart Prep
      </h1>
      <button
        style={{
          backgroundColor: "#1565C0",
          color: "white",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/test")}
      >
        Start Test
      </button>
    </div>
  );
}

export default Home;
