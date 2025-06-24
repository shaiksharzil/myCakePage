import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Tilt from "react-parallax-tilt";
import toast, { Toaster } from "react-hot-toast";
import { debounce } from "lodash";
import { useAuth } from "../context/AuthContext";
import Eyes from "../icons/Eyes";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [customURL, setCustomURL] = useState("");
  const [remember, setRemember] = useState(false);
  const [urlAvailable, setUrlAvailable] = useState(null);
  const { checkAuth } = useAuth();
  const [passType, setPassType] = useState("password");
  const [passwordError, setPasswordError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const Url = import.meta.env.VITE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validatePassword(password) || validateCustomUrl(customURL)) {
      toast.error("Please fix errors before submitting");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await toast.promise(
        axios.post(
          `${Url}/api/auth/signup`,
          {
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password,
            customUrl: customURL.toLowerCase(),
            remember,
          },
          {
            withCredentials: true,
          }
        ),
        {
          loading: "Creating your account...",
          success: (res) => res.data.message || "Signup successful",
          error: (err) =>
            err?.response?.data?.message || "Signup failed. Try again.",
        }
      );

      await checkAuth();
      window.location.href = "/createprofile";
    } catch (err) {
      // console.error("Signup error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const checkUrlAvailability = debounce(async (value) => {
    if (!value) return;
    try {
      const res = await axios.get(
        `${Url}/api/auth/check-custom-url?customUrl=${value}`
      );
      setUrlAvailable(!res.data.exists);
    } catch (error) {
      setUrlAvailable(null);
    }
  }, 500);

  const togglePasswordVisibility = () => {
    setPassType(passType === "password" ? "text" : "password");
  };

  const validatePassword = (value) => {
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLongEnough = value.length >= 8;

    if (!isLongEnough) return "Password must be at least 8 characters";
    if (!hasUppercase) return "Include at least one uppercase letter";
    if (!hasNumber) return "Include at least one number";
    if (!hasSpecial) return "Include at least one special character";

    return "";
  };

  const validateCustomUrl = (value) => {
    if (!/^[a-z0-9-]+$/.test(value)) {
      return "Only lowercase letters, numbers, and hyphens allowed";
    }
    if (value.length < 3) {
      return "Must be at least 3 characters long";
    }
    return "";
  };

  return (
    <div className="h-svh w-screen flex justify-center items-center bg-black text-white">
      <Tilt
        tiltMaxAngleX={-5}
        tiltMaxAngleY={-5}
        glareEnable={true}
        glareMaxOpacity={0.1}
        transitionSpeed={1000}
        className="rounded-xl"
      >
        <div className="p-3 bg-white/10 border border-white/10 shadow-lg backdrop-filter backdrop-blur-md rounded-xl w-86">
          <h2 className="font-bold text-2xl text-center text-white/80">
            Welcome to <span style={{ fontFamily: "Alagen" }}> MyCakePage</span>
          </h2>
          <p className="text-white/70 text-sm pb-1">
            Enter your details below to create an account
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <h3 className="text-white/70">Username:</h3>
              <input
                type="text"
                placeholder="Enter username"
                className="bg-white/10 border border-white/10 shadow-lg backdrop-filter backdrop-blur-md text-white rounded-md focus:outline-none pl-2 h-8 mb-2 w-full"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <h3 className="text-white/70">Email:</h3>
              <input
                type="email"
                placeholder="Enter email"
                className="bg-white/10 border border-white/10 shadow-lg backdrop-filter backdrop-blur-md text-white rounded-md focus:outline-none pl-2 h-8 mb-2 w-full"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <h3 className="text-white/70">Custom URL:</h3>
              <input
                type="text"
                placeholder="Eg: mycakepage/yourpage"
                className="bg-white/10 border border-white/10 shadow-lg backdrop-filter backdrop-blur-md text-white rounded-md focus:outline-none pl-2 h-8 mb-1 w-full"
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();
                  setCustomURL(value);
                  const error = validateCustomUrl(value);
                  setUrlError(error);
                  if (!error) checkUrlAvailability(value);
                }}
                required
              />
              {urlError && <p className="text-sm text-red-400">{urlError}</p>}
              {!urlError && urlAvailable === false && (
                <p className="text-sm text-red-400">URL already taken</p>
              )}
              {!urlError && urlAvailable === true && (
                <p className="text-sm text-green-400">URL is available!</p>
              )}
            </div>
            <div className="mb-1">
              <h3 className="text-white/70">Password:</h3>
              <div className="relative">
                <input
                  type={passType}
                  placeholder="Enter password"
                  className="bg-white/10 border border-white/10 shadow-lg backdrop-filter backdrop-blur-md text-white rounded-md focus:outline-none pl-2 pr-10 h-8 w-full"
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                    setPasswordError(validatePassword(value));
                  }}
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
            {passwordError && (
              <p className="text-sm text-red-400">{passwordError}</p>
            )}
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-black cursor-pointer h-3 w-3 mr-1"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember for 30 days
              </label>
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
              {isSubmitting ? "Creating..." : "Create Account"}
            </button>
          </form>
          <p className="text-sm text-center text-white/70">
            Already have an account?{" "}
            <Link to="/signin" className="text-white cursor-pointer underline">
              Sign In
            </Link>
          </p>
        </div>
      </Tilt>
    </div>
  );
};

export default Signup;
