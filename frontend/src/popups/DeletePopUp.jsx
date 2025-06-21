import React from "react";

const DeletePopUp = ({ setShowPopup, onConfirm, flavourName,value }) => {
  return (
    <div className="w-screen h-full fixed top-0 left-0 flex items-center justify-center z-20 backdrop-filter backdrop-blur-md overflow-y-hidden">
      <div className="w-96 border border-white/10 rounded-md shadow-lg bg-white/5 backdrop-filter backdrop-blur-md max-md:w-86 p-4">
        <h3 className="text-center text-2xl font-semibold text-white/70 mt-2">
          Delete {value}
        </h3>
        <p className="text-white/70 text-sm mt-4 text-center">
          Are you sure you want to delete{" "}
          <span className="text-white font-semibold">{flavourName}</span>?
        </p>
        <div className="flex items-center justify-end my-4 gap-4 mr-2 mt-6 text-white">
          <button
            className="bg-white/10 border border-white/10 py-1 px-3 rounded-md cursor-pointer"
            onClick={() => setShowPopup(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500/70 border border-red-400 py-1 px-3 rounded-md cursor-pointer hover:bg-red-600"
            onClick={() => {
              onConfirm(); // triggers delete
              setShowPopup(false);
            }}
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
