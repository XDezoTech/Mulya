import { useRef } from 'react';
import Card from './Card';

function CardViewSlider() {
  const sliderRef = useRef(null);
  const scroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount =
      direction === 'left' ? -slider.offsetWidth : slider.offsetWidth;

    slider.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };
  const similarProducts = [
    {
      id: 1,
      title: 'Modern Admin Dashboard',
      imageUrl: '/one.jpeg',
      author: 'Alex Chen',
      profileUrl: '/girl.jpeg',
      price: 'Rs. 900',
      daysLeft: '3 days left',
      views: '1.2k',
      likes: '234',
    },
    {
      id: 2,
      title: 'Dark Theme Dashboard',
      imageUrl: '/two.jpeg',
      author: 'Emma Wilson',
      profileUrl: '/girl.jpeg',
      price: 'Rs. 1,100',
      daysLeft: '7 days left',
      views: '2.3k',
      likes: '186',
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      imageUrl: '/one.jpeg',
      author: 'John Smith',
      profileUrl: '/girl.jpeg',
      price: 'Rs. 950',
      daysLeft: '4 days left',
      views: '1.8k',
      likes: '312',
    },
    {
      id: 4,
      title: 'E-commerce Dashboard',
      imageUrl: '/two.jpeg',
      author: 'Lisa Wang',
      profileUrl: '/girl.jpeg',
      price: 'Rs. 1,300',
      daysLeft: '2 days left',
      views: '3.1k',
      likes: '156',
    },
    {
      id: 5,
      title: 'Mobile Dashboard UI',
      imageUrl: '/one.jpeg',
      author: 'Sarah Parker',
      profileUrl: '/girl.jpeg',
      price: 'Rs. 1,150',
      daysLeft: '6 days left',
      views: '2.5k',
      likes: '198',
    },
    {
      id: 6,
      title: 'Financial Dashboard',
      imageUrl: '/two.jpeg',
      author: 'Mike Johnson',
      profileUrl: '/girl.jpeg',
      price: 'Rs. 1,400',
      daysLeft: '8 days left',
      views: '1.9k',
      likes: '267',
    },
  ];
  return (
    <div className="mt-16 border-t border-gray-200 pt-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            You might also like
          </h2>
          <p className="mt-2 text-gray-600">
            Check out similar products you might be interested in
          </p>
        </div>

        {/* Slider Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="hover:text-brand-600 focus:ring-brand-600 rounded-full p-2 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            aria-label="Scroll left"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="hover:text-brand-600 focus:ring-brand-600 rounded-full p-2 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            aria-label="Scroll right"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="mt-8">
        <div
          ref={sliderRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {similarProducts.map((product) => (
            <div
              key={product.id}
              className="min-w-[280px] flex-shrink-0 snap-start"
            >
              <Card
                title={product.title}
                author={product.author}
                imageUrl={product.imageUrl}
                profileUrl={product.profileUrl}
                price={product.price}
                daysLeft={product.daysLeft}
                views={product.views}
                likes={product.likes}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardViewSlider;
