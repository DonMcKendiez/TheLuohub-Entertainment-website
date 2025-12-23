
import React, { useState } from 'react';
import { Mail, Facebook, Twitter, Instagram, Youtube, Send, X, Filter, BellOff, CheckCircle2 } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-24 pb-12 px-8 lg:px-16 font-['Ubuntu']">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-20">
        {/* Brand Node */}
        <div className="space-y-8">
          <img src="logo-full.png" alt="THELUOHUB" className="h-10 w-auto object-contain brightness-110" />
          <p className="text-gray-500 text-sm leading-relaxed font-light italic">
            "Intelligence Behind the Lens." <br/>
            Kampala's premier AI-integrated media marketplace. Direct YouTube sync, Nollywood mirrors, and creator-first monetization nodes.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<Facebook size={18} />} />
            <SocialIcon icon={<Twitter size={18} />} />
            <SocialIcon icon={<Instagram size={18} />} />
            <SocialIcon icon={<Youtube size={18} />} />
          </div>
        </div>

        {/* Explore Hub */}
        <div>
          <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-10 border-l-4 border-blue-600 pl-4">Explore Hub</h4>
          <ul className="space-y-5">
            <FooterLink label="Nollywood Trending" />
            <FooterLink label="Translated Cinema" />
            <FooterLink label="DJ Mix Master" />
            <FooterLink label="IPTV Live Nodes" />
            <FooterLink label="Intelligence Search" />
          </ul>
        </div>

        {/* Intelligence Node */}
        <div>
          <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-10 border-l-4 border-blue-600 pl-4">Creator Vault</h4>
          <ul className="space-y-5">
            <FooterLink label="Become a Creator" />
            <FooterLink label="Media Vault Guide" />
            <FooterLink label="Copyright Protocol" />
            <FooterLink label="Earning Analytics" />
            <FooterLink label="Admin Help Center" />
          </ul>
        </div>

        {/* Subscription Signal */}
        <div className="space-y-10">
          <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-10 border-l-4 border-blue-600 pl-4">Signal Alerts</h4>
          <p className="text-gray-400 text-xs leading-relaxed uppercase font-black tracking-widest opacity-60">Subscribe to new cinema releases</p>
          {!subscribed ? (
            <div className="relative group">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="node@intelligence.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-gray-700 font-mono"
              />
              <button 
                onClick={() => setSubscribed(true)}
                className="absolute right-3 top-3 bottom-3 bg-blue-600 px-5 rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 group-hover:scale-105"
              >
                <Send size={14} />
              </button>
            </div>
          ) : (
            <div className="bg-blue-600/10 border border-blue-600/30 p-8 rounded-3xl animate-zoomIn flex flex-col items-center text-center">
              <CheckCircle2 className="text-blue-500 mb-4" size={32} />
              <p className="text-[10px] font-black uppercase tracking-widest text-white mb-2">Signal Locked</p>
              <p className="text-[10px] text-gray-500 font-light italic">You will receive cinematic broadcasts directly.</p>
              <button onClick={() => setSubscribed(false)} className="mt-4 text-[9px] font-black uppercase text-blue-500 underline">Change Email</button>
            </div>
          )}
        </div>
      </div>

      {/* Control Strip */}
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-12 flex flex-col lg:flex-row justify-between items-center gap-10">
        <div className="text-[10px] font-black text-gray-700 uppercase tracking-[0.6em] text-center lg:text-left">
          © 2024 • THELUOHUB • MASTER ADMIN NODE • KAMPALA, UG
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          <button 
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-3 text-[10px] font-black text-gray-500 hover:text-blue-500 uppercase tracking-[0.2em] transition-all group"
          >
            <Filter size={14} className="group-hover:rotate-180 transition-transform duration-500" /> Filter Signal Mails
          </button>
          <button 
            onClick={() => alert("Unsubscribe protocol initiated. Email signal cleared.")}
            className="flex items-center gap-3 text-[10px] font-black text-gray-500 hover:text-red-500 uppercase tracking-[0.2em] transition-all group"
          >
            <BellOff size={14} className="group-hover:animate-bounce" /> Close All Mails
          </button>
          <button className="text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-widest transition-all italic">Privacy Node</button>
          <button className="text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-widest transition-all italic">Terms of Flow</button>
        </div>
      </div>

      {/* Advanced Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md animate-fadeIn">
           <div className="w-full max-w-md bg-[#0a1120] border border-white/10 rounded-[40px] p-12 space-y-10 shadow-2xl relative">
              <button onClick={() => setShowFilterModal(false)} className="absolute top-8 right-8 p-3 bg-white/5 rounded-full text-gray-500 hover:text-white transition-all">
                <X size={24} />
              </button>
              <div className="space-y-2">
                <h3 className="text-3xl font-black uppercase tracking-tighter">Signal <span className="text-blue-500">Node Filter</span></h3>
                <p className="text-gray-500 text-xs italic">Customize your intelligence broadcast reception.</p>
              </div>
              <div className="space-y-5">
                <FilterOption label="New Nollywood Hits" active={true} />
                <FilterOption label="Translated Cinema Updates" active={true} />
                <FilterOption label="DJ Mixtape Drops" active={false} />
                <FilterOption label="System Status Signals" active={true} />
              </div>
              <button onClick={() => setShowFilterModal(false)} className="w-full bg-blue-600 hover:bg-blue-700 py-6 rounded-2xl font-black uppercase tracking-[0.3em] shadow-2xl shadow-blue-600/30 transition-all">
                Update Signal Protocol
              </button>
           </div>
        </div>
      )}
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-blue-500 hover:border-blue-500/50 transition-all shadow-lg hover:bg-blue-600/5">
    {icon}
  </button>
);

const FooterLink = ({ label }: { label: string }) => (
  <li>
    <button className="text-xs text-gray-600 hover:text-blue-500 transition-colors uppercase tracking-widest font-black text-left flex items-center gap-3 group">
      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      {label}
    </button>
  </li>
);

const FilterOption = ({ label, active }: any) => {
  const [isOn, setIsOn] = useState(active);
  return (
    <div className="flex items-center justify-between p-5 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-blue-600/20 transition-all">
       <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{label}</span>
       <button 
        onClick={() => setIsOn(!isOn)}
        className={`w-12 h-6 rounded-full p-1 transition-all ${isOn ? 'bg-blue-600 shadow-lg shadow-blue-600/40' : 'bg-gray-800'}`}
       >
          <div className={`w-4 h-4 bg-white rounded-full transition-all ${isOn ? 'translate-x-6' : 'translate-x-0'}`}></div>
       </button>
    </div>
  );
};

export default Footer;
