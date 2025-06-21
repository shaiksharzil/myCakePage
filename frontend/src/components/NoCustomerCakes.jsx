import React from "react";
import Tilt from "react-parallax-tilt";

const NoCustomerCakes = () => {
  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center bg-black">
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
            No Cakes Found!
          </h1>
          <p className="text-white/70 mt-3 max-md:text-sm">
            Looks like the bakery hasn't added any cakes yet.
          </p>
          <p className="text-white/60 mt-2 max-md:text-sm">
            Please check back soon — new cake designs might be baking!
          </p>
          <p className="text-white/40 text-sm mt-4 max-md:text-xs">
            You can contact the bakery directly for special or custom cake
            requests.
          </p>
        </div>
      </Tilt>
    </div>
  );
};

export default NoCustomerCakes;
