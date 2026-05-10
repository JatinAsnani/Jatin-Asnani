import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plane, Home, Map, Calendar, Settings, LogOut, Plus, ChevronRight, DollarSign } from 'lucide-react';
import { useStore } from '../store/useStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const user = useStore(state => state.user);
  const trips = useStore(state => state.trips);
  const upcomingTrips = trips.slice(0, 2); // Show top 2

  const logout = useStore(state => state.logout);
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/5 flex flex-col justify-between hidden md:flex">
        <div className="p-6">
          <div className="text-2xl font-bold tracking-tight text-[#EA7B7B] mb-10 cursor-pointer" onClick={() => navigate('/')}>
            Traveloop<span className="text-[#FFEAD3]">.</span>
          </div>
          
          <nav className="space-y-2">
            {[
              { id: 'overview', icon: <Home className="w-5 h-5" />, label: 'Profile', route: '/dashboard' },
              { id: 'trips', icon: <Map className="w-5 h-5" />, label: 'My Trips', route: '/trips' },
              { id: 'calendar', icon: <Calendar className="w-5 h-5" />, label: 'Calendar', route: '/calendar' },
              { id: 'budget', icon: <DollarSign className="w-5 h-5" />, label: 'Budget', route: '/budget' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.route !== '#') navigate(item.route);
                  setActiveTab(item.id);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-[#EA7B7B]/10 text-[#EA7B7B]' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-white/5">
          <button onClick={() => navigate('/settings')} className="w-full flex items-center space-x-3 px-4 py-3 text-white/60 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-[#EA7B7B] hover:text-[#D25353] transition-colors mt-2">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 md:p-12 relative">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold mb-2"
              >
                Welcome back, {user ? user.name : 'Explorer'} 👋
              </motion.h1>
              <p className="text-white/60">Ready for your next adventure?</p>
            </div>
            <button 
              onClick={() => navigate('/create')}
              className="flex items-center px-6 py-3 bg-[#EA7B7B] text-white rounded-full font-medium hover:bg-[#D25353] transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Plan New Trip
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Upcoming Trips', value: '2', subtitle: 'Next: Kyoto in 14 days' },
              { label: 'Countries Visited', value: '12', subtitle: 'Across 3 continents' },
              { label: 'Saved Destinations', value: '28', subtitle: '5 added this week' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl"
              >
                <div className="text-white/60 text-sm font-medium mb-2">{stat.label}</div>
                <div className="text-4xl font-bold mb-2 text-[#FFEAD3]">{stat.value}</div>
                <div className="text-white/40 text-xs">{stat.subtitle}</div>
              </motion.div>
            ))}
          </div>

          {/* Upcoming Trips */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Upcoming Trips</h2>
              <button className="text-[#EA7B7B] text-sm font-medium hover:text-[#FFEAD3] flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingTrips.map((trip, i) => (
                <motion.div 
                  key={trip.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer"
                >
                  <div className={`absolute inset-0 ${trip.image} opacity-80 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="flex items-center space-x-2 text-[#FFEAD3] text-sm font-medium mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{trip.dates}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{trip.destination}</h3>
                      </div>
                      <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                        <span className="text-white/80 text-sm">Est.</span>
                        <div className="font-bold text-[#EA7B7B]">{trip.budget}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
