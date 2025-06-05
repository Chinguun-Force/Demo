import React, { useState, ChangeEvent, DragEvent } from 'react';
import { Camera, Upload, X, Edit3, Check, RotateCw, Loader2 } from 'lucide-react';
import { useProfileStore } from "@/store/profileStore";
import { uploadToCloudinary } from '@/lib/cloudinary';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';

interface PhotoInfo {
  url: string;
  name: string;
  size: number;
  uploadedAt: Date;
  resolution: string;
}

interface Profile {
  profilePicture?: string;
  [key: string]: any;
}

export default function PlayerPhotoSection() {
  const profile = useProfileStore((state) => state.profile) as Profile || {};
  const setProfile = useProfileStore((state) => state.setProfile);
  const [currentPhoto, setCurrentPhoto] = useState<string>(profile.profilePicture || '/placeholder.png');
  const [isEditing, setIsEditing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const [photoInfo, setPhotoInfo] = useState<PhotoInfo>({
    url: profile.profilePicture || '/placeholder.png',
    name: profile.profilePicture ? 'Current Profile Picture' : 'No photo uploaded',
    size: 0,
    uploadedAt: new Date(),
    resolution: '0x0'
  });
  const [photoHistory, setPhotoHistory] = useState<string[]>([]);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  const validateFile = (file: File): boolean => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please upload a valid image file (JPG, PNG, or WebP)');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5MB');
      return false;
    }
    return true;
  };

  const processImage = async (file: File) => {
    if (!validateFile(file)) return;

    setIsUploading(true);
    setError(null);

    try {
      // Upload to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(file);

      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        setCurrentPhoto(cloudinaryUrl);
        setPhotoHistory(prev => [cloudinaryUrl, ...prev.slice(0, 4)]);
        setPhotoInfo({
          url: cloudinaryUrl,
          name: file.name,
          size: file.size,
          uploadedAt: new Date(),
          resolution: `${img.width}x${img.height}`
        });
        // Update profile store with new photo
        setProfile((prev) => ({ ...prev, profilePicture: cloudinaryUrl }));
        
        toast({
          title: "Photo uploaded successfully",
          description: "Your profile photo has been updated.",
          variant: "default",
        });
      };
      img.src = cloudinaryUrl;
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload photo. Please try again.');
      toast({
        title: "Upload failed",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date): string => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Player Photo</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          disabled={isUploading}
        >
          {isEditing ? <Check size={16} /> : <Edit3 size={16} />}
          {isEditing ? 'Done' : 'Edit'}
        </button>
      </div>

      {/* Main Photo Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Current Photo */}
        <div className="flex-1 flex flex-col items-center">
          <div
            className={`relative group ${
              isEditing
                ? 'cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-400'
                : ''
            } ${dragOver ? 'border-blue-500 bg-blue-50' : ''} rounded-full p-2 transition-all`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="relative w-48 h-48 rounded-full overflow-hidden bg-gray-100 shadow-lg">
              <img
                src={currentPhoto}
                alt="Player photo"
                className="w-full h-full object-cover"
              />
              
              {/* Loading overlay */}
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                </div>
              )}
              
              {/* Camera overlay when editing */}
              {isEditing && !isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={32} className="text-white" />
                </div>
              )}
              
              {/* Photo upload button */}
              {isEditing && !isUploading && (
                <label className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors">
                  <Camera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Photo Actions */}
          {isEditing && !isUploading && (
            <div className="mt-4 flex gap-3">
              <label className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg cursor-pointer transition-colors">
                <Upload size={16} />
                Upload New
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
              
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                disabled={isUploading}
              >
                <RotateCw size={16} />
                Rotate
              </button>
            </div>
          )}

          {/* Photo Guidelines */}
          {isEditing && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
              <h4 className="font-semibold mb-2">Photo Guidelines:</h4>
              <ul className="space-y-1">
                <li>• Use high-resolution images (min 400x400px)</li>
                <li>• Square aspect ratio works best</li>
                <li>• Clear, well-lit headshot preferred</li>
                <li>• Accepted formats: JPG, PNG, WebP</li>
                <li>• Max file size: 5MB</li>
              </ul>
            </div>
          )}
        </div>

        {/* Photo History & Options */}
        <div className="flex-1">
          {/* Recent Photos */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Recent Photos</h3>
            <div className="grid grid-cols-3 gap-3">
              {photoHistory.map((photo, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-lg overflow-hidden aspect-square ${
                    photo === currentPhoto ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => {
                    if (!isUploading) {
                      setCurrentPhoto(photo);
                      setProfile((prev) => ({ ...prev, profilePicture: photo }));
                    }
                  }}
                >
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  {photo === currentPhoto && (
                    <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-1">
                      <Check size={12} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Photo Stats */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Photo Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Current photo:</span>
                <span className="font-medium">{photoInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Uploaded:</span>
                <span className="font-medium">{formatDate(photoInfo.uploadedAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Resolution:</span>
                <span className="font-medium">{photoInfo.resolution}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">File size:</span>
                <span className="font-medium">{formatFileSize(photoInfo.size)}</span>
              </div>
            </div>
          </div>

          {/* Visibility Settings */}
          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Visibility</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Show in team roster</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Allow in media downloads</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Public profile photo</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Drag and Drop Hint */}
      {isEditing && !isUploading && (
        <div className="mt-6 p-4 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-500">
          <Upload className="mx-auto mb-2" size={24} />
          <p>Drag and drop a photo here, or click the upload button above</p>
          <p className="text-sm mt-2">Accepted formats: JPG, PNG, WebP (max 5MB)</p>
        </div>
      )}
      <Button 
        onClick={() => {
          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = 'image/*';
          fileInput.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              processImage(file);
            }
          };
          fileInput.click();
        }}
      >
        Upload
      </Button>
    </div>
  );
}