import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Map, Calendar as CalendarIcon, DollarSign, Settings as SettingsIcon, LogOut, Compass, User, Bell, Shield, Wallet, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';

const Settings = () => {
  const navigate = useNavigate();
  const user = useStore(state => state.user);
  const login = useStore(state => state.login);
  const [name, setName] = useState(user?.name || 'Explorer');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    login({ ...user, name });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure? This will delete all your trips and reset the app.")) {
      localStorage.removeItem('traveloop-storage');
      window.location.href = '/';
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/5 flex flex-col justify-between hidden md:flex z-20">
        <div className="p-6">
          <div className="text-2xl font-bold tracking-tight text-[#EA7B7B] mb-10 cursor-pointer" onClick={() => navigate('/')}>
            Traveloop<span className="text-[#FFEAD3]">.</span>
          </div>
          <nav className="space-y-2">
            {[
              { id: 'overview', icon: <Home className="w-5 h-5" />, label: 'Profile', route: '/dashboard' },
              { id: 'explore', icon: <Compass className="w-5 h-5" />, label: 'Explore', route: '/explore' },
              { id: 'trips', icon: <Map className="w-5 h-5" />, label: 'My Trips', route: '/trips' },
              { id: 'calendar', icon: <CalendarIcon className="w-5 h-5" />, label: 'Calendar', route: '/calendar' },
              { id: 'budget', icon: <DollarSign className="w-5 h-5" />, label: 'Budget', route: '/budget' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.route)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-white/60 hover:text-white hover:bg-white/5`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t border-white/5">
          <button className="w-full flex items-center space-x-3 px-4 py-3 bg-[#EA7B7B]/10 text-[#EA7B7B] rounded-xl transition-colors">
            <SettingsIcon className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
          <button onClick={() => navigate('/')} className="w-full flex items-center space-x-3 px-4 py-3 text-[#EA7B7B] hover:text-[#D25353] transition-colors mt-2">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-white/60">Manage your profile, preferences, and account.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Settings Nav */}
            <div className="col-span-1 space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-xl bg-white/10 text-white font-medium flex items-center">
                <User className="w-5 h-5 mr-3 text-[#EA7B7B]" /> Profile
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 transition-colors flex items-center">
                <Bell className="w-5 h-5 mr-3" /> Notifications
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 transition-colors flex items-center">
                <Wallet className="w-5 h-5 mr-3" /> Currency
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 transition-colors flex items-center">
                <Shield className="w-5 h-5 mr-3" /> Privacy & Security
              </button>
            </div>

            {/* Settings Content */}
            <div className="col-span-1 md:col-span-2 space-y-8">
              
              <div className="glass-card p-8 rounded-3xl border border-white/10">
                <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Display Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#EA7B7B] transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={user?.email || 'explorer@traveloop.com'}
                      disabled
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button 
                      onClick={handleSave}
                      className={`px-6 py-2.5 rounded-full font-medium transition-colors flex items-center ${saved ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-[#EA7B7B] text-white hover:bg-[#D25353]'}`}
                    >
                      {saved ? 'Saved!' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl border border-red-500/30 bg-red-500/5">
                <h2 className="text-xl font-bold mb-2 text-red-400">Danger Zone</h2>
                <p className="text-white/60 text-sm mb-6">Irreversible and destructive actions.</p>
                
                <div className="flex items-center justify-between p-4 bg-black/50 rounded-2xl border border-white/5">
                  <div>
                    <h4 className="font-semibold text-white">Reset Application Data</h4>
                    <p className="text-xs text-white/50 mt-1">This will permanently delete all your trips, expenses, and journals.</p>
                  </div>
                  <button 
                    onClick={handleClearData}
                    className="flex items-center px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-xl hover:bg-red-500 hover:text-white transition-all text-sm font-bold"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Reset Data
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
