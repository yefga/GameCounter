import React from 'react';
import { Player } from '../types';

interface PlayerListProps {
  players: Player[];
  selectedPlayerIndex: number | null;
  handlePlayerSelect: (index: number) => void;
  gameStarted: boolean;
  gameFinished: boolean;
  newPlayerName: string;
  handleNewPlayerNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddPlayer: () => void;
}

const PlayerList: React.FC<PlayerListProps> = ({
  players,
  selectedPlayerIndex,
  handlePlayerSelect,
  gameStarted,
  gameFinished,
  newPlayerName,
  handleNewPlayerNameChange,
  handleAddPlayer,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Players</h2>
      <div className="mb-4">
        {players.map((player, index) => (
          <div
            key={index}
            onClick={() => handlePlayerSelect(index)}
            className={`flex items-center justify-between p-4 border rounded-md mb-2 transition-shadow cursor-pointer ${
              selectedPlayerIndex === index && !gameFinished ? 'bg-blue-500 text-white' : 'bg-gray-50 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-4 rounded-full border border-gray-300 p-1">{player.emoji}</span>
              <span className={`text-lg font-medium ${selectedPlayerIndex === index && !gameFinished ? 'text-white' : 'text-gray-700'}`}>{player.name}</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold">{player.points}</span>
              <div>Point{player.points !== 1 ? 's' : ''}</div>
            </div>
          </div>
        ))}
        {!gameStarted && (
          <>
            <div className="flex items-center p-4 border rounded-md bg-white shadow-sm focus-within:shadow-md transition-shadow">
              <span className="text-2xl mr-4 rounded-full border border-gray-300 p-1">➕</span>
              <input
                type="text"
                value={newPlayerName}
                onChange={handleNewPlayerNameChange}
                placeholder="Input Player Name..."
                className="w-full p-2 border-none focus:outline-none text-gray-700"
              />
            </div>
            <button
              onClick={handleAddPlayer}
              className="flex items-center justify-center w-full p-2 mt-2 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-50"
            >
              <span className="mr-2">+</span> Add Player
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerList;
