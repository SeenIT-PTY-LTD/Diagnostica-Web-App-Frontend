import React, { useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

const Image = () => {
  const { attemptedSectionPrompts, loading } = useSelector(
    (state) => state.patients
  );

  const [zoomedImage, setZoomedImage] = useState(null);

  const openModal = (img) => setZoomedImage(img);
  const closeModal = () => setZoomedImage(null);

  if (
    !attemptedSectionPrompts ||
    typeof attemptedSectionPrompts !== "object" ||
    attemptedSectionPrompts.length === 0
  ) {
    return (
      <div className="p-6 text-center text-slate-600 dark:text-slate-300">
        No data available.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        Pain Image Submissions
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
          </div>
        ) : (
          attemptedSectionPrompts?.map((img, idx) => {
            console.log("Image data:", img);

            // Ensure the image path is complete
            const imageUrl = img.img?.startsWith("http")
              ? img.img
              : `http://192.168.0.104:3003/images/${img.img?.replace(
                  /^\/+/,
                  ""
                )}`;
            console.log("imageUrl:", imageUrl);

            return (
              <Card key={img + idx}>
                <div className="space-y-2">
                  <img
                    src={imageUrl}
                    alt={`Pain submission ${idx + 1}`}
                    className="max-h-[300px] object-contain cursor-zoom-in mx-auto"
                    onClick={() => openModal(imageUrl)}
                  />
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Zoom modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <img
            src={zoomedImage}
            alt="Zoomed"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Image;
