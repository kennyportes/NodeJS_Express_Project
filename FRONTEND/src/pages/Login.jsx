import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!data.username || !data.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Using 127.0.0.1 to match your updated server.js configuration
      const res = await axios.post("http://127.0.0.1:5000/api/auth/login", data);

      if (res.data.success) {
        // Save user data to localStorage so the Navbar can show the "Welcome" message
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      } else {
        setError(res.data.message || "Invalid username or password.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      // This is the error you were seeing earlier; this message makes it clearer to the user
      setError("Server connection failed. Please ensure the backend is running on port 5000.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Changed to col-md-8 col-lg-5 for a more professional, focused box size */}
        <div className="col-md-8 col-lg-5">
          <div className="card shadow-lg p-4 border-0">
            <h2 className="text-center mb-4">Login</h2>

            {/* Error Alert Box */}
            {error && (
              <div className="alert alert-danger py-2 text-center" role="alert">
                <small>{error}</small>
              </div>
            )}

            {/* Username Field */}
            <div className="row mb-3 justify-content-center">
              <div className="col-sm-11">
                <label className="form-label fw-bold">Username</label>
                <input
                  className="form-control form-control-lg"
                  placeholder="Enter your username"
                  onChange={e => {
                    setData({ ...data, username: e.target.value });
                    setError("");
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="row mb-4 justify-content-center">
              <div className="col-sm-11">
                <label className="form-label fw-bold">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                  onChange={e => {
                    setData({ ...data, password: e.target.value });
                    setError("");
                  }}
                />
              </div>
            </div>

            {/* Login Button */}
            <div className="row justify-content-center">
              <div className="col-sm-11">
                <button className="btn btn-success btn-lg w-100" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </div>

            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-decoration-none fw-bold">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;