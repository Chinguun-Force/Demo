'use client'
import React, { useState, useEffect } from 'react';

export default function CloudinaryUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
      setImageUrl(null);
    } else {
      setFile(null);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setPreviewUrl(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_preset');

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dqjvqnnpa/image/upload',
        { method: 'POST', body: formData }
      );

      const data = await res.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
        setFile(null);
        setPreviewUrl(null);
      } else {
        setError(data.error?.message || 'Upload амжилтгүй боллоо');
      }
    } catch (err) {
      setError('Upload хийхэд алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Zurag upload
      </h2>

      {!file && (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-gray-700 mb-5
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-gradient-to-r file:from-blue-400 file:to-blue-600
            file:text-white
            hover:file:from-blue-500 hover:file:to-blue-700
            cursor-pointer"
        />
      )}

      {previewUrl && (
        <div className="mb-5 text-center relative">
          <p className="mb-2 font-medium text-gray-700">Songson zurag </p>
          <img
            src={previewUrl}
            alt="Selected"
            className="mx-auto max-h-48 rounded-lg shadow-md object-contain"
          />
          <button
            onClick={handleCancel}
            className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full w-7 h-7 flex items-center justify-center text-xl font-bold leading-none cursor-pointer"
            aria-label="Цуцлах"
            title="Цуцлах"
          >
            ×
          </button>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className={`w-full py-3 rounded-md text-white font-semibold transition
          ${
            !file || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
      >
        {loading ? 'Upload hiij baina...' : 'Upload hiih'}
      </button>

      {error && (
        <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
      )}

      {imageUrl && (
        <div className="mt-6 text-center">
          <p className="mb-2 font-medium text-green-600">Upload done</p>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="mx-auto max-h-64 rounded-lg shadow-md object-contain"
          />
        </div>
      )}
    </div>
  );
}