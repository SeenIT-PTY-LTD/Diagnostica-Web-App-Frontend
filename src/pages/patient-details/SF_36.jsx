import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { API } from "../../host";

const items = [
  {
    id: 1,
    question: "In general, would you say your health is:",
    answer: 3,
  },
  {
    id: 2,
    question:
      " Compared to one year ago, how would you rate your health in general now?",
    answer: 2,
  },
  {
    id: 3,
    question:
      "Vigorous activities, such as running, lifting heavy objects, participating in strenuous sports",
    answer: 3,
  },
  {
    id: 4,
    question:
      "Moderate activities, such as moving a table, pushing a vacuum cleaner, bowling, or playing golf",
    answer: 3,
  },
  {
    id: 5,
    question: "Lifting or carrying groceries",
    answer: 3,
  },
  {
    id: 6,
    question: " Climbing several flights of stairs",
    answer: 3,
  },
  {
    id: 7,
    question: "Climbing one flight of stairs",
    answer: 3,
  },
  {
    id: 8,
    question: "Bending, kneeling, or stooping",
    answer: 3,
  },
  {
    id: 9,
    question: "Walking more than a mile",
    answer: 3,
  },
  {
    id: 10,
    question: "Walking several blocks",
    answer: 3,
  },
  {
    id: 11,
    question: " Walking one block",
    answer: 3,
  },
  {
    id: 12,
    question: "Bathing or dressing yourself",
    answer: 3,
  },
  {
    id: 13,
    question:
      "Cut down the amount of time you spent on work or other activities",
    answer: 3,
  },
  {
    id: 14,
    question: "Accomplished less than you would like",
    answer: 3,
  },
  {
    id: 15,
    question: "Were limited in the kind of work or other activities",
    answer: 3,
  },
  {
    id: 16,
    question:
      "Had difficulty performing the work or other activities (for example, it took extra effort)",
    answer: 3,
  },
  {
    id: 17,
    question:
      "Cut down the amount of time you spent on work or other activities",
    answer: 3,
  },
  {
    id: 18,
    question: "Accomplished less than you would like",
    answer: 3,
  },
  {
    id: 19,
    question: "Didn't do work or other activities as carefully as usual",
    answer: 3,
  },
  {
    id: 20,
    question:
      "During the past 4 weeks, to what extent has your physical health or emotional problems interfered with your normal social activities with family, friends, neighbors, or groups?",
    answer: 3,
  },
  {
    id: 21,
    question: "How much bodily pain have you had during the past 4 weeks?",
    answer: 3,
  },
  {
    id: 22,
    question:
      "During the past 4 weeks, how much did pain interfere with your normal work (including both work outside the home and housework)?",
    answer: 3,
  },
  {
    id: 23,
    question: "Did you feel full of pep?",
    answer: 3,
  },
  {
    id: 24,
    question: "Have you been a very nervous person?",
    answer: 3,
  },
  {
    id: 25,
    question:
      "Have you felt so down in the dumps that nothing could cheer you up?",
    answer: 3,
  },
  {
    id: 26,
    question: "Have you felt calm and peaceful?",
    answer: 3,
  },
  {
    id: 27,
    question: "Did you have a lot of energy?",
    answer: 3,
  },
  {
    id: 28,
    question: "Have you felt downhearted and blue?",
    answer: 3,
  },
  {
    id: 29,
    question: "Did you feel worn out?",
    answer: 3,
  },
  {
    id: 30,
    question: "Have you been a happy person?",
    answer: 3,
  },
  {
    id: 31,
    question: "Did you feel tired?",
    answer: 3,
  },
  {
    id: 32,
    question:
      "During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (like visiting with friends, relatives, etc.)?",
    answer: 3,
  },
  {
    id: 33,
    question: " I seem to get sick a little easier than other people",
    answer: 3,
  },
  {
    id: 34,
    question: "I am as healthy as anybody I know",
    answer: 3,
  },
  {
    id: 35,
    question: "I expect my health to get worse",
    answer: 3,
  },
  {
    id: 36,
    question: "My health is excellent",
    answer: 3,
  },
];

const SF_36 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (email) {
          const response = await axios.get(`${API}/getsf?email=${email}`);
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
        SF-36 Submissions
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

          {/* Show Questions and Answers */}
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
                      ➡️ {selectedEntry["sf" + item.id]}
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

export default SF_36;
