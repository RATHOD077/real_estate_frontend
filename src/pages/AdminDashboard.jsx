import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LogOut, Home, Edit3, Settings, Info, 
  HelpCircle, Layers, Hammer, ExternalLink, ShieldCheck 
} from 'lucide-react';

// Import all edit components
import HeroEdit from '../pages/edit/Hero';
import AboutEdit from '../pages/edit/AboutProject';
import AmenitiesEdit from '../pages/edit/Amenities';
import FloorPlansEdit from '../pages/edit/FloorPlans';
import ConstructionEdit from '../pages/edit/ConstructionUpdates';
import FaqsEdit from '../pages/edit/FAQ';
import DeveloperEdit from '../components/home/DeveloperInfo';

const tabs = [
  { name: 'Hero Section', icon: Home, component: HeroEdit },
  { name: 'About Project', icon: Info, component: AboutEdit },
  { name: 'Amenities', icon: Settings, component: AmenitiesEdit },
  { name: 'Floor Plans', icon: Layers, component: FloorPlansEdit },
  { name: 'Construction Updates', icon: Hammer, component: ConstructionEdit },
  { name: 'FAQs', icon: HelpCircle, component: FaqsEdit },
  { name: 'Developer Info', icon: Edit3, component: DeveloperEdit },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  // 1. PROTECTION CHECK
  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (isAuth !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  // 2. LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const ActiveComponent = tabs[activeTab].component;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      
      {/* Top Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex justify-between items-center">
          
          <div className="flex items-center gap-8">
            {/* Logo wrapped in Link to Home */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-200 group-hover:bg-emerald-700 transition-all">
                V
              </div>
              <div className="leading-none">
                <h1 className="text-lg font-black text-slate-800 tracking-tighter">
                  VIGHNAHARTA <span className="text-emerald-600">ADMIN</span>
                </h1>
                <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Management Suite</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                System Verified
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
            >
              <ExternalLink size={16} />
              <span className="hidden sm:inline">View Website</span>
            </Link>
            
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg font-bold transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto flex w-full flex-1">
        
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-slate-200 p-6 hidden lg:block overflow-y-auto max-h-[calc(100vh-64px)] sticky top-16">
          <div className="mb-10 px-4 py-4 bg-emerald-50 rounded-2xl border border-emerald-100">
            <p className="text-[11px] font-black text-emerald-800 uppercase tracking-[0.2em] mb-1">Current User</p>
            <p className="text-sm font-bold text-emerald-950">Administrator</p>
          </div>

          <nav className="space-y-1.5">
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Content Modules</p>
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-left font-bold transition-all group ${
                  activeTab === index 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                    : 'hover:bg-slate-50 text-slate-500 hover:text-slate-900'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === index ? 'text-emerald-400' : 'text-slate-400 group-hover:text-emerald-500'}`} />
                <span className="text-sm">{tab.name}</span>
              </button>
            ))}
          </nav>

          <div className="mt-12 px-4">
            <div className="p-4 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
               <div className="relative z-10">
                  <p className="text-xs font-bold text-emerald-400 mb-1">Need help?</p>
                  <p className="text-[10px] leading-relaxed text-slate-400">For technical support or issues, please contact the developer.</p>
               </div>
               <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Settings size={80} />
               </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 lg:p-12">
          <div className="max-w-4xl">
            {/* Header Section */}
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">Live Content Editor</span>
              </div>
              <h2 className="text-4xl font-serif font-black text-slate-900">
                {tabs[activeTab].name}
              </h2>
              <p className="text-slate-500 mt-3 text-sm leading-relaxed max-w-xl">
                Update the text, imagery, and information for the <strong>{tabs[activeTab].name}</strong> section of your landing page. Changes reflect instantly after saving.
              </p>
            </header>

            {/* Component Container */}
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-200 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-200"></div>
               <ActiveComponent />
            </div>
            
            <footer className="mt-10 py-6 text-center border-t border-slate-200">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Vighnaharta Infinity CMS • Version 2.0.4
              </p>
            </footer>
          </div>
        </main>

      </div>
    </div>
  );
}