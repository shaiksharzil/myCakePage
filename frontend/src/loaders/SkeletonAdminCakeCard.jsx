import React from 'react'

const SkeletonAdminCakeCard = () => {
  return (
    <div className="break-inside-avoid-column mb-4">
      <div className="w-full border border-white/10 rounded-2xl backdrop-filter backdrop-blur-md px-5 py-3 my-2">
        {/* Image placeholder */}
        <div className="overflow-hidden mt-3 mb-1.5 rounded-xl w-full h-48 shimmer"></div>

        {/* Cake Name */}
        <div className="h-5 w-3/4 mt-2 shimmer rounded-md"></div>

        {/* Flavours select placeholder */}
        <div className="flex flex-col gap-2 mt-3">
          <div className="h-4 w-20 shimmer rounded-md"></div>
          <div className="h-9 w-full shimmer rounded-md"></div>
        </div>

        {/* MOQ and Extra Price */}
        <div className="h-5 w-2/3 mt-4 shimmer rounded-md"></div>
        <div className="h-6 w-1/2 mt-2 shimmer rounded-md"></div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-x-1 mt-4">
          <div className="h-10 w-1/2 shimmer rounded-md"></div>
          <div className="h-10 w-1/2 shimmer rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonAdminCakeCard