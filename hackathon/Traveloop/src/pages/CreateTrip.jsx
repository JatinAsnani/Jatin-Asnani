import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Calendar, DollarSign, Compass, Sparkles, X } from 'lucide-react';
import { useStore } from '../store/useStore';

const CreateTrip = () => {
  const navigate = useNavigate();
  const addTrip = useStore(state => state.addTrip);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: 2000,
    style: '',
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const isStepValid = () => {
    if (step === 1) return formData.destination.trim().length > 0;
    if (step === 2) return formData.startDate && formData.endDate && formData.startDate <= formData.endDate;
    if (step === 3) return formData.budget > 0;
    return formData.style.length > 0;
  };

  const handleCreate = () => {
    addTrip(formData);
    const activeTripId = useStore.getState().activeTripId;
    navigate(`/itinerary/${activeTripId}`);
  };

  const STEPS = [
    { id: 1, title: 'Destination', icon: <MapPin /> },
    { id: 2, title: 'Dates', icon: <Calendar /> },
    { id: 3, title: 'Budget', icon: <DollarSign /> },
    { id: 4, title: 'Travel Style', icon: <Compass /> },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center z-10 relative">
        <button onClick={() => navigate('/dashboard')} className="p-2 glass rounded-full hover:bg-white/10 transition-colors">
          <X className="w-6 h-6" />
        </button>
        <div className="text-xl font-bold tracking-tight text-[#EA7B7B]">
          Traveloop<span className="text-[#FFEAD3]">.</span>
        </div>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </header>

      {/* Progress Bar */}
      <div className="w-full max-w-3xl mx-auto px-6 mb-12 z-10 relative">
        <div className="flex justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-[#EA7B7B] -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>
          
          {STEPS.map((s) => (
            <div 
              key={s.id}
              className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                step >= s.id ? 'bg-[#EA7B7B] text-white' : 'bg-black border border-white/20 text-white/40'
              }`}
            >
              {s.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Main Form Area */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-4xl font-bold">Where to?</h2>
                  <p className="text-white/60">Choose your dream destination.</p>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#EA7B7B]" />
                  <input 
                    type="text" 
                    placeholder="e.g., Paris, France" 
                    className="w-full glass bg-black/50 border-white/20 rounded-2xl py-6 pl-16 pr-6 text-2xl text-white placeholder-white/30 focus:outline-none focus:border-[#EA7B7B] transition-colors shadow-2xl"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-4xl font-bold">When are you going?</h2>
                  <p className="text-white/60">Select your travel dates.</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <div className="text-white/50 text-sm mb-2 pl-2">Start Date</div>
                    <div className="relative">
                      <input 
                        type="date" 
                        min={new Date().toISOString().split('T')[0]}
                        max="2030-12-31"
                        value={formData.startDate}
                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                        className="w-full glass bg-black/50 border-white/20 rounded-2xl py-6 pl-6 pr-12 text-xl font-semibold text-white focus:outline-none focus:border-[#EA7B7B] transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50"
                      />
                      <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="text-white/50 text-sm mb-2 pl-2">End Date</div>
                    <div className="relative">
                      <input 
                        type="date" 
                        value={formData.endDate}
                        min={formData.startDate || new Date().toISOString().split('T')[0]}
                        max="2030-12-31"
                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                        className="w-full glass bg-black/50 border-white/20 rounded-2xl py-6 pl-6 pr-12 text-xl font-semibold text-white focus:outline-none focus:border-[#EA7B7B] transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50"
                      />
                      <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-4xl font-bold">What's your budget?</h2>
                  <p className="text-white/60">Estimate how much you plan to spend.</p>
                </div>
                <div className="glass-card p-12 rounded-3xl text-center space-y-8">
                  <div className="text-6xl font-bold text-[#EA7B7B]">${formData.budget}</div>
                  <input 
                    type="range" 
                    min="500" max="10000" step="100"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="w-full accent-[#EA7B7B]"
                  />
                  <div className="flex justify-between text-white/40 text-sm">
                    <span>$500</span>
                    <span>$10,000+</span>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-4xl font-bold">What's your vibe?</h2>
                  <p className="text-white/60">Choose a travel style to get personalized recommendations.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {['Luxury', 'Backpacking', 'Adventure', 'Relaxation'].map((style) => (
                    <button
                      key={style}
                      onClick={() => setFormData({...formData, style})}
                      className={`p-6 rounded-2xl border transition-all duration-300 text-lg font-semibold ${
                        formData.style === style 
                          ? 'bg-[#EA7B7B]/20 border-[#EA7B7B] text-[#FFEAD3]' 
                          : 'glass border-white/10 hover:bg-white/5 hover:border-white/30 text-white/80'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="p-6 flex justify-between items-center max-w-4xl mx-auto w-full z-10 relative">
        <button 
          onClick={prevStep}
          className={`flex items-center px-6 py-3 rounded-full font-medium transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>
        
        {step < 4 ? (
          <button 
            onClick={nextStep}
            disabled={!isStepValid()}
            className="flex items-center px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-[#FFEAD3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        ) : (
          <button 
            onClick={handleCreate}
            className="flex items-center px-8 py-3 bg-[#EA7B7B] text-white rounded-full font-bold hover:bg-[#D25353] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isStepValid()}
          >
            Create Trip <Sparkles className="w-5 h-5 ml-2" />
          </button>
        )}
      </footer>
    </div>
  );
};

export default CreateTrip;
