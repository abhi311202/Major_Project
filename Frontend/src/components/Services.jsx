import React, { useRef } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";

const services = [
  {
    title: "Ask LegalAI",
    heading: "Summarisation",
    description:
      "AI-driven tool that condenses long documents into concise summaries for quick insights.",
  },
  {
    title: "Ask LegalAI",
    heading: "Classification",
    description:
      "AI that categorizes documents into specific types, improving organization and retrieval.",
  },
  {
    title: "Ask LegalAI",
    heading: "Q&A Chatbot",
    description:
      "Intelligent chatbot that answers user questions by extracting relevant information from documents.",
  },
  {
    title: "Ask LegalAI",
    heading: "Vision Q&A Chatbot",
    description:
      "A vision-enabled chatbot that answers questions based on image or visual content analysis.",
  },
  {
    title: "Ask LegalAI",
    heading: "Agent",
    description:
      "AI-powered agent that assists users with tasks by providing automated responses and actions.",
  },
 
];

export const Services = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-16 w-full relative">
      <h2 className="text-4xl md:text-5xl font-semibold text-center text-gray-800 mb-12">
        Our Services
      </h2>

      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
      >
        <FiArrowLeft />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
      >
        <FiArrowRight />
      </button>

      {/* Card Slider */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-hidden scroll-smooth no-scrollbar px-4 md:px-8"
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="w-[400px] h-[400px] flex-shrink-0 bg-white text-gray-900 rounded-3xl p-8 shadow-xl hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
          >
            <p className="uppercase text-sm font-medium tracking-wide mb-2 text-black">
              {service.title}
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">{service.heading}</h3>
            <p className="text-md md:text-lg mb-6 text-black">{service.description}</p>
            <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition">
              Explore <FiArrowUpRight />
            </button>
          </div> 
        ))}
      </div>
    </div>
  );
};
