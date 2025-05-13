
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createReport } from '@/lib/api';
import { toast } from '@/components/ui/sonner';
import { ReportFormData } from '@/lib/types';
import MapPreview from '@/components/reports/MapPreview';
import ImageDropzone from '@/components/reports/ImageDropzone';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Define the form validation schema
const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  category: z.enum(['Pothole', 'Streetlight', 'Garbage', 'Water Leakage']),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  image: z.any().optional(),
});

const ReportFormPage = () => {
  const navigate = useNavigate();
  const [submissionProgress, setSubmissionProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'Pothole',
      latitude: 40.7128,
      longitude: -74.0060,
      image: undefined,
    },
  });

  const handleImageChange = (file: File | null) => {
    if (file) {
      form.setValue('image', file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      form.setValue('image', undefined);
      setImagePreview(null);
    }
  };
  
  const handleLocationChange = (lat: number, lng: number) => {
    form.setValue('latitude', lat);
    form.setValue('longitude', lng);
  };
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Simulate progress for better user experience
      const progressInterval = setInterval(() => {
        setSubmissionProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 250);
      
      // Prepare form data for submission
      const reportData: ReportFormData = {
        title: values.title,
        description: values.description,
        category: values.category,
        latitude: values.latitude,
        longitude: values.longitude,
        image: values.image,
      };
      
      // Submit report
      const newReport = await createReport({
        ...reportData,
        imageUrl: imagePreview || undefined
      });
      
      // Complete progress bar
      clearInterval(progressInterval);
      setSubmissionProgress(100);
      
      // Show success message
      toast.success('Report submitted successfully!');
      
      // Redirect to reports page after a brief delay to see the 100% progress
      setTimeout(() => {
        navigate('/reports');
      }, 500);
      
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Failed to submit report. Please try again.');
      setSubmissionProgress(0);
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Progress indicator */}
                {isSubmitting && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Submitting your report</Label>
                      <span className="text-sm text-gray-500">{submissionProgress}%</span>
                    </div>
                    <Progress value={submissionProgress} className="h-2" />
                  </div>
                )}
                
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title of the problem *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="E.g., Large pothole on Main Street" 
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide details about the problem..."
                          rows={5}
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          disabled={isSubmitting}
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Upload an image (optional)</Label>
                  <ImageDropzone 
                    onImageChange={handleImageChange}
                    imagePreview={imagePreview}
                    disabled={isSubmitting}
                  />
                </div>
                
                {/* Location */}
                <div className="space-y-2">
                  <Label>Location *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FormField
                      control={form.control}
                      name="latitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Latitude</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.000001"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              value={field.value}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="longitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Longitude</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.000001"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              value={field.value}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <MapPreview 
                    latitude={form.watch('latitude')}
                    longitude={form.watch('longitude')}
                    onLocationChange={handleLocationChange}
                    interactive={!isSubmitting}
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
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportFormPage;
