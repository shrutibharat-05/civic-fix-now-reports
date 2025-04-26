
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-civic-primary mb-4">404</h1>
        <p className="text-2xl text-civic-dark font-semibold mb-6">Oops! Page Not Found</p>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/">
            <Button className="bg-civic-primary hover:bg-blue-600 text-white">
              Return Home
            </Button>
          </Link>
          <Link to="/report">
            <Button variant="outline" className="border-civic-primary text-civic-primary hover:bg-blue-50">
              Report a Problem
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
