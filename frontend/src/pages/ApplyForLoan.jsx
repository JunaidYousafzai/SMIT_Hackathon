import React, { useState } from "react";
import axios from "axios";
import { useAuthentication } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

const ApplyForLoan = () => {
  const { token } = useAuthentication(); 
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    loanAmount: "",
    loanDuration: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Subcategory options based on category
  const subCategories = {
    Education: ["Loan", "University Fee"],
    Business: ["Startup Loan", "Working Capital"],
    "Home Construction": ["House Renovation", "New House Loan"],
    Wedding: ["Wedding Loan", "Event Planning"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.category || !formData.subCategory || !formData.loanAmount || !formData.loanDuration) {
      alert("Please fill in all fields");
      return;
    }
    
    // Validate the subcategory against the category
    if (!subCategories[formData.category]?.includes(formData.subCategory)) {
      setError(`Invalid subCategory for category ${formData.category}. Allowed subcategories are: ${subCategories[formData.category].join(", ")}`);
      return;
    }
  
    try {
      setLoading(true);
      setError("");
      setSuccess("");
  
      const response = await axios.post(
        "http://localhost:3000/api/auth/loans/submit",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );
  
      setLoading(false);
      setSuccess("Loan application submitted successfully!");
      navigate("/success");
    } catch (err) {
      setLoading(false);
      console.error("Error submitting loan:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to submit loan application. Please try again.");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-10 mb-4 w-96 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 animate-slide-up"
      >
        <h2 className="text-3xl mb-6 text-center font-semibold">Loan Application</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-red-900 transition duration-150 ease-in-out"
          >
            <option value="">Select Category</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
            <option value="Home Construction">Home Construction</option>
            <option value="Wedding">Wedding</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="subCategory">
            Subcategory
          </label>
          <select
            name="subCategory"
            id="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-red-900 transition duration-150 ease-in-out"
          >
            <option value="">Select Subcategory</option>
            {formData.category && subCategories[formData.category]?.map((subCat) => (
              <option key={subCat} value={subCat}>{subCat}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="loanAmount">
            Loan Amount
          </label>
          <input
            type="number"
            name="loanAmount"
            id="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-red-900 transition duration-150 ease-in-out"
            placeholder="Enter Loan Amount"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="loanDuration">
            Loan Duration
          </label>
          <select
            name="loanDuration"
            id="loanDuration"
            value={formData.loanDuration}
            onChange={handleChange}
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-red-900 transition duration-150 ease-in-out"
          >
            <option value="">Select Duration</option>
            <option value="1 year">1 year</option>
            <option value="2 years">2 years</option>
            <option value="3 years">3 years</option>
            <option value="5 years">5 years</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-red-900 mx-auto hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Loan Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyForLoan;
