import React from 'react';
import { useLoaderStore } from '../store/loaderStore';

const Loader: React.FC = () => {
  const loading = useLoaderStore((state) => state.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="loader">
        <div className="spinner"></div>
      </div>
      <style jsx>{`
        .loader {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .spinner {
          border: 8px solid rgba(255, 255, 255, 0.3);
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
