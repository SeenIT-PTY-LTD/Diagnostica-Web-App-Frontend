import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API } from "../../host";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Card from "../../components/ui/Card";

const Images = () => {
  const [data, setData] = useState([]);
  const [rangeList, setRangeList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (email) {
          const imagesRes = await axios.get(`${API}/getimage?email=${email}`);
          const rangeRes = await axios.get(`${API}/getpainrange?email=${email}`);
          const commentRes = await axios.get(`${API}/getcomment?email=${email}`);

          const combinedEntries = imagesRes.data.map((entry, index) => ({
            ...entry,
            ...rangeRes.data[index],
            ...commentRes.data[index],
          }));

          const sortedEntries = combinedEntries.sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateB - dateA;
          });

          setData(sortedEntries);
          setRangeList(rangeRes.data);
          setCommentList(commentRes.data);

          if (sortedEntries.length > 0) {
            setSelectedEntry(sortedEntries[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching image data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [email]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        Pain Image Submissions
      </h1>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Submission Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data.map((entry, index) => (
              <button
                key={index}
                onClick={() => setSelectedEntry(entry)}
                className={`border rounded-lg p-4 shadow-md text-center ${
                  selectedEntry?.img === entry.img
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

          {/* Selected Entry Detail */}
          {selectedEntry && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                Submission from {selectedEntry.date} {selectedEntry.time}
              </h2>

              <div className="space-y-4">
                <div className="p-4 border rounded-md bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                  <p className="text-slate-700 dark:text-white">
                    <b>Session:</b> {selectedEntry.session ?? "N/A"}
                  </p>
                  <p className="text-slate-700 dark:text-white mt-2">
                    <b>Overall Pain Range:</b> {selectedEntry.painrange ?? 0}
                  </p>
                  <p className="text-slate-700 dark:text-white mt-2">
                    <b>Comment:</b> {selectedEntry.comment ?? "N/A"}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedEntry.img && (
                    <Card bodyClass="p-4 rounded-md" className="group">
                      <div className="bg-white relative h-[350px] flex flex-col justify-center items-center rounded-md">
                        <TransformWrapper initialScale={1}>
                          {({ zoomIn, zoomOut, resetTransform }) => (
                            <>
                              <TransformComponent>
                                <img
                                  className="zoomable-image"
                                  src={`https://newapi.diagnostica.app/images/${selectedEntry.img}`}
                                  alt="Foot pain image"
                                />
                              </TransformComponent>
                              <div className="tools flex gap-6 items-center justify-evenly pt-3">
                                <button onClick={() => zoomOut()}>
                                  <i className="bi bi-zoom-out"></i>
                                </button>
                                <button onClick={() => resetTransform()}>
                                  <i
                                    className="bi bi-x-circle-fill"
                                    style={{ color: "red" }}
                                  ></i>
                                </button>
                                <button onClick={() => zoomIn()}>
                                  <i className="bi bi-zoom-in"></i>
                                </button>
                              </div>
                            </>
                          )}
                        </TransformWrapper>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Images;
