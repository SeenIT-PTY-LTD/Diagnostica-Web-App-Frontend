import { useSelector } from "react-redux";
import FAQItem from "../../../../common/FAQItem";
import Loading from "../../../../common/Loading";

const EQ5D = () => {
  const { attemptedSectionPrompts, loading } = useSelector(
    (state) => state.patients
  );

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-left">
        Frequently Asked Questions
      </h2>

      {loading ? (
        <Loading />
      ) : attemptedSectionPrompts.length === 0 ? (
        <div className="flex justify-start items-start py-10 min-h-[200px]">
          <p className="text-gray-500 font-bold text-lg">No data found</p>
        </div>
      ) : (
        attemptedSectionPrompts.map((section) =>
          section?.data?.map((faq, index) => (
            <FAQItem
              key={faq.question + index}
              question={faq.question}
              answer={faq.answer}
              number={index + 1}
              date={index === 0 ? section.date : null} // only show date once
            />
          ))
        )
      )}
    </div>
  );
};

export default EQ5D;
