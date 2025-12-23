
import React, { useState } from 'react';
import { analyzeContent } from '../services/gemini';

const AnalysisView: React.FC = () => {
  const [content, setContent] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await analyzeContent(content);
      setAnalysis(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Content <span className="text-blue-600">Intelligence</span></h1>
        <p className="text-gray-400">Quick analysis, summary, and fact extraction for any media content or script snippet.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="glass p-8 rounded-2xl space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Input Media Description / Script</label>
            <textarea 
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste content here to extract insights..."
              className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-600/30 transition-all resize-none font-mono text-sm"
            />
          </div>
          <button 
            onClick={handleAnalyze}
            disabled={loading || !content.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-all disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze Content'}
          </button>
        </div>

        <div className="space-y-6">
          {analysis ? (
            <div className="glass p-8 rounded-2xl border-blue-600/10 min-h-[400px] animate-fadeIn">
              <h2 className="text-sm font-black uppercase tracking-widest text-blue-500 mb-6 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.86L12 5.84zM5.5 13L2 19h20l-3.5-6h-13z"/></svg>
                Engine Extraction
              </h2>
              <div className="prose prose-invert prose-sm max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {analysis}
                </p>
              </div>
            </div>
          ) : (
            <div className="glass p-8 rounded-2xl border-dashed border-white/10 min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">Awaiting Input For Processing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
