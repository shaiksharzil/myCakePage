import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [customUrl, setCustomUrl] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const Url = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${Url}/api/profile/me`, {
          withCredentials: true,
        });
        setProfile(res.data.profile);
        setCustomUrl(res.data.user.customUrl);
      } catch (err) {
        // console.error("Failed to fetch profile:", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, customUrl, loadingProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
