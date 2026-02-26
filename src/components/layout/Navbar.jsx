import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 py-2">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img 
            src="https://img.freepik.com/free-vector/home-with-green-roof-logo_1057-3363.jpg" 
            alt="Lime Roofing Logo" 
            className="h-12" 
          />
          <div className="leading-tight">
            <h1 className="font-bold text-xs text-[#91c141] uppercase">Lime Roofing</h1>
            <p className="text-[8px] text-gray-400">Build Your Dream, We Build Your Home</p>
          </div>
        </div>

        {/* Desktop Links - Exact Match to Screenshot */}
        <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-gray-600">
          <a href="#home" className="hover:text-[#91c141]">Home</a>
          <a href="#overview" className="hover:text-[#91c141]">Overview</a>
          <a href="#connectivity" className="hover:text-[#91c141]">Connectivity</a>
          <a href="#amenities" className="hover:text-[#91c141]">Amenities</a>
          <a href="#floor-plans" className="hover:text-[#91c141]">Floor Plans</a>
          <a href="#developer" className="hover:text-[#91c141]">Developer</a>
          <a href="#contact" className="hover:text-[#91c141]">Contact</a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <a href="/login" className="hidden sm:block text-sm font-medium px-4 py-2 text-gray-500 hover:text-emerald-700">
            Admin Login
          </a>
          <button className="bg-gradient-to-r from-[#add666] to-[#91c141] text-[#1a3a3a] px-6 py-2 rounded-md font-bold text-sm shadow-md transition-transform hover:scale-105">
            Enquiry Now
          </button>
        </div>
      </div>
    </nav>
  );
}