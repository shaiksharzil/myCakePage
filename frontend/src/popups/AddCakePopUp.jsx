import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditImagePopUp from "./EditImagePopUp";

const AddCakePopUp = ({ setShowPopup, onCreate, prevFlavours, categoryId }) => {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [minQty, setMinQty] = useState("");
  const [extraPrice, setExtraPrice] = useState("");
  const [flavours, setFlavours] = useState([]);
  const [selectedFlavours, setSelectedFlavours] = useState(prevFlavours);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cakeName, setCakeName] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [rawImageSrc, setRawImageSrc] = useState(null);
  const navigate = useNavigate();
  const Url = import.meta.env.VITE_URL;
  useEffect(() => {
    const fetchFlavours = async () => {
      try {
        const res = await axios.get(`${Url}/api/flavours/me`, {
          withCredentials: true,
        });
        setFlavours(res.data);
        if (res.data.length === 0) {
          toast.error("Please add flavours before adding a cake.");
          navigate("/flavours");
        }
      } catch (err) {
        toast.error("Failed to load flavours");
      }
    };
    fetchFlavours();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    e.target.value = null;
    if (file && file.size < 1024 * 1024) {
      const objectUrl = URL.createObjectURL(file);
      setRawImageSrc(objectUrl); // show editor
      setShowEditPopup(true);
    } else {
      toast.error("File must be under 1MB");
    }
  };
const handleSaveEditedImage = (blob) => {
  const croppedFile = new File([blob], "cropped-image.jpg", {
    type: "image/jpeg",
  });
  setImageFile(croppedFile);
  setPreview(URL.createObjectURL(croppedFile));
  setShowEditPopup(false);
};

  const handleFlavourToggle = (flavourId) => {
    setSelectedFlavours((prev) =>
      prev.includes(flavourId)
        ? prev.filter((id) => id !== flavourId)
        : [...prev, flavourId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile || !minQty) {
      toast.error("Image and Minimum Order Quantity are required.");
      return;
    }
    if (minQty <= 0) {
      toast.error("Minimum order quantity must be greater than 0 kg.");
      return;
    }
    if (extraPrice < 0) {
      toast.error("Extra price must be greater than ₹0/-.");
      return;
    }
    if (selectedFlavours.length === 0) {
      toast.error("Please select at least one flavour.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("cakeCategoryId", categoryId);
    formData.append("image", imageFile);
    formData.append("cakeName", cakeName);
    formData.append("minQty", minQty);
    formData.append("extraPrice", extraPrice);
    formData.append("flavours", JSON.stringify(selectedFlavours));

    onCreate(formData).finally(() => setIsSubmitting(false));
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-filter backdrop-blur-2xl bg-opacity-70 flex items-center justify-center">
      {showEditPopup && rawImageSrc && (
        <EditImagePopUp
          imageSrc={rawImageSrc}
          onCancel={() => setShowEditPopup(false)}
          onSave={handleSaveEditedImage}
        />
      )}

      <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 w-96 max-w-full text-white relative shadow-2xl max-md:w-86 max-h-[90vh] custom-scroll overflow-y-auto">
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-2 right-3 text-white/70 hover:text-white text-xl"
        >
          <i className="ri-close-line cursor-pointer"></i>
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Add New Cake</h2>

        <div className="flex flex-col gap-3">
          <label className="text-sm text-white/70">
            Cake Image <i className="ri-upload-cloud-line"></i> (max 1MB): *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-white/10 border border-white/20 p-2 outline-none rounded-xl text-sm text-white"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-full h-40 object-cover rounded-xl border border-white/20"
            />
          )}

          <label className="text-sm text-white/70">Cake Name (optional)</label>
          <input
            type="text"
            value={cakeName}
            onChange={(e) => setCakeName(e.target.value)}
            className="bg-white/10 border border-white/20 p-2 outline-none rounded-xl text-sm text-white"
          />

          <label className="text-sm text-white/70">
            Minimum Order Quantity *
          </label>
          <input
            type="number"
            value={minQty}
            onChange={(e) => setMinQty(e.target.value)}
            className="bg-white/10 border border-white/20 p-2 outline-none rounded-xl text-sm text-white"
            required
          />

          <label className="text-sm text-white/70">
            Extra Price per kg (₹) (optional)
          </label>
          <input
            type="number"
            value={extraPrice}
            onChange={(e) => setExtraPrice(e.target.value)}
            className="bg-white/10 border border-white/20 p-2 outline-none rounded-xl text-sm text-white"
          />

          {flavours.length > 0 && (
            <div>
              <label className="text-sm text-white/70">Select Flavours</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {flavours.map((flavour) => (
                  <div
                    key={flavour._id}
                    className="flex items-center gap-2 bg-white/10 px-2 py-1 rounded-xl cursor-pointer"
                    onClick={() => handleFlavourToggle(flavour._id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFlavours.includes(flavour._id)}
                      onChange={() => handleFlavourToggle(flavour._id)}
                      onClick={(e) => e.stopPropagation()}
                      className="accent-black cursor-pointer"
                    />
                    <span className="text-sm">
                      {flavour.name} - ₹{flavour.pricePerKg}/-
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`mt-4 bg-white/20 hover:bg-white/30 text-white cursor-pointer font-semibold py-2 rounded-xl transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Adding cake..." : "Add new cake"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCakePopUp;
