import React, { useState } from "react";
import toast from "react-hot-toast";

const FilterPopup = ({ flavours, onClose, onApply, qty, initialFilter }) => {
  const [selectedFlavours, setSelectedFlavours] = useState(initialFilter?.selectedFlavours || []);
  const [sortBy, setSortBy] = useState(initialFilter?.sortBy || "newestFirst");

  const [minQty, setMinQty] = useState(initialFilter?.minQty ?? qty[0]);
  const [maxQty, setMaxQty] = useState(
    initialFilter?.maxQty ?? qty[qty.length - 1]
  );

  const [minIndex, setMinIndex] = useState(qty.findIndex((q) => q === minQty));
  const [maxIndex, setMaxIndex] = useState(qty.findIndex((q) => q === maxQty));

  const handleFlavourToggle = (id) => {
    setSelectedFlavours((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };
  const resetFilter = () => {
    setSelectedFlavours([]);
    setMinQty(qty[0]);
    setSortBy("newestFirst");
    setMaxQty(qty[qty.length - 1]);
    setMinIndex(0);
    setMaxIndex(qty.length - 1);
    onApply({
      minQty: qty[0],
      maxQty: qty[qty.length - 1],
      selectedFlavours:[],
      sortBy:"newestFirst"
    },true);
  }
  const handleApply = () => {
    onApply({
      minQty: qty[minIndex],
      maxQty: qty[maxIndex],
      selectedFlavours,
      sortBy,
    },false);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-filter backdrop-blur-2xl bg-black/40 flex items-center justify-center">
      <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 w-96 max-w-full text-white relative shadow-2xl max-md:w-86 max-h-[90vh] custom-scroll overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white/70 hover:text-white text-xl"
        >
          <i className="ri-close-line cursor-pointer"></i>
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Filter Cakes</h2>
        <button
          onClick={resetFilter}
          className="cursor-pointer text-white bg-red-400 hover:bg-red-500 font-light text-sm absolute right-4 top-13 px-1.5 rounded-md py-1"
        >
          <i class="ri-reset-right-fill font-extralight"></i>{" "}
          Reset
        </button>
        <div className="flex flex-col gap-4">
          {/* Dual Qty Range Slider */}
          <div>
            <label className="text-sm text-white/70">Quantity Range (kg)</label>
            <div className="mt-4 flex flex-col gap-2">
              {/* Slider track with thumbs */}
              <div className="relative h-1 bg-white/20 rounded-full">
                <div
                  className="absolute h-1 bg-white rounded-full"
                  style={{
                    left: `${(minIndex / (qty.length - 1)) * 100}%`,
                    width: `${
                      ((maxIndex - minIndex) / (qty.length - 1)) * 100
                    }%`,
                  }}
                />
                {/* Left thumb */}
                <input
                  type="range"
                  min={0}
                  max={qty.length - 1}
                  step={1}
                  value={minIndex}
                  onChange={(e) => {
                    const newIndex = Math.min(
                      Number(e.target.value),
                      maxIndex - 1
                    );
                    setMinIndex(newIndex);
                    setMinQty(qty[newIndex]);
                  }}
                  className="absolute w-full cursor-pointer appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                />

                {/* Right thumb */}
                <input
                  type="range"
                  min={0}
                  max={qty.length - 1}
                  step={1}
                  value={maxIndex}
                  onChange={(e) => {
                    const newIndex = Math.max(
                      Number(e.target.value),
                      minIndex + 1
                    );
                    setMaxIndex(newIndex);
                    setMaxQty(qty[newIndex]);
                  }}
                  className="absolute w-full cursor-pointer appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                />
              </div>

              <div className="flex justify-between text-xs text-white/70">
                <span>{minQty} kg</span>
                <span>{maxQty} kg</span>
              </div>
            </div>
          </div>

          {/* Flavours Checkboxes */}
          {flavours.length > 0 && (
            <div>
              <label className="text-sm text-white/70">Flavours</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {flavours.map((flavour) => (
                  <div
                    key={flavour._id}
                    className="flex items-center cursor-pointer gap-2 bg-white/10 px-2 py-1 rounded-xl cursor-pointer"
                    onClick={() => handleFlavourToggle(flavour._id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFlavours.includes(flavour._id)}
                      onChange={() => handleFlavourToggle(flavour._id)}
                      onClick={(e) => e.stopPropagation()}
                      className="accent-black"
                    />
                    <span className="text-sm">{flavour.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sort By */}
          <div>
            <label className="text-sm text-white/70">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#464646] cursor-pointer border border-white/20 p-2 rounded-xl text-sm text-white w-full mt-1 outline-none"
            >
              <option value="newestFirst">Newest First</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="qtyLowHigh">Quantity: Low to High</option>
              <option value="qtyHighLow">Quantity: High to Low</option>
            </select>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            className=" bg-white/20 hover:bg-white/30 cursor-pointer text-white font-semibold py-2 rounded-xl transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
