import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API } from "../../host";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Card from "../../components/ui/Card";


const normalizeDate = (rawDate) => {
  const date = new Date(rawDate);
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
};

const Images = () => {
  const [groupedData, setGroupedData] = useState({});
  const [rangeData, setRangeData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");

  const normalizeDate = (dateStr) => {
    if (!dateStr) return "";
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) {
      const parts = dateStr.split(/[\/\-]/);
      if (parts.length === 3) {
        const [month, day, year] =
          parseInt(parts[0]) > 12
            ? [parts[1], parts[0], parts[2]]
            : [parts[0], parts[1], parts[2]];
        return new Date(`${year}-${month}-${day}`).toISOString().split("T")[0];
      }
      return dateStr;
    }
    return parsed.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (email) {
          const [imageRes, rangeRes, commentRes] = await Promise.all([
            axios.get(`${API}/getimage?email=${email}`),
            axios.get(`${API}/getpainrange?email=${email}`),
            axios.get(`${API}/getcomment?email=${email}`),
          ]);

          const images = imageRes.data || [];

          const ranges = Array.isArray(rangeRes.data)
            ? rangeRes.data
            : rangeRes.data?.result || [];

          const comments = Array.isArray(commentRes.data)
            ? commentRes.data
            : commentRes.data?.result || [];

          // Group entries by normalized date
          const grouped = {};
          images.forEach((entry) => {
            const normDate = normalizeDate(entry.date);
            if (!grouped[normDate]) grouped[normDate] = [];
            grouped[normDate].push(entry);
          });

          setGroupedData(grouped);
          setRangeData(ranges);
          setCommentData(comments);

          const sortedDates = Object.keys(grouped).sort(
            (a, b) => new Date(b) - new Date(a)
          );
          const latestDate = sortedDates[0];
          setSelectedDate(latestDate);
        }
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [email]);

  const getRangeForDate = (date) => {
    return (
      rangeData.find((r) => normalizeDate(r.date) === normalizeDate(date))
        ?.painrange ?? "N/A"
    );
  };

  const getCommentForDate = (date) => {
    return (
      commentData.find((c) => normalizeDate(c.date) === normalizeDate(date))
        ?.comment ?? "N/A"
    );
  };

  const getSessionForDate = (date) => {
    return (
      rangeData.find((r) => normalizeDate(r.date) === normalizeDate(date))
        ?.session ?? "N/A"
    );
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        Pain Image Submissions
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Date Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Object.keys(groupedData)
              .sort((a, b) => new Date(b) - new Date(a))
              .map((date, index) => (
                <button
                  key={index}
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

          {/* Selected Date Details */}
          {selectedDate && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                Submission for {selectedDate}
              </h2>

              <div className="p-4 border rounded-md bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 space-y-2">
                <p className="text-slate-700 dark:text-white">
                  <b>Session:</b> {getSessionForDate(selectedDate)}
                </p>
                <p className="text-slate-700 dark:text-white">
                  <b>Overall Pain Range:</b> {getRangeForDate(selectedDate)}
                </p>
                <p className="text-slate-700 dark:text-white">
                  <b>Comment:</b> {getCommentForDate(selectedDate)}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {/* {
        words.map((word) => {
          return <h1 key={word.id}>{word.spellingWords}</h1>;
        })
      } */}
                {groupedData[selectedDate]
                  ?.slice()
                  .reverse()
                  .flatMap((entry) => {
                    return ["img1", "img2", "img3", "img4", "img5", "img6"]
                      .map((key) => entry[key])
                      .filter((img) => img)
                      .map((img, idx) => 
                        {
                          {console.log("imagedata",`https://newapi.diagnostica.app/images/${img}`)}
                          return (
                        <Card key={img + idx} className="p-4 rounded-md">
                          <div className="bg-white relative h-[350px] flex flex-col justify-center items-center rounded-md">
                            <TransformWrapper initialScale={1}>
                              {({ zoomIn, zoomOut, resetTransform }) => (
                                <>
                                  <TransformComponent>
                                    <img
                                      src={`https://newapi.diagnostica.app/images/${img}`}
                                      alt="Pain submission"
                                      className="max-h-[300px] object-contain"
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
                      )});
                  })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Images;
