// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './Components/SignUpForm';
import LoginForm from './Components/LoginForm';
import Home from './Components/Home';
import Navbar from './Pages/Navbar';
import Todopage from './Pages/Todopage';
import EditTodoPage from './Pages/EditTodoPage';

function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/log-in" element={<LoginForm />} />
        <Route path="/add-todo" element={<Todopage />} />
        <Route path="/edit" element={<EditTodoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
