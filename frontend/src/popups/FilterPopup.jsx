import React from "react";

const FilterPopup = ({
  flavours,
  selectedFilters,
  setSelectedFilters,
  onApply,
  onClose,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white/10 border border-white/10 rounded-2xl p-6 w-[90%] max-w-md backdrop-blur-xl shadow-lg relative">
        <h2 className="text-white text-xl font-semibold mb-4">Filter Cakes</h2>

        <div className="mb-3">
          <label className="text-white/80">Flavour</label>
          <select
            name="flavour"
            onChange={handleChange}
            value={selectedFilters.flavour}
            className="block w-full mt-1 px-3 py-2 rounded-md bg-white/10 text-white border border-white/10 focus:outline-none"
          >
            <option value="">All</option>
            {flavours.map((flavour) => (
              <option key={flavour._id} value={flavour.name}>
                {flavour.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="text-white/80">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            placeholder="Enter max price"
            value={selectedFilters.maxPrice}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 rounded-md bg-white/10 text-white border border-white/10 focus:outline-none"
          />
        </div>

        <div className="mb-3">
          <label className="text-white/80">Min Order Qty</label>
          <input
            type="number"
            name="minQty"
            placeholder="Enter min order qty"
            value={selectedFilters.minQty}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 rounded-md bg-white/10 text-white border border-white/10 focus:outline-none"
          />
        </div>

        <div className="flex justify-between gap-2 mt-4">
          <button
            onClick={onApply}
            className="w-full py-2 bg-green-500/70 hover:bg-green-500 text-white font-semibold rounded-lg"
          >
            Apply
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 bg-red-500/70 hover:bg-red-500 text-white font-semibold rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
