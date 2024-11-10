import React from 'react';
import { Player } from '../types';
import { CubeIcon } from '@heroicons/react/24/solid';

interface HeaderProps {
  gameName: string;
  gameStarted: boolean;
  gameFinished: boolean;
  players: Player[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ gameName, gameStarted, gameFinished, players, handleInputChange }) => {
  return (
    <div>
      {gameStarted ? (
        <h1 className="text-2xl font-bold text-center mb-6">{gameName.toUpperCase()}</h1>
      ) : (
        <h1 className="text-2xl font-bold text-center mb-6">Game Counter</h1>
      )}
      <div className="flex justify-center mb-4">
        {gameStarted && gameFinished ? (
          <div className="bg-blue-100 p-4 rounded-full">
            <span className="text-6xl">{players[0]?.emoji}</span>
          </div>
        ) : (
          <div className="bg-blue-100 p-4 rounded-full">
            <CubeIcon className="h-16 w-16 text-blue-500" />
          </div>
        )}
      </div>
      {!gameStarted && (
        <div className="relative mb-4">
          <input
            type="text"
            value={gameName}
            onChange={handleInputChange}
            placeholder="Input Your Game Name"
            className="w-full p-2 border-b-2 border-gray-300 text-center text-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default Header;
