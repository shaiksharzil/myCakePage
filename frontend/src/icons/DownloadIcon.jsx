import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Lottie from "lottie-react";
import downloadAnimation from "../iconsJsonFiles/download.json"; // update path if needed

const DownloadIcon = forwardRef(({ size = 32 }, ref) => {
  const lottieRef = useRef();

  useImperativeHandle(ref, () => ({
    play: () => {
      lottieRef.current?.goToAndStop(0, true); // reset to start
      lottieRef.current?.playSegments([0, 120], true); // play full
    },
  }));

  return (
    <div
      style={{
        width: size,
        height: size,
        filter: "brightness(0) invert(1)",
        opacity: 0.7,
        marginRight: 6,
        cursor: "pointer",
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={downloadAnimation}
        loop={false}
        autoplay={false}
      />
    </div>
  );
});

export default DownloadIcon;
