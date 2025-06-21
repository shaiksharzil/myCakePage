import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Lottie from "lottie-react";
import trashAnimation from "../iconsJsonFiles/trashV2.json"; // Adjust the path if needed

const TrashIcon = forwardRef(({ size = 25 }, ref) => {
  const lottieRef = useRef();

  useImperativeHandle(ref, () => ({
    playForward: () => {
      lottieRef.current?.goToAndStop(0, true); // reset to frame 0
      lottieRef.current?.playSegments([0, 5], true); // play forward
    },
    playReverse: () => {
      lottieRef.current?.goToAndStop(5, true); // reset to frame 5
      lottieRef.current?.playSegments([5, 0], true); // play reverse
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
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={trashAnimation}
        loop={false}
        autoplay={false}
      />
    </div>
  );
});

export default TrashIcon;
