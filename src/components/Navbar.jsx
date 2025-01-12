import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiSearch } from 'react-icons/fi';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <Link to="/" className="font-bold text-2xl ml-2">SFBEN</Link>
          </div>

          <div className="hidden lg:flex space-x-8">
            <Link to="/events" className="hover:text-purple-600">Events</Link>
            <Link to="/career" className="hover:text-purple-600">Career</Link>
            <Link to="/appassessor" className="hover:text-purple-600">AppAssessor</Link>
            <Link to="/news" className="hover:text-purple-600">Salesforce News</Link>
            <Link to="/articles" className="hover:text-purple-600">Articles by Role</Link>
          </div>

          <div className="flex items-center">
            <button className="p-2">
              <FiSearch className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/events" className="block px-3 py-2 hover:bg-gray-100">Events</Link>
            <Link to="/career" className="block px-3 py-2 hover:bg-gray-100">Career</Link>
            <Link to="/appassessor" className="block px-3 py-2 hover:bg-gray-100">AppAssessor</Link>
            <Link to="/news" className="block px-3 py-2 hover:bg-gray-100">Salesforce News</Link>
            <Link to="/articles" className="block px-3 py-2 hover:bg-gray-100">Articles by Role</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;