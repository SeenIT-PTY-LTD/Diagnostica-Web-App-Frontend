import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API } from "../../host";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Card from "../../components/ui/Card";
const items = [
  {
    id: 1,
    image: "I worry all the time about whether the pain will end.",
    pain_range: 1,
    comment: "pain in front foot",
  },
];

const Images = () => {
  const [Data, setData] = useState([]);
  const [Range, setRange] = useState();
  const [Comment, setComment] = useState();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const response = await axios.get(`${API}/getimage?email=${email}`);
          setData(response.data);
          //console.log(response.data)
          const range = await axios.get(`${API}/getpainrange?email=${email}`);
          setRange(range.data);

          const comment = await axios.get(`${API}/getcomment?email=${email}`);
          setComment(comment.data);
          //   console.log(comment.data);
        }
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

    fetchData();
  }, [email]);

  return (
    <div>
      <Tab.Group>
        <div className="grid gap-5 grid-cols-12">
          <div className="xl:col-span-12 lg:col-span-12 md:col-span-9 col-span-12">
            <Tab.Panels>
              <Tab.Panel>
                <div className="space-y-2">
                  <div>
                    <div className="accordion shadow-base dark:shadow-none rounded-md">
                      <div className="flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 dark:text-slate-300 px-8 py-4 bg-white dark:bg-slate-700  rounded-md">
                        <span>
                          <b>Session:</b> {Range ? Range.session : "N/A"}
                        </span>
                        <span>
                          <b>Overll Painrange :</b>{" "}
                          {Range ? Range.painrange : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="accordion shadow-base dark:shadow-none rounded-md">
                    <div className="flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 dark:text-slate-300 px-8 py-4 bg-white dark:bg-slate-700  rounded-md">
                      <span>
                        <b>Comment:</b> {Comment ? Comment.comment : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </div>
      </Tab.Group>
      <div className="grid grid-cols-3 gap-3 h-max mt-2">
        {Data.length > 0 &&
          Data.map(
            (dataItem, dataIndex) =>
              dataItem.img && (
                <Card
                  bodyClass="p-4 rounded-md"
                  className="group"
                  key={dataIndex}
                >
                  <div className="bg-white dark:rounded relative h-[350px] flex flex-col justify-center items-center mb-3 rounded-md">
                    <TransformWrapper initialScale={1}>
                      {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                          <TransformComponent>
                            <img
                              className="zoomable-image"
                              src={`https://newapi.diagnostica.app/images/${dataItem.img}`}
                              alt={`Foot image ${dataIndex + 1}`}
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
              )
          )}
      </div>
    </div>
  );
};

export default Images;
