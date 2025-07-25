import React from "react";
import Image from "../../../../common/Image";

const dummyData = {
  "2025-07-14": {
    session: "Morning",
    painrange: "3-6",
    comment: "Mild discomfort in lower back.",
    images: [
      "https://www.cielhr.com/wp-content/uploads/2020/10/dummy-image.jpg",
      "https://www.cielhr.com/wp-content/uploads/2020/10/dummy-image.jpg",
    ],
  },
  "2025-07-13": {
    session: "Evening",
    painrange: "5-8",
    comment: "Sharp pain after work.",
    images: [
      "https://www.cielhr.com/wp-content/uploads/2020/10/dummy-image.jpg",
    ],
  },
};

const ElbowImages = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      <Image data={dummyData} />
    </div>
  );
};

export default ElbowImages;
