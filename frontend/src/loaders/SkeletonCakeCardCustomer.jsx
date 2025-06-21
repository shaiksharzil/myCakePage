import React from 'react'

const SkeletonCakeCardCustomer = () => {
  return (
    <div className="break-inside-avoid-column mb-4">
      <div className="w-full border border-white/10 rounded-2xl backdrop-filter backdrop-blur-md px-5 py-3 my-2">
        {/* Image Placeholder */}
        <div className="overflow-hidden mt-3 mb-1.5 rounded-xl w-full h-48 shimmer"></div>

        {/* Flavour Section */}
        <div className="flex flex-col gap-2 mt-3">
          <div className="h-5 w-24 shimmer rounded-md" />
          <div className="h-9 w-full shimmer rounded-md" />
        </div>

        {/* Min Order Quantity */}
        <div className="h-5 w-2/3 mt-3 shimmer rounded-md" />

        {/* Quantity Selector */}
        <div className="flex items-center justify-start gap-3 mt-3">
          <div className="h-5 w-20 shimmer rounded-md" />
          <div className="flex gap-2 w-full h-10 shimmer rounded-md" />
        </div>

        {/* Price */}
        <div className="h-6 w-1/2 mt-3 shimmer rounded-md" />

        {/* Order */}
        <div className="flex items-center justify-between gap-x-1 mt-4">
          <div className="h-10 w-full shimmer rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCakeCardCustomer;
  