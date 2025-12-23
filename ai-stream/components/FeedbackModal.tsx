
import React, { useState } from 'react';
import { X, Send, AlertCircle, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';

interface FeedbackModalProps {
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ onClose }) => {
  const [type, setType] = useState<'bug' | 'feature' | 'other'>('bug');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setLoading(true);
    // Simulate API call to feedback engine
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => onClose(), 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-[#0a1120] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center space-y-4 animate-zoomIn">
              <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-blue-500" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Transmission Received</h2>
              <p className="text-gray-400">Our intelligence team is reviewing your report. Thank you for building TheLuoHub.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white flex items-center gap-3">
                  <MessageSquare className="text-blue-500" /> System Feedback
                </h2>
                <p className="text-gray-400 text-sm">Help us refine the future of cinematic intelligence.</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setType('bug')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                    type === 'bug' ? 'bg-blue-600/20 border-blue-600/50 text-blue-500' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'
                  }`}
                >
                  <AlertCircle size={20} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Bug</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType('feature')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                    type === 'feature' ? 'bg-blue-600/20 border-blue-600/50 text-blue-500' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'
                  }`}
                >
                  <Sparkles size={20} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Request</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType('other')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                    type === 'other' ? 'bg-blue-600/20 border-blue-600/50 text-blue-500' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'
                  }`}
                >
                  <MessageSquare size={20} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Other</span>
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Deep Description</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={type === 'bug' ? "What happened? Describe the sequence..." : "What's your vision for this feature?"}
                  rows={5}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Transmission
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
