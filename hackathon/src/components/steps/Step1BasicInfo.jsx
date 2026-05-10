import React from 'react';
import { motion } from 'framer-motion';
import { ImagePlus, ArrowRight } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export default function Step1BasicInfo({ data, updateData, onNext }) {
  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Let's start with the basics</h2>
        <p className="text-white/60">Give your journey a name and a vibe.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2 relative group">
          <label className="text-sm font-medium text-white/80 group-focus-within:text-[#EA7B7B] transition-colors">Trip Name</label>
          <Input 
            placeholder="e.g. Summer in Kyoto" 
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            className="h-14 text-lg bg-black/40 border-white/10 focus:bg-white/5"
          />
        </div>

        <div className="space-y-2 relative group">
          <label className="text-sm font-medium text-white/80 group-focus-within:text-[#EA7B7B] transition-colors">Description / Vibe</label>
          <Textarea 
            placeholder="A relaxing temple run with lots of matcha and neon lights..."
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            className="bg-black/40 border-white/10 focus:bg-white/5 min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 group">
            <label className="text-sm font-medium text-white/80 group-focus-within:text-[#EA7B7B] transition-colors">Start Date</label>
            <Input type="date" className="h-14 bg-black/40 border-white/10" />
          </div>
          <div className="space-y-2 group">
            <label className="text-sm font-medium text-white/80 group-focus-within:text-[#EA7B7B] transition-colors">End Date</label>
            <Input type="date" className="h-14 bg-black/40 border-white/10" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Cover Image</label>
          <Card className="border-dashed border-2 border-white/20 bg-transparent hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-all">
                <ImagePlus className="w-6 h-6 text-white/60" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Click to upload image</p>
                <p className="text-xs text-white/40">Supports JPG, PNG (Max 5MB)</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <Button onClick={onNext} size="lg" className="w-full sm:w-auto group">
          Next Step 
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
