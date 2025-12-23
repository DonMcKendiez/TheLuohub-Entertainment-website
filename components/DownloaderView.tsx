
import React, { useState } from 'react';
import { Download, Link as LinkIcon, Music, Video, RefreshCw, Smartphone, Globe, ShieldCheck } from 'lucide-react';
import { resolveDirectLinks, initiateDownload } from '../services/downloader';

const DownloaderView: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isResolving, setIsResolving] = useState(false);
  const [resolvedData, setResolvedData] = useState<any>(null);

  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setIsResolving(true);
    try {
      const result = await resolveDirectLinks(url);
      setResolvedData(result);
    } catch (err) {
      alert("Downloader Node Error: Could not synchronize with external mirrors.");
    } finally {
      setIsResolving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-10 animate-fadeIn">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black uppercase tracking-tighter">Protocol <span className="text-blue-500">Downloader</span></h1>
        <p className="text-gray-400 font-light italic max-w-xl mx-auto">
          Synchronize external cinematic links for offline access. Supports YouTube (SS-Style), MediaFire, and Ssvid Protocols.
        </p>
      </div>

      <div className="glass rounded-[40px] p-12 border-white/5 bg-blue-600/[0.01] space-y-10">
        <form onSubmit={handleResolve} className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Paste External Node Link</label>
            <div className="flex gap-4">
              <div className="relative flex-grow">
                <LinkIcon size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white focus:ring-1 focus:ring-blue-600 outline-none font-mono text-sm" 
                  placeholder="https://youtube.com/watch?v=... or MediaFire link" 
                />
              </div>
              <button 
                type="submit"
                disabled={isResolving}
                className="bg-blue-600 hover:bg-blue-700 px-10 rounded-2xl font-black uppercase tracking-widest transition-all disabled:opacity-50 flex items-center gap-3 shadow-xl shadow-blue-600/30"
              >
                {isResolving ? <RefreshCw className="animate-spin" /> : <Download size={20} />} 
                Resolve
              </button>
            </div>
          </div>
        </form>

        {resolvedData && (
          <div className="grid md:grid-cols-2 gap-8 animate-slideUp">
            <DownloadOption 
              type="Video Node" 
              format="MP4 / HD" 
              icon={<Video className="text-blue-500" />} 
              onClick={() => initiateDownload(resolvedData.video, 'LuoHub_Video')} 
            />
            <DownloadOption 
              type="Audio Node" 
              format="MP3 / 320kbps" 
              icon={<Music className="text-green-500" />} 
              onClick={() => initiateDownload(resolvedData.audio, 'LuoHub_Audio')} 
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <FeatureStat icon={<ShieldCheck />} label="Secure Sync" desc="SSL Encrypted Pipes" />
        <FeatureStat icon={<Smartphone />} label="Mobile Ready" desc="Save direct to gallery" />
        <FeatureStat icon={<Globe />} label="Global Mirrors" desc="SS, SSVid & Mediafire" />
      </div>
    </div>
  );
};

const DownloadOption = ({ type, format, icon, onClick }: any) => (
  <button 
    onClick={onClick}
    className="flex items-center justify-between p-8 rounded-[30px] bg-white/5 border border-white/5 hover:border-blue-600/30 hover:bg-blue-600/5 transition-all group"
  >
    <div className="flex items-center gap-6">
      <div className="bg-black p-4 rounded-2xl shadow-xl group-hover:scale-110 transition-transform">{icon}</div>
      <div className="text-left">
        <h4 className="font-black uppercase tracking-tight text-white">{type}</h4>
        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{format}</p>
      </div>
    </div>
    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
      <Download size={16} />
    </div>
  </button>
);

const FeatureStat = ({ icon, label, desc }: any) => (
  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 text-center space-y-3">
    <div className="mx-auto w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">{icon}</div>
    <h5 className="font-black text-xs uppercase tracking-widest">{label}</h5>
    <p className="text-[10px] text-gray-500 italic uppercase">{desc}</p>
  </div>
);

export default DownloaderView;
