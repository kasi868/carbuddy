import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

const AccordionItem = ({ question, answer, isVisible }) => {
  const [open, setOpen] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="border-b border-gray-200 py-3">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p className="text-indigo-600 font-medium">{question}</p>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      {open && <p className="mt-2 text-sm text-gray-600">{answer}</p>}
    </div>
  );
};

const Faq = () => {
  const [search, setSearch] = useState("");

  // Search logic: convert input and question to lowercase and compare
  const matchesSearch = (text) =>
    text.toLowerCase().includes(search.toLowerCase());

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar />
      {/* Main Content */}
      <main className="bg-black flex-1 px-4 md:px-12 py-10">
        <h1 className="text-2xl font-bold mb-6 text-yellow-400">FAQs</h1>
        {/* Search bar */}
        <div className="flex items-center mb-8 bg-[#2A2A2A] px-4 py-2 rounded shadow-sm border border-gray-700 w-full md:w-96">
          <Search className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full outline-none text-sm bg-transparent text-gray-300"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "General",
              items: [
                {
                  q: "What is Dummy FAQs?",
                  a: "Dummy FAQs are placeholders to simulate real content for design and testing purposes.",
                },
                {
                  q: "Are Dummy FAQs suitable for customer support?",
                  a: "No, dummy FAQs are not meant to be used in production for actual support content.",
                },
                {
                  q: "Do Dummy FAQs require attribution?",
                  a: "No, you do not need to provide attribution unless specified by the content provider.",
                },
              ],
            },
            {
              title: "Payments",
              items: [
                {
                  q: "Can I test my website/app with Dummy Payments?",
                  a: "Yes. Dummy Payments allow developers to test payment flows safely without real transactions.",
                },
                {
                  q: "Are Dummy Payments secure?",
                  a: "Yes, they simulate security behaviors but should not be used in production.",
                },
                {
                  q: "How can I differentiate between a Dummy Payment and a real one?",
                  a: "Dummy payments usually have identifiable test card numbers or environment labels.",
                },
              ],
            },
            {
              title: "Refunds",
              items: [
                {
                  q: "How do I request a refund?",
                  a: "To request a refund, contact customer support via email or phone with your order details and reason.",
                },
                {
                  q: "What is the refund policy?",
                  a: "Refunds are processed within 5-7 business days if the request meets our return criteria.",
                },
                {
                  q: "How long does it take to process a refund?",
                  a: "Refunds may take up to 7 business days after approval to reflect in your bank account.",
                },
              ],
            },
            {
              title: "Support",
              items: [
                {
                  q: "How do I contact customer support?",
                  a: "You can contact us via email, phone, or live chat. Our support team is available Monday to Friday.",
                },
                {
                  q: "Is customer support available 24/7?",
                  a: "No, support is available from 9 AM to 6 PM, Monday to Friday (excluding holidays).",
                },
                {
                  q: "How long does it take to receive a response from customer support?",
                  a: "We typically respond within 24 business hours.",
                },
              ],
            },
          ].map((section, idx) => (
            <div key={idx} className="bg-[#1F1F1F] rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-yellow-400">
                {section.title}
              </h2>
              {section.items.map((item, index) => (
                <AccordionItem
                  key={index}
                  question={item.q}
                  answer={item.a}
                  isVisible={matchesSearch(item.q)}
                />
              ))}
            </div>
          ))}
        </div>

      </main>
    </div>
  );
};

export default Faq;