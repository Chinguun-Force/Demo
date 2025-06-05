import React from 'react';
import Image from 'next/image';
import { useTeamStore, Team } from '@/store/teamStore';

interface Game {
  opponent: string;
  result: string;
  date: string;
}

interface RecentResultsProps {
  teamName: string;
  teamNameEn: string;
  teamLogo: string;
  results: Game[];
}

type ParsedGameData = {
  error: false;
  homeTeam: string;
  homeScore: number;
  homeLogo: string;
  awayTeam: string;
  awayScore: number;
  awayLogo: string;
  date: string;
  time: string;
} | {
  error: true;
}

const parseGameData = (game: Game, teamName: string, teamNameEn: string, teamLogo: string): ParsedGameData => {
  const scoreParts = game.result.split('-').map(s => parseInt(s.trim()));
  const opponentTeams = game.opponent.split('-').map(t => t.trim());

  if (scoreParts.length !== 2 || opponentTeams.length !== 2 || isNaN(scoreParts[0]) || isNaN(scoreParts[1])) {
    return { error: true };
  }
  
  const teamAliases = [teamName, teamNameEn, ...teamNameEn.split(' ')].filter(Boolean);
  let teamNameIndex = -1;

  for (const alias of teamAliases) {
      const index = opponentTeams.findIndex(t => t.toLowerCase().includes(alias.toLowerCase()));
      if (index !== -1) {
          teamNameIndex = index;
          break;
      }
  }
  
  if (teamNameIndex === -1) {
    const probableIndex = opponentTeams.findIndex(t => teamAliases.some(alias => t.toLowerCase().includes(alias.split(' ').pop()!.toLowerCase())));
    if(probableIndex !== -1) teamNameIndex = probableIndex;
  }
  
  if (teamNameIndex === -1) {
      return { error: true };
  }

  const homeTeamIndex = teamNameIndex;
  const awayTeamIndex = 1 - homeTeamIndex;
  
  return {
    homeTeam: opponentTeams[homeTeamIndex],
    homeScore: scoreParts[homeTeamIndex],
    homeLogo: teamLogo,
    awayTeam: opponentTeams[awayTeamIndex],
    awayScore: scoreParts[awayTeamIndex],
    awayLogo: '/placeholder.svg',
    date: new Date(game.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
    time: new Date(game.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    error: false,
  };
};

const RecentResults: React.FC<RecentResultsProps> = ({ teamName, teamNameEn, teamLogo, results }) => {
  const teams = useTeamStore((state) => state.teams);

  if (!results || results.length === 0) {
    return <div className="text-gray-500 dark:text-gray-400">No results available.</div>;
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold">Сүүлийн тоглолтууд</h2>
      </div>
      <div className="p-4 space-y-3">
        {[...results].reverse().slice(0, 5).map((game, index) => {
          const gameData = parseGameData(game, teamName, teamNameEn, teamLogo);

          if (gameData.error) {
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center text-gray-500">
                Тоглолтын мэдээллийг уншихад алдаа гарлаа: {game.opponent}
              </div>
            );
          }
          
          const awayTeamData = teams.find(t => t.teamName === gameData.awayTeam || t.teamNameEn === gameData.awayTeam);
          const awayLogo = awayTeamData?.teamLogo || 'https://placehold.co/40x40/png';

          const isWin = gameData.homeScore > gameData.awayScore;

          return (
            <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg flex items-center justify-between">
              {/* Home Team */}
              <div className="flex flex-col items-start text-left w-1/3">
                <span className="font-semibold text-sm md:text-base">{gameData.homeTeam}</span>
                <span className={`text-xl md:text-2xl font-bold ${isWin ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                  {gameData.homeScore}
                </span>
              </div>

              {/* Middle Info */}
              <div className="flex items-center justify-center space-x-3 md:space-x-4 w-1/3">
                <Image src={gameData.homeLogo} alt={gameData.homeTeam} width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 object-contain"/>
                <div className="text-center">
                  <div className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">{gameData.date}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{gameData.time}</div>
                </div>
                <Image src={awayLogo} alt={gameData.awayTeam} width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 object-contain"/>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-end text-right w-1/3">
                <span className="font-semibold text-sm md:text-base">{gameData.awayTeam}</span>
                <span className={`text-xl md:text-2xl font-bold ${!isWin ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                  {gameData.awayScore}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentResults; 