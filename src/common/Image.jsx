import React, { useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/dateFormat";
import api from "../../src/utils/api";
import Loading from "./Loading";

const Image = () => {
  const { attemptedSectionPrompts, loading } = useSelector(
    (state) => state.patients
  );

  const [zoomedImage, setZoomedImage] = useState(null);

  const openModal = (img) => setZoomedImage(img);
  const closeModal = () => setZoomedImage(null);

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        Pain Image Submissions
      </h1>

      {loading ? (
        <Loading />
      ) : attemptedSectionPrompts.length === 0 ? (
        <div className="flex justify-start items-start py-10 min-h-[200px]">
          <p className="text-gray-500 font-bold text-lg">No data found</p>
        </div>
      ) : (
        attemptedSectionPrompts?.map((dateGroup, dateIdx) => (
          <div key={dateGroup.date + dateIdx} className="space-y-4">
            {/* Date Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
              <h2 className="text-xl font-semibold text-slate-700 dark:text-gray-300">
                {formatDate(dateGroup.date)}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {dateGroup.data.length} submission
                {dateGroup.data.length !== 1 ? "s" : ""}
              </p>
            </div>
            {/* Images Grid for this date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {dateGroup.data.map((item, itemIdx) => {
                const imageUrl = item.img?.startsWith("http")
                  ? item.img
                  : `${{ api }}/images/${item.img?.replace(/^\/+/, "")}`;
                return (
                  <Card key={`${dateGroup.date}-${itemIdx}`}>
                    <div className="space-y-3">
                      <img
                        src={imageUrl}
                        alt={`Pain submission ${itemIdx + 1}`}
                        className="max-h-[300px] object-contain cursor-zoom-in mx-auto"
                        onClick={() => openModal(imageUrl)}
                      />

                      {/* Display question and answer info */}
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-500">
                          Answer:{" "}
                          <span className="font-medium">{item.answer}</span>
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))
      )}

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
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors"
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
