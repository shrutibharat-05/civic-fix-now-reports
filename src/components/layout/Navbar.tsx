
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-civic-primary" />
          <span className="font-bold text-xl text-civic-dark">FixIt Now</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/reports" className="text-civic-dark hover:text-civic-primary">
            View Reports
          </Link>
          <Link to="/report">
            <Button className="bg-civic-primary hover:bg-blue-600 text-white">
              Report a Problem
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
