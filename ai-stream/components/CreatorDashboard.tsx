
import React, { useState } from 'react';
import { 
  UploadCloud, BarChart3, List, DollarSign, Search, Sparkles, Key, 
  HelpCircle, X, Download, Youtube, Settings, PlayCircle, Clock, 
  Users, TrendingUp, Info, Bell, ShieldCheck, Link as LinkIcon,
  RefreshCw, Film
} from 'lucide-react';
import { User, MediaItem } from '../types';
import { GoogleGenAI } from "@google/genai";

interface CreatorDashboardProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onOpenWallet: () => void;
}

const CreatorDashboard: React.FC<CreatorDashboardProps> = ({ user, onUpdateUser, onOpenWallet }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showKeySettings, setShowKeySettings] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    streamUrl: '',
    externalLink: '',
    type: 'movie'
  });

  const handleBloggerFetch = () => {
    if (!formData.externalLink) return;
    setIsSyncing(true);
    // Simulate fetching metadata from Blogger post URL
    setTimeout(() => {
      setIsSyncing(false);
      setFormData({
        ...formData,
        title: "Imported: Cinematic Masterpiece v2",
        description: "This post was automatically fetched from your Blogger archive. Optimize it further with AI below."
      });
      alert("Intelligence Node: Metadata fetched from Blogger link.");
    }, 1500);
  };

  const handleAiGenerate = async () => {
    const hasKeys = user.apiKeys?.deepseek || process.env.API_KEY;
    if (!hasKeys) {
      alert("DeepSeek API Key required. Please configure the Media Vault.");
      setShowKeySettings(true);
      return;
    }

    if (user.aiUsageToday >= 2) {
      const confirmPay = confirm("Daily free limit reached. Pay UGX 3,000 for Premium AI Generation?");
      if (!confirmPay) return;
      if (user.balance < 3000) {
        alert("Insufficient Balance in LuoHub Wallet.");
        onOpenWallet();
        return;
      }
    }

    setIsAiLoading(true);
    try {
      // Fix: Strictly follow GoogleGenAI initialization guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a viral, cinematic description for a ${formData.type} titled "${formData.title}". Use LuoHub branding style.`,
      });
      setFormData({ ...formData, description: response.text || '' });
      onUpdateUser({ 
        ...user, 
        aiUsageToday: user.aiUsageToday + 1, 
        balance: user.aiUsageToday >= 2 ? user.balance - 3000 : user.balance 
      });
    } catch (e) {
      alert("AI Bridge Error.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fadeIn">
      {/* YT Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-10">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Creator <span className="text-blue-500">Studio</span></h2>
          <p className="text-gray-400 font-light mt-1 italic tracking-wide">Blogger Bridge Enabled • Powered by LuoHub Intelligence</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setShowKeySettings(true)} className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all border border-white/5">
            <Settings size={22} className="text-gray-400" />
          </button>
          <button onClick={() => setShowUploadModal(true)} className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-blue-900/20">
            <UploadCloud size={20} /> Create Post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StudioStat icon={<Users />} label="Hub Users" val="12,402" delta="+420" />
        <StudioStat icon={<Clock />} label="Watch Time" val="4.2k Hrs" delta="+15%" />
        <StudioStat icon={<TrendingUp />} label="Ecosystem Views" val="284,900" delta="+22%" />
        <StudioStat icon={<DollarSign />} label="Node Earnings" val="UGX 1.8M" color="text-green-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card rounded-3xl border-white/5 p-8 bg-blue-600/[0.02]">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><Bell className="text-blue-500" /> System Signals</h3>
            <div className="space-y-4">
               {user.notifications?.map(n => (
                 <div key={n.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-4">
                    <div className="bg-blue-600/20 p-2 rounded-lg h-fit"><Info size={16} className="text-blue-500" /></div>
                    <div>
                      <p className="font-bold text-sm">{n.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{n.message}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl border-white/5 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-3"><List className="text-blue-500" /> Latest Archives</h3>
              <button className="text-xs font-bold uppercase text-gray-500 hover:text-white">Full Library</button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-600/30 transition-all group">
                   <div className="flex items-center gap-4">
                     <div className="relative w-16 h-20 rounded-xl overflow-hidden shadow-lg">
                        <img src={`https://picsum.photos/seed/${i+200}/200/300`} className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <h4 className="font-bold group-hover:text-blue-500 transition-colors">Blogger Sync Node #{i}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-gray-500 uppercase font-black">Status:</span>
                          <span className="text-[10px] text-green-500 font-black uppercase flex items-center gap-1"><ShieldCheck size={10} /> Live</span>
                        </div>
                     </div>
                   </div>
                   <div className="text-right">
                      <p className="font-black text-sm">{(i * 1240).toLocaleString()}</p>
                      <p className="text-[10px] text-gray-500 uppercase font-black">Ref Signals</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="glass-card rounded-3xl border-white/5 p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-blue-500"><LinkIcon /> Blogger Bridge</h3>
              <p className="text-xs text-gray-500 leading-relaxed italic mb-6">
                Connect your existing publications. Every Blogger link synced creates a permanent Node in the LuoHub Spreadsheet database.
              </p>
              <button onClick={() => setShowUploadModal(true)} className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:border-blue-600 transition-all">
                Open Import Node
              </button>
           </div>
        </div>
      </div>

      {/* Upload Modal with Blogger Sync */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-3xl bg-[#0a1120] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowUploadModal(false)} className="absolute top-8 right-8 p-2 text-gray-500 hover:text-white transition-all z-10">
              <X className="w-7 h-7" />
            </button>
            <div className="p-12 space-y-10">
              <h3 className="text-4xl font-black uppercase tracking-tighter">Post <span className="text-blue-500">Generator</span></h3>
              
              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">Import from Blogger Link (Optional)</label>
                 <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={formData.externalLink}
                      onChange={e => setFormData({...formData, externalLink: e.target.value})}
                      className="flex-grow bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-xs outline-none focus:ring-1 focus:ring-blue-600" 
                      placeholder="https://yourblog.blogspot.com/post-link"
                    />
                    <button onClick={handleBloggerFetch} disabled={isSyncing} className="bg-blue-600 px-6 rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center">
                       {isSyncing ? <RefreshCw className="animate-spin" size={18} /> : <Download size={18} />}
                    </button>
                 </div>
              </div>
              
              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">Video Stream URL (.m3u8, .mp4)</label>
                 <div className="relative">
                    <Film size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" />
                    <input 
                      type="text" 
                      value={formData.streamUrl}
                      onChange={e => setFormData({...formData, streamUrl: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white font-mono text-xs outline-none focus:ring-1 focus:ring-blue-600" 
                      placeholder="https://source.m3u8 or https://cdn/video.mp4"
                    />
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Node Title</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Category Node</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white appearance-none"
                  >
                    <option value="movie">Translated Movie</option>
                    <option value="nollywood">Nollywood Direct</option>
                    <option value="mixtape">DJ Mixtape</option>
                    <option value="iptv">IPTV Channel</option>
                    <option value="music-video">Music Video</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">AI Intelligence Refinement</label>
                  <button onClick={handleAiGenerate} disabled={isAiLoading} className="text-[10px] font-black uppercase bg-blue-600/10 text-blue-500 px-4 py-2 rounded-full border border-blue-600/30 flex items-center gap-2">
                    {isAiLoading ? 'Synthesizing...' : <><Sparkles size={14} /> AI Boost</>}
                  </button>
                </div>
                <textarea 
                  rows={5}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-white resize-none text-sm leading-relaxed" 
                />
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] transition-all shadow-2xl shadow-blue-600/40">
                Initiate Ecosystem Sync
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Vault Settings */}
      {showKeySettings && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-xl bg-[#0a1120] border border-white/10 rounded-3xl p-10 md:p-14 space-y-10 shadow-2xl relative">
             <button onClick={() => setShowKeySettings(false)} className="absolute top-8 right-8 p-2 text-gray-500 hover:text-white rounded-full bg-white/5 transition-all">
                <X size={24} />
             </button>
             <div className="text-center space-y-4">
                <div className="bg-blue-600 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-blue-600/30">
                  <Key size={32} className="text-white" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter">Media <span className="text-blue-500">Vault</span></h3>
                <p className="text-gray-400 font-light text-sm max-w-xs mx-auto">Input your TMDb and DeepSeek keys to unlock automated metadata and AI boosts.</p>
             </div>

             <div className="space-y-6">
                <div className="space-y-3">
                   <div className="flex items-center justify-between">
                     <label className="text-[10px] font-black uppercase tracking-widest text-blue-500">TMDb API Key</label>
                   </div>
                   <input 
                    type="password" 
                    value={user.apiKeys?.tmdb || ''}
                    onChange={e => onUpdateUser({...user, apiKeys: {...user.apiKeys, tmdb: e.target.value}})}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-mono" 
                   />
                </div>
                <div className="space-y-3">
                   <div className="flex items-center justify-between">
                     <label className="text-[10px] font-black uppercase tracking-widest text-blue-500">Blogger XML/Feed Node</label>
                   </div>
                   <input 
                    type="text" 
                    value={user.apiKeys?.bloggerFeed || ''}
                    onChange={e => onUpdateUser({...user, apiKeys: {...user.apiKeys, bloggerFeed: e.target.value}})}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-mono" 
                    placeholder="Enter Blog ID or URL"
                   />
                </div>
             </div>

             <button onClick={() => setShowKeySettings(false)} className="w-full bg-blue-600 py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">
                Update Studio Protocol
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

const StudioStat = ({ icon, label, val, delta, color = "text-white" }: any) => (
  <div className="glass-card rounded-3xl p-8 border-white/5 flex flex-col justify-between hover:border-blue-600/20 transition-all cursor-default">
    <div className="bg-white/5 p-3 rounded-2xl w-fit text-gray-400">{icon}</div>
    <div className="mt-8">
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</p>
      <h4 className={`text-3xl font-black tracking-tighter ${color}`}>{val}</h4>
      {delta && <p className="text-[10px] font-bold text-blue-400 mt-1 uppercase tracking-tighter italic">{delta}</p>}
    </div>
  </div>
);

export default CreatorDashboard;