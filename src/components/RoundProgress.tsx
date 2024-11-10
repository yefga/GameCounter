import React from 'react';

interface RoundProgressProps {
  currentRound: number;
  totalPhase: string;
  gameStarted: boolean;
}

const RoundProgress: React.FC<RoundProgressProps> = ({ currentRound, totalPhase, gameStarted }) => {
  if (!gameStarted || totalPhase.trim() === '') {
    return null;
  }

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700">Round Progress</span>
        <span className="text-gray-700 font-bold">{currentRound}/{totalPhase}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-green-400 rounded-full"
          style={{ width: `${(Number(currentRound) / Number(totalPhase)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default RoundProgress;
