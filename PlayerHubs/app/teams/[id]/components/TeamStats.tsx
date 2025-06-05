import React from 'react';

interface TeamStatsProps {
  stats: { name: string; value: string }[];
}

const TeamStats: React.FC<TeamStatsProps> = ({ stats }) => {
  if (!stats || stats.length === 0) {
    return <div className="text-gray-500 dark:text-gray-400">No statistics available.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold">Багийн статистик</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</p>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamStats; 