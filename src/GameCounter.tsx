import React, { useState } from 'react';
import Header from './components/Header';
import PlayerList from './components/PlayerList';
import RoundProgress from './components/RoundProgress';
import GameControls from './components/GameControl';
import { Player } from './types';

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

  const handleAddPoint = () => {
    if (selectedPlayerIndex !== null) {
      const updatedPlayers = [...players];
      updatedPlayers[selectedPlayerIndex].points += 1;
      setPlayers(updatedPlayers);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <Header 
          gameName={gameName} 
          gameStarted={gameStarted} 
          gameFinished={gameFinished} 
          players={players} 
          handleInputChange={handleInputChange} 
        />
        <RoundProgress 
          currentRound={currentRound} 
          totalPhase={totalPhase} 
          gameStarted={gameStarted} 
        />
        <PlayerList 
          players={players} 
          selectedPlayerIndex={selectedPlayerIndex} 
          handlePlayerSelect={handlePlayerSelect} 
          gameStarted={gameStarted} 
          gameFinished={gameFinished} 
          newPlayerName={newPlayerName} 
          handleNewPlayerNameChange={handleNewPlayerNameChange} 
          handleAddPlayer={handleAddPlayer} 
        />
        <GameControls 
          gameStarted={gameStarted} 
          gameFinished={gameFinished} 
          currentRound={currentRound} 
          totalPhase={totalPhase} 
          gameName={gameName} 
          players={players} 
          handlePhaseChange={handlePhaseChange} 
          handleStartGame={handleStartGame} 
          handleNextRound={handleNextRound} 
        />
      </div>
    </div>
  );
};

function getRandomEmoji(existingEmojis: string[]): string {
  const animalEmojis = ['🐻', '🐯', '🐼', '🐺', '🐸', '🐘', '🐕', '🐗', '🐰', '🐱'];
  let newEmoji;
  do {
    newEmoji = animalEmojis[Math.floor(Math.random() * animalEmojis.length)];
  } while (existingEmojis.includes(newEmoji));
  return newEmoji;
}

export default GameCounterApp;
