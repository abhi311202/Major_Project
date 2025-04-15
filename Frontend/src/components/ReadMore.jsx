import { useState } from "react";
import { FiX } from "react-icons/fi";

const ReadMore = () => {
  const [showModal, setShowModal] = useState(false);

  const item = {
    title: "Welcome to LegalAI",
    imgSrc:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1740&q=80",
    description:
      "LegalAI simplifies legal research and case analysis by providing instant summaries and classifications. Upload a legal document, and our AI will identify whether it’s civil, criminal, corporate, or taxation-related. This tool saves time for law professionals, researchers, and students by offering concise overviews, reducing the need to read lengthy judgments or contracts.",
  };

  return (
    <section className="bg-gray-300 text-black min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center space-y-8">
        <img
          src={item.imgSrc}
          alt={item.title}
          className="rounded-2xl w-full h-72 object-cover shadow-lg"
        />
        <h2 className="text-4xl font-bold">{item.title}</h2>
        <p className="text-black-300 text-lg max-w-3xl mx-auto">
          {item.description.length > 200
            ? `${item.description.substring(0, 200)}...`
            : item.description}
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-black rounded-full text-lg font-medium transition duration-300"
        >
          Read More
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-300 rounded-2xl max-w-4xl w-full p-8 relative text-black shadow-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black transition"
            >
              <FiX />
            </button>
            <img
              src={item.imgSrc}
              alt={item.title}
              className="rounded-xl h-72 w-full object-cover mb-6"
            />
            <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
            <p className="text-black text-lg leading-relaxed">
              {item.description}
              <br />
              <br />
              Our platform allows both summary and classification uploads, providing accurate insights in seconds. Built for the future of law.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReadMore;
