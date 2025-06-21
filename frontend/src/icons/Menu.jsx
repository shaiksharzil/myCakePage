import React, { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import menuV3 from "../iconsJsonFiles/menuV4.json";

const MenuIcon = ({ isOpen, onToggle }) => {
  const lottieRef = useRef();

  useEffect(() => {
    if (lottieRef.current) {
      if (isOpen) {
        lottieRef.current.playSegments([0, 20], true); // open animation
      } else {
        lottieRef.current.playSegments([20, 0], true); // close animation
      }
    }
  }, [isOpen]);

  return (
    <div
      onClick={onToggle}
      style={{
        width: 35,
        height: 35,
        filter: "brightness(0) invert(1)",
        cursor: "pointer",
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={menuV3}
        loop={false}
        autoplay={false}
      />
    </div>
  );
};

export default MenuIcon;
