import React from 'react';
import { Award, TrendingUp, Trophy } from 'lucide-react';

interface TeamAchievementsProps {
  achievements: string[];
}

const TeamAchievements: React.FC<TeamAchievementsProps> = ({ achievements }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold">Амжилтууд</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium">{achievement}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamAchievements; 