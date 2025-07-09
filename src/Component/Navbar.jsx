import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#0D47A1",
        padding: "1rem",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Defence Prep Academy</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "0.5rem",
        }}
      >
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
        <Link to="/verbal" style={{ color: "white", textDecoration: "none" }}>Verbal</Link>
        <Link to="/nonverbal" style={{ color: "white", textDecoration: "none" }}>Non-Verbal</Link>
        <Link to="/personality" style={{ color: "white", textDecoration: "none" }}>Personality</Link>
        <Link to="/notes" style={{ color: "white", textDecoration: "none" }}>Notes</Link>
        <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;
