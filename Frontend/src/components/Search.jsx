import React from "react";



const Search = () => {


  

  return (
    <>
      
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-16 bg-gray-200 text-black">
  <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-20 items-center">
    {/* Left Text Section */}
    <div className="w-full md:w-1/2">
      <div className="space-y-8">
        <h1 className="text-4xl md:text-5xl font-semibold text-center text-gray-800 mb-12">
          Hello, welcome here to learn something{" "}
          <span className="text-4xl md:text-5xl font-semibold text-center text-gray-800 mb-12">
            new everyday
          </span>
        </h1>
        <p className="text-lg text-black">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad
          obcaecati earum quisquam commodi cupiditate, reprehenderit rerum
          reiciendis, esse distinctio officia laborum. Non fuga mollitia
          rerum harum possimus odit beatae laborum.
        </p>
      </div>
    </div>

    {/* Right Card Section */}
    <div className="w-full md:w-1/2 flex justify-center">
      <div className="w-[520px] h-[460px] bg-white text-black rounded-3xl p-8 shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col justify-between">
        <div>
          <p className="uppercase text-sm font-medium tracking-wide text-black mb-2">
            Your Gateway
          </p>
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">Document Search</h3>
          <p className="text-md md:text-lg mb-6 text-black">
            Easily access and search your legal, academic, or project documents in one click.
          </p>
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 bg-black text-white font-semibold py-3 px-6 rounded-full shadow-md relative overflow-hidden group"
          
        >
          <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition duration-500"></span>
          <span className="hidden md:inline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-spin-slow group-hover:animate-none" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a7 7 0 105.472 12.606l3.326 3.327a1 1 0 001.414-1.414l-3.327-3.326A7 7 0 009 2zM4 9a5 5 0 1110 0A5 5 0 014 9z" clipRule="evenodd" />
            </svg>
          </span>
          <span>Search Documents</span>
        </button>
      </div>
    </div>
  </div>
</div>


    </>
  );
};

export default Search;