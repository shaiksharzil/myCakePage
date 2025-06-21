import React from "react";

const SkeletonPublicProfileCard = () => {
  return (
    <div className="pt-10 w-screen flex items-center justify-center">
      <div className="bg-white/10 w-130 rounded-xl max-md:w-86 relative border border-white/20 shadow-lg backdrop-filter backdrop-blur-md text-white">
        {/* Profile image placeholder */}
        <div className="h-20 w-20 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 border-4 border-white/10 shimmer" />

        {/* Spacer */}
        <div className="h-12" />

        {/* Bakery name */}
        <div className="h-6 w-2/3 mx-auto rounded-md shimmer my-2" />

        {/* Address */}
        <div className="h-4 w-1/2 mx-auto rounded-md shimmer my-1" />

        {/* Mobile number */}
        <div className="h-4 w-1/3 mx-auto rounded-md shimmer my-1" />

        {/* Link row */}
        <div className="flex items-center justify-center m-2 gap-2 max-w-[90%] mx-auto">
          <div className="h-8 w-3/4 shimmer rounded-md" />
          <div className="h-8 w-8 shimmer rounded-md" />
          <div className="h-8 w-8 shimmer rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonPublicProfileCard;
