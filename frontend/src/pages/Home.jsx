import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../context/AuthContext";

const Home = () => {
  const { token, user, saveToken, saveUser } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signIn");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    saveToken(null);
    saveUser({ email: "", username: "", role: "" });
    navigate("/"); 
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const goToApplyForLoan = () => {
    navigate("/apply-for-loan");
  };

  return (
    <div className="homepage">
      <section className="banner bg-blue-600 text-white text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Get an Easy Loan Now!</h1>
        <p className="mb-6">Fast, reliable, and secure loan services tailored to your needs.</p>
        <div className="actions">
          {token ? (
            <div>
              <button
                onClick={handleLogout}
                className="bg-red-500 py-2 px-6 text-white font-semibold rounded-md"
              >
                Logout
              </button>
              {user?.role === "admin" ? (
                <button
                  onClick={goToDashboard}
                  className="ml-4 py-2 px-6 text-white font-semibold bg-green-500 rounded-md"
                >
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={goToApplyForLoan}
                  className="ml-4 py-2 px-6 text-white font-semibold bg-yellow-500 rounded-md"
                >
                  Apply for Loan
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/signIn")}
              className="py-2 px-6 text-white font-semibold bg-green-500 rounded-md"
            >
              Login
            </button>
          )}
        </div>
      </section>

      <footer className="footer bg-blue-600 text-white text-center py-4">
        <p>&copy; 2025 LoanMate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
