import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineQuestionMarkCircle, HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by logging into your account and visiting the 'My Orders' section. Once your order is shipped, you'll receive a tracking number via email that you can use to track its progress on our carrier's website."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unworn items with tags attached. Simply initiate a return through your account or contact our customer support team. Refunds are processed within 5-7 business days after we receive the returned item."
    },
    {
      question: "How do I find my correct size?",
      answer: "We provide a detailed size chart on each product page. You can measure yourself and compare with our chart to find the perfect fit. If you're between sizes, we recommend sizing up for a more comfortable fit."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are secure and encrypted for your protection."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 5-7 business days. Express shipping takes 2-3 business days. International shipping varies by location but usually takes 10-14 business days."
    },
    {
      question: "Can I change or cancel my order after placing it?",
      answer: "You can change or cancel your order within 24 hours of placing it, as long as it hasn't been processed for shipment. Please contact our customer support team immediately with your order details."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please check our shipping information page for specific details about your country."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our customer support team through the Contact Us page, by email at support@rabbit.com, or by calling us at 0123-456-789. We're available Monday through Friday, 9 AM to 6 PM."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex">
      {/* Left Side - Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg">
          <div className="flex justify-center mb-6">
            <HiOutlineQuestionMarkCircle className="h-12 w-12 text-black" />
          </div>
          <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 mb-8 text-center">
            Find answers to common questions about our products, shipping, and returns.
          </p>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  {openIndex === index ? (
                    <HiOutlineChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <HiOutlineChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-white border-t border-gray-200">
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link
              to="/contact"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center p-12">
          <div className="text-center text-white">
            <HiOutlineQuestionMarkCircle className="h-32 w-32 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">We're Here to Help</h2>
            <p className="text-gray-300 mb-6">
              Can't find the answer you're looking for? Our customer support team is ready to assist you.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
