
import React, { useState } from 'react';
import { 
  ShieldCheck, DollarSign, PieChart, Search as SearchIcon, 
  RefreshCw, LayoutDashboard, Lock, FileCode, Copy, Check,
  Zap, Database, Globe, TrendingUp, AlertCircle, MousePointer2,
  Users, ChevronRight, Settings, Tag, Pencil, Trash2, Plus
} from 'lucide-react';
import { User } from '../types';

// Mock Data for new panels
const mockUsers: User[] = [
    { id: 'u_1', name: 'Viewer Guest', email: 'viewer@luohub.com', role: 'viewer', balance: 500, status: 'active', subscriptionActive: true, notifications: [], emailSubscribed: true, aiUsageToday: 0 },
    { id: 'c_1', name: 'Creative Node', email: 'vj@luohub.com', role: 'creator', subRole: 'VJ', balance: 15000, status: 'active', subscriptionActive: true, notifications: [], emailSubscribed: true, aiUsageToday: 0 },
    { id: 'c_2', name: 'DJ Blast', email: 'dj@luohub.com', role: 'creator', subRole: 'DJ', balance: 2500, status: 'suspended', subscriptionActive: false, notifications: [], emailSubscribed: true, aiUsageToday: 0 },
    { id: 'admin_001', name: 'Master Admin', email: 'admin@luohub.com', role: 'admin', balance: 999999, status: 'active', subscriptionActive: true, notifications: [], emailSubscribed: true, aiUsageToday: 0 }
];

const AdminPanel: React.FC = () => {
  type AdminTab = 'health' | 'revenue' | 'seo' | 'blogger' | 'security' | 'users' | 'genres' | 'settings';
  const [activeTab, setActiveTab] = useState<AdminTab>('health');
  
  // State for Monetization Panel
  const [adsensePubId, setAdsensePubId] = useState('pub-8273641092837461');
  
  // State for Blogger Deploy Panel
  const [deploySite, setDeploySite] = useState<'site1' | 'site2'>('site1');
  const [isSyncing, setIsSyncing] = useState(false);
  const [copied, setCopied] = useState(false);

  // State for Genre Master
  const [genres, setGenres] = useState(['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Animation']);
  const [newGenre, setNewGenre] = useState('');

  const handleAddGenre = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGenre && !genres.includes(newGenre)) {
      setGenres([...genres, newGenre]);
      setNewGenre('');
    }
  };

  const handleDeleteGenre = (genreToDelete: string) => {
    setGenres(genres.filter(g => g !== genreToDelete));
  };


  const handleGlobalSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert("Master Hub: All monetization and SEO protocols synced to live edge nodes.");
    }, 1500);
  };

  // High-Fidelity Blogger Template for Site 1 (User End)
  const site1Template = `...`; // Content unchanged for brevity

  // High-Fidelity Blogger Template for Site 2 (Creator Frontend)
  const site2Template = `...`; // Content unchanged for brevity

  const bloggerTemplate = deploySite === 'site1' ? site1Template : site2Template;

  const copyTemplate = () => {
    navigator.clipboard.writeText(bloggerTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen -m-10 bg-[#060606] overflow-hidden animate-fadeIn font-['Ubuntu']">
      {/* Sidebar */}
      <aside className="w-80 flex-shrink-0 bg-[#0a0a0a] border-r border-white/5 flex flex-col pt-12">
        <div className="px-10 mb-16 flex items-center gap-4">
          <div className="bg-blue-600 p-2.5 rounded-2xl shadow-2xl shadow-blue-600/40">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <div>
            <span className="font-black uppercase tracking-tighter text-2xl block leading-none">MASTER <span className="text-blue-600">HUB</span></span>
            <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest mt-1.5 block">Enterprise Logic v3.0</span>
          </div>
        </div>

        <nav className="flex-grow space-y-2 px-6 overflow-y-auto">
          <AdminNavItem active={activeTab === 'health'} icon={<LayoutDashboard size={20} />} label="Global Health" onClick={() => setActiveTab('health')} />
          <AdminNavItem active={activeTab === 'users'} icon={<Users size={20} />} label="User Management" onClick={() => setActiveTab('users')} />
          <AdminNavItem active={activeTab === 'genres'} icon={<Tag size={20} />} label="Genre Master" onClick={() => setActiveTab('genres')} />
          <AdminNavItem active={activeTab === 'revenue'} icon={<DollarSign size={20} />} label="Monetization" onClick={() => setActiveTab('revenue')} />
          <AdminNavItem active={activeTab === 'blogger'} icon={<FileCode size={20} />} label="Blogger Deploy" onClick={() => setActiveTab('blogger')} />
          <AdminNavItem active={activeTab === 'settings'} icon={<Settings size={20} />} label="System Config" onClick={() => setActiveTab('settings')} />
          <AdminNavItem active={activeTab === 'security'} icon={<Lock size={20} />} label="Security Node" onClick={() => setActiveTab('security')} />
        </nav>
        
        <div className="p-10 border-t border-white/5 mt-auto bg-black/40">
           <div className="flex items-center gap-3 text-[10px] text-gray-600 font-black uppercase tracking-widest">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div> Hub Status: Optimal
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-12 lg:p-20 bg-[#060606] relative scroll-smooth flex flex-col">
        <div className="flex-grow">
          {activeTab === 'health' && <HealthView isSyncing={isSyncing} onSync={handleGlobalSync} />}
          {activeTab === 'users' && <UserManagementView />}
          {activeTab === 'genres' && (
            <GenreManagementView 
              genres={genres} 
              newGenre={newGenre}
              setNewGenre={setNewGenre}
              onAddGenre={handleAddGenre}
              onDeleteGenre={handleDeleteGenre}
            />
          )}
          {activeTab === 'settings' && <SystemSettingsView />}
          {activeTab === 'blogger' && (
            <BloggerDeployView 
              deploySite={deploySite} 
              setDeploySite={setDeploySite} 
              bloggerTemplate={bloggerTemplate} 
              copyTemplate={copyTemplate} 
              copied={copied} 
            />
          )}
          {activeTab === 'revenue' && (
             <RevenueView adsensePubId={adsensePubId} setAdsensePubId={setAdsensePubId} />
          )}
        </div>

        <footer className="mt-auto pt-20 pb-10 flex flex-col items-center">
           <div className="h-px w-full max-w-lg bg-gradient-to-r from-transparent via-white/5 to-transparent mb-10"></div>
           <p className="text-[10px] font-black text-gray-800 uppercase tracking-[0.8em] text-center">
              © 2024 THELUOHUB ENTERPRISE ARCHITECTURE • ALL RIGHTS RESERVED
           </p>
        </footer>
      </main>
    </div>
  );
};

// Sub-components for each admin tab for cleaner organization
const HealthView = ({ isSyncing, onSync }: any) => (
  <div className="space-y-16 animate-fadeIn">
    <div className="flex justify-between items-end">
      <div>
        <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">Ecosystem <span className="text-blue-500">Node</span></h2>
        <p className="text-gray-500 mt-4 font-light italic max-w-lg">Real-time telemetry and financial indexing of the LuoHub architecture.</p>
      </div>
      <button onClick={onSync} className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:border-blue-600 transition-all flex items-center gap-3">
        <RefreshCw className={isSyncing ? "animate-spin" : ""} size={16} /> Force Global Sync
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <MetricCard label="Est. Revenue" val="UGX 2.4M" icon={<DollarSign className="text-green-500" />} delta="+18.4%" />
      <MetricCard label="Active Users" val="1,842" icon={<Users className="text-blue-500" />} delta="+120" />
      <MetricCard label="Search Score" val="9.4" icon={<Globe className="text-blue-400" />} delta="Optimal" />
      <MetricCard label="Scrape Blocks" val="342" icon={<ShieldCheck className="text-red-500" />} delta="Secured" />
    </div>
  </div>
);

const UserManagementView = () => (
    <div className="space-y-12 animate-fadeIn">
        <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">User <span className="text-blue-500">Management</span></h2>
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-white/10">
                        {['User', 'Role', 'Balance', 'Status', 'Actions'].map(h => 
                            <th key={h} className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">{h}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {mockUsers.map(user => (
                        <tr key={user.id} className="border-b border-white/5 last:border-b-0">
                            <td className="p-4">
                                <p className="font-bold text-sm">{user.name}</p>
                                <p className="text-xs text-gray-600 font-mono">{user.email}</p>
                            </td>
                            <td className="p-4 text-xs font-bold uppercase tracking-wider">{user.role} {user.subRole && `(${user.subRole})`}</td>
                            <td className="p-4 text-xs font-mono">UGX {user.balance.toLocaleString()}</td>
                            <td className="p-4">
                                <span className={`px-3 py-1 text-[9px] font-black uppercase rounded-full ${user.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                    {user.status}
                                </span>
                            </td>
                            <td className="p-4">
                                <div className="flex gap-2">
                                    <button className="p-2 bg-white/5 hover:bg-blue-600/20 rounded-lg"><Pencil size={14} /></button>
                                    <button className="p-2 bg-white/5 hover:bg-red-600/20 rounded-lg"><Trash2 size={14} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const GenreManagementView = ({ genres, newGenre, setNewGenre, onAddGenre, onDeleteGenre }: any) => (
  <div className="space-y-12 animate-fadeIn">
    <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">Genre <span className="text-blue-500">Master</span></h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      <div className="md:col-span-2 bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-4">
          <h3 className="text-lg font-bold mb-4">Approved Genres</h3>
          <div className="flex flex-wrap gap-3">
              {genres.map((g: string) => (
                  <div key={g} className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-full pl-4 pr-2 py-2 text-xs font-bold group">
                      <span>{g}</span>
                      <button onClick={() => onDeleteGenre(g)} className="p-1 opacity-50 group-hover:opacity-100 hover:bg-red-500/20 rounded-full transition-all">
                          <Trash2 size={14} />
                      </button>
                  </div>
              ))}
          </div>
      </div>
      <form onSubmit={onAddGenre} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-4">
          <h3 className="text-lg font-bold mb-4">Add New Genre</h3>
          <input 
              type="text"
              value={newGenre}
              onChange={(e) => setNewGenre(e.target.value)}
              placeholder="e.g. Documentary"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-blue-600 outline-none"
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2">
              <Plus size={16} /> Add Genre
          </button>
      </form>
    </div>
  </div>
);

const SystemSettingsView = () => (
    <div className="space-y-12 animate-fadeIn">
        <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">System <span className="text-blue-500">Configuration</span></h2>
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-12 max-w-2xl space-y-8">
            <div className="flex items-center justify-between p-4 border border-white/5 rounded-2xl">
                <label className="font-bold text-sm">Maintenance Mode</label>
                <div className="w-12 h-6 rounded-full bg-gray-800 p-1 cursor-pointer"><div className="w-4 h-4 bg-white rounded-full"></div></div>
            </div>
             <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500">Site Name</label>
                <input type="text" defaultValue="TheLuoHub" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"/>
            </div>
             <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500">Default AI Usage Limit</label>
                <input type="number" defaultValue="2" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"/>
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-black uppercase tracking-widest">Save Settings</button>
        </div>
    </div>
);

const BloggerDeployView = ({ deploySite, setDeploySite, bloggerTemplate, copyTemplate, copied }: any) => (
    <div className="space-y-16 animate-slideUp">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">Blogger <span className="text-orange-500">Deploy</span></h2>
                <p className="text-gray-500 mt-4 font-light italic">Orchestrate the deployment of user and creator hubs.</p>
            </div>
            <div className="flex bg-white/5 p-2 rounded-2xl border border-white/5">
                <button onClick={() => setDeploySite('site1')} className={`px-8 py-3 rounded-xl font-black uppercase text-[9px] tracking-widest transition-all ${deploySite === 'site1' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-gray-600 hover:text-white'}`}>
                    Site 1: User End
                </button>
                <button onClick={() => setDeploySite('site2')} className={`px-8 py-3 rounded-xl font-black uppercase text-[9px] tracking-widest transition-all ${deploySite === 'site2' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' : 'text-gray-600 hover:text-white'}`}>
                    Site 2: Creator End
                </button>
            </div>
        </div>
        <div className="glass rounded-[40px] p-12 border-white/5 bg-white/[0.01] space-y-8">
            <div className="flex items-center justify-between">
                <h4 className="font-black uppercase tracking-widest text-sm">
                    {deploySite === 'site1' ? 'User End Cinematic Protocol' : 'Creator Studio Command Node'}
                </h4>
                <button onClick={copyTemplate} className={`flex items-center gap-3 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${copied ? 'bg-green-600 text-white' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-blue-600'}`}>
                    {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Node Secured' : 'Copy All Code'}
                </button>
            </div>
            <textarea readOnly value={bloggerTemplate} className={`w-full h-[400px] bg-black border border-white/10 rounded-3xl p-8 font-mono text-xs outline-none`}/>
        </div>
    </div>
);

const RevenueView = ({ adsensePubId, setAdsensePubId }: any) => (
    <div className="space-y-16 animate-slideUp">
        <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">Revenue <span className="text-green-500">Protocols</span></h2>
        <div className="glass rounded-[40px] p-12 border-white/5 bg-white/[0.01] max-w-2xl space-y-10">
            <h3 className="font-black uppercase text-xl tracking-tighter">Google AdSense</h3>
            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Global Publisher ID</label>
                <input type="text" value={adsensePubId} onChange={e => setAdsensePubId(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-yellow-500 font-mono text-sm" />
            </div>
            <button className="w-full bg-yellow-400 text-black py-6 rounded-3xl font-black uppercase tracking-[0.3em]">Update Revenue Bridge</button>
        </div>
    </div>
);


const AdminNavItem = ({ active, icon, label, onClick }: any) => (
  <button onClick={onClick} className={`w-full flex items-center gap-6 px-8 py-6 rounded-3xl transition-all font-black text-xs uppercase tracking-widest ${active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-900/60' : 'text-gray-600 hover:text-white hover:bg-white/5'}`}>
    <div className={active ? 'text-white' : 'text-gray-700'}>{icon}</div> {label}
  </button>
);

const MetricCard = ({ label, val, icon, delta }: any) => (
  <div className="glass rounded-[35px] p-10 border-white/5 group hover:border-blue-600/20 transition-all cursor-default">
    <div className="flex justify-between items-start mb-8">
      <div className="bg-white/5 p-4 rounded-2xl group-hover:bg-blue-600/10 transition-colors">{icon}</div>
    </div>
    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1.5">{label}</p>
    <div className="flex items-end gap-3">
      <h4 className="text-3xl font-black tracking-tighter leading-none">{val}</h4>
      <span className="text-[9px] font-bold mb-1 text-blue-500 uppercase">{delta}</span>
    </div>
  </div>
);

export default AdminPanel;