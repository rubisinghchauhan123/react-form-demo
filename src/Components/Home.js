// Home.js

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const [todos, setTodos] = useState([]);
  const localTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  useEffect(() => {
    // Filter todos based on the currentUser's id
    const filteredTodos = localTodos.filter(todo => todo.userId === currentUser?.id);
    setTodos(filteredTodos);
  }, []);

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <>
    {todos.length > 0 ? 
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Discription:</th>
            <th>Tag</th>
            <th>Day</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos?.map((todo, index) => (
            <tr key={index}>
              <td>{todo.title}</td>
              <td>{todo.discription}</td>
              <td>{todo.tag}</td>
              <td>{todo.day}</td>
              <td>
                {/* Use Link to navigate to the edit page with todo data */}
                <Link to={{ pathname: "/edit", state: { todo, index } }}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> : 
      <h1 style={{textAlign: "center"}}>No todos to display</h1>}
    </>
  );
};

export default Home;
