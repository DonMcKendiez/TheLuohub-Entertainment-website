
import React, { useState } from 'react';
import { searchWithGrounding } from '../services/gemini';
import { AnalysisResult } from '../types';
import { Filter, X, SlidersHorizontal, ChevronDown, Calendar, Globe, Star, Film } from 'lucide-react';

const SearchView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter States
  const [filters, setFilters] = useState({
    genre: 'All',
    year: '2024',
    language: 'All',
    rating: '4.0+'
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    
    // Construct refined query with filters
    const refinedQuery = `${query} (Filter constraints: Genre: ${filters.genre}, Year: ${filters.year}, Language: ${filters.language}, Rating: ${filters.rating})`;
    
    try {
      const res = await searchWithGrounding(refinedQuery);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
          Intelligence <span className="text-blue-600">Search</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-light italic">
          Deep synchronization with Google Search grounding and filter refinement protocols.
        </p>
      </div>

      <div className="space-y-6">
        <form onSubmit={handleSearch} className="relative max-w-4xl mx-auto">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-[30px] p-2 pr-4 focus-within:ring-2 focus-within:ring-blue-600/50 transition-all">
            <button 
              type="button" 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-4 rounded-2xl transition-all ${showFilters ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-gray-500'}`}
            >
              <SlidersHorizontal size={20} />
            </button>
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cinematic nodes (e.g. Latest Nollywood translations...)"
              className="flex-grow bg-transparent border-none px-4 py-4 text-white focus:outline-none text-lg placeholder:text-gray-600 font-medium"
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all disabled:opacity-50 shadow-xl shadow-blue-600/20"
            >
              {loading ? 'Analyzing...' : 'Execute'}
            </button>
          </div>
        </form>

        {/* Filter Drawer */}
        {showFilters && (
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 animate-slideDown p-8 bg-white/[0.02] border border-white/5 rounded-[30px]">
            <FilterSelect 
              label="Genre Node" 
              icon={<Film size={14} />} 
              value={filters.genre} 
              options={['All', 'Action', 'Drama', 'VJ Dub', 'Nollywood', 'Mix Master']}
              onChange={(val) => setFilters({...filters, genre: val})}
            />
            <FilterSelect 
              label="Year Logic" 
              icon={<Calendar size={14} />} 
              value={filters.year} 
              options={['All', '2025', '2024', '2023', '2022', '2020s']}
              onChange={(val) => setFilters({...filters, year: val})}
            />
            <FilterSelect 
              label="Language" 
              icon={<Globe size={14} />} 
              value={filters.language} 
              options={['All', 'English', 'Luganda', 'Swahili', 'Hindi-Dub']}
              onChange={(val) => setFilters({...filters, language: val})}
            />
            <FilterSelect 
              label="Intelligence Rating" 
              icon={<Star size={14} />} 
              value={filters.rating} 
              options={['All', '4.5+', '4.0+', '3.5+', '3.0+']}
              onChange={(val) => setFilters({...filters, rating: val})}
            />
          </div>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
            </div>
          </div>
          <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.4em] animate-pulse">Synchronizing Grounding Sources...</p>
        </div>
      )}

      {result && !loading && (
        <div className="grid md:grid-cols-3 gap-10 animate-fadeIn">
          <div className="md:col-span-2 space-y-8">
            <div className="glass p-10 rounded-[40px] border-blue-600/10 bg-blue-600/[0.01]">
              <h2 className="text-xl font-black uppercase tracking-tight text-blue-500 mb-6 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                Intelligence Insights
              </h2>
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap font-light">
                  {result.summary}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass p-8 rounded-[35px] border-white/5 h-fit">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6 italic">Master Sources</h3>
              <ul className="space-y-4">
                {result.sources?.map((source, i) => (
                  <li key={i}>
                    <a 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group block p-5 rounded-2xl bg-white/5 hover:bg-blue-600/10 transition-all border border-white/5 hover:border-blue-600/30"
                    >
                      <span className="text-xs font-black text-gray-200 group-hover:text-blue-500 transition-colors line-clamp-1 uppercase tracking-wider">{source.title}</span>
                      <span className="text-[9px] text-gray-600 font-mono mt-2 block break-all opacity-50">{source.uri}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterSelect = ({ label, value, options, onChange, icon }: any) => (
  <div className="space-y-2">
    <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 flex items-center gap-2">{icon} {label}</label>
    <div className="relative group">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white appearance-none focus:ring-1 focus:ring-blue-600 outline-none cursor-pointer"
      >
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none group-hover:text-blue-500 transition-colors" />
    </div>
  </div>
);

export default SearchView;
