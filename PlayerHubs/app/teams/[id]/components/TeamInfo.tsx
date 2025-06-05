import React from 'react';
import { Calendar, MapPin, Users, Trophy, InfoIcon } from 'lucide-react';

interface TeamInfoProps {
  founded: number;
  homeArena: string;
  coach: string;
  championships: number;
}

const TeamInfo: React.FC<TeamInfoProps> = ({ founded, homeArena, championships }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden mb-8">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Багийн мэдээлэл</h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Үүсгэсэн он</p>
            <p className="font-medium">{founded}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <InfoIcon className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Багийн тухай</p>
            <p className="font-medium">{homeArena}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Дасгалжуулагч</p>
            <p className="font-medium">Anonymous</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Аваргын цом</p>
            <p className="font-medium">{championships}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo; 