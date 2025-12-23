
import React from 'react';
import { X, Video, Music, PlusSquare } from 'lucide-react';
import { User, CreatorSubRole } from '../types';
import { useNavigate } from 'react-router-dom';

interface UpgradeModalProps {
  user: User;
  onClose: () => void;
  onUpdateUser: (user: User) => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ user, onClose, onUpdateUser }) => {
  const navigate = useNavigate();

  const handleUpgrade = (subRole: CreatorSubRole) => {
    const upgradedUser: User = {
      ...user,
      role: 'creator',
      subRole: subRole,
      subscriptionActive: false, // Force payment for new role
      notifications: [
        { id: 'upgrade_1', title: 'Welcome to the Creator Studio!', message: 'Your account has been upgraded. Please activate your subscription to begin publishing.', date: new Date().toISOString(), type: 'system' },
        ...(user.notifications || [])
      ],
    };
    onUpdateUser(upgradedUser);
    onClose();
    navigate('/creator'); // Redirect to creator dashboard after upgrade
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#0a1120] border border-white/10 rounded-3xl p-10 space-y-10 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-gray-500 hover:text-white rounded-full bg-white/5 transition-all">
          <X size={24} />
        </button>
        
        <div className="text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter">Upgrade to <span className="text-blue-500">Creator</span></h2>
          <p className="text-gray-500 mt-2 font-light italic">Unlock the Creator Studio, AI tools, and monetization.</p>
        </div>

        <div className="space-y-4">
          <SubRoleCard title="VJ (Video Jockey)" fee="10,000" desc="Translated Cinema & Dubbed Hits" onClick={() => handleUpgrade('VJ')} icon={<Video />} />
          <SubRoleCard title="DJ (Mix Master)" fee="5,000" desc="Official Mixtapes & Vibes" onClick={() => handleUpgrade('DJ')} icon={<Music />} />
          <SubRoleCard title="Producer" fee="8,000" desc="Original Series & Exclusives" onClick={() => handleUpgrade('Producer')} icon={<PlusSquare />} />
        </div>
        
        <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest font-bold">
            An activation fee will be required. You can settle this from your wallet in the Creator Studio.
        </p>
      </div>
    </div>
  );
};


const SubRoleCard = ({ title, fee, desc, icon, onClick }: any) => (
  <button 
    onClick={onClick}
    className="w-full bg-white/5 border border-white/5 p-8 rounded-[32px] flex items-center gap-8 hover:bg-blue-600/10 hover:border-blue-600/40 transition-all text-left group"
  >
    <div className="bg-white/5 p-4 rounded-2xl text-gray-400 group-hover:text-blue-500 transition-colors">
      {icon}
    </div>
    <div className="flex-grow">
      <div className="flex items-center justify-between">
        <h3 className="font-black text-xs uppercase tracking-widest">{title}</h3>
        <span className="text-[9px] font-black bg-blue-600/20 text-blue-500 px-3 py-1 rounded-full">UGX {fee}</span>
      </div>
      <p className="text-[10px] text-gray-500 font-light mt-1 uppercase tracking-tight">{desc}</p>
    </div>
  </button>
);


export default UpgradeModal;
