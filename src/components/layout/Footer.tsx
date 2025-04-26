
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-civic-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">FixIt Now</h3>
            <p className="text-gray-300">
              Report local problems and help improve your community.
              Together we can make our neighborhoods better places to live.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/report" className="text-gray-300 hover:text-white">Report a Problem</a></li>
              <li><a href="/reports" className="text-gray-300 hover:text-white">View Reports</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">
              Have questions or suggestions?<br />
              Email us at: info@fixitnow.example<br />
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>© {new Date().getFullYear()} FixIt Now. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
