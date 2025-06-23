import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";
import DownloadIcon from "../icons/DownloadIcon";
import toast, { Toaster } from "react-hot-toast";

const QrCodePopUp = ({ url, setShowPopup, profile }) => {
  const qrWrapperRef = useRef();
  const iconRef = useRef();

  const downloadPromoImage = () => {
    iconRef.current?.play?.();
    if (!qrWrapperRef.current) return;

    const downloadImage = async () => {
      const dataUrl = await toPng(qrWrapperRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = "mycakepage_promo_qr.png";
      link.href = dataUrl;
      link.click();
    };

    toast.promise(
      downloadImage(),
      {
        loading: "Downloading image...",
        success: () => {
          setTimeout(() => setShowPopup(false), 100);
          return "Image downloaded!";
        },
        error: "Failed to download image",
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
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 backdrop-blur-md bg-black/30">
      <Toaster />
      <div className="text-white text-center">
        {/* ✅ This part will be downloaded */}
        <div
          ref={qrWrapperRef}
          className="w-96 bg-white rounded-xl shadow-lg text-black text-center p-5 max-md:w-86"
          style={{ fontFamily: "sans-serif" }}
        >
          <h2
            className="text-3xl font-bold mb-1"
            style={{ fontFamily: "Alagen" }}
          >
            MyCakePage
          </h2>
          <p className="text-gray-600 text-sm italic">
            Scan the QR to explore our cake gallery!
          </p>
          <p className="text-gray-700 text-sm mb-3">
            Custom cakes, trending designs & fast delivery!
          </p>

          <div className="flex justify-center my-3">
            <QRCodeCanvas
              value={url}
              size={200}
              bgColor="#ffffff"
              fgColor="#000000"
              includeMargin={true}
              level="H"
            />
          </div>

          <p className="text-sm font-semibold mb-2">{url}</p>
          <hr className="border-gray-300 mb-2" />

          <div className="text-sm">
            <p className="font-bold text-lg">{profile.bakeryName}</p>
            <p className="text-gray-600">📍 {profile.address}</p>
            <p className="text-gray-600">📞 +91 {profile.mobile}</p>
          </div>
          <hr className="border-gray-300 my-2" />

          <p className="text-xs text-gray-500 italic mt-2">
            Developed by{" "}
            <span className=" text-emerald-400 font-semibold">
              Shaik Sharzil
            </span>
          </p>
          <p  className="text-xs text-gray-400 italic">
            https://mycakepage.vercel.app/
          </p>
        </div>
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={downloadPromoImage}
            className="flex items-center gap-2 cursor-pointer bg-white/10 hover:bg-white/20 border border-white/10 text-white py-1 px-3 rounded-md"
          >
            <DownloadIcon ref={iconRef} size={20} />
            Download Image
          </button>
          <button
            onClick={() => setShowPopup(false)}
            className="bg-white/10 hover:bg-white/20 cursor-pointer border border-white/10 text-white py-1 px-3 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrCodePopUp;
