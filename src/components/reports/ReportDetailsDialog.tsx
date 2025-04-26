
import React from 'react';
import { Report } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CategoryBadge from './CategoryBadge';
import { MapPin } from 'lucide-react';

interface ReportDetailsDialogProps {
  report: Report;
  onClose: () => void;
}

export const ReportDetailsDialog: React.FC<ReportDetailsDialogProps> = ({
  report,
  onClose,
}) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{report.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {report.imageUrl && (
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <img
                src={report.imageUrl}
                alt={report.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <CategoryBadge category={report.category} />
            <span className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${report.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
              ${report.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : ''}
              ${report.status === 'Resolved' ? 'bg-green-100 text-green-800' : ''}
            `}>
              {report.status}
            </span>
          </div>
          
          <p className="text-gray-600">{report.description}</p>
          
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>Location: {report.latitude}, {report.longitude}</span>
          </div>
          
          <div className="text-sm text-gray-500">
            Reported on: {report.createdAt.toLocaleDateString()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
