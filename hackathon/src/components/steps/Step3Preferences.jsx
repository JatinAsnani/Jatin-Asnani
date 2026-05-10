import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, PenLine } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

const PREFERENCES = [
  'Adventure', 'Food', 'Luxury', 'Backpacking', 'Beaches', 
  'Nightlife', 'Photography', 'Wellness', 'Nature', 'Culture',
  'Shopping', 'Hidden Gems'
];

export default function Step3Preferences({ data, updateData, onNext, onBack }) {
  const togglePreference = (pref) => {
    if (data.preferences.includes(pref)) {
      updateData({ preferences: data.preferences.filter(p => p !== pref) });
    } else {
      updateData({ preferences: [...data.preferences, pref] });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">What's your vibe?</h2>
        <p className="text-white/60">Select the vibes that match your ideal trip.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-medium text-white/80">Select your interests</label>
          <div className="flex flex-wrap gap-3">
            {PREFERENCES.map(pref => {
              const isSelected = data.preferences.includes(pref);
              return (
                <motion.button
                  key={pref}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => togglePreference(pref)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                    isSelected 
                      ? 'bg-[#EA7B7B]/20 border-[#EA7B7B] text-[#FFEAD3]' 
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  {pref}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <label className="text-sm font-medium text-white/80 flex items-center gap-2">
            <PenLine className="w-4 h-4" /> Additional Preferences
          </label>
          <div className="relative group">
            <Textarea 
              placeholder="e.g. I want a peaceful mountain escape with hidden cafes, reading spots, and occasional moderate hikes."
              value={data.moodPrompt}
              onChange={(e) => updateData({ moodPrompt: e.target.value })}
              className="relative bg-black/80 border-white/10 min-h-[120px] focus:bg-white/5 text-white transition-colors"
            />
          </div>
        </div>
      </div>

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
