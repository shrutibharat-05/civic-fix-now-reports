
import { Report } from './types';

// Sample reports for initial display
export const sampleReports: Report[] = [
  {
    id: '1',
    title: 'Large pothole on Main Street',
    description: 'There is a large pothole near the intersection of Main Street and 5th Avenue. It has caused damage to multiple vehicles.',
    category: 'Pothole',
    imageUrl: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151',
    latitude: 40.7128,
    longitude: -74.0060,
    createdAt: new Date('2025-04-20'),
    status: 'Pending'
  },
  {
    id: '2',
    title: 'Broken streetlight outside library',
    description: 'The streetlight outside the public library has been flickering for weeks and now completely stopped working. This area is very dark at night.',
    category: 'Streetlight',
    imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    latitude: 40.7138,
    longitude: -74.0080,
    createdAt: new Date('2025-04-21'),
    status: 'In Progress'
  },
  {
    id: '3',
    title: 'Illegal garbage dump behind mall',
    description: 'Someone has been dumping household trash behind the shopping mall. It has accumulated over several weeks and is attracting pests.',
    category: 'Garbage',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    latitude: 40.7145,
    longitude: -74.0070,
    createdAt: new Date('2025-04-22'),
    status: 'Pending'
  },
  {
    id: '4',
    title: 'Water leakage from broken pipe',
    description: 'There is a significant water leak from a broken pipe on Oak Street. Water has been flowing continuously for 3 days.',
    category: 'Water Leakage',
    imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    latitude: 40.7150,
    longitude: -74.0065,
    createdAt: new Date('2025-04-23'),
    status: 'Resolved'
  }
];
