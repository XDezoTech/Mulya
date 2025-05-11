import { useRef, useState } from 'react';
import Card from '../ui/Card';
import Filter from '../ui/Filter';
import Header from '../ui/Header';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useGetAuctionById } from '../features/auctions/useAuction';
import Spinner from '../ui/Spinner';
import CardViewSlider from '../ui/CardViewSlider';
import CountdownTimer from '../components/CountdownTimer';
import { formatPrice } from '../utils/helpers';

import ReactDOM from 'react-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function CardView() {
  const { id } = useParams();
  const { auction, isLoading, error } = useGetAuctionById(id);
  const sliderRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load auction for {id}.</p>;
  console.log(auction);

  // Slider control functions
  const scroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount =
      direction === 'left' ? -slider.offsetWidth : slider.offsetWidth;

    slider.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % auction.auctionImages.length,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + auction.auctionImages.length) %
        auction.auctionImages.length,
    );
  };

  // Sample data - in a real app, this would come from an API or route params
  const cardData = {
    id: 1,
    title: 'Modern Dashboard Design',
    description:
      'A clean and modern dashboard design with dark mode support. Built with React and Tailwind CSS. Features include responsive layout, interactive charts, and customizable widgets.',
    author: {
      name: 'Sarah Johnson',
      profileUrl: '/girl.jpeg',
      location: 'San Francisco, CA',
      followers: '12.5k',
      following: '1.2k',
      projects: '86',
    },
    images: ['/one.jpeg', '/two.jpeg', '/one.jpeg'],
    price: 'Rs. 1,200',
    daysLeft: '5 days left',
    views: '2.1k',
    likes: '342',
    tags: ['Dashboard', 'UI Design', 'Dark Mode', 'React'],
  };

  // Sample bidders data
  const bidders = [
    {
      id: 1,
      name: 'Michael Chen',
      profileUrl: '/girl.jpeg',
      price: 'Rs. 1,500',
      time: '2 hours ago',
      isTop: true,
    },
    {
      id: 2,
      name: 'Emma Watson',
      profileUrl: '/girl.jpeg',
      price: 'Rs. 1,400',
      time: '5 hours ago',
      isTop: false,
    },
    {
      id: 3,
      name: 'James Wilson',
      profileUrl: '/girl.jpeg',
      price: 'Rs. 1,350',
      time: '8 hours ago',
      isTop: false,
    },
  ];

  // More sample products for sliding
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
    <>
      {/* <Header cardView={true} /> */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="breadcrumbs text-md">
          <ul>
            <li>
              <Link to={'/home'}>Home</Link>
            </li>
            <li>
              {auction.category ? (
                <Link to={`/home/${auction.category.toLowerCase()}`}>
                  {auction.category.charAt(0).toUpperCase() +
                    auction.category.slice(1).toLowerCase()}
                </Link>
              ) : (
                <Link to={'/home'}>Explore</Link>
              )}
            </li>
            <li className="text-[#808080]">{auction.auctionTitle}</li>
          </ul>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content - Left Side */}

          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
              <img
                src={auction.auctionImages[0]}
                alt={cardData.title}
                className="h-full w-full cursor-pointer object-cover"
                onClick={() => handleImageClick(0)}
              />
            </div>

            {/* Additional Images */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              {auction.auctionImages.slice(1, 4).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100"
                  onClick={() => handleImageClick(index + 1)}
                >
                  <img
                    src={image}
                    alt={`${auction.auctionTitle} - View ${index + 2}`}
                    className="h-full w-full cursor-pointer object-cover"
                  />
                  {index === 2 && auction.auctionImages.length > 4 && (
                    <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black text-lg text-white">
                      +{auction.auctionImages.length - 3} images
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Image Preview Modal */}
            {isModalOpen &&
              ReactDOM.createPortal(
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                  <div className="relative h-full max-h-[80%] w-[70%] rounded-lg bg-white shadow-lg">
                    <button
                      onClick={closeModal}
                      className="absolute top-0 right-0 m-2 cursor-pointer text-4xl text-gray-500 hover:text-gray-700"
                    >
                      &times;
                    </button>
                    <div className="flex h-full flex-col items-center justify-between p-4">
                      <div className="flex h-96 w-[90%] items-center justify-center overflow-hidden">
                        <button
                          onClick={prevImage}
                          className="cursor-pointer text-gray-500 hover:text-gray-700"
                        >
                          <FaArrowLeft size={24} />
                        </button>

                        <div className="flex h-full w-full flex-1 items-center justify-center">
                          <img
                            src={auction.auctionImages[currentImageIndex]}
                            alt="Preview"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        <button
                          onClick={nextImage}
                          className="cursor-pointer text-gray-500 hover:text-gray-700"
                        >
                          <FaArrowRight size={24} />
                        </button>
                      </div>

                      <div className="mt-4 flex justify-center">
                        <div className="mx-4 flex">
                          {auction.auctionImages.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              className={`h-16 w-16 cursor-pointer object-cover ${index === currentImageIndex ? 'border-2 border-blue-500' : ''}`}
                              onClick={() => setCurrentImageIndex(index)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>,
                document.body,
              )}

            {/* Content Sections */}
            <div className="mt-8 space-y-8">
              {/* Title and Overview */}
              <section>
                <h1 className="text-2xl font-bold text-gray-900">
                  {auction.auctionTitle}
                </h1>
                <div className="mt-4 flex items-center gap-4">
                  <span className="text-lg font-semibold text-blue-600">
                    {cardData.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {cardData.daysLeft}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>•</span>
                    <span>{cardData.views} views</span>
                    <span>•</span>
                    <span>{cardData.likes} likes</span>
                  </div>
                </div>
              </section>

              {/* Description */}
              <section>
                <h2 className="mb-3 text-lg font-semibold text-gray-900">
                  Description
                </h2>
                <p className="leading-relaxed text-gray-600">
                  {cardData.description}
                </p>
              </section>

              {/* Features or Specifications */}
              <section className="border-t border-gray-200 pt-8">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Features
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Responsive Design
                      </h3>
                      <p className="text-sm text-gray-500">
                        Adapts to all screen sizes
                      </p>
                    </div>
                  </div>
                  {/* Add more features as needed */}
                </div>
              </section>

              {/* Tags */}
              <section className="border-t border-gray-200 pt-8">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {cardData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              {/* Bidders Leaderboard */}
              <section className="border-t border-gray-200 pt-8">
                <h2 className="mb-6 text-lg font-semibold text-gray-900">
                  Top Bidders
                  <span className="ml-2 text-sm font-medium text-gray-500">
                    ({bidders.length})
                  </span>
                </h2>

                <div className="space-y-4">
                  {bidders.map((bidder) => (
                    <div
                      key={bidder.id}
                      className={`flex items-center justify-between rounded-lg border p-4 transition-all hover:border-blue-100 hover:bg-blue-50 ${
                        bidder.isTop
                          ? 'border-blue-200 bg-blue-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      {/* Bidder Info */}
                      <div className="flex items-center gap-4">
                        <img
                          src={bidder.profileUrl}
                          alt={bidder.name}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {bidder.name}
                            {bidder.isTop && (
                              <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                Top Bid
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-500">{bidder.time}</p>
                        </div>
                      </div>

                      {/* Bid Amount */}
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {bidder.price}
                        </div>
                        {bidder.isTop && (
                          <div className="mt-1 flex items-center justify-end gap-1 text-xs text-green-600">
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                              />
                            </svg>
                            Highest bid
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-6 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                  View All Bids
                </button>
              </section>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-18">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={cardData.author.profileUrl}
                    alt={cardData.author.name}
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-white"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {cardData.author.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {cardData.author.location}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4 border-y border-gray-200 py-6">
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-900">
                      {cardData.author.followers}
                    </div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-900">
                      {cardData.author.following}
                    </div>
                    <div className="text-sm text-gray-500">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-900">
                      {cardData.author.projects}
                    </div>
                    <div className="text-sm text-gray-500">Projects</div>
                  </div>
                </div>

                {/* Price and Time */}
                <div className="mt-6">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-brand-700 text-2xl font-bold">
                        {auction.currentPrice}
                      </span>
                      <span className="text-sm text-gray-500">
                        Reserve: {auction.reservePrice}
                      </span>
                    </div>

                    {/* Countdown Timer */}
                    <div className="bg-brand-50 rounded-lg p-3">
                      <h3 className="mb-2 text-sm font-medium text-gray-600">
                        Time Remaining
                      </h3>
                      <CountdownTimer endTime={auction.endTime} />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <button className="bg-brand-800 hover:bg-brand-600 w-full cursor-pointer rounded-lg px-4 py-3 text-sm font-medium text-white transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                    Purchase Now
                  </button>
                  <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                    Message Author
                  </button>
                </div>

                {/* Engagement Stats */}
                <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>{cardData.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>{cardData.likes} likes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section with Slider */}
        <CardViewSlider />
      </div>
    </>
  );
}

export default CardView;
