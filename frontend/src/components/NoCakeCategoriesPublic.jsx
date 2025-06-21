import React from "react";
import Tilt from "react-parallax-tilt";

const NoCakeCategoriesPublic = () => {
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
            No Cakes Available!
          </h1>
          <p className="text-white/70 mt-3 max-md:text-sm">
            It looks like this bakery hasn't added any cake categories yet.
          </p>
          <p className="text-white/60 mt-2 max-md:text-sm">
            Please check back later — delicious cake collections might be coming
            soon!
          </p>
          <p className="text-white/40 text-sm mt-4 max-md:text-xs">
            Feel free to reach out to the bakery for special cake ideas or
            custom orders.
          </p>
        </div>
      </Tilt>
    </div>
  );
};

export default NoCakeCategoriesPublic;
