import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import SkeletonEditProfileForm from "../loaders/SkeletonEditProfileForm";

const EditProfile = () => {
  const navigate = useNavigate();

  const [removeImage, setRemoveImage] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    bakeryName: "",
    address: "",
    mobile: "",
  });
  const Url = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${Url}/api/profile/me`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setFormData({
            bakeryName: data.profile.bakeryName || "",
            address: data.profile.address || "",
            mobile: data.profile.mobile || "",
          });
          if (data.profile.imageUrl) {
            setImagePreview(data.profile.imageUrl);
          }
        } else {
          toast.error("Failed to load profile");
        }
      } catch (err) {
        toast.error("Error loading profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const handleLocationClick = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const address = data.display_name;

          setFormData((prev) => ({ ...prev, address }));
          toast.success("Address auto-filled from location!");
        } catch (err) {
          toast.error("Failed to fetch address from location.");
        }
      },
      (error) => {
        toast.error("Permission denied or error getting location.");
      }
    );
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    e.target.value = null;
    if (file && file.size < 1024 * 1024) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setRemoveImage(false); // prevent deleting if uploading new
    } else {
      toast.error("File must be under 1MB", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  };

  const handleCancelImage = () => {
    setImage(null);
    setImagePreview(null);
    setRemoveImage(true); // Mark image for removal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelForm = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.mobile)) {
      toast.error("Enter a valid 10-digit WhatsApp number", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
      return;
    }
    if (!formData.bakeryName.trim()) {
      toast.error("Please enter the Bakery name");
      return;
    }
    if (!formData.address.trim()) {
      toast.error("Please enter the Address");
      return;
    }
    const form = new FormData();
    form.append("bakeryName", formData.bakeryName);
    form.append("address", formData.address);
    form.append("mobile", formData.mobile);
    form.append("removeImage", removeImage);
    if (image) form.append("image", image);

    setIsSubmitting(true);
    try {
      await toast.promise(
        fetch(`${Url}/api/profile/update`, {
          method: "PUT",
          credentials: "include",
          body: form,
        }).then(async (res) => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Update failed");
          return data;
        }),
        {
          loading: "Updating profile...",
          success: "Profile updated!",
          error: (err) => err.message || "Update failed",
        },
        {
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        }
      );
      navigate("/account");
    } catch (err) {
      // Error already handled by toast.promise
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <SkeletonEditProfileForm />;

  return (
    <div className="h-svh w-screen flex justify-center items-center bg-black text-white">
      <div className="rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="p-3 bg-white/10 border border-white/10 shadow-lg backdrop-filter backdrop-blur-md rounded-xl w-86"
        >
          <h2 className="font-bold text-2xl text-center text-white/80">
            Edit Your Profile
          </h2>
          <p className="text-white/70 pb-1">Update your bakery details</p>

          {/* Image Upload */}
          <div>
            <h3 className="text-white/70">
              Profile Image <i class="ri-upload-cloud-line"></i> (max 1MB):
            </h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="bg-white/10 border border-white/10 cursor-pointer text-white rounded-md pl-2 h-8 w-full mb-2"
            />
            {imagePreview && (
              <div className="relative w-32 h-32 mb-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleCancelImage}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-sm"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Bakery Name */}
          <div>
            <h3 className="text-white/70">Bakery Name:</h3>
            <input
              type="text"
              name="bakeryName"
              value={formData.bakeryName}
              onChange={handleChange}
              required
              className="bg-white/10 border border-white/10 outline-none text-white rounded-md pl-2 h-8 w-full mb-2"
              placeholder="e.g., Sweet Treats"
            />
          </div>

          {/* Address */}
          <div>
            <h3 className="text-white/70">Address:</h3>
            <div className="relative">
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="bg-white/10 border border-white/10 resize-none outline-none text-white rounded-md pl-2 w-full mb-2"
                placeholder="e.g., 123 Cake Street, Chennai"
              ></textarea>
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <i
                  onClick={handleLocationClick}
                  className="ri-map-pin-line text-white/70 text-xl cursor-pointer"
                ></i>
              </div>
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <h3 className="text-white/70">WhatsApp Number:</h3>
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="bg-white/10 border border-white/10 outline-none text-white rounded-md pl-2 h-8 w-full mb-3"
              placeholder="e.g., 9876543210"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancelForm}
              className="bg-white/10 hover:bg-white/20 w-full rounded-md h-8 font-medium text-white/70 hover:text-white/90 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-white/20"
              } bg-white/10 w-full rounded-md h-8 cursor-pointer font-medium text-white/70 hover:text-white/90`}
            >
              {isSubmitting ? "Updating..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
