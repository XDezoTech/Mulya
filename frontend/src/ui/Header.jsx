import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaSearch,
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
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaRegUserCircle,
  FaRegEnvelope,
  FaRegBell,
} from 'react-icons/fa';
import { MdOutlinePersonOutline, MdTrendingUp } from 'react-icons/md';
import LoginForm from '../features/authentication/LoginForm';
import SignupForm from '../features/authentication/SignupForm';
import ProfileImage from './ProfileImage';

import { logout } from '../features/authentication/AuthSlice';
import { HiOutlineChatAlt2, HiOutlineUser } from 'react-icons/hi';
import { FiMessageCircle, FiUser, FiUserCheck } from 'react-icons/fi';
import { BiUserCircle } from 'react-icons/bi';
import Search from '../features/auctions/Search';

function Header({ homeView = false }) {
  const [showSearch, setShowSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const dispatch = useDispatch();
  const { isLogin, imageUrl, loading } = useSelector((state) => state.auth);

  const location = useLocation();
  // const homeView = location.pathname === '/home';
  // console.log(imageUrl);
  // console.log(isLoading);

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

  useEffect(() => {
    const handleScroll = () => {
      setShowSearch(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const switchToLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  const switchToSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="sticky top-0 z-10 m-auto mt-2 flex w-95/100 items-center justify-between bg-white p-4">
        {/* Left Section */}
        <div className="flex items-center gap-4 space-x-6">
          <Link
            to="/home"
            className="mr-15 text-2xl font-bold hover:opacity-75"
          >
            Mulya
          </Link>
          {/* Search Bar - Appears on Scroll */}
          {(showSearch || !homeView) && <Search />}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex cursor-pointer items-center gap-2 font-semibold text-[#260F18] hover:opacity-50"
            >
              Categories
              <i
                className={`fas fa-chevron-${isOpen ? 'up' : 'down'} transition-transform duration-300`}
              ></i>
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 z-50 mt-2 w-64 rounded-lg bg-white py-2 shadow-lg">
                {categories.map((category) => (
                  <a
                    key={category.name}
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 transition-colors duration-200 hover:bg-gray-100"
                  >
                    <span className="text-gray-600">{category.icon}</span>
                    <span className="text-gray-800">{category.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="#" className="font-semibold text-[#260F18] hover:opacity-50">
            Portfolio
          </a>
          <a href="#" className="font-semibold text-[#260F18] hover:opacity-50">
            Sell
          </a>
          <a href="#" className="font-semibold text-[#260F18] hover:opacity-50">
            Blog
          </a>
        </div>
        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {isLogin ? (
            <>
              <div className="flex items-center gap-6">
                <button className="relative cursor-pointer rounded-full p-2 transition hover:bg-gray-100">
                  <FiMessageCircle className="text-2xl text-gray-600 hover:text-gray-800" />
                </button>
                <button className="relative rounded-full p-2 transition hover:bg-gray-100">
                  <FaRegBell className="cursor-pointer text-2xl text-gray-600 hover:text-gray-800" />
                </button>
                <Link
                  to="/sellItem"
                  className="from-brand-200 to-brand-400 relative inline-block rounded-full bg-gradient-to-r px-6 py-3 font-semibold text-white shadow-lg transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.7)]"
                >
                  Sell Item
                </Link>

                <div className="relative flex cursor-pointer items-center gap-3">
                  <ProfileImage imageUrl={imageUrl} loading={loading} />
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsSignupOpen(true)}
                className="cursor-pointer font-semibold text-[#260F18] hover:opacity-50"
              >
                Sign Up
              </button>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-brand-800 cursor-pointer rounded-4xl px-6 py-3 font-semibold text-white hover:opacity-75"
              >
                Login
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsLoginOpen(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoginForm
              onClose={() => setIsLoginOpen(false)}
              onSwitchToSignup={switchToSignup}
            />
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsSignupOpen(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <SignupForm
              onClose={() => setIsSignupOpen(false)}
              onSwitchToLogin={switchToLogin}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
