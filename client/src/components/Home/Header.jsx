// components/Header.jsx
import React, { useState } from 'react';
import { Trophy, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SportConnect
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
  <Link to="/features" className="text-sm font-medium hover:text-blue-600 transition-colors">
    Features
  </Link>
  <Link to="/how-it-works" className="text-sm font-medium hover:text-blue-600 transition-colors">
    How It Works
  </Link>
  <Link to="/comm" className="text-sm font-medium hover:text-blue-600 transition-colors">
    Community
  </Link>
  <Link to="/contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
    Contact
  </Link>
</nav>

<div className="hidden md:flex items-center space-x-4">
  <Link to="/signup" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-slate-100">
    Sign In
  </Link>
  <Link
    to="/register"
    className="px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
  >
    Get Started
  </Link>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4">
          <nav className="flex flex-col space-y-4">
            <Link to="#features" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Features
            </Link>
            <Link to="#how-it-works" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </Link>
            <Link to="#community" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Community
            </Link>
            <Link to="#contact" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Link to="/login" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-slate-100 text-center">
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;