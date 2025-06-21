import React from 'react'

const FlavourCardSkeletonLoader = () => {
  return (
    <div className="w-full flex flex-col items-center mt-6 px-3">
      <div className="w-130 max-md:w-86 bg-white/10 z-0 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md text-white px-4 py-3 flex flex-col gap-2 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <div className="h-8 w-8 shimmer rounded-md" />{" "}
            {/* Icon Placeholder */}
            <div className="flex flex-col gap-1">
              <div className="h-5 w-32 shimmer rounded-md" />{" "}
              {/* Flavour Name */}
              <div className="h-4 w-24 shimmer rounded-md" /> {/* Price */}
            </div>
          </div>
          <div className="h-5 w-5 shimmer rounded-full" /> {/* More Icon */}
        </div>

        <div className="flex justify-end gap-4 mt-2 text-sm">
          <div className="h-4 w-12 shimmer rounded-md" />
          <div className="h-4 w-16 shimmer rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default FlavourCardSkeletonLoader;
  