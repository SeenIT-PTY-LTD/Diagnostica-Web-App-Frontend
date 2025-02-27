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
    question:
      "It’s terrible and I think it’s never going to get any better.",
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
  const [Data, setData] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");
  useEffect(() => {
    if (email) {

      axios
        .get(`${API}/getpcss?email=${email}`)
        .then((response) => {
          setData(response.data);
          // console.log(response.data)
        })
        .catch((error) => {
          console.error("Error fetching answers:", error);
        });
    }
  }, [email]);

  return (
    <div>
      <Tab.Group>
        <div className="grid gap-5 grid-cols-12">
          <div className="xl:col-span-12 lg:col-span-12 md:col-span-9 col-span-12">
            <Tab.Panels>
              <Tab.Panel>
                <div className="space-y-1">
                  <div>
                    <div className="accordion shadow-base dark:shadow-none rounded-md">
                      <div className="flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 dark:text-slate-300 px-8 py-4 bg-white dark:bg-slate-700  rounded-md">
                        <span>PCS</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="accordion shadow-base dark:shadow-none rounded-md">
                      <div className="flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 dark:text-slate-300 px-8 py-4 bg-white dark:bg-slate-700 rounded-md">
                        <span>SI NO</span>
                        <span>Question</span>
                        <span>Answers</span>
                      </div>
                    </div>
                  </div>

                  {items.map((item, index) => (
                    <div
                      className="accordion shadow-base dark:shadow-none rounded-md"
                      key={index}
                    >
                      <div
                        className={`grid grid-cols-12 cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 dark:text-slate-300 px-8 py-4 bg-white dark:bg-slate-700 rounded-md`}
                      >
                        <span className="col-span-2">{item.id}</span>
                        <span className="col-span-9">{item.question}</span>
                        {Data.length > 0 && (
                          <span className="text-center">{Data.map((dataItem) => dataItem["S" + item.id])}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </div>
      </Tab.Group>
    </div>
  );
};

export default PCS;
