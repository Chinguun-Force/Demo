import React from 'react';

const TeamRankings: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold">Багийн чансаа</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Довтолгоо</span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">3-р байр</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Хамгаалалт</span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">5-р байр</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "70%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">3 оноо</span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">2-р байр</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "90%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Чөлөөт шидэлт</span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">4-р байр</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamRankings; 