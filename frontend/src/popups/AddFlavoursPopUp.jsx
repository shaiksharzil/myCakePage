import React, { useState } from "react";
import Tilt from "react-parallax-tilt";

const AddFlavoursPopUp = ({ setShowPopup, onCreate }) => {
  const [flavour, setFlavour] = useState("");
  const [price, setPrice] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    onCreate({ name: flavour, pricePerKg: parseFloat(price) });
    setFlavour("");
    setPrice("");
    setShowPopup(false);
  };
  return (
    <div className="w-screen h-full fixed top-0 left-0 flex items-center justify-center z-20 backdrop-filter backdrop-blur-md overflow-y-hidden">
      <div
        className="rounded-xl"
      >
        <form
          onSubmit={handleCreate}
          className="w-96 border border-white/10 rounded-md shadow-lg bg-white/5 backdrop-filter backdrop-blur-md max-md:w-86"
        >
          <h3 className="text-center text-2xl font-semibold text-white/70 mt-2">
            Add Flavour
          </h3>

          <input
            type="text"
            placeholder="Enter Flavour Name"
            value={flavour}
            onChange={(e) => setFlavour(e.target.value)}
            required
            className="border border-white/10 pl-2 h-10 w-86 mx-5 mt-3 outline-none rounded text-white placeholder-white max-md:w-76"
          />

          <input
            type="number"
            placeholder="Price per kg (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border border-white/10 pl-2 h-10 w-86 mx-5 mt-3 outline-none rounded text-white placeholder-white max-md:w-76"
          />

          <div className="flex items-center justify-end my-4 gap-4 mr-5 text-white">
            <button
              className="bg-white/10 border border-white/10 py-1 px-3 rounded-md cursor-pointer"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-white/10 border border-white/10 py-1 px-3 rounded-md cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlavoursPopUp;
