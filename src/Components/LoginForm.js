import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SignUpForm.css";
import FormValidation from "../utils/formValidation";

const initialValue = {
  email: "",
  password: "",
};

function LoginForm() {
  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(FormValidation(formData));
    const formErrors = FormValidation(formData);

    if (Object.keys(formErrors).length === 0) {
      // If there are no errors, check if the entered email and password match the stored data
      const storedData = JSON.parse(localStorage.getItem("usersData")) || []; // Use the same key as in SignUpForm
      const matchedUser = storedData.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );
      if (matchedUser) {
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
        alert("Login successful!");
        navigate("/");
      } else {
        alert("Invalid email or password.");
      }
    } else {
      alert("Please fill in the required fields correctly.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login Form</h1>
      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {errors.email && <p>{errors.email}</p>}
      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      {errors.password && <p>{errors.password}</p>}
      <div className="button section">
        <button type="submit">Submit</button>
        <button onClick={() => navigate("/sign-up")}>Sign-Up</button>
      </div>
    </form>
  );
}

export default LoginForm;
