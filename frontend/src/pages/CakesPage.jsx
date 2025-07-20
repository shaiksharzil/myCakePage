import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CakeCard from "../components/CakeCard";
import NotFound from "./NotFound";
import SkeletonCakeCardCustomer from "../loaders/SkeletonCakeCardCustomer";
import NoCustomerCakes from "../components/NoCustomerCakes";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import FilterPopup from "../popups/FilterPopup";
import FilterIcon from "../icons/FilterIcon";

const CakesPage = () => {
  const { customUrl, categoryId } = useParams();
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [MobileNo, setMobileNo] = useState("");
  const [notfound, setNotfound] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterFlavours, setFilterFlavours] = useState([]);
  const [qty, setQty] = useState([]);
  const [cakesData, setCakesData] = useState([]);
  const [filterState, setFilterState] = useState({
    selectedFlavours: [],
    minQty: null,
    maxQty: null,
    sortBy: "newestFirst",
  });
  const Url = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${Url}/api/cakes/category/${categoryId}`);
        setCakes(
          res.data.cakes.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
        setCakesData(res.data.cakes);
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

  let obj = {};
  let temp = [];
  let tempQty = [];
  let qtyObj = {};
  const handleFlavoursAndMinOrderQty = () => {
    for (let i = 0; i < cakesData.length; i++) {
      if (qtyObj[cakesData[i].minOrderQty] == undefined) {
        tempQty.push(cakesData[i].minOrderQty);
        qtyObj[cakesData[i].minOrderQty] = true;
      }
      for (let j = 0; j < cakesData[i].flavours.length; j++) {
        if (obj[cakesData[i].flavours[j]._id] == undefined) {
          temp.push(cakesData[i].flavours[j]);
          obj[cakesData[i].flavours[j]._id] = true;
        }
      }
    }
    setFilterFlavours(temp);
    setShowFilter(true);
    setQty([...tempQty].sort((a, b) => a - b));
  };

  const handleFilter = (filters) => {
    setFilterState(filters);
    let filteredCakes = cakesData.filter(
      (x) => x.minOrderQty >= filters.minQty && x.minOrderQty <= filters.maxQty
    );

    if (filters.selectedFlavours.length !== 0) {
      let filteredFlavours = [];
      for (let i = 0; i < filteredCakes.length; i++) {
        let matchingFlavours = [];
        for (let j = 0; j < filteredCakes[i].flavours.length; j++) {
          for (let k = 0; k < filters.selectedFlavours.length; k++) {
            if (
              filters.selectedFlavours[k] === filteredCakes[i].flavours[j]._id
            ) {
              matchingFlavours.push(filteredCakes[i].flavours[j]);
            }
          }
        }
        if (matchingFlavours.length > 0) {
          filteredFlavours.push({
            ...filteredCakes[i],
            flavours: [...matchingFlavours],
          });
        }
      }
      filteredCakes = filteredFlavours;
    }
    // Now apply sorting on the filtered result
    if (filters.sortBy === "qtyLowHigh") {
      filteredCakes.sort((a, b) => a.minOrderQty - b.minOrderQty);
    } else if (filters.sortBy === "qtyHighLow") {
      filteredCakes.sort((a, b) => b.minOrderQty - a.minOrderQty);
    } else if (filters.sortBy === "priceLowHigh") {
      filteredCakes.sort((a, b) => {
        const aPrice =
          (a.flavours[0].pricePerKg + a.extraPrice) * a.minOrderQty;
        const bPrice =
          (b.flavours[0].pricePerKg + b.extraPrice) * b.minOrderQty;
        return aPrice - bPrice;
      });
    } else if (filters.sortBy === "priceHighLow") {
      filteredCakes.sort((a, b) => {
        const aPrice =
          (a.flavours[0].pricePerKg + a.extraPrice) * a.minOrderQty;
        const bPrice =
          (b.flavours[0].pricePerKg + b.extraPrice) * b.minOrderQty;
        return bPrice - aPrice;
      });
    }

    setCakes(filteredCakes);
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
          <div className="flex justify-center items-center my-1">
            <h3 className="text-xl text-center font-mono bg-white/10 px-2 py-1 rounded-md w-fit tracking-wide text-white">
              {categoryName} — {cakes.length} cakes
            </h3>
          </div>
          <div className="columns-1 columns-sm-custom-2 md:columns-3 lg:columns-4 gap-4">
            {cakes.map((cake) => (
              <CakeCard key={cake._id} cake={cake} mobile={MobileNo} categoryName={categoryName} />
            ))}
          </div>
        </div>
      )}
      {showFilter && (
        <FilterPopup
          flavours={filterFlavours}
          qty={qty}
          onClose={() => setShowFilter(false)}
          initialFilter={filterState}
          onApply={(filters,fromReset) => {
            handleFilter(filters);
            if (fromReset) {
              toast.success("Filters reset to default.");
            } else {
              toast.success("Showing cakes based on selected filters.");
            }
          }}
        />
      )}
      {loading ? (
        <></>
      ) : (
        <motion.div
          animate={{ y: -10 }}
          transition={{
            duration: 1,
            repeatType: "reverse",
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-20 fixed right-0 w-20 rounded-full z-1 shimmer border border-white/10 shadow-lg backdrop-filter backdrop-blur-md bottom-0 mb-5 mr-5 text-4xl flex items-center justify-center cursor-pointer max-md:h-15 max-md:w-15"
          onClick={handleFlavoursAndMinOrderQty}
        >
          {/* <i class="ri-filter-2-line"></i> */}
          <FilterIcon />
        </motion.div>
      )}
    </div>
  );
};

export default CakesPage;
