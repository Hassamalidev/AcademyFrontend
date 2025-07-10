function Login() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ color: "#2E7D32" }}>Login</h1>
      <form style={{ maxWidth: "300px", margin: "0 auto", textAlign: "left" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Email:
          <input
            type="email"
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.25rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "1rem" }}>
          Password:
          <input
            type="password"
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.25rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "0.5rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;
