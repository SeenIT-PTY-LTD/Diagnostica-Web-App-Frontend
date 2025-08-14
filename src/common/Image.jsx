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
      ) : !attemptedSectionPrompts?.length ? (
        <div className="flex justify-start items-start py-10 min-h-[200px]">
          <p className="text-gray-500 font-bold text-lg">No data found</p>
        </div>
      ) : (
        attemptedSectionPrompts?.map((dateGroup, dateIdx) => {
          const items = dateGroup?.data?.subSections?.[0]?.data || [];

          // Merge instruction + comment into a single item before mapping
          const mergedItems = [];
          let detailItem = null;

          items?.forEach((item) => {
            if (
              item.instruction ||
              item.isComment ||
              (Array.isArray(item.questions) && item.questions.length)
            ) {
              // This will be our "detail card"
              if (!detailItem) {
                detailItem = { ...item, questions: item.questions || [] };
              } else {
                // Merge comments/questions into existing detail card
                if (item.isComment || item.comment)
                  detailItem.comment = item.comment;
                if (Array.isArray(item.questions)) {
                  detailItem.questions = [
                    ...(detailItem.questions || []),
                    ...item.questions,
                  ];
                }
              }
            } else {
              // Any other item (like image-based) stays separate
              mergedItems.push(item);
            }
          });

          if (detailItem) mergedItems.unshift(detailItem); // Place detail card first

          return mergedItems?.map((item, itemIdx) => (
            <>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
              <h2 className="text-xl font-semibold text-slate-700 dark:text-gray-300">
                {formatDate(dateGroup.date)}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {dateGroup.data.length} submission
                {dateGroup.data.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Card key={`${dateGroup.date}-${itemIdx}`}>
              <div className="space-y-3">
                {/* Text details card */}

                {/* Image-based question card */}
                {Array.isArray(item.questions) &&
                  item.questions.some((q) => q.img || q.media) &&
                  item.questions.map((q, qIdx) => (
                    <div key={qIdx} className="space-y-3">
                      {Array.isArray(q.img) &&
                        q.img.length > 0 &&
                        q.img.map((imgFile, imgIdx) => {
                          const cleanPath = imgFile.replace(/^\/+/, "");
                          const imageUrl = `${api.defaults.baseURL}/images/${cleanPath}`;
                          return (
                            <img
                              key={`${itemIdx}-${imgIdx}`}
                              src={imageUrl}
                              alt={`Pain submission ${itemIdx + 1}`}
                              className="max-h-[300px] object-contain cursor-zoom-in mx-auto"
                              onClick={() => openModal(imageUrl)}
                            />
                          );
                        })}
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Question:</span>{" "}
                          {q.question}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Answer:</span>{" "}
                          {Array.isArray(q.answer)
                            ? q.answer.join(", ")
                            : q.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                {(item.instruction || item.comment) && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
                    {item.comment && (
                      <p className="text-sm text-yellow-700 bg-yellow-50 dark:bg-gray-700 dark:text-yellow-300 p-2 rounded">
                        <span className="font-medium">Comment:</span>{" "}
                        {item.comment}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </Card>
            </>
          ));
        })
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
