import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Tilt from "react-parallax-tilt";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Eyes from '../icons/Eyes';

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [passType, setPassType] = useState("password");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { checkAuth } = useAuth();
  const Url = import.meta.env.VITE_URL;

  const togglePasswordVisibility = () => {
    setPassType(passType === "password" ? "text" : "password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginPromise = axios.post(
      `${Url}/api/auth/signin`,
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
    setIsSubmitting(true);
    toast.promise(
      loginPromise,
      {
        loading: "Signing in...",
        success: "Welcome back!",
        error: (err) => err?.response?.data?.message || "Sign In Failed",
      },
      {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );

    try {
      const res = await loginPromise;

      const token = res.data.token;
      const profile = res.data.hasProfile;
      const customURL = res.data.customURL;

      localStorage.setItem("token", token);
      if (remember) {
        localStorage.setItem("remember", "true");
      } else {
        localStorage.removeItem("remember");
      }

      await checkAuth();

      if (!profile) {
        window.location.href = "/createprofile";
      } else {
        window.location.href = "/account";
      }
    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }
  };  
  

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black text-white">
      <Toaster />
      <Tilt
        tiltMaxAngleX={-5}
        tiltMaxAngleY={-5}
        glareEnable={true}
        glareMaxOpacity={0.1}
        transitionSpeed={1000}
        className="rounded-xl"
      >
        <div className="p-3 bg-white/10 border border-white/10 shadow-lg backdrop-filter backdrop-blur-md rounded-xl w-86">
          <p className="text-white/70">Please enter your details</p>
          <h2 className="font-bold shimmer-text text-3xl pb-3 text-white/80">
            Welcome back!
          </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <h3 className="text-white/70">Username:</h3>
              <input
                type="text"
                placeholder="Enter username"
                className="bg-white/10 border border-white/10 shadow-lg backdrop-filter backdrop-blur-md text-white rounded-md focus:outline-none pl-2 h-8 mb-2 w-full"
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                required
              />
            </div>
            <div className="mb-3">
              <h3 className="text-white/70">Password:</h3>
              <div className="relative">
                <input
                  type={passType}
                  placeholder="Enter password"
                  className="bg-white/10 border border-white/10 shadow-lg backdrop-filter backdrop-blur-md text-white rounded-md focus:outline-none pl-2 pr-10 h-8 w-full"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  <Eyes />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-white/70 cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="accent-black cursor-pointer h-3 w-3"
                />
                Remember for 30 days
              </label>
              <p className="text-sm underline cursor-pointer">
                Forgot password
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-white/20"
              } bg-white/10 w-full rounded-md cursor-pointer h-8 font-medium text-white/70 hover:text-white/90`}
            >
              {isSubmitting ? "Signing in..." : "SignIn"}
            </button>
          </form>
          <p className="text-sm text-center text-white/70">
            Don't have an account?{" "}
            <Link to="/signup" className="text-white cursor-pointer underline">
              Create Account
            </Link>
          </p>
        </div>
      </Tilt>
    </div>
  );
};

export default SignIn;
