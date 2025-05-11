import { useState, useRef } from 'react';
import {
  FaBook,
  FaTshirt,
  FaCouch,
  FaBasketballBall,
  FaLaptop,
  FaCar,
  FaPalette,
  FaGem,
  FaClock,
  FaHome,
  FaStar,
  FaFire,
  FaSearch,
} from 'react-icons/fa';
import {
  MdTrendingUp,
  MdArrowBackIos,
  MdArrowForwardIos,
} from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Selection() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const currentCategory = currentPath.split('/').pop().toLowerCase();

  const categories = [
    { name: 'Explore', icon: <FaSearch /> },
    { name: 'Trending', icon: <MdTrendingUp /> },
    { name: 'Books', icon: <FaBook /> },
    { name: 'Clothes', icon: <FaTshirt /> },
    { name: 'Furniture', icon: <FaCouch /> },
    { name: 'Sports', icon: <FaBasketballBall /> },
    { name: 'Electronics', icon: <FaLaptop /> },
    { name: 'Vehicles', icon: <FaCar /> },
    { name: 'Art', icon: <FaPalette /> },
    { name: 'Jewelry', icon: <FaGem /> },
    { name: 'Watches', icon: <FaClock /> },
    { name: 'Real Estate', icon: <FaHome /> },
    { name: 'Collectibles', icon: <FaStar /> },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 150; // Adjust for smooth scrolling
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  function handleClick(item, index) {
    // console.log(item);
    setActiveIndex(index);
    if (item.name === 'Explore' || item.name === 'Trending') {
      navigate('/home');
      return;
    }

    navigate('/home/' + item.name.toLowerCase().replace(' ', ''));
  }

  return (
    <div className="sticky top-20 z-1 flex items-center border-t border-gray-300 bg-white p-4 shadow-md">
      {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 flex h-full items-center bg-gradient-to-r from-white pr-2 text-gray-700 hover:text-blue-500"
      >
        <MdArrowBackIos size={24} />
      </button>

      {/* Category Scrollable List */}
      <div
        ref={scrollRef}
        className="flex w-full space-x-4 overflow-hidden scroll-smooth whitespace-nowrap"
      >
        {categories.map((item, index) => (
          <button
            key={item.name}
            onClick={() => handleClick(item, index)}
            className={`flex cursor-pointer items-center space-x-2 rounded-lg border px-4 py-2 text-gray-700 transition-all duration-300 ease-in-out ${
              currentCategory === item.name.toLowerCase()
                ? 'bg-brand-500 text-white shadow-md'
                : 'hover:bg-gray-100'
            }`}
          >
            {item.icon}
            <span className="cursor-pointer">{item.name}</span>
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 z-10 flex h-full items-center bg-gradient-to-l from-white pl-2 text-gray-700 hover:text-blue-500"
      >
        <MdArrowForwardIos size={24} />
      </button>
    </div>
  );
}

export default Selection;
