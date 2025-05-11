import { useDispatch, useSelector } from 'react-redux';
import { setStartTime, setEndTime } from './sellItemSlice';

function Time() {
  const dispatch = useDispatch();
  const { start_time, end_time } = useSelector((state) => state.sellItem);

  const handleStartTimeChange = (e) => dispatch(setStartTime(e.target.value));
  const handleEndTimeChange = (e) => dispatch(setEndTime(e.target.value));

  return (
    <div className="flex h-84 flex-col justify-center space-y-6">
      <div>
        <label className="block text-lg font-medium text-gray-700">
          Auction Start Time
          <span className="group relative ml-2 cursor-pointer text-gray-500">
            <i className="fas fa-info-circle"></i>
            <span className="absolute bottom-full left-0 mb-1 hidden w-48 rounded-md bg-gray-700 p-2 text-sm text-white shadow-lg group-hover:block">
              Set the date and time when the auction starts.
            </span>
          </span>
        </label>
        <input
          type="datetime-local"
          name="startTime"
          value={start_time || ''}
          onChange={handleStartTimeChange}
          className="input input-bordered w-full rounded-md border-2 border-gray-300 p-3 focus:border-indigo-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700">
          Auction End Time
          <span className="group relative ml-2 cursor-pointer text-gray-500">
            <i className="fas fa-info-circle"></i>
            <span className="absolute bottom-full left-0 mb-1 hidden w-48 rounded-md bg-gray-700 p-2 text-sm text-white shadow-lg group-hover:block">
              Set the date and time when the auction ends.
            </span>
          </span>
        </label>
        <input
          type="datetime-local"
          name="endTime"
          value={end_time || ''}
          onChange={handleEndTimeChange}
          className="input input-bordered w-full rounded-md border-2 border-gray-300 p-3 focus:border-indigo-500 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default Time;
