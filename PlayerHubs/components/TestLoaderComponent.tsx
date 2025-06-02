import React, { useEffect } from 'react';
import { useLoaderStore } from '../store/loaderStore';
import Loader from './Loader';

const TestLoaderComponent: React.FC = () => {
  const setLoading = useLoaderStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);
    // Simulate a delay to test the loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Loader will be visible for 3 seconds

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div>
      <Loader />
      <p>Content of the component</p>
    </div>
  );
};

export default TestLoaderComponent; 