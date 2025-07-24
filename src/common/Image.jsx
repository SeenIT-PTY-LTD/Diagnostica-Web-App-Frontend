import React, { useState, useEffect, useMemo } from "react";
import Card from "./Card";

const Image = ({ data = {} }) => {
  const sortedDates = useMemo(() => {
    return Object.keys(data || {}).sort((a, b) => new Date(b) - new Date(a));
  }, [data]);

  const [selectedDate, setSelectedDate] = useState("");
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    if (sortedDates.length > 0) {
      setSelectedDate(sortedDates[0]);
    }
  }, [sortedDates]);

  if (!data || typeof data !== "object" || sortedDates.length === 0) {
    return (
      <div className="p-6 text-center text-slate-600 dark:text-slate-300">
        No data available.
      </div>
    );
  }

  const selectedEntry = data[selectedDate] || null;
  const openModal = (img) => setZoomedImage(img);
  const closeModal = () => setZoomedImage(null);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        Pain Image Submissions
      </h1>

      {/* Date buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sortedDates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`border rounded-lg p-4 shadow-md text-center ${
              selectedDate === date
                ? "bg-blue-100 dark:bg-blue-700 border-blue-400"
                : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
            }`}
          >
            <div className="text-sm text-slate-600 dark:text-slate-300">
              {date}
            </div>
          </button>
        ))}
      </div>

      {/* Submission details */}
      {selectedEntry ? (
        <div className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            Submission for {selectedDate}
          </h2>

          <div className="p-4 border rounded-md bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 space-y-2">
            <p className="text-slate-700 dark:text-white">
              <b>Session:</b> {selectedEntry.session}
            </p>
            <p className="text-slate-700 dark:text-white">
              <b>Overall Pain Range:</b> {selectedEntry.painrange}
            </p>
            <p className="text-slate-700 dark:text-white">
              <b>Comment:</b> {selectedEntry.comment}
            </p>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {selectedEntry.images.map((img, idx) => (
              <Card key={img + idx}>
                <div className="space-y-2">
                  <img
                    src={img}
                    alt={`Pain submission ${idx + 1}`}
                    className="max-h-[300px] object-contain cursor-zoom-in mx-auto"
                    onClick={() => openModal(img)}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-slate-500 dark:text-slate-300">
          No submission found for the selected date.
        </div>
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
