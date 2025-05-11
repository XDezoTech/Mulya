import { useState } from 'react';
import { FaStar, FaTag, FaDollarSign, FaClock } from 'react-icons/fa';

function Filter() {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [onlyOngoing, setOnlyOngoing] = useState(false);

  // Sample tags - would come from your API in a real app
  const availableTags = [
    'Art',
    'Electronics',
    'Furniture',
    'Jewelry',
    'Books',
    'Fashion',
    'Collectibles',
  ];

  const buttonClasses =
    'group relative flex w-full items-center justify-between border-b border-gray-200 px-6 py-4 text-left transition-all focus:ring-2 focus:ring-inset focus:outline-none hover:bg-brand-50 cursor-pointer';
  const activeButtonClasses =
    'bg-brand-100 focus:ring-brand-500 hover:bg-brand-100';
  const activeTextClasses = 'text-brand-800 text-sm font-medium';
  const inactiveTextClasses =
    'text-sm font-medium text-gray-600 group-hover:text-gray-900';

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating === selectedRating ? 0 : rating);
  };

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value, 10) || 0;
    setPriceRange({ ...priceRange, [type]: value });
  };

  const handleApplyFilters = () => {
    // Here you would pass the filter values to your parent component or API call
    console.log('Applying filters:', {
      priceRange,
      selectedRating,
      selectedTags,
      onlyOngoing,
    });
  };

  return (
    <aside className="col-span-3 rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      {/* Tab Navigation */}
      <div className="-mx-6 -mt-6 mb-8">
        <button className={`${buttonClasses} ${activeButtonClasses}`}>
          <div className="flex items-center gap-3">
            <span className="bg-brand-800 absolute top-0 left-0 h-full w-1"></span>
            <span className={activeTextClasses}>Top</span>
          </div>
          <svg
            className="h-5 w-5 text-blue-600 transition-transform group-hover:translate-x-1"
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
        <button className={buttonClasses}>
          <div className="flex items-center gap-3">
            <span className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-300"></span>
            <span className={inactiveTextClasses}>New</span>
          </div>
          <svg
            className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-gray-600"
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
        <button className={buttonClasses}>
          <div className="flex items-center gap-3">
            <span className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-300"></span>
            <span className={inactiveTextClasses}>Oldest</span>
          </div>
          <svg
            className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-gray-600"
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

      {/* Filter Sections */}
      <div className="space-y-6">
        {/* Price Range Filter */}
        <div>
          <h3 className="text-md mb-3 flex items-center font-semibold text-gray-800">
            <FaDollarSign className="text-brand-500 mr-2" />
            Price Range
          </h3>
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <label className="block text-xs text-gray-500">Min ($)</label>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => handlePriceChange(e, 'min')}
                className="focus:border-brand-500 focus:ring-brand-500 mt-1 w-full rounded-md border border-gray-300 p-2 text-sm"
                min="0"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-xs text-gray-500">Max ($)</label>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => handlePriceChange(e, 'max')}
                className="focus:border-brand-500 focus:ring-brand-500 mt-1 w-full rounded-md border border-gray-300 p-2 text-sm"
                min="0"
              />
            </div>
          </div>
          <div className="mt-4">
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange.max}
              onChange={(e) => handlePriceChange(e, 'max')}
              className="accent-brand-500 w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>$0</span>
              <span>$10,000+</span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className="text-md mb-3 flex items-center font-semibold text-gray-800">
            <FaStar className="text-brand-500 mr-2" />
            Rating
          </h3>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingClick(rating)}
                className="focus:outline-none"
              >
                <FaStar
                  className={`h-6 w-6 ${
                    rating <= selectedRating
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            {selectedRating > 0 && (
              <button
                onClick={() => setSelectedRating(0)}
                className="ml-2 text-xs text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Tags Filter */}
        <div>
          <h3 className="text-md mb-3 flex items-center font-semibold text-gray-800">
            <FaTag className="text-brand-500 mr-2" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-brand-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Ongoing Auctions Toggle */}
        <div>
          <h3 className="text-md mb-3 flex items-center font-semibold text-gray-800">
            <FaClock className="text-brand-500 mr-2" />
            Auction Status
          </h3>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={onlyOngoing}
              onChange={() => setOnlyOngoing(!onlyOngoing)}
              className="peer sr-only"
            />
            <div className="peer peer-checked:bg-brand-500 h-6 w-11 rounded-full bg-gray-200 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              Only show ongoing auctions
            </span>
          </label>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApplyFilters}
          className="bg-brand-500 hover:bg-brand-600 focus:ring-brand-500 mt-6 w-full rounded-lg px-4 py-2 text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}

export default Filter;
