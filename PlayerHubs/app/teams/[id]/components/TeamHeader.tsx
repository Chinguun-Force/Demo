import React from 'react';
import Image from 'next/image';

interface TeamHeaderProps {
  name: string;
  fullName: string;
  logo: string;
  currentRank: number;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ name, fullName, logo, currentRank }) => {
  console.log(currentRank);
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 border-b dark:border-gray-700">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-32 h-32 md:w-40 md:h-40 relative flex-shrink-0">
          <Image src={logo || "/placeholder.svg"} alt="Team Logo" fill className="object-contain" priority />
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
          <p className="text-gray-500 dark:text-gray-400">{fullName}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
              Идэвхтэй
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              Дундаж үзүүлэлт: {currentRank}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamHeader; 