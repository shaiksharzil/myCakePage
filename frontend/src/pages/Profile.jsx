import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PublicProfileCard from "../components/PublicProfileCard";
import CakeCategory from "../components/CakesCategory";
import toast from "react-hot-toast";
import SkeletonPublicProfileCard from "../loaders/SkeletonPublicProfileCard";
import SkeletonPublicCakeCategory from "../loaders/SkeletonPublicCakeCategory";
import NoCakeCategoriesPublic from "../components/NoCakeCategoriesPublic";
import { Helmet } from "react-helmet";

const Profile = () => {
  const { customUrl } = useParams();
  const [profile, setProfile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const Url = import.meta.env.VITE_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${Url}/api/public/${customUrl}?countView=true`)
      .then((res) => {
        setProfile(res.data.profile);
        setCategories(res.data.categories);
      })
      .catch((err) => {
        toast.error("Failed to load profile");
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
          <Helmet>
            <title>
              {profile?.bakeryName
                ? `${profile.bakeryName} | MyCakePage`
                : "MyCakePage - Order Cakes Online"}
            </title>
            <meta
              name="description"
              content={
                profile?.bakeryName
                  ? `Order cakes online from ${profile.bakeryName} in Mangalagiri. Delicious cakes, easy ordering, and quick delivery.`
                  : "Order birthday cakes, wedding cakes, and more from your local bakeries via MyCakePage. Fast delivery and full customization."
              }
            />
            <meta
              name="keywords"
              content="ravi sweets, ravi sweets and bakery, ravi bakery, ravi cakes, ravi cake shop, ravi cakes mangalagiri, ravi sweets mangalagiri, ravi bakery mangalagiri, birthday cakes ravi bakery, custom cakes ravi, best bakery in mangalagiri, top cake shop mangalagiri, eggless cakes mangalagiri, chocolate cake ravi bakery, mangalagiri cakes, mangalagiri bakeries, online cake order mangalagiri, cake delivery mangalagiri, wedding cakes mangalagiri, kids cakes mangalagiri, cool cakes mangalagiri, affordable cakes mangalagiri, local bakery mangalagiri,mycakepage, my cake page, cakepage, cake page online, cake profile page, mycakepage.com"
            />
            <link
              rel="canonical"
              href={`https://mycakepage.vercel.app/${customUrl}`}
            />
          </Helmet>
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
