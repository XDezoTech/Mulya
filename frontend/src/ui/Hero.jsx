import { useState, useEffect } from 'react';
import Search from '../features/auctions/Search';

const images = ['one.jpeg', 'two.jpeg'];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="m-auto flex h-[550px] max-w-[95%] items-center justify-between gap-12 px-10 pt-10">
      {/* Left Section */}
      <div className="w-1/2 space-y-6">
        <h2 className="text-6xl leading-tight text-[#260F18]">
          Your One-Stop <br /> Auction Marketplace
        </h2>
        <p className="text-lg text-gray-600">
          Discover trending auctions, bid in real time, and win exclusive
          products across Nepal.
        </p>

        {/* Search Bar */}
        <Search heroSection={true} />
        {/* <div className="mt-4 flex w-full max-w-lg overflow-hidden rounded-full border border-gray-300 shadow-md">
          <input
            type="text"
            placeholder="Search auctions..."
            className="w-full px-4 py-3 text-lg outline-none"
          />
          <button className="bg-brand-400 cursor-pointer bg-gradient-to-r px-6 py-3 text-white">
            🔍
          </button>
        </div> */}
      </div>

      {/* Right Section - Image Slider */}
      <div className="flex w-1/2 flex-col items-center">
        {/* Carousel Wrapper */}
        <div className="relative h-[350px] w-full max-w-lg overflow-hidden rounded-xl shadow-lg">
          <div
            className="flex w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index + 1}`}
                className="h-full w-full flex-shrink-0 object-cover"
              />
            ))}
          </div>
        </div>

        {/* Thumbnails for navigation */}
        <div className="mt-4 flex gap-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-16 w-24 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                currentIndex === index
                  ? 'scale-105 border-[#7D5FFF] shadow-md'
                  : 'border-gray-300 hover:border-gray-500'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Hero;
