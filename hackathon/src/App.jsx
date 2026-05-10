import React from 'react';
import { motion } from 'framer-motion';
import CreateTripWizard from './components/CreateTripWizard';
import { Plane, Compass, MapPin } from 'lucide-react';

export default function App() {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-[#050505] text-white overflow-hidden font-sans">
      
      {/* LEFT SIDE - IMMERSIVE VISUAL SECTION */}
      <div className="relative w-full lg:w-5/12 h-64 lg:h-full hidden md:flex flex-col overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 bg-black">
        {/* Animated Background Gradients (Toned Down) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
          <motion.div 
            className="absolute -top-[20%] -left-[20%] w-[70%] h-[70%] rounded-full bg-[#EA7B7B]/5 blur-[120px]"
            animate={{ 
              x: [0, 30, 0], 
              y: [0, 20, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-[40%] right-[10%] w-[50%] h-[50%] rounded-full bg-[#D25353]/5 blur-[100px]"
            animate={{ 
              x: [0, -20, 0], 
              y: [0, -30, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        {/* Cinematic Map Map Visual Placeholder */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000')] bg-cover bg-center mix-blend-overlay"></div>
        
        {/* Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-[#050505]/20 to-[#050505] z-0"></div>

        {/* Content Overlay */}
        <div className="relative z-20 flex flex-col justify-end h-full p-12 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-4 tracking-tighter text-shadow">
              Plan Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EA7B7B] to-[#FFEAD3]">
                Next Adventure
              </span>
            </h1>
            <p className="text-lg text-white/70 max-w-md font-light leading-relaxed">
              Design your perfect journey. Experience seamless travel planning tailored to your preferences and style.
            </p>
          </motion.div>

          {/* Floating Tags */}
          <div className="absolute top-1/4 right-1/4">
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="px-4 py-2 rounded-xl glass-card text-xs font-semibold shadow-lg flex items-center gap-2 border-white/5"
            >
              <MapPin className="w-3 h-3 text-[#EA7B7B]" />
              Destinations
            </motion.div>
          </div>
          <div className="absolute top-1/3 left-1/4">
            <motion.div 
              animate={{ y: [0, 15, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="px-4 py-2 rounded-xl glass-card text-xs font-semibold shadow-lg flex items-center gap-2"
            >
              <Plane className="w-3 h-3 text-[#FFEAD3]" />
              Flights
            </motion.div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - WIZARD */}
      <div className="w-full lg:w-7/12 h-full overflow-y-auto relative bg-[#0a0a0a]">
        <CreateTripWizard />
      </div>

    </div>
  );
}
