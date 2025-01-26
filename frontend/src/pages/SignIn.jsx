import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthentication } from "../context/AuthContext";

const SignInForm = () => {
  const { saveToken, saveUser } = useAuthentication(); // Get saveToken and saveUser from context
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    handleLogin();
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:3000/api/auth/login", formData)
      .then((response) => {
        alert("User logged in successfully!");
        console.log(response);

        const { email, token, username, role } = response.data.user;

        saveToken(token);
        saveUser({ email, username, role });

        
        Cookies.set("token", token);
        Cookies.set("email", email);
        Cookies.set("username", username);
        Cookies.set("role", role);

        // Redirect to home or dashboard after successful login
        navigate("/");
      })
      .catch((err) => {
        alert(err?.response?.data?.message || "Error signing in!");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-10 mb-4 w-96 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 animate-slide-up"
      >
        <h2 className="text-3xl mb-6 text-center font-semibold">Sign In</h2>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-red-900 transition duration-150 ease-in-out"
            placeholder="Email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-red-900 transition duration-150 ease-in-out"
            placeholder="Enter Your Password"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-red-900 mx-auto hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Sign In
          </button>
        </div>
        <NavLink to="/signUp" className="flex justify-center p-2 underline">
          Create an account
        </NavLink>
      </form>
    </div>
  );
};

export default SignInForm;
