import React, { useEffect } from "react";
import { useState } from "react";
import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";
import FormValidation from "../utils/formValidation";
import { generateUniqueId } from "../utils/generateUniqueId";

const initialValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
const initialErrorValue = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
};

function SignUpForm() {
  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState(initialErrorValue);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(FormValidation(formData));
    const formErrors = FormValidation(formData);

    if (Object.keys(formErrors).length === 0) {
      const existingUsers = JSON.parse(localStorage.getItem("usersData")) || [];
      const id = generateUniqueId(existingUsers);
      const newUser = { ...formData, id };

      // Create a new array with the existing todos and the new form data
      const updatedUsers = [...existingUsers, newUser];

      // Update state and localStorage
      localStorage.setItem("usersData", JSON.stringify(updatedUsers));
      // Clear form data
      setFormData(initialValue);
      alert("Form submitted successfully!");
    } else {
      alert("Please fill in the required fields correctly.");
    }
  };

  useEffect(() => {
    setErrors((prevErrors) => ({
      firstName: formData.firstName.length >= 1 ? false : prevErrors.firstName,
      lastName: formData.lastName.length >= 1 ? false : prevErrors.lastName,
      email: formData.email.length >= 1 ? false : prevErrors.email,
      password: formData.password.length >= 1 ? false : prevErrors.password,
    }));
  }, [formData]);

  return (
    <form onSubmit={handleSubmit}>
      <h1>SignUp Form</h1>
      <label>First Name</label>
      <input
        className={errors.firstName ? "input-error" : ""}
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
      />
      {errors.firstName && <p>{errors.firstName}</p>}
      <label>Last Name</label>
      <input
        className={errors.lastName ? "input-error" : ""}
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
      {errors.lastName && <p>{errors.lastName}</p>}
      <label>Email</label>
      <input
        className={errors.email ? "input-error" : ""}
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {errors.email && <p>{errors.email}</p>}
      <label>Password</label>
      <input
        className={errors.password ? "input-error" : ""}
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      {errors.password && <p>{errors.password}</p>}
      <div className="button section">
        <button type="submit">Submit</button>
        <button onClick={() => navigate("/log-in")}>Login</button>
      </div>
    </form>
  );
}

export default SignUpForm;
