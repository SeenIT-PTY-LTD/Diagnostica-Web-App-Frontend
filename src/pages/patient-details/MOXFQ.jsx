import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tab } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import { API } from "../../host";

const items = [
  {
    id: 1,
    question: "I have pain in my foot/ankle",
    answer: 3,
  },
  {
    id: 2,
    question: "I avoid walking long distances because of pain in my foot/ankle",
    answer: 2,
  },
  {
    id: 3,
    question: "i change the way I walk due to pain in my foot/ankle",
    answer: 3,
  },
  {
    id: 4,
    question: "I walk slowly because of pain in my foot/ankle",
    answer: 3,
  },
  {
    id: 5,
    question: "I have to stop and rest my foot/ankle because of pain",
    answer: 3,
  },
  {
    id: 6,
    question:
      "I avoid some hard or rough surfaces because of pain in my foot/ankle",
    answer: 3,
  },
  {
    id: 7,
    question:
      "I avoid standing for a long time because of pain in my foot/ankle",
    answer: 3,
  },
  {
    id: 8,
    question:
      "I catch the bus or use the car instead of walking, because of pain in my foot/ankle",
    answer: 3,
  },
  {
    id: 9,
    question: "I feel self-conscious about my foot/ankle",
    answer: 3,
  },
  {
    id: 10,
    question: "I feel self-conscious about the shoes I have to wear",
    answer: 3,
  },
  {
    id: 11,
    question: "The pain in my foot/ankle is more painful in the evening",
    answer: 3,
  },
  {
    id: 12,
    question: "I get shooting pains in my foot/ankle",
    answer: 3,
  },
  {
    id: 13,
    question:
      "The pain in my foot/ankle prevents me from carrying out my work/everyday activities",
    answer: 3,
  },
  {
    id: 14,
    question:
      "I am unable to do all mysocial or recreational activities because of pain in my foot/ankle",
    answer: 3,
  },
  {
    id: 15,
    question:
      "During the past 4 weeks how would you describe the pain you usually have in your foot/ankle?",
    answer: 3,
  },
  {
    id: 16,
    question:
      "During the past 4 weeks have you been troubled by pain from your foot/ankle in bed at night?",
    answer: 3,
  },
];

const MOXFQ = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (email) {
          const response = await axios.get(`${API}/getmoxfq?email=${email}`);
          const sortedData = response.data.sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateB - dateA; // Descending order
          });
          setData(sortedData);
          if (sortedData.length > 0) {
            setSelectedEntry(sortedData[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching answers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [email]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        MOXFQ Submissions
      </h1>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Grid of date boxes */}
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

          {/* Selected submission detail */}
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
                      ➡️ {selectedEntry["m" + item.id]}
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

export default MOXFQ;
