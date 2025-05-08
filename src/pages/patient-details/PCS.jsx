import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API } from "../../host";

const items = [
  {
    id: 1,
    question: "I worry all the time about whether the pain will end.",
    answer: 1,
  },
  {
    id: 2,
    question: "I feel I can’t go on.",
    answer: 1,
  },
  {
    id: 3,
    question: "It’s terrible and I think it’s never going to get any better.",
    answer: 2,
  },
  {
    id: 4,
    question: "It’s awful and I feel that it overwhelms me.",
    answer: 2,
  },
  {
    id: 5,
    question: "I feel I can’t stand it anymore.",
    answer: 2,
  },
  {
    id: 6,
    question: "I become afraid that the pain will get worse",
    answer: 2,
  },
  {
    id: 7,
    question: "I keep thinking of other painful events.",
    answer: 2,
  },
  {
    id: 8,
    question: "I anxiously want the pain to go away.",
    answer: 2,
  },
  {
    id: 9,
    question: "I can’t seem to keep it out of my mind.",
    answer: 2,
  },
  {
    id: 10,
    question: "I keep thinking about how much it hurts.",
    answer: 2,
  },
  {
    id: 11,
    question: "I keep thinking about how badly I want the pain to stop.",
    answer: 2,
  },
  {
    id: 12,
    question: "There’s nothing I can do to reduce the intensity of the pain",
    answer: 2,
  },
  {
    id: 13,
    question: "I wonder whether something serious may happen.",
    answer: 2,
  },
];

const PCS = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");

  useEffect(() => {
    if (email) {
      setIsLoading(true);
      axios
        .get(`${API}/getpcss?email=${email}`)
        .then((response) => {
          const sortedData = response.data.sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateB - dateA; // Descending order
          });
          setData(sortedData);
          if (sortedData.length > 0) {
            setSelectedEntry(sortedData[0]);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching PCS data:", error);
          setIsLoading(false);
        });
    }
  }, [email]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        PCS Submissions
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Grid of Dates */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Data.map((entry, index) => (
              <button
                key={index}
                onClick={() => setSelectedEntry(entry)}
                className={`border rounded-lg p-4 shadow-md text-center ${
                  selectedEntry?._id === entry._id
                    ? "bg-blue-100 dark:bg-blue-700 border-blue-400"
                    : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                }`}
              >
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  {entry.date}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {entry.time}
                </div>
              </button>
            ))}
          </div>

          {/* Show Answers */}
          {selectedEntry && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                Submission from {selectedEntry.date} {selectedEntry.time}
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border rounded-md bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                  >
                    <div className="text-slate-700 dark:text-white font-medium">
                      Q{item.id}: {item.question}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      ➡️ {selectedEntry["S" + item.id]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PCS;
