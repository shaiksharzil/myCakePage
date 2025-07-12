import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CakeCard from "../components/CakeCard";
import NotFound from "./NotFound";
import SkeletonCakeCardCustomer from "../loaders/SkeletonCakeCardCustomer";
import NoCustomerCakes from "../components/NoCustomerCakes";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const CakesPage = () => {
  const { customUrl, categoryId } = useParams();
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [MobileNo, setMobileNo] = useState("");
  const [notfound, setNotfound] = useState("");
  const [isDescending, setIsDescending] = useState(false);
  const [result, setResult] = useState();
  const [categoryName, setCategoryName] = useState("");

  const Url = import.meta.env.VITE_URL;

  const sortCakes = (cakes, descending = false) => {
    return [...cakes].sort((a, b) =>
      descending ? b.minOrderQty - a.minOrderQty : a.minOrderQty - b.minOrderQty
    );
  };

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${Url}/api/cakes/category/${categoryId}`);
        setCakes(sortCakes(res.data.cakes));
        setResult(res.data.cakes.length);
        setCategoryName(res.data.categoryName.name);
      } catch (error) {
        setNotfound(error.status);
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

  const toggleSortOrder = () => {
    const newOrder = !isDescending;
    setIsDescending(newOrder);
    const sorted = sortCakes(cakes, newOrder);
    setCakes(sorted);
    toast.success(
      `Sorted by ${newOrder ? "High to Low" : "Low to High"} Order Qty`,
      {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
  };

  if (notfound === 500) return <NotFound />;

  return (
    <div className="w-screen px-10 min-h-screen bg-black overflow-x-hidden max-md:px-2">
      {loading ? (
        <div className="columns-1 columns-sm-custom-2 md:columns-3 lg:columns-4 gap-4">
          {Array.from({ length: 10 }).map((_, idx) => (
            <SkeletonCakeCardCustomer key={idx} />
          ))}
        </div>
      ) : cakes.length === 0 ? (
        <NoCustomerCakes />
      ) : (
        <div>
          <h3 className="text-xl text-center mb-3 underline font-bold tracking-wide text-zinc-300">
            {categoryName} — {result} cakes
          </h3>
          <div className="columns-1 columns-sm-custom-2 md:columns-3 lg:columns-4 gap-4">
            {cakes.map((cake) => (
              <CakeCard key={cake._id} cake={cake} mobile={MobileNo} />
            ))}
          </div>
        </div>
      )}

      <motion.div
        drag
        animate={{ y: -10 }}
        transition={{
          duration: 1,
          repeatType: "reverse",
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="h-20 fixed right-0 w-20 rounded-full z-1 shimmer border border-white/10 shadow-lg backdrop-filter backdrop-blur-md bottom-0 mb-5 mr-5 text-4xl flex items-center justify-center cursor-pointer max-md:h-15 max-md:w-15"
        onClick={toggleSortOrder}
      >
        <i
          className={
            isDescending ? "ri-sort-number-desc" : "ri-sort-number-asc"
          }
        ></i>
      </motion.div>
    </div>
  );
};

export default CakesPage;
