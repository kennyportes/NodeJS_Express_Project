import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({ username: "", password: "" });
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "", terms: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    let validationErrors = {};
    if (!data.username) validationErrors.username = "Username is required";
    if (!data.password) validationErrors.password = "Password is required";
    if (!terms) validationErrors.terms = "Check the terms";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Points to your backend now running on port 5000
      const res = await axios.post("http://127.0.0.1:5000/api/auth/register", data);
      
      alert(res.data.message);
      
      if (res.data.message.toLowerCase().includes("successfully")) {
        navigate("/"); // Redirect to Login
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed. Ensure the backend server and MySQL are running.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg p-5 border-0">
            <h2 className="text-center mb-5">Create Account</h2>

            {/* Username Field */}
            <div className="row mb-4 align-items-center justify-content-center">
              <div className="col-sm-10">
                <label className="form-label fw-bold">Username</label>
                <input
                  className={`form-control form-control-lg ${errors.username ? 'is-invalid' : ''}`}
                  placeholder="Choose a username"
                  onChange={e => {
                    setData({ ...data, username: e.target.value });
                    setErrors({ ...errors, username: "" });
                  }}
                />
              </div>
              <div className="col-sm-4">
                {errors.username && (
                  <span className="text-danger small d-block">{errors.username}</span>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="row mb-4 align-items-center justify-content-center">
              <div className="col-sm-10">
                <label className="form-label fw-bold">Password</label>
                <input
                  type="password"
                  className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Choose a password"
                  onChange={e => {
                    setData({ ...data, password: e.target.value });
                    setErrors({ ...errors, password: "" });
                  }}
                />
              </div>
              <div className="col-sm-4">
                {errors.password && (
                  <span className="text-danger small d-block">{errors.password}</span>
                )}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="row justify-content-center mb-4">
              <div className="col-sm-10 d-flex justify-content-start align-items-start">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="terms"
                    checked={terms}
                    onChange={e => {
                      setTerms(e.target.checked);
                      setErrors({ ...errors, terms: "" });
                    }}
                  />
                  <label 
                    htmlFor="terms" 
                    className={`form-check-label ms-2 ${errors.terms ? "text-danger fw-bold" : ""}`}
                  >
                    I agree to the terms and conditions
                  </label>
                  {errors.terms && (
                    <div className="text-danger small mt-1">{errors.terms}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Register Button */}
            <div className="row justify-content-center">
              <div className="col-sm-10">
                <button className="btn btn-primary btn-lg w-100" onClick={handleRegister}>
                  Register
                </button>
                <p className="text-center mt-3">
                  Already have an account? <a href="/" className="text-decoration-none fw-bold">Login here</a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;