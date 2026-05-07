import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { token, logout } = useAuth();

  return (
    <div style={styles.nav}>
      <Link to="/" style={styles.link}>
        Home
      </Link>

      {token && (
        <Link
          to="/bookmarks"
          style={styles.link}
        >
          Bookmarks
        </Link>
      )}

      {token ? (
        <button
          onClick={logout}
          style={styles.button}
        >
          Logout
        </button>
      ) : (
        <>
          <Link
            to="/login"
            style={styles.link}
          >
            Login
          </Link>

          <Link
            to="/register"
            style={styles.link}
          >
            Register
          </Link>
        </>
      )}
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    borderBottom: "1px solid #ddd",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
  },
  button: {
    padding: "8px 14px",
    cursor: "pointer",
  },
};

export default Navbar;