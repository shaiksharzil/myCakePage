import React from "react";
import { Link, useParams } from "react-router-dom";
import ShareIcon from "../icons/ShareIcon";

const CakeCategories = ({ categories, bakeryName }) => {
  const { customUrl } = useParams();
  if (!categories?.length) return null;
  const handleShare = async (categoryName, categoryId) => {
    const url = `https://mycakepage.vercel.app/${customUrl}/${categoryId}`;
    const message = `🎂 Explore "${categoryName}" from ${bakeryName} on MyCakePage!\n\nCheck out this cake collection:\n${url}\n\nPowered by MyCakePage – helping bakeries showcase and sell beautifully. 🍰`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${categoryName} – ${bakeryName} | MyCakePage`,
          text: message,
        });
      } else {
        await navigator.clipboard.writeText(message);
        alert("Share not supported on this device. Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Sharing failed", err);
    }
  };
  

  return (
    <div className="w-full flex flex-col items-center mt-6 px-3">
      {categories.map((category) => (
        <div
          key={category._id}
          className="w-130 max-md:w-86 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md text-white px-4 py-3 flex flex-col gap-2 mb-2"
        >
          <div className="flex items-center justify-between">
            <Link
              to={`/${customUrl}/${category._id}`}
              className="flex items-center group gap-2 w-11/12 cursor-pointer"
            >
              <i className="ri-cake-2-fill text-xl" />
              <span className="text-lg font-semibold">{category.name}</span>
              <i class="ri-arrow-right-double-line mt-1 text-xl transform transition-transform duration-300 group-hover:translate-x-1.5"></i>
            </Link>
            <div onClick={() => handleShare(category.name, category._id)}>
              <ShareIcon />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CakeCategories;
