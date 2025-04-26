
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ReportCard from '@/components/reports/ReportCard';
import CategoryBadge from '@/components/reports/CategoryBadge';
import { Button } from '@/components/ui/button';
import { getAllReports, getReportsByCategory } from '@/lib/api';
import { Report } from '@/lib/types';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ReportsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryParam = searchParams.get('category') || 'All';
  
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        let fetchedReports;
        
        if (categoryParam === 'All') {
          fetchedReports = await getAllReports();
        } else {
          fetchedReports = await getReportsByCategory(categoryParam);
        }
        
        setReports(fetchedReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReports();
  }, [categoryParam]);
  
  const handleCategoryClick = (category: string) => {
    setSearchParams({ category });
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter reports by search query
  };
  
  const filteredReports = reports.filter(report => {
    if (!searchQuery) return true;
    
    return (
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-civic-dark mb-2">Community Reports</h1>
            <p className="text-gray-600">
              Browse and search for reported issues in your community.
              Filter by category to find specific types of problems.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </form>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={categoryParam === 'All' ? 'default' : 'outline'}
                  onClick={() => handleCategoryClick('All')}
                  size="sm"
                  className={categoryParam === 'All' ? 'bg-civic-primary text-white' : ''}
                >
                  All
                </Button>
                
                <Button
                  variant={categoryParam === 'Pothole' ? 'default' : 'outline'}
                  onClick={() => handleCategoryClick('Pothole')}
                  size="sm"
                  className={categoryParam === 'Pothole' ? 'bg-civic-pothole text-white' : ''}
                >
                  Potholes
                </Button>
                
                <Button
                  variant={categoryParam === 'Streetlight' ? 'default' : 'outline'}
                  onClick={() => handleCategoryClick('Streetlight')}
                  size="sm"
                  className={categoryParam === 'Streetlight' ? 'bg-civic-streetlight text-white' : ''}
                >
                  Streetlights
                </Button>
                
                <Button
                  variant={categoryParam === 'Garbage' ? 'default' : 'outline'}
                  onClick={() => handleCategoryClick('Garbage')}
                  size="sm"
                  className={categoryParam === 'Garbage' ? 'bg-civic-garbage text-white' : ''}
                >
                  Garbage
                </Button>
                
                <Button
                  variant={categoryParam === 'Water Leakage' ? 'default' : 'outline'}
                  onClick={() => handleCategoryClick('Water Leakage')}
                  size="sm"
                  className={categoryParam === 'Water Leakage' ? 'bg-civic-water text-white' : ''}
                >
                  Water Leakage
                </Button>
              </div>
            </div>
          </div>
          
          {/* Reports Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-civic-primary"></div>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-10 text-center">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No reports found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? "No reports match your search criteria. Try a different search term."
                  : categoryParam !== 'All'
                    ? `No ${categoryParam} reports have been submitted yet.`
                    : "No reports have been submitted yet."}
              </p>
              <Button 
                className="bg-civic-primary hover:bg-blue-600 text-white"
                onClick={() => window.location.href = '/report'}
              >
                Submit a Report
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ReportsPage;
