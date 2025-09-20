import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-white">
      {/* Main footer content */}
      <div className="max-w-5xl mx-auto px-0 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-900 rounded-full relative">
                  <div className="absolute inset-1 bg-white rounded-full"></div>
                  <div className="absolute top-1 left-1 w-2 h-2 bg-gray-900 rounded-full"></div>
                </div>
              </div>
              <span className="text-2xl font-bold text-[#ffffff]">UNICSI</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Dropshipping Expertise Since 2002: Trusted by Millions for Quality
              Products and Seamless Integration.
            </p>
          </div>

          {/* UNICSI Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-[#ffffff]">
              UNICSI
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Payment Methods
                </a>
              </li>
            </ul>
          </div>

          {/* Fulfillment Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-[#ffffff]">
              Fulfillment
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Tracking Orders
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Shipping Cost and Delivery Time
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Fulfillment Fees
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Quality Inspection
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Custom Packaging
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Product Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-[#ffffff]">
              Subscribe
            </h3>
            <div>
              <div className="relative w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email here"
                  className=" px-4 py-3 pr-28 rounded-full bg-white text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="absolute top-1/2 right-[-5rem] -translate-y-1/2 px-5 py-2 bg-[#8B2E00] text-white rounded-full hover:bg-[#a33a0a] transition-all duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div>
              <h4 className="font-semibold mb-2">Copyright by</h4>
              <p className="text-gray-300">
                © 2025 UNICSI. All Rights Reserved
              </p>
            </div>

            {/* Contact */}
            <div className="text-center lg:text-left">
              <h4 className="font-semibold mb-2">Contact Us</h4>
              <p className="text-gray-300">+0 12 457 4578</p>
            </div>

            {/* Address */}
            <div className="text-center lg:text-left">
              <h4 className="font-semibold mb-2">Address</h4>
              <p className="text-gray-300">
                119 Tanglewood Lane Gulfport, MS 39503
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
