import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, List, MapPin, Calendar, Clock, ArrowRight, Home, Map, DollarSign, Settings, LogOut, MoreVertical, Edit2, Share2, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';

const MyTrips = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [activeMenu, setActiveMenu] = useState(null);

  const trips = useStore(state => state.trips);
  const deleteTrip = useStore(state => state.deleteTrip);
  const setActiveTrip = useStore(state => state.setActiveTrip);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Upcoming': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Planning': return 'bg-[#EA7B7B]/20 text-[#EA7B7B] border-[#EA7B7B]/30';
      case 'Completed': return 'bg-white/10 text-white/60 border-white/20';
      default: return 'bg-white/5 text-white/40 border-white/10';
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
              { id: 'trips', icon: <Map className="w-5 h-5" />, label: 'My Trips', route: '/trips' },
              { id: 'calendar', icon: <Calendar className="w-5 h-5" />, label: 'Calendar', route: '/calendar' },
              { id: 'budget', icon: <DollarSign className="w-5 h-5" />, label: 'Budget', route: '/budget' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { if (item.route !== '#') navigate(item.route); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  item.id === 'trips'
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
          <button onClick={() => navigate('/')} className="w-full flex items-center space-x-3 px-4 py-3 text-[#EA7B7B] hover:text-[#D25353] transition-colors mt-2">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 md:p-12 relative">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-bold mb-2"
              >
                My Trips
              </motion.h1>
              <p className="text-white/60">Manage and organize all your travel plans.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="glass flex items-center p-1 rounded-xl">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/80'}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/80'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              <button 
                onClick={() => navigate('/create')}
                className="px-6 py-2.5 bg-[#EA7B7B] text-white rounded-full font-medium hover:bg-[#D25353] transition-colors"
              >
                New Trip
              </button>
            </div>
          </div>

          {/* Trips Display */}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            <AnimatePresence>
              {trips.map((trip, i) => (
                <motion.div
                  key={trip.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className={`group relative glass-card rounded-2xl overflow-hidden cursor-pointer ${
                    viewMode === 'list' ? 'flex flex-row items-center h-32' : 'flex flex-col h-[380px]'
                  }`}
                  onClick={() => {
                    setActiveTrip(trip.id);
                    navigate(`/itinerary/${trip.id}`);
                  }}
                >
                  {/* Trip Image/Gradient */}
                  <div className={`${viewMode === 'list' ? 'w-48 h-full' : 'h-48 w-full'} ${trip.image} relative overflow-hidden shrink-0`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${getStatusBadge(trip.status)}`}>
                        {trip.status}
                      </span>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className={`p-6 flex-1 flex flex-col justify-between ${viewMode === 'list' ? 'flex-row items-center py-4' : ''}`}>
                    <div className={`${viewMode === 'list' ? 'flex-1 grid grid-cols-4 items-center gap-4' : 'space-y-4'}`}>
                      
                      <div className={`${viewMode === 'list' ? 'col-span-1' : ''}`}>
                        <h3 className="text-xl font-bold mb-1 group-hover:text-[#EA7B7B] transition-colors">{trip.title}</h3>
                        <div className={`flex items-center text-sm font-medium ${trip.color}`}>
                          <MapPin className="w-4 h-4 mr-1" /> {trip.destination}
                        </div>
                      </div>

                      <div className={`flex items-center text-white/50 text-sm ${viewMode === 'list' ? 'col-span-1' : ''}`}>
                        <Calendar className="w-4 h-4 mr-2 shrink-0" />
                        <span className="truncate">{trip.dates}</span>
                      </div>

                      <div className={`flex items-center text-white/50 text-sm ${viewMode === 'list' ? 'col-span-1' : ''}`}>
                        <Clock className="w-4 h-4 mr-2 shrink-0" />
                        {Object.values(trip.itinerary || {}).flat().length} Activities
                      </div>

                      <div className={`font-semibold ${viewMode === 'list' ? 'col-span-1 text-right' : ''}`}>
                        <span className="text-white/40 text-sm font-normal mr-2">Budget</span>
                        ${trip.budget?.toLocaleString()}
                      </div>

                    </div>

                    {/* Action Menu (Desktop Hover) */}
                    <div 
                      className={`absolute top-4 right-4 z-20 ${viewMode === 'list' ? 'relative top-0 right-0 ml-4' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === trip.id ? null : trip.id); }}
                    >
                      <button className="p-2 glass rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10">
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {activeMenu === trip.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, originTopRight: 1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute right-0 mt-2 w-48 glass bg-black/90 rounded-xl overflow-hidden shadow-2xl border border-white/10"
                          >
                            <button className="w-full text-left px-4 py-3 text-sm hover:bg-white/10 flex items-center">
                              <Edit2 className="w-4 h-4 mr-3 text-white/60" /> Edit Trip
                            </button>
                            <button className="w-full text-left px-4 py-3 text-sm hover:bg-white/10 flex items-center">
                              <Share2 className="w-4 h-4 mr-3 text-white/60" /> Share
                            </button>
                            <div className="w-full h-px bg-white/10"></div>
                            <button 
                              onClick={(e) => { e.stopPropagation(); deleteTrip(trip.id); }}
                              className="w-full text-left px-4 py-3 text-sm hover:bg-red-500/20 text-red-400 flex items-center"
                            >
                              <Trash2 className="w-4 h-4 mr-3" /> Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* View Button for Grid Mode */}
                    {viewMode === 'grid' && (
                      <div className="mt-6 flex justify-end">
                        <div className="text-[#EA7B7B] font-medium text-sm flex items-center opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          View Itinerary <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </main>
    </div>
  );
};

export default MyTrips;
