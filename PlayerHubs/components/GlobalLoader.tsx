"use client";

import { useLoaderStore } from '@/store/loaderStore';
import Loader from '@/components/Loader';

export default function GlobalLoader() {
  const { isLoading } = useLoaderStore();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Loader />
    </div>
  );
} 