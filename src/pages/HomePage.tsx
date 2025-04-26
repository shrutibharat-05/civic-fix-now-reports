
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { MapPin, List, FileText, Search } from 'lucide-react';

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-civic-dark">
            Report local problems, get things fixed!
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            FixIt Now connects citizens with local authorities to address community issues quickly and efficiently.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/report">
              <Button className="bg-civic-primary hover:bg-blue-600 text-white px-6 py-6 text-lg">
                Report a Problem
              </Button>
            </Link>
            <Link to="/reports">
              <Button variant="outline" className="border-civic-primary text-civic-primary hover:bg-blue-50 px-6 py-6 text-lg">
                View Reports
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-civic-dark">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-civic-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-civic-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-civic-dark">Report an Issue</h3>
              <p className="text-gray-600">
                Identify a local problem and submit a detailed report with photos and location.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-civic-secondary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <List className="h-8 w-8 text-civic-secondary" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-civic-dark">Track Progress</h3>
              <p className="text-gray-600">
                Local authorities receive the report and update its status as they work on the issue.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-civic-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-civic-accent" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-civic-dark">Problem Solved</h3>
              <p className="text-gray-600">
                Follow up on the issue until it's resolved and help improve your community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-civic-dark">Problem Categories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-t-4 border-civic-pothole">
              <h3 className="font-bold text-xl mb-3 text-civic-dark">Potholes</h3>
              <p className="text-gray-600 mb-4">
                Report road damage that can cause accidents and vehicle damage.
              </p>
              <Link to="/report" className="text-civic-pothole font-medium hover:underline">
                Report a pothole →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-t-4 border-civic-streetlight">
              <h3 className="font-bold text-xl mb-3 text-civic-dark">Streetlights</h3>
              <p className="text-gray-600 mb-4">
                Report broken or malfunctioning streetlights in your neighborhood.
              </p>
              <Link to="/report" className="text-civic-streetlight font-medium hover:underline">
                Report a streetlight issue →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-t-4 border-civic-garbage">
              <h3 className="font-bold text-xl mb-3 text-civic-dark">Garbage</h3>
              <p className="text-gray-600 mb-4">
                Report illegal dumping or areas that need trash cleanup.
              </p>
              <Link to="/report" className="text-civic-garbage font-medium hover:underline">
                Report a garbage issue →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-t-4 border-civic-water">
              <h3 className="font-bold text-xl mb-3 text-civic-dark">Water Leakage</h3>
              <p className="text-gray-600 mb-4">
                Report water main breaks, leaks, or flooding issues.
              </p>
              <Link to="/report" className="text-civic-water font-medium hover:underline">
                Report water leakage →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-civic-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to report a problem?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Help make your community a better place. Every report brings us one step closer to a cleaner, safer neighborhood.
          </p>
          <Link to="/report">
            <Button className="bg-white text-civic-primary hover:bg-gray-100 px-8 py-6 text-lg font-medium">
              Report a Problem Now
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
