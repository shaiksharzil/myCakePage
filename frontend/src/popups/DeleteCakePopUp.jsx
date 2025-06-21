import React from "react";

const DeleteCakePopUp = ({ cake, setShowPopup, onDelete }) => {
  if (!cake) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-filter backdrop-blur-2xl bg-opacity-70 flex items-center justify-center">
      <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 w-96 max-w-full text-white relative shadow-2xl max-md:w-86">
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-2 right-3 text-white/70 hover:text-white text-xl"
        >
          <i className="ri-close-line"></i>
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Delete Cake?</h2>

        <div className="flex flex-col gap-3">
          <p className="text-sm text-white/70 text-center">
            Are you sure you want to delete this cake? This action is
            <span className="text-red-400 font-semibold"> permanent</span>.
          </p>

          {cake.imageUrl && (
            <img
              src={cake.imageUrl}
              alt="Cake preview"
              className="mt-3 w-full h-40 object-cover rounded-xl border border-white/20"
            />
          )}

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 cursor-pointer rounded-xl text-white transition"
            >
              Cancel
            </button>
            <button
              onClick={() => onDelete(cake._id, cake.image?.public_id)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl cursor-pointer text-white font-semibold transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCakePopUp;
