import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Inspiration', href: '/inspiration' },
    { name: 'Design', href: '/design' },
    { name: 'Mood Board', href: '/mood-board' },
    { name: 'Chatbot', href: '/chatbot' },
    { name: 'Plans', href: '/plans' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Sparkles className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">MarketMate</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}
              >
                {item.name}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <Link to="/login">
              <Button size="sm" variant="primary" className="ml-4">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 focus:outline-none mr-2"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg rounded-b-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'text-primary-600 dark:text-primary-400 bg-gray-50 dark:bg-gray-700'
                    : 'text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;