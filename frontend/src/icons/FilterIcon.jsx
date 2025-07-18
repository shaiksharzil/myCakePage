import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Lottie from "lottie-react";
import filterAnimation from "../iconsJsonFiles/filter.json";

const FilterIcon = forwardRef(({ size = 50 }, ref) => {
  const lottieRef = useRef();

  // Optional: expose controls to parent via ref
  useImperativeHandle(ref, () => ({
    play: () => lottieRef.current?.play(),
    stop: () => lottieRef.current?.stop(),
  }));

  return (
    <div
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
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
