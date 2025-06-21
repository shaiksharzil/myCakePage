import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const EditCategoryPopUp = ({ category, onClose, onUpdated }) => {
  const [name, setName] = useState(category.name);
  const Url = import.meta.env.VITE_URL;

  const handleUpdate = async () => {
    if (!name.trim()) return;

    try {
      const res = await toast.promise(
        axios.put(
          `${Url}/api/categories/${category._id}`,
          { name },
          { withCredentials: true }
        ),
        {
          loading: "Updating category...",
          success: "Category updated successfully!",
          error: "Failed to update category.",
        }
      );
      onUpdated(res.data.updatedCategory); // Refresh UI
      onClose(); // Close popup
    } catch (error) {
      // console.error("Failed to update category:", error);
    }
  };

  return (
    <div className="w-screen h-full fixed top-0 flex items-center justify-center z-20 backdrop-filter backdrop-blur-md overflow-y-hidden">
      <Toaster /> {/* Only needed if not already globally in App.jsx */}
      <div className="w-96 border border-white/10 rounded-md shadow-lg bg-white/5 backdrop-filter backdrop-blur-md max-md:w-86">
        <h3 className="text-center text-2xl font-semibold text-white/70 mt-2">
          Edit Category
        </h3>
        <input
          type="text"
          placeholder="Enter New Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-white/10 pl-2 h-10 w-86 mx-5 mt-2 outline-none rounded text-white max-md:w-76 placeholder-white"
        />
        <div className="flex items-center justify-end my-3 gap-4 mr-5 text-white">
          <button
            className="bg-white/10 border border-white/10 py-1 px-2 rounded-md cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-white/10 border border-white/10 py-1 px-2 rounded-md cursor-pointer"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryPopUp;
