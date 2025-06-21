import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CakeCard from "../components/CakeCard";
import NotFound from './NotFound';
import SkeletonCakeCardCustomer from "../loaders/SkeletonCakeCardCustomer";
import NoCustomerCakes from "../components/NoCustomerCakes";

const CakesPage = () => {
  const { customUrl, categoryId } = useParams();
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flavours, setFlavours] = useState([]);
  const [MobileNo, setMobileNo] = useState("")
  const [notfound, setNotfound] = useState("")
  const Url = import.meta.env.VITE_URL;


  useEffect(() => {
    const fetchCakes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${Url}/api/cakes/category/${categoryId}`
        );
        setCakes(res.data);
      } catch (error) {
        // console.error("Failed to fetch cakes:", error);
        setNotfound(error.status)
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchCakes();
    axios
      .get(`${Url}/api/public/${customUrl}`)
      .then((res) => {
        setMobileNo(res.data.profile.mobile);
      })
      .catch((err) => {
        console.error("Failed to load profile data:", err);
      });
  }, [categoryId, customUrl]);
  if (notfound == 500) return <NotFound />
  return (
    <div className="w-screen px-10 min-h-screen bg-black overflow-x-hidden max-md:px-2">
      {loading ? (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {Array.from({ length: 10 }).map((_, idx) => (
            <SkeletonCakeCardCustomer key={idx} />
          ))}
        </div>
      ) : cakes.length === 0 ? (
        <NoCustomerCakes />
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {cakes.map((cake) => (
            <CakeCard key={cake._id} cake={cake} mobile={MobileNo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CakesPage;
