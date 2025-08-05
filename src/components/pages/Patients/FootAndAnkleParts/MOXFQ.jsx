import { useSelector } from "react-redux";
import FAQItem from "../../../../common/FAQItem";

const MOXFQ = () => {
  const { attemptedSectionPrompts, loading } = useSelector(
    (state) => state.patients
  );
  console.log("attemptedSectionPrompts", attemptedSectionPrompts);
  
  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-left">
        Frequently Asked Questions
      </h2>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        attemptedSectionPrompts.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))
      )}
    </div>
  );
};

export default MOXFQ;
