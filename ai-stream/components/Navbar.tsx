
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Intelligence', path: '/search' },
    { label: 'Deep Research', path: '/deep-dive' },
    { label: 'Analyze', path: '/analyze' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <img src="logo-full.png" alt="THELUOHUB" className="h-8 w-auto object-contain" />
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
              location.pathname === item.path ? 'text-blue-600' : 'text-gray-300 hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-300 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-bold text-xs uppercase tracking-widest transition-all">
          Subscribe
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
