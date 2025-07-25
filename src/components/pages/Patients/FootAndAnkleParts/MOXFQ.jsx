import FAQItem from "../../../../common/FAQItem";

const FAQList = () => {
  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "You can return any unused item within 30 days of purchase for a full refund.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries. Shipping charges and delivery time may vary.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you'll receive an email with tracking details.",
    },
  ];

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-left">
        Frequently Asked Questions
      </h2>
      {faqs.map((faq, index) => (
        <FAQItem key={index} {...faq} />
      ))}
    </div>
  );
};

export default FAQList;
