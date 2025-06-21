import React from "react";
import { Link, useParams } from "react-router-dom";

const CakeCategories = ({ categories }) => {
  const { customUrl } = useParams();
  if (!categories?.length) return null;

  return (
    <div className="w-full flex flex-col items-center mt-6 px-3">
      {categories.map((category) => (
        <div
          key={category._id}
          className="w-130 max-md:w-86 shimmer bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md text-white px-4 py-3 flex flex-col gap-2 mb-2"
        >
          <div className="flex items-center justify-between">
            <Link
              to={`/${customUrl}/${category._id}`}
              className="flex items-center group gap-2 w-11/12 cursor-pointer"
            >
              <i className="ri-cake-2-fill text-xl" />
              <span className="text-lg font-semibold">{category.name}</span>
              <i class="ri-arrow-right-double-line mt-1 text-xl transform transition-transform duration-300 group-hover:translate-x-1.5"></i>
            </Link>
            <i className="ri-share-line text-xl text-white/70 cursor-pointer hover:text-white" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CakeCategories;
