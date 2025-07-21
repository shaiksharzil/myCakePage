import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import OrderPopup from "../popups/OrderPopup";

const CakeCard = ({ cake,mobile,categoryName }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [quantity, setQuantity] = useState(cake.minOrderQty || 1);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [selectedFlavour, setSelectedFlavour] = useState(
    cake.flavours?.[0]?._id || ""
  );
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [flavourDetails, setFlavourDetails] = useState({
    name: "",
    pricePerKg: 0,
  });
  useEffect(() => {
    if (!cake.flavours || cake.flavours.length === 0) return;

    let validFlavourId = selectedFlavour;

    // If selectedFlavour is not in available list, reset to first one
    const exists = cake.flavours.some(
      (fl) => String(fl._id) === String(selectedFlavour)
    );

    if (!exists) {
      validFlavourId = String(cake.flavours[0]._id);
      setSelectedFlavour(validFlavourId);
    }

    const flavourObj = cake.flavours.find(
      (fl) => String(fl._id) === String(validFlavourId)
    );

    const flavourPrice = flavourObj?.pricePerKg || 0;
    const finalPrice = (flavourPrice + (cake.extraPrice || 0)) * quantity;

    setCalculatedPrice(finalPrice);
    setFlavourDetails({
      name: flavourObj?.name || "",
      pricePerKg: flavourPrice,
    });
  }, [selectedFlavour, quantity, cake]);


  const increaseQuantity = () => setQuantity((prev) => prev + 0.5);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > cake.minOrderQty ? prev - 0.5 : prev)); 
  return (
    <div className="break-inside-avoid-column mb-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: inView ? 1 : 0.5 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-full bg-white/10 rounded-2xl px-5 py-3 my-2 shadow-2xl border border-white/20"
      >
        <div className="overflow-hidden mt-3 mb-1.5 rounded-xl text-center">
          <img
            loading="lazy"
            className="object-cover w-full cursor-zoom-in mx-auto transition-transform duration-300 ease-in-out hover:scale-120"
            src={cake.imageUrl}
            alt="Cake"
          />
        </div>
        <p className="text-yellow-100 bg-yellow-600 font-medium text-sm w-fit rounded-md px-1 py-0.5 mb-2">
          Minimum Order Quantity: {cake.minOrderQty}kg
        </p>
        {cake.cakeName ? (
          <div className="text-white text-sm bg-white/10 w-fit px-1 mb-2 rounded-md font-medium">
            {cake.cakeName}
          </div>
        ) : (
          ""
        )}
        {cake.flavours?.length > 0 && (
          <div className="flex items-center justify-start gap-3">
            <div className="text-[#cccccc] text-lg font-bold">Flavour:</div>
            <select
              className="block w-full h-fit py-1 text-sm px-2 border border-white/10 rounded-md bg-white/10 text-white focus:outline-none"
              value={selectedFlavour}
              onChange={(e) => setSelectedFlavour(e.target.value)}
            >
              {cake.flavours.map((flavour) => (
                <option
                  key={flavour._id}
                  className="bg-[#464646]"
                  value={flavour._id}
                >
                  {flavour.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex items-center justify-start gap-3 mt-2">
          <p className="text-[#cccccc] text-lg font-bold">Quantity:</p>
          <div className="flex items-center gap-2 w-full rounded-md border-2 bg-white/10 border-white/20">
            <button
              onClick={decreaseQuantity}
              className="text-white w-1/3 text-xl font-bold px-2 border-r-2 border-white/20 cursor-pointer hover:bg-white/20"
            >
              -
            </button>
            <span className="text-white px-2 w-1/2 text-center">
              {quantity}kg
            </span>
            <button
              onClick={increaseQuantity}
              className="text-white w-1/3 hover:bg-white/20 text-xl font-bold px-2 border-l-2 border-white/20 cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
        <p className="text-white font-bold text-xl">
          Price: ₹{calculatedPrice}
        </p>
        <div className="flex items-center justify-between gap-x-1">
          <button
            onClick={() => setShowOrderPopup(true)}
            className="group w-full text-xl max-md:text-lg max-md:py-1 text-[#222222] rounded-md bg-white py-2 mt-1 mb-1 font-semibold shadow-lg cursor-pointer"
          >
            Place Order{" "}
            <i className="ri-shopping-cart-2-line inline-block transform transition-transform duration-300 group-hover:translate-x-5"></i>
          </button>
        </div>
      </motion.div>
      {showOrderPopup && (
        <OrderPopup
          cake={cake}
          quantity={quantity}
          flavour={flavourDetails.name}
          price={calculatedPrice}
          mobileNo={mobile}
          category={categoryName}

          onClose={() => setShowOrderPopup(false)}
        />
      )}
    </div>
  );
};

export default CakeCard;
