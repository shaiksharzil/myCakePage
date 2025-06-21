import React from "react";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";

const UnauthPage = () => {
  return (
    <div className="bg-black h-screen w-screen flex flex-col items-center justify-center">
      <Tilt
        tiltMaxAngleX={-5}
        tiltMaxAngleY={-1}
        glareEnable={true}
        glareMaxOpacity={0.1}
        transitionSpeed={1000}
        className="rounded-xl"
      >
        <div className="bg-white/10 border border-white/10 shadow-lg backdrop-filter backdrop-blur-md rounded-2xl px-4 py-5 max-md:mx-3">
          <h1 className="text-white text-6xl font-bold text-center max-md:text-4xl">
            401
          </h1>
          <h2 className="text-4xl font-bold text-white text-center mt-2 max-md:text-2xl">
            You’re Not Allowed Here!
          </h2>
          <p className="text-lg mt-4 text-white/70 text-center max-md:text-sm max-md:mt-2">
            It looks like you tried to access a page that requires{" "}
            <span className="text-red-400 font-medium">authentication</span>.
          </p>
          <p className="mt-4 text-white/70 text-center max-md:text-sm max-md:mt-2">
            Please sign in or create an account to continue.
          </p>
        </div>
      </Tilt>
      <div className="flex items-center justify-center gap-4">
        <Link
          to="/signin"
          className="mt-6 bg-white/10 border hover:bg-white/20 border-white/10 shadow-lg backdrop-filter backdrop-blur-md px-4 py-3 rounded-md text-white text-lg"
        >
          SignIn
        </Link>
        <Link
          to="/signup"
          className="mt-6 bg-white/10 border hover:bg-white/20 border-white/10 shadow-lg backdrop-filter backdrop-blur-md px-4 py-3 rounded-md text-white text-lg"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default UnauthPage;
