import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, MapPin, Calendar, Clock, MoreHorizontal, PenLine, Heart, Home, Map, Calendar as CalendarIcon, DollarSign, Settings, LogOut, Compass } from 'lucide-react';
import { useStore } from '../store/useStore';

const TravelJournal = () => {
  const navigate = useNavigate();
  const [newEntry, setNewEntry] = useState('');

  const trips = useStore(state => state.trips);
  const activeTripId = useStore(state => state.activeTripId);
  const trip = trips.find(t => t.id === activeTripId) || trips[0];
  const entries = trip?.journal || [];

  const addJournalEntry = useStore(state => state.addJournalEntry);

  const handlePost = () => {
    if (!newEntry.trim()) return;
    addJournalEntry({
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      location: trip?.destination || 'Unknown Location',
      text: newEntry,
      likes: 0,
      images: []
    });
    setNewEntry('');
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
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-white/60 hover:text-white hover:bg-white/5"
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
          <button onClick={() => { useStore.getState().logout(); navigate('/'); }} className="w-full flex items-center space-x-3 px-4 py-3 text-[#EA7B7B] hover:text-[#D25353] transition-colors mt-2">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden relative">
      
      {/* Header */}
      <header className="glass border-b border-white/5 px-6 py-4 flex items-center justify-between shrink-0 z-20 sticky top-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(`/itinerary/${trip?.id}`)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">{trip?.title} Journal</h1>
            <div className="flex items-center text-white/50 text-xs mt-1">
              <Calendar className="w-3 h-3 mr-1" /> {trip?.dates}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 relative">
        <div className="max-w-3xl mx-auto">
          
          {/* Add Entry Input */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-3xl mb-12">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EA7B7B] flex items-center justify-center shrink-0 font-bold text-lg">
                J
              </div>
              <div className="flex-1">
                <textarea 
                  placeholder="Record a memory from your trip..."
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-white/40 border-none resize-none focus:outline-none focus:ring-0 min-h-[100px] text-lg"
                />
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <button className="p-2 text-white/50 hover:text-[#EA7B7B] hover:bg-[#EA7B7B]/10 rounded-lg transition-colors">
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-white/50 hover:text-[#EA7B7B] hover:bg-[#EA7B7B]/10 rounded-lg transition-colors">
                      <MapPin className="w-5 h-5" />
                    </button>
                  </div>
                  <button onClick={handlePost} className="px-6 py-2 bg-[#EA7B7B] text-white rounded-full font-medium hover:bg-[#D25353] transition-colors disabled:opacity-50" disabled={!newEntry.trim()}>
                    Post Entry
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline Entries */}
          <div className="space-y-8 relative">
            <div className="absolute left-[39px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#EA7B7B]/50 via-white/10 to-transparent hidden sm:block"></div>
            
            {entries.map((entry, index) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative sm:pl-24 group"
              >
                {/* Timeline Date Marker */}
                <div className="absolute left-0 top-6 text-right w-16 hidden sm:block">
                  <div className="text-sm font-bold text-[#EA7B7B]">{entry.date.split(',')[0]}</div>
                  <div className="text-xs text-white/40">{entry.time}</div>
                </div>

                <div className="absolute left-[35px] top-7 w-2.5 h-2.5 rounded-full bg-[#EA7B7B] hidden sm:block"></div>

                {/* Entry Card */}
                <div className="glass-card p-6 rounded-3xl">
                  {/* Mobile header (hidden on desktop where timeline shows) */}
                  <div className="flex sm:hidden items-center justify-between mb-4 text-sm text-white/50">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" /> {entry.date} at {entry.time}
                    </div>
                  </div>

                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center text-[#FFEAD3] text-sm font-medium bg-white/5 px-3 py-1.5 rounded-full">
                      <MapPin className="w-4 h-4 mr-2 text-[#EA7B7B]" />
                      {entry.location}
                    </div>
                    <button className="text-white/30 hover:text-white transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-white/90 text-lg leading-relaxed mb-6">
                    {entry.text}
                  </p>

                  {/* Images Grid */}
                  {entry.images && entry.images.length > 0 && (
                    <div className={`grid gap-3 mb-6 ${entry.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {entry.images.map((img, i) => (
                        <div key={i} className={`rounded-2xl ${img} h-48 w-full relative overflow-hidden group/img cursor-pointer`}>
                          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors"></div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Interaction Footer */}
                  <div className="flex items-center gap-6 pt-4 border-t border-white/5 text-white/50">
                    <button className="flex items-center hover:text-[#EA7B7B] transition-colors">
                      <Heart className="w-5 h-5 mr-2" />
                      <span className="text-sm">{entry.likes}</span>
                    </button>
                    <button className="flex items-center hover:text-white transition-colors">
                      <PenLine className="w-5 h-5 mr-2" />
                      <span className="text-sm">Edit</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

export default TravelJournal;
