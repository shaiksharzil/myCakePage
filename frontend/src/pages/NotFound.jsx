import React from "react";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";

const NotFound = () => {
  return (
    <div className="bg-black h-screen w-screen flex flex-col items-center justify-center">
      <Tilt
        tiltMaxAngleX={-5}
        tiltMaxAngleY={-1}
        glareEnable={true}
        glareMaxOpacity={0.1}
        // scale={0.9}
        transitionSpeed={1000}
        className="rounded-xl"
      >
        <div className=" bg-white/10 border border-white/10 shadow-lg backdrop-filter backdrop-blur-md rounded-2xl px-3 py-3 max-md:mx-3">
          <h1 className="text-white text-6xl font-bold text-center max-md:text-4xl">
            404
          </h1>{" "}
          <h1 className="text-4xl font-bold text-white text-center max-md:text-2xl">
            The Cake You’re Looking For Is Missing!
          </h1>
          <p className="text-lg mt-4 text-white/70 text-center max-md:text-sm max-md:mt-1">
            Whether you came to{" "}
            <span className="text-emerald-400">browse the cakes</span>, this
            page isn’t on the menu.
          </p>
          <p className="mt-4 text-white/70 text-center max-md:text-sm max-md:mt-1">
            But don't worry — the oven’s still warm and there’s plenty more to
            explore.
          </p>
        </div>
      </Tilt>
      <Link
        to="/"
        className="mt-6 bg-white/10 border hover:bg-white/20 border-white/10 shadow-lg backdrop-filter backdrop-blur-md px-2 py-3 rounded-md text-white text-lg"
      >
        Back to Home <i class="ri-external-link-line"></i>
      </Link>
    </div>
  );
};

export default NotFound;
