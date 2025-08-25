import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Stethoscope, Home, ArrowLeft } from "lucide-react";
import Button from "./Button";

const NotFound = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center px-4">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-8 flex justify-center"
          variants={itemVariants}
        >
          <div className="relative">
            <motion.div
              className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-4"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Stethoscope className="w-16 h-16 text-blue-600" />
            </motion.div>
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              !
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-6xl font-bold text-gray-800 mb-4 font-heading">
            4<span className="text-blue-600">0</span>4
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 font-heading">
            Diagnosis: Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2 font-body">
            The page you're looking for seems to have gone missing from our
            medical records.
          </p>
          <p className="text-gray-500 font-body">
            Don't worry, our diagnostic team is here to help you find what you
            need.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <Button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Button>

          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-sm text-gray-400 mt-8 font-body"
        >
          Error Code: 404 | Diagnostica Medical Platform
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
