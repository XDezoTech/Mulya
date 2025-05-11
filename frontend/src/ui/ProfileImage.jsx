import { FaCircle } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authentication/AuthSlice';

function ProfileImage({ imageUrl, loading }) {
  const [status, setStatus] = useState('Online');
  const dispatch = useDispatch();

  const statusColor = {
    Online: 'bg-green-500',
    Offline: 'bg-red-500',
    Idle: 'bg-yellow-500',
  };

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className="dropdown dropdown-end relative">
      {/* trigger */}
      <label
        tabIndex={0}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-2 border-gray-300"
      >
        {loading ? (
          <span>Loading...</span>
        ) : (
          <img
            src={imageUrl}
            alt="Profile"
            className="h-full w-full rounded-full object-cover"
          />
        )}
        <span
          className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white ${statusColor[status]}`}
        />
      </label>

      {/* dropdown content */}
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-10 mt-2 w-52 p-2 shadow-sm"
      >
        <li>
          <a onClick={() => setStatus('Online')}>
            <FaCircle className="mr-2 text-green-500" />
            Online
          </a>
        </li>
        <li>
          <a onClick={() => setStatus('Offline')}>
            <FaCircle className="mr-2 text-red-500" />
            Offline
          </a>
        </li>
        <li>
          <a onClick={() => setStatus('Idle')}>
            <FaCircle className="mr-2 text-yellow-500" />
            Idle
          </a>
        </li>
        <li>
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </div>
  );
}

export default ProfileImage;
