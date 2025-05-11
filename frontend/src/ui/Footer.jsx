import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="mt-12 bg-gray-900 text-white">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4">
        {/* Company Info */}
        <div>
          <h3 className="mb-4 text-xl font-bold">Mulya</h3>
          <p className="text-gray-400">
            Your trusted platform for online auctions. Discover unique items and
            great deals.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 font-semibold">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                How It Works
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              rm for online auctions. Discover unique items a
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="mb-4 font-semibold">Categories</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Art & Collectibles
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Electronics
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Fashion
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Real Estate
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="mb-4 font-semibold">Connect With Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mulya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
