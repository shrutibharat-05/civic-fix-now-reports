
import { Camera, MapPin, Filter, Search } from 'lucide-react';

const Features = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600">Simple steps to report and track civic issues in your community</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Report Feature */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-civic-primary to-civic-secondary rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative p-6 bg-white rounded-lg">
              <div className="w-12 h-12 rounded-full bg-civic-primary/10 flex items-center justify-center mb-4">
                <Camera className="h-6 w-6 text-civic-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Take a Photo</h3>
              <p className="text-gray-600">Capture the issue with your device's camera</p>
            </div>
          </div>

          {/* Location Feature */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-civic-secondary to-civic-accent rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative p-6 bg-white rounded-lg">
              <div className="w-12 h-12 rounded-full bg-civic-secondary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-civic-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mark Location</h3>
              <p className="text-gray-600">Pin the exact location of the problem</p>
            </div>
          </div>

          {/* Category Feature */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-civic-accent to-civic-primary rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative p-6 bg-white rounded-lg">
              <div className="w-12 h-12 rounded-full bg-civic-accent/10 flex items-center justify-center mb-4">
                <Filter className="h-6 w-6 text-civic-accent" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Category</h3>
              <p className="text-gray-600">Select the type of issue you're reporting</p>
            </div>
          </div>

          {/* Track Feature */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-civic-water to-civic-primary rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative p-6 bg-white rounded-lg">
              <div className="w-12 h-12 rounded-full bg-civic-water/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-civic-water" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor the status of your reported issues</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
