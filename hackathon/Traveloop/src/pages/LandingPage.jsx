import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Compass, Calendar, MapPin, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tight text-[#EA7B7B]">
          Traveloop<span className="text-[#FFEAD3]">.</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/auth')} className="px-5 py-2 text-sm font-medium hover:text-[#EA7B7B] transition-colors">
            Log In
          </button>
          <button onClick={() => navigate('/auth')} className="px-5 py-2 text-sm font-medium bg-[#EA7B7B] text-white rounded-full hover:bg-[#D25353] transition-colors">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center pt-24 px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl z-10"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Personalized Travel <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFEAD3] to-[#EA7B7B]">
              Planning Made Easy
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Experience the future of travel. Effortlessly build multi-city itineraries, manage your budget, and discover hidden gems all in one luxurious platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => navigate('/auth')} className="group px-8 py-4 text-lg font-semibold bg-[#EA7B7B] text-white rounded-full hover:bg-[#D25353] transition-all flex items-center">
              Get Started <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 text-lg font-semibold glass rounded-full hover:bg-white/10 transition-colors">
              Explore Trips
            </button>
          </div>
        </motion.div>

        {/* Floating Cards Demo */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 rounded-2xl flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#EA7B7B]/20 flex items-center justify-center mb-4 text-[#EA7B7B]">
              <MapPin />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Itineraries</h3>
            <p className="text-white/60 text-sm">Drag-and-drop your perfect trip timeline effortlessly.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 rounded-2xl flex flex-col items-center text-center transform md:-translate-y-8"
          >
            <div className="w-12 h-12 rounded-full bg-[#EA7B7B]/20 flex items-center justify-center mb-4 text-[#EA7B7B]">
              <Compass />
            </div>
            <h3 className="text-xl font-bold mb-2">Discover Magic</h3>
            <p className="text-white/60 text-sm">Find breathtaking destinations tailored to your vibe.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6 rounded-2xl flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#EA7B7B]/20 flex items-center justify-center mb-4 text-[#EA7B7B]">
              <Calendar />
            </div>
            <h3 className="text-xl font-bold mb-2">Budget Tracking</h3>
            <p className="text-white/60 text-sm">Keep your finances in check while enjoying luxury.</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
