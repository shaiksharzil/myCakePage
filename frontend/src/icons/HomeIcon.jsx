import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Lottie from "lottie-react";
import homeAnimation from "../iconsJsonFiles/home.json";

const HomeIcon = forwardRef((props, ref) => {
  const lottieRef = useRef();

  useImperativeHandle(ref, () => ({
    playForward: () => lottieRef.current?.playSegments([0, 31], true),
    playReverse: () => lottieRef.current?.playSegments([31, 0], true),
  }));

  return (
    <div
      style={{
        width: 27,
        height: 27,
        filter: "brightness(0) invert(1)",
        opacity: 0.7,
        marginRight: 6,
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={homeAnimation}
        loop={false}
        autoplay={false}
      />
    </div>
  );
});

export default HomeIcon;
