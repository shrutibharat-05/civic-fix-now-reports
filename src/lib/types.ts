
export interface Report {
  id: string;
  title: string;
  description: string;
  category: 'Pothole' | 'Streetlight' | 'Garbage' | 'Water Leakage';
  imageUrl?: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  status: 'Pending' | 'In Progress' | 'Resolved';
}

export type ReportFormData = Omit<Report, 'id' | 'createdAt' | 'status'> & {
  image?: File;
};
