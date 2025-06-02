import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 animate-fade-in">
      <div className="mb-8">
        <div className="relative">
          <div className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Page Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Try checking the URL, going back to the previous page, or returning to the homepage.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Button onClick={() => window.history.back()} variant="outline" className="w-full sm:w-auto">
            <ArrowLeft size={16} className="mr-2" /> Go Back
          </Button>
          <Link to="/" className="w-full sm:w-auto">
            <Button className="w-full">
              <Home size={16} className="mr-2" /> Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;