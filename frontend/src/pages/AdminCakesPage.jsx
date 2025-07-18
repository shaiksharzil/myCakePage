import React, { useState, useEffect} from "react";
import AdminCakeCard from "../components/AdminCakeCard";
import axios from "axios";
import SkeletonAdminCakeCard from "../loaders/SkeletonAdminCakeCard";
import AddButton from "../components/AddButton";
import AddCakePopUp from "../popups/AddCakePopUp";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import EditCakePopUp from "../popups/EditCakePopUp";
import DeleteCakePopUp from "../popups/DeleteCakePopUp";
import NoCakes from '../components/NoCakes';
import NotFound from "./NotFound";



const AdminCakesPage = () => {
  const { id } = useParams();
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [editCake, setEditCake] = useState(null);
  const [deleteCake, setDeleteCake] = useState(null);
  const [notfound, setNotfound] = useState("");
  const [result, setResult] = useState();
  const [categoryName, setCategoryName] = useState("");
  const [prevFlavours, setPrevFlavours] = useState([]);

  const Url = import.meta.env.VITE_URL;
  const fetchCakes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${Url}/api/cakes/${id}`, {
        withCredentials: true,
      });
      const sorted = res.data.cakes.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCakes(sorted);
      setResult(res.data.cakes.length);
      setCategoryName(res.data.categoryName.name);
    } catch (err) {
      console.error(
        "Failed to fetch cakes:",
        err.response?.data || err.message
      );
      setNotfound(err.status);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateCake = async (formData) => {
    try {
      await toast.promise(
        axios.post(`${Url}/api/cakes`, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          loading: "Adding cake...",
          success: "Cake added successfully!",
          error: "Failed to add cake.",
        },
        {
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        }
      );
      setShowPopup(false);
      await fetchCakes();
    } catch (err) {
      // console.error("Create Cake Error:", err?.response?.data || err.message);
    }
  };
  

  const handleUpdateCake = async (cakeId, formData) => {
    try {
      await toast.promise(
        axios.put(`${Url}/api/cakes/${cakeId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }),
        {
          loading: "Updating cake...",
          success: "Cake updated successfully!",
          error: "Failed to update cake.",
        },
        {
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        }
      );
      setEditCake(null);
      fetchCakes();
    } catch (err) {
      // console.error("Update error:", err?.response?.data || err.message);
    }
  };
  
  
  const handleDeleteCake = async (cakeId, publicId) => {
    try {
      await toast.promise(
        axios.delete(`${Url}/api/cakes/${cakeId}`, {
          data: { publicId },
          withCredentials: true,
        }),
        {
          loading: "Deleting cake...",
          success: "Cake deleted successfully!",
          error: "Failed to delete cake.",
        },
        {
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        }
      );
      setDeleteCake(null);
      fetchCakes();
    } catch (err) {
      console.error("Delete error:", err?.response?.data || err.message);
    }
  };
  
 useEffect(() => {
   fetchCakes();
 }, [id]);
  if (notfound == 500) return <NotFound />;
  return (
    <div className="w-screen px-10 min-h-screen bg-black overflow-x-hidden max-md:px-2">
      {loading ? (
        <div className="columns-1 columns-sm-custom-2 md:columns-3 lg:columns-4 gap-4">
          {Array.from({ length: 20 }).map((_, idx) => (
            <SkeletonAdminCakeCard key={idx} />
          ))}
        </div>
      ) : cakes.length === 0 ? (
        <NoCakes />
      ) : (
        <div>
          <div className="flex justify-center items-center my-1">
            <h3 className="text-xl text-center font-mono bg-white/10 px-2 py-1 rounded-md w-fit tracking-wide text-white">
              {categoryName} — {result} cakes
            </h3>
          </div>
          <div className="columns-1 columns-sm-custom-2 md:columns-3 lg:columns-4 gap-4">
            {cakes.map((cake, idx) => (
              <AdminCakeCard
                key={idx}
                src={cake.imageUrl}
                minQty={cake.minOrderQty}
                extraPrice={cake.extraPrice}
                cake={cake}
                onEdit={(cake) => setEditCake(cake)}
                onDelete={() => setDeleteCake(cake)}
              />
            ))}
          </div>
        </div>
      )}
      {showPopup && (
        <AddCakePopUp
          setShowPopup={setShowPopup}
          onCreate={handleCreateCake}
          prevFlavours={prevFlavours}
          categoryId={id}
        />
      )}
      {editCake && (
        <EditCakePopUp
          cake={editCake}
          setShowPopup={() => setEditCake(null)}
          onUpdate={(formData) => handleUpdateCake(editCake._id, formData)}
        />
      )}
      {deleteCake && (
        <DeleteCakePopUp
          cake={deleteCake}
          setShowPopup={() => setDeleteCake(null)}
          onDelete={handleDeleteCake}
        />
      )}
      {loading ? (
        <></>
      ) : (
        <AddButton
          onClick={() => {
            if (cakes.length > 0)
              setPrevFlavours(cakes[0].flavours.map((x) => x._id));
            setShowPopup(true);
          }}
        />
      )}
    </div>
  );
};

export default AdminCakesPage;
