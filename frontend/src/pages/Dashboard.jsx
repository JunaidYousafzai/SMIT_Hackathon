import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthentication } from "../context/AuthContext";
import Loader from "../pages/Loader"; 

const Dashboard = () => {
  const { role, token } = useAuthentication(); 
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/not-authorized");
    }
  }, [role, navigate]);
  useEffect(() => {
    if (role === "admin") {
      axios
        .get("http://localhost:3000/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setLoans(response.data.loans); 
          setLoading(false); 
        })
        .catch((error) => {
          setLoading(false);
          setError("Error fetching loan data.");
          console.error("Error:", error);
        });
    }
  }, [role, token]);

  if (loading) {
    return <Loader />; 
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard</p>

      <h2 className="mt-6 text-xl">Loan Applications</h2>
      {loans.length === 0 ? (
        <p>No loan applications available.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border border-gray-200 mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Subcategory</th>
              <th className="border px-4 py-2">Loan Amount</th>
              <th className="border px-4 py-2">Duration</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td className="border px-4 py-2">{loan.user.username}</td>
                <td className="border px-4 py-2">{loan.user.email}</td>
                <td className="border px-4 py-2">{loan.category}</td>
                <td className="border px-4 py-2">{loan.subCategory}</td>
                <td className="border px-4 py-2">${loan.loanAmount}</td>
                <td className="border px-4 py-2">{loan.duration} years</td>
                <td className="border px-4 py-2">{loan.status}</td>
                <td className="border px-4 py-2">{new Date(loan.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
