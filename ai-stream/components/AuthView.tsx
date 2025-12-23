
import React, { useState } from 'react';
import { Phone, ArrowRight, ShieldCheck, Music, Video, User as UserIcon, MessageCircle, Send, PlusSquare, Lock, X } from 'lucide-react';
import { CreatorSubRole, User, UserRole } from '../types';
import { useNavigate } from 'react-router-dom';

interface AuthViewProps {
  onLogin: (user: User) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'method' | 'role' | 'subrole'>('method');
  const [authData, setAuthData] = useState({ name: '', email: '', role: 'viewer' as UserRole });
  const navigate = useNavigate();

  const handleAuth = (method: string) => {
    console.log(`Authenticating via ${method}...`);
    setAuthData({ ...authData, name: 'LuoHub Node User', email: 'user@luohub.com' });
    setStep('role');
  };

  const selectRole = (role: UserRole) => {
    if (role === 'viewer') {
      onLogin({
        id: 'u_' + Math.random().toString(36).substr(2, 9),
        name: 'Viewer Guest',
        email: authData.email,
        balance: 0,
        role: 'viewer',
        subscriptionActive: true,
        notifications: [],
        emailSubscribed: true,
        aiUsageToday: 0
      });
      navigate('/');
    } else if (role === 'admin') {
       onLogin({
        id: 'admin_001',
        name: 'Master Admin',
        email: 'admin@luohub.com',
        balance: 9999999,
        role: 'admin',
        subscriptionActive: true,
        notifications: [],
        emailSubscribed: true,
        aiUsageToday: 0
      });
      navigate('/admin');
    } else {
      setAuthData({ ...authData, role });
      setStep('subrole');
    }
  };

  const selectSubRole = (subRole: CreatorSubRole) => {
    onLogin({
      id: 'c_' + Math.random().toString(36).substr(2, 9),
      name: 'Creative Node',
      email: authData.email,
      balance: 0,
      role: 'creator',
      subRole,
      subscriptionActive: false,
      notifications: [
        { id: '1', title: 'Welcome to Studio', message: 'Set up your TMDb keys in the Media Vault to start publishing.', date: new Date().toISOString(), type: 'system' }
      ],
      emailSubscribed: true,
      aiUsageToday: 0
    });
    navigate('/creator');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden font-['Ubuntu'] z-[200]">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=80" 
          className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
          alt="bg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-12 animate-fadeIn">
        <div className="text-center space-y-4">
          <img src="logo-full.png" alt="THELUOHUB" className="h-16 w-auto mx-auto object-contain brightness-125" />
          <div className="h-px w-24 bg-blue-600 mx-auto"></div>
          <p className="text-gray-500 font-black tracking-[0.4em] text-[10px] uppercase italic">Secure Identity Node</p>
        </div>

        {step === 'method' && (
          <div className="space-y-4 animate-slideUp">
            <AuthButton 
              onClick={() => handleAuth('whatsapp')}
              label="Continue with WhatsApp" 
              icon={<MessageCircle className="text-green-500" />} 
              color="bg-white/5 border-white/5 hover:border-green-500/50 hover:bg-green-500/5"
            />
            <AuthButton 
              onClick={() => handleAuth('telegram')}
              label="Continue with Telegram" 
              icon={<Send className="text-blue-400" />} 
              color="bg-white/5 border-white/5 hover:border-blue-400/50 hover:bg-blue-400/5"
            />
            <AuthButton 
              onClick={() => handleAuth('google')}
              label="Continue with Google" 
              icon={<img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="google" />} 
              color="bg-white text-black hover:scale-[1.05]"
            />
            
            <div className="relative py-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[9px] uppercase font-black tracking-[0.5em] text-gray-700">
                <span className="bg-black px-6">Database Vault</span>
              </div>
            </div>
            
            <p className="text-[10px] text-gray-600 text-center uppercase tracking-widest leading-relaxed font-bold">
              Encryption active. By entering, you sync with <br/> <span className="text-blue-600 underline cursor-pointer">LuoHub Intelligence Protocols</span>
            </p>
          </div>
        )}

        {step === 'role' && (
          <div className="space-y-4 animate-slideUp">
            <h2 className="text-center text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 mb-8 italic">Choose Access Logic</h2>
            <RoleCard icon={<UserIcon />} title="Viewer Node" desc="Consume media, IPTV & Exclusives" onClick={() => selectRole('viewer')} />
            <RoleCard icon={<ShieldCheck className="text-blue-500" />} title="Creator Node" desc="Manage Studio, AI & Payments" onClick={() => selectRole('creator')} />
            <RoleCard icon={<Lock className="text-red-500" />} title="Master Admin" desc="Full Ecosystem Architecture" onClick={() => selectRole('admin')} />
            <button onClick={() => setStep('method')} className="w-full text-[10px] text-gray-600 font-black uppercase tracking-widest mt-6">Go Back</button>
          </div>
        )}

        {step === 'subrole' && (
          <div className="space-y-4 animate-slideUp">
             <h2 className="text-center text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 mb-8 italic">Creative Specialization</h2>
             <SubRoleCard title="VJ (Video Jockey)" fee="10,000" desc="Translated Cinema & Dubbed Hits" onClick={() => selectSubRole('VJ')} icon={<Video />} />
             <SubRoleCard title="DJ (Mix Master)" fee="5,000" desc="Official Mixtapes & Vibes" onClick={() => selectSubRole('DJ')} icon={<Music />} />
             <SubRoleCard title="Producer" fee="8,000" desc="Original Series & Exclusives" onClick={() => selectSubRole('Producer')} icon={<PlusSquare />} />
             <button onClick={() => setStep('role')} className="w-full text-[10px] text-gray-600 font-black uppercase tracking-widest mt-6">Back to Identity</button>
          </div>
        )}
      </div>
    </div>
  );
};

const AuthButton = ({ label, icon, color, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-8 py-5 rounded-2xl font-black transition-all border ${color}`}
  >
    <div className="flex items-center gap-5">
      {icon}
      <span className="text-xs tracking-widest uppercase">{label}</span>
    </div>
    <ArrowRight size={14} className="opacity-40" />
  </button>
);

const RoleCard = ({ icon, title, desc, onClick }: any) => (
  <button 
    onClick={onClick}
    className="w-full bg-white/5 border border-white/5 p-8 rounded-[32px] flex items-center gap-8 hover:bg-blue-600/10 hover:border-blue-600/40 transition-all text-left group"
  >
    <div className="bg-white/5 p-4 rounded-2xl text-gray-400 group-hover:text-blue-500 transition-colors shadow-lg">
      {icon}
    </div>
    <div className="flex-grow">
      <h3 className="font-black text-xs uppercase tracking-widest group-hover:text-white transition-colors">{title}</h3>
      <p className="text-[10px] text-gray-500 font-light mt-1 uppercase tracking-tight">{desc}</p>
    </div>
    <ArrowRight className="w-4 h-4 text-gray-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
  </button>
);

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

export default AuthView;
