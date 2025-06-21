import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";
import CopySvg from "../icons/CopySvg";
import { useNavigate } from "react-router-dom";
import ShareIcon from '../icons/ShareIcon';
import EditIcon from "../icons/EditIcons";
import toast from "react-hot-toast";
import SkeletonPublicProfileCard from "../loaders/SkeletonPublicProfileCard";

const ProfileCard = ({ setShowQrPopup, setCustomUrl, setProfileData }) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const editIconRef = useRef();
  const [loading, setLoading] = useState(true);
  const Url = import.meta.env.VITE_URL;


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get( `${Url}/api/profile/me`, {
          withCredentials: true,
        });
        setData(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          navigate("/createprofile");
        } else {
          console.error("Error fetching profile:", err);
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchProfile();
  }, []);
  

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this cake profile!",
          text: `Here’s a beautiful cake collection I found — explore the designs and get inspired! Visit myCakePage to discover more.`,

          // Replace this with your deployed site link in production
          url: `http://localhost:5173/${user.customUrl}`,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      toast.error("Web Share API not supported in your browser.", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
  

  if (loading) return <SkeletonPublicProfileCard />;
  if (!data) return null;
  

  const { user, profile } = data;

  return (
    <div className="mt-10 w-screen flex items-center justify-center">
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

          <div className="h-12 text-center flex items-center justify-end">
            <Link
              to={"/profileedit"}
              onMouseEnter={() => editIconRef.current?.playForward?.()}
              onMouseLeave={() => editIconRef.current?.playReverse?.()}
              className="py-1 bg-white/10 flex items-center justify-center font-medium text-white/70 hover:bg-white/20 hover:text-white border border-white/10 shadow-lg backdrop-filter backdrop-blur-md rounded-xl mr-2 mt-1 px-2 cursor-pointer"
            >
              <EditIcon ref={editIconRef} /> Edit
            </Link>
          </div>
          <h4 className="text-center text-xl font-bold text-white/80">
            {profile.bakeryName}
          </h4>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              profile.bakeryName + profile.address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center px-2 text-sm my-1 cursor-pointer block  text-white/80"
          >
            <i className="ri-map-pin-line mr-1"></i> {profile.address}
          </a>
          <a
            href={`tel:+91${profile.mobile}`}
            className="text-center text-sm cursor-pointer block text-white/80"
          >
            <i className="ri-phone-line mr-1"></i> +91 {profile.mobile}
          </a>
          <div className="flex items-center justify-center m-2">
            <p className="border border-white/10 bg-white/10 text-white/70 py-1 px-2 rounded-l-md text-ellipsis max-w-[70%] truncate">
              http://localhost:5173/{user.customUrl}
            </p>
            <button
              onClick={() => {
                const url = `http://localhost:5173/${user.customUrl}`;
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
            <i
              className="ri-qr-code-line text-3xl cursor-pointer shimmer-text ml-2 text-white/70"
              onClick={() => {
                setCustomUrl(user.customUrl);
                setProfileData(profile);
                setShowQrPopup(true);
              }}
            ></i>
            <div onClick={handleShare}>
              <ShareIcon />
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default ProfileCard;
