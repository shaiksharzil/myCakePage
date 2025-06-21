import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PublicProfileCard from "../components/PublicProfileCard";
import CakeCategory from "../components/CakesCategory";
import toast from "react-hot-toast";
import SkeletonPublicProfileCard from "../loaders/SkeletonPublicProfileCard";
import SkeletonPublicCakeCategory from "../loaders/SkeletonPublicCakeCategory";
import NoCakeCategoriesPublic from "../components/NoCakeCategoriesPublic";

const Profile = () => {
  const { customUrl } = useParams();
  const [profile, setProfile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const Url = import.meta.env.VITE_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${Url}/api/public/${customUrl}`)
      .then((res) => {
        setProfile(res.data.profile);
        setCategories(res.data.categories);
      })
      .catch((err) => {
        toast.error("Failed to load profile", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      })
      .finally(() => setLoading(false));
  }, [customUrl]);

  return (
    <div className="w-screen bg-black min-h-screen">
      {loading ? (
        <>
          <SkeletonPublicProfileCard />
          {Array.from({ length: 2 }).map((_, idx) => (
            <SkeletonPublicCakeCategory key={idx} />
          ))}
        </>
      ) : (
        <>
          <PublicProfileCard profile={profile} />
          {categories.length === 0 ? (
            <NoCakeCategoriesPublic />
          ) : (
            <CakeCategory
              categories={categories}
              bakeryName={profile.bakeryName}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
