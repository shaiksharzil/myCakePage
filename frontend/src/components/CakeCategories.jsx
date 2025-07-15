import React, { useState } from "react";
import { Link } from "react-router-dom";

const CakeCategories = ({ value, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const toggleMenu = () => setShowActions(!showActions);

  return (
    <div className="w-full flex flex-col items-center mt-3 px-3">
      <div className="w-130 max-md:w-86 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md text-white px-4 py-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Link
            to={`/cakes/${value._id}`}
            className="flex items-center group gap-2 w-11/12 cursor-pointer"
          >
            <i className="ri-cake-2-fill text-xl" />
            <span className="text-lg font-semibold">{value.name}</span>
            <i class="ri-arrow-right-double-line mt-1 text-xl transform transition-transform duration-300 group-hover:translate-x-1.5"></i>
          </Link>
          <i
            className="ri-more-2-fill ml-2 text-xl text-white/70 cursor-pointer hover:text-white"
            onClick={toggleMenu}
          ></i>
        </div>

        {showActions && (
          <div className="flex justify-end gap-4 mt-2 text-sm animate-fade-in">
            <button
              onClick={() => onEdit(value)}
              className="flex items-center cursor-pointer gap-1 text-white/70 hover:text-white transition"
            >
              <i className="ri-edit-2-line" />
              Edit
            </button>
            <button
              onClick={() => onDelete(value)}
              className="flex items-center gap-1 cursor-pointer text-red-400 hover:text-red-300 transition"
            >
              <i className="ri-delete-bin-line" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CakeCategories;
