import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { API } from "../../host";


const items = [
    {
        id: 1,
        question: "In general, would you say your health is:",
        answer: 3
    },
    {
        id: 2,
        question: " Compared to one year ago, how would you rate your health in general now?",
        answer: 2
    },
    {
        id: 3,
        question: "Vigorous activities, such as running, lifting heavy objects, participating in strenuous sports",
        answer: 3
    },
    {
        id: 4,
        question: "Moderate activities, such as moving a table, pushing a vacuum cleaner, bowling, or playing golf",
        answer: 3
    },
    {
        id: 5,
        question: "Lifting or carrying groceries",
        answer: 3
    },
    {
        id: 6,
        question: " Climbing several flights of stairs",
        answer: 3
    },
    {
        id: 7,
        question: "Climbing one flight of stairs",
        answer: 3
    },
    {
        id: 8,
        question: "Bending, kneeling, or stooping",
        answer: 3
    },
    {
        id: 9,
        question: "Walking more than a mile",
        answer: 3
    },
    {
        id: 10,
        question: "Walking several blocks",
        answer: 3
    },
    {
        id: 11,
        question: " Walking one block",
        answer: 3
    },
    {
        id: 12,
        question: "Bathing or dressing yourself",
        answer: 3
    },
    {
        id: 13,
        question: "Cut down the amount of time you spent on work or other activities",
        answer: 3
    },
    {
        id: 14,
        question: "Accomplished less than you would like",
        answer: 3
    },
    {
        id: 15,
        question: "Were limited in the kind of work or other activities",
        answer: 3
    },
    {
        id: 16,
        question: "Had difficulty performing the work or other activities (for example, it took extra effort)",
        answer: 3
    },
    {
        id: 17,
        question: "Cut down the amount of time you spent on work or other activities",
        answer: 3
    },
    {
        id: 18,
        question: "Accomplished less than you would like",
        answer: 3
    },
    {
        id: 19,
        question: "Didn't do work or other activities as carefully as usual",
        answer: 3
    },
    {
        id: 20,
        question: "During the past 4 weeks, to what extent has your physical health or emotional problems interfered with your normal social activities with family, friends, neighbors, or groups?",
        answer: 3
    },
    {
        id: 21,
        question: "How much bodily pain have you had during the past 4 weeks?",
        answer: 3
    },
    {
        id: 22,
        question: "During the past 4 weeks, how much did pain interfere with your normal work (including both work outside the home and housework)?",
        answer: 3
    },
    {
        id: 23,
        question: "Did you feel full of pep?",
        answer: 3
    },
    {
        id: 24,
        question: "Have you been a very nervous person?",
        answer: 3
    },
    {
        id: 25,
        question: "Have you felt so down in the dumps that nothing could cheer you up?",
        answer: 3
    },
    {
        id: 26,
        question: "Have you felt calm and peaceful?",
        answer: 3
    },
    {
        id: 27,
        question: "Did you have a lot of energy?",
        answer: 3
    },
    {
        id: 28,
        question: "Have you felt downhearted and blue?",
        answer: 3
    },
    {
        id: 29,
        question: "Did you feel worn out?",
        answer: 3
    },
    {
        id: 30,
        question: "Have you been a happy person?",
        answer: 3
    },
    {
        id: 31,
        question: "Did you feel tired?",
        answer: 3
    },
    {
        id: 32,
        question: "During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (like visiting with friends, relatives, etc.)?",
        answer: 3
    },
    {
        id: 33,
        question: " I seem to get sick a little easier than other people",
        answer: 3
    },
    {
        id: 34,
        question: "I am as healthy as anybody I know",
        answer: 3
    },
    {
        id: 35,
        question: "I expect my health to get worse",
        answer: 3
    },
    {
        id: 36,
        question: "My health is excellent",
        answer: 3
    }

];


const SF_36 = () => {

    const [Data, setData] = useState([]);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const email = params.get("email");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (email) {
                    const response = await axios.get(`${API}/getsf?email=${email}`);
                    setData(response.data);
                }
            } catch (error) {
                console.error("Error fetching answers:", error);
            }
        };
    
        fetchData();
    }, [email]);
    


    return (
        <div>
            < Tab.Group >
                <div className="grid gap-5 grid-cols-12">
                    <div className="xl:col-span-12 lg:col-span-12 md:col-span-9 col-span-12">
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="space-y-1">
                                    <div>
                                        <div className="accordion shadow-base dark:shadow-none rounded-md">
                                            <div className="flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 dark:text-slate-300 px-8 py-4 bg-white dark:bg-slate-700  rounded-md">
                                                <span>SF_36</span>
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
                                                    <span className="text-center">{Data.map((dataItem) => dataItem["sf" + item.id])}</span>
                                                )}

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </div>
                </div>
            </Tab.Group >
        </div >
    );
};

export default SF_36;
