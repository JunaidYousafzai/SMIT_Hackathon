
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { AuthContextProvider } from "./context/AuthContext";
import GuestRoute from "./routes/GuestRoute";
import UserRoute from "./routes/UserRoute";
import ScrollToTop from "./pages/ScrollToTop";
import ApplyForLoan from "./pages/ApplyForLoan";
import AdminRoute from "./routes/AdminRoute";
import Dashboard from "./pages/Dashboard";
import NotAuthorized from "./pages/NotAuthorized";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          {/* Guest Routes */}
          <Route element={<GuestRoute />}>
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/not-authorized" element={<NotAuthorized />} />
          </Route>

          {/* Private Routes */}
          <Route element={<UserRoute />}>
            <Route path="/apply-for-loan" element={<ApplyForLoan />} />
            
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
