import React from "react";
import Tilt from "react-parallax-tilt";

const NoCakes = () => {
  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center">
      <Tilt
        tiltMaxAngleX={-5}
        tiltMaxAngleY={-5}
        glareEnable={true}
        glareMaxOpacity={0.1}
        transitionSpeed={1000}
        className="rounded-xl"
      >
        <div className="bg-white/10 border border-white/10 shadow-lg backdrop-filter backdrop-blur-md rounded-2xl px-4 py-6 max-w-md mx-4 text-center">
          <h1 className="text-white text-3xl font-bold max-md:text-2xl">
            No Cakes Available!
          </h1>
          <p className="text-white/70 mt-3 max-md:text-sm">
            Add your beautiful{" "}
            <span className="text-emerald-400 font-medium">cake designs</span>{" "}
            to showcase to your customers.
          </p>
          <p className="text-white/60 mt-2 max-md:text-sm">
            Click on the <span className="text-white font-bold text-lg">+</span>{" "}
            button to upload your first cake.
          </p>
          <p className="text-white/40 text-sm mt-4 max-md:text-xs">
            Customers love seeing designs before ordering!
          </p>
        </div>
      </Tilt>
    </div>
  );
};

export default NoCakes;
