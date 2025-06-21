import React from "react";


const SkeletonEditProfileForm = () => {
  return (
    <div className="h-svh w-screen flex justify-center items-center bg-black text-white">
      <div className="rounded-xl shimmer">
        <form className="p-3 bg-white/10 border border-white/10 shadow-lg backdrop-filter backdrop-blur-md rounded-xl w-86 flex flex-col gap-3">
          <div className="h-6 w-2/3 rounded-md bg-white/10 shimmer"></div>
          <div className="h-4 w-1/2 rounded-md bg-white/10 shimmer"></div>

          {/* Image input */}
          <div className="flex flex-col gap-1">
            <div className="h-4 w-40 bg-white/10 rounded shimmer" />
            <div className="h-8 w-full bg-white/10 rounded shimmer" />
            <div className="w-32 h-32 rounded-lg bg-white/10 shimmer" />
          </div>

          {/* Bakery Name */}
          <div className="flex flex-col gap-1">
            <div className="h-4 w-32 bg-white/10 rounded shimmer" />
            <div className="h-8 w-full bg-white/10 rounded shimmer" />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <div className="h-4 w-24 bg-white/10 rounded shimmer" />
            <div className="h-20 w-full bg-white/10 rounded shimmer" />
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-1">
            <div className="h-4 w-32 bg-white/10 rounded shimmer" />
            <div className="h-8 w-full bg-white/10 rounded shimmer" />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <div className="h-8 w-full bg-white/10 rounded shimmer" />
            <div className="h-8 w-full bg-white/10 rounded shimmer" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkeletonEditProfileForm;
