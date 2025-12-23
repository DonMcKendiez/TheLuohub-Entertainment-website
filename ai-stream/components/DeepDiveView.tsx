
import React, { useState } from 'react';
import { deepReasoningAnalysis } from '../services/gemini';

const DeepDiveView: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDeepDive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await deepReasoningAnalysis(topic);
      setAnalysis(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/30 px-3 py-1 rounded-full text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
          Advanced Intelligence Mode
        </div>
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
          Deep <span className="text-blue-600">Research</span> Analysis
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Powered by Gemini 3 Pro with a Thinking Budget of 32,768 tokens. This engine performs multi-layered reasoning for the most complex cinematic and structural queries.
        </p>
      </div>

      <div className="glass rounded-3xl p-8 md:p-12 border-white/5">
        <form onSubmit={handleDeepDive} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Complex Topic or Query</label>
            <textarea 
              rows={4}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Analyze the architectural symbolism of Nolan's Inception compared to Satoshi Kon's Paprika..."
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-white focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all text-lg placeholder:text-gray-700 resize-none"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Thinking Through Context...
              </>
            ) : 'Initiate Deep Reasoning'}
          </button>
        </form>

        {analysis && !loading && (
          <div className="mt-12 space-y-8 animate-fadeIn">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-600/50 to-transparent"></div>
            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-blue-600/20 text-blue-600 flex items-center justify-center text-xs">A</span>
                Structural Findings
              </h2>
              <div className="prose prose-invert prose-blue max-w-none">
                <div className="text-gray-300 leading-loose text-lg whitespace-pre-wrap font-light">
                  {analysis}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {[
                { label: 'Complexity', value: 'High' },
                { label: 'Model', value: 'Gemini 3 Pro' },
                { label: 'Mode', value: 'Reasoning' },
                { label: 'Budget', value: '32k Tokens' }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="font-bold text-white uppercase">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeepDiveView;
