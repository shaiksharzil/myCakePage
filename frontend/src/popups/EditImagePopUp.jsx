import React, { useState, useRef, useCallback } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const EditImagePopUp = ({ imageSrc, onCancel, onSave }) => {
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const onImageLoad = useCallback((img) => {
    imgRef.current = img;

    const width = img.width;
    const height = img.height;

    setCrop({
      unit: "px",
      x: 0,
      y: 0,
      width,
      height,
    });
  }, []);

  const getCroppedImage = () => {
    const canvas = previewCanvasRef.current;
    const image = imgRef.current;
    const crop = completedCrop;

    if (!crop || !canvas || !image) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const ctx = canvas.getContext("2d");
    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    canvas.toBlob((blob) => {
      if (blob) onSave(blob);
    }, "image/jpeg");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-2">
      <div className="bg-zinc-900 text-white rounded-xl p-6 w-96 max-w-4xl shadow-2xl">
        <h2 className="text-lg font-semibold mb-4">Crop Your Cake</h2>

        <div className="flex justify-center items-start bg-zinc-800 p-4 rounded-md h-[70vh] overflow-y-auto border border-zinc-700">
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={undefined}
            keepSelection={true}
          >
            <img
              src={imageSrc}
              onLoad={(e) => onImageLoad(e.target)}
              alt="To crop"
              className="h-auto max-h-none object-contain"
            />
          </ReactCrop>
        </div>
        <canvas ref={previewCanvasRef} className="hidden"></canvas>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-zinc-700 cursor-pointer text-white rounded hover:bg-zinc-600"
          >
            Cancel
          </button>
          <button
            onClick={getCroppedImage}
            className="px-4 py-2 bg-emerald-500 text-white rounded cursor-pointer hover:bg-emerald-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditImagePopUp;
