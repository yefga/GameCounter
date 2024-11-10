import React, { useState } from 'react';
import { CubeIcon } from '@heroicons/react/24/solid';

const animalEmojis = ['🐻', '🐯', '🐼', '🐺', '🐸', '🐘', '🐕', '🐗', '🐰', '🐱'];

function getRandomEmoji(existingEmojis: string[]): string {
  let newEmoji;
  do {
    newEmoji = animalEmojis[Math.floor(Math.random() * animalEmojis.length)];
  } while (existingEmojis.includes(newEmoji));
  return newEmoji;
}

interface Player {
  name: string;
  emoji: string;
  points: number;
}

const GameCounterApp: React.FC = () => {
  const [gameName, setGameName] = useState<string>('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [totalPhase, setTotalPhase] = useState<string>('');
  const [usedEmojis, setUsedEmojis] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number | null>(null);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  
  const handleAddPlayer = () => {
    if (newPlayerName.trim() !== '') {
      const newEmoji = getRandomEmoji(usedEmojis);
      setPlayers([...players, { name: newPlayerName, emoji: newEmoji, points: 0 }]);
      setUsedEmojis([...usedEmojis, newEmoji]);
      setNewPlayerName(''); // Clear the input field after adding a player
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameName(e.target.value);
  };

  const handlePhaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalPhase(e.target.value);
  };

  const handleNewPlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlayerName(e.target.value);
  };

  const handleStartGame = () => {
    if (gameName.trim() !== '' && players.length >= 2 && totalPhase.trim() !== '') {
      setGameStarted(true);
      setCurrentRound(1); // Start at round 1 when the game starts
    }
  };

  const handleNextRound = () => {
    if (selectedPlayerIndex !== null) {
      const updatedPlayers = [...players];
      updatedPlayers[selectedPlayerIndex].points += 1;
      setPlayers(updatedPlayers);
      setSelectedPlayerIndex(null); // Reset selection after increment
    }
    if (currentRound < Number(totalPhase)) {
      setCurrentRound((prev) => prev + 1);
    } else if (currentRound === Number(totalPhase)) {
      const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
      setPlayers(sortedPlayers);

      // Find players with the highest score
      const highestScore = sortedPlayers[0].points;
      const winners = sortedPlayers.filter(player => player.points === highestScore);

      if (winners.length > 1) {
        const winnerNames = winners.map(winner => winner.name).join(', ');
        setGameName(`Congratulations 🎊: ${winnerNames}`);
      } else {
        setGameName(`Congratulations 🎊: ${sortedPlayers[0].name}`);
      }
      setGameFinished(true);
    }
  };


  const handlePlayerSelect = (index: number) => {
    setSelectedPlayerIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
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
        {gameStarted && totalPhase.trim() !== '' && (
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
        )}
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
                <span className="text-2xl mr-4 rounded-full border border-gray-300 p-1">🐟</span>
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
    </div>
  );
};

export default GameCounterApp;