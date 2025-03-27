import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css"; // Ensure this file exists

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Password Validation Function
  const isValidPassword = (password) => {
    return (
      password.length >= 8 &&
      /\d/.test(password) && // At least one number
      /[!@#$%^&*(),.?":{}|<>]/.test(password) // At least one special character
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // ✅ Trim input values to prevent spaces issues
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    // ✅ Frontend Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must be at least 8 characters, include a number, and a special character.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);

      if (!error.response) {
        setError("Network error! Check your connection and try again.");
      } else if (error.response.status === 409) {
        setError("Email already registered. Try logging in.");
      } else {
        setError(error.response.data?.message || "Signup failed! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signup</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Signing Up..." : "Signup"}
          </button>
        </form>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
