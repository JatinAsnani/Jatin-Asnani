import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Users, Zap, Building, Tent, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Card } from '../ui/card';

const ACCOMMODATIONS = [
  { id: 'hostel', name: 'Hostels', icon: Tent },
  { id: 'hotel', name: 'Hotels (3-4★)', icon: Building },
  { id: 'luxury', name: 'Luxury (5★+)', icon: Zap },
];

export default function Step4Budget({ data, updateData, onNext, onBack }) {
  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Set your budget</h2>
        <p className="text-white/60">How much are you planning to spend?</p>
      </div>

      <div className="space-y-10">
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <label className="text-sm font-medium text-white/80">Total Budget (USD)</label>
            <span className="text-3xl font-bold text-[#EA7B7B]">${data.budget}</span>
          </div>
          <Slider 
            value={[data.budget]} 
            max={20000} 
            step={500} 
            onValueChange={(val) => updateData({ budget: val[0] })}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-white/80">Travelers</label>
          <div className="flex items-center gap-6 p-4 rounded-xl glass border-white/10">
            <Users className="w-5 h-5 text-white/60" />
            <div className="flex-1 flex justify-between items-center">
              <button 
                onClick={() => updateData({ travelers: Math.max(1, data.travelers - 1) })}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              >-</button>
              <span className="text-xl font-bold">{data.travelers}</span>
              <button 
                onClick={() => updateData({ travelers: data.travelers + 1 })}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              >+</button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-white/80">Accommodation Style</label>
          <div className="grid grid-cols-3 gap-4">
            {ACCOMMODATIONS.map(acc => {
              const Icon = acc.icon;
              return (
                <Card 
                  key={acc.id}
                  className="flex flex-col items-center justify-center p-4 gap-2 cursor-pointer border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group"
                >
                  <Icon className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
                  <span className="text-xs text-center font-medium text-white/80">{acc.name}</span>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
          <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-white/50" /> Budget Overview
          </h4>
          <div className="flex justify-between items-end mt-4">
            <div>
              <p className="text-xs text-white/50">Total Budget</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold">${data.budget}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/50">Avg per person</p>
              <p className="font-semibold">${Math.floor(data.budget / data.travelers)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button onClick={onNext} size="lg" className="group">
          Review 
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
