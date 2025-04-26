import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ReportCard from '@/components/reports/ReportCard';
import CategoryBadge from '@/components/reports/CategoryBadge';
import { Button } from '@/components/ui/button';
import { getAllReports, getReportsByCategory } from '@/lib/api';
import { Report } from '@/lib/types';
import { Search, Filter, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ReportDetailsDialog } from '@/components/reports/ReportDetailsDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 9;

const ReportsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortField, setSortField] = useState<'createdAt' | 'status'>('createdAt');

  const categoryParam = searchParams.get('category') || 'All';
  const statusParam = searchParams.get('status') || 'All';
  
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
    setSearchParams({ category, status: statusParam });
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setSearchParams({ category: categoryParam, status });
    setCurrentPage(1);
  };

  const handleSort = (field: 'createdAt' | 'status') => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };
  
  const filteredReports = reports
    .filter(report => {
      const matchesSearch = !searchQuery || 
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesStatus = statusParam === 'All' || report.status === statusParam;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      if (sortField === 'createdAt') {
        return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) * order;
      }
      return a.status.localeCompare(b.status) * order;
    });

  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
          
          {/* Search and Filter Controls */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <form className="relative">
                  <Input
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </form>
              </div>
              
              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="w-4 h-4 mr-2" />
                    Sort by
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleSort('createdAt')}>
                    Date {sortField === 'createdAt' && (sortOrder === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />)}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort('status')}>
                    Status {sortField === 'status' && (sortOrder === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />)}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Status Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Clock className="w-4 h-4 mr-2" />
                    Status: {statusParam}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleStatusFilter('All')}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusFilter('Pending')}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusFilter('In Progress')}>In Progress</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusFilter('Resolved')}>Resolved</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Category buttons */}
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
          
          {/* Reports Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-civic-primary"></div>
            </div>
          ) : paginatedReports.length === 0 ? (
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
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedReports.map((report) => (
                  <div key={report.id} onClick={() => setSelectedReport(report)} className="cursor-pointer">
                    <ReportCard report={report} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>

      {/* Report Details Dialog */}
      {selectedReport && (
        <ReportDetailsDialog
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </Layout>
  );
};

export default ReportsPage;
