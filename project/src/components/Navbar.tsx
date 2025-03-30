import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Home, Image, Music, Type, LogOut } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white h-screen w-64 p-6 fixed left-0 top-0">
      <div className="flex items-center gap-3 mb-8">
        <Menu className="w-6 h-6" />
        <h1 className="text-xl font-bold">AI Creation Studio</h1>
      </div>
      
      <div className="space-y-4">
        <Link to="/dashboard" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg">
          <Home className="w-5 h-5" />
          Dashboard
        </Link>
        <Link to="/image-generation" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg">
          <Image className="w-5 h-5" />
          Image Generation
        </Link>
        <Link to="/music-generation" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg">
          <Music className="w-5 h-5" />
          Music Generation
        </Link>
        <Link to="/text-generation" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg">
          <Type className="w-5 h-5" />
          Text Generation
        </Link>
      </div>
      
      <div className="absolute bottom-6 left-6 right-6">
        <button className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg w-full">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;