
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createReport } from '@/lib/api';
import { toast } from '@/components/ui/sonner';
import { ReportFormData } from '@/lib/types';
import MapPreview from '@/components/reports/MapPreview';

const ReportFormPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ReportFormData>({
    title: '',
    description: '',
    category: 'Pothole',
    latitude: 40.7128,
    longitude: -74.0060,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value as any }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleLocationChange = (lat: number, lng: number) => {
    setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Simple validation
      if (!formData.title || !formData.description) {
        toast.error('Please fill in all required fields');
        return;
      }
      
      // Submit report
      const newReport = await createReport({
        ...formData,
        imageUrl: imagePreview || undefined
      });
      
      // Show success message
      toast.success('Report submitted successfully!');
      
      // Redirect to reports page
      navigate('/reports');
      
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-civic-dark mb-4">Report a Problem</h1>
            <p className="text-gray-600">
              Fill out the form below to report a civic issue in your area.
              Be as detailed as possible to help authorities address the problem quickly.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title of the problem *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="E.g., Large pothole on Main Street"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Please provide details about the problem..."
                    rows={5}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pothole">Pothole</SelectItem>
                      <SelectItem value="Streetlight">Streetlight</SelectItem>
                      <SelectItem value="Garbage">Garbage</SelectItem>
                      <SelectItem value="Water Leakage">Water Leakage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image">Upload an image (optional)</Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  
                  {imagePreview && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-40 rounded-md border border-gray-200"
                      />
                    </div>
                  )}
                </div>
                
                {/* Location */}
                <div className="space-y-2">
                  <Label>Location *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="latitude" className="text-sm">Latitude</Label>
                      <Input
                        id="latitude"
                        name="latitude"
                        type="number"
                        step="0.000001"
                        value={formData.latitude}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="longitude" className="text-sm">Longitude</Label>
                      <Input
                        id="longitude"
                        name="longitude"
                        type="number"
                        step="0.000001"
                        value={formData.longitude}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <MapPreview 
                    latitude={formData.latitude} 
                    longitude={formData.longitude} 
                    onLocationChange={handleLocationChange}
                    interactive={true}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Click on the map to update the location or enter coordinates manually.
                  </p>
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-civic-primary hover:bg-blue-600 text-white py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportFormPage;
