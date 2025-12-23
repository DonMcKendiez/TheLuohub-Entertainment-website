
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Home, Search, PlusSquare, ShieldCheck, Wallet, PlayCircle, 
  Radio, Music, LogOut, ChevronRight, AlertCircle, MessageSquare, 
  Film, Menu, X, Bell, Download, User as UserIcon, ArrowUpCircle
} from 'lucide-react';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import CreatorDashboard from './components/CreatorDashboard';
import AdminPanel from './components/AdminPanel';
import PaymentModal from './components/PaymentModal';
import FeedbackModal from './components/FeedbackModal';
import Footer from './components/Footer';
import AuthView from './components/AuthView';
import DownloaderView from './components/DownloaderView';
import UpgradeModal from './components/UpgradeModal';
import { User } from './types';
import { PlayerProvider } from './PlayerContext';

// Layout wrapper to handle conditional visibility of Nav/Footer
const AppLayout: React.FC<{ 
  user: User | null; 
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  setShowWallet: (val: boolean) => void;
  setShowFeedback: (val: boolean) => void;
  setShowUpgrade: (val: boolean) => void;
  children: React.ReactNode;
}> = ({ user, onLogout, onUpdateUser, setShowWallet, setShowFeedback, setShowUpgrade, children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const isAuthPage = location.pathname === '/login';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isAuthPage) {
    return <div className="w-full h-screen bg-black">{children}</div>;
  }

  return (
    <div className="flex h-screen bg-[#060606] text-white font-['Ubuntu'] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="w-72 flex-shrink-0 bg-black flex flex-col border-r border-white/5 hidden lg:flex">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="logo-full.png" alt="THELUOHUB" className="h-10 w-auto logo-glow object-contain" />
          </Link>
        </div>
        
        <nav className="flex-grow px-4 space-y-1 overflow-y-auto">
          <SidebarItem icon={<Home size={20} />} label="Home" to="/" />
          <SidebarItem icon={<Search size={20} />} label="Intelligence" to="/search" />
          
          <div className="pt-8 pb-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-6">Categories</div>
          <SidebarItem icon={<PlayCircle size={20} />} label="Movies" to="/movies" />
          <SidebarItem icon={<Film size={20} />} label="Nollywood" to="/nollywood" />
          <SidebarItem icon={<Radio size={20} />} label="IPTV Live" to="/iptv" />
          <SidebarItem icon={<Music size={20} />} label="Mixtapes" to="/mixtapes" />

          <div className="pt-8 pb-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-6">Workspace</div>
          <SidebarItem icon={<Download size={20} />} label="Downloader" to="/downloader" />
          {user?.role !== 'viewer' && <SidebarItem icon={<PlusSquare size={20} />} label="Creator Studio" to="/creator" />}
          {user?.role === 'admin' && <SidebarItem icon={<ShieldCheck size={20} />} label="Admin Panel" to="/admin" />}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5 space-y-4">
          {user ? (
            <>
              <button 
                onClick={() => setShowWallet(true)}
                className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 px-5 py-4 rounded-2xl transition-all group border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600/10 p-2 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                    <Wallet className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Wallet</p>
                    <p className="font-bold text-sm tracking-tight">UGX {user.balance.toLocaleString()}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
              </button>
            </>
          ) : (
            <Link to="/login" className="w-full bg-blue-600 text-center py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all block shadow-lg shadow-blue-600/20">
              Sign In To Account
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto relative scroll-smooth bg-[#141414]">
        {/* Mobile Header / Top Nav */}
        <header className="sticky top-0 z-40 bg-[#060606]/80 backdrop-blur-2xl px-6 lg:px-10 py-5 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4 lg:gap-10">
             <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-white bg-white/5 rounded-xl">
               <Menu size={20} />
             </button>
             <div className="hidden xl:flex gap-8">
               <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Cinema</Link>
               <Link to="/nollywood" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Nollywood</Link>
               <Link to="/downloader" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Downloader</Link>
             </div>
             <img src="logo-full.png" alt="LUO" className="h-6 w-auto lg:hidden object-contain" />
          </div>
          
          <div className="flex items-center gap-4 lg:gap-8">
            {user ? (
              <div ref={profileRef} className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-2 pr-4 rounded-full transition-all border border-transparent hover:border-white/10">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <UserIcon size={16} className="text-blue-500" />
                  </div>
                  <p className="text-xs font-bold hidden sm:block">{user.name}</p>
                  <ChevronRight size={14} className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-90' : ''}`} />
                </button>
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-4 w-64 bg-[#0a1120] border border-white/10 rounded-2xl shadow-2xl p-4 animate-fadeIn z-50">
                    <div className="border-b border-white/5 pb-4 mb-4">
                       <p className="font-black text-sm">{user.name}</p>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{user.role} NODE</p>
                    </div>
                    <div className="space-y-2">
                       {user.role === 'viewer' && (
                         <button onClick={() => { setShowUpgrade(true); setIsProfileOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-3 text-xs font-bold text-gray-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors">
                           <ArrowUpCircle size={16} className="text-blue-500"/> Upgrade to Creator
                         </button>
                       )}
                       <button onClick={onLogout} className="w-full text-left flex items-center gap-3 px-4 py-3 text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                         <LogOut size={16} /> Sign Out
                       </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-white transition-colors">Sign In</Link>
            )}
          </div>
        </header>

        <div className="min-h-screen">
          {children}
        </div>
        
        <Footer />

        <button 
          onClick={() => setShowFeedback(true)}
          className="fixed bottom-8 right-8 z-[80] bg-blue-600 text-white p-4 rounded-full shadow-2xl shadow-blue-600/40 hover:scale-110 active:scale-95 transition-all group flex items-center gap-2"
        >
          <MessageSquare size={24} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-black uppercase text-[10px] tracking-widest whitespace-nowrap">Intelligence Feedback</span>
        </button>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 animate-fadeIn p-8 flex flex-col">
          <div className="flex justify-between items-center mb-12">
             <img src="logo-full.png" alt="LUO" className="h-8 w-auto object-contain" />
             <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-full"><X /></button>
          </div>
          <div className="space-y-6 flex-grow">
            <MobileNavItem to="/" label="Home" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavItem to="/search" label="Intelligence" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavItem to="/downloader" label="Downloader" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavItem to="/creator" label="Creator Studio" onClick={() => setIsMobileMenuOpen(false)} />
            {user?.role === 'admin' && <MobileNavItem to="/admin" label="Admin Portal" onClick={() => setIsMobileMenuOpen(false)} />}
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarItem = ({ icon, label, to }: { icon: React.ReactNode, label: string, to: string }) => {
  const location = useLocation();
  const active = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 group ${
        active 
          ? 'bg-blue-600/10 text-white border-l-4 border-blue-600 shadow-lg shadow-blue-900/10' 
          : 'text-gray-500 hover:text-white hover:bg-white/5'
      }`}
    >
      <div className={`${active ? 'text-blue-600' : 'group-hover:text-white'} transition-colors`}>
        {icon}
      </div>
      <span className="font-bold text-sm tracking-wide">{label}</span>
    </Link>
  );
};

const MobileNavItem = ({ to, label, onClick }: any) => (
  <Link to={to} onClick={onClick} className="block text-2xl font-black uppercase tracking-tighter text-white hover:text-blue-500 transition-all">{label}</Link>
);

const App: React.FC = () => {
  const [showWallet, setShowWallet] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('luohub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsReady(true);
  }, []);

  const handleLogin = (newUser: User) => {
    setUser({ ...newUser, status: 'active' });
    localStorage.setItem('luohub_user', JSON.stringify({ ...newUser, status: 'active' }));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('luohub_user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('luohub_user', JSON.stringify(updatedUser));
  };

  if (!isReady) return null;

  return (
    <PlayerProvider>
      <Router>
        <AppLayout 
          user={user} 
          onLogout={handleLogout} 
          onUpdateUser={updateUser}
          setShowWallet={setShowWallet} 
          setShowFeedback={setShowFeedback}
          setShowUpgrade={setShowUpgrade}
        >
          <div className="p-6 lg:p-10">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/login" element={<AuthView onLogin={handleLogin} />} />
              <Route path="/search" element={<SearchView />} />
              <Route path="/downloader" element={<DownloaderView />} />
              <Route path="/nollywood" element={<HomeView filter="nollywood" />} />
              <Route 
                path="/creator" 
                element={user?.role === 'creator' || user?.role === 'admin' ? <CreatorDashboard user={user} onUpdateUser={updateUser} onOpenWallet={() => setShowWallet(true)} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/admin" 
                element={user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/login" />} 
              />
            </Routes>
          </div>
        </AppLayout>

        {showWallet && user && <PaymentModal user={user} onClose={() => setShowWallet(false)} onPaid={(updatedUser) => updateUser(updatedUser)} />}
        {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
        {showUpgrade && user?.role === 'viewer' && <UpgradeModal user={user} onUpdateUser={updateUser} onClose={() => setShowUpgrade(false)} />}
      </Router>
    </PlayerProvider>
  );
};

export default App;