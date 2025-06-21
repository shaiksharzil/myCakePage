import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddCategoriesPopUp = ({ setShowPopup, onCategoryAdded }) => {
  const [category, setCategory] = useState("");
  const Url = import.meta.env.VITE_URL;

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!category.trim()) return;

    toast
      .promise(
        axios.post(
          `${Url}/api/categories`,
          { name: category },
          { withCredentials: true }
        ),
        {
          loading: `Creating ${category} category...`,
          success: `${category} Category added successfully!`,
          error: `Failed to add ${category} category.`,
        }
      )
      .then((res) => {
        onCategoryAdded(res.data); // Update parent state without reload
        setShowPopup(false);
      })
      .catch((err) => {
        // console.error("Error creating category:", err);
      });
  };

  return (
    <div className="w-screen h-full fixed top-0 flex items-center justify-center z-20 backdrop-filter backdrop-blur-md overflow-y-hidden">
      <div className="w-96 border border-white/10 rounded-md shadow-lg bg-white/5 backdrop-filter backdrop-blur-md max-md:w-86">
        <h3 className="text-center text-2xl font-semibold text-white/70 mt-2">
          Add New Category
        </h3>
        <input
          type="text"
          placeholder="Enter category name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-white/10 pl-2 h-10 w-86 mx-5 mt-2 outline-none rounded text-white max-md:w-76 placeholder-white"
        />
        <div className="flex items-center justify-end my-3 gap-4 mr-5 text-white">
          <button
            className="bg-white/10 border border-white/10 py-1 px-2 rounded-md cursor-pointer"
            onClick={() => setShowPopup(false)}
          >
            Cancel
          </button>
          <button
            className="bg-white/10 border border-white/10 py-1 px-2 rounded-md cursor-pointer"
            onClick={handleCreate}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoriesPopUp;
