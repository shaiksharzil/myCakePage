import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Lottie from "lottie-react";
import signOutAnimation from "../iconsJsonFiles/userX.json"; // Adjust path

const SignOutIcon = forwardRef((props, ref) => {
  const lottieRef = useRef();

  useImperativeHandle(ref, () => ({
    playForward: () => {
      lottieRef.current?.goToAndStop(0, true); // ✅ reset to first frame
      lottieRef.current?.playSegments([0, 8], true); // ✅ play forward
    },
    playReverse: () => {
      lottieRef.current?.goToAndStop(8, true); // ✅ reset to last frame
      lottieRef.current?.playSegments([8, 0], true); // ✅ play reverse
    },
  }));

  return (
    <div
      style={{
        width: 28,
        height: 28,
        filter: "brightness(0) invert(1)",
        marginRight: 6,
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={signOutAnimation}
        loop={false}
        autoplay={false}
      />
    </div>
  );
});

export default SignOutIcon;
