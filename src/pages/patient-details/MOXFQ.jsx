import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tab } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import { API } from "../../host";

const items = [
    {
        id: 1,
        question: "I have pain in my foot/ankle",
        answer: 3
    },
    {
        id: 2,
        question: "I avoid walking long distances because of pain in my foot/ankle",
        answer: 2
    },
    {
        id: 3,
        question: "i change the way I walk due to pain in my foot/ankle",
        answer: 3
    },
    {
        id: 4,
        question: "I walk slowly because of pain in my foot/ankle",
        answer: 3
    },
    {
        id: 5,
        question: "I have to stop and rest my foot/ankle because of pain",
        answer: 3
    },
    {
        id: 6,
        question: "I avoid some hard or rough surfaces because of pain in my foot/ankle",
        answer: 3
    },
    {
        id: 7,
        question: "I avoid standing for a long time because of pain in my foot/ankle",
        answer: 3
    },
    {
        id: 8,
        question: "I catch the bus or use the car instead of walking, because of pain in my foot/ankle",
        answer: 3
    },
    {
        id: 9,
        question: "I feel self-conscious about my foot/ankle",
        answer: 3
    },
    {
        id: 10,
        question: "I feel self-conscious about the shoes I have to wear",
        answer: 3
    },
    {
        id: 11,
        question: "The pain in my foot/ankle is more painful in the evening",
        answer: 3
    },
    {
        id: 12,
        question: "I get shooting pains in my foot/ankle",
        answer: 3
    },
    {
        id: 13,
        question: "The pain in my foot/ankle prevents me from carrying out my work/everyday activities",
        answer: 3
    },
    {
        id: 14,
        question: "I am unable to do all mysocial or recreational activities because of pain in my foot/ankle",
        answer: 3
    },
    {
        id: 15,
        question: "During the past 4 weeks how would you describe the pain you usually have in your foot/ankle?",
        answer: 3
    },
    {
        id: 16,
        question: "During the past 4 weeks have you been troubled by pain from your foot/ankle in bed at night?",
        answer: 3
    },

];


const MOXFQ = () => {

    const [Data, setData] = useState([]);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const email = params.get("email");
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (email) {
                    const response = await axios.get(`${API}/getmoxfq?email=${email}`);
                    setData(response.data);
                    //console.log(response.data);
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
                                                <span>MOXFQ</span>
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
                                                <span className="col-span-8">{item.question}</span>
                                                {Data.length > 0 && (
                                                    <span className="col-span-2 text-center">{Data.map((dataItem) => dataItem["m" + item.id])}</span>
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

export default MOXFQ;
