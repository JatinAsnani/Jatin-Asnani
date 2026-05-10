import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Compass, Star, Plus, Home, Map, Calendar, DollarSign, Settings, LogOut, CheckCircle2, Navigation } from 'lucide-react';
import { useStore } from '../store/useStore';
import activitiesData from '../data/activities.json';

const Explore = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('destinations');
  const [searchQuery, setSearchQuery] = useState('');
  
  const addActivity = useStore(state => state.addActivityToItinerary);
  const addExpense = useStore(state => state.addExpense);
  const activeTripId = useStore(state => state.activeTripId);
  const activeDayId = useStore(state => state.activeDayId);
  const [addedItems, setAddedItems] = useState({});

  const handleAdd = (item) => {
    addActivity(activeDayId, { 
      time: '10:00 AM', 
      duration: item.duration || '2h', 
      title: item.title, 
      type: activeTab === 'destinations' ? 'activity' : 'experience',
      iconName: 'star'
    });
    
    // Parse price and add expense
    let amount = 0;
    if (item.price) {
      if (item.price === '$$') amount = 150;
      else if (item.price === '$$$') amount = 300;
      else if (item.price.startsWith('$')) amount = parseInt(item.price.replace('$', ''), 10) || 50;
    } else {
      amount = 50; // Default fallback
    }

    addExpense({
      title: item.title,
      value: amount,
      category: activeTab === 'destinations' ? 'Accommodation' : 'Activities',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });

    setAddedItems({ ...addedItems, [item.id]: true });
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
      navigate(`/itinerary/${activeTripId}`);
    }, 1000);
  };
  
  const filters = ['All', 'Budget', 'Luxury', 'Adventure', 'Relaxation', 'Culture'];
  const [activeFilter, setActiveFilter] = useState('All');

  const { destinations, experiences } = activitiesData;

  const currentData = (activeTab === 'destinations' ? destinations : experiences).filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' ? true : (item.tags || [item.category]).includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

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
              { id: 'calendar', icon: <Calendar className="w-5 h-5" />, label: 'Calendar', route: '/calendar' },
              { id: 'budget', icon: <DollarSign className="w-5 h-5" />, label: 'Budget', route: '/budget' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { if (item.route !== '#') navigate(item.route); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  item.id === 'explore'
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 md:p-12 relative">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-bold mb-2"
              >
                Discover the World
              </motion.h1>
              <p className="text-white/60">Find your next destination or unforgettable experience.</p>
            </div>
          </div>

          {/* Search & Tabs */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass bg-black/50 border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder-white/40 focus:outline-none focus:border-[#EA7B7B] transition-colors"
              />
            </div>

            {/* Tabs */}
            <div className="glass p-1 rounded-full flex self-start md:self-auto w-full md:w-auto">
              <button 
                onClick={() => setActiveTab('destinations')}
                className={`flex-1 md:px-8 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'destinations' ? 'bg-[#EA7B7B] text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
              >
                Destinations
              </button>
              <button 
                onClick={() => setActiveTab('experiences')}
                className={`flex-1 md:px-8 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'experiences' ? 'bg-[#EA7B7B] text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
              >
                Experiences
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full border text-sm whitespace-nowrap transition-all ${
                  activeFilter === filter 
                    ? 'border-[#EA7B7B] bg-[#EA7B7B]/10 text-[#EA7B7B]' 
                    : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
            <AnimatePresence mode="popLayout">
              {currentData.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group rounded-3xl overflow-hidden glass-card cursor-pointer relative h-80 flex flex-col"
                >
                  {/* Image Background */}
                  <div className={`absolute inset-0 ${item.image} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  
                  {/* Top Badges */}
                  <div className="relative z-10 p-4 flex justify-between items-start">
                    <div className="glass px-2.5 py-1 rounded-full flex items-center space-x-1 text-sm font-medium">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span>{item.rating}</span>
                    </div>
                    <div className="glass px-2.5 py-1 rounded-full text-sm font-medium">
                      {item.price || '$$'}
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10 p-5 mt-auto flex flex-col">
                    <div className="text-[#FFEAD3] text-sm font-medium mb-1 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      {item.country || item.location || item.city || 'Global'}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#EA7B7B] transition-colors">{item.title}</h3>
                    
                    {/* Tags */}
                    <div className="flex gap-2 mb-4">
                      {(item.tags || [item.category]).map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-white/20 text-white/70">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button 
                      onClick={() => handleAdd(item)}
                      className={`w-full py-2.5 glass rounded-xl text-sm font-semibold transition-all flex items-center justify-center ${
                        addedItems[item.id] 
                          ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                          : 'bg-white/5 hover:bg-[#EA7B7B] hover:text-white hover:border-[#EA7B7B]'
                      }`}
                    >
                      {addedItems[item.id] ? (
                        <><CheckCircle2 className="w-4 h-4 mr-2" /> Added</>
                      ) : (
                        <><Plus className="w-4 h-4 mr-2" /> Add to Trip</>
                      )}
                    </button>
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

export default Explore;
