
import React, { createContext, useState, useContext, ReactNode } from 'react';
import PlayerModal from './components/PlayerModal';

interface PlayerContextType {
  openPlayer: (url: string) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [playerUrl, setPlayerUrl] = useState<string | null>(null);

  const openPlayer = (url: string) => {
    if (url) {
      setPlayerUrl(url);
    } else {
      console.warn("Player opened with invalid URL.");
    }
  };
  
  const closePlayer = () => setPlayerUrl(null);

  return (
    <PlayerContext.Provider value={{ openPlayer }}>
      {children}
      {playerUrl && <PlayerModal url={playerUrl} onClose={closePlayer} />}
    </PlayerContext.Provider>
  );
};
