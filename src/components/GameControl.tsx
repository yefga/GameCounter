import React from 'react';

interface GameControlsProps {
  gameStarted: boolean;
  gameFinished: boolean;
  currentRound: number;
  totalPhase: string;
  gameName: string;
  players: { name: string; emoji: string; points: number }[];
  handlePhaseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStartGame: () => void;
  handleNextRound: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameStarted,
  gameFinished,
  currentRound,
  totalPhase,
  gameName,
  players,
  handlePhaseChange,
  handleStartGame,
  handleNextRound,
}) => {
  return (
    <div>
      {!gameStarted ? (
        <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md mb-4">
          <input
            type="text"
            value={totalPhase}
            onChange={handlePhaseChange}
            placeholder="Input Total Round, ex: 5"
            className="w-full bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleStartGame}
            disabled={gameName.trim() === '' || players.length < 2 || totalPhase.trim() === ''}
            className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 ${
              gameName.trim() === '' || players.length < 2 || totalPhase.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Start
          </button>
        </div>
      ) : (
        !gameFinished && (
          <button
            onClick={handleNextRound}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
          >
            {currentRound < Number(totalPhase) ? 'Next' : 'Finish'}
          </button>
        )
      )}
    </div>
  );
};

export default GameControls;
