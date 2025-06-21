import React, { useRef, useState } from "react";
import Lottie from "lottie-react";
import visibilityV3 from "../iconsJsonFiles/visibility-V3.json";

const Eyes = () => {
  const lottieRef = useRef();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    const nextOpen = !open;
    setOpen(nextOpen);

    if (nextOpen) {
      lottieRef.current?.playSegments([0, 17], true); // play forward
    } else {
      lottieRef.current?.playSegments([17, 0], true); // play reverse
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: 25,
          height: 25,
        stroke:"green",
          filter: "brightness(0) invert(1)",
        opacity:0.7,  // make black Lottie white
        cursor: "pointer",
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={visibilityV3}
        loop={false}
        autoplay={false}
      />
    </div>
  );
};

export default Eyes;
