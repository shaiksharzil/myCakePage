import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import AddButton from "../components/AddButton";
import CakeFlavourCard from "../components/Flavours ";
import AddFlavoursPopUp from "../popups/AddFlavoursPopUp";
import axios from "axios";
import toast from "react-hot-toast";
import DeletePopUp from "../popups/DeletePopUp";
import EditFlavoursPopUp from "../popups/EditFlavoursPopUp";
import FlavourCardSkeletonLoader from "../loaders/FlavourCardSkeletonLoader";
import NoCakeFlavours from "../components/NoCakeFlavours";
import QrCodePopUp from "../popups/QrCodePopUp";

const FlavoursPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [flavours, setFlavours] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [flavourToDelete, setFlavourToDelete] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [flavourToEdit, setFlavourToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQrPopup, setShowQrPopup] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
    const [profileData, setProfileData] = useState(null);
  const Url = import.meta.env.VITE_URL;

  const handleDeleteClick = (flavour) => {
    setFlavourToDelete(flavour);
    setShowDeletePopup(true);
  };

  const handleEditClick = (flavour) => {
    setFlavourToEdit(flavour);
    setShowEditPopup(true);
  };

  const handleUpdate = async (updatedFlavour) => {
    const { _id, name, pricePerKg } = updatedFlavour;

    const trimmedName = name.trim();
    const price = parseFloat(pricePerKg);

    if (!trimmedName || isNaN(price) || price <= 0) {
      return toast.error("Please enter a valid name and price.");
    }
    try {
      const res = await toast.promise(
        axios.put(
          `${Url}/api/flavours/${_id}`,
          { name: trimmedName, pricePerKg: price },
          { withCredentials: true }
        ),
        {
          loading: "Updating flavour...",
          success: "Flavour updated!",
          error: "Failed to update flavour.",
        },
        {
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
          },
        }
      );

      setFlavours((prev) => prev.map((f) => (f._id === _id ? res.data : f)));
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const fetchFlavours = async () => {
    try {
      const res = await axios.get(`${Url}/api/flavours/me`, {
        withCredentials: true,
      });
      setFlavours(res.data);
    } catch (err) {
      toast.error("Failed to load flavours");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (flavourData) => {
    const { name, pricePerKg } = flavourData;

    const trimmedName = name.trim();
    const price = parseFloat(pricePerKg);

    // Validation
    if (!trimmedName || isNaN(price) || price <= 0) {
      return toast.error("Please enter a valid flavour name and price.");
    }
    try {
      const res = await toast.promise(
        axios.post(
          `${Url}/api/flavours`,
          { name: trimmedName, pricePerKg: price },
          { withCredentials: true }
        ),
        {
          loading: "Adding flavour...",
          success: "Flavour added!",
          error: "Failed to add flavour.",
        },
        {
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
          },
        }
      );

      setFlavours((prev) => [res.data, ...prev]);
    } catch (err) {
      // console.error("Flavour create error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!id)
      return toast.error("Invalid flavour ID", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

    try {
      await toast.promise(
        axios.delete(`${Url}/api/flavours/${id}`, {
          withCredentials: true,
        }),
        {
          loading: "Deleting flavour...",
          success: "Flavour deleted!",
          error: "Failed to delete flavour.",
        },
        {
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
          },
        }
      );

      setFlavours((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      // console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchFlavours();
  }, []);

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-black">
      {showPopup && (
        <AddFlavoursPopUp setShowPopup={setShowPopup} onCreate={handleCreate} />
      )}
      {showEditPopup && flavourToEdit && (
        <EditFlavoursPopUp
          setShowPopup={setShowEditPopup}
          onUpdate={handleUpdate}
          flavour={flavourToEdit}
        />
      )}
      {showDeletePopup && flavourToDelete && (
        <DeletePopUp
          setShowPopup={setShowDeletePopup}
          value={"Flavour"}
          onConfirm={() => handleDelete(flavourToDelete._id)}
          flavourName={flavourToDelete.name}
        />
      )}
      <ProfileCard
        setShowQrPopup={setShowQrPopup}
        setCustomUrl={setCustomUrl}
        setProfileData={setProfileData}
      />
      {showQrPopup && (
        <QrCodePopUp
          url={`https://mycakepage.vercel.app/${customUrl}`}
          setShowPopup={setShowQrPopup}
          profile={profileData}
        />
      )}
      <AddButton onClick={() => setShowPopup(true)} />
      {loading ? (
        Array.from({ length: 8 }).map((_, i) => (
          <FlavourCardSkeletonLoader key={i} />
        ))
      ) : flavours.length === 0 ? (
        <NoCakeFlavours />
      ) : (
        flavours.map((flavour) => (
          <CakeFlavourCard
            key={flavour._id}
            flavour={flavour}
            onDelete={() => handleDeleteClick(flavour)}
            onEdit={() => handleEditClick(flavour)}
          />
        ))
      )}
    </div>
  );
};

export default FlavoursPage;
