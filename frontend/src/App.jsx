import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminCakesPage from "./pages/AdminCakesPage";
import FlavoursPage from "./pages/FlavoursPage";
import EditProfile from "./pages/EditProfile";
import CakesPage from "./pages/CakesPage";
import CreateProfile from "./pages/CreateProfile";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import CustomUrlWrapper from "./components/CustomUrlWrapper";
import { ProfileProvider } from "./context/ProfileContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Loader from './loaders/Loader';

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500); 
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Loader />;
  return (
    <AuthProvider>
      <ProfileProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-black text-white">
            <Nav />
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              }}
            />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/account"
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profileedit"
                  element={
                    <ProtectedRoute>
                      <EditProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/flavours"
                  element={
                    <ProtectedRoute>
                      <FlavoursPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cakes/:id"
                  element={
                    <ProtectedRoute>
                      <AdminCakesPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/:customUrl/:categoryId" element={<CakesPage />} />
                <Route
                  path="/createprofile"
                  element={
                    <ProtectedRoute>
                      <CreateProfile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/:customUrl" element={<CustomUrlWrapper />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default App;
