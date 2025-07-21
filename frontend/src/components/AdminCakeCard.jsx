import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import EditIcon from "../icons/EditIcons";
import TrashIcon from "../icons/TrashIcon";

const AdminCakeCard = (props) => {
  const { src, minQty, extraPrice, onEdit, cake, onDelete } = props;
  const [selectedFlavour, setSelectedFlavour] = useState(
    cake.flavours?.[0]?._id || ""
  );
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const editIconRef = useRef();
  const trashIconRef = useRef();

  return (
    <div className="break-inside-avoid-column mb-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: inView ? 1 : 0.5 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-full border border-white/10 rounded-2xl bg-white/10 px-5 py-3 my-2"
      >
        <div className="overflow-hidden mt-3 mb-1.5 rounded-xl text-center">
          <img
            loading="lazy"
            className="object-cover w-full mx-auto cursor-zoom-in transition-transform duration-300 ease-in-out hover:scale-120"
            src={src}
            alt=""
          />
        </div>
        {cake.cakeName.trim() ? (
          <div className="text-white/70 text-lg font-medium">
            Cake Name: {cake.cakeName}
          </div>
        ) : (
          ""
        )}
        {cake.flavours?.length > 0 && (
          <div className="flex items-center justify-start gap-3 mt-2">
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
                  {flavour.name} — ₹{flavour.pricePerKg || 0}
                </option>
              ))}
            </select>
          </div>
        )}

        <p className="text-white/70 font-medium text-lg mt-2">
          Minimum Order Quantity: {minQty} kg
        </p>
        <p className="text-white/70 font-semibold text-xl max-md:text-lg">
          Extra Price: ₹{extraPrice || 0}
        </p>

        <div className="flex items-center justify-between gap-x-1">
          <button
            onClick={() => onEdit(cake)}
            onMouseEnter={() => editIconRef.current?.playForward?.()}
            onMouseLeave={() => editIconRef.current?.playReverse?.()}
            className="w-1/2 flex items-center justify-center text-xl text-white/70 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 rounded-md py-1 mt-1 mb-3 font-medium shadow-lg backdrop-filter backdrop-blur-md cursor-pointer"
          >
            <EditIcon ref={editIconRef} /> <div>Edit</div>
          </button>

          <button
            onClick={() => onDelete(cake)}
            onMouseEnter={() => trashIconRef.current?.playForward?.()}
            onMouseLeave={() => trashIconRef.current?.playReverse?.()}
            className="w-1/2 text-xl flex items-center justify-center max-md:text-lg text-white/70 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 rounded-md py-1 mt-1 mb-3 font-medium shadow-lg backdrop-filter backdrop-blur-md cursor-pointer"
          >
            <TrashIcon ref={trashIconRef} size={20} /> <div>Delete</div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminCakeCard;
