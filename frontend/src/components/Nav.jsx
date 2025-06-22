import React, { useState, useEffect, useRef } from "react";
import CakeLogo from "../icons/CakeLogo";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import Menu from '../icons/Menu';
import HomeIcon from "../icons/HomeIcon";
import SignOutIcon from "../icons/SignOutIcon";
import SignUpIcon from "../icons/SignUpIcon";


const Nav = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, checkAuth, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 
  const { customUrl } = useProfile();
  const homeIconRef  = useRef();
  const signOutIconRef = useRef();
  const signUpIconRef = useRef();
  const Url = import.meta.env.VITE_URL;


  const toggleMenu = () => setOpen(!open);

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  const handleLogout = async () => {
    await axios.post(
      `${Url}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    setIsAuthenticated(false);
    navigate("/");
  };

  const renderLinks = (isMobile = false) => {
    const baseClass = isMobile
      ? "hover:text-white/90 transition flex items-center"
      : "hover:text-white/90 flex transition items-center cursor-pointer";
    const buttonClass = isMobile
      ? "text-white flex items-center bg-white shimmer border border-white/10 px-2 py-0.5 rounded-md"
      : "text-white flex font-semibold bg-white shimmer cursor-pointer border border-white/10 px-2 py-1 rounded-2xl";

    return (
      <>
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className={baseClass}
          onMouseEnter={() => homeIconRef.current?.playForward()}
          onMouseLeave={() => homeIconRef.current?.playReverse()}
        >
          <HomeIcon ref={homeIconRef} />
          Home
        </Link>

        {!isAuthenticated ? (
          <>
            <Link
              to="/signin"
              onClick={() => setOpen(false)}
              className={baseClass}
            >
              <i className="ri-login-box-line mr-0.5"></i> SignIn
            </Link>
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className={buttonClass}
              onMouseEnter={() => signUpIconRef.current?.playForward?.()}
              onMouseLeave={() => signUpIconRef.current?.playReverse?.()}
            >
              <SignUpIcon ref={signUpIconRef} /> Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/account"
              onClick={() => setOpen(false)}
              className={baseClass}
            >
              <i className="ri-user-3-line mr-0.5"></i> Profile
            </Link>
            <Link
              to={`/${customUrl}`}
              onClick={() => setOpen(false)}
              className={baseClass}
            >
              <i className="ri-cake-2-line mr-0.5"></i> CakePage
            </Link>
            <button
              onClick={handleLogout}
              className={buttonClass}
              onMouseEnter={() => signOutIconRef.current?.playForward()}
              onMouseLeave={() => signOutIconRef.current?.playReverse()}
            >
              <SignOutIcon ref={signOutIconRef} /> SignOut
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <nav className="w-screen h-20 bg-black flex items-center justify-center">
      <div className="w-200 max-md:w-86 h-16  flex items-center justify-between px-4 rounded-4xl fixed z-20 border border-white/20 shadow-lg backdrop-blur-xs">
        <Link to={"/"} className="flex items-center text-white gap-1">
          <div className="mb-2">
            <CakeLogo />
          </div>
          <span
            style={{ fontFamily: "Alagen" }}
            className="text-2xl select-none"
          >
            MyCakePage
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-white/70 text-xl font-medium">
          {renderLinks(false)}
        </div>
        <div className="relative md:hidden">
          <Menu isOpen={open} onToggle={toggleMenu} />
          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="absolute w-40 right-0 mt-5 bg-black border border-white/20 shadow-lg rounded-xl px-6 py-3 flex flex-col items-start gap-y-3 font-medium text-white/60 text-lg"
              >
                {renderLinks(true)}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
