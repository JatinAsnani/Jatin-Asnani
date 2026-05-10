import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, MapPin, Calendar, Wallet } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export default function Step5Review({ data, onBack }) {
  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-white mb-4 border border-white/10"
        >
          <CheckCircle className="w-8 h-8 text-[#EA7B7B]" />
        </motion.div>
        <h2 className="text-3xl font-bold tracking-tight">Ready to create</h2>
        <p className="text-white/60">Review your trip details before finalizing your itinerary.</p>
      </div>

      <Card className="overflow-hidden border-white/10 glass-card p-0 relative bg-black/60">
        <div className="relative p-6 sm:p-8 space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold">{data.name || "My Awesome Trip"}</h3>
            <p className="text-sm text-white/60 mt-2 max-w-md mx-auto">"{data.description || "A wonderful journey waiting to be generated..."}"</p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5">
              <MapPin className="w-5 h-5 text-white/50 mb-2" />
              <span className="text-xs text-white/50 mb-1">Destinations</span>
              <span className="font-semibold">{data.destinations.length} Cities</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5">
              <Calendar className="w-5 h-5 text-white/50 mb-2" />
              <span className="text-xs text-white/50 mb-1">Duration</span>
              <span className="font-semibold">7 Days</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5">
              <Wallet className="w-5 h-5 text-white/50 mb-2" />
              <span className="text-xs text-white/50 mb-1">Budget</span>
              <span className="font-semibold">${data.budget}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5">
              <CheckCircle className="w-5 h-5 text-white/50 mb-2" />
              <span className="text-xs text-white/50 mb-1">Travelers</span>
              <span className="font-semibold">{data.travelers} People</span>
            </div>
          </div>

          {data.preferences.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-medium text-white/50 uppercase tracking-wider">Travel Style</span>
              <div className="flex flex-wrap gap-2">
                {data.preferences.map(pref => (
                  <Badge key={pref} variant="outline" className="border-white/20 text-white bg-white/5">
                    {pref}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {data.moodPrompt && (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs font-medium text-white/60 uppercase tracking-wider mb-2 block">Additional Notes</span>
              <p className="text-sm italic text-white/80">"{data.moodPrompt}"</p>
            </div>
          )}
        </div>
      </Card>

      <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="w-full sm:w-auto">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Edit
        </Button>
        <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-2xl bg-[#EA7B7B] hover:bg-[#D25353] text-white shadow-lg transition-colors border-0">
          <span className="relative flex items-center">
            Create Itinerary
          </span>
        </Button>
      </div>
    </div>
  );
}
