import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Sparkles className="h-7 w-7 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">MarketMate</span>
            </Link>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Your AI-powered marketing assistant to help grow your business, product, brand, or website.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Platform</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/marketing-type" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                    Create Campaign
                  </Link>
                </li>
                <li>
                  <Link to="/inspiration" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                    Inspiration
                  </Link>
                </li>
                <li>
                  <Link to="/plans" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                    Marketing Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {currentYear} MarketMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;