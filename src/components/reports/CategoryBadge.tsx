
import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
  category: 'Pothole' | 'Streetlight' | 'Garbage' | 'Water Leakage';
  className?: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className }) => {
  const getColorClass = (category: string) => {
    switch (category) {
      case 'Pothole':
        return 'bg-civic-pothole';
      case 'Streetlight':
        return 'bg-civic-streetlight';
      case 'Garbage':
        return 'bg-civic-garbage';
      case 'Water Leakage':
        return 'bg-civic-water';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <span
      className={cn(
        'inline-block rounded-full px-3 py-1 text-xs font-medium text-white',
        getColorClass(category),
        className
      )}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;
