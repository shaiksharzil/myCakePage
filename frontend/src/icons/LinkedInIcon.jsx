import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Lottie from "lottie-react";
import linkedinAnimation from "../iconsJsonFiles/linkedin.json"; // adjust the path

const LinkedInIcon = forwardRef(({ size = 30 }, ref) => {
  const lottieRef = useRef();

  useImperativeHandle(ref, () => ({
    startLoop: () => {
      if (lottieRef.current) {
        lottieRef.current.setSpeed(1);
        lottieRef.current.play();
      }
    },
    stopAndReset: () => {
      if (lottieRef.current) {
        lottieRef.current.stop();
        lottieRef.current.goToAndStop(0, true);
      }
    },
  }));

  return (
    <div
      style={{
        width: size,
        height: size,
        filter: "brightness(0) invert(1)",
        marginRight: 6,
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={linkedinAnimation}
        loop={true}
        autoplay={false}
      />
    </div>
  );
});

export default LinkedInIcon;
