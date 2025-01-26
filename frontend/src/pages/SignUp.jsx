import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    age: "",
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
    handleSignUp();
  };

  const handleSignUp = () => {
      axios
      .post("http://localhost:3000/api/auth/register", formData)
      .then((response) => {
        try{
          alert(response?.data?.message)
          navigate("/signIn");
        }catch(err){
          alert(err)
        }
      })
      .catch((err) => {
        alert(err.response?.data?.message || "An error occurred during registration.");
        console.log(err.response)
      });
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-10 mb-4 w-96 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 animate-slide-up">
        <h2 className="text-3xl mb-6 text-center font-semibold text-gray-800">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
          <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-900 transition duration-150 ease-in-out" placeholder="Username" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-900 transition duration-150 ease-in-out" placeholder="Email" required />
        </div>


        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-900 transition duration-150 ease-in-out" placeholder="Password" required />
        </div>


        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">Contact</label>
          <input type="text" name="contact" id="contact" value={formData.contact} onChange={handleChange} className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-900 transition duration-150 ease-in-out" placeholder="Contact" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
          <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-900 transition duration-150 ease-in-out" placeholder="Address" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">Age</label>
          <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-900 duration-150 ease-in-out" placeholder="Age" required />
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="bg-red-900 mx-auto hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
            Sign Up
          </button>
        </div>

        <NavLink to="/signIn" className="flex justify-center p-2 underline">
          already have an account?
        </NavLink>
      </form>
    </div>
  );
};

export default SignUpForm;
