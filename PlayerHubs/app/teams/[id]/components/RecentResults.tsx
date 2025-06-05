import React from 'react';

interface RecentResultsProps {
  results: { opponent: string; result: string; score: string }[];
}

const RecentResults: React.FC<RecentResultsProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return <div>No results available.</div>;
  }
  return (
    <div className="bg-white border rounded-lg overflow-hidden mb-8">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Сүүлийн тоглолтууд</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Өрсөлдөгч
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Үр дүн
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Оноо
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[...results].reverse().slice(0, 5).map((game, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{game.opponent}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      game.result === "W" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
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