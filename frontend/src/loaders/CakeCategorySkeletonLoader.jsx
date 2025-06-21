import React from 'react'

const CakeCategorySkeletonLoader = () => {
  return (
    <div className="w-full flex flex-col items-center mt-6 px-3 animate-pulse">
      <div className="w-130 max-md:w-86 bg-white/10 rounded-2xl shimmer border border-white/10 shadow-lg backdrop-blur-md text-white px-4 py-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 shimmer w-11/12">
            <div className="h-5 w-5 bg-white/20 shimmer rounded-md"></div>
            <div className="h-5 w-3/4 bg-white/20 shimmer rounded-md"></div>
          </div>
          <div className="h-5 w-5 bg-white/20 shimmer rounded-full"></div>
        </div>

        <div className="flex justify-end gap-4 mt-2 text-sm">
          <div className="h-4 w-12 bg-white/20 shimmer rounded-md"></div>
          <div className="h-4 w-12 bg-white/20 shimmer rounded-md"></div>
          <div className="h-4 w-12 bg-red-300/20 shimmer rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

export default CakeCategorySkeletonLoader