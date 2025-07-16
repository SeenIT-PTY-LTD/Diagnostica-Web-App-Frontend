import { ArrowRight } from "lucide-react";

const FAQItem = ({ question, answer, number }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 mb-4 shadow-sm">
      <p className="text-gray-800 font-semibold">{question}</p>
      <div className="flex items-center mt-2 text-sm text-gray-700">
        <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
        <span>{answer}</span>
      </div>
    </div>
  );
};

export default FAQItem;
