import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Lottie from "lottie-react";
import filterAnimation from "../iconsJsonFiles/filter.json";

const FilterIcon = forwardRef(({ size = 50 }, ref) => {
  const lottieRef = useRef();

  // Expose controls to parent if needed
  useImperativeHandle(ref, () => ({
    play: () => lottieRef.current?.play(),
    stop: () => lottieRef.current?.stop(),
  }));

  const handleMouseEnter = () => {
    if (lottieRef.current) {
      lottieRef.current.setDirection(1); // forward
      lottieRef.current.loop = true; // loop while hovering
      lottieRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (lottieRef.current) {
      lottieRef.current.setDirection(-1); // reverse
      lottieRef.current.loop = false; // reverse only once
      lottieRef.current.play();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: size,
        height: size,
        filter: "brightness(0) invert(1)",
        marginRight: 6,
        cursor: "pointer",
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={filterAnimation}
        loop={false}
        autoplay={false}
      />
    </div>
  );
});

export default FilterIcon;
