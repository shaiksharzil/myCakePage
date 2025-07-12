import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Lottie from "lottie-react";
import editAnimation from "../iconsJsonFiles/edit.json";

const EditIcon = forwardRef(({ size = 25 }, ref) => {
  const lottieRef = useRef();

  useImperativeHandle(ref, () => ({
    playForward: () => {
      lottieRef.current?.goToAndStop(0, true);
      lottieRef.current?.playSegments([0, 60], true);
    },
    playReverse: () => {
      lottieRef.current?.goToAndStop(60, true);
      lottieRef.current?.playSegments([60, 0], true);
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
        animationData={editAnimation}
        loop={false}
        autoplay={false}
      />
    </div>
  );
});

export default EditIcon;
