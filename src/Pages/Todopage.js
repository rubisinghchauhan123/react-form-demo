import React, { useEffect } from "react";
import { useState } from "react";
import "../Components/SignUpForm.css";
import { useNavigate } from "react-router-dom";
import TodoValidation from "../utils/todoValidation";
import { generateUniqueId } from "../utils/generateUniqueId";

const initialValue = {
  title: "",
  discription: "",
  tag: "",
  day: "",
  userId: 0,
};
const initialErrorValue = {
  title: false,
  discription: false,
  tag: false,
  day: false,
};

function Todopage() {
  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState(initialErrorValue);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  useEffect(() => {
    setFormData({ userId: currentUser?.id, day: "", discription: "", tag: "", title: "" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(TodoValidation(formData));
    const formErrors = TodoValidation(formData);

    if (Object.keys(formErrors).length === 0) {
      // Retrieve existing todos from localStorage
      const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];

      // Generate a unique ID
      const id = generateUniqueId(existingTodos);
      // Create a new todo object with unique ID
      const newTodo = { ...formData, id };

      // Create a new array with the existing todos and the new form data
      const updatedTodoArray = [...existingTodos, newTodo];

      // Update state and localStorage
      localStorage.setItem("todos", JSON.stringify(updatedTodoArray));

      // Reset form and navigate
      alert("Form submitted successfully!");
      setFormData(initialValue);
      navigate("/", { state: { todo: formData } });
    } else {
      alert("Please fill in the required fields correctly.");
    }
  };

  useEffect(() => {
    setErrors((prevErrors) => ({
      title: formData.title.length >= 1 ? false : prevErrors.title,
      discription:
        formData.discription.length >= 1 ? false : prevErrors.discription,
      tag: formData.tag.length >= 1 ? false : prevErrors.tag,
      gender: formData.gender ? false : prevErrors.gender,
    }));
  }, [formData]);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Todo</h1>
      <label>Title</label>
      <input
        className={errors.title ? "input-error" : ""}
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      {errors.title && <p>{errors.title}</p>}
      <label>Discription</label>
      <input
        className={errors.discription ? "input-error" : ""}
        type="text"
        placeholder="Discription"
        value={formData.discription}
        onChange={(e) =>
          setFormData({ ...formData, discription: e.target.value })
        }
      />
      {errors.discription && <p>{errors.discription}</p>}
      <label>Tag</label>
      <input
        className={errors.tag ? "input-error" : ""}
        type="text"
        placeholder="tag"
        value={formData.tag}
        onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
      />
      {errors.tag && <p>{errors.tag}</p>}
      <div className={errors.day ? "input-error day-div" : "day-div"}>
        <label>Day</label>
        <div>
          <label>
            <input
              type="radio"
              value="Tuesday"
              checked={formData.day === "Tuesday"}
              onChange={(e) =>
                setFormData({ ...formData, day: e.target.value })
              }
            />
            Tuesday
          </label>
          <label>
            <input
              type="radio"
              value="Wednesday"
              checked={formData.day === "Wednesday"}
              onChange={(e) =>
                setFormData({ ...formData, day: e.target.value })
              }
            />
            Wednesday
          </label>
        </div>
        {errors.day && <p className="error-message">{errors.day}</p>}
      </div>

      <div className="button section">
        <button onClick={() => navigate("/")}>Back</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default Todopage;
