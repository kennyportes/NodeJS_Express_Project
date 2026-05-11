import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({ 
    username: "", 
    password: "", 
    repeatPassword: "" 
  });
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({ 
    username: "", 
    password: "", 
    repeatPassword: "", 
    terms: "" 
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    // 1. Reset Errors
    let validationErrors = {};

    // 2. Validation Logic
    if (!data.username) validationErrors.username = "Username is required";
    if (!data.password) validationErrors.password = "Password is required";
    
    // Check if passwords match
    if (data.password !== data.repeatPassword) {
      validationErrors.repeatPassword = "Passwords do not match";
    }
    
    if (!terms) validationErrors.terms = "Please accept the terms";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // 3. API Call
      // We only send username and password to the backend (repeatPassword is frontend only)
      const res = await axios.post("http://127.0.0.1:5000/api/auth/register", {
        username: data.username,
        password: data.password
      });
      
      alert(res.data.message);
      
      if (res.data.message.toLowerCase().includes("successfully")) {
        navigate("/"); // Redirect to Login page
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || "Registration failed. Check server connection.";
      alert(errMsg);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg p-5 border-0">
            <h2 className="text-center mb-5 fw-bold">Create Account</h2>

            {/* Username Field */}
            <div className="row mb-4 justify-content-center">
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
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
            </div>

            {/* Password Field */}
            <div className="row mb-4 justify-content-center">
              <div className="col-sm-10">
                <label className="form-label fw-bold">Password</label>
                <input
                  type="password"
                  className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Create a password"
                  onChange={e => {
                    setData({ ...data, password: e.target.value });
                    setErrors({ ...errors, password: "" });
                  }}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
            </div>

            {/* Repeat Password Field */}
            <div className="row mb-4 justify-content-center">
              <div className="col-sm-10">
                <label className="form-label fw-bold">Repeat Password</label>
                <input
                  type="password"
                  className={`form-control form-control-lg ${errors.repeatPassword ? 'is-invalid' : ''}`}
                  placeholder="Confirm your password"
                  onChange={e => {
                    setData({ ...data, repeatPassword: e.target.value });
                    setErrors({ ...errors, repeatPassword: "" });
                  }}
                />
                {errors.repeatPassword && <div className="invalid-feedback">{errors.repeatPassword}</div>}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="row justify-content-center mb-4">
              <div className="col-sm-10">
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
                  {errors.terms && <div className="text-danger small mt-1">{errors.terms}</div>}
                </div>
              </div>
            </div>

            {/* Register Button */}
            <div className="row justify-content-center">
              <div className="col-sm-10">
                <button className="btn btn-primary btn-lg w-100 fw-bold" onClick={handleRegister}>
                  Register
                </button>
                <p className="text-center mt-4">
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