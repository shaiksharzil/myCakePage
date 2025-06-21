import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Lottie from "lottie-react";
import githubAnimation from "../iconsJsonFiles/github.json"; // Replace with your actual path

const GithubIcon = forwardRef(({ size = 30 }, ref) => {
  const lottieRef = useRef();

  useImperativeHandle(ref, () => ({
    startLoop: () => {
      lottieRef.current?.setSpeed(1);
      lottieRef.current?.play();
    },
    stopAndReset: () => {
      lottieRef.current?.stop();
      lottieRef.current?.goToAndStop(0, true);
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
        animationData={githubAnimation}
        loop={true}
        autoplay={false}
      />
    </div>
  );
});

export default GithubIcon;
