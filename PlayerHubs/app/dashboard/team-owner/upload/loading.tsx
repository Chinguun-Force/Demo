export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-900 mb-4"></div>
      <p className="text-gray-600 text-sm">Loading, please wait...</p>
    </div>
  );
}