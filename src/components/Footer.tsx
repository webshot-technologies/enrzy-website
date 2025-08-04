import React from 'react';
import { Phone, Mail } from 'lucide-react'; // For phone and email icons

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`   pt-32 pb-16  px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">
        

        {/* Main Footer Content: Logo, Mission, Quick Links, Customer Service */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Column 1: Logo & Mission */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img src="/assets/logo.png"  alt="Better Drones Logo" className="logo-image mb-4" /> {/* Placeholder logo */}
            <p className="text-sm leading-relaxed mb-6 w-96  text-base-secondary">
             Office no. - 214, Tower- B, Noida One, B-8, Rasoolpur Nawada, Industrial Area, Sector 62, Noida, Uttar Pradesh 201309
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons (using simple SVG placeholders for demonstration) */}
              
              <a href="https://www.linkedin.com/company/enrzy/" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="#F38D26" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.044-1.852-3.044-1.853 0-2.136 1.445-2.136 2.951v5.662H9.596V9.218h3.413v1.564h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 6.879v7.018zM7.946 6.532c-.002-.002-.002-.002-.002-.003a2.584 2.584 0 110-5.168 2.584 2.584 0 010 5.168zM4.946 9.218h3.004v11.234H4.946z"/>
                </svg>
              </a>
              
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-center md:text-left ">
             
          </div>
          {/* Column 2: Quick Links */}
          <div className="text-center md:text-left ">
              <div className="mb-4 md:mb-4">
            <p className="text-2xl text-base-secondary font-bold">Get In Touch And <br/> Let Us Do The Needful</p>
          </div>
          <div className=" items-center space-y-3 ">
            <a href="tel:+911254567890" className="flex items-center text-center md:text-left justify-center md:justify-start  text-base-secondary hover:text-orange-500 transition-colors duration-300">
              <Phone className="w-5 h-5 mr-2 base-color" />
              <span className='text-sm '>+91 8448020706</span>
              
            </a>
            <a href="tel:+911254567890" className="flex items-center text-center md:text-left justify-center md:justify-start text-base-secondary hover:text-orange-500 transition-colors duration-300">
              <Phone className="w-5 h-5 mr-2 base-color" />
             
              <span className='text-sm '>+91 7838525424</span>
            </a>
            <a href="mailto:hello@betterdrones.com" className="flex  text-center md:text-left justify-center md:justify-start items-center text-base-secondary hover:text-orange-500 transition-colors duration-300 ml-0">
              <Mail className="w-5 h-5 mr-2 base-color" />
              <span className='text-sm '>info@enrzy.io</span>
            </a>
          </div>
          </div>

          {/* Column 3: Customer Service */}
         
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-base text-base-secondary  pt-8 mt-8 text-center text-sm">
          <p>&copy; Copyright 2025. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
