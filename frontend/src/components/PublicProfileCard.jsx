import React from "react";
import Tilt from "react-parallax-tilt";
import CopySvg from "../icons/CopySvg";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ShareIcon from "../icons/ShareIcon";

const PublicProfileCard = ({ profile }) => {
  const { customUrl } = useParams();
  if (!profile) return null;

  const handleShare = async () => {
    const url = `https://mycakepage.vercel.app/${customUrl}`;
    const message = `🎂 Check out ${profile.bakeryName}'s cake collection on MyCakePage!\n\nExplore beautifully designed cakes for every occasion. View the full gallery here:\n${url}\n\nPowered by https://mycakepage.vercel.app – India’s easiest cake portfolio builder. 🍰`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profile.bakeryName} | MyCakePage`,
          text: message,
        });
      } else {
        await navigator.clipboard.writeText(message);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Unable to share this page.");
    }
  };

  return (
    <div className="pt-10 w-screen flex items-center justify-center">
      <Tilt
        tiltMaxAngleX={-5}
        tiltMaxAngleY={-5}
        glareEnable={true}
        glareMaxOpacity={0.1}
        transitionSpeed={1000}
        className="rounded-xl"
      >
        <div className="bg-white/10 w-130 rounded-xl max-md:w-86 relative border text-white border-white/20 shadow-lg backdrop-filter backdrop-blur-md">
          {profile.imageUrl ? (
            <img
              src={profile.imageUrl}
              alt="User Profile"
              className="h-20 w-20 absolute left-1/2 bg-white/80 transform -translate-x-1/2 -translate-y-1/2 rounded-full object-cover border-4 border-white/10"
            />
          ) : (
            <div className="h-20 w-20 absolute left-1/2 bg-white transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center object-cover border-4 border-white/10">
              <span className="text-6xl text-black font-extrabold text-center">
                {profile.bakeryName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* No Edit button */}
          <div className="h-12" />

          <h4 className="text-center text-xl font-bold text-white/80">
            {profile.bakeryName}
          </h4>
          <div className="flex justify-center items-center">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                profile.bakeryName + profile.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className=" px-2 text-sm my-1 cursor-pointer text-center block  text-white/80"
            >
              <i className="ri-map-pin-line"></i> {profile.address}
            </a>
          </div>
          <div className="flex justify-center items-center">
            <a
              href={`tel:+91${profile.mobile}`}
              className=" text-sm cursor-pointer text-center block text-white/80"
            >
              <i className="ri-phone-line"></i> +91 {profile.mobile}
            </a>
          </div>

          <div className="flex items-center justify-center m-2 max-w-[90%] mx-auto">
            <p
              className="border border-white/10 bg-white/10 text-white/70 py-1.5 px-2 rounded-l-md text-sm max-w-[70%] truncate"
              title={`https://mycakepage.vercel.app/${customUrl}`}
            >
              {`https://mycakepage.vercel.app/${customUrl}`}
            </p>
            <button
              onClick={() => {
                const url = `https://mycakepage.vercel.app/${customUrl}`;
                navigator.clipboard
                  .writeText(url)
                  .then(() => {
                    toast.success("Copied to clipboard!", {
                      style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                      },
                    });
                  })
                  .catch(() => {
                    toast.error("Failed to copy!", {
                      style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                      },
                    });
                  });
              }}
              className="bg-white/20 border cursor-pointer border-white/10 rounded-r-md px-1"
            >
              <CopySvg />
            </button>
            <div onClick={handleShare}>
              <ShareIcon />
            </div>{" "}
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default PublicProfileCard;
