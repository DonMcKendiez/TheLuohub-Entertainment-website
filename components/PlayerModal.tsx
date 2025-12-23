
import React from 'react';
import ReactPlayer from 'react-player';
import { X } from 'lucide-react';

interface PlayerModalProps {
  url: string;
  onClose: () => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ url, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fadeIn">
      <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-blue-600/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 rounded-full transition-all"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <ReactPlayer
          url={url}
          playing={true}
          controls={true}
          width="100%"
          height="100%"
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload' // Disable download button on the player
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default PlayerModal;
