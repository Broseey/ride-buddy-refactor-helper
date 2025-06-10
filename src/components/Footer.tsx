
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Smartphone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Uniride</h3>
            <p className="text-gray-300 text-sm">
              Nigeria's premier student ride-sharing platform connecting universities to cities across the country.
            </p>
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-xs font-bold">f</span>
              </div>
              <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center">
                <span className="text-xs font-bold">t</span>
              </div>
              <div className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center">
                <span className="text-xs font-bold">ig</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/available" className="text-gray-300 hover:text-white transition-colors">Available Rides</Link></li>
              <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/drive" className="text-gray-300 hover:text-white transition-colors">Become a Driver</Link></li>
              <li><Link to="/partner" className="text-gray-300 hover:text-white transition-colors">Partner with Us</Link></li>
              <li><Link to="/join-as-company" className="text-gray-300 hover:text-white transition-colors">Business Solutions</Link></li>
              <li><Link to="/driver-requirements" className="text-gray-300 hover:text-white transition-colors">Driver Requirements</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact & Support</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                support@uniride.ng
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                +234 (0) 800 UNIRIDE
              </li>
              <li className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                Lagos, Nigeria
              </li>
              <li className="flex items-center text-gray-300">
                <Clock className="h-4 w-4 mr-2" />
                24/7 Support
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="text-sm text-gray-300">
              <p>© {currentYear} Uniride. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
              <span className="text-gray-300">Made with ❤️ in Nigeria</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
