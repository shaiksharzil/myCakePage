import React from "react";

const SkeletonPublicCakeCategory = () => {
  return (
    <div className="w-full flex flex-col items-center mt-6 px-3">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="w-130 max-md:w-86 bg-white/10 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md text-white px-4 py-3 flex flex-col gap-2 mb-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 w-11/12">
              <div className="h-5 w-5 rounded-full shimmer" />
              <div className="h-5 w-32 shimmer rounded-md" />
            </div>
            <div className="h-5 w-5 shimmer rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonPublicCakeCategory;
