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
    <div className="flex justify-center items-center fixed inset-0 bg-black/90 z-50 px-4">
      <div className="bg-zinc-900 rounded-xl w-full max-w-[420px] max-h-[90vh] p-4 flex flex-col">
        <h2 className="text-white text-lg font-semibold mb-3 text-center">
          Crop Your Cake
        </h2>

        <div className="flex-1 overflow-hidden">
          <div className="w-full h-full flex justify-center items-center">
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={undefined}
              keepSelection={true}
              className="max-w-full max-h-[70vh]"
            >
              <img
                src={imageSrc}
                onLoad={(e) => onImageLoad(e.target)}
                alt="To crop"
                className="max-w-full max-h-[70vh] object-contain"
              />
            </ReactCrop>
          </div>
        </div>
        <canvas ref={previewCanvasRef} className="hidden" />

        <div className="flex justify-between mt-4 gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600"
          >
            Cancel
          </button>
          <button
            onClick={getCroppedImage}
            className="flex-1 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditImagePopUp;
