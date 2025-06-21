import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

const CustomUrlWrapper = () => {
  const { customUrl } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const Url = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${Url}/api/public/profile/${customUrl}`
        );
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setProfileData(data);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [customUrl]);

  if (loading) return <div>{" "}</div>;
  if (notFound) return <NotFound/>;

  return <Profile data={profileData} />;
};

export default CustomUrlWrapper;
