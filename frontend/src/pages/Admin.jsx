import React, { useState, useEffect } from "react";
import CakeCategories from "../components/CakeCategories";
import AddCategoriesPopUp from "../popups/AddCategoriesPopUp";
import EditCategoryPopUp from "../popups/EditCategoryPopUp";
import ProfileCard from "../components/ProfileCard";
import AddButton from "../components/AddButton";
import { Link } from "react-router-dom";
import axios from "axios";
import DeletePopUp from "../popups/DeletePopUp";
import QrCodePopUp from "../popups/QrCodePopUp";
import toast from "react-hot-toast";
import CakeCategorySkeletonLoader from "../loaders/CakeCategorySkeletonLoader";
import NoCakeCategories from "../components/NoCakeCategories";
import { useProfile } from "../context/ProfileContext";

const Admin = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [showQrPopup, setShowQrPopup] = useState(false);
  const [customUrl2, setCustomUrl2] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
    const { customUrl } = useProfile();
  
  const Url = import.meta.env.VITE_URL;

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${Url}/api/categories`, {
        withCredentials: true,
      });
      setCategories(res.data);
    } catch (err) {
      // console.error("Error fetching categories", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = (updatedCat) => {
    setCategories((prev) =>
      prev.map((cat) => (cat._id === updatedCat._id ? updatedCat : cat))
    );
    setEditingCategory(null); // close popup after update
  };

  const handleDeleteCategory = async (catId) => {
    try {
      await toast.promise(
        axios.delete(`${Url}/api/categories/${catId}`, {
          withCredentials: true,
        }),
        {
          loading: `Deleting category...`,
          success: `Category deleted successfully!`,
          error: "Failed to delete category.",
        }
      );
      setCategories((prev) => prev.filter((cat) => cat._id !== catId));
    } catch (err) {
      // console.error("Failed to delete category:", err);
    }
  };

  const handleNewCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-black">
      {showPopup && (
        <AddCategoriesPopUp
          setShowPopup={setShowPopup}
          onCategoryAdded={handleNewCategory}
        />
      )}
      {editingCategory && (
        <EditCategoryPopUp
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onUpdated={handleUpdateCategory}
        />
      )}
      {deletingCategory && (
        <DeletePopUp
          flavourName={deletingCategory.name}
          value={"category"}
          setShowPopup={() => setDeletingCategory(null)}
          onConfirm={() => handleDeleteCategory(deletingCategory._id)}
        />
      )}
      {showQrPopup && (
        <QrCodePopUp
          url={`https://mycakepage.vercel.app/${customUrl}`}
          setShowPopup={setShowQrPopup}
          profile={profileData}
        />
      )}

      <ProfileCard
        setShowQrPopup={setShowQrPopup}
        setCustomUrl={setCustomUrl2}
        setProfileData={setProfileData}
      />

      {loading ? (
        Array.from({ length: 10 }).map((_, i) => (
          <CakeCategorySkeletonLoader key={i} />
        ))
      ) : categories.length === 0 ? (
        <NoCakeCategories />
      ) : (
        categories.map((cat) => (
          <CakeCategories
            key={cat._id}
            value={cat}
            onEdit={(cat) => setEditingCategory(cat)}
            onDelete={(cat) => setDeletingCategory(cat)}
          />
        ))
      )}

      <AddButton onClick={() => setShowPopup(true)} />
      <div className="w-screen flex flex-col gap-3 justify-center items-center mt-3">
        <div className="w-130 flex items-center px-2 max-md:w-86">
          <h3 className="text-white/70 font-bold text-xl">
            Quick Actions:
          </h3>
        </div>
        <Link
          to={"/flavours"}
          className="w-130 py-3 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer flex text-white items-center px-2 max-md:w-86 border border-white/10 shadow-lg backdrop-filter backdrop-blur-md"
        >
          <div className="font-semibold text-lg  cursor-pointer">
            <i class="ri-edit-2-line font-extralight text-xl mx-2"></i>
            Manage Cake Flavours
          </div>
        </Link>
        <Link
          to={`/${customUrl}`}
          className="w-130 py-3 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer flex text-white items-center px-2 max-md:w-86 border border-white/10 shadow-lg backdrop-filter backdrop-blur-md"
        >
          <div className="font-semibold text-lg  cursor-pointer">
            <i class="ri-computer-line text-xl font-extralight mx-2"></i>
            Visit Your Cake Page
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
