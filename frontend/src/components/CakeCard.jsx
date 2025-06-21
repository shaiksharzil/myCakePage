import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import OrderPopup from "../popups/OrderPopup";

const CakeCard = ({ cake,mobile }) => {
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

    const flavourObj = cake.flavours.find((fl) => fl._id === selectedFlavour);
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
        className="w-full border border-white/10 rounded-2xl backdrop-filter backdrop-blur-md px-5 py-3 my-2"
      >
        <div className="overflow-hidden mt-3 mb-1.5 rounded-xl text-center">
          <img
            loading="lazy"
            className="object-cover cursor-zoom-in transition-transform duration-300 ease-in-out hover:scale-120"
            src={cake.imageUrl}
            alt="Cake"
          />
        </div>
        {cake.cakeName ? (
          <div className="text-white/70 text-xl font-medium">
            {cake.cakeName}
          </div>
        ) : (
          ""
        )}
        {cake.flavours?.length > 0 && (
          <div className="flex items-center justify-start gap-3">
            <div className="text-white/70 text-lg font-medium">Flavours:</div>
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
                  {flavour.name} — ₹{flavour.pricePerKg}
                </option>
              ))}
            </select>
          </div>
        )}
        <p className="text-white/70 font-medium text-lg mt-1 mb-0.5">
          Min Order Quantity: {cake.minOrderQty}kg
        </p>

        <div className="flex items-center justify-start gap-3 mt-1">
          <p className="text-white/70 text-lg font-medium">Quantity:</p>
          <div className="flex items-center gap-2 w-full border border-white/10 rounded-md bg-white/10 px-2">
            <button
              onClick={decreaseQuantity}
              className="text-white w-1/2 text-xl font-bold px-2 cursor-pointer hover:text-white/70"
            >
              -
            </button>
            <span className="text-white px-2">{quantity}kg</span>
            <button
              onClick={increaseQuantity}
              className="text-white w-1/2 text-xl font-bold px-2 cursor-pointer hover:text-white/70"
            >
              +
            </button>
          </div>
        </div>

        <p className="text-white/80 font-bold text-xl max-md:text-lg mt-1">
          Price: ₹{calculatedPrice}/-
        </p>

        <div className="flex items-center justify-between gap-x-1">
          <button
            onClick={() => setShowOrderPopup(true)}
            className=" w-full text-xl max-md:text-lg max-md:py-1 text-white/70 border hover:bg-white/20 hover:text-white border-white/10 rounded-md bg-white/10 py-2 mt-1 mb-3 font-medium shadow-lg backdrop-filter backdrop-blur-md hover:backdrop-blur-none cursor-pointer"
          >
            Order Now <i className="ri-shopping-cart-2-line"></i>
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
          onClose={() => setShowOrderPopup(false)}
        />
      )}
    </div>
  );
};

export default CakeCard;
