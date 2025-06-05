import React from 'react';

interface RecentResultsProps {
  results: { opponent: string; result: string; score: string }[];
}

const RecentResults: React.FC<RecentResultsProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return <div className="text-gray-500 dark:text-gray-400">No results available.</div>;
  }
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold">Сүүлийн тоглолтууд</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Өрсөлдөгч
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Үр дүн
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Оноо
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {[...results].reverse().slice(0, 5).map((game, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{game.opponent}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      game.result === "W" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" 
                        : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                    }`}
                  >
                    {game.result === "W" ? "Ялалт" : "Ялагдал"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">{game.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentResults; 