
import { GitPullRequest, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const Stats = () => {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Reports */}
          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-civic-primary/10 to-civic-primary/5 rounded-2xl transition-transform hover:scale-105">
            <GitPullRequest className="h-8 w-8 text-civic-primary mb-2" />
            <dt className="text-3xl font-bold text-civic-primary">1,234</dt>
            <dd className="text-sm text-gray-600">Total Reports</dd>
          </div>

          {/* Resolved */}
          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-civic-secondary/10 to-civic-secondary/5 rounded-2xl transition-transform hover:scale-105">
            <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
            <dt className="text-3xl font-bold text-green-500">892</dt>
            <dd className="text-sm text-gray-600">Issues Resolved</dd>
          </div>

          {/* In Progress */}
          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-civic-accent/10 to-civic-accent/5 rounded-2xl transition-transform hover:scale-105">
            <Clock className="h-8 w-8 text-orange-500 mb-2" />
            <dt className="text-3xl font-bold text-orange-500">156</dt>
            <dd className="text-sm text-gray-600">In Progress</dd>
          </div>

          {/* Pending */}
          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-2xl transition-transform hover:scale-105">
            <AlertTriangle className="h-8 w-8 text-red-500 mb-2" />
            <dt className="text-3xl font-bold text-red-500">186</dt>
            <dd className="text-sm text-gray-600">Pending Review</dd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
