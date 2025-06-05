import React from 'react';
import Link from 'next/link';
import { useProfileStore } from '@/store/useProfileStore';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

interface Player {
  profilePicture: string;
  number: number;
  name: string;
  position: string;
  height: string;
  stats: { pts: number; reb: number; ast: number };
}

interface TopPlayersProps {
  players: Player[];
}

const TopPlayers: React.FC<TopPlayersProps> = ({ players }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold">Шилдэг тоглогчид</h2>
      </div>
      <div className="p-4">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Avatar className=''>
                <AvatarImage
                    src={player.profilePicture || 'github.com/PlayerHubs/player-hubs/assets/placeholder.png'}
                    alt="User"
                    className='w-10 h-10 rounded-full'/>
                <AvatarFallback>US</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{player.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {player.position} • {player.height}
              </p>
            </div>
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-semibold text-gray-700 dark:text-gray-300">#{player.number}</span>
            </div>
            <div className="flex gap-3 text-sm">
              <div className="text-center">
                <p className="font-semibold">{player.stats.pts}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">ОНО</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{player.stats.reb}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">САМ</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{player.stats.ast}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">ДАМ</p>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-4 px-3">
          <Link
            href="/players"
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center justify-center w-full py-2 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            Бүх тоглогчдыг харах
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopPlayers; 