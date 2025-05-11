import { useState, useRef, useEffect } from 'react';
import { useSearchAuction } from './useAuction';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, addRecentSearch } from './SearchSlice';
import Spinner from '../../ui/Spinner';
import {
  formatPrice,
  getDaysRemaining,
  getImageUrl,
  getDisplayTitle,
  getItemId,
} from '../../utils/helpers';

function Search({ heroSection = false }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get searchTerm from Redux store
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const recentSearches = useSelector((state) => state.search.recentSearches);

  // Update searchTerm in Redux when input changes
  const handleInputChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
    // Ensure dropdown is shown when typing
    if (!showDropdown) {
      setShowDropdown(true);
    }
  };

  // Only search if we have at least 2 characters to reduce API calls
  const {
    isLoading,
    auction,
    error: isError,
  } = useSearchAuction(searchTerm.length > 1 ? searchTerm : '');

  // If the search result exists and has items, convert to array, otherwise use empty array
  const auctionResults = auction
    ? Array.isArray(auction)
      ? auction
      : [auction]
    : [];

  // Log search results when they change
  useEffect(() => {
    if (searchTerm.length > 1) {
      console.log('Search term:', searchTerm);
      console.log('Search results:', auction);
      console.log('Processed results:', auctionResults);
    }
  }, [searchTerm, auction, auctionResults]);

  // Track loading state locally to prevent spinner flash
  useEffect(() => {
    if (isLoading) {
      setLocalLoading(true);
    } else {
      // Small delay to prevent flashing
      const timer = setTimeout(() => {
        setLocalLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    // Only add non-empty searches to recent searches
    if (searchTerm.trim()) {
      dispatch(addRecentSearch(searchTerm.trim()));
      setShowDropdown(false);
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSelectResult = (auction) => {
    dispatch(setSearchTerm(getDisplayTitle(auction)));
    setShowDropdown(false);
    navigate(`/card/${getItemId(auction)}`);
  };

  // Handle recent search click
  const handleRecentSearchClick = (term) => {
    console.log('Selected recent search:', term);
    dispatch(setSearchTerm(term));
    setShowDropdown(true); // Keep dropdown open to see results
  };

  return (
    <div
      className={heroSection ? 'relative' : 'relative w-full max-w-md'}
      ref={dropdownRef}
    >
      {/* Form with search input - properly structured */}
      <form onSubmit={handleSearch}>
        <div
          className={
            heroSection
              ? 'mt-4 flex w-full max-w-lg overflow-hidden rounded-full border border-gray-300 shadow-md'
              : 'flex overflow-hidden rounded-full border border-gray-300 shadow-md'
          }
        >
          <input
            type="text"
            placeholder="Search auctions..."
            className={
              heroSection
                ? 'w-full px-4 py-3 text-lg outline-none'
                : 'w-full px-4 py-2 outline-none'
            }
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setShowDropdown(true)}
          />
          <button
            type="submit"
            className="bg-brand-400 cursor-pointer bg-gradient-to-r px-6 py-3 text-white"
          >
            🔍
          </button>
        </div>
      </form>

      {/* Dropdown - positioned outside of form */}
      <div
        className={`absolute ${
          heroSection
            ? 'top-full left-65 z-50 mt-2 w-full max-w-lg -translate-x-1/2 rounded-xl border border-gray-100 bg-white shadow-2xl'
            : 'top-full left-0 z-50 mt-1 w-full rounded-lg bg-white shadow-lg'
        } max-h-80 overflow-y-auto ${showDropdown ? 'block' : 'hidden'}`}
      >
        {/* Show recent searches when no search term or short term */}
        {(!searchTerm || searchTerm.length <= 1) &&
          recentSearches &&
          recentSearches.length > 0 && (
            <div>
              <div
                className={`px-4 py-2 text-sm font-medium text-gray-500 ${heroSection ? 'pt-3 text-center' : ''}`}
              >
                Recent Searches
              </div>
              <ul>
                {recentSearches.map((term, index) => (
                  <li
                    key={`recent-${index}`}
                    className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${heroSection ? 'text-center' : ''}`}
                    onClick={() => handleRecentSearchClick(term)}
                  >
                    <div
                      className={`flex items-center gap-2 ${heroSection ? 'justify-center' : ''}`}
                    >
                      <span className="text-gray-400">🕒</span>
                      <span>{term}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-100"></div>
            </div>
          )}

        {/* Search results when search term is long enough */}
        {searchTerm.length > 1 && (
          <>
            {localLoading ? (
              <div className="p-4 text-center text-gray-500">
                <div className="flex justify-center">
                  <div className="border-t-brand-400 h-5 w-5 animate-spin rounded-full border-2 border-gray-300"></div>
                </div>
                <div className="mt-2">
                  <Spinner />
                </div>
              </div>
            ) : isError ? (
              <div className="p-4 text-center text-red-500">
                Error fetching results
              </div>
            ) : auctionResults.length > 0 ? (
              <ul className={heroSection ? 'p-2' : ''}>
                {auctionResults.map((auction, index) => (
                  <li
                    key={getItemId(auction, index)}
                    className={`cursor-pointer hover:bg-gray-100 ${
                      heroSection ? 'my-1 rounded-lg p-3' : 'px-4 py-2'
                    }`}
                    onClick={() => handleSelectResult(auction)}
                  >
                    {heroSection ? (
                      // Hero section expanded layout
                      <div className="flex items-start">
                        {/* Auction image */}
                        <img
                          src={getImageUrl(auction)}
                          alt={getDisplayTitle(auction)}
                          className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                        />

                        {/* Auction details */}
                        <div className="ml-4 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium">
                                {getDisplayTitle(auction)}
                              </h3>
                              <p className="text-brand-400 mt-1 text-sm font-medium">
                                {getDaysRemaining(auction.endTime)}
                              </p>
                            </div>
                            <p className="text-brand-400 font-bold">
                              {formatPrice(auction.currentPrice)}
                            </p>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                              {auction.category || ''}
                            </p>
                            <span className="text-brand-400 text-sm font-medium">
                              View details →
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Header compact layout
                      <div className="flex items-center">
                        {/* Auction image */}
                        <img
                          src={getImageUrl(
                            auction,
                            'https://via.placeholder.com/40',
                          )}
                          alt={getDisplayTitle(auction)}
                          className="h-10 w-10 flex-shrink-0 rounded object-cover"
                        />

                        {/* Basic info */}
                        <div className="ml-3 flex-1">
                          <div className="font-medium">
                            {getDisplayTitle(auction)}
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-brand-400">
                              {getDaysRemaining(auction.endTime)}
                            </span>
                            <span className="text-gray-500">
                              {formatPrice(auction.currentPrice)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className={`p-4 text-center text-gray-500 ${heroSection ? 'py-6' : ''}`}
              >
                No results found
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Search;
