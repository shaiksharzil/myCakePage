import React, { useState } from "react";

const CakeFlavourCard = ({ flavour, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const toggleMenu = () => setShowActions(!showActions);

  return (
    <div className="w-full flex flex-col items-center mt-3 px-3">
      <div className="w-130 max-md:w-86 bg-white/10 hover:bg-white/20 z-0 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md text-white px-4 py-3 flex flex-col gap-2 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <i className="ri-cake-2-fill text-3xl" />
            <div className="flex flex-col">
              <span className="text-lg text-white/90 font-semibold">
                {flavour.name}
              </span>
              <span className="text-sm text-white/70">
                ₹{flavour.pricePerKg} per kg
              </span>
            </div>
          </div>
          <i
            className="ri-more-2-fill text-xl text-white/70 cursor-pointer hover:text-white"
            onClick={toggleMenu}
          ></i>
        </div>

        {showActions && (
          <div className="flex justify-end gap-4 mt-2 text-sm animate-fade-in">
            <button
              onClick={() => onEdit(flavour)}
              className="flex items-center cursor-pointer gap-1 text-white/70 hover:text-white transition"
            >
              <i className="ri-edit-2-line" />
              Edit
            </button>
            <button
              onClick={() => onDelete(flavour._id)}
              className="flex items-center gap-1 cursor-pointer text-red-400 hover:text-red-500 transition"
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

export default CakeFlavourCard;
