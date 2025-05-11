import { NavLink } from 'react-router-dom';

function Card({
  auctionTitle,
  auctionImages = [],
  sellerImageUrl,
  auctionId,

  currentPrice,
  reservePrice,
  startTime,
  endTime,
  category,
  description,
  title = 'Image Title',
  author = 'John Doe',
  imageUrl = '/one.jpeg',
  profileUrl = '/girl.jpeg',
  price = 'Rs. 100',
  daysLeft = '10 days left',
  views = '1.2k',
  likes = '245',
}) {
  return (
    <NavLink
      to={`/card/${auctionId}`}
      className="group relative flex h-[360px] flex-col rounded-lg transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      aria-label={`View ${auctionTitle} by ${author}`}
    >
      {/* Image Container - 70% height */}
      <div className="relative h-[70%]">
        <img
          src={auctionImages[0] || imageUrl}
          alt={auctionTitle}
          className="h-full w-full rounded-t-lg object-cover"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 rounded-t-lg bg-black/40 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
          <h3 className="absolute top-4 left-4 font-medium text-white">
            {author}
          </h3>
          <button
            className="rounded-full bg-white/20 p-2 transition-all duration-300 hover:scale-110 hover:bg-white/40 focus:ring-2 focus:ring-white/50 focus:outline-none"
            onClick={(e) => e.preventDefault()}
            aria-label="Like"
          >
            <svg
              className="h-6 w-6 text-white"
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
          </button>
          <button
            className="rounded-full bg-white/20 p-2 transition-all duration-300 hover:scale-110 hover:bg-white/40 focus:ring-2 focus:ring-white/50 focus:outline-none"
            onClick={(e) => e.preventDefault()}
            aria-label="Save"
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Container - 30% height */}
      <div className="flex h-[30%] flex-col rounded-b-lg bg-white p-4">
        {/* Title and Profile Section */}
        <div className="mb-4 flex items-center gap-3">
          <img
            src={sellerImageUrl}
            alt={`${author}'s profile`}
            className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
          />
          <h2 className="line-clamp-1 font-medium text-gray-900">
            {auctionTitle}
          </h2>
        </div>

        {/* Stats Section */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-brand-600 font-medium">{price}</span>
            <span className="text-sm text-gray-500">{daysLeft}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <svg
                className="h-5 w-5 text-gray-400"
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
              <span className="text-sm text-gray-500">{views}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                className="h-5 w-5 text-gray-400"
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
              <span className="text-sm text-gray-500">{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default Card;
