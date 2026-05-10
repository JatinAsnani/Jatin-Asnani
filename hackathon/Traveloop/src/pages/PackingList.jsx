import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Plus, Trash2, Home, Map, Compass, DollarSign, ArrowLeft } from 'lucide-react';
import { useStore } from '../store/useStore';

const PackingList = () => {
  const navigate = useNavigate();
  
  const trips = useStore(state => state.trips);
  const activeTripId = useStore(state => state.activeTripId);
  const trip = trips.find(t => t.id === activeTripId) || trips[0];
  const items = trip?.packingList || [];

  const togglePackingItem = useStore(state => state.togglePackingItem);
  const addPackingItem = useStore(state => state.addPackingItem);
  const deletePackingItem = useStore(state => state.deletePackingItem);

  const [newItem, setNewItem] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Documents', 'Electronics', 'Clothing', 'Essentials'];

  const toggleItem = (id) => {
    togglePackingItem(id);
  };

  const deleteItem = (id) => {
    deletePackingItem(id);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    addPackingItem({ text: newItem, category: activeCategory === 'All' ? 'Essentials' : activeCategory });
    setNewItem('');
  };

  const filteredItems = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);
  
  const completedCount = items.filter(i => i.completed).length;
  let progress = items.length === 0 ? 0 : Math.round((completedCount / items.length) * 100);
  if (isNaN(progress)) progress = 0;

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
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 md:p-12 relative">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex items-center space-x-4 mb-2">
            <button onClick={() => navigate(`/itinerary/${trip?.id}`)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-white/60" />
            </button>
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-bold"
              >
                Packing List
              </motion.h1>
              <p className="text-white/60">{trip?.title} • {trip?.dates}</p>
            </div>
          </div>

          {/* Progress Bar Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-3xl relative overflow-hidden">
            <div className="flex justify-between items-end mb-4 relative z-10">
              <div>
                <div className="text-3xl font-bold text-[#EA7B7B]">{progress}%</div>
                <div className="text-white/60 text-sm">Packed ({completedCount} of {items.length} items)</div>
              </div>
              <div className="text-right">
                <div className="text-white/80 font-medium">{items.length === 0 ? "You're all set!" : progress === 100 ? "Ready to go!" : "Keep packing!"}</div>
              </div>
            </div>
            
            <div className="h-3 w-full bg-black/50 rounded-full overflow-hidden relative z-10 shadow-inner">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#EA7B7B] to-[#FFEAD3]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            
            {/* Background Glow */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#EA7B7B] rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
          </motion.div>

          {/* Add Item Form */}
          <form onSubmit={addItem} className="relative">
            <Plus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#EA7B7B]" />
            <input 
              type="text" 
              placeholder={`Add new item to ${activeCategory === 'All' ? 'Essentials' : activeCategory}...`}
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="w-full glass bg-black/50 border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder-white/40 focus:outline-none focus:border-[#EA7B7B] transition-colors shadow-lg"
            />
            <button type="submit" className="hidden">Add</button>
          </form>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-white text-black' 
                    : 'glass text-white/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Checklist */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`group flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    item.completed 
                      ? 'bg-white/5 border-white/5 text-white/40' 
                      : 'glass-card border-white/10 text-white hover:border-[#EA7B7B]/50'
                  }`}
                >
                  <div className="flex items-center space-x-4 flex-1 cursor-pointer" onClick={() => toggleItem(item.id)}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      item.completed ? 'bg-[#EA7B7B] border-[#EA7B7B]' : 'border-white/30 group-hover:border-[#EA7B7B]'
                    }`}>
                      {item.completed && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div>
                      <div className={`font-medium text-lg transition-all ${item.completed ? 'line-through' : ''}`}>
                        {item.text}
                      </div>
                      <div className="text-xs text-[#EA7B7B] uppercase tracking-wider">{item.category}</div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="p-2 text-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredItems.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-12 text-white/40"
              >
                No items in this category yet.
              </motion.div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default PackingList;
