import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Mail className="w-5 h-5 mr-2 text-[#DD2A7B]" />
            <span>Support us: comicfixxx@gmail.com</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 mr-2 text-[#DD2A7B]" />
            <span>Connect with us: +1234567890</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;