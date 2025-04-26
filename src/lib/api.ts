
import { Report, ReportFormData } from './types';
import { sampleReports } from './mockData';
import { toast } from '@/components/ui/sonner';

// In-memory database
let reports: Report[] = [...sampleReports];

// Simulate API call delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// POST /report - Create a new report
export const createReport = async (reportData: ReportFormData): Promise<Report> => {
  await delay(1000); // Simulate network request
  
  // Handle image upload (simulate storing the path)
  let imageUrl: string | undefined = undefined;
  if (reportData.imageUrl) {
    imageUrl = reportData.imageUrl;
  } else if (reportData.image) {
    // In a real backend, we'd upload the file to storage
    // For mock purposes, we'll create a fake URL
    imageUrl = URL.createObjectURL(reportData.image);
  }
  
  const newReport: Report = {
    id: String(Date.now()), // Generate a unique ID
    title: reportData.title,
    description: reportData.description,
    category: reportData.category,
    imageUrl,
    latitude: reportData.latitude,
    longitude: reportData.longitude,
    createdAt: new Date(),
    status: 'Pending'
  };
  
  // Add to our in-memory database
  reports = [newReport, ...reports];
  
  return newReport;
};

// GET /reports - Get all reports
export const getAllReports = async (): Promise<Report[]> => {
  await delay(800); // Simulate network request
  return [...reports];
};

// GET /reports/{category} - Get reports by category
export const getReportsByCategory = async (category: string): Promise<Report[]> => {
  await delay(800); // Simulate network request
  
  if (category === 'All') {
    return [...reports];
  }
  
  return reports.filter(report => report.category === category);
};
