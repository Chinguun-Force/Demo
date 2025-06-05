import React from 'react';

interface TeamStatsProps {
  stats: { name: string; value: string }[];
}

const TeamStats: React.FC<TeamStatsProps> = ({ stats }) => {
  if (!stats || stats.length === 0) {
    return <div>No statistics available.</div>;
  }

  return (
    <div className="bg-white border rounded-lg overflow-hidden mb-8">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Багийн статистик</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">{stat.name}</p>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamStats; 