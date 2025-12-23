
import React from 'react';
import { Play, Info, Star, Download, Sparkles, Filter, Database, Music, Video, Radio, Languages, Clapperboard, Film, Tv } from 'lucide-react';
import { ContentType } from '../types';
import { resolveDirectLinks, initiateDownload } from '../services/downloader';
import { usePlayer } from '../PlayerContext';

interface HomeViewProps {
  filter?: string;
}

// Data for new sections
const contentTypes = [
  { name: 'Live IPTV', icon: <Tv size={28} />, img: 'https://images.unsplash.com/photo-1593314731009-b14a4a4a4a4a?auto=format&fit=crop&w=800&q=80' },
  { name: 'Translated', icon: <Languages size={28} />, img: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=800&q=80' },
  { name: 'Dubbed Movies', icon: <Clapperboard size={28} />, img: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=800&q=80' },
  { name: 'DJ Mixtapes', icon: <Music size={28} />, img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Nollywood', icon: <Film size={28} />, img: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&q=80' },
];

const genres = [
  { name: 'Action' },
  { name: 'Comedy' },
  { name: 'Drama' },
  { name: 'Sci-Fi' },
  { name: 'Horror' },
  { name: 'Romance' },
  { name: 'Thriller' },
  { name: 'Animation' },
];


const HomeView: React.FC<HomeViewProps> = ({ filter }) => {
  const { openPlayer } = usePlayer();

  return (
    <div className="space-y-16 animate-fadeIn pb-20">
      {/* Cinematic Hero */}
      <section className="relative h-[65vh] rounded-[40px] overflow-hidden group border border-white/5">
        <img 
          src={filter === 'nollywood' ? "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=1920&q=80" : "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1920&q=80"} 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#060606] to-transparent"></div>
        
        <div className="relative h-full flex flex-col justify-end p-8 md:p-16 space-y-8 max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/40">Exclusive Premiere</div>
            <span className="text-sm font-bold text-gray-300 flex items-center gap-2">
              <Sparkles size={14} className="text-blue-500" /> AI Mastered 4K
            </span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
            {filter === 'nollywood' ? 'Nollywood' : 'Cinematic'} <br/> <span className="text-blue-500">Node One</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 line-clamp-2 max-w-2xl font-light">
            Stream and download the highest quality translations and original African masterpieces. Powered by LuoHub intelligence.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => openPlayer('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')}
              className="bg-white text-black px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-2xl"
            >
              <Play className="fill-black" size={20} /> Watch Node
            </button>
            <button className="bg-white/10 backdrop-blur-xl text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 hover:bg-white/20 transition-all border border-white/10">
              <Download size={20} /> Offline Mirror
            </button>
          </div>
        </div>
      </section>

      {/* Rows - Reordered with IPTV first and styled */}
      {!filter && <MediaRow title="Live IPTV Nodes" type="iptv" />}
      {(!filter || filter === 'nollywood') && <MediaRow title="Trending Nollywood" type="nollywood" />}
      {(!filter || filter === 'movie') && <MediaRow title="Luo Translated Hits" type="movie" />}
      {!filter && <MediaRow title="Latest Music Videos" type="music-video" />}
      {!filter && <MediaRow title="DJ Mix Master Series" type="mixtape" />}

      {/* Grid Feed */}
      <section className="space-y-10 pt-10">
        <div className="flex items-center justify-between border-b border-white/5 pb-8">
           <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <Database className="text-blue-500" /> Master <span className="text-blue-500">Archives</span>
            </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-10">
           <GalleryItem streamUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' type="nollywood" title="Village Chief" year="2024" img="https://picsum.photos/seed/n1/400/600" />
           <GalleryItem streamUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' type="movie" title="Luo Action Node" year="2024" img="https://picsum.photos/seed/n2/400/600" />
           <GalleryItem streamUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' type="mixtape" title="Street Vibes" year="2023" img="https://picsum.photos/seed/n3/400/600" />
           <GalleryItem streamUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' type="movie" title="Cinematic Dub" year="2024" img="https://picsum.photos/seed/n4/400/600" />
           <GalleryItem streamUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' type="nollywood" title="King of Lagos" year="2024" img="https://picsum.photos/seed/n5/400/600" />
           <GalleryItem streamUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' type="music-video" title="Vibe Check" year="2024" img="https://picsum.photos/seed/mv1/400/600" />
           <GalleryItem streamUrl='https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' type="iptv" title="Sports Central" year="Live" img="https://picsum.photos/seed/iptv1/400/600" isLive={true} />
           <GalleryItem streamUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' type="mixtape" title="Amapiano Mix" year="2024" img="https://picsum.photos/seed/m2/400/600" />
           <GalleryItem streamUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' type="movie" title="Future War Dub" year="2024" img="https://picsum.photos/seed/n6/400/600" />
           <GalleryItem streamUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' type="music-video" title="Drill Anthem" year="2024" img="https://picsum.photos/seed/mv2/400/600" />
        </div>
      </section>

      {/* New Category Rows */}
      <CategoryRow title="Browse by Type" items={contentTypes} />
      <CategoryRow title="Explore by Genre" items={genres} />

    </div>
  );
};

const MediaRow = ({ title, type }: { title: string, type: string }) => {
  const { openPlayer } = usePlayer();
  const isFullWidth = type === 'iptv';
  const sampleUrl = type === 'iptv' 
    ? 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
    : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  return (
    <div className={`space-y-6 ${isFullWidth ? '-mx-6 lg:-mx-10' : ''}`}>
      <div className={`flex items-center justify-between ${isFullWidth ? 'px-6 lg:px-10' : 'px-2'}`}>
        <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div> {title}
        </h3>
      </div>
      <div className={`flex gap-6 overflow-x-auto pb-8 no-scrollbar ${isFullWidth ? 'px-6 lg:px-10' : 'px-2'}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} onClick={() => openPlayer(sampleUrl)} className={`flex-none group cursor-pointer ${isFullWidth ? 'w-80 md:w-[28rem]' : 'w-48 md:w-56'}`}>
            <div className={`relative rounded-[32px] overflow-hidden mb-4 shadow-2xl border border-white/5 bg-[#191919] ${isFullWidth ? 'aspect-video' : 'aspect-[2/3]'}`}>
              <img 
                src={`https://picsum.photos/seed/${title}-${i}/${isFullWidth ? '800/450' : '400/600'}`} 
                className="w-full h-full object-cover transition-all group-hover:scale-110 opacity-80" 
                alt={`${title} thumbnail ${i + 1}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-4">
                 <div className="bg-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
                  {type === 'iptv' ? <Radio size={24} className="text-black" /> : <Play size={24} className="fill-black" />}
                 </div>
              </div>
              {type === 'iptv' && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest animate-pulse border-2 border-white/50">
                  Live
                </div>
              )}
            </div>
            <h4 className="font-bold text-sm truncate uppercase px-2">{type === 'iptv' ? `Broadcast Channel ${i+1}` : `Node ${i+1}`}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

const CategoryRow = ({ title, items }: { title: string, items: { name: string, icon?: React.ReactNode, img?: string }[] }) => (
  <div className="space-y-6 -mx-6 lg:-mx-10">
    <div className="flex items-center justify-between px-6 lg:px-10">
      <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
        <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div> {title}
      </h3>
    </div>
    <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar px-6 lg:px-10">
      {items.map((item, i) => (
        <div key={i} className="flex-none group cursor-pointer w-72 md:w-80">
          <div className="relative rounded-[32px] overflow-hidden aspect-video shadow-2xl border border-white/5 bg-[#191919] flex items-center justify-center transition-all group-hover:border-blue-600/30">
            {item.img && (
              <img 
                src={item.img} 
                className="absolute inset-0 w-full h-full object-cover transition-all group-hover:scale-110 opacity-40 group-hover:opacity-60" 
                alt={item.name}
              />
            )}
            {!item.img && (
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a] to-[#141414]"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="relative p-8 text-center w-full">
              {item.icon && <div className="text-blue-500 mb-4 inline-block p-4 bg-white/5 rounded-3xl transition-all group-hover:scale-110 group-hover:bg-white/10">{item.icon}</div>}
              <h4 className="font-black text-3xl truncate uppercase tracking-tighter text-white group-hover:text-blue-500 transition-colors">{item.name}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const GalleryItem = ({ type, title, year, img, isLive = false, streamUrl }: { type: ContentType, title: string, year: string, img: string, isLive?: boolean, streamUrl: string }) => {
  const { openPlayer } = usePlayer();
  const handleDownload = async (format: 'audio' | 'video') => {
    const source = "https://youtube.com/watch?v=dQw4w9WgXcQ"; 
    const result = await resolveDirectLinks(source);
    initiateDownload(format === 'video' ? result.video : result.audio, `${title}_LuoHub`);
  };

  return (
    <div className="group cursor-pointer" onClick={() => openPlayer(streamUrl)}>
       <div className="relative aspect-[10/14] rounded-[35px] overflow-hidden mb-5 border border-white/5 bg-black shadow-2xl">
          <img src={img} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt={title} />
          
          <div className={`absolute top-4 left-4 px-3 py-1 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest
            ${isLive ? 'bg-red-600/80 text-white border border-red-400/20' : 'bg-blue-600/20 text-blue-500 border border-blue-600/20'}`}>
             {isLive ? 'LIVE' : type}
          </div>

          {!isLive && (
            <div className="absolute bottom-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
               <button onClick={(e) => { e.stopPropagation(); handleDownload('audio'); }} className="bg-green-600 p-3.5 rounded-2xl shadow-2xl shadow-green-900/40 hover:scale-110 transition-all flex items-center gap-2">
                  <Music size={14} /> <span className="text-[9px] font-black uppercase">MP3</span>
               </button>
               <button onClick={(e) => { e.stopPropagation(); handleDownload('video'); }} className="bg-blue-600 p-3.5 rounded-2xl shadow-2xl shadow-blue-900/40 hover:scale-110 transition-all flex items-center gap-2">
                  <Video size={14} /> <span className="text-[9px] font-black uppercase">MP4</span>
               </button>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-6 group-hover:translate-y-0 transition-all duration-500">
             <h4 className="text-base font-black uppercase tracking-tighter leading-tight">{title}</h4>
             <p className="text-[10px] text-gray-500 mt-2 uppercase font-black tracking-widest">{year} • {isLive ? 'Broadcast Node' : 'Offline Sync'}</p>
          </div>
       </div>
    </div>
  );
};

export default HomeView;
