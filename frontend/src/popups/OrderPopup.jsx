import React, { useState } from "react";
import toast from "react-hot-toast";

const OrderPopup = ({ cake, quantity, flavour, price, mobileNo, onClose,category }) => {
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [message, setMessage] = useState("");
  let cakeNameMess = "";
  const [messageOnCake, setMessageOnCake] = useState("");
  if (cake.cakeName.trim()) cakeNameMess = `• cake Name: ${cake.cakeName}`;
  let messOnCake = "";
  let specReq = "";
  const [specialRequests, setSpecialRequests] = useState("");
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const handleOrder = () => {
    if (!deliveryDate || !deliveryTime) {
      toast.error("Please fill in the required fields.");
      return;
    }

    const formattedDate = formatDate(deliveryDate);

    // Construct text chunks for WhatsApp
    const messOnCake = message ? `🎁 Message on Cake: ${message}` : "";
    const specReq = specialRequests
      ? `✨ Special Requests: ${specialRequests}`
      : "";
    const cakeNameMess = cake.cakeName?.trim()
      ? `• Cake Name: ${cake.cakeName}`
      : "";

    // GA4 Custom Event Tracking (before redirect)
    if (window.gtag) {
      window.gtag("event", "order_via_whatsapp", {
        category: category || "Unknown Category",
        cake_name: cake?.cakeName?.trim() || "Unnamed Cake",
        flavour,
        quantity,
        price,
        delivery_date: formattedDate,
        delivery_time: deliveryTime,
        message_on_cake: message || "None",
        special_requests: specialRequests || "None",
        image_url: cake?.imageUrl || "No image",
      });
    }

    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          const whatsappText = `
Hello! 🎂

I would like to place an order for the following cake:
• Category: ${category}
${cakeNameMess}
• Flavour: ${flavour}
• Quantity: ${quantity} kg
• Total Price: ₹${price}/-

${messOnCake}
📅 Delivery Date: ${formattedDate}
⏰ Delivery Time: ${deliveryTime}
${specReq}

🖼️ Cake Image: ${cake.imageUrl}

Please confirm my order. Thank you! 😊
`;

          const whatsappURL = `https://wa.me/+91${mobileNo}?text=${encodeURIComponent(
            whatsappText
          )}`;

          window.open(whatsappURL, "_blank");
          resolve();
        }, 1200);
      }),
      {
        loading: "Preparing your order...",
        success: "Redirecting to WhatsApp...",
        error: "Something went wrong!",
      },
      {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-2xl text-white w-full max-w-md relative max-h-[90vh] custom-scroll overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white/70 hover:text-white text-2xl"
        >
          <i className="ri-close-line cursor-pointer"></i>
        </button>

        <h2 className="text-center text-xl font-semibold mb-4">
          Place Your Order
        </h2>

        <img
          src={cake.imageUrl}
          alt="Cake"
          className="w-full h-48 object-cover rounded-xl mb-4 border border-white/20"
        />

        <div className="flex flex-col mb-4">
          <p className="text-white/70">
            Category : <span className="font-medium">{category}</span>
          </p>
          {cake.cakeName.trim() ? (
            <p className="text-white/70">
              Cake Name: <span className="font-medium">{cake.cakeName}</span>
            </p>
          ) : (
            ""
          )}
          <p className="text-white/70">
            Flavour: <span className="font-medium">{flavour}</span>
          </p>
          <p className="text-white/70">
            Quantity: <span className="font-medium">{quantity}kg</span>
          </p>
          <p className="text-white/70">
            Price: <span className="font-medium">₹{price}/-</span>
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-white/70">Delivery Date *</label>
            <input
              type="date"
              className="w-full p-2 rounded-xl outline-none bg-white/10 border border-white/20 text-white"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-white/70">Delivery Time *</label>
            <input
              type="time"
              className="w-full p-2 rounded-xl outline-none bg-white/10 border border-white/20 text-white"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-white/70">
              Message on Cake (Optional):
            </label>
            <input
              type="text"
              maxLength={50}
              className="w-full p-2 rounded-xl outline-none bg-white/10 border border-white/20 text-white"
              placeholder="e.g. Happy Birthday!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-white/70">
              Special Requests (Optional):
            </label>
            <input
              type="text"
              maxLength={50}
              className="w-full p-2 rounded-xl outline-none bg-white/10 border border-white/20 text-white"
              placeholder="e.g. Change in colour"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            />
          </div>

          <button
            onClick={handleOrder}
            className="bg-white/10 border border-white/10 cursor-pointer hover:bg-white/20 rounded-xl text-center py-2 font-semibold text-white mt-2"
          >
            Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
