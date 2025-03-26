import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { API } from "../../host";


const items = [
    {
        id: 1,
        question: "Mobility",
        answer: 3
    },
    {
        id: 2,
        question: "Self-Care",
        answer: 3
    },
    {
        id: 3,
        question: "Usual Activities",
        answer: 3
    },
    { 
        id: 4,
        question: "Pain/Discomfort",
        answer: 3
    },
    {
        id: 5,
        question: "Anxiety/Depression",
        answer: 3
    },
    {
        id: 6,
        question: "overall",
        answer: 3
    },

];


const EQ5D = () => {

    const [Data, setData] = useState([]);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const email = params.get("email");

    useEffect(() => {
        if (email) {
            axios
                .get(`${API}/geteq?email=${email}`)
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching answers:", error);

                });
        }
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
                                                <span>EQ-5D</span>
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
                                            {item.header && ( // Check if header exists
                                                <div className="flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 dark:text-slate-300 px-4 py-3 bg-white dark:bg-slate-700 rounded-md">
                                                    <span  className="font-bold">{item.header}</span>
                                                </div>
                                            )}
                                            <div
                                                className={`grid grid-cols-12 cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 dark:text-slate-300 px-8 py-4 bg-white dark:bg-slate-700 rounded-md`}
                                            >
                                                <span className="col-span-2">{item.id}</span>
                                                <span className="col-span-9">{item.question}</span>
                                                {Data.length > 0 && (
                                                    <span className="text-center">{Data.map((dataItem) => dataItem["eq" + item.id])}</span>
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

export default EQ5D;
