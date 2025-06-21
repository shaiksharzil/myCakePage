import React from "react";
import Tilt from "react-parallax-tilt";

const NoCakeCategories = () => {
  return (
    <div className="bg-black my-10 flex flex-col items-center justify-center">
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
            No Cake Categories Yet!
          </h1>
          <p className="text-white/70 mt-3 max-md:text-sm">
            Start by{" "}
            <span className="text-emerald-400 font-medium">
              creating a new cake category
            </span>{" "}
            to organize your delicious designs.
          </p>
          <p className="text-white/60 mt-2 max-md:text-sm">
            Click on the <span className="text-white font-bold text-lg">+</span>{" "}
            button at the bottom-right to add your first cake category.
          </p>
          <p className="text-white/40 text-sm mt-4 max-md:text-xs">
            Categories help group your cakes by theme, occasion, or style!
          </p>
        </div>
      </Tilt>
    </div>
  );
};

export default NoCakeCategories;
