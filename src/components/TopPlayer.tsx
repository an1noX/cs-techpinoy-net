import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";

// Player type for CSV mapping
interface Player {
  rank: number;
  name: string;
  kills: number;
  deaths: number;
  hits: number;
  shots: number;
  hs: number;
  eff: string;
  acc: string;
}

// Helper for rank style
const getRankStyle = (rank: number) => {
  if (rank === 1) return { color: 'bg-gradient-to-br from-yellow-400 to-yellow-600', icon: '🥇', label: 'Champion' };
  if (rank === 2) return { color: 'bg-gradient-to-br from-gray-300 to-gray-500', icon: '🥈', label: 'Elite' };
  if (rank === 3) return { color: 'bg-gradient-to-br from-yellow-700 to-yellow-500', icon: '🥉', label: 'Pro' };
  return { color: 'bg-orange-700', icon: '⭐', label: 'Top Player' };
};

interface TopPlayerProps {
  onClose?: () => void;
}

const TopPlayer: React.FC<TopPlayerProps> = ({ onClose }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [showContent, setShowContent] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    fetch("/top15.csv")
      .then((res) => res.text())
      .then((csv) => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const mapped = (results.data as any[]).map((row) => ({
              rank: Number(row.Rank),
              name: row.Name.replace(/"/g, ""),
              kills: Number(row.Kills),
              deaths: Number(row.Deaths),
              hits: Number(row.Hits),
              shots: Number(row.Shots),
              hs: Number(row.HS),
              eff: row.Eff,
              acc: row.Acc,
            }));
            setPlayers(mapped);
            setTimeout(() => setShowContent(true), 2000);
          },
        });
      });
  }, []);

  const topPlayers = players.slice(0, 5);

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Optional: Background effect */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black/70" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, #ff6600 2px, #ff6600 4px)",
          }}
        />
      </div>

      {/* Loading State */}
      {!showContent && (
        <div className="relative z-20 text-center bg-black/60 p-8 border border-orange-500/30 w-full max-w-2xl mx-auto text-orange-400 font-mono text-xl">
          Loading leaderboard...
        </div>
      )}

      {/* Top Players Content */}
      {showContent && !showFull && (
        <div className="relative z-20 text-center bg-black/60 p-8 border border-orange-500/30 w-full max-w-2xl mx-auto">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center text-xl text-orange-400 hover:bg-orange-400 hover:text-black transition rounded-full border border-orange-400"
            aria-label="Close Top Players"
          >
            ×
          </button>
          <div className="text-orange-400 font-mono text-xs mb-4">
            ================================
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-orange-400 font-mono tracking-wider">
            TOP PLAYERS
          </h2>
          <div className="text-orange-400 font-mono text-xs mb-4">
            ================================
          </div>
          <div className="mb-8 overflow-x-auto">
            <table className="min-w-full text-left font-mono text-orange-300 border-separate border-spacing-y-2">
              <thead>
                <tr className="text-orange-400 text-sm">
                  <th className="px-4 py-2">Rank</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Kills</th>
                  <th className="px-4 py-2">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {topPlayers.map((player) => {
                  const { color, icon } = getRankStyle(player.rank);
                  return (
                    <tr key={player.rank} className="bg-black/80 border border-orange-500/30 rounded-md">
                      <td className="px-4 py-2 font-bold">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-base text-white shadow border-2 border-orange-400 ${color}`}>
                          <span>{icon}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">{player.name}</td>
                      <td className="px-4 py-2">{player.kills}</td>
                      <td className="px-4 py-2">{player.acc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center gap-2 mt-4 items-stretch">
            <Button
              variant="outline"
              className="border-orange-400 text-orange-400 bg-black hover:bg-orange-400 hover:text-black font-mono px-8 py-3 transition-all hover:shadow-lg hover:shadow-orange-400/30 h-full"
              onClick={() => setShowFull(true)}
            >
              [VIEW FULL LEADERBOARD]
            </Button>
          </div>
        </div>
      )}

      {/* Full Leaderboard Compact Scrollable View */}
      {showContent && showFull && (
        <div className="relative z-20 text-center bg-black/60 p-4 border border-orange-500/30 w-full max-w-md mx-auto">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-orange-400 font-mono tracking-wider">FULL LEADERBOARD</h2>
            <Button
              variant="ghost"
              className="text-orange-400 border border-orange-400 px-3 py-1 ml-2 hover:bg-orange-400 hover:text-black font-mono"
              onClick={() => setShowFull(false)}
            >
              Back
            </Button>
          </div>
          <div
            className="overflow-y-auto max-h-96 w-full custom-scrollbar"
            style={{ overflowX: 'hidden' }}
          >
            <table className="min-w-full text-left font-mono text-orange-300 border-separate border-spacing-y-1 text-sm">
              <thead>
                <tr className="text-orange-400">
                  <th className="px-2 py-1">Rank</th>
                  <th className="px-2 py-1">Name</th>
                  <th className="px-2 py-1">Kills</th>
                  <th className="px-2 py-1">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr
                    key={player.rank}
                    className="bg-black/80 border border-orange-500/30 rounded-md cursor-pointer hover:bg-orange-900 transition-colors"
                    onClick={() => setSelectedPlayer(player)}
                  >
                    <td className="px-2 py-1 font-bold">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-base text-white shadow border-2 border-orange-400 ${getRankStyle(player.rank).color}`}>
                        <span>{getRankStyle(player.rank).icon}</span>
                      </div>
                    </td>
                    <td className="px-2 py-1">{player.name}</td>
                    <td className="px-2 py-1">{player.kills}</td>
                    <td className="px-2 py-1">{player.acc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Player Stats Modal */}
      {selectedPlayer && (() => {
        const { color, icon, label } = getRankStyle(selectedPlayer.rank);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative bg-black border border-orange-500/80 rounded-xl p-8 w-full max-w-sm mx-auto text-left shadow-2xl animate-fade-in">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-orange-400 hover:bg-orange-400 hover:text-black transition rounded-full p-2 border border-orange-400"
                aria-label="Close Player Stats"
              >
                ×
              </button>
              <div className="flex flex-col items-start mb-4">
                {/* Rank Badge Left, Name Right, All Left-Aligned */}
                <div className="flex items-center gap-3 mb-2 justify-start">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-orange-400 ${color} animate-fade-in`}>
                    <span className="mr-1">{icon}</span>
                    {selectedPlayer.rank}
                  </div>
                  <span className="text-2xl font-bold text-orange-400 font-mono">{selectedPlayer.name}</span>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 text-left">{label}</div>
              </div>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 text-orange-300 font-mono text-sm">
                <div className="bg-black/80 border border-orange-500/30 rounded-lg p-3 flex flex-col items-center">
                  <span className="font-bold text-lg">{selectedPlayer.kills}</span>
                  <span>Kills</span>
                </div>
                <div className="bg-black/80 border border-orange-500/30 rounded-lg p-3 flex flex-col items-center">
                  <span className="font-bold text-lg">{selectedPlayer.deaths}</span>
                  <span>Deaths</span>
                </div>
                <div className="bg-black/80 border border-orange-500/30 rounded-lg p-3 flex flex-col items-center">
                  <span className="font-bold text-lg">{selectedPlayer.hits}</span>
                  <span>Hits</span>
                </div>
                <div className="bg-black/80 border border-orange-500/30 rounded-lg p-3 flex flex-col items-center">
                  <span className="font-bold text-lg">{selectedPlayer.shots}</span>
                  <span>Shots</span>
                </div>
                <div className="bg-black/80 border border-orange-500/30 rounded-lg p-3 flex flex-col items-center">
                  <span className="font-bold text-lg">{selectedPlayer.hs}</span>
                  <span>Headshots</span>
                </div>
                <div className="bg-black/80 border border-orange-500/30 rounded-lg p-3 flex flex-col items-center">
                  <span className="font-bold text-lg">{selectedPlayer.eff}</span>
                  <span>Efficiency</span>
                </div>
                <div className="bg-black/80 border border-orange-500/30 rounded-lg p-3 flex flex-col items-center col-span-2">
                  <span className="font-bold text-lg">{selectedPlayer.acc}</span>
                  <span>Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default TopPlayer;
// .animate-fade-in { animation: fadeIn 0.25s cubic-bezier(0.4,0,0.2,1); }
// @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } 