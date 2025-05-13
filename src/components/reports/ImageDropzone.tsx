
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { CloudUpload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageDropzoneProps {
  onImageChange: (file: File | null) => void;
  imagePreview?: string | null;
  disabled?: boolean;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ 
  onImageChange, 
  imagePreview = null,
  disabled = false
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onImageChange(file);
    }
  }, [onImageChange]);
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    disabled,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  });
  
  const removeImage = () => {
    onImageChange(null);
  };
  
  return (
    <div>
      {!imagePreview ? (
        <div
          {...getRootProps()}
          className={cn(
            "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors",
            isDragActive ? "border-civic-primary bg-blue-50" : "border-gray-300 bg-gray-50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <input {...getInputProps()} />
          <CloudUpload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-center text-gray-600">
            Drag & drop an image here, or click to select
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supports: JPG, PNG, GIF, WEBP
          </p>
        </div>
      ) : (
        <div className="relative rounded-lg border border-gray-200 overflow-hidden">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-full h-auto max-h-60 object-cover"
          />
          {!disabled && (
            <Button
              onClick={removeImage}
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
