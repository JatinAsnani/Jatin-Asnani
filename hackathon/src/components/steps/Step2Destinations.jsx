import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, X, Plus, ArrowRight, ArrowLeft, GripVertical } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const CITIES = [
  { id: 1, name: 'Tokyo, Japan', weather: '22°C', cost: '$$$', score: 98, img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80' },
  { id: 2, name: 'Kyoto, Japan', weather: '24°C', cost: '$$', score: 95, img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80' },
  { id: 3, name: 'Osaka, Japan', weather: '25°C', cost: '$$', score: 92, img: 'https://images.unsplash.com/photo-1590559899731-a38283bce4ed?w=400&q=80' },
];

export default function Step2Destinations({ data, updateData, onNext, onBack }) {
  const [searchTerm, setSearchTerm] = useState('');

  const addCity = (city) => {
    if (!data.destinations.find(c => c.id === city.id)) {
      updateData({ destinations: [...data.destinations, city] });
    }
  };

  const removeCity = (id) => {
    updateData({ destinations: data.destinations.filter(c => c.id !== id) });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Where to?</h2>
        <p className="text-white/60">Search and build your perfect itinerary.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <Input 
          placeholder="Search cities, countries, or regions..." 
          className="h-14 pl-12 text-lg bg-black/40 border-white/10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Suggested Cities (Mocked) */}
      {searchTerm === '' && data.destinations.length === 0 && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-white/50">Popular Destinations</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CITIES.map(city => (
              <motion.div 
                key={city.id}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer border border-white/10"
                onClick={() => addCity(city)}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                <img src={city.img} alt={city.name} className="w-full h-32 object-cover" />
                <div className="absolute inset-0 z-20 p-4 flex flex-col justify-end">
                  <h4 className="font-semibold text-white text-shadow">{city.name}</h4>
                </div>
                <div className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Destinations */}
      {data.destinations.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-white/50">Your Itinerary</p>
          <div className="space-y-3">
            <AnimatePresence>
              {data.destinations.map((city, index) => (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, height: 0, scale: 0.9 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.9 }}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-card border-white/10 group"
                >
                  <GripVertical className="w-5 h-5 text-white/20 cursor-grab hover:text-white/50" />
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/20">
                    <img src={city.img} alt={city.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{city.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-white/50 mt-1">
                      <span>{city.weather}</span>
                      <span>•</span>
                      <span>{city.cost}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeCity(city.id)}
                    className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      <div className="pt-6 flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button onClick={onNext} size="lg" className="group">
          Next Step 
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
