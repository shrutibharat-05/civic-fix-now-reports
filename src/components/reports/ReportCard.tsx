
import React from 'react';
import { Report } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import CategoryBadge from './CategoryBadge';
import { MapPin } from 'lucide-react';

interface ReportCardProps {
  report: Report;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
      <div className="h-48 relative overflow-hidden">
        {report.imageUrl ? (
          <img 
            src={report.imageUrl}
            alt={report.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <CategoryBadge category={report.category} />
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-bold text-lg line-clamp-2">{report.title}</h3>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-600 text-sm line-clamp-3 mb-2">
          {report.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          <span>
            {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-100 pt-3 text-sm text-gray-500">
        <div className="flex justify-between w-full">
          <span>
            {report.createdAt.toLocaleDateString()}
          </span>
          <span className={`
            ${report.status === 'Pending' ? 'text-yellow-600' : ''}
            ${report.status === 'In Progress' ? 'text-blue-600' : ''}
            ${report.status === 'Resolved' ? 'text-green-600' : ''}
          `}>
            {report.status}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
