import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Lottie from "lottie-react";
import instagramAnimation from "../iconsJsonFiles/instagram.json"; // Update path if needed

const InstagramIcon = forwardRef(({ size = 30 }, ref) => {
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
      onMouseEnter={() => ref?.current?.play()}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={instagramAnimation}
        loop={false}
        autoplay={false}
      />
    </div>
  );
});

export default InstagramIcon;
