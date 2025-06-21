import React, { useRef } from "react";
import Lottie from "lottie-react";
import share from "../iconsJsonFiles/share.json";

const ShareIcon = () => {
  const lottieRef = useRef();

  const handleMouseEnter = () => {
    lottieRef.current?.play();
  };

  const handleMouseLeave = () => {
    lottieRef.current?.stop();
  };

  return (
    <div
      style={{
        width: 35,
        height: 35,
        filter: "brightness(0) invert(1)",
        opacity:0.5,
        cursor: "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={share}
        loop={false}
        autoplay={false}
      />
    </div>
  );
};

export default ShareIcon;
