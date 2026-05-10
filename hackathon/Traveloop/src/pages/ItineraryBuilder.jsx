import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, MapPin, Clock, Coffee, Camera, Navigation, MoreHorizontal, Calendar as CalendarIcon, Save, Share, Star, Home, Map, DollarSign, Settings, LogOut, Compass } from 'lucide-react';
import { useStore } from '../store/useStore';

const ItineraryBuilder = () => {
  const { id } = useParams(); // Using URL param but store is source of truth
  const navigate = useNavigate();

  const trips = useStore(state => state.trips);
  const activeTripId = useStore(state => state.activeTripId);
  const activeDay = useStore(state => state.activeDayId);
  const setActiveDay = useStore(state => state.setActiveDayId);
  const addDayToTrip = useStore(state => state.addDayToTrip);
  const [savedMsg, setSavedMsg] = useState(false);
  
  // Find the trip based on activeTripId or fallback to URL id, then first trip
  const trip = trips.find(t => t.id === activeTripId) || trips.find(t => t.id === id) || trips[0];

  const days = trip?.days || [];
  
  // Ensure activeDay is valid for this trip
  React.useEffect(() => {
    if (days.length > 0 && !days.find(d => d.id === activeDay)) {
      setActiveDay(days[0].id);
    }
  }, [trip?.id, activeDay, days, setActiveDay]);

  const itineraryData = trip?.itinerary || {};
  const activities = itineraryData[activeDay] || [];
  
  // Sort activities by time (e.g. 09:00 AM)
  const sortedActivities = [...activities].sort((a, b) => {
    const parseTime = (timeStr) => {
      if (!timeStr) return 0;
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':');
      hours = parseInt(hours, 10);
      if (hours === 12) hours = 0;
      if (modifier === 'PM') hours += 12;
      return hours * 60 + parseInt(minutes, 10);
    };
    return parseTime(a.time) - parseTime(b.time);
  });

  if (!trip) return <div className="p-8 text-white">Trip not found</div>;

  const handleSave = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Share link copied to clipboard!');
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
      <header className="glass border-b border-white/5 px-6 py-4 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/trips')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">{trip.title}</h1>
            <div className="flex items-center text-white/50 text-xs mt-1">
              <CalendarIcon className="w-3 h-3 mr-1" /> {trip.dates}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={handleShare} className="hidden sm:flex items-center px-4 py-2 border border-white/20 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
            <Share className="w-4 h-4 mr-2" /> Share
          </button>
          <button onClick={handleSave} className={`flex items-center px-6 py-2 rounded-full text-sm font-medium transition-colors ${savedMsg ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-[#EA7B7B] text-white hover:bg-[#D25353]'}`}>
            <Save className="w-4 h-4 mr-2" /> {savedMsg ? 'Saved!' : 'Save Trip'}
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Full Width Timeline Builder */}
        <div className="w-full flex flex-col bg-black/20">
          
          {/* Days Tabs */}
          <div className="flex overflow-x-auto p-4 gap-2 shrink-0 border-b border-white/5 no-scrollbar">
            {days.map((day) => (
              <button
                key={day.id}
                onClick={() => setActiveDay(day.id)}
                className={`flex flex-col items-center justify-center px-6 py-3 rounded-2xl min-w-[100px] transition-all border ${
                  activeDay === day.id 
                    ? 'bg-[#EA7B7B] text-white border-[#EA7B7B]' 
                    : 'border-white/10 text-white/60 hover:bg-white/10'
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wider mb-1">{day.label}</span>
                <span className={`text-lg font-bold ${activeDay === day.id ? 'text-white' : 'text-white/80'}`}>{day.date}</span>
              </button>
            ))}
            <button onClick={() => addDayToTrip()} className="flex flex-col items-center justify-center px-6 py-3 rounded-2xl min-w-[100px] border border-dashed border-white/20 text-white/40 hover:text-white hover:border-[#EA7B7B] hover:bg-[#EA7B7B]/10 transition-all">
              <Plus className="w-6 h-6 mb-1" />
              <span className="text-xs font-semibold">Add Day</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex px-6 py-4 gap-4 border-b border-white/5">
            <button onClick={() => navigate('/packing')} className="flex items-center text-sm font-medium text-white/70 hover:text-[#EA7B7B] transition-colors">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-2">📋</span>
              Packing List
            </button>
            <button onClick={() => navigate('/journal')} className="flex items-center text-sm font-medium text-white/70 hover:text-[#EA7B7B] transition-colors">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-2">📔</span>
              Travel Journal
            </button>
          </div>

          {/* Timeline */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 relative">
            <div className="max-w-2xl mx-auto relative">
              {/* Vertical Connection Line */}
              <div className="absolute left-[39px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#EA7B7B]/50 via-white/10 to-transparent"></div>

              <AnimatePresence mode="popLayout">
                {sortedActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative pl-24 mb-12 group cursor-pointer"
                  >
                    {/* Time indicator */}
                    <div className="absolute left-[-10px] top-3 text-right w-20">
                      <div className="text-sm font-bold text-white">{activity.time.split(' ')[0]}</div>
                      <div className="text-xs text-white/40">{activity.time.split(' ')[1]}</div>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-[31px] top-3 w-5 h-5 rounded-full bg-[#050505] border-2 border-[#EA7B7B] flex items-center justify-center z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#EA7B7B]"></div>
                    </div>

                    {/* Activity Card */}
                    <div className="border border-white/10 bg-black/40 p-5 rounded-2xl hover:border-[#EA7B7B]/50 transition-colors relative overflow-hidden">
                      {/* Left border accent */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#EA7B7B] to-[#D25353] opacity-50"></div>
                      
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-white/5 text-[#EA7B7B]">
                            {activity.iconName === 'star' ? <Star className="w-4 h-4" /> : 
                             activity.type === 'transit' ? <Navigation className="w-4 h-4" /> : 
                             activity.type === 'food' ? <Coffee className="w-4 h-4" /> : 
                             <Camera className="w-4 h-4" />}
                          </div>
                          <h3 className="font-bold text-lg leading-tight">{activity.title}</h3>
                        </div>
                        <button className="text-white/30 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-4 pl-12">
                        <div className="flex items-center text-xs text-white/50 bg-white/5 px-2 py-1 rounded-md">
                          <Clock className="w-3 h-3 mr-1" /> {activity.duration}
                        </div>
                        <span className="text-xs text-[#EA7B7B] uppercase tracking-wider font-semibold">{activity.type}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Add Activity Button */}
              <motion.button
                onClick={() => navigate('/explore')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-4 rounded-2xl border border-dashed border-white/20 text-white/50 font-medium hover:text-white hover:border-[#EA7B7B] hover:bg-[#EA7B7B]/10 transition-all flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" /> Find Activities for Day {activeDay}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default ItineraryBuilder;
