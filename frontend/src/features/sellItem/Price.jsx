import { useDispatch, useSelector } from 'react-redux';
import {
  setStartingPrice,
  setReservePrice,
  setBuyNowPrice,
  setBidIncrementLimit,
} from './sellItemSlice';

function Price() {
  const dispatch = useDispatch();
  const { starting_price, reserve_price, buy_now_price, bid_increment_limit } =
    useSelector((state) => state.sellItem);

  const handleStartingPriceChange = (e) =>
    dispatch(setStartingPrice(e.target.value));
  const handleReservePriceChange = (e) =>
    dispatch(setReservePrice(e.target.value));
  const handleBuyNowPriceChange = (e) =>
    dispatch(setBuyNowPrice(e.target.value));
  const handleBidIncrementChange = (e) =>
    dispatch(setBidIncrementLimit(e.target.value));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Price Data:', {
      starting_price,
      reserve_price,
      buy_now_price,
      bid_increment_limit,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-84 flex-col justify-center space-y-6"
    >
      <div>
        <label className="block text-lg font-medium text-gray-700">
          Starting Price
          <span className="group relative ml-2 cursor-pointer text-gray-500">
            <i className="fas fa-info-circle"></i>
            <span className="absolute bottom-full left-0 mb-1 hidden w-48 rounded-md bg-gray-700 p-2 text-sm text-white shadow-lg group-hover:block">
              Set the initial price for the auction.
            </span>
          </span>
        </label>
        <input
          type="number"
          name="startingPrice"
          value={starting_price}
          onChange={handleStartingPriceChange}
          className="input input-bordered w-full rounded-md border-2 border-gray-300 p-3 focus:border-indigo-500 focus:outline-none"
          placeholder="Enter starting price"
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700">
          Reserve Price
          <span className="group relative ml-2 cursor-pointer text-gray-500">
            <i className="fas fa-info-circle"></i>
            <span className="absolute bottom-full left-0 mb-1 hidden w-48 rounded-md bg-gray-700 p-2 text-sm text-white shadow-lg group-hover:block">
              The minimum price you are willing to accept.
            </span>
          </span>
        </label>
        <input
          type="number"
          name="reservePrice"
          value={reserve_price}
          onChange={handleReservePriceChange}
          className="input input-bordered w-full rounded-md border-2 border-gray-300 p-3 focus:border-indigo-500 focus:outline-none"
          placeholder="Enter reserve price"
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700">
          Buy Now Price
          <span className="group relative ml-2 cursor-pointer text-gray-500">
            <i className="fas fa-info-circle"></i>
            <span className="absolute bottom-full left-0 mb-1 hidden w-48 rounded-md bg-gray-700 p-2 text-sm text-white shadow-lg group-hover:block">
              The price at which a buyer can purchase immediately.
            </span>
          </span>
        </label>
        <input
          type="number"
          name="buyNowPrice"
          value={buy_now_price}
          onChange={handleBuyNowPriceChange}
          className="input input-bordered w-full rounded-md border-2 border-gray-300 p-3 focus:border-indigo-500 focus:outline-none"
          placeholder="Enter buy now price"
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700">
          Bid Increment Limit
          <span className="group relative ml-2 cursor-pointer text-gray-500">
            <i className="fas fa-info-circle"></i>
            <span className="absolute bottom-full left-0 mb-1 hidden w-48 rounded-md bg-gray-700 p-2 text-sm text-white shadow-lg group-hover:block">
              The minimum increment for each bid.
            </span>
          </span>
        </label>
        <input
          type="number"
          name="bidIncrement"
          value={bid_increment_limit}
          onChange={handleBidIncrementChange}
          className="input input-bordered w-full rounded-md border-2 border-gray-300 p-3 focus:border-indigo-500 focus:outline-none"
          placeholder="Enter bid increment"
        />
      </div>
    </form>
  );
}

export default Price;
